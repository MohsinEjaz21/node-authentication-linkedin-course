import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
const path = require('path')

export default defineConfig({
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'config': path.resolve(__dirname, './src/config'),
    },
  },
  plugins: [react()]
})
