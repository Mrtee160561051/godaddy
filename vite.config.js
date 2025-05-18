import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base:"/godaddy/",
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps
  },
  minify: 'terser', // Use Terser for better minification
  terserOptions: {
    compress: {
      drop_console: true, // Remove console logs
      drop_debugger: true // Remove debugger statements
    }
  }
})