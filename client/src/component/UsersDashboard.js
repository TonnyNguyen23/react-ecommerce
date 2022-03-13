import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { Message } from './Message'
import { UsersTable } from './UsersTable'
import { Paginate } from './Paginate'

import { useSelector } from 'react-redux'
import { usersSelector } from '../redux/selectors'
import { useDispatch } from 'react-redux'
import { getUsers } from '../redux/slices/usersSlice'

export const UsersDashboard = () => {
  const { loading, error, info, users } = useSelector(usersSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const search = location.search || '?page=1'

  useEffect(() => {
    dispatch(getUsers(search))
  }, [dispatch, users.length, search])

  return (
    <>
      {/* Heading */}
      <h5 className='text-primary'>
        Users{' '}
        <small style={{ fontSize: '12px', color: 'red' }}>
          ({info?.totalUsers})
        </small>
      </h5>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        !!users.length && <UsersTable users={users} />
      )}
      {/* Pagination */}
      <Paginate info={info} />
    </>
  )
}
