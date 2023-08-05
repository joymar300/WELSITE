import { defineConfig } from 'vite'
<<<<<<< HEAD
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
=======
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.png,'],
  plugins: [react()],
   // Agrega esta línea para incluir archivos PNG en los activos.
>>>>>>> porsilascago
})
