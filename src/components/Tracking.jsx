// src/components/Tracking.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = 'G-1C2HNTYJZK';

export default function Tracking() {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics page view
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  // Track Add to Cart
  const trackAddToCart = (product) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'add_to_cart', {
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          currency: 'PKR',
        }],
      });
    }
  };

  // Track Checkout
  const trackCheckout = (cart, total) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'begin_checkout', {
        value: total,
        currency: 'PKR',
      });
    }
  };

  // Track Purchase
  const trackPurchase = (cart, total) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'purchase', {
        value: total,
        currency: 'PKR',
      });
    }
  };

  // Expose tracking functions globally
  useEffect(() => {
    window.__miraLunaTracking = {
      trackAddToCart,
      trackCheckout,
      trackPurchase,
    };
  }, []);

  return null;
}