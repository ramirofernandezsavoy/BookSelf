import { useTheme } from '../hooks/useTheme'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Solo usar el hook para inicializar el tema
  useTheme()
  
  return <>{children}</>
}
