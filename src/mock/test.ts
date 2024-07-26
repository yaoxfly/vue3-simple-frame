import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import path from 'path'
import fs from 'fs'
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
  },
  {
    url: '/test/upload',
    method: 'post',
    response: () => {
      const fileId = Mock.Random.guid()
      const fileName = Mock.Random.word() + '.jpg'
      const fileUrl = Mock.Random.url('http')
      return {
        code: 200,
        message: '文件上传成功',
        data: {
          fileId,
          fileName,
          url: fileUrl
        }
      }
    }
  },
  {
    url: '/download/pdf',
    method: 'get',
    rawResponse: async (req, res) => {
      const pdfPath = path.resolve(__dirname, 'test.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)
      res.setHeader('Content-Type', 'application/pdf')
      res.statusCode = 200
      res.end(pdfBuffer)
    }
  },
  {
    url: '/download/pdf',
    method: 'post',
    rawResponse: async (req, res) => {
      const pdfPath = path.resolve(__dirname, 'test.pdf')
      const pdfBuffer = fs.readFileSync(pdfPath)
      res.setHeader('Content-Type', 'application/pdf')
      res.statusCode = 200
      res.end(pdfBuffer)
    }
  }
] as MockMethod[]
