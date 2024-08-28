
[English](README.md) | [中文](README-CN.md)

# Preface
The current framework is a minimalist framework based on vue3 + typeScript + vite

# Basic integration
- [x] vue3
- [x] typeScript
- [x] tsx
- [x] vite
- [x] vue-router
- [x] eslint
- [x] pnpm
- [x] mock
- [x] axios   (Complete secondary encapsulation of axios, global error interception, common request encapsulation with TypeScript)
- [x] pinia
- [x] tailwindcss    (Vscode can install tailwindcss plug-in, syntax prompt)

- [x] vite-plugin-checker   (If the ts type is checked, the ts error message is displayed on the CLI and page. If the TS type is not corrected, the development cannot continue)

- [x] @vueuse/core   ( A collection of utility functions based on Composition API, and hooks for vue [Official website](https://vueuse.org/) )


# Optimal configuration
- [x] gzip
- [x] Multi-environment configuration
- [x] unplugin-auto-import  (Automatically import apis such as vue and Vue-router on demand)
- [x] rollup-plugin-visualizer   (Performance analysis)
- [x] terserOptions  (Terser plug-in support is required to configure the removal of console and debugger)
- [x] cdn configuration to optimize the packaging volume   (Use CDNS only in packaging environments)

# Compatible configuration
- [x] @vitejs/plugin-legacy
- [x] browserslist  Works with @vitejs/plugin-legacy plug-in
- [x] autoprefixer


# Use

#### Develop

Depending on your custom, configure both `dev` and `serve` to start your development environment

```
pnpm run dev
or
pnpm run  serve
```
#### Pack

+ Test environment

```
pnpm run build:test
```
+ Formal environment

```
pnpm run build
```

> You can configure your own environment。

#### Package preview

You can preview the packaged files to simulate the online environment

```
pnpm run preview
```

> It must be executed after `build`


#### Update package
```
pnpm install -g npm-check-updates
```

View packages that need to be updated
```
ncu
```
Update all packages (only modify your package. json file)
```
ncu u
```
Run pnpm i to update the installed packages and pnpm-lock.json.
```
pnpm i
```

