import React from 'react'

import { Breadcrumb, Modal, Container, Row, Stack } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { ProductsDashboard } from '../component/ProductsDashboard'
import { SearchProduct } from '../component/SearchInputProduct'
import { UsersTable } from '../component/UsersTable'

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

            <LinkContainer to='/'>
              <Breadcrumb.Item active to='/dashboards'>
                Dashboards
              </Breadcrumb.Item>
            </LinkContainer>
          </Breadcrumb>
        </div>
        <div className='ms-auto'>
          <SearchProduct />
        </div>
      </Stack>

      <Row>
        {/* Users */}
        <UsersTable />

        {/* Products */}
        <ProductsDashboard />
      </Row>
    </Container>
  )
}
