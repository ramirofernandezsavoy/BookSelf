import useStore from '../stores/useStore'
import { useEffect } from 'react'
import ResourceCard from './ResourceCard'

export default function Resources() {
  const { resources, loading, fetchResources, openAddItemModal } = useStore()

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  return (
    <section className="text-white">
      <div className="bg-violet-950/20 p-6 border-2 border-white rounded-2xl h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recursos Disponibles ({resources.length})</h2>
          <button 
            onClick={openAddItemModal}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Agregar Recurso
          </button>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-gray-400">Cargando recursos...</div>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No hay recursos todavía</p>            
          </div>
        ) : (
          /* Grid de recursos - bento grid responsive */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
  );
}
