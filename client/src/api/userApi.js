import axiosInstance from '../utils/axiosInstance'
import { BASE_URL } from '../utils/contants'

export const userApi = {
  getProfile() {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/users/profile`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },
  updateProfile(userBody) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .patch(`${BASE_URL}/users/profile`, userBody, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getUser(userId) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/users/${userId}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getUsers(search = '?page=1&limit=1') {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/users${search}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  updateUser(userId, userBody) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .patch(`${BASE_URL}/users/${userId}`, userBody, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  deleteUser(userId) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .delete(`${BASE_URL}/users/${userId}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },
}
