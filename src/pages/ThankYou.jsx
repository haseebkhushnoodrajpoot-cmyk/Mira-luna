import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function ThankYou() {
  const location = useLocation();
  const orderData = location.state || {};

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-20 text-center">
      <CheckCircle size={64} className="text-gold mx-auto mb-4" />
      <h1 className="font-serif text-4xl text-gold mb-2">Thank You! ✨</h1>
      <p className="text-white/60 mb-2">
        Your order has been sent to us via WhatsApp.
      </p>

      {orderData.orderId && (
        <p className="text-white/40 text-sm mb-6">
          Order #{orderData.orderId}
        </p>
      )}

      <div className="bg-white/5 p-6 rounded-lg border border-white/10 text-left">
        <h2 className="text-gold font-serif text-lg mb-3">What happens next?</h2>
        <ul className="space-y-2 text-white/70 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-gold">1.</span> We'll confirm your order via WhatsApp
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gold">2.</span> We'll arrange delivery within 3-5 business days
          </li>
          <li className="flex items-center gap-2">
            <span className="text-gold">3.</span> You pay when you receive your jewellery
          </li>
        </ul>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black hover:bg-gold-dark transition-colors uppercase text-sm tracking-wider">
          <ShoppingBag size={16} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}