// Colores ciberpunk coherentes con base cyan y variaciones sutiles
export const tagColors = [
  'bg-cyan-500/30 backdrop-blur-sm text-cyan-200 border border-cyan-400/25',
  'bg-purple-500/25 backdrop-blur-sm text-purple-200 border border-purple-400/25', 
  'bg-teal-500/25 backdrop-blur-sm text-teal-200 border border-teal-400/25',
  'bg-indigo-500/25 backdrop-blur-sm text-indigo-200 border border-indigo-400/25',
  'bg-cyan-600/25 backdrop-blur-sm text-cyan-200 border border-cyan-500/25',
  'bg-violet-500/25 backdrop-blur-sm text-violet-200 border border-violet-400/25',
  'bg-sky-500/25 backdrop-blur-sm text-sky-200 border border-sky-400/25',
  'bg-blue-500/25 backdrop-blur-sm text-blue-200 border border-blue-400/25',
  'bg-purple-600/25 backdrop-blur-sm text-purple-200 border border-purple-500/25',
  'bg-teal-600/25 backdrop-blur-sm text-teal-200 border border-teal-500/25'
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
