import { create } from 'zustand'
import { getResources, createResource, searchResources as searchResourcesService, filterResourcesByTags, updateResource, deleteResource } from '../services/resourceService'

// Tipos para los recursos
export interface Resource {
  id: number
  created_at: string
  title: string
  description: string
  url: string
  tags: string[]
}

interface StoreState {
  // Recursos
  resources: Resource[]
  loading: boolean
  searchQuery: string
  availableTags: string[]
  selectedTag: string | null
  setResources: (resources: Resource[]) => void
  fetchResources: () => Promise<void>
  addResource: (resource: Omit<Resource, 'id' | 'created_at'>) => Promise<void>
  updateResource: (id: number, resource: Omit<Resource, 'id' | 'created_at'>) => Promise<void>
  deleteResource: (id: number) => Promise<void>
  setSearchQuery: (query: string) => void
  searchResources: (query: string) => Promise<void>
  getUniqueTags: () => string[]
  filterByTag: (tag: string | null) => Promise<void>
  
  // Modal state
  isAddItemModalOpen: boolean
  editingResource: Resource | null
  openAddItemModal: () => void
  openEditModal: (resource: Resource) => void
  closeAddItemModal: () => void
}

const useStore = create<StoreState>((set, get) => ({
  // Recursos
  resources: [],
  loading: false,
  searchQuery: '',
  availableTags: [],
  selectedTag: null,
  editingResource: null,
  setResources: (resources: Resource[]) => {
    console.log('📦 Estableciendo recursos:', resources.length)
    set({ resources })
    // Actualizar tags disponibles después de establecer los recursos
    setTimeout(() => {
      const tags = get().getUniqueTags()
      console.log('🔄 Actualizando availableTags:', tags)
      set({ availableTags: tags })
    }, 0)
  },
  
  fetchResources: async () => {
    try {
      console.log('🔄 Iniciando fetchResources...')
      set({ loading: true })
      const resources = await getResources()
      console.log('✅ Recursos obtenidos de Supabase:', resources)
      set({ resources })
      
      // Actualizar tags después de obtener recursos
      const tags = get().getUniqueTags()
      console.log('🏷️ Tags extraídos en fetchResources:', tags)
      set({ availableTags: tags })
    } catch (error) {
      console.error('❌ Error fetching resources:', error)
    } finally {
      set({ loading: false })
      console.log('🏁 fetchResources completado')
    }
  },
  
  addResource: async (resource: Omit<Resource, 'id' | 'created_at'>) => {
    try {
      const newResource = await createResource(resource)
      set({ resources: [newResource, ...get().resources] })
    } catch (error) {
      console.error('Error adding resource:', error)
      throw error
    }
  },

  updateResource: async (id: number, resource: Omit<Resource, 'id' | 'created_at'>) => {
    try {
      const updatedResource = await updateResource(id, resource)
      const resources = get().resources.map(r => 
        r.id === id ? updatedResource : r
      )
      set({ resources })
    } catch (error) {
      console.error('Error updating resource:', error)
      throw error
    }
  },

  deleteResource: async (id: number) => {
    try {
      await deleteResource(id)
      const resources = get().resources.filter(r => r.id !== id)
      set({ resources })
    } catch (error) {
      console.error('Error deleting resource:', error)
      throw error
    }
  },
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  searchResources: async (query: string) => {
    try {
      console.log('🔍 Buscando recursos con query:', query)
      set({ loading: true, searchQuery: query })
      
      if (query.trim() === '') {
        // Si la búsqueda está vacía, mostrar todos los recursos
        const resources = await getResources()
        set({ resources })
        // Actualizar tags después de búsqueda
        const tags = get().getUniqueTags()
        set({ availableTags: tags })
      } else {
        // Buscar recursos que coincidan con el query
        const resources = await searchResourcesService(query)
        set({ resources })
        // Actualizar tags después de búsqueda
        const tags = get().getUniqueTags()
        set({ availableTags: tags })
      }
    } catch (error) {
      console.error('❌ Error searching resources:', error)
    } finally {
      set({ loading: false })
    }
  },

  getUniqueTags: () => {
    const { resources } = get()
    console.log('🏷️ Recursos para extraer tags:', resources)
    const allTags = new Set<string>()
    
    // Usar la misma lógica de procesamiento que ResourceCard
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
    
    resources.forEach(resource => {
      console.log('🔍 Procesando recurso:', resource.title, 'Tags raw:', resource.tags)
      const processedTags = processTags(resource.tags)
      console.log('🔍 Tags procesados:', processedTags)
      
      processedTags.forEach(tag => {
        if (typeof tag === 'string' && tag.trim()) {
          console.log('✅ Tag válido encontrado:', tag.trim())
          allTags.add(tag.trim())
        }
      })
    })
    
    const uniqueTags = Array.from(allTags).sort()
    console.log('🎯 Tags únicos extraídos:', uniqueTags)
    return uniqueTags
  },

  filterByTag: async (tag: string | null) => {
    try {
      console.log('🏷️ Filtrando por tag:', tag)
      set({ loading: true, selectedTag: tag })
      
      if (!tag) {
        // Si no hay tag seleccionado, mostrar todos los recursos
        const resources = await getResources()
        set({ resources })
      } else {
        // Filtrar recursos que contengan el tag específico
        const resources = await filterResourcesByTags([tag])
        set({ resources })
      }
      
      // Actualizar tags disponibles
      const tags = get().getUniqueTags()
      set({ availableTags: tags })
    } catch (error) {
      console.error('❌ Error filtering by tag:', error)
    } finally {
      set({ loading: false })
    }
  },
  
  // Modal state
  isAddItemModalOpen: false,
  openAddItemModal: () => set({ isAddItemModalOpen: true, editingResource: null }),
  openEditModal: (resource: Resource) => set({ isAddItemModalOpen: true, editingResource: resource }),
  closeAddItemModal: () => set({ isAddItemModalOpen: false, editingResource: null }),
}))

export default useStore