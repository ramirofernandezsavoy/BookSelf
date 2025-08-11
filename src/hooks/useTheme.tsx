import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Obtener tema guardado o usar preferencia del sistema como inicial
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      return savedTheme
    }
    // Si no hay tema guardado, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const applyTheme = (currentTheme: Theme) => {
      const root = document.documentElement
      root.classList.toggle('dark', currentTheme === 'dark')
    }

    // Aplicar tema inicial
    applyTheme(theme)
    
    // Guardar en localStorage
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(current => current === 'light' ? 'dark' : 'light')
  }

  return {
    theme,
    toggleTheme,
    setTheme
  }
}
