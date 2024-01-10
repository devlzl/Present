import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@BlockHub': path.resolve(__dirname, 'src/BlockHub'),
      '@Const': path.resolve(__dirname, 'src/Const'),
      '@Kernel': path.resolve(__dirname, 'src/Kernel'),
      '@Lang': path.resolve(__dirname, 'src/Lang'),
      '@RichText': path.resolve(__dirname, 'src/RichText'),
      '@UserInterface': path.resolve(__dirname, 'src/UserInterface'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
    },
  },
})
