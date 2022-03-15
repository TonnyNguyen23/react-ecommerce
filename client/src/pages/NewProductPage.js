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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { FormikControl } from '../component/FormikControl'
import { PreviewImage } from '../component/PreviewImage'
import { Message } from '../component/Message'

import { createProduct, resetProduct } from '../redux/slices/productSlice'
import { productSelector } from '../redux/selectors'
import { useEffect } from 'react'

const productSchema = yup.object({
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().default(0),
  countInStock: yup.number().required().default(0),
})

export const NewProductPage = () => {
  const dispatch = useDispatch()
  const { success, loading, error } = useSelector(productSelector)
  const initialValues = {
    title: '',
    category: '',
    description: '',
    price: 0.0,
    countInStock: 0,
    image: '',
  }
  const onSubmit = (data, { resetForm }) => {
    const { title, category, description, price, countInStock, image } = data
    const formData = new FormData()
    formData.append('title', title)
    formData.append('category', category)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('countInStock', countInStock)
    delete image.preview
    formData.append('image', image)

    dispatch(createProduct(formData))
    resetForm()
  }

  useEffect(() => {
    if (!!success) {
      toast.success(success, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    return () => {
      !!success && dispatch(resetProduct())
    }
  }, [dispatch, success])

  return (
    <>
      <Container>
        <Row>
          <Stack direction='horizontal' gap={2}>
            <div className='heading py-3 '>
              <h3 className='fw-bold'>Dashboards</h3>
              {/* Breadcrumb */}
              <Breadcrumb>
                <LinkContainer to='/'>
                  <Breadcrumb.Item className='text-decoration-none'>
                    Home
                  </Breadcrumb.Item>
                </LinkContainer>

                <LinkContainer to='/admin'>
                  <Breadcrumb.Item>Admin</Breadcrumb.Item>
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
            <h4 className='text-center heading fw-bold'>New Product</h4>
            {error && (
              <Message className='text-center border-0 py-1' variant='danger'>
                {<small>{error}</small>}
              </Message>
            )}
            {/* Using formik */}
            <Formik
              validationSchema={productSchema}
              onSubmit={onSubmit}
              initialValues={initialValues}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                values,
                setFieldValue,
                touched,
                getFieldMeta,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <FormikControl
                    name='title'
                    label='Title'
                    onChange={handleChange}
                    error={touched.title && errors.title}
                    value={values.title}
                    placeholder='Enter title'
                  />
                  <FormikControl
                    name='category'
                    label='Category'
                    onChange={handleChange}
                    error={touched.category && errors.category}
                    value={values.category}
                    placeholder='Enter category'
                  />
                  <FormikControl
                    as='textarea'
                    name='description'
                    label='Description'
                    onChange={handleChange}
                    error={touched.description && errors.description}
                    value={values.description}
                    placeholder='Enter description'
                  />
                  <FormikControl
                    name='price'
                    label='Price'
                    type='number'
                    onChange={handleChange}
                    error={touched.price && errors.price}
                    value={values.price}
                  />
                  <FormikControl
                    name='countInStock'
                    label='Quantity in stock'
                    type='number'
                    onChange={handleChange}
                    error={touched.countInStock && errors.countInStock}
                    value={values.countInStock}
                  />
                  <FormikControl
                    label='Image'
                    name='image'
                    type='file'
                    onChange={event => {
                      setFieldValue('image', event.currentTarget.files[0])
                    }}
                    error={touched.image && errors.image}
                  />
                  {!!getFieldMeta('image').value && (
                    <PreviewImage fluid image={getFieldMeta('image').value} />
                  )}
                  <div className='d-grid mt-3 mb-5'>
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
                          Create...
                        </>
                      ) : (
                        'Create'
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
