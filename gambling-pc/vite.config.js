import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'path'

const alias = {
  '@': path.resolve(__dirname, './src'),
  vue$: 'vue/dist/vue.runtime.esm-bundler.js'
}


const rollupOptions = {
  output: {
    entryFileNames: 'assets/[name].[hash].js',
    chunkFileNames: 'assets/[name].[hash].js',
    assetFileNames: 'assets/[name].[hash].[ext]'
  }
}

const base = "/"
const root = "./"
const outDir = "dist"

// https://vite.dev/config/
export default defineConfig({
  base: base, // 编译后js导入的资源路径
  root: root, // index.html文件所在位置
  publicDir: 'public', // 静态资源文件夹
  resolve: {
    alias
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5175,
    proxy: {
      // https://apiam.ad771.cn/Lot_34/Draw/NextDrawingTime
      '/moapi': {
        target: 'https://api.00853lhc.com/api',
        rewrite: (path) => path.replace(/^\/moapi/, ''),
        changeOrigin: true,
      },
       '/xmoapi': {
        target: 'https://apiam.ad771.cn',
        changeOrigin: true,
      },
      '/qxcv1': {
        target: 'http://127.0.0.1:5000/api',
        rewrite: (path) => path.replace(/^\/qxcv1/, ''),
        changeOrigin: true,
      }
    }
  },
  build: {
    minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
    manifest: false, // 是否产出manifest.json
    sourcemap: false, // 是否产出sourcemap.json
    outDir: outDir, // 产出目录
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions
  },
  plugins: [vue(),tailwindcss()],
})
