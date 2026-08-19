import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, User, Heart, LogOut, Package } from 'lucide-react';

export default function Account() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { getTotalItems } = useCart();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="font-serif text-4xl text-gold mb-2">My Account</h1>
      <p className="text-white/60 text-sm mb-8">Welcome back, {currentUser.name}!</p>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center">
              <User size={28} className="text-gold" />
            </div>
            <div>
              <h3 className="text-white font-medium">{currentUser.name}</h3>
              <p className="text-white/40 text-sm">{currentUser.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="mt-4 flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <Link to="/wishlist" className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-gold/30 transition-colors group">
          <div className="flex items-center gap-4">
            <Heart size={28} className="text-gold" />
            <div>
              <h3 className="text-white font-medium group-hover:text-gold transition-colors">Wishlist</h3>
              <p className="text-white/40 text-sm">View saved items</p>
            </div>
          </div>
        </Link>

        <Link to="/shop" className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-gold/30 transition-colors group">
          <div className="flex items-center gap-4">
            <ShoppingBag size={28} className="text-gold" />
            <div>
              <h3 className="text-white font-medium group-hover:text-gold transition-colors">Cart</h3>
              <p className="text-white/40 text-sm">{getTotalItems()} items in cart</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-2xl text-white mb-4 flex items-center gap-2">
          <Package size={20} /> Order History
        </h2>
        <div className="bg-white/5 p-6 rounded-lg border border-white/10">
          {currentUser.orders && currentUser.orders.length > 0 ? (
            currentUser.orders.map((order, index) => (
              <div key={index} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0">
                <div>
                  <p className="text-white font-medium">Order #{order.id}</p>
                  <p className="text-white/40 text-sm">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-gold">Rs. {order.total.toLocaleString()}</p>
                  <p className={`text-sm ${order.status === 'fulfilled' ? 'text-green-400' : order.status === 'cancelled' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white/40 text-center py-8">
              You haven't placed any orders yet.<br />
              <Link to="/shop" className="text-gold hover:underline">Start shopping →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}