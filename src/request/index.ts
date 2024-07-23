import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
interface KeyMap {
  [key: string ]: string
}

const isEmptyObject = (obj:Record<string, any>) => {
  return obj == null || (typeof obj === 'object' && Object.keys(obj).length === 0 && obj.constructor === Object)
}

export interface RequestConfig{
  config:AxiosRequestConfig,
  data:{
    message:string
  }
  interceptors:{
    request:(config: AxiosRequestConfig)=>AxiosRequestConfig,
    response: {
      success: (response: AxiosResponse) => void
      error: (err: AxiosError) => void
    }
  }
}

const createHttpClient = (requestConfig:RequestConfig) => {
  const create: AxiosRequestConfig = {
    baseURL: '/',
    timeout: 60000,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  Object.assign(create, requestConfig.config)
  const httpClient = axios.create(create)
  // 请求拦截
  httpClient.interceptors.request.use(
    config => {
      requestConfig.interceptors.request(config)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  const formatResponseError = (response: AxiosResponse, data: KeyMap): string => {
    const { status = '', statusText = '' } = response || {}
    const keyMap: KeyMap = {
      400: `请求错误(${status})`,
      401: `未授权，请重新登录(${status})`,
      403: `拒绝访问(${status})`,
      404: `请求出错(${status})`,
      408: `请求超时(${status})`,
      500: data[requestConfig.data.message] || `服务器错误(${status})`,
      501: `服务未实现(${status})`,
      502: `网络错误(${status})`,
      503: `服务不可用(${status})`,
      504: `网络超时(${status})`,
      505: `HTTP版本不受支持(${status})`
    }
    return keyMap[status] || (statusText && statusText !== 'unknown' ? statusText : '服务器升级中,请稍后重试')
  }

  // 响应拦截
  httpClient.interceptors.response.use(
    (response:AxiosResponse) => {
      requestConfig.interceptors.response.success(response)
      const { data = '' } = response || {}
      try {
        return Promise.resolve(JSON.parse(data))
      } catch (error) {
        return Promise.resolve(data)
      }
    },
    (err: AxiosError) => {
      try {
        let { response: { data = '' } = {}, response } = err || {}
        data = JSON.parse(data as string)
        err.message = response ? formatResponseError(response, data as KeyMap) : '网络超时,请稍后重试!'
        requestConfig.interceptors.response.error(err)
        return Promise.reject(err)
      } catch (error) {
        const { response: { data = '' } = {}, response } = err || {}
        err.message = response ? formatResponseError(response, data as KeyMap) : '网络超时,请稍后重试!'
        requestConfig.interceptors.response.error(err)
        return Promise.reject(err)
      }
    }
  )

  /* ----------请求相关方法------------- */
  /**
 * @description 发送请求的方法
 * @param config 请求配置
 * @author yx
 * @returns Promise<T>
 */
  const request = <T = unknown>(config: AxiosRequestConfig): Promise<T> => {
    const { method, params, data } = config
    if (method === 'get') {
      if (isEmptyObject(params) && !isEmptyObject(data)) {
        config.params = config.data
        delete config.data
      }
    }

    console.log(config, 'config')
    return httpClient(config)
  }

  return { httpClient, request }
}

export default createHttpClient
