import { createSlice } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'
import jwt_decoded from 'jwt-decode'
import { profileActions } from './profileSlice'
import { usersAction } from './usersSlice'

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
    authResetError: state => {
      state.error = ''
    },
    logoutRequest: state => {
      state.loading = true
    },
    logoutSuccess: () => {
      return {
        token: '',
        user: '',
        error: '',
        loading: false,
        success: '',
      }
    },
    logoutFail: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

const authActions = authSlice.actions

export const authResetError = authActions.authResetError

export const login = (email, password) => async dispatch => {
  try {
    dispatch(authActions.loginRequest())
    const { ac_token } = await authApi.login(email, password)
    const user = jwt_decoded(ac_token)

    dispatch(authActions.loginSuccess({ ac_token, user }))
    localStorage.setItem('ac_token', ac_token)
  } catch (error) {
    dispatch(authActions.loginFail(error))
  }
}

export const register = data => async dispatch => {
  try {
    dispatch(authActions.registerRequest())
    const { ac_token } = await authApi.register(data)
    const user = jwt_decoded(ac_token)

    localStorage.setItem('ac_token', ac_token)
    dispatch(authActions.registerSuccess({ ac_token, user }))
  } catch (error) {
    dispatch(authActions.registerFail(error))
  }
}

export const logout = () => async dispatch => {
  try {
    dispatch(authActions.logoutRequest())
    await authApi.logout()
    localStorage.removeItem('ac_token')

    dispatch(authActions.logoutSuccess())
    dispatch(profileActions.resetProfile())
    dispatch(usersAction.resetUsers())
  } catch (error) {
    dispatch(authActions.logoutFail(error))
  }
}

export const authReducer = authSlice.reducer
