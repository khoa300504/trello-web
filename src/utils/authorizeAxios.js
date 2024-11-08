import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './fomartter'
import { logoutUserAPI } from '~/redux/user/userSlice'
import { refreshTokenAPI } from '~/apis'

//Khong the import store from redux/store ngoai file jsx
// * su dung inject store
let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

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

let refreshTokenPromise = null

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

  //401 tu backend call Logout API
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // 410 tu backend refreshTokenAPI
  const originalRequests = error.config
  if (error.response?.status === 410 && originalRequests) {
    if (!refreshTokenPromise)
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          // da tra accessToken ve tu httpOnly cookie
          return data?.accessToken
        })
        .catch(_error => {
          // Refresh ma co loi gi thi Logout
          axiosReduxStore.dispatch(logoutUserAPI(false))
          return Promise.reject(_error)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    // eslint-disable-next-line no-unused-vars
    return refreshTokenPromise.then(accessToken => {
      // Neu can luu accessToken vao localStorage hoac header ,... thi can xu ly them nhung khong can vi da xu li phia BE
      // vd: axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
      // Return lai axios instance ket hop voi originalRequests de goi lai nhung api bi loi
      return authorizeAxiosInstance(originalRequests)
    })
  }

  let errorMessage = error?.message
  if (error.response?.data?.message) errorMessage = error.response?.data?.message

  // tru statusCode 410 -GONE de refresh token ta dung toastify de log error len man hinh
  if (error.response?.status !== 410) toast.error(errorMessage)

  return Promise.reject(error)
})

export default authorizeAxiosInstance
