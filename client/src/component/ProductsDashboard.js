import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner, Modal } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteProduct,
  getProducts,
  resetProductsSuccess,
} from '../redux/slices/productsSlice'
import { productsSelector } from '../redux/selectors'

import { Message } from './Message'
import { SearchProduct } from './SearchInputProduct'
import { ProductDashboardRow } from './ProductDashboardRow'

export const ProductsDashboard = () => {
  const { products, info, error, loading, success } =
    useSelector(productsSelector)

  const [showModal, setShowModal] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCloseModal = () => setShowModal(false)
  const handleShowDeleteProductModal = productId => {
    setDeleteProductId(productId)
    setShowModal(true)
  }
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(deleteProductId))
    setShowModal(false)
  }

  useEffect(() => {
    !products?.length && dispatch(getProducts())
  }, [dispatch, products?.length])

  const handlerNavigateNewProduct = () => {
    navigate('/admin/products/new')
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
      if (!!success) {
        dispatch(resetProductsSuccess())
      }
    }
  }, [dispatch, success])

  return (
    <>
      <div className='d-flex justify-content-between'>
        <h5 className='text-primary my-0'>
          Products
          <small style={{ fontSize: '12px', color: 'red' }}>
            ({info.totalProducts})
          </small>
        </h5>
        <div>
          <SearchProduct />
        </div>
        <Button
          variant='outline-primary'
          size='sm'
          onClick={handlerNavigateNewProduct}
        >
          <i className='fa fa-plus me-1'></i>
          new
        </Button>
      </div>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        !!products.length && (
          <>
            {products.map(product => (
              <ProductDashboardRow
                product={product}
                key={product.id}
                onShowDeleteProductModal={handleShowDeleteProductModal}
              />
            ))}
          </>
        )
      )}
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Body className='my-0 pt-3 pb-0'>
          <p variant='danger'>Delete product #{deleteProductId}.</p>
        </Modal.Body>

        <Modal.Footer className='my-0 py-2'>
          <Button
            onClick={handleDeleteProduct}
            className='btn-sm'
            variant='danger'
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

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
