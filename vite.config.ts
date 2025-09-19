import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  build: {
    rollupOptions: {
      external: (id) => /\.did$/.test(id),
    },
  },
  optimizeDeps: {
    exclude: ['*.did'],
    include: [
      '@dfinity/agent',
      '@dfinity/candid',
      '@dfinity/principal',
      '@dfinity/auth-client'
    ],
  },
  assetsInclude: [/\.did$/],
  server: {
    port: 5173,
    fs: {
      // Allow serving files from declarations
      allow: [
        '..',
        './src/services/declarations'
      ]
    }
  }
})