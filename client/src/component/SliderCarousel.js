import React from 'react'
import { Carousel, Image } from 'react-bootstrap'

export const SliderCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={1000} style={{ height: '80vh' }}>
        <Image
          style={{ objectFit: 'cover' }}
          className='d-block w-100'
          src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
          alt='First slide'
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} style={{ height: '80vh' }}>
        <Image
          style={{ objectFit: 'cover' }}
          className='d-block w-100 h-100'
          src='https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
          alt='Second slide'
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '80vh' }}>
        <Image
          style={{ objectFit: 'cover' }}
          className='d-block w-100 h-100'
          src='https://images.unsplash.com/photo-1513116476489-7635e79feb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=793&q=80'
          alt='Third slide'
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
