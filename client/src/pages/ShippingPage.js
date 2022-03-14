import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { shippingActions } from '../redux/slices/shippingSlice'

export const ShippingPage = () => {
  const shipping = useSelector(state => state.shipping)
  console.log({ shipping })

  const dispatch = useDispatch()
  const [data, setData] = useState({
    name: '',
    phone: '',
    address: '',
  })

  const handleInputChange = e => {
    const input = e.target
    setData({ ...data, [input.name]: input.value })
  }

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (!data.name || !data.phone || !data.address) {
      return alert('Please enter all fields.')
    }

    dispatch(shippingActions.createShipping(data))
    navigate('/orders')
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-12 col-md-6'>
          <h3 className='text-center py-3 heading fw-bold py-3 my-0 pt-5'>
            Shipping Address
          </h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Full Name</label>
              <input
                type='text'
                value={data.name}
                className='form-control'
                onChange={handleInputChange}
                name='name'
                placeholder='Enter full name'
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
                placeholder='Enter phone number'
              />
            </div>

            <div className='mb-3'>
              <label className='form-label'>Address</label>
              <input
                type='text'
                value={data.address}
                className='form-control'
                onChange={handleInputChange}
                name='address'
                placeholder='Enter shipping address'
              />
            </div>
            <button type='submit' className='btn btn-primary'>
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
