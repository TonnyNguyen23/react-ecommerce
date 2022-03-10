import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'

export const SignUpPage = () => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className='text-center py-3 heading fw-bold py-3 my-0 pt-5'>
            Sign Up
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control placeholder='Enter email' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control placeholder='Enter email' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder='Enter password' />
            </Form.Group>
            <div className='d-grid'>
              <Button type='submit' class='btn' variant='dark'>
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row className='py-3 text-center' style={{ fontSize: '14px' }}>
        <Col>
          Do you already have an account?
          <Link
            className='text-decoration-none text-primary ms-2 fw-bold'
            to={'/login'}
          >
            login
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
