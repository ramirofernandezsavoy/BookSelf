// Colores ciberpunk coherentes que se adaptan al tema claro/oscuro
export const tagColors = [
  'tag-cyan',
  'tag-purple', 
  'tag-teal',
  'tag-indigo',
  'tag-cyan-alt',
  'tag-violet',
  'tag-sky',
  'tag-blue',
  'tag-purple-alt',
  'tag-teal-alt'
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
