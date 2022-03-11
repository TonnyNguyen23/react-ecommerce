// import rootReducers from './reducer'
// import { createStore } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const store = createStore(rootReducers, composeWithDevTools())

// export default store

import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from './reducer/cartSlice'
import { authReducer } from './slices/authSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    carts: cartReducer,
  },
})

export default store
