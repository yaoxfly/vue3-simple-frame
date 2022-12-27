/**
 * @description 公共配置
 * @author yx
 */
// 公共配置
interface Config {
  server?: string;
}
const config: Config = {}
// 不同环境下的公共配置
const keyMap = {
  // 开发环境
  development: () => {
    Object.assign(config, { server: '/api' }) // api地址
  },

  // 测试环境
  test: () => {
    Object.assign(config, { server: '/test' })
  },

  // 正式环境&预生产环境
  production: () => {
    const publicUrl = `${window.location.protocol}//${window.location.host}`
    Object.assign(config, { server: `${publicUrl}` })
  }
}

keyMap[import.meta.env.VITE_APP_CURRENT_MODE] &&
  keyMap[import.meta.env.VITE_APP_CURRENT_MODE]()
export default config
