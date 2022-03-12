import { Breadcrumb, Container, Row, Stack, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ProductsDashboard } from '../component/ProductsDashboard'
import { SearchProduct } from '../component/SearchInputProduct'
import { UsersDashboard } from '../component/UsersDashboard'

export const DashboardPage = () => {
  return (
    <Container fluid='xl'>
      <Stack direction='horizontal' gap={2}>
        <div className='heading py-3 '>
          <h3 className='fw-bold'>Dashboard</h3>
          <Breadcrumb>
            <LinkContainer to='/'>
              <Breadcrumb.Item className='text-decoration-none'>
                Home
              </Breadcrumb.Item>
            </LinkContainer>

            <LinkContainer to='/admin'>
              <Breadcrumb.Item active>admin</Breadcrumb.Item>
            </LinkContainer>
          </Breadcrumb>
        </div>
        <div className='ms-auto'>
          <SearchProduct />
        </div>
      </Stack>

      <Row>
        {/* Users */}
        <Col md={6} className='pe-4'>
          <UsersDashboard />
        </Col>

        {/* Products */}
        <ProductsDashboard />
      </Row>
    </Container>
  )
}
