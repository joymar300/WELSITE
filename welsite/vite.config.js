import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png,'],
  plugins: [react()],
  resolve: {
    alias: {
      "@stitches/react": "/path/to/@stitches/react", // Ajusta la ruta según la ubicación real
    },
  },
   // Agrega esta línea para incluir archivos PNG en los activos.
})
