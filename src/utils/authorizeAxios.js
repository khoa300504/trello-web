import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './fomartter'

// Khoi tao doi tuong axios instance de custome cau hinh chung cho du an
let authorizeAxiosInstance = axios.create()

// thoi gian cho toi da 1 request la 5phut
authorizeAxiosInstance.defaults.timeout = 1000*60*5

// withCreadentials: cho phep axios tu dong gui cookie trong moi request len be ( de luu jwt tokens - refresh va access ) trong httponlycookies cua browser
authorizeAxiosInstance.defaults.withCredentials = true

// Config interceptor: https://axios-http.com/docs/interceptors
// Request interceptor
authorizeAxiosInstance.interceptors.request.use(config => {
  // Do something before request is sent
  interceptorLoadingElements(true)

  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// Response interceptor
authorizeAxiosInstance.interceptors.response.use(response => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  interceptorLoadingElements(false)
  return response
}, error => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  interceptorLoadingElements(false)

  let errorMessage = error?.message
  if (error.response?.data?.message) errorMessage = error.response?.data?.message

  // tru statusCode 410 -GONE de refresh token ta dung toastify de log error len man hinh
  if (error.response?.status !== 410) toast.error(errorMessage)

  return Promise.reject(error)
})

export default authorizeAxiosInstance
