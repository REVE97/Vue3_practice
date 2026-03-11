import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // CORS 적용법
  // server: {
  //   port: 4545,
  //   proxy: {
  //     'api': {
  //       target: 'http://localhost:9100',
  //       changeOrigin: true,
  //       secure: false,
  //     }
  //   }
  // }
})
