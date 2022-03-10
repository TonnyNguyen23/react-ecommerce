import './App.css'
import Home from './component/Home'
import Navbar from './component/Navbar'
import { Routes, Route } from 'react-router-dom'
import Products from './component/Products'
import Product from './component/Product'
import 'react-loading-skeleton/dist/skeleton.css'
import Carts from './component/Cart'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Carts />} />
        <Route path='/products/:id' element={<Product />} />
      </Routes>
    </>
  )
}

export default App
