// import rootReducers from './reducer'
// import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(rootReducers, composeWithDevTools())

// export default store

import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducer/cartSlice'
import { authReducer } from './slices/authSlice'
import { orderReducer } from './slices/orderSlice'
import { ordersReducer } from './slices/ordersSlice'
import { productReducer } from './slices/productSlice'
import { productsReducer } from './slices/productsSlice'
import { profileReducer } from './slices/profileSlice'
import { shippingReducer } from './slices/shippingSlice'
import { userReducer } from './slices/userSlice'
import { usersReducer } from './slices/usersSlice'

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    order: orderReducer,
    products: productsReducer,
    product: productReducer,
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    shipping: shippingReducer,
    carts: cartReducer,
  },
})

export default store
