import useStore from '../stores/useStore'
import { useState, useEffect } from 'react'

export default function AddItem() {
  const { isAddItemModalOpen, closeAddItemModal, addResource, updateResource, editingResource } = useStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    tags: ''
  })

  // Cargar datos del recurso cuando se está editando
  useEffect(() => {
    if (editingResource) {
      setFormData({
        title: editingResource.title,
        description: editingResource.description,
        url: editingResource.url,
        tags: Array.isArray(editingResource.tags) ? editingResource.tags.join(', ') : ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        url: '',
        tags: ''
      })
    }
  }, [editingResource])

  if (!isAddItemModalOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const form = e.target as HTMLFormElement
      const formDataObj = new FormData(form)
      const title = formDataObj.get('title') as string
      const description = formDataObj.get('description') as string
      const url = formDataObj.get('url') as string
      const tagsString = formDataObj.get('tags') as string
      
      // Procesar tags: dividir por comas y limpiar espacios
      const tags = tagsString
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      if (editingResource) {
        // Actualizar recurso existente
        await updateResource(editingResource.id, {
          title,
          description,
          url,
          tags
        })
      } else {
        // Crear nuevo recurso
        await addResource({
          title,
          description,
          url,
          tags
        })
      }

      closeAddItemModal()
      // Limpiar formulario si es nuevo recurso
      if (!editingResource) {
        ;(e.target as HTMLFormElement).reset()
      }
    } catch (error) {
      console.error('Error al procesar recurso:', error)
      alert('Error al procesar el recurso. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeAddItemModal()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-black border-2 border-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingResource ? 'Editar Recurso' : 'Agregar Nuevo Recurso'}
            </h2>
            <button
              onClick={closeAddItemModal}
              className="text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Título */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Título <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Ej. Figma"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                disabled={loading}
                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Descripción <span className="text-red-400">*</span>
              </label>
              <textarea
                name="description"
                placeholder="Describe brevemente el recurso..."
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                disabled={loading}
                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none disabled:opacity-50"
              />
            </div>

            {/* URL del Sitio */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                URL del Sitio <span className="text-red-400">*</span>
              </label>
              <input
                type="url"
                name="url"
                placeholder="https://"
                value={formData.url}
                onChange={(e) => setFormData({...formData, url: e.target.value})}
                required
                disabled={loading}
                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                placeholder="diseño, herramientas, ui/ux"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                disabled={loading}
                className="w-full px-3 py-2 bg-transparent border border-white/30 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none disabled:opacity-50"
              />
              <p className="text-xs text-gray-400 mt-1">Separar con comas</p>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={closeAddItemModal}
                disabled={loading}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading 
                  ? (editingResource ? 'Actualizando...' : 'Agregando...') 
                  : (editingResource ? 'Actualizar Recurso' : 'Agregar Recurso')
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
