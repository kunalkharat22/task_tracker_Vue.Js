import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   proxy: {
  //     '/.netlify/functions': {
  //       target: 'https://curious-daifuku-b7fe27.netlify.app/.netlify/functions/tasks', // Replace with the URL of your Netlify serverless function
  //       changeOrigin: true,
  //       logLevel: 'debug',
  //     },
  //   },
  // },
})
