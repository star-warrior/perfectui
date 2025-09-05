import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: "perfectui-ekjs6a8y3-star-warriors-projects.vercel.app",
        changeOrigin: true,
        secure: false
      }, '/auth': {
        target: "perfectui-ekjs6a8y3-star-warriors-projects.vercel.app",
        changeOrigin: true,
      }
    }
  }
})
