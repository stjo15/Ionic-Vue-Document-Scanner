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
      manifest: {
        "name": "WebCur Patient Scanner",
        "short_name": "WebCur Scanner",
        "description": "An app to scan and manage documents and upload them to Webcur EHR",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#156d6f",
        "orientation": "portrait",
        "icons": [
          {
            "src": "/icons/favicon.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "/icons/webcur_logo.png",
            "sizes": "280x272",
            "type": "image/png"
          }
        ],
        "screenshots": [
          {
            "src": "/screenshots/screenshot_home.png",
            "sizes": "1080x2340",
            "type": "image/png"
          }
        ]
      }
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
