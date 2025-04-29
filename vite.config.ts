import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/appweb_trpr02_Pablo_MG/',
  test: {
    environment: 'jsdom', // THIS is the critical line
  },
})
