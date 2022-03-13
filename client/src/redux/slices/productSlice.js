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
    resetProduct: () => {
      return initialState
    },
  },
})

export const productActions = productSlice.actions

export const resetProduct = productActions.resetProduct
export const createProduct = productBody => async dispatch => {
  try {
    dispatch(productActions.createProductRequest())
    const product = await productApi.createProduct(productBody)
    dispatch(productActions.createProductSuccess(product))
  } catch (error) {
    dispatch(productActions.createProductFail(error))
  }
}

export const productReducer = productSlice.reducer
