// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: './',
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        file: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [
    ViteMinifyPlugin({}),
    VitePWA({
      registerType: 'prompt',
      injectRegister: 'auto',
      workbox: {
        globPatterns: [
          '**/*.{css,js,ico,webmanifest,png,svg,webp,avif,jpg,jpeg}',
        ],
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            urlPattern: /.*\.(html|css|js|png|jpg|jpeg|webp|avif|ico)/,
            method: 'GET',
            options: {
              backgroundSync: {
                name: 'assetQueue',
                options: {
                  maxRetentionTime: 24 * 60,
                },
              },
            },
          },
        ],
      },
      manifest: {
        name: 'Light Meter',
        short_name: 'light-meter',
        description:
          'App that measueres light in a scene to determine camera settings.',
        icons: [
          {
            src: './icons/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: './icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: './icons/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: './icons/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        start_url: '/projects/light-meter/index.html',
        display: 'fullscreen',
        theme_color: '#ffffff',
        background_color: '#ffffff',
      },
    }),
  ],
});
