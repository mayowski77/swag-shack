import React from 'react';
import PropTypes from 'prop-types';
import '../styles.css';
import { FaShoppingCart, FaHeart, FaUser } from 'react-icons/fa';
import { CiSearch } from "react-icons/ci";
import { useNavigate, Link } from 'react-router-dom';

const Header = ({ cartItemCount }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">
        <img src="https://i.ibb.co/1z43njc/m-icon.png" alt="Logo" />
      </div>
      <nav className="navigation">
  <ul>
    {[
      "Home",
      "Friday Deals",
      "Product Categories",
      "Accessories",
      "Game Shirt",
      "Information",
      "Customer Care"
    ].map((item) => (
      <li key={item}>
        <Link
          to={item === "Home" ? '/' : `/${item.toLowerCase().replace(" ", "-")}`}
          className="nav-link" // Optional: Add a class for styling
        >
          {item}
        </Link>
      </li>
    ))}
  </ul>
</nav>
      <div className="search-bar">
        <input type="text" placeholder="Search for products..." aria-label="Search input" />
        <CiSearch aria-label="Search" />
      </div>
      <div className="user-icons">
        <div
          className="icon-container cart-icon"
          onClick={() => navigate('/cart')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/cart')}
          tabIndex={0}
        >
          <FaShoppingCart aria-label="Shopping Cart" />
          {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
        </div>
        <div
          className="icon-container heart-icon"
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          tabIndex={0}
        >
          <FaHeart aria-label="Liked Products" />
          {/* likedCount > 0 && <span className="like-count">{likedCount}</span> */}
        </div>
        <div
          className="icon-container user-icon"
          tabIndex={0}
        >
          <FaUser aria-label="User Profile" />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  cartItemCount: PropTypes.number.isRequired,
};

export default Header;