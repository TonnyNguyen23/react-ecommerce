import Home from './pages/HomePage'
import { Header } from './component/Header'
import { Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <>
      <Header />
      <Container fluid className='p-0' style={{ marginTop: '80px' }}>
        <Routes>
          <Route path='/admin/newProduct' element={<NewProductPage />} />
          <Route path='/admin/editProduct/:id' element={<EditProductPage />} />
          <Route path='/admin/users/:userId/edit' element={<EditUserPage />} />
          <Route path='/admin' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Carts />} />
          <Route path='/orders' element={<OrderPage />} />
          <Route index path='/' element={<Home />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
