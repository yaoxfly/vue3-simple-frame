
[English](README.md) | [中文](README-CN.md)

# 前言
 当前框架是基于vue3.2 + typeScript + vite3的极简框架

# 基础集成
- [x] vue3.2
- [x] TypeScript
- [x] tsx
- [x] vite3
- [x] vue-router
- [x] eslint
- [x] pnpm
- [x] mock
- [x] axios (使用TypeScript对axios整个二次封装,全局错误拦截、常用请求封装)
- [x] pinia
- [x] tailwindcss   (vscode可安装tailwindcss插件，有语法提示)
- [x] vite-plugin-checker   (ts类型检查，ts报错信息在命令行和页面上显示，不修正无法继续开发)
- [x] @vueuse/core  (基于Composition API的实用函数集合，vue的hook  [官网](https://vueuse.org/) )


# 优化配置
- [x] gzip
- [x] 多环境配置
- [x] unplugin-auto-import  (自动按需引入vue、vue-router等相关api)
- [x] rollup-plugin-visualizer (性能分析)
- [x] terserOptions  (配置去除console和debugger  需要terser插件支持)
- [x] cdn配置，优化打包体积  (只在打包环境下使用cdn)

# 兼容配置
- [x] @vitejs/plugin-legacy
- [x] browserslist (配合@vitejs/plugin-legacy插件使用)
- [x] autoprefixer


# 使用

#### 开发

根据个人的习惯，配置`dev`和`serve`两个都可启动开发环境
```
pnpm run dev
or
pnpm run  serve
```
#### 打包

+ 测试环境

```
pnpm run build:test
```
+ 正式环境

```
pnpm run build
```

> 可自行配置环境。

#### 打包预览

可对打包出来的文件进行预览，模拟线上环境

```
pnpm run preview
```

> 一定要在`build`后才能执行



