import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../api/userApi'

const initialState = {
  loading: false,
  users: [],
  info: '',
  error: '',
}
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersRequest(state) {
      state.loading = true
    },

    getUsersSuccess(state, { payload }) {
      state.loading = false
      state.users = payload.users
      state.info = payload.info
      state.error = ''
    },

    getUsersFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    deleteUserRequest(state) {
      state.loading = true
    },
    deleteUserSuccess(state, { payload }) {
      state.loading = false
      state.error = ''
      state.users = state.users.filter(user => user.id !== payload)
    },
    deleteUserFail(state, { payload }) {
      state.loading = false
      state.error = payload
    },

    resetUsers() {
      return initialState
    },
  },
})

export const usersAction = usersSlice.actions

export const getUsers = search => async dispatch => {
  try {
    dispatch(usersAction.getUsersRequest())
    const data = await userApi.getUsers(search)
    dispatch(usersAction.getUsersSuccess(data))
  } catch (error) {
    dispatch(usersAction.getUsersFail(error))
  }
}

export const deleteUser = userId => async dispatch => {
  try {
    dispatch(usersAction.deleteUserRequest())
    await userApi.deleteUser(userId)
    dispatch(usersAction.deleteUserSuccess(userId))
    // dispatch(getUsers())
  } catch (error) {
    dispatch(usersAction.deleteUserFail(error))
  }
}

export const usersReducer = usersSlice.reducer
