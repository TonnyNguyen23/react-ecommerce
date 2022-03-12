import {
  Button,
  Breadcrumb,
  Stack,
  Container,
  Row,
  Col,
  Form,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { FormikControl } from '../component/FormikControl'

const userSchema = yup.object({
  name: yup.string().min(3).required().label('Full name'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().min(6).required().label('Password'),
})

export const NewProductPage = () => {
  const onSubmit = data => {
    console.log(data)
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
                <Breadcrumb.Item>Products</Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to='/'>
                <Breadcrumb.Item active to='/admin'>
                  new
                </Breadcrumb.Item>
              </LinkContainer>
            </Breadcrumb>
          </div>
        </Stack>
        <Col md={{ span: 6, offset: 3 }}>
          <h4 className='text-center heading'>New Product</h4>
          {/* Using formik */}
          <Formik
            validationSchema={userSchema}
            onSubmit={onSubmit}
            initialValues={{ email: '', password: '' }}
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
                  name='password'
                  label='Password'
                  onChange={handleChange}
                  error={errors.password}
                  value={values.password}
                  placeholder='Enter password'
                />

                <div className='d-grid'>
                  <Button type='submit' className='btn' variant='dark'>
                    Create
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
