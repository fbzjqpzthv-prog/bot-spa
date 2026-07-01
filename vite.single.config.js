import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Build "fichier unique" : tout (JS + CSS) est inliné dans un seul index.html
// ouvrable directement dans un navigateur, sans serveur.
// Usage : npm run build:single  ->  dist-single/index.html
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
  },
})
