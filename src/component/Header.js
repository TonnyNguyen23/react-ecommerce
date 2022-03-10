import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Nav, Container, Navbar, NavDropdown } from 'react-bootstrap'

export const Header = () => {
  const carts = useSelector(state => state.carts)
  // console.log(carts);
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
        <Container>
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

                <Nav.Link as={NavLink} to='/login'>
                  Login
                  <i class='fa-solid fa-user' />
                </Nav.Link>

                {false && (
                  <NavDropdown title='minh' id='username'>
                    <NavDropdown.Item to='/profile'>Profile</NavDropdown.Item>

                    <NavDropdown.Item
                      onClick={() => console.log('logoutHandler')}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </div>

              {false && false === 'admin' && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item to='/admin/userlist'>
                    Users
                  </NavDropdown.Item>

                  <NavDropdown.Item to='/admin/productlist'>
                    Products
                  </NavDropdown.Item>

                  <NavDropdown.Item to='/admin/orderlist'>
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
