<<<<<<< HEAD:client/src/App.js
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
import { ProfilePage } from './pages/ProfilePage'
import { DashboardPage } from './pages/DashboardPage'
import { EditUserPage } from './pages/EditUserPage'
import { EditProductPage } from './pages/EditProductPage'
import { NewProductPage } from './pages/NewProductPage'
=======
import Home from "./pages/HomePage";
import { Header } from "./component/Header";
import { Routes, Route } from "react-router-dom";
import Products from "./component/Products";
import ProductPage from "./pages/ProductPage";
import "react-loading-skeleton/dist/skeleton.css";
import Carts from "./pages/CartPage";
import { SignInPage } from "./pages/SignInPage";
import { Container } from "react-bootstrap";
import { SignUpPage } from "./pages/SignUpPage";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
>>>>>>> 7b9db2640342c9e0e927e66ee9d13e7c8b487fdd:src/App.js

function App() {
  return (
    <>
      <Header />
      <Container fluid className="p-0" style={{ marginTop: "80px" }}>
        <Routes>
<<<<<<< HEAD:client/src/App.js
          <Route path='/dashboards/newProduct' element={<NewProductPage />} />
          <Route
            path='/dashboards/editProduct/:id'
            element={<EditProductPage />}
          />
          <Route path='/dashboards/editUser/:id' element={<EditUserPage />} />
          <Route path='/dashboards' element={<DashboardPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/register' element={<SignUpPage />} />
          <Route path='/login' element={<SignInPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/cart' element={<Carts />} />
          <Route index path='/' element={<Home />} />
=======
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route index path="/" element={<Home />} />
>>>>>>> 7b9db2640342c9e0e927e66ee9d13e7c8b487fdd:src/App.js
        </Routes>
      </Container>
    </>
  );
}

export default App;
