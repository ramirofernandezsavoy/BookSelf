import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const { signIn, signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        await signIn(email, password)
      } else {
        await signUp(email, password)
        setMessage('¡Cuenta creada! Revisa tu email para confirmar.')
      }
    } catch (error: any) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-violet-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">HubbaRama</h1>
          <p className="text-gray-400">Tu gestor personal de links</p>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-l-lg font-medium transition-colors ${
                isLogin
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-r-lg font-medium transition-colors ${
                !isLogin
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.includes('creada') || message.includes('exitoso')
                  ? 'bg-green-600/20 border border-green-600/50 text-green-300'
                  : 'bg-red-600/20 border border-red-600/50 text-red-300'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 font-medium"
            >
              {loading
                ? 'Procesando...'
                : isLogin
                ? 'Iniciar Sesión'
                : 'Crear Cuenta'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
