import { request } from '@/request/hook'
/**
 *put和post一样都可传params和data  params就是query, data就是body
*/
export default {
  getUserInfo: <T>(param: T) => {
    return request({
      url: '/test/get',
      method: 'get',
      params: param
    })
  },

  putUserInfo: <T>(param: T) => request({
    url: '/test/put',
    method: 'put',
    params: param,
    data: param
  }),

  postUserInfo: <T>(param: T) => request({
    url: '/test/post',
    method: 'post',
    params: param,
    data: param
  }),

  deleteUserInfo: <T>(param: T) => request({
    url: '/test/delete',
    method: 'delete',
    params: param,
    data: param
  })
}
