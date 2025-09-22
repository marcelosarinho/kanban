import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@libs": "/src/libs",
      "@pages": "/src/pages",
      "@schemas": "/src/schemas",
      "@utils": "/src/utils",
      "@api": "/src/api",
      "@contexts": "/src/contexts",
      "@providers": "/src/providers",
    }
  }
})
