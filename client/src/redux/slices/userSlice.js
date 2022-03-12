import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../api/userApi'
import { getUsers } from './usersSlice'

const initialState = {
  user: '',
  loading: false,
  error: '',
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserRequest(state) {
      state.loading = true
    },
    getUserSuccess(state, { payload }) {
      state.loading = false
      state.user = payload
      state.error = ''
    },
    getUserFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    updateUserRequest(state) {
      state.loading = true
    },
    updateUserSuccess(state, { payload }) {
      state.loading = false
      state.user = payload
      state.error = ''
    },
    updateUserFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    resetUser() {
      return initialState
    },
  },
})

export const userAction = userSlice.actions

export const getUser = userId => async dispatch => {
  try {
    dispatch(userAction.getUserRequest())
    const user = await userApi.getUser(userId)
    dispatch(userAction.getUserSuccess(user))
  } catch (error) {
    dispatch(userAction.getUserFail(error))
  }
}

export const updateUser = (userId, userBody) => async dispatch => {
  try {
    dispatch(userAction.updateUserRequest())
    const userUpdated = await userApi.updateUser(userId, userBody)
    dispatch(userAction.updateUserSuccess(userUpdated))
    dispatch(getUsers())
  } catch (error) {
    dispatch(userAction.updateUserFail(error))
  }
}
export const userReducer = userSlice.reducer
