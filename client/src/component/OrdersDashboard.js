import { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { Message } from './Message'
import { OrdersTable } from './OrdersTable'
import { Paginate } from './Paginate'

import { useSelector, useDispatch } from 'react-redux'
import { ordersSelector } from '../redux/selectors'
import { getOrders } from '../redux/slices/ordersSlice'

export const OrdersDashboard = () => {
  const { loading, error, info, orders } = useSelector(ordersSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    !orders?.length && dispatch(getOrders())
  }, [dispatch, orders?.length])

  return (
    <>
      {/* Heading */}
      <h5 className='text-primary'>
        Orders{' '}
        <small style={{ fontSize: '12px', color: 'red' }}>
          ({info?.totalOrders})
        </small>
      </h5>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        !!orders && <OrdersTable orders={orders} />
      )}
      {/* Pagination */}
      {!!info && <Paginate info={info} />}
    </>
  )
}
