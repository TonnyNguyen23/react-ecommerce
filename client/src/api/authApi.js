import axios from 'axios'
import { BASE_URL } from '../utils/contants'

export const authApi = {
  async register(data) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(`${BASE_URL}/auth/register`, data)
        .then(({ data }) => resolve(data))
        .catch(err => reject(err.response ? err.response.data.error : err))
    })
  },

  login(email, password) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(`${BASE_URL}/auth/login`, { email, password })
        .then(({ data }) => resolve(data))
        .catch(err => reject(err.response ? err.response.data.error : err))
    })
  },

  logout() {
    return axios.post(`${BASE_URL}/auth/logout`, {})
  },
}
