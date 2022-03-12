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

    updateUser(state, { payload }) {
      state.users = payload
    },

    resetUsers() {
      return initialState
    },
  },
})

export const usersAction = usersSlice.actions

export const getUsers = () => async dispatch => {
  try {
    dispatch(usersAction.getUsersRequest())
    const data = await userApi.getUsers()
    dispatch(usersAction.getUsersSuccess(data))
  } catch (error) {
    dispatch(usersAction.getUsersFail(error))
  }
}

export const usersReducer = usersSlice.reducer
