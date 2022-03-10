import Home from './pages/HomePage'
import { Header } from './component/Header'
import { Routes, Route } from 'react-router-dom'
import Products from './component/Products'
import ProductPage from './pages/ProductPage'
import 'react-loading-skeleton/dist/skeleton.css'
import Carts from './pages/CartPage'
import { SignInPage } from './pages/SignInPage'
import { Container } from 'react-bootstrap'
import { SignUpPage } from './pages/SignUpPage'

function App() {
  return (
    <>
      <Header />
      <Container fluid className='p-0' style={{ marginTop: '80px' }}>
        <Routes>
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Carts />} />
          <Route index path='/' element={<Home />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
