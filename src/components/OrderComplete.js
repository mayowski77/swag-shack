import React, { useEffect } from 'react';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PropTypes from 'prop-types';
import '../styles.css';

const OrderComplete = ({ setScreen }) => {
  const { clearCart } = useCart();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    clearCart(); // Clear the cart when the component mounts
  }, [clearCart]);

  return (
    <div className="order-complete">
      <h2>Thank you for your order!</h2>
      <p>Your order has been placed successfully.</p>
      <p>Estimated Delivery: 3-5 business days</p>
      <div className="order-details">
        <h3>Order Details</h3>
        <p>Order Number: #123456</p>
        <ul>
          <li>Item 1 - ₦10,000</li>
          <li>Item 2 - ₦20,000</li>
          {/* Add more order items */}
        </ul>
        <p>Total: ₦30,000</p>
      </div>
      <button className="back-to-home" onClick={() => navigate('/')}>
        Back to Home
      </button>
      <button className="continue-shopping" onClick={() => navigate('/')}>
        Continue Shopping
      </button>
    </div>
  );
};

OrderComplete.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default OrderComplete;