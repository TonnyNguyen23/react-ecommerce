import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getMyOrders } from '../redux/slices/ordersSlice'
import { Message } from './Message'
import { Spinner } from 'react-bootstrap'
import OrderRow from './OrderRow'

export const MyOrders = () => {
  const { orders, loading, error } = useSelector(state => state.orders)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getMyOrders())
  }, [dispatch])

  return (
    <>
      <h3 className='py-3 heading'>My Orders</h3>

      {loading ? (
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      ) : !!error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
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
            {!!orders &&
              orders.map(order => <OrderRow key={order.id} order={order} />)}
          </tbody>
        </table>
      )}
    </>
  )
}
