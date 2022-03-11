import { createSlice } from '@reduxjs/toolkit'
const carts = localStorage.getItem('carts')
  ? JSON.parse(localStorage.getItem('carts'))
  : []

const cartSlice = createSlice({
  name: 'carts',
  initialState: carts,
  reducers: {
    addCart: (state, action) => {
      let exist = state.find(x => x.id === action.payload.id)

      exist
        ? (exist.qty = exist.qty + 1)
        : state.push({ ...action.payload, qty: 1 })
      localStorage.setItem('carts', JSON.stringify(state))
    },
    deleteCart: (state, action) => {
      const item = state.find(cart => cart.id === action.payload.id)

      item.qty > 1
        ? (item.qty = item.qty - 1)
        : state.splice(state.indexOf(item), 1)

      localStorage.setItem('carts', JSON.stringify(state))
    },
  },
})

export const cartActions = cartSlice.actions
export const cartReducer = cartSlice.reducer
