import './App.css'
import { useState, useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import useStore from './stores/useStore'
import Header from './components/Header'
import ResourceCard from './components/ResourceCard'

function App() {
  const { user, signOut } = useAuth()
  const { addResource, resources, loading, fetchResources } = useStore()
  
  const [linkData, setLinkData] = useState({
    title: '',
    description: '',
    url: '',
    tags: [] as string[]
  })
  const [newTag, setNewTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Cargar links al montar el componente
  useEffect(() => {
    if (user) {
      fetchResources()
    }
  }, [user, fetchResources])

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!linkData.title.trim()) {
      setMessage('El título es requerido')
      return
    }

    if (!linkData.url.trim()) {
      setMessage('La URL es requerida')
      return
    }

    // Validar URL básica
    try {
      new URL(linkData.url)
    } catch {
      setMessage('Por favor ingresa una URL válida')
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      await addResource({
        title: linkData.title,
        description: linkData.description,
        url: linkData.url,
        tags: linkData.tags
      })
      
      setMessage('✅ Link guardado exitosamente!')
      setLinkData({
        title: '',
        description: '',
        url: '',
        tags: []
      })
      
      // Recargar la lista
      await fetchResources()
    } catch (error: any) {
      setMessage(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !linkData.tags.includes(newTag.trim())) {
      setLinkData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setLinkData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-violet-900">
      {/* Header de usuario autenticado */}
      <div className="bg-black/20 border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white">
            <span className="text-sm text-gray-300">Conectado como: </span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      <Header />
      
      {/* Formulario para agregar links */}
      <section className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Agregar Nuevo Link</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Título <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={linkData.title}
                  onChange={(e) => setLinkData({...linkData, title: e.target.value})}
                  className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                  placeholder="Nombre del link"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={linkData.url}
                  onChange={(e) => setLinkData({...linkData, url: e.target.value})}
                  className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                  placeholder="https://ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Descripción
              </label>
              <textarea
                value={linkData.description}
                onChange={(e) => setLinkData({...linkData, description: e.target.value})}
                className="w-full p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                placeholder="Breve descripción del link"
                rows={3}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 p-3 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-violet-400 focus:outline-none"
                  placeholder="Agregar tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Agregar
                </button>
              </div>
              
              {/* Lista de tags */}
              {linkData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {linkData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-violet-600 text-white text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-violet-200 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Mensaje de estado */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.includes('✅') 
                  ? 'bg-green-600/20 border border-green-600/50 text-green-300' 
                  : 'bg-red-600/20 border border-red-600/50 text-red-300'
              }`}>
                {message}
              </div>
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 font-medium"
            >
              {isLoading ? 'Guardando...' : 'Guardar Link'}
            </button>
          </form>
        </div>
      </section>

      {/* Lista de recursos */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Mis Links ({resources.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Cargando links...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>Aún no tienes links guardados.</p>
              <p className="text-sm">¡Agrega tu primer link usando el formulario de arriba!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {resources.map((resource) => (
                <ResourceCard 
                  key={resource.id}
                  resource={resource}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default App

