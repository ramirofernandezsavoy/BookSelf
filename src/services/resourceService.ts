import { supabase } from '../utils/supabase'
import type { Resource } from '../stores/useStore'

// Obtener todos los recursos
export const getResources = async (): Promise<Resource[]> => {
  console.log('🗄️ Llamando a Supabase para obtener recursos...')
  
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching resources from Supabase:', error)
    throw error
  }

  console.log('📥 Respuesta cruda de Supabase:', data)
  console.log('📋 Número de recursos encontrados:', data?.length || 0)

  return data || []
}

// Crear un nuevo recurso
export const createResource = async (resource: {
  title: string
  description: string
  url: string
  tags: string[]
}): Promise<Resource> => {
  console.log('➕ Creando nuevo recurso:', resource)
  
  const { data, error } = await supabase
    .from('resources')
    .insert([resource])
    .select()
    .single()

  if (error) {
    console.error('❌ Error creating resource in Supabase:', error)
    throw error
  }

  console.log('✅ Recurso creado exitosamente:', data)
  return data
}

// Actualizar un recurso existente
export const updateResource = async (id: number, resource: {
  title: string
  description: string
  url: string
  tags: string[]
}): Promise<Resource> => {
  console.log('✏️ Actualizando recurso:', id, resource)
  
  const { data, error } = await supabase
    .from('resources')
    .update(resource)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('❌ Error updating resource in Supabase:', error)
    throw error
  }

  console.log('✅ Recurso actualizado exitosamente:', data)
  return data
}

// Eliminar un recurso
export const deleteResource = async (id: number): Promise<void> => {
  console.log('🗑️ Eliminando recurso:', id)
  
  const { error } = await supabase
    .from('resources')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('❌ Error deleting resource in Supabase:', error)
    throw error
  }

  console.log('✅ Recurso eliminado exitosamente')
}

// Buscar recursos por texto
export const searchResources = async (query: string): Promise<Resource[]> => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching resources:', error)
    throw error
  }

  return data || []
}

// Filtrar recursos por tags
export const filterResourcesByTags = async (tags: string[]): Promise<Resource[]> => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .overlaps('tags', tags)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error filtering resources:', error)
    throw error
  }

  return data || []
}
