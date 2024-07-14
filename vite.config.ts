import { defineConfig, loadEnv, UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import { createHtmlPlugin } from 'vite-plugin-html'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer' // 性能分析，打开stats.html，查看打包情况
import legacy from '@vitejs/plugin-legacy'
import AutoImport from 'unplugin-auto-import/vite'
import postcssImport from 'postcss-import'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
// import progress from 'vite-plugin-progress'
import browserslist from 'browserslist' // 统一js/css兼容性
import checker from 'vite-plugin-checker'
import externalGlobals from 'rollup-plugin-external-globals'
const browserslistConfig = browserslist.loadConfig({ path: '.' }) // npx browserslist "> 0.04%, last 2 versions,Firefox ESR,not dead" 查询兼容的浏览器
const externalGlobalsConfig = {
  vue: 'Vue',
  axios: 'axios',
  'vue-demi': 'VueDemi', // 用了pinia必须配置
  'vue-router': 'VueRouter',
  qs: 'Qs',
  pinia: 'Pinia',
  '@vueuse/core': 'VueUse' // 打包后谷歌83以上可行,不用cdn或者用cdn不用min版本63可行
}

const cdn = {
  css: [],
  js: [
    {
      // vue
      url: 'https://cdn.jsdelivr.net/npm/vue@3.3.4/dist/vue.global.prod.js',
      rel: 'preload' // preload | prefetch
    },
    {
      // vue-demi pinia 前置插件
      url: 'https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.min.js',
      rel: 'preload'
    },
    {
      // pinia
      url: 'https://cdn.jsdelivr.net/npm/pinia@2.1.6/dist/pinia.iife.prod.js',
      rel: 'preload'
    },
    {
      // vue-router
      url: 'https://cdn.jsdelivr.net/npm/vue-router@4.2.5/dist/vue-router.global.prod.js',
      rel: 'preload'
    },
    {
      // axios
      url: 'https://cdn.jsdelivr.net/npm/axios@1.5.1/dist/axios.min.js',
      rel: 'preload'
    },
    {
      // qs
      url: 'https://cdn.jsdelivr.net/npm/qs@6.11.2/dist/qs.min.js',
      rel: 'preload'
    },
    {
      // shared  vueuse/core 前置插件
      url: 'https://cdn.jsdelivr.net/npm/@vueuse/shared@10.4.1/index.iife.min.js',
      rel: 'preload'
    },
    {
      // @vueuse/core
      url: 'https://cdn.jsdelivr.net/npm/@vueuse/core@10.4.1/index.iife.js',
      rel: 'preload'
    }
  ]
}

export default ({ mode, command }: ConfigEnv): UserConfigExport => defineConfig({
  // 部署在二级目录下，也需要加个二级目录
  base: loadEnv(mode, process.cwd()).VITE_APP_PUBLIC_PATH,
  plugins: [
    vue(),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.ts',
      // template: 'public/index.html',
      inject: {
        data: {
          title: 'Vue App',
          //  出现souceMap找不情况，需换链接, 如果是把资源文件放在自己的库中，需下载对应的map文件。
          cdn: {
            css: loadEnv(mode, process.cwd()).VITE_APP_CURRENT_MODE !== 'development' ? cdn.css : [],
            js: loadEnv(mode, process.cwd()).VITE_APP_CURRENT_MODE !== 'development' ? cdn.js : []
          }
        }
      }
    }),
    vueJsx(),
    eslintPlugin({
      exclude: ['./node\_modules/**', './dist'],
      cache: false
    }),
    compression(),
    visualizer(),
    legacy({
      targets: browserslistConfig,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      polyfills: true

    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        {
          'vue-router': [
            'useLink',
            'useRoute',
            'useRouter',
            'onBeforeRouteLeave',
            'onBeforeRouteUpdate',
            'createRouter',
            'createWebHistory'
          ]
        },
        {
          '@vueuse/core': [
            'useStorage'
          ]
        }
      ],
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
      watchFiles: true
      // localEnabled: command === 'serve'
    }),
    // progress(), //打包进度条，会覆盖掉打包详情信息，暂时不用了
    checker({
      typescript: true // 检查ts类型
    }),
    {
      ...externalGlobals(externalGlobalsConfig),
      enforce: 'post',
      apply: 'build'
    }
  ],
  // optimizeDeps: {
  //   // 开发中预先打包，加速这些依赖项的加载和解析，提升开发体验
  //   include: Object.keys(externalGlobalsConfig)
  // },
  css: {
    preprocessorOptions: {
      scss: {
        // 去除 @charset utf-8警告
        charset: false
      }
    },
    postcss: {
      plugins: [
        postcssImport,
        autoprefixer,
        tailwindcss
      ]
    }
  },

  resolve: { alias: { '@': resolve(__dirname, 'src') } },
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

  build: {
    target: browserslistConfig,
    outDir: './dist/',
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    chunkSizeWarningLimit: 1000, // chunks 大小限制
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: id => {
          if (id.includes('node_modules')) { // 超大静态资源拆分
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      },
      external: Object.keys(externalGlobalsConfig)
    }
  }
})
