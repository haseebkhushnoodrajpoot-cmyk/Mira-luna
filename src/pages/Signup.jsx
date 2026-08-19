import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 sm:px-8 py-20">
      <h1 className="font-serif text-4xl text-gold text-center mb-2">Sign Up</h1>
      <p className="text-center text-white/60 text-sm mb-8">Create your account to track orders and save favourites.</p>

      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
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
            <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Password *</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Min 6 characters" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Confirm Password *</label>
            <input type="password" name="confirmPassword" required value={formData.confirmPassword} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Confirm your password" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gold text-black text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors font-medium rounded">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-white/40 text-sm mt-4">
          Already have an account? <Link to="/login" className="text-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}