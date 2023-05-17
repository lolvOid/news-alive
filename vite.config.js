import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'vitest-plugin-beforeall'
    },

    vue({
      reactivityTransform: true,
    }),
    vuetify({ autoImport: true }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
      '.css',
      '.scss',
    ],
  },

  server: {
    host: true,
    port: 8000,
  },
})
