import type { Resource } from '../stores/useStore'
import { getTagColor } from '../utils/tagColors'
import useStore from '../stores/useStore'

interface ResourceCardProps {
  resource: Resource
  onEdit: (resource: Resource) => void
}

export default function ResourceCard({ resource, onEdit }: ResourceCardProps) {
  const { deleteResource } = useStore()

  // Procesar tags - manejar tanto arrays como strings JSON
  const processTags = (tags: any): string[] => {
    if (!tags) return []
    
    // Si ya es un array, devolverlo
    if (Array.isArray(tags)) {
      return tags
    }
    
    // Si es un string JSON, parsearlo
    if (typeof tags === 'string') {
      try {
        const parsed = JSON.parse(tags)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        // Si no es JSON válido, dividir por comas
        return tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      }
    }
    
    return []
  }

  const processedTags = processTags(resource.tags)

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEdit(resource)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Mostrar confirmación
    const confirmDelete = window.confirm(
      `Do you want to eliminate "${resource.title}"?\n\nThis action cannot be undone.`
    )
    
    if (confirmDelete) {
      try {
        await deleteResource(resource.id)
      } catch (error) {
        console.error('Error al eliminar recurso:', error)
        alert('Error al eliminar el recurso. Por favor intenta de nuevo.')
      }
    }
  }

  return (
    <div 
      className="backdrop-blur-md rounded-lg p-3 hover:backdrop-blur-lg transition-all duration-300 h-full flex flex-col relative group shadow-md hover:shadow-lg"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-primary)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-glass-hover)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
      }}
    >
      {/* Botones de acción en la esquina superior derecha */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleEdit}
          className="p-1 backdrop-blur-sm rounded transition-all duration-200"
          style={{
            backgroundColor: 'var(--button-bg)',
            border: '1px solid var(--border-primary)',
            color: 'var(--button-text)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)';
            e.currentTarget.style.borderColor = 'var(--border-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--button-bg)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
          }}
          title="Edit resource"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
        <button
          onClick={handleDelete}
          className="p-1 backdrop-blur-sm hover:bg-rose-500/20 border border-rose-400/40 hover:border-rose-400/60 text-rose-400 hover:text-rose-300 rounded transition-all duration-200"
          title="Delete resource"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>

      {/* Contenido principal de la card (clickeable) */}
      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex flex-col h-full cursor-pointer"
      >
        <h3 
          className="font-medium mb-2 text-base pr-12 transition-colors duration-300"
          style={{ color: 'var(--text-primary)' }}
        >
          {resource.title}
        </h3>
        <p 
          className="text-xs mb-2 flex-grow transition-colors duration-300"
          style={{ color: 'var(--text-secondary)' }}
        >
          {resource.description}
        </p>
        {processedTags.length > 0 && (
          <div className="flex gap-1 flex-wrap mt-auto">
            {processedTags.map((tag, index) => (
              <span 
                key={index}
                className={`${getTagColor(tag)} px-2 py-1 rounded text-xs`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </a>
    </div>
  )
}
