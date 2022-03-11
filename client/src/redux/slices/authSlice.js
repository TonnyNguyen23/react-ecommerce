import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'
import jwt_decoded from 'jwt-decode'

const token = localStorage.getItem('ac_token') || ''
const user = token ? jwt_decoded(token) : ''

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token,
    user,
    error: '',
    success: '',
    loading: false,
  },
  reducers: {
    loginRequest: state => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.token = payload.ac_token
      state.user = payload.user
    },
    loginFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    registerRequest: state => {
      state.loading = true
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.token = payload.ac_token
      state.user = payload.user
    },
    registerFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    authReset: () => {
      return {}
    },
  },
})

const authActions = authSlice.actions

export const authReset = authActions.authReset

export const login = (email, password) => async dispatch => {
  try {
    dispatch(authActions.loginRequest())
    const data = await authApi.login(email, password)
    dispatch(authActions.loginSuccess(data))
    localStorage.setItem('ac_token', data.ac_token)
  } catch (error) {
    dispatch(authActions.loginFail(error))
  }
}

export const register = data => async dispatch => {
  try {
    dispatch(authActions.registerRequest())
    const res = await authApi.register(data)
    dispatch(authActions.registerSuccess(res))
    localStorage.setItem('ac_token', res.ac_token)
  } catch (error) {
    dispatch(authActions.registerFail(error))
  }
}

export const authReducer = authSlice.reducer
