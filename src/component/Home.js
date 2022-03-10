import React from 'react'
import Products from './Products'
import { SliderCarousel } from './SliderCarousel'

const Home = () => {
  return (
    <div className='hero'>
      <SliderCarousel />
      <Products />
    </div>
  )
}

export default Home
