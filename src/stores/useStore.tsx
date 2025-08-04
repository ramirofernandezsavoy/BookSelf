import { create } from 'zustand'
import { getResources, createResource } from '../services/resourceService'

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
  setResources: (resources: Resource[]) => void
  fetchResources: () => Promise<void>
  addResource: (resource: Omit<Resource, 'id' | 'created_at'>) => Promise<void>
  
  // Modal state
  isAddItemModalOpen: boolean
  openAddItemModal: () => void
  closeAddItemModal: () => void
}

const useStore = create<StoreState>((set, get) => ({
  // Recursos
  resources: [],
  loading: false,
  setResources: (resources: Resource[]) => set({ resources }),
  
  fetchResources: async () => {
    try {
      console.log('🔄 Iniciando fetchResources...')
      set({ loading: true })
      const resources = await getResources()
      console.log('✅ Recursos obtenidos de Supabase:', resources)
      set({ resources })
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
  
  // Modal state
  isAddItemModalOpen: false,
  openAddItemModal: () => set({ isAddItemModalOpen: true }),
  closeAddItemModal: () => set({ isAddItemModalOpen: false }),
}))

export default useStore