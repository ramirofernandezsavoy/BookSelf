// Colores para los tags
export const tagColors = [
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

// Función para generar un hash simple del texto
const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convertir a 32bit integer
  }
  return Math.abs(hash)
}

// Función para obtener el color de un tag basado en su texto
export const getTagColor = (tagText: string): string => {
  const hash = hashCode(tagText.toLowerCase().trim())
  const colorIndex = hash % tagColors.length
  return tagColors[colorIndex]
}
