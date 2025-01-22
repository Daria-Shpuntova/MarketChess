import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // или '0.0.0.0', чтобы принимать запросы с других IP
    port: 3000,
  },
})
