// import rootReducers from './reducer'
// import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(rootReducers, composeWithDevTools())

// export default store

import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducer/cartSlice'
import { authReducer } from './slices/authSlice'
import { productReducer } from './slices/productSlice'
import { productsReducer } from './slices/productsSlice'
import { profileReducer } from './slices/profileSlice'
import { userReducer } from './slices/userSlice'
import { usersReducer } from './slices/usersSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    profile: profileReducer,
    auth: authReducer,
    users: usersReducer,
    user: userReducer,
    carts: cartReducer,
  },
})

export default store
