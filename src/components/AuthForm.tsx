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
    <div 
      className="min-h-screen flex items-center justify-center p-4 transition-colors duration-500"
      style={{ 
        background: `linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)` 
      }}
    >
      <div className="max-w-md w-full">
        <div 
          className="backdrop-blur-xl rounded-xl p-6 shadow-xl transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid var(--border-primary)'
          }}
        >
         <div className="text-center mb-6">
          <h1 
            className="text-3xl font-medium mb-2 transition-colors duration-300"
            style={{ color: 'var(--text-primary)' }}
          >
            Bookself
          </h1>
          <p 
            className="text-sm transition-colors duration-300"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tu gestor personal de links
          </p>
        </div>
          <div 
            className="flex gap-2 mb-4 rounded-lg p-1"
            style={{ backgroundColor: 'var(--bg-glass)' }}
          >
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                isLogin ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: isLogin ? 'var(--button-hover-bg)' : 'transparent',
                color: isLogin ? 'var(--button-text)' : 'var(--text-secondary)',
                border: isLogin ? '1px solid var(--border-primary)' : 'none'
              }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                !isLogin ? 'shadow-md' : ''
              }`}
              style={{
                backgroundColor: !isLogin ? 'var(--button-hover-bg)' : 'transparent',
                color: !isLogin ? 'var(--button-text)' : 'var(--text-secondary)',
                border: !isLogin ? '1px solid var(--border-primary)' : 'none'
              }}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                className="block text-xs font-medium mb-1 transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm backdrop-blur-sm rounded-lg focus:outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-hover)';
                  e.target.style.backgroundColor = 'var(--bg-glass-hover)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-primary)';
                  e.target.style.backgroundColor = 'var(--bg-glass)';
                }}
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label 
                className="block text-xs font-medium mb-1 transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-sm backdrop-blur-sm rounded-lg focus:outline-none transition-all"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-primary)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--border-hover)';
                  e.target.style.backgroundColor = 'var(--bg-glass-hover)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--border-primary)';
                  e.target.style.backgroundColor = 'var(--bg-glass)';
                }}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {message && (
              <div 
                className={`p-3 rounded-lg text-sm backdrop-blur-sm border transition-colors duration-300 ${
                  message.includes('creada') || message.includes('exitoso')
                    ? 'border-green-400/30 text-green-600 dark:text-green-300'
                    : 'border-rose-400/30 text-rose-600 dark:text-rose-300'
                }`}
                style={{
                  backgroundColor: message.includes('creada') || message.includes('exitoso')
                    ? 'rgba(34, 197, 94, 0.1)'
                    : 'rgba(239, 68, 68, 0.1)'
                }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 backdrop-blur-sm rounded-lg transition-all disabled:opacity-50 font-medium text-sm"
              style={{
                backgroundColor: 'var(--button-bg)',
                border: '1px solid var(--border-primary)',
                color: 'var(--button-text)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = 'var(--button-bg)';
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                }
              }}
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
