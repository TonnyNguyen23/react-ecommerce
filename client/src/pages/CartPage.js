import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

import { cartActions } from '../redux/reducer/cartSlice'

const CartPage = () => {
  const carts = useSelector(state => state.carts)
  const dispatch = useDispatch()

  const handleAddToCart = cart => {
    dispatch(cartActions.addCart(cart))
  }

  const handleRemoveToCart = cart => {
    dispatch(cartActions.deleteCart(cart))
  }

  return (
    <div className='container'>
      <h2 className='text-center fw-bolder py-4'>
        Your Carts ({carts.length})
      </h2>
      {!carts.length && (
        <div className='alert alert-secondary text-center' role='alert'>
          Your orders is empty
        </div>
      )}
      <div className='row'>
        <div className='col-md-8'>
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
                        <b className='card-text me-2'>{cart.price}$</b>x
                        <b className='card-text me-2 ms-2'>{cart.qty}</b>=
                        <b className='card-text ms-2'>
                          {cart.price * cart.qty}$
                        </b>
                      </div>

                      <div>
                        <button
                          className='btn btn-sm btn-outline-dark me-2'
                          onClick={() => handleRemoveToCart(cart)}
                        >
                          -
                        </button>

                        <button
                          className='btn btn-sm btn-outline-dark '
                          onClick={() => handleAddToCart(cart)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className='col-md-4'>
          <ul className='list-group text-center'>
            <li className='list-group-item active' aria-current='true'>
              Orders ({carts.reduce((total, cart) => total + cart.qty, 0)})
            </li>
            <li className='list-group-item'>
              <b>Total price: </b>$
              {carts.reduce((total, cart) => total + cart.price * cart.qty, 0)}
            </li>
            <li className='list-group-item'>
              {/*Navigate Shipping Form  */}
              <Nav.Link disabled={!carts.length} as={NavLink} to='/shipping'>
                <button
                  disabled={!carts.length}
                  className='btn btn-block btn-dark btn-sm'
                >
                  Shipping
                </button>
              </Nav.Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CartPage
