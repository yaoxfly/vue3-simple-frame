import { request } from '@/request/hook'
/**
 *put和post一样都可传params和data  params就是query, data就是body
*/
export default {
  getUserInfo: (param:Record<string, any>) => {
    return request({
      url: '/test/get',
      method: 'get',
      params: param
    })
  },

  putUserInfo: (param:Record<string, any>) => request({
    url: '/test/put',
    method: 'put',
    params: param,
    data: param
  }),

  postUserInfo: (param: Record<string, any>) => request({
    url: '/test/post',
    method: 'post',
    params: param,
    data: param
  }),

  deleteUserInfo: (param: Record<string, any>) => request({
    url: '/test/delete',
    method: 'delete',
    params: param,
    data: param
  })
}
