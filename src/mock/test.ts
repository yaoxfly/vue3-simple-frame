import { MockMethod } from 'vite-plugin-mock'
/* 请求不要走代理 */
export default [
  {
    url: '/test/get',
    method: 'get',
    response: () => {
      return {
        code: 0,
        data: {
          name: 'get',
          test: '中文测试'
        }
      }
    }
  },
  {
    url: '/test/post',
    method: 'post',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'post',
        test: '中文测试'
      }
    }
  },
  {
    url: '/test/put',
    method: 'put',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'put',
        test: '中文测试'
      }
    }
  },
  {
    url: '/test/delete',
    method: 'delete',
    timeout: 2000,
    response: {
      code: 0,
      data: {
        name: 'delete',
        test: '中文测试'
      }
    }
  },
  {
    url: '/test/text',
    method: 'post',
    rawResponse: async (req, res) => {
      let reqbody = ''
      await new Promise((resolve) => {
        req.on('data', (chunk) => {
          reqbody += chunk
        })
        req.on('end', () => resolve(undefined))
      })
      res.setHeader('Content-Type', 'application/json')
      res.statusCode = 500
      res.end(`${reqbody}`)
    }
  }
] as MockMethod[]
