import { createSlice } from '@reduxjs/toolkit'
import { orderApi } from '../../api/orderApi'
const initialState = {
  orders: null,
  info: null,
  loading: false,
  error: '',
  success: '',
}
const ordersSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // Get all orders in admin
    getOrdersRequest: state => {
      state.loading = true
    },
    getOrdersSuccess: (state, { payload }) => {
      state.loading = false
      state.orders = payload.orders
      state.info = payload.info
      state.error = ''
    },
    getOrdersFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.orders = ''
    },

    // Get my orders in profile
    getMyOrdersRequest(state) {
      state.loading = true
    },
    getMyOrdersSuccess(state, { payload }) {
      state.loading = false
      state.orders = payload.orders
      state.info = payload.info
    },
    getMyOrdersFail(state, { payload }) {
      state.loading = false
      state.error = payload
      state.orders = ''
    },

    resetOrders: () => {
      return initialState
    },
  },
})

export const ordersActions = ordersSlice.actions

export const resetOrders = ordersActions.resetOrders

export const getOrders = () => async dispatch => {
  try {
    dispatch(ordersActions.getOrdersRequest())
    const data = await orderApi.getOrders()
    dispatch(ordersActions.getOrdersSuccess(data))
  } catch (error) {
    dispatch(ordersActions.getOrdersFail(error))
  }
}

export const getMyOrders = () => async dispatch => {
  try {
    dispatch(ordersActions.getMyOrdersRequest())
    const data = await orderApi.getMyOrders()
    dispatch(ordersActions.getMyOrdersSuccess(data))
  } catch (error) {
    dispatch(ordersActions.getMyOrdersFail(error))
  }
}

export const ordersReducer = ordersSlice.reducer
