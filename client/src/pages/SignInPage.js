import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Container, Row, Col, Form, Spinner } from 'react-bootstrap'

import { Formik } from 'formik'
import * as yup from 'yup'

import { FormikControl } from '../component/FormikControl'
import { Message } from '../component/Message'

import { useDispatch, useSelector } from 'react-redux'
import { authResetError, login } from '../redux/slices/authSlice'
import { authSelector } from '../redux/selectors'

const loginSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(6).required().label('Password'),
})

export const SignInPage = () => {
  const initialValues = { email: '', password: '' }
  const { loading, error, token } = useSelector(authSelector)

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : ''

  const onSubmit = data => {
    dispatch(login(data.email, data.password))
  }

  useEffect(() => {
    !!token && navigate(`/${redirect}`)

    return () => {
      dispatch(authResetError())
    }
  }, [token, redirect, dispatch, navigate])

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h3 className='text-center py-3 heading fw-bold py-3 my-0 pt-5'>
            Sign In
          </h3>
          {error && (
            <Message className='text-center border-0 py-1' variant='danger'>
              {<small>{error}</small>}
            </Message>
          )}
          {/* Using formik */}
          <Formik
            validationSchema={loginSchema}
            onSubmit={onSubmit}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, errors, values, touched }) => (
              <Form noValidate onSubmit={handleSubmit}>
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
                        Login...
                      </>
                    ) : (
                      'Login'
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
          New Customer?
          <Link
            className='text-decoration-none text-primary ms-2 fw-bold'
            to={'/register'}
          >
            Register
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
