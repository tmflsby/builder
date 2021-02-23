import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // 设置token
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // 处理response
    if (response.status === 200 && response.data) {
      return response.data
    } else {
      return Promise.reject(new Error('请求失败'))
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
