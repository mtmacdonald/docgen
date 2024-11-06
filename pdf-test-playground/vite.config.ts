import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: '/pdf-test-playground/index.html',
  },
  define: {
    'process.env': {}
  }
})
