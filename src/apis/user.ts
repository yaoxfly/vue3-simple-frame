import { request } from '@/request/config'
import { transformRequest, multipartFormData } from '@/request/hook'
/**
 *put、delete、post一样都可传params和data  params就是query, data就是body
*/
export default {
  getUserInfo: (param = {}) => {
    return request({
      url: '/test/get',
      method: 'get',
      params: param
    })
  },

  postUserInfo: (param = {}) => request({
    url: '/test/post',
    method: 'post',
    params: param,
    data: param,
    ...transformRequest()
  }),

  putUserInfo: (param = {}) => request({
    url: '/test/put',
    method: 'put',
    params: param,
    data: param
  }),

  deleteUserInfo: (param = {}) => request({
    url: '/test/delete',
    method: 'delete',
    params: param,
    data: param

  }),

  upload: (param = {}) => request({
    url: '/test/upload',
    method: 'post',
    data: param,
    ...multipartFormData()
  }),

  download: (param = {}) => request<Blob>({
    url: '/download/pdf',
    method: 'get',
    data: param,
    responseType: 'blob'
  })
}
