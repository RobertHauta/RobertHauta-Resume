import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/RobertHauta-Resume/' : '/',
  server: {
    port: 80,
    host: '0.0.0.0',
    watch: {
      usePolling: true,
    },
    hmr: {
      protocol: 'wss',
      host: 'dev.roberthauta.com',
      port: 443,
      clientPort: 443,
    },
    allowedHosts: [
      'dev.roberthauta.com',
      'localhost',
      '127.0.0.1',
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
