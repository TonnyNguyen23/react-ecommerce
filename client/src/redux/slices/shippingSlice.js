import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  shipping: null,
}
const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    createShipping: (state, action) => {
      state.shipping = action.payload
    },
    resetShipping: () => {
      return initialState
    },
  },
})

export const shippingActions = shippingSlice.actions
export const shippingReducer = shippingSlice.reducer
