import { AxiosRequestConfig } from 'axios'
import qs from 'qs'

/* --------------------请求数据和请求头处理通用方法------------------ */

/**
 * @description query方式(表单)传数据，序列化URL的形式，以&进行拼接,使用了qs数组变成索引表示法，适用于get。
 * @author yx
 * @returns AxiosRequestConfig
 */
export const paramsSerializer = (): AxiosRequestConfig => {
  return {
    paramsSerializer: {
      serialize: (params) => qs.stringify(params)
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
}

/**
 * @description formData（表单）方式传数据， 使用了qs数组变成索引（arr[0]）表示法（默认是方括号arr[]），适用于post、put、delete
 * @author yx
 * @returns AxiosRequestConfig
 */
export const transformRequest = (): AxiosRequestConfig => {
  return {
    paramsSerializer: {
      serialize: (params) => qs.stringify(params)
    },
    transformRequest: [data => qs.stringify(data)],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }
}

/**
 * @description new FormData 参数添加,放在data参数里上传，适用于文件上传
 * @param obj 需要上传的对象
 * @author yx
 * @returns FormData
 */

export const formDataAppend = (obj: Record<string, any>): FormData => {
  const formData = new FormData()
  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key])
  })
  return formData
}

/**
 * @description  文件上传请求头配置，适用于post、put
 * @author yx
 * @returns AxiosRequestConfig
 */
export const multipartFormData = (): AxiosRequestConfig => {
  return {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 0
  }
}

/**
 * @description  文件下载配置
 * @author yx
 * @returns AxiosRequestConfig
 */
export const downloadFile = (): AxiosRequestConfig => {
  return {
    responseType: 'blob',
    timeout: 0
  }
}

/* --------------------响应的数据处理通用方法------------------ */

/**
 * @description Blob 转为json  接收的方式为Blob但返回的却是json的数据，用来处理导入、导出错误信息提示
 * @param data Blob 数据
 * @author yx
 * @returns Promise<any>
 */

export const blobToJson = (data: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader() // 创建读取文件对象
    reader.readAsText(data, 'utf-8') // 设置读取的数据以及返回的数据类型为utf-8
    reader.onloadend = () => {
      try {
        const jsonData = JSON.parse(reader.result as string)
        resolve(jsonData)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = () => {
      reject(new Error('Error reading Blob as text'))
    }
  })
}

/**
 * @description 二进制流文件下载
 * @param data Blob 数据
 * @param name 文件名
 * @author yx
 */
export const download = (data: Blob, name: string): void => {
  const blob = new Blob([data], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const exportLink = document.createElement('a')
  exportLink.setAttribute('download', name)
  exportLink.href = url
  document.body.appendChild(exportLink)
  exportLink.click()
  document.body.removeChild(exportLink)
}
