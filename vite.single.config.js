import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Le JS étant émis en IIFE, il n'a pas besoin d'être un module ES.
// Les modules ES sont bloqués sous file:// (Firefox/Safari) et par certaines
// visionneuses sandboxées ; on les convertit en scripts classiques.
// Un script classique n'étant pas différé, on le déplace en fin de <body>
// pour que #root existe déjà au moment de l'exécution (sinon React échoue).
function classicScriptPlugin() {
  return {
    name: 'classic-inline-script',
    enforce: 'post',
    closeBundle() {
      const file = resolve('dist-single/index.html')
      let html = readFileSync(file, 'utf8')
      html = html.replace(/<script type="module"(?:\s+crossorigin)?>/g, '<script>')
      const scripts = []
      html = html.replace(/<script>[\s\S]*?<\/script>/g, (m) => {
        scripts.push(m)
        return ''
      })
      html = html.replace('</body>', `${scripts.join('\n')}\n</body>`)
      writeFileSync(file, html)
    },
  }
}

// Build "fichier unique" : tout (JS + CSS) est inliné dans un seul index.html
// ouvrable directement dans un navigateur, sans serveur.
//
// Le JS est émis en format IIFE (script classique, pas `type="module"`) pour
// une compatibilité maximale : ouverture en file://, e-mail, clé USB, et
// visionneuses HTML sandboxées qui bloquent souvent les modules ES.
//
// Usage : npm run build:single  ->  dist-single/index.html
export default defineConfig({
  plugins: [react(), viteSingleFile({ useRecommendedBuildConfig: false }), classicScriptPlugin()],
  build: {
    outDir: 'dist-single',
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    target: 'es2018',
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
