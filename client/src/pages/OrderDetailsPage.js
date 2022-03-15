import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getOrder } from '../redux/slices/orderSlice'
import { authSelector, orderSelector } from '../redux/selectors'
import { Button, Col, Image, ListGroup, Row, Spinner } from 'react-bootstrap'

export const OrderDetailsPage = () => {
  const { id } = useParams()
  const { order, loading } = useSelector(orderSelector)
  const { user } = useSelector(authSelector)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrder(id))
  }, [dispatch, id])
  return (
    <div className='container'>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : (
        order && (
          <>
            <div className='row'>
              <div className='col-7'>
                <div className='row'>
                  <h4 className='mb-2 mt-5 fw-bold'>Products</h4>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <b>Total Items:</b>
                      {'  '}
                      <span className='text-primary'>
                        ({order.orderItems.length})
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Total Qty:</b>
                      {'  '}
                      <b className='text-primary'>
                        (
                        {order.orderItems.reduce(
                          (total, x) => total + x.qty,
                          0
                        )}
                        )
                      </b>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Total Price:</b>
                      {'  '}
                      <b className='text-primary'>${order.totalPrice}</b>
                    </ListGroup.Item>
                  </ListGroup>
                  {order.orderItems.map(item => (
                    <Row
                      key={item.product}
                      className='shadow p-2 py-3 mb-3 bg-white rounded'
                    >
                      <Col md={3} className='mb-2'>
                        <Image fluid rounded src={item.image} />
                      </Col>
                      <Col md={7}>
                        <div className='h-100 d-flex justify-content-around flex-column'>
                          <p className='text-primary my-0'>{item.title}</p>
                          <div className='d-flex' style={{ fontSize: '12px' }}>
                            <span
                              className='me-3 rounded bg-dark text-white p-1'
                              style={{
                                backgroundColor: 'rgba(241, 237, 11, 0.6)',
                              }}
                            >
                              Price:
                              <span className='text-info fw-bold'>
                                ${item.price}
                              </span>
                            </span>
                            <span className='me-3 bg-dark rounded text-white p-1'>
                              <span>
                                Qty:
                                <span className='text-white fw-bold'>
                                  {item.qty}
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col md={2}>
                        <div className='h-100 d-flex align-items-center'>
                          ${item.qty * item.price}
                        </div>
                      </Col>
                    </Row>
                  ))}
                </div>

                <div className='row'>
                  <h4 className='mt-5 fw-bold'>Owner</h4>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>Name: {order.user.name}</ListGroup.Item>
                    <ListGroup.Item>Email: {order.user.email}</ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
              <div className='col-4 offset-1'>
                <div className='row'>
                  <h4 className='mt-5 fw-bold'>Shipping Address</h4>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <b>Order recipient: </b>
                      {order.shipping.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Phone: </b>
                      {order.shipping.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <b>Address: </b>
                      {order.shipping.address}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                {console.log({ order })}
                <div className='row'>
                  <h4 className='mt-5 fw-bold'>Payment Method</h4>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Button variant='dark'>{order.paymentMethod}</Button>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                <div className='row my-2'>
                  {user.role === 'admin' && (
                    <button className='btn btn-block btn-primary'>
                      Giao hàng
                    </button>
                  )}

                  {user.role !== 'admin' && (
                    <button className='btn btn-block btn-primary'>
                      Chưa Nhận Hàng
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  )
}
