import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AddToCartButton({ product, className = '' }) {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <button onClick={handleAddToCart} className={`flex items-center justify-center gap-2 py-3 px-6 bg-gold text-black text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors ${className}`}>
      <ShoppingCart size={16} /> Add to Cart
    </button>
  );
}