import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await axios.post('http://localhost:8000/api/auth/login', formData);
      if (res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        localStorage.setItem('isLoggedIn', 'true');
        setMessage('Login successful! Redirecting...');
        setTimeout(() => navigate('/home'), 1500);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed';
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/30">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Welcome Back</h2>
        <p className="text-white/70 text-center mb-6">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/90 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-white/50"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white/90 text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-white/50"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-white/80 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-md transition duration-200"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded text-sm text-center ${
            message.includes('successful')
              ? 'bg-green-600/20 text-green-100 border border-green-400/30'
              : 'bg-red-600/20 text-red-100 border border-red-400/30'
          }`}>
            {message}
          </div>
        )}

        <p className="mt-6 text-white/80 text-sm text-center">
          Dont have an account?{' '}
          <Link to="/register" className="text-white font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
