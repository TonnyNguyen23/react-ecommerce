import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'
import { BASE_URL } from '../utils/contants'

export const productApi = {
  createProduct(product) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .post(`${BASE_URL}/products`, product, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getProduct(productId) {
    return new Promise(async (resolve, reject) => {
      axios
        .get(`${BASE_URL}/products/${productId}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getProducts(search = '?page=1&limit=10') {
    return new Promise(async (resolve, reject) => {
      axios
        .get(`${BASE_URL}/products${search}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  updateUser(productId, productBody) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .patch(`${BASE_URL}/products/${productId}`, productBody, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  deleteUser(productId) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .delete(`${BASE_URL}/users/${productId}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },
}
