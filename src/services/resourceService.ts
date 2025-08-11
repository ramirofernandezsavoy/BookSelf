import { supabase } from '../lib/supabase'
import type { Resource } from '../stores/useStore'

// Obtener todos los recursos
export const getResources = async (): Promise<Resource[]> => {
  // Obtener el usuario actual
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return []
  }
  
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('❌ Error fetching resources from Supabase:', error)
    throw error
  }

  return data || []
}

// Crear un nuevo recurso
export const createResource = async (resource: {
  title: string
  description: string
  url: string
  tags: string[]
}): Promise<Resource> => {
  // Obtener el usuario actual
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Usuario no autenticado')
  }
  
  const resourceWithUser = {
    ...resource,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('links')
    .insert([resourceWithUser])
    .select()
    .single()

  if (error) {
    console.error('❌ Error creating resource in Supabase:', error)
    throw error
  }

  return data
}

// Actualizar un recurso existente
export const updateResource = async (id: number, resource: {
  title: string
  description: string
  url: string
  tags: string[]
}): Promise<Resource> => {
  const { data, error } = await supabase
    .from('links')
    .update(resource)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('❌ Error updating resource in Supabase:', error)
    throw error
  }

  return data
}

// Eliminar un recurso
export const deleteResource = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('❌ Error deleting resource in Supabase:', error)
    throw error
  }
}

// Buscar recursos por texto
export const searchResources = async (query: string): Promise<Resource[]> => {
  const { data, error } = await supabase
    .from('links')
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
    .from('links')
    .select('*')
    .overlaps('tags', tags)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error filtering resources:', error)
    throw error
  }

  return data || []
}
