import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  const getIcon = () => {
    if (theme === 'light') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 17q-2.075 0-3.537-1.463Q7 14.075 7 12t1.463-3.538Q9.925 7 12 7t3.538 1.462Q17 9.925 17 12q0 2.075-1.462 3.537Q14.075 17 12 17ZM2 13q-.425 0-.712-.288Q1 12.425 1 12t.288-.713Q1.575 11 2 11h2q.425 0 .713.287Q5 11.575 5 12t-.287.712Q4.425 13 4 13Zm18 0q-.425 0-.712-.288Q19 12.425 19 12t.288-.713Q19.575 11 20 11h2q.425 0 .712.287Q23 11.575 23 12t-.288.712Q22.425 13 22 13Zm-8-8q-.425 0-.712-.288Q11 4.425 11 4V2q0-.425.288-.713Q11.575 1 12 1t.713.287Q13 1.575 13 2v2q0 .425-.287.712Q12.425 5 12 5Zm0 18q-.425 0-.712-.288Q11 22.425 11 22v-2q0-.425.288-.712Q11.575 19 12 19t.713.288Q13 19.575 13 20v2q0 .425-.287.712Q12.425 23 12 23ZM5.65 7.05 4.575 6q-.3-.275-.288-.7q.013-.425.288-.725q.3-.3.725-.3t.7.3L7.05 5.65q.275.3.275.7q0 .4-.275.7q-.275.3-.687.287q-.413-.012-.713-.287ZM18 19.425l-1.05-1.075q-.275-.3-.275-.712q0-.413.275-.688q.275-.3.688-.287q.412.012.687.287L19.425 18q.3.275.288.7q-.013.425-.288.725q-.3.3-.725.3t-.7-.3ZM16.95 7.05q-.3-.275-.287-.688q.012-.412.287-.687L18 4.575q.275-.3.7-.288q.425.013.725.288q.3.3.3.725t-.3.7L18.35 7.05q-.3.275-.7.275q-.4 0-.7-.275ZM4.575 19.425q-.3-.3-.3-.725t.3-.7l1.075-1.05q.3-.275.713-.275q.412 0 .687.275q.3.275.288.688q-.013.412-.288.687L6 19.425q-.275.3-.7.288q-.425-.013-.725-.288Z"/>
        </svg>
      )
    } else {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21q-3.75 0-6.375-2.625T3 12q0-3.75 2.625-6.375T12 3q.35 0 .688.025q.337.025.662.075q-1.025.725-1.637 1.887Q11.1 6.15 11.1 7.5q0 2.25 1.575 3.825Q14.25 12.9 16.5 12.9q1.375 0 2.525-.613q1.15-.612 1.875-1.637q.05.325.075.662Q21 11.65 21 12q0 3.75-2.625 6.375T12 21Z"/>
        </svg>
      )
    }
  }
  
  const getTooltip = () => {
    return theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-primary)',
        color: 'var(--text-primary)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-glass-hover)';
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-glass)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
      title={getTooltip()}
    >
      <div className="transition-transform duration-300">
        {getIcon()}
      </div>
      
      {/* Indicador pequeño del modo actual */}
      <div 
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: 'var(--button-bg)',
          border: '1px solid var(--border-primary)',
          color: 'var(--button-text)'
        }}
      >
        <span className="text-[8px] font-bold">
          {theme === 'light' ? '☀' : '🌙'}
        </span>
      </div>
    </button>
  )
}
