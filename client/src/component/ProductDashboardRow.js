import { Col, Button, Row, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const ProductDashboardRow = ({ product, onShowDeleteProductModal }) => {
  const navigate = useNavigate()

  const handleNavigateEditProduct = () => {
    navigate(`/admin/products/${product.id}/edit`)
  }

  return (
    <>
      <Row className='shadow p-2 py-3 mb-3 bg-white rounded'>
        <Col md={2} className='mb-2'>
          <Image
            style={{ height: '130px' }}
            fluid
            rounded
            src={product.image}
          />
        </Col>
        <Col md={8}>
          <div className='h-100 d-flex justify-content-around flex-column'>
            <p className='text-primary my-0'>{product.title}</p>
            <small className='d-'>
              {product?.description?.length > 300
                ? `${product.description.slice(0, 288)} ...`
                : product.description}
            </small>
            <div className='d-flex' style={{ fontSize: '12px' }}>
              <span
                className='me-3 rounded bg-dark text-white p-1'
                style={{
                  backgroundColor: 'rgba(241, 237, 11, 0.6)',
                }}
              >
                Price:
                <span className='text-info fw-bold'>${product.price}</span>
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
            <Button
              size='sm'
              variant='outline-primary me-1'
              onClick={handleNavigateEditProduct}
            >
              <i className='fa fa-pencil-square-o'></i>
            </Button>
            <Button
              size='sm'
              onClick={() => onShowDeleteProductModal(product.id)}
              variant='outline-danger'
            >
              <i className='fa fa-trash-o'></i>
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
