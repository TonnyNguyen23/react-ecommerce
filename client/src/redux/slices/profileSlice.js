import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../api/userApi'
const initialState = {
  user: null,
  loading: false,
  error: '',
}
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileRequest: state => {
      state.loading = true
    },
    getProfileSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload
      state.error = ''
    },
    getProfileFail: (state, { payload }) => {
      state.loading = false
      state.user = ''
      state.error = payload
    },
    resetProfile: () => {
      return initialState
    },
  },
})

export const profileActions = profileSlice.actions

export const getProfile = () => async dispatch => {
  try {
    dispatch(profileActions.getProfileRequest())
    const user = await userApi.getProfile()
    dispatch(profileActions.getProfileSuccess(user))
  } catch (error) {
    dispatch(profileActions.getProfileFail(error))
  }
}

export const profileReducer = profileSlice.reducer
