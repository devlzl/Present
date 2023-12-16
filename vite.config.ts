import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@UserInterface': path.resolve(__dirname, 'src/UserInterface'),
      '@Kernel': path.resolve(__dirname, 'src/Kernel'),
    },
  },
})
