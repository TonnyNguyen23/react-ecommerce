import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export const NotFoundPage = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className='my-5 d-flex flex-column justify-content-center align-items-center'>
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div>Sorry, an error has occured, Requested page not found!</div>
            <div className='my-4'>
              <Link to='/' className='btn btn-primary btn-lg'>
                Take Me Home
              </Link>
              <Link
                to='/contact'
                className='btn btn-default btn-lg ms-2 btn-info'
              >
                Contact Support{' '}
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
