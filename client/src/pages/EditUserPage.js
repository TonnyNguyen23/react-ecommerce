import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Breadcrumb,
  Stack,
  Container,
  Row,
  Col,
  Form,
  Spinner,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormikControl } from '../component/FormikControl'

import { useDispatch, useSelector } from 'react-redux'
import { userSelector } from '../redux/selectors'
import { getUser, updateUser } from '../redux/slices/userSlice'
import { Message } from '../component/Message'

const userSchema = yup.object({
  name: yup.string().min(3).required().label('Full name'),
  email: yup.string().email().required().label('Email'),
  birthday: yup.date().min(6).label('Birthday'),
  role: yup.mixed().oneOf(['user', 'admin']).required().label('Role'),
})

const getChangedValues = (values, initialValues) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value

    if (hasChanged) {
      acc[key] = value
    }

    return acc
  }, {})
}

export const EditUserPage = () => {
  const { userId } = useParams()
  const { user, loading, error } = useSelector(userSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  const onUpdate = values => {
    const data = getChangedValues(values, {
      ...user,
      birthday: user?.birthday?.split('T')[0] || '',
    })
    !!Object.keys(data).length && dispatch(updateUser(userId, data))
  }
  return (
    <Container>
      <Row>
        <Stack direction='horizontal' gap={2}>
          <div className='heading py-3 '>
            <h3 className='fw-bold'>admin</h3>
            {/* Breadcrumb */}
            <Breadcrumb>
              <LinkContainer to='/'>
                <Breadcrumb.Item className='text-decoration-none'>
                  Home
                </Breadcrumb.Item>
              </LinkContainer>

              <LinkContainer to='/admin'>
                <Breadcrumb.Item>admin</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to='/admin'>
                <Breadcrumb.Item>Users</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to='/'>
                <Breadcrumb.Item active to='/admin'>
                  #a234aerdf34r
                </Breadcrumb.Item>
              </LinkContainer>
            </Breadcrumb>
          </div>
        </Stack>
        <Col md={{ span: 6, offset: 3 }}>
          <h4 className='text-center heading'>
            Update User: <b>minh chiucam</b>
          </h4>
          {!!error && <Message variant='danger'>{error}</Message>}
          {/* Using formik */}
          <Formik
            validationSchema={userSchema}
            onSubmit={onUpdate}
            initialValues={{
              name: user?.name || '',
              birthday: user?.birthday?.split('T')[0] || '',
              email: user?.email || '',
              role: user?.role || 'user',
            }}
            enableReinitialize
          >
            {({ handleSubmit, handleChange, errors, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <FormikControl
                  name='name'
                  label='Full Name'
                  onChange={handleChange}
                  error={errors.name}
                  value={values.name}
                  placeholder='Enter name'
                />
                <FormikControl
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  error={errors.email}
                  value={values.email}
                  placeholder='Enter email'
                />
                <FormikControl
                  name='birthday'
                  type='date'
                  label='Birthday'
                  onChange={handleChange}
                  error={errors.birthday}
                  value={values.birthday}
                  min='1960-12-12'
                  max='2014-12-12'
                />
                <Form.Group className='mb-3'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Select
                    name='role'
                    value={values.role}
                    onChange={handleChange}
                    isInvalid={errors.role}
                  >
                    <option value='admin'>admin</option>
                    <option value='user'>user</option>
                  </Form.Select>

                  {
                    <Form.Control.Feedback type='invalid'>
                      {errors?.role}
                    </Form.Control.Feedback>
                  }
                </Form.Group>
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
                        Update...
                      </>
                    ) : (
                      'Update'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  )
}
