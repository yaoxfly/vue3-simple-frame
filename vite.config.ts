import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import progress from 'vite-plugin-progress'
export default ({ mode, command }: ConfigEnv): UserConfigExport => defineConfig({
  // 部署在二级目录下，也需要加个二级目录
  base: loadEnv(mode, process.cwd()).VITE_APP_PUBLIC_PATH,
  plugins: [
    vue(),
    vueJsx(),
    eslintPlugin({
      exclude: ['./node\_modules/**', './dist'],
      cache: false
    }),
    compression(),
    visualizer(),
    legacy({
      targets: ['chrome 52', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      modernPolyfills: ['es.promise.finally'],
      polyfills: [
        'es.symbol',
        'es.array.filter',
        'es.promise',
        'es.promise.finally',
        'es/map',
        'es/set',
        'es.array.for-each',
        'es.object.define-properties',
        'es.object.define-property',
        'es.object.get-own-property-descriptor',
        'es.object.get-own-property-descriptors',
        'es.object.keys',
        'es.object.to-string',
        'web.dom-collections.for-each',
        'esnext.global-this',
        'esnext.string.match-all'
      ]
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-import.d.ts',
      vueTemplate: false,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    viteMockServe({
      // default
      mockPath: 'src/mock',
      watchFiles: true,
      localEnabled: command === 'serve'
    }),
    progress()
  ],
  build: {
    target: 'es2015',
    outDir: './dist/',
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    // 指定服务网络,不然只会显示本地的
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: '127.0.0.1',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  css: {
    postcss: {
      plugins: [
        postcssImport,
        autoprefixer,
        tailwindcss
      ]
    }
  }
})
