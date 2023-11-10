/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  define: { 
    'import.meta.vitest': process.env.NODE_ENV !== 'test' && 'undefined', 
  }, 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})