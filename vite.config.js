import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// NOTE: 'base' must match your GitHub repository name exactly
// Example: if your repo is https://github.com/yourname/maak-designs → base: '/maak-designs/'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/maak-designs/',
})
