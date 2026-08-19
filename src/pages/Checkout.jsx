import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { WHATSAPP_NUMBER } from '../constants';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, getSubtotal, getShippingFee, getTotal } = useCart();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/shop');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmailConfirmation = async (orderData) => {
    try {
      await fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: orderData.email,
          name: orderData.customerName,
          orderId: orderData.orderId,
          items: orderData.items,
          total: orderData.totalPKR,
          address: orderData.address,
          phone: orderData.phone,
          paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
        }),
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    navigate('/payment', {
      state: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        notes: formData.notes,
      },
    });

    setIsSubmitting(false);
  };

  if (cart.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-serif text-4xl text-gold text-center mb-2">Checkout</h1>
      <p className="text-center text-white/60 text-sm mb-8">Complete your order – we'll confirm via WhatsApp</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <h2 className="text-gold font-serif text-xl mb-4">Order Summary</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map((item) => {
              let itemPrice = item.price;
              if (item.salePercent && item.salePercent > 0) {
                itemPrice = item.price * (1 - item.salePercent / 100);
              }
              const pricePKR = Math.round(itemPrice * 280).toLocaleString();
              return (
                <div key={item.id} className="flex justify-between text-sm text-white/80">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {pricePKR}</span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Subtotal</span>
              <span>Rs. {getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Shipping</span>
              <span>{getSubtotal() > 3000 ? <span className="text-gold">FREE</span> : `Rs. ${getShippingFee()}`}</span>
            </div>
            <div className="flex justify-between text-white font-semibold text-lg pt-2 border-t border-white/10">
              <span>Total</span>
              <span className="text-gold">Rs. {getTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <h2 className="text-gold font-serif text-xl mb-4">Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Full Name *</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Your full name" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Email Address *</label>
              <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Phone Number *</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="03xx-xxxxxxx" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Delivery Address *</label>
              <textarea name="address" required rows="2" value={formData.address} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="House #, Street, Area" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">City *</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Karachi, Lahore, etc." />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Order Notes (Optional)</label>
              <textarea name="notes" rows="2" value={formData.notes} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Any special instructions..." />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gold text-black text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors font-medium rounded">
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </button>

            <p className="text-center text-xs text-white/40">
              <span className="text-gold">Cash on Delivery</span> – Free shipping on orders above Rs. 3,000
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}