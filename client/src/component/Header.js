import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'

import { authSelector } from '../redux/selectors'
import { logout } from '../redux/slices/authSlice'

export const Header = () => {
  const carts = useSelector(state => state.carts)
  const { token, user } = useSelector(authSelector)

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <header>
      <Navbar
        bg='dark'
        expand='lg'
        variant='dark'
        collapseOnSelect
        className='shadow-sm'
        fixed='top'
        style={{ height: '80px' }}
      >
        <Container fluid='xl'>
          <Navbar.Brand className='fw-bold'>Online Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='d-flex w-100 '>
              {/* Menu page */}
              <div className='flex-grow-1 d-flex justify-content-center'>
                <Nav.Link as={NavLink} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to='/products'>
                  Products
                </Nav.Link>
                <Nav.Link as={NavLink} to='/about'>
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to='/contact'>
                  Contact
                </Nav.Link>
              </div>

              {/* Buttons  */}
              <div className='d-flex'>
                <Nav.Link as={NavLink} to='/cart'>
                  <i className='fa fa-shopping-cart me-1'></i>Cart (
                  {carts.length})
                </Nav.Link>

                {!token ? (
                  <Nav.Link as={NavLink} to='/login'>
                    Login
                    <i className='fa-solid fa-user' />
                  </Nav.Link>
                ) : (
                  <NavDropdown title={user.name} id='username'>
                    <NavDropdown.Item to='/profile'>Profile</NavDropdown.Item>

                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>

              {!token && user.role === 'admin' && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item to='/dashboards'>
                    Dashboards
                  </NavDropdown.Item>
                  <NavDropdown.Item to='/dashboards/order'>
                    Orders
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
