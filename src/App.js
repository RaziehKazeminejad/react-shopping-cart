import './App.css';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import CartProvider from './Providers/CartProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <CartProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
