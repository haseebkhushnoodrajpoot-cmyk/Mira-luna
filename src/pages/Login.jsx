import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    try {
      await login(formData.email, formData.password);
      navigate('/account');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-5 sm:px-8 py-20">
      <h1 className="font-serif text-4xl text-gold text-center mb-2">Login</h1>
      <p className="text-center text-white/60 text-sm mb-8">Welcome back! Login to your account.</p>

      <div className="bg-white/5 p-6 rounded-lg border border-white/10">
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Email Address *</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="your@email.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-white/50 block mb-1">Password *</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-3 bg-black border border-white/20 rounded text-white focus:border-gold outline-none transition-colors" placeholder="Your password" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gold text-black text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors font-medium rounded">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-white/40 text-sm mt-4">
          Don't have an account? <Link to="/signup" className="text-gold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}