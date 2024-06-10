import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// const onRequest = (config: InternalAxiosRequestConfig | any): InternalAxiosRequestConfig => {
// instance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

export default instance
