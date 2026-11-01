import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { previewForms } from './server/previewForms.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    previewForms(),
    react(),
    tailwindcss(),
  ],
})
