import { createSlice } from '@reduxjs/toolkit'
import { productApi } from '../../api/productApi'

const initialState = {
  loading: false,
  products: [],
  info: '',
  error: '',
}
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductsRequest(state) {
      state.loading = true
    },

    getProductsSuccess(state, { payload }) {
      state.loading = false
      state.products = payload.products
      state.info = payload.info
      state.error = ''
    },

    getProductsFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    deleteProductRequest(state) {
      state.loading = true
    },
    deleteProductSuccess(state, { payload }) {
      state.loading = false
      state.products = state.products.filter(product => product.id !== payload)
      state.error = ''
      state.success = 'Delete product success!'
    },
    deleteProductFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },
    resetProductsSuccess(state) {
      state.success = ''
    },
    resetProducts() {
      return initialState
    },
  },
})

export const productsAction = productsSlice.actions
export const resetProductsSuccess = productsAction.resetProductsSuccess

export const getProducts = search => async dispatch => {
  try {
    dispatch(productsAction.getProductsRequest())
    const data = await productApi.getProducts(search)
    dispatch(productsAction.getProductsSuccess(data))
  } catch (error) {
    dispatch(productsAction.getProductsFail(error))
  }
}

export const deleteProduct = productId => async dispatch => {
  try {
    dispatch(productsAction.deleteProductRequest())
    await productApi.deleteProduct(productId)
    dispatch(productsAction.deleteProductSuccess(productId))
  } catch (error) {
    dispatch(productsAction.deleteProductFail(error))
  }
}

export const productsReducer = productsSlice.reducer
