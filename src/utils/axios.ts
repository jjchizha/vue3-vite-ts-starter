import Axios, { AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'
import { config } from '../config/index'

// const baseURL = 'https://api.github.com'

const service: AxiosInstance = Axios.create({
  baseURL: config.mock ? config.mockApi : config.baseApi,
  timeout: 20000 // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
service.interceptors.request.use(
  (req) => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    return req
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 后置拦截器（获取到响应时的拦截）
service.interceptors.response.use(
  (res) => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    return res
  },
  (error) => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
      console.error(`[Axios Error]`, error.response)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

/**
 * @param {*} options   请求配置
 */
function request(options: any) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') options.params = options.data
  if (typeof options.mock !== 'undefined') config.mock = options.mock
  if (config.env === 'prod') service.defaults.baseURL = config.baseApi
  else service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  return service(options)
}

// 轮询接口类型，然后根据对应的类型，给予请求方式
// ;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
//   request[item] = (url: string, data: any, options: string[]) => {
//     return request({ url, data, method: item, ...options })
//   }
// })

// 丢出request
export default request
