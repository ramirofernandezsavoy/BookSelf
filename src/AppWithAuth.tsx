import { AuthProvider, useAuth } from './hooks/useAuth'
import AuthForm from './components/AuthForm'
import ThemeToggle from './components/ThemeToggle'
import ThemeProvider from './components/ThemeProvider'
import App from './App'

function AppWithAuth() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemeToggle />
        <AuthGuard />
      </AuthProvider>
    </ThemeProvider>
  )
}

function AuthGuard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors duration-500"
        style={{
          background: `linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)`
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
          <p style={{ color: 'var(--text-primary)' }}>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm />
  }

  return <App />
}

export default AppWithAuth
