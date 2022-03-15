import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../../api/productApi'
const initialState = {
  product: null,
  loading: false,
  error: '',
  success: '',
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProductRequest: state => {
      state.loading = true
    },
    createProductSuccess: (state, { payload }) => {
      state.loading = false
      state.product = payload
      state.error = ''
      state.success = 'Create product success!'
    },
    createProductFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
      state.product = ''
      state.success = ''
    },

    getProductRequest(state) {
      state.loading = true
    },
    getProductSuccess(state, { payload }) {
      state.loading = false
      state.product = payload
      state.error = ''
    },
    getProductFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    updateProductRequest(state) {
      state.loading = true
    },
    updateProductSuccess(state, { payload }) {
      state.loading = false
      state.product = payload
      state.error = ''
      state.success = 'Updated product success!'
    },
    updateProductFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },
    resetProductSuccess(state) {
      state.success = ''
    },
    resetProduct: () => {
      return initialState
    },
  },
})

export const productActions = productSlice.actions

export const resetProduct = productActions.resetProduct
export const resetProductSuccess = productActions.resetProductSuccess

export const createProduct = productBody => async dispatch => {
  try {
    dispatch(productActions.createProductRequest())
    const product = await productApi.createProduct(productBody)
    dispatch(productActions.createProductSuccess(product))
  } catch (error) {
    dispatch(productActions.createProductFail(error))
  }
}

export const getProduct = productId => async dispatch => {
  try {
    dispatch(productActions.getProductRequest())
    const product = await productApi.getProduct(productId)
    dispatch(productActions.getProductSuccess(product))
  } catch (error) {
    dispatch(productActions.getProductFail(error))
  }
}
export const updateProduct = (productId, productBody) => async dispatch => {
  try {
    dispatch(productActions.updateProductRequest())
    const product = await productApi.updateProduct(productId, productBody)
    dispatch(productActions.updateProductSuccess(product))
  } catch (error) {
    dispatch(productActions.updateProductFail(error))
  }
}
export const productReducer = productSlice.reducer
