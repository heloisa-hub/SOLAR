import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  // Publicado agora em heloisa-hub.github.io/SOLAR/ enquanto o DNS do
  // domínio próprio não propaga (ver README). Quando solarcapital.com.br
  // estiver resolvendo, trocar para '/' e restaurar o CNAME como fonte da
  // verdade do domínio.
  base: '/SOLAR/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
