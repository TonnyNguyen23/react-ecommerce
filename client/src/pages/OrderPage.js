import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createOrder } from '../redux/slices/orderSlice'
import { Message } from '../component/Message'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const OrderPage = () => {
  const carts = useSelector(state => state.carts)
  const { shipping } = useSelector(state => state.shipping)

  const { order, error, success } = useSelector(state => state.order)
  const [shippingPrice, setShippingPrice] = useState(0)
  const dispatch = useDispatch()

  console.log({ order, error, success })

  const handleOrder = () => {
    const cartItems = carts.map(cart => ({
      title: cart.title,
      qty: cart.qty,
      price: cart.price,
      image: cart.image,
      product: cart.id,
    }))

    /**
     * orderItems: [{title, qty, price, image, product}, ]
     * shipping: { name, phone, address }
     * totalPrice
     * shippingPrice
     */
    const orderItem = {
      orderItems: cartItems,
      shipping,
      totalPrice: carts.reduce(
        (total, cart) => total + cart.price * cart.qty,
        0
      ),
      shippingPrice,
    }
    dispatch(createOrder(orderItem))
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
  }, [success])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-7'>
          <div className='row'>
            <h4 className='mt-5 fw-bold'>Account</h4>
            <Link to='/profile'>View profile</Link>
          </div>

          <div className='row'>
            <h4 className='mt-3 fw-bold'>Cart</h4>
            <p>
              <span>Total Items: </span>
              <span className='text-primary'>({carts.length})</span>
            </p>
            <p>
              <span>Total Price: </span>
              <span className='text-primary'>
                $
                {carts.reduce(
                  (total, cart) => total + cart.price * cart.qty,
                  0
                )}
              </span>
            </p>
            {!!carts.length &&
              carts.map(cart => (
                <div className='card mb-2 p-2 w-100' key={cart.id}>
                  <div className='row g-0'>
                    <div className='col-md-4'>
                      <img
                        src={cart.image}
                        className='img-fluid rounded-start'
                        style={{ height: '240px' }}
                        alt={cart.title}
                      />
                    </div>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>{cart.title}</h5>
                        <div>
                          <span className='card-text me-2'>${cart.price}</span>x
                          <span className='card-text me-2 ms-2'>
                            {cart.qty}
                          </span>
                          =
                          <span className='card-text ms-2'>
                            ${cart.price * cart.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Shipping Group */}
        <div className='col-4 offset-1'>
          <div className='row'>
            <h4 className='mt-5 fw-bold'>Shipping Address</h4>
            <b>Info</b>
            <p>Name: {shipping.name}</p>
            <p>Phone: {shipping.phone}</p>
            <b>Address</b>
            <p>{shipping.address}</p>
          </div>

          <div className='row'>
            {!!error && <Message variant='danger'>{error}</Message>}
          </div>

          <div className='row'>
            <button
              disabled={!!success}
              className='btn btn-block btn-dark'
              onClick={handleOrder}
            >
              Order
            </button>
          </div>
        </div>
      </div>

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
    </div>
  )
}
