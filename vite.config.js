import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/_prelude.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
