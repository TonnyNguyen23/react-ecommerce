import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'

import { FormikControl } from '../component/FormikControl'
import { Message } from '../component/Message'

import { authResetError, register } from '../redux/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../redux/selectors'

const registerSchema = yup.object({
  name: yup.string().min(3).required().label('Full name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(6).required().label('Password'),
})

export const SignUpPage = () => {
  const initialValues = { email: '', password: '', name: '' }
  const { error, loading } = useSelector(authSelector)
  const dispatch = useDispatch()

  const onSubmit = data => {
    dispatch(register(data))
  }

  useEffect(() => {
    return () => {
      dispatch(authResetError())
    }
  }, [dispatch])
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className='text-center py-3 heading fw-bold py-3 my-0 pt-5'>
            Sign Up
          </h3>
          {error && (
            <Message className='text-center border-0 py-1' variant='danger'>
              {<small>{error}</small>}
            </Message>
          )}
          {/* Using formik */}
          <Formik
            validationSchema={registerSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, errors, values, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <FormikControl
                  name='name'
                  label='Full Name'
                  onChange={handleChange}
                  error={touched.name && errors.name}
                  value={values.name}
                  placeholder='Enter name'
                />
                <FormikControl
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  error={touched.email && errors.email}
                  value={values.email}
                  placeholder='Enter email'
                />
                <FormikControl
                  name='password'
                  label='Password'
                  type='password'
                  onChange={handleChange}
                  error={touched.password && errors.password}
                  value={values.password}
                  placeholder='Enter password'
                />

                <div className='d-grid'>
                  <Button type='submit' className='btn' variant='dark'>
                    {loading ? (
                      <>
                        <Spinner
                          as='span'
                          animation='grow'
                          size='sm'
                          role='status'
                          aria-hidden='true'
                        />
                        Sign Up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row className='py-3 text-center' style={{ fontSize: '14px' }}>
        <Col>
          Do you already have an account?
          <Link
            className='text-decoration-none text-primary ms-2 fw-bold'
            to={'/login'}
          >
            Login
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
