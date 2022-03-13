import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Modal, Button, Row, Image, Spinner } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../redux/slices/productsSlice'
import { productsSelector } from '../redux/selectors'

import { Message } from './Message'

export const ProductsDashboard = () => {
  const { products, info, error, loading } = useSelector(productsSelector)
  console.log({ products })

  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = () => setShowModal(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [products.length, dispatch])

  const handleShowModal = () => setShowModal(true)

  const handlerNavigateNewProduct = () => {
    navigate('/admin/products/new')
  }
  const deleteUserHandler = () => {
    // dispatch(deleteUser(userId))
    setShowModal(false)
  }

  return (
    <>
      <Col md={6} className='ps-4'>
        <div className='d-flex justify-content-between'>
          <h5 className='text-primary my-0'>
            Products
            <small style={{ fontSize: '12px', color: 'red' }}>
              ({info.totalProducts})
            </small>
          </h5>
          <Button
            variant='outline-primary'
            size='sm'
            onClick={handlerNavigateNewProduct}
          >
            <i className='fa fa-plus me-1'></i>
            new
          </Button>
        </div>
        <Row className='shadow p-2 py-3 mb-3 bg-white rounded'>
          {loading ? (
            <Spinner animation='border' variant='primary' />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            !!products.length && (
              <>
                {products.map(product => (
                  <>
                    <Col md={3} className='mb-2'>
                      <Image fluid rounded src={product.image} />
                    </Col>
                    <Col md={7}>
                      <div className='h-100 d-flex justify-content-center flex-column'>
                        <p className='text-primary my-0'>{product.title}</p>
                        <small className='d-'>{product.description}</small>
                        <div className='d-flex' style={{ fontSize: '12px' }}>
                          <span
                            className='me-3 rounded bg-dark text-white p-1'
                            style={{
                              backgroundColor: 'rgba(241, 237, 11, 0.6)',
                            }}
                          >
                            Price:
                            <span className='text-info fw-bold'>
                              ${product.price}
                            </span>
                          </span>
                          <span className='me-3 bg-dark rounded text-white p-1'>
                            <span>
                              Stock:
                              <span className='text-white fw-bold'>
                                {product.countInStock}
                              </span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className='h-100 d-flex align-items-center'>
                        <Button size='sm' variant='outline-primary me-1'>
                          <i className='fa fa-pencil-square-o'></i>
                        </Button>
                        <Button
                          size='sm'
                          onClick={handleShowModal}
                          variant='outline-danger'
                        >
                          <i className='fa fa-trash-o'></i>
                        </Button>
                      </div>
                    </Col>
                  </>
                ))}
              </>
            )
          )}
        </Row>
        <div className='d-flex justify-content-center'>
          <Button
            className='shadow'
            as='button'
            variant='outline-primary'
            size='sm'
          >
            Load more
          </Button>
        </div>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className='my-0 pt-3 pb-0'>
          <p variant='danger'>Delete product #userId.</p>
        </Modal.Body>

        <Modal.Footer className='my-0 py-2'>
          <Button
            onClick={deleteUserHandler}
            className='btn-sm'
            variant='danger'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
