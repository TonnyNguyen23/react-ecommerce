import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { Message } from './Message'
import { UsersTable } from './UsersTable'
import { PaginationTable } from './PaginationTable'

import { useSelector } from 'react-redux'
import { usersSelector } from '../redux/selectors'
import { useDispatch } from 'react-redux'
import { getUsers } from '../redux/slices/usersSlice'

export const UsersDashboard = () => {
  const { loading, error, info, users } = useSelector(usersSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    users.length === 0 && dispatch(getUsers())
  }, [dispatch, users.length])

  return (
    <>
      {/* Heading */}
      <h5 className='text-primary'>
        Users <small style={{ fontSize: '12px', color: 'red' }}>(20)</small>
      </h5>

      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}

      {/* Table */}
      {!!users.length && <UsersTable users={users} />}

      {/* Pagination */}
      <PaginationTable info={info} />
    </>
  )
}
