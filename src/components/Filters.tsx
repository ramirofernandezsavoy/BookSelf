
import { useState, useEffect } from 'react'
import useStore from '../stores/useStore'
import { getTagColor } from '../utils/tagColors'

export default function Filters() {
  const { searchResources, availableTags, getUniqueTags, resources, selectedTag, filterByTag } = useStore()
  const [localQuery, setLocalQuery] = useState('')

  // Forzar actualización de tags cuando cambian los recursos
  useEffect(() => {
    if (resources.length > 0) {
      const tags = getUniqueTags()
      console.log('🔄 Actualizando tags manualmente:', tags)
    }
  }, [resources, getUniqueTags])

  console.log('🎨 Tags disponibles en Filters:', availableTags)
  console.log('📋 Recursos disponibles:', resources.length)

  // Debounce search - buscar 500ms después de que el usuario pare de escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('🔍 Ejecutando búsqueda con:', localQuery)
      searchResources(localQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [localQuery, searchResources])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    console.log('📝 Input cambió a:', value)
    setLocalQuery(value)
  }

  const handleTagFilter = (tag: string | null) => {
    console.log('🏷️ Filtro de tag seleccionado:', tag)
    filterByTag(tag)
  }

  return (
    <section className="text-white p-4 max-w-7xl mx-auto">
      <div className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl">        
        <input 
          type="text" 
          value={localQuery}
          onChange={handleInputChange}
          className="w-full py-3 px-4 rounded-lg bg-transparent border border-white/30 text-white placeholder-gray-400 mb-4 focus:border-blue-400 focus:outline-none" 
          placeholder="Search titles and descriptions..."
        />
        <div className="flex space-x-3 justify-start flex-wrap gap-y-3">
          <button 
            onClick={() => handleTagFilter(null)}
            className={`px-2 py-1 rounded text-xs font-medium transition-opacity ${
              selectedTag === null 
                ? 'bg-blue-500 text-white' 
                : 'bg-blue-100 text-blue-600 hover:opacity-80'
            }`}
          >
            All Resources
          </button>
          {availableTags.map((tag) => (
            <button 
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={`px-2 py-1 rounded text-xs font-medium transition-opacity ${
                selectedTag === tag
                  ? 'ring-2 ring-blue-400 ' + getTagColor(tag)
                  : getTagColor(tag) + ' hover:opacity-80'
              }`}
            >
              {tag}
            </button>
          ))}          
        </div>
      </div>
    </section>
  );
}
