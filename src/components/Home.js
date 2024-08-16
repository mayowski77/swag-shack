// Home.js
import React, { useState, useEffect } from 'react';
import FeaturedProducts from './FeaturedProducts';
import '../styles.css';
import { useCart } from '../App'; // Import the useCart hook to access cart functions

const Home = ({ setScreen }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useCart(); // Access the addToCart function from context

  useEffect(() => {
    const slideInterval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % 3),
      5000
    );
    return () => clearInterval(slideInterval);
  }, []);

  const slides = [
    "https://i.postimg.cc/5ykZqt1x/slide1-1.jpg",
    "https://i.postimg.cc/zfmQxs5B/image.jpg",
    "https://i.postimg.cc/DZCs8JH3/couple-laughing-while-wearing-vr-headsets-14117-797284.jpg"
  ];

  return (
    <div>
      <div className="hero">
        <div className="slideshow-container">
          {slides.map((slide, index) => (
            <div
              className={`slides ${index === currentSlide ? "active" : ""}`}
              key={index}
            >
              <img src={slide} alt={`Slide ${index + 1}`} />
            </div>
          ))}
          <button
            className="prev"
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }
          >
            ❮
          </button>
          <button
            className="next"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          >
            ❯
          </button>
        </div>
      </div>
      <FeaturedProducts addToCart={addToCart} /> {/* Pass addToCart function to FeaturedProducts */}
    </div>
  );
};

export default Home;