import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8500',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'], // if you have global setup
    globals: true,
  },
})
