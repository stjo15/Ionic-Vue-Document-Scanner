/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat image cropper as custom elements
          isCustomElement: (tag) => tag.includes('image-cropper')
        }
      }
    }),
    vueJsx(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      devOptions: {
        enabled: true
      },
      manifest: false
      /* manifest: {
        name: 'Document Scanner',
        short_name: 'DocumentScanner',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.png', // 'pwa-192x192.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'favicon.png', //'pwa-512x512.png',
            sizes: '64x64',
            type: 'image/png'
          }
        ]
      } */
    }),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
