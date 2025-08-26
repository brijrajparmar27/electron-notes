import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve('src/main/index.ts')
      }
    },
    resolve: {
      alias: {
        '@/lib': resolve('src/main/lib'),
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      lib: {
        entry: resolve('src/preload/index.ts')
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets/**',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@shared': resolve('src/shared'),
        '@/components': resolve('src/renderer/src/components'),
        '@/assets': resolve('src/renderer/src/assets'),
        '@/utils': resolve('src/renderer/src/utils'),
        '@/hooks': resolve('src/renderer/src/hooks'),
        '@/store': resolve('src/renderer/src/store')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
