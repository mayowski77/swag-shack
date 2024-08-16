import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [giftOption, setGiftOption] = useState(false);
  const [discountApplied, setDiscountApplied] = useState(false);

  const handleQuantityChange = (item, quantity) => {
    if (quantity > 0) {
      addToCart({ ...item, quantity });
    } else {
      removeFromCart(item);
    }
  };

  const totalCost = cartItems.reduce(
    (total, item) =>
      total +
      parseFloat(item.price.replace("₦", "").replace(",", "")) *
      (item.quantity || 1),
    0
  );

  const handlePromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscountApplied(true);
      alert("Promo code applied! You saved 10%");
    } else {
      alert("Invalid promo code. Please try again.");
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-item-price">{item.price}</p>
              <input
                type="number"
                value={item.quantity || 1}
                min="1"
                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                className="cart-item-quantity"
              />
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="promo-code">
        <input
          type="text"
          placeholder="Enter Promo Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="promo-code-input"
        />
        <button onClick={handlePromoCode} className="promo-code-button">Apply Coupon</button>
      </div>

      <div className="gift-option">
        <label>
          <input
            type="checkbox"
            checked={giftOption}
            onChange={() => setGiftOption(!giftOption)}
          />{" "}
          This is a gift
        </label>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Cost: ₦{totalCost.toFixed(2)}</p>
        {discountApplied && <p>Discount Applied: ₦{(totalCost * 0.1).toFixed(2)}</p>}
      </div>

      <div className="cart-buttons">
        {cartItems.length > 0 && (
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        )}
        <button className="continue-shopping" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default Cart;