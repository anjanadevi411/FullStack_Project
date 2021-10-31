import axios from 'axios'

axios.interceptors.request.use(request =>{
  // Get jwt token from localstorage
    const token = localStorage.getItem('token') as string
      const requestHeader = {
        Authorization: `Bearer ${token}`,
      }
      // Attach it to request headers
      request.headers = requestHeader
      return request
  })
  
  axios.interceptors.response.use(
    (response) =>{
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )
  