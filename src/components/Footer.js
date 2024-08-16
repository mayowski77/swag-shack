// Footer.js
import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter } from 'react-icons/fa'; // Import social media icons
import { MdPayment } from 'react-icons/md'; // Import payment method icon

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h4>Contact Us</h4>
        <ul>
          <li>
            <FaEnvelope /> mayosco@gmail.com
          </li>
          <li>
            <FaPhone /> +2349164330801
          </li>
          <li>
            <FaMapMarkerAlt /> Lagos, Nigeria
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a></li>
        </ul>
      </div>
      <div className="footer-section payment-methods">
        <h4>Payment Methods</h4>
        <ul className="payment-icons">
          <li>
            <MdPayment size={24} /> {/* Example icon for payment method */}
          </li>
          {/* Add more payment method icons as needed */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;