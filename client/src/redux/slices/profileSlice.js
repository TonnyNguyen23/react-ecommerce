import { createSlice } from '@reduxjs/toolkit'
import { userApi } from '../../api/userApi'
const initialState = {
  user: null,
  loading: false,
  error: '',
  success: '',
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
      state.success = ''
    },
    getProfileFail: (state, { payload }) => {
      state.loading = false
      state.user = ''
      state.error = payload
      state.success = ''
    },
    updateProfileRequest: state => {
      state.loading = true
    },
    updateProfileSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload
      state.error = ''
      state.success = 'Update profile success'
    },
    updateProfileFail: (state, { payload }) => {
      state.loading = false
      state.user = ''
      state.error = payload
    },

    resetSuccess: state => {
      state.success = ''
    },
    resetProfile: () => {
      return initialState
    },
  },
})

export const profileActions = profileSlice.actions

export const resetSuccess = profileActions.resetSuccess

export const getProfile = () => async dispatch => {
  try {
    dispatch(profileActions.getProfileRequest())
    const user = await userApi.getProfile()
    dispatch(profileActions.getProfileSuccess(user))
  } catch (error) {
    dispatch(profileActions.getProfileFail(error))
  }
}

export const updateProfile = userBody => async dispatch => {
  try {
    dispatch(profileActions.updateProfileRequest())
    const user = await userApi.updateProfile(userBody)
    dispatch(profileActions.updateProfileSuccess(user))
  } catch (error) {
    dispatch(profileActions.updateProfileFail(error))
  }
}

export const profileReducer = profileSlice.reducer
