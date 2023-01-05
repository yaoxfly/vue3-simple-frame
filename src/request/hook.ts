import httpRequest from '@/request/index'
import qs from 'qs'
export type Config = {
  method?: string,
}

/* ----------请求相关方法------------- */
export const request = <T extends Config>(config: T) => {
  const { method } = config
  // get请求默认序列化
  if (method === 'get') {
    Object.assign(config, { ...paramsSerializer() })
  }
  return httpRequest(config)
}

/** @description 文件上传参数添加,放在data参数里上传。
 * @author yx
 */

export const formDataAppend = (obj: any) => {
  const formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

/* ----------请求相关配置------------- */

/** @description query方式传数据,不带file,序列化URL的形式，以&进行拼接,让params方式可传数组、对象。
 * @author yx
 */
export const paramsSerializer = <T>() => {
  return {
    paramsSerializer: {
      serialize: (params: T) => qs.stringify(params)
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
}

/** @description formData方式传数据，不带file的
 * @author yx
 */
export const transformRequest = <T>() => {
  return {
    transformRequest: [(data: T) => qs.stringify(data)],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
}

/** @description 发送multipart/form-data格式的请求时(上传文件)，
 * 不需要我们自己指定Content-Type属性，由浏览器自动帮我们去设置，
 * axios设置了post默认请求头,需去除(新版本的aixos好像使用了new FormData,就默认去除了,可能和浏览器有关)
 * @author yx
 */
export const multipartFormData = () => {
  return {
    transformRequest: [function (data: any, headers: any) {
      delete headers.post['Content-Type']
      return data
    }]
  }
}

/* ----------返回的数据处理方法------------- */

/** @description Blob 转为json  接收的方式为Blob但返回的却是json的数据， 用来处理导入、导出错误信息提示。
 * @author yx
 */
export const blobToJson = (data: Blob) => {
  const reader = new FileReader() // 创建读取文件对象
  reader.readAsText(data, 'utf-8') // 设置读取的数据以及返回的数据类型为utf-8
  reader.addEventListener('loadend', function () {
    const data = JSON.parse(reader.result as string)
    return Promise.resolve(data)
  })
}

/** @description  二进制流文件下载
 * @author yx
 */
export const download = (data: Blob, name: string) => {
  const blob = new Blob([data], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const exportLink = document.createElement('a')
  exportLink.setAttribute('download', name)
  exportLink.href = url
  document.body.appendChild(exportLink)
  exportLink.click()
}
