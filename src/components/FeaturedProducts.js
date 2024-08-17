import React from 'react';
import { useCart } from '../App'; // Import useCart hook from the App
import { FaShoppingCart } from "react-icons/fa";

const FeaturedProducts = () => {
  const { addToCart, updateCartCount } = useCart();

  const products = [
    {
      id: 1,
      name: "EA FC24",
      price: "₦33,000",
      image: "https://i.ibb.co/J5z5jVw/fc24-cover.png"
    },
    {
      id: 2,
      name: "PLAYSTATION 5 CONSOLE (WHITE)",
      price: "₦150,000",
      image: "https://i.ibb.co/LxQ1bb8/ps5-product.png"
    },
    {
      id: 3,
      name: "GTA V (XBOX)",
      price: "₦50,000",
      image: "https://i.ibb.co/RDWQSXZ/gtav-xbox360.png"
    },
    {
      id: 4,
      name: "XBOX 360",
      price: "₦135,000",
      image: "https://i.ibb.co/9hRMW04/xbox360product.jpg"
    },
    {
      id: 5,
      name: "BOTTLE",
      price: "₦5,000",
      image: "https://i.ibb.co/X8gLCgL/sportsbottle.png"
    },
    {
      id: 6,
      name: "SPORT APPAREL",
      price: "₦55,000",
      image: "https://i.ibb.co/x72h2qH/sportsjersey.png"
    },
    {
      id: 7,
      name: "XBOX X (CUSTOMISED)",
      price: "₦170,000",
      image: "https://i.ibb.co/QQMwqwp/xbox360skin.png"
    },
    {
      id: 8,
      name: "PLAYSTATION GIFT CARDS",
      price: "₦80,000",
      image: "https://i.ibb.co/nLmFhNq/gift-card.png"
    }
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
    updateCartCount((prev) => prev + 1);
  };

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
              <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                <FaShoppingCart />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;