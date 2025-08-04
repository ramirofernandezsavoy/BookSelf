import type { Resource } from '../stores/useStore'

// Colores para los tags
const tagColors = [
  'bg-blue-100 text-blue-600',
  'bg-purple-100 text-purple-600', 
  'bg-green-100 text-green-600',
  'bg-yellow-100 text-yellow-600',
  'bg-pink-100 text-pink-600',
  'bg-indigo-100 text-indigo-600',
  'bg-red-100 text-red-600',
  'bg-cyan-100 text-cyan-600',
  'bg-orange-100 text-orange-600',
  'bg-emerald-100 text-emerald-600'
]

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getTagColor = (index: number) => {
    return tagColors[index % tagColors.length]
  }

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

  console.log('🏷️ Tags originales:', resource.tags)
  console.log('🏷️ Tags procesados:', processedTags)

  return (
    <a 
      href={resource.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white/10 rounded-lg p-4 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all cursor-pointer h-full flex flex-col"
    >
      <h3 className="font-semibold mb-2 text-lg">{resource.title}</h3>
      <p className="text-sm text-gray-300 mb-3 flex-grow">
        {resource.description}
      </p>
      {processedTags.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-auto">
          {processedTags.map((tag, index) => (
            <span 
              key={index}
              className={`${getTagColor(index)} px-2 py-1 rounded text-xs`}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </a>
  )
}
