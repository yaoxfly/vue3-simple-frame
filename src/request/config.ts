export default {
  // 请求配置
  config: {
    baseURL: '/'
  },

  // 返回数据配置
  data: {
    message: 'message'
  },

  // 拦截处理
  interceptors: {
    request: <T>(config: T) => {
      // 做token相关处理以及loading等相关处理
      console.log(config, '请求拦截前')
    },

    response: {
      success: <T>(config: T) => {
        // 请求200,但有权限相关，不可操作等可以这里统一弹窗
        console.log(config, '请求正常,200等返回')
      },
      error: <T>(config: T) => {
        console.log(config, '请求异常，例如500等返回')
      }
    }
  }
}
