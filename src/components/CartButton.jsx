import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartButton() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <button onClick={() => setIsCartOpen(true)} className="relative text-white/70 hover:text-gold transition-colors" aria-label="Open cart">
      <ShoppingBag size={20} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </button>
  );
}