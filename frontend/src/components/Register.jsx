import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phoneNumber: '',
    password: '', confirmPassword: '', isDriver: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    else if (formData.firstName.length < 3) newErrors.firstName = 'Min 3 characters';

    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    else if (formData.lastName.length < 3) newErrors.lastName = 'Min 3 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email';

    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number required';
    else if (!/^\d{10}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Must be 10 digits';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords don\'t match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');
    const { confirmPassword, ...dataToSend } = formData;

    try {
      const res = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorMsg = result.message || 'Registration failed';
        setMessage(errorMsg);
      }
    } catch (err) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/30">
        <h2 className="text-2xl font-bold text-white text-center mb-2">Create Account</h2>
        <p className="text-white/70 text-center mb-5 text-sm">Join TransportConnect</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: 'firstName', placeholder: 'First Name' },
            { name: 'lastName', placeholder: 'Last Name' },
            { name: 'email', placeholder: 'Email Address', type: 'email' },
            { name: 'phoneNumber', placeholder: 'Phone Number', type: 'tel' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
          ].map(({ name, placeholder, type = 'text' }) => (
            <div key={name}>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md bg-white/20 text-white placeholder-white/60 border border-white/30 focus:ring-2 focus:ring-white/40 text-sm"
                placeholder={placeholder}
              />
              {errors[name] && <p className="text-red-300 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDriver"
              checked={formData.isDriver}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-white text-sm">Register as driver</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-md transition"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-2 rounded text-xs text-center ${
            message.includes('successful')
              ? 'bg-green-600/20 text-green-100 border border-green-400/30'
              : 'bg-red-600/20 text-red-100 border border-red-400/30'
          }`}>
            {message}
          </div>
        )}

        <p className="mt-4 text-white/80 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
