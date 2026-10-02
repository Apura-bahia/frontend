import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy : {
      // Toda requisição que começar com /items será redirecionada para o backend
      '/items': {
        target: 'https://backend-8088.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      
      '/api': {
        target: 'https://backend-8088.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
