import axios from 'axios'
import requestConfig from './config'
const create = {
  baseURL: '/',
  timeout: 60000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
}

Object.assign(create, requestConfig.config)
const service = axios.create(create)
// 请求拦截
service.interceptors.request.use(
  config => {
    requestConfig.interceptors.request(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

interface Response{
  status?:number,
  statusText?:string
}

const formatResponseError = <T extends Response>(response:T, data:T) => {
  const { status = '', statusText = '' } = response || {}
  const keyMap = {
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
service.interceptors.response.use(
  response => {
    // response = typeof response === 'string' ? JSON.parse(response) : response
    requestConfig.interceptors.response.success(response)
    const { data = '' } = response || {}
    try {
      return Promise.resolve(JSON.parse(data))
    } catch (error) {
      return Promise.resolve(data)
    }
  },

  err => {
    try {
      let { response: { data = '' } = {}, response } = err || {}
      data = JSON.parse(data)
      err.message = response ? formatResponseError(response, data) : '网络超时,请稍后重试!'
      requestConfig.interceptors.response.error(err)
      return Promise.reject(err)
    } catch (error) {
      const { response: { data = '' } = {}, response } = err || {}
      err.message = response ? formatResponseError(response, data) : '网络超时,请稍后重试!'
      requestConfig.interceptors.response.error(err)
      return Promise.reject(err)
    }
  }
)
export default service
