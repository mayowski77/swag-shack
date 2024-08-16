import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../App';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import '../styles.css';

const Checkout = ({ setScreen }) => {
  const { cartItems } = useCart();
  const navigate = useNavigate(); // Initialize navigate
  const totalCost = cartItems.reduce(
    (total, item) =>
      total +
      parseFloat(item.price.replace("₦", "").replace(",", "")) *
      (item.quantity || 1),
    0
  );

  // Default user information with valid test card details
  const defaultUser = {
    name: "Mayowa Adeyegbe",
    cardNumber: "4184 0000 0000 0000", // Valid test card number
    expirationDate: "12/25", // Valid expiration date
    cvv: "123", // Valid CVV
    email: "adeyegbe.mayowa@gmail.com"
  };

  const [paymentInfo, setPaymentInfo] = useState({
    name: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    email: ""
  });

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [field]: value }));
  };

  const validateForm = () => {
    const { name, cardNumber, expirationDate, cvv, email } = paymentInfo;
    if (!name || !cardNumber || !expirationDate || !cvv || !email) {
      alert("Please fill in all payment information fields.");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
      alert("Invalid card number.");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("Invalid CVV.");
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      alert("Invalid email address.");
      return false;
    }
    return true;
  };

  // Set up the payment handler using useFlutterwave
  const handleFlutterPayment = useFlutterwave({
    public_key: "FLWPUBK_TEST-cabe2d8d6bce3f63720e6c340d8d7df1-X",
    tx_ref: Date.now().toString(),
    amount: totalCost,
    currency: "NGN",
    payment_options: "card",
    customer: {
      email: paymentInfo.email,
      phone_number: "08100000000", // You can replace this with a dynamic value if needed
      name: paymentInfo.name,
    },
    customizations: {
      title: "Swag Shack",
      description: "Payment for purchased items",
      logo: "https://www.flutterwave.com/img/logo.svg",
    },
  });

  const handlePayment = () => {
    if (!validateForm()) return;

    handleFlutterPayment({
      callback: (response) => {
        if (response.status === "successful") {
          alert("Payment successful!");
          navigate('/order-complete'); // Redirect to order confirmation screen
        } else {
          alert("Payment failed. Please try again. Reason: " + response.message);
        }
        closePaymentModal(); // Close the payment modal
      },
      onClose: () => {
        console.log("Payment closed");
      },
    });
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {/* Product Summary */}
      <ul className="checkout-items">
        {cartItems.map((item) => (
          <li className="checkout-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="checkout-item-details">
              <h3>{item.name}</h3>
              <p>{item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Cost: ₦{totalCost.toFixed(2)}</p>
      </div>

      {/* Form for Payment Info */}
      <button onClick={() => setPaymentInfo({ ...defaultUser })}>Use Default Information</button>
      <input
        type="text"
        placeholder="Name on Card"
        value={paymentInfo.name}
        onChange={(e) => handlePaymentInfoChange("name", e.target.value)}
        className="payment-input"
      />
      <input
        type="text"
        placeholder="Card Number"
        value={paymentInfo.cardNumber}
        onChange={(e) => handlePaymentInfoChange("cardNumber", e.target.value)}
        className="payment-input"
      />
      <div className="expiration-cvv">
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={paymentInfo.expirationDate}
          onChange={(e) => handlePaymentInfoChange("expirationDate", e.target.value)}
          className="payment-input"
        />
        <input
          type="text"
          placeholder="CVV"
          value={paymentInfo.cvv}
          onChange={(e) => handlePaymentInfoChange("cvv", e.target.value)}
          className="payment-input"
        />
      </div>
      <input
        type="email"
        placeholder="Enter your email"
        value={paymentInfo.email}
        onChange={(e) => handlePaymentInfoChange("email", e.target.value)}
        className="payment-input"
      />

      {/* Payment Button */}
      <button
        onClick={handlePayment} // Call handlePayment on button click
        className="payment-button"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

Checkout.propTypes = {
  setScreen: PropTypes.func.isRequired,
};

export default Checkout;