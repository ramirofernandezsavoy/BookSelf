import { AuthProvider, useAuth } from './hooks/useAuth'
import AuthForm from './components/AuthForm'
import App from './App'

function AppWithAuth() {
  return (
    <AuthProvider>
      <AuthGuard />
    </AuthProvider>
  )
}

function AuthGuard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-violet-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
          <p className="text-white">Cargando...</p>
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
