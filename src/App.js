import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderComplete from './components/OrderComplete';
import './styles.css';

// Create context for cart state
const CartContext = createContext();

// Custom hook for accessing the cart context
export const useCart = () => useContext(CartContext);

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCartItems(cartItems.filter((item) => item.id !== product.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

  // Update cart count function
  const updateCartCount = (count) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      // Logic to update the cart count can be added here if needed
      return updatedItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, updateCartCount }}>
      <Router>
        <div className="app">
          <Header cartItemCount={cartItemCount} /> {/* Pass cartItemCount to Header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartContext.Provider>
  );
};

export default App;