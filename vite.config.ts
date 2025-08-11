import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Desactiva sourcemaps en producción
    minify: 'esbuild', // Usar esbuild en lugar de terser (más rápido y no requiere instalación adicional)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          utils: ['zustand']
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
