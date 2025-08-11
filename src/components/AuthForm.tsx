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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-cyan-900/50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-cyan-400/25 shadow-xl">
         <div className="text-center mb-6">
          <h1 className="text-3xl font-medium text-cyan-100 mb-2">Bookself</h1>
          <p className="text-gray-400 text-sm">Tu gestor personal de links</p>
        </div>
          <div className="flex gap-2 mb-4 bg-black/30 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? 'bg-cyan-600/60 text-white shadow-md border border-cyan-400/30'
                  : 'text-gray-400 hover:text-cyan-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? 'bg-cyan-600/60 text-white shadow-md border border-cyan-400/30'
                  : 'text-gray-400 hover:text-cyan-200'
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white text-xs font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/25 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-black/30 focus:outline-none transition-all"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-white text-xs font-medium mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-sm bg-black/20 backdrop-blur-sm border border-cyan-400/25 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400/50 focus:bg-black/30 focus:outline-none transition-all"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg text-sm backdrop-blur-sm border ${
                message.includes('creada') || message.includes('exitoso')
                  ? 'bg-cyan-600/20 border-cyan-400/30 text-cyan-200'
                  : 'bg-rose-600/20 border-rose-400/25 text-rose-200'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-cyan-600/60 backdrop-blur-sm border border-cyan-400/30 text-white rounded-lg hover:bg-cyan-500/70 hover:border-cyan-400/45 transition-all disabled:opacity-50 font-medium text-sm"
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
