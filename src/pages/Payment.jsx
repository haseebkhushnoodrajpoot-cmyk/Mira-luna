import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { WHATSAPP_NUMBER } from '../constants';
import { useAuth } from '../context/AuthContext';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, getTotal, clearCart } = useCart();
  const { currentUser, updateUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const orderData = location.state || {};

  const { name, email, phone, address, city, notes } = orderData;
  const totalPKR = getTotal();

  const handlePayment = (method) => {
    setIsProcessing(true);

    // Build order items
    const orderItems = cart.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    // Save order
    const orderId = `ORD-${Date.now()}`;

    // Save to user account if logged in
    if (currentUser) {
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        total: totalPKR,
        status: 'pending',
        items: orderItems,
        paymentMethod: method,
      };
      const updatedUser = {
        ...currentUser,
        orders: [...(currentUser.orders || []), order],
      };
      updateUser(updatedUser);
    }

    // Send email confirmation
    if (email) {
      fetch('/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          name: name || 'Customer',
          orderId: orderId,
          items: orderItems,
          total: totalPKR,
          address: address || 'Not provided',
          phone: phone || 'Not provided',
          paymentMethod: method,
        }),
      }).catch(console.error);
    }

    // Build WhatsApp message
    const orderItemsText = cart
      .map((item) => {
        let itemPrice = item.price;
        if (item.salePercent && item.salePercent > 0) {
          itemPrice = item.price * (1 - item.salePercent / 100);
        }
        const pricePKR = Math.round(itemPrice * 280).toLocaleString();
        return `• ${item.name} × ${item.quantity} = Rs. ${pricePKR}`;
      })
      .join('\n');

    const message = `
🛍️ *New Order – Mira & Luna*

📋 *Order #: ${orderId}*

👤 *Customer Details:*
Name: ${name || 'Not provided'}
Phone: ${phone || 'Not provided'}
Email: ${email || 'Not provided'}
Address: ${address || 'Not provided'}
City: ${city || 'Not provided'}

📦 *Order Items:*
${orderItemsText}

💰 *Payment Summary:*
Total: Rs. ${totalPKR.toLocaleString()}

💳 *Payment Method:* ${method}

📝 *Notes:* ${notes || 'None'}

Thank you for choosing Mira & Luna! ✨
    `.trim();

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    clearCart();
    setIsProcessing(false);
    navigate('/thank-you', {
      state: {
        orderId,
        customerName: name,
        totalPKR,
        paymentMethod: method,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-serif text-4xl text-gold text-center mb-2">Payment</h1>
      <p className="text-center text-white/60 text-sm mb-8">Select your payment method</p>

      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        <h2 className="text-gold font-serif text-xl mb-4">Order Total</h2>
        <p className="text-3xl text-white font-bold text-center mb-6">Rs. {totalPKR.toLocaleString()}</p>

        <div className="space-y-4">
          <button onClick={() => handlePayment('Cash on Delivery')} className="w-full p-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-left flex items-center gap-4 transition-colors">
            <span className="text-2xl">💵</span>
            <div>
              <p className="text-white font-medium">Cash on Delivery</p>
              <p className="text-white/60 text-sm">Pay when you receive your order</p>
            </div>
          </button>

          <button onClick={() => handlePayment('JazzCash (0321-0017771)')} className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-left flex items-center gap-4 transition-colors">
            <span className="text-2xl">📱</span>
            <div>
              <p className="text-white font-medium">JazzCash</p>
              <p className="text-white/60 text-sm">Account: <span className="text-gold">0321-0017771</span></p>
            </div>
          </button>

          <button onClick={() => handlePayment('NayaPay (0312-4884822)')} className="w-full p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-left flex items-center gap-4 transition-colors">
            <span className="text-2xl">💳</span>
            <div>
              <p className="text-white font-medium">NayaPay</p>
              <p className="text-white/60 text-sm">Account: <span className="text-gold">0312-4884822</span></p>
            </div>
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500 text-sm text-center">
            ⚠️ After selecting a payment method, you'll be redirected to WhatsApp to confirm your order.
            <br />
            <span className="text-white/60">Please send the payment screenshot to confirm.</span>
          </p>
        </div>

        <button onClick={() => navigate(-1)} className="w-full mt-4 py-3 bg-white/5 text-white text-sm uppercase tracking-wider hover:bg-white/10 transition-colors rounded border border-white/10">
          ← Back to Checkout
        </button>
      </div>
    </div>
  );
}