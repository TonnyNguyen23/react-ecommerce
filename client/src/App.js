import Home from './pages/HomePage'
import { Header } from './component/Header'
import { Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './utils/privateRoute'

import Products from './component/Products'
import ProductPage from './pages/ProductPage'
import Carts from './pages/CartPage'
import { SignInPage } from './pages/SignInPage'
import { Container } from 'react-bootstrap'
import { SignUpPage } from './pages/SignUpPage'
import { ProfilePage } from './pages/ProfilePage'
import { DashboardPage } from './pages/DashboardPage'
import { EditUserPage } from './pages/EditUserPage'
import { EditProductPage } from './pages/EditProductPage'
import { NewProductPage } from './pages/NewProductPage'
import { OrderPage } from './pages/OrderPage'
import { NotFoundPage } from './pages/NotFoundPage'
function App() {
  return (
    <>
      <Header />
      <Container fluid className='p-0' style={{ marginTop: '80px' }}>
        <Routes>
          <Route
            path='/admin/users/:userId/edit'
            element={
              <PrivateRoute>
                <EditUserPage />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/users'
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/newProduct'
            element={
              <PrivateRoute>
                <NewProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path='admin/editProduct/:id'
            element={
              <PrivateRoute>
                <EditProductPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Carts />} />
          <Route path='/orders' element={<OrderPage />} />
          <Route index path='/' element={<Home />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
