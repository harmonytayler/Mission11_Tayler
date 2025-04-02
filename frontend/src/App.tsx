import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import PurchasePage from './pages/PurchasePage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import AdminBooksPage from './pages/AdminBooksPage'

function App() {

  return (
    <>
    <CartProvider>
      <Router>
          <Routes>
            <Route path='/' element={<BooksPage/>}/>
            <Route path='/books' element={<BooksPage/>}/>
            <Route path='/purchase/:title/:bookId/:price' element={<PurchasePage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/adminbooks' element={<AdminBooksPage/>}/>
          </Routes>
        </Router>
    </CartProvider>
    </>
  )
}

export default App
