import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getProfile,
  resetSuccess,
  updateProfile,
} from '../redux/slices/profileSlice'
import { Message } from './Message'
import { Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'

export const ProfileInfo = () => {
  const { user, loading, error, success } = useSelector(state => state.profile)

  const [data, setData] = useState({
    name: '',
    phone: '',
    birthday: '',
  })

  const dispatch = useDispatch()
  useEffect(() => {
    !user && dispatch(getProfile())
    if (user) {
      setData({
        birthday: user?.birthday?.split('T')[0] || '',
        name: user.name || '',
        phone: user?.phone || '',
      })
    }
  }, [dispatch, user])

  const handleInputChange = e => {
    const input = e.target
    setData({ ...data, [input.name]: input.value })
  }

  const handleUpdateProfile = () => {
    if (
      data.phone !== user.phone ||
      data.name !== user.name ||
      data.birthday !== user?.birthday?.split('T')[0]
    ) {
      dispatch(updateProfile(data))
      setData({
        name: '',
        phone: '',
        birthday: '',
      })
    }
  }

  useEffect(() => {
    if (!!success) {
      toast.success(success, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    return () => {
      !!success && dispatch(resetSuccess())
    }
  }, [dispatch, success])

  return (
    <>
      <h3 className='py-3 heading'>User Profile</h3>

      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : !!error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        user && (
          <>
            <div className='mb-3'>
              <label className='form-label'>Full name</label>
              <input
                type='text'
                value={data.name}
                className='form-control'
                onChange={handleInputChange}
                name='name'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Email</label>
              <input
                type='email'
                value={user.email}
                className='form-control'
                disabled={true}
                name='email'
                placeholder=''
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Phone</label>
              <input
                type='number'
                value={data.phone}
                className='form-control'
                onChange={handleInputChange}
                name='phone'
                placeholder=''
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Date of birth</label>
              <input
                type='date'
                value={data?.birthday}
                className='form-control'
                onChange={handleInputChange}
                name='birthday'
                id=''
              />
            </div>
            <button
              type='button'
              onClick={handleUpdateProfile}
              className='btn btn-primary'
              disabled={
                data?.phone === user?.phone &&
                data?.name === user?.name &&
                data?.birthday === user?.birthday?.split('T')[0]
              }
            >
              Update
            </button>
          </>
        )
      )}

      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
