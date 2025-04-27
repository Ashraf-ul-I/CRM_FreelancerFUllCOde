import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      colors: {
        primary: '#244855', // 👈 your color added
      },
    },
  },
  plugins: [react(),tailwindcss()],
})
