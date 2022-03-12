import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { profileSelector } from '../redux/selectors'
import { getProfile } from '../redux/slices/profileSlice'
import { Message } from '../component/Message'
import { Spinner } from 'react-bootstrap'

export const ProfilePage = () => {
  const { user, loading, error } = useSelector(profileSelector)
  const [data, setData] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    !user && dispatch(getProfile())
  }, [dispatch, user])

  const handleInputChange = e => {
    const input = e.target
    setData({ ...data, [input.name]: input.value })
  }

  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
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
                      value={user.name}
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
                      onChange={handleInputChange}
                      name='email'
                      placeholder=''
                    />
                  </div>

                  <div className='mb-3'>
                    <label className='form-label'>Phone</label>
                    <input
                      type='number'
                      value={user?.phone}
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
                      value={user?.birthday}
                      className='form-control'
                      onChange={handleInputChange}
                      name='birthday'
                      id=''
                    />
                  </div>
                  <button type='button' className='btn btn-primary'>
                    Update
                  </button>
                </>
              )
            )}
          </div>

          <div className='col-9'>
            <h3 className='py-3 heading'>My Orders</h3>

            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>ID</th>
                  <th scope='col'>DATE</th>
                  <th scope='col'>TOTAL</th>
                  <th scope='col'>PAID</th>
                  <th scope='col'>DELIVERED</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td>@fat</td>
                  <td>@fat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
