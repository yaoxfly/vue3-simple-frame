import createHttpClient from './index'
export const { request } = createHttpClient({
  // 请求配置
  config: {
    baseURL: '/'
  },

  // 返回数据配置
  data: {
  // 异常数据处理
    message: 'message'
  },

  // 拦截处理
  interceptors: {
    request: (config) => {
    // 做token相关处理以及loading等相关处理
      console.log(config, '请求拦截前')
      return config
    },

    response: {
      success: (response) => {
      // 请求200,但有权限相关，不可操作等可以这里统一弹窗
        console.log(response, '请求正常,200等返回')
      },
      error: (err) => {
        console.log(err.message, '请求异常，例如500等返回')
      }
    }
  }
})
