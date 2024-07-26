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
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
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
      url: 'https://cdn.jsdelivr.net/npm/vue@3.3.13/dist/vue.global.prod.js',
      rel: 'preload' // preload | prefetch
    },
    {
      // vue-demi pinia 前置插件
      url: 'https://cdn.jsdelivr.net/npm/vue-demi@0.13.11/lib/index.iife.min.js',
      rel: 'preload'
    },
    {
      // pinia
      url: 'https://cdn.jsdelivr.net/npm/pinia@2.1.7/dist/pinia.iife.prod.js',
      rel: 'preload'
    },
    {
      // vue-router
      url: 'https://cdn.jsdelivr.net/npm/vue-router@4.4.0/dist/vue-router.global.prod.js',
      rel: 'preload'
    },
    {
      // axios
      url: 'https://cdn.jsdelivr.net/npm/axios@1.7.2/dist/axios.min.js',
      rel: 'preload'
    },
    {
      // qs
      url: 'https://cdn.jsdelivr.net/npm/qs@6.12.3/dist/qs.min.js',
      rel: 'preload'
    },
    {
      // shared  vueuse/core 前置插件
      url: 'https://cdn.jsdelivr.net/npm/@vueuse/shared@10.11.0/index.iife.min.js',
      rel: 'preload'
    },
    {
      // @vueuse/core
      url: 'https://cdn.jsdelivr.net/npm/@vueuse/core@10.11.0/index.iife.js',
      rel: 'preload'
    }
  ]
}

const postCssPxToViewportConfig = {
  unitToConvert: 'px',
  viewportWidth: 1920,
  unitPrecision: 5, // 单位转换后保留的精度
  propList: ['*'], // 能转化为vw的属性列表
  viewportUnit: 'vw', // 希望使用的视口单位
  fontViewportUnit: 'vw', // 字体使用的视口单位
  selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
  minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
  mediaQuery: true, // 媒体查询里的单位是否需要转换单位
  replace: true, //  是否直接更换属性值，而不添加备用属性
  // exclude: [/node_modules\/element-plus/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
  include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
  landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
  landscapeUnit: 'vw', // 横屏时使用的单位
  landscapeWidth: 1024 // 横屏时使用的视口宽度
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
      watchFiles: true,
      enable: loadEnv(mode, process.cwd()).VITE_APP_CURRENT_MODE === 'development'
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
        postcsspxtoviewport8plugin(postCssPxToViewportConfig),
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
