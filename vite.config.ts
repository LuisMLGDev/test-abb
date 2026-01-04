import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use /test-abb/ for GitHub Pages, / for local development
  base: process.env.VITE_BASE_PATH || "/",
})
