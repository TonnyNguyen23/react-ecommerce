import axios from 'axios'
import axiosInstance from '../utils/axiosInstance'
import { BASE_URL } from '../utils/contants'

export const orderApi = {
  createOrder(order) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .post(`${BASE_URL}/orders`, order, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getMyOrders() {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/orders/myOrders`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getOrder(orderId) {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/orders/${orderId}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },

  getOrders(search = '?page=1&limit=10') {
    return new Promise(async (resolve, reject) => {
      axiosInstance
        .get(`${BASE_URL}/orders${search}`)
        .then(({ data }) => resolve(data))
        .catch(err =>
          reject(err.response ? err.response.data.error : err.message)
        )
    })
  },
}
