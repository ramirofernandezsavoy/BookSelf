
import { useState, useEffect } from 'react'
import useStore from '../stores/useStore'
import { getTagColor } from '../utils/tagColors'

export default function Filters() {
  const { searchResources, availableTags, getUniqueTags, resources, selectedTag, filterByTag } = useStore()
  const [localQuery, setLocalQuery] = useState('')

  // Forzar actualización de tags cuando cambian los recursos
  useEffect(() => {
    if (resources.length > 0) {
      getUniqueTags()
    }
  }, [resources, getUniqueTags])

  // Debounce search - buscar 500ms después de que el usuario pare de escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      searchResources(localQuery)
    }, 500)

    return () => clearTimeout(timer)
  }, [localQuery, searchResources])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalQuery(value)
  }

  const handleTagFilter = (tag: string | null) => {
    filterByTag(tag)
  }

  return (
    <section className="text-white max-w-7xl mx-auto px-4">
      <div className="p-4 mb-6">
        <input 
          type="text" 
          value={localQuery}
          onChange={handleInputChange}
          className="w-full py-2 px-3 rounded-lg bg-black/20 backdrop-blur-sm border border-cyan-400/20 text-sm text-white placeholder-gray-400 mb-3 focus:outline-none focus:border-cyan-400/40 focus:bg-black/30 transition-all" 
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
