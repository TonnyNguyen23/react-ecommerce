import axios from 'axios'
import dayjs from 'dayjs'
import jwt_decode from 'jwt-decode'
import { BASE_URL } from './contants'

let ac_token = localStorage.getItem('ac_token') || ''
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ac_token}`,
  },
})

axiosInstance.interceptors.request.use(async req => {
  if (!ac_token) {
    ac_token = localStorage.getItem('ac_token')
    req.headers.Authorization = `Bearer ${ac_token}`
  }

  const user = jwt_decode(authToken)
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

  if (!isExpired) return req
  const { data } = await axios.get(`${baseURL}/auth/refresh`, {
    withCredentials: true,
  })
  localStorage.setItem('ac_token', data.ac_token)
  req.headers.Authorization = `Bearer ${data.ac_token}`
  return req
})

export default axiosInstance
