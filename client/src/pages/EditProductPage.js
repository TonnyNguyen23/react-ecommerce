import {
  Button,
  Breadcrumb,
  Stack,
  Container,
  Row,
  Col,
  Form,
  Spinner,
  Image,
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import { FormikControl } from '../component/FormikControl'
import { Message } from '../component/Message'

import {
  getProduct,
  resetProductSuccess,
  updateProduct,
} from '../redux/slices/productSlice'
import { productSelector } from '../redux/selectors'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const productSchema = yup.object({
  title: yup.string().required(),
  category: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().default(0),
  countInStock: yup.number().required().default(0),
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

export const EditProductPage = () => {
  const { productId } = useParams()
  const { success, loading, error, product } = useSelector(productSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProduct(productId))
  }, [dispatch, productId])

  console.log({ success, loading, error, product })
  const initialValues = {
    title: product?.title || '',
    category: product?.category || '',
    description: product?.description || '',
    price: product?.price || 0.0,
    countInStock: product?.countInStock || 0,
  }

  const onUpdate = values => {
    const data = getChangedValues(values, product)
    !!Object.keys(data).length && dispatch(updateProduct(productId, data))
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
      !!success && dispatch(resetProductSuccess())
    }
  }, [dispatch, success])

  return (
    <>
      <Container>
        <Row>
          {/* Breadcrumb */}
          <Stack direction='horizontal' gap={2}>
            <div className='heading py-3 '>
              <h3 className='fw-bold'>Dashboards</h3>
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
                <Breadcrumb.Item active>Edit#{productId}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Stack>

          {/* Main */}
          <Col md={{ span: 6, offset: 3 }}>
            <h4 className='text-center heading '>
              Edit Product <b>{product?.title}</b>
            </h4>
            {error && (
              <Message className='text-center border-0 py-1' variant='danger'>
                {<small>{error}</small>}
              </Message>
            )}
            {/* Using formik */}
            <Formik
              validationSchema={productSchema}
              onSubmit={onUpdate}
              initialValues={initialValues}
              enableReinitialize
            >
              {({ handleSubmit, handleChange, errors, values, touched }) => (
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
                  <Image src={product?.image} fluid />
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
                          Updated...
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
