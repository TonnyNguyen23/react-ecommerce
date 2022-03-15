import axios from 'axios'
import { BASE_URL } from '../utils/contants'
import axiosInstance from '../utils/axiosInstance'

axios.defaults.withCredentials = true
export const authApi = {
  async register(data) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(`${BASE_URL}/auth/register`, data, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  login(email, password) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          `${BASE_URL}/auth/login`,
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        )
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  logout() {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },
}
