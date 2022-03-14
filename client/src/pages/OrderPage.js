import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

export const OrderPage = () => {
  const carts = useSelector(state => state.carts)
  const { shipping } = useSelector(state => state.shipping)
  const [shippingPrice, setShippingPrice] = useState(0)
  console.log({ carts, shipping })
  const dispatch = useDispatch()
  const handleOrder = () => {
    const cartItems = carts.map(cart => ({
      title: cart.title,
      qty: cart.qty,
      price: cart.price,
      image: cart.image,
      product: cart.id,
    }))
    const orderItem = {
      orderItems: cartItems,
      shipping,
      totalPrice: carts.reduce(
        (total, cart) => total + cart.price * cart.qty,
        0
      ),
      shippingPrice,
    }
    console.log({ cartItems })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-7'>
          <div className='row'>
            <h4 className='mt-5 fw-bold'>Account</h4>
            <Link to='/profile'>View profile</Link>
          </div>

          <div className='row'>
            <h4 className='mt-3 fw-bold'>Order</h4>
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
            <button className='btn btn-block btn-dark' onClick={handleOrder}>
              Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
