// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite'
import { ViteMinifyPlugin } from 'vite-plugin-minify' 

export default defineConfig({
  base: './',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        file: resolve(__dirname, 'src/index.html'),
      }
    }
  },
  plugins: [
    ViteMinifyPlugin({}),
  ]
})