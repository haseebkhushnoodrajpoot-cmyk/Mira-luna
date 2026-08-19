import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { EXCHANGE_RATE } from '../constants';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getSubtotal,
    getShippingFee,
    getTotal,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-black border-l border-gold/20 z-50 shadow-2xl animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-gold/20">
          <h2 className="text-lg font-serif text-gold">Your Cart ({getTotalItems()})</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-white/70 hover:text-gold transition-colors"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[60vh]">
          {cart.length === 0 ? (
            <div className="text-center text-white/60 py-12"><p className="text-lg mb-2">Your cart is empty</p><p className="text-sm">Start adding some beautiful jewellery!</p></div>
          ) : (
            cart.map((item) => {
              let itemPrice = item.price;
              let salePercent = 0;
              if (item.salePercent && item.salePercent > 0) {
                salePercent = item.salePercent;
                itemPrice = item.price * (1 - salePercent / 100);
              }
              const pricePKR = Math.round(itemPrice * EXCHANGE_RATE).toLocaleString();
              const originalPricePKR = Math.round(item.price * EXCHANGE_RATE).toLocaleString();
              return (
                <div key={item.id} className="flex gap-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <img src={item.image || 'https://picsum.photos/seed/fallback/100/100'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="text-sm text-white font-medium">{item.name}</h4>
                    {salePercent > 0 ? (
                      <div className="flex items-center gap-2"><p className="text-xs text-gold/70">Rs. {pricePKR}</p><p className="text-xs text-white/30 line-through">Rs. {originalPricePKR}</p></div>
                    ) : (
                      <p className="text-xs text-gold/70">Rs. {pricePKR}</p>
                    )}
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center border border-white/20 rounded hover:border-gold transition-colors"><Minus size={12} className="text-white" /></button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center border border-white/20 rounded hover:border-gold transition-colors"><Plus size={12} className="text-white" /></button>
                      <button onClick={() => removeFromCart(item.id)} className="ml-auto text-white/40 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gold/20 p-4 bg-black/80">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70"><span>Subtotal</span><span>Rs. {getSubtotal().toLocaleString()}</span></div>
              <div className="flex justify-between text-white/70"><span>Shipping</span><span>{getSubtotal() > 3000 ? <span className="text-gold">FREE</span> : `Rs. ${getShippingFee()}`}</span></div>
              <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-white/10"><span>Total</span><span className="text-gold">Rs. {getTotal().toLocaleString()}</span></div>
            </div>
            <Link to="/checkout" onClick={() => setIsCartOpen(false)} className="w-full mt-4 py-3 bg-gold text-black text-center uppercase text-sm tracking-wider hover:bg-gold-dark transition-colors block rounded">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}