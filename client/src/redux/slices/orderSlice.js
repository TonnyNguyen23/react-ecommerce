import { createSlice } from '@reduxjs/toolkit'
import { orderApi } from '../../api/orderApi'
import { resetCart } from '../reducer/cartSlice'
const initialState = {
  order: null,
  loading: false,
  error: '',
  success: '',
}
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: state => {
      state.loading = true
    },
    createOrderSuccess: (state, action) => {
      state.loading = false
      state.order = action.payload
      state.error = ''
      state.success = 'Create order success!'
    },
    createOrderFail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.order = ''
      state.success = ''
    },

    getOrderRequest: state => {
      state.loading = true
    },
    getOrderSuccess: (state, action) => {
      state.loading = false
      state.order = action.payload
      state.error = ''
      state.success = 'Create order success!'
    },
    getOrderFail: (state, action) => {
      state.loading = false
      state.error = action.payload
      state.order = ''
      state.success = ''
    },
    resetOrder: () => {
      return initialState
    },
  },
})

export const orderActions = orderSlice.actions

export const resetOrder = orderActions.resetOrder

export const createOrder = orderBody => async dispatch => {
  try {
    dispatch(orderActions.createOrderRequest())
    // Call api create order
    const order = await orderApi.createOrder(orderBody)
    localStorage.removeItem('carts')
    dispatch(orderActions.createOrderSuccess(order))
    dispatch(resetCart())
  } catch (error) {
    dispatch(orderActions.createOrderFail(error))
  }
}

export const getOrder = orderId => async dispatch => {
  try {
    dispatch(orderActions.getOrderRequest())
    const data = await orderApi.getOrder(orderId)
    dispatch(orderActions.getOrderSuccess(data))
  } catch (error) {
    dispatch(orderActions.getOrderFail(error))
  }
}
export const orderReducer = orderSlice.reducer
