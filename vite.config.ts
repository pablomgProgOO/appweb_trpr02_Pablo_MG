import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/tp02/",
  test: {
    environment: 'jsdom', // THIS is the critical line
  },
})
