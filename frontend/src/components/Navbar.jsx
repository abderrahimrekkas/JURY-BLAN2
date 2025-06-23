import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('authToken');
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-pink-500/30 via-rose-400/30 to-fuchsia-500/30 backdrop-blur-md border-b border-pink-300/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to={isLoggedIn && token ? "/home" : "/"} 
              className="text-2xl font-bold text-white hover:text-pink-100 transition duration-300 drop-shadow-md"
            >
              Transport<span className="text-pink-200">Connect</span>
            </Link>
          </div>
          
          {/* Navigation Links */}
          {isLoggedIn && token ? (
            // Authenticated Navigation
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/home" 
                className={`text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20 ${
                  location.pathname === '/home' ? 'bg-pink-400/30 text-white' : ''
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/Announcement" 
                className={`text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20 ${
                  location.pathname === '/' ? 'bg-pink-400/30 text-white' : ''
                }`}
              >
                Announcements
              </Link>
              <Link 
                to="/profile" 
                className={`text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20 ${
                  location.pathname === '/profile' ? 'bg-pink-400/30 text-white' : ''
                }`}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-pink-500/40 hover:bg-pink-400/50 text-white px-4 py-2 rounded-lg transition duration-300 backdrop-blur-sm border border-pink-300/40 hover:border-pink-200/60 font-medium shadow-md"
              >
                Logout
              </button>
            </div>
          ) : (
            // Public Navigation
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20 ${
                  location.pathname === '/' ? 'bg-pink-400/30 text-white' : ''
                }`}
              >
                Home
              </Link>
              <a 
                href="#features" 
                className="text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20"
              >
                Features
              </a>
              <a 
                href="#about" 
                className="text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20"
              >
                About
              </a>
              <Link 
                to="/login" 
                className="text-white/90 hover:text-white transition duration-300 font-medium px-3 py-2 rounded-lg hover:bg-pink-400/20"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-pink-500/40 hover:bg-pink-400/50 text-white px-4 py-2 rounded-lg transition duration-300 backdrop-blur-sm border border-pink-300/40 hover:border-pink-200/60 font-medium shadow-md"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white/90 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (you can expand this later) */}
      {(isLoggedIn && token) && (
        <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
          <div className="backdrop-blur-md bg-pink-500/30 rounded-2xl p-4 shadow-2xl border border-pink-300/40">
            <div className="flex justify-around">
              <Link 
                to="/home" 
                className="text-white/90 hover:text-white transition duration-200 text-center flex flex-col items-center"
              >
                <span className="text-lg mb-1">🏠</span>
                <div className="text-xs font-medium">Dashboard</div>
              </Link>
              <Link 
                to="/Announcement" 
                className="text-white/90 hover:text-white transition duration-200 text-center flex flex-col items-center"
              >
                <span className="text-lg mb-1"></span>
                <div className="text-xs font-medium">Announces</div>
              </Link>
              <Link 
                to="/profile" 
                className="text-white/90 hover:text-white transition duration-200 text-center flex flex-col items-center"
              >
                <span className="text-lg mb-1">👤</span>
                <div className="text-xs font-medium">Profile</div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white/90 hover:text-white transition duration-200 text-center flex flex-col items-center"
              >
                <span className="text-lg mb-1">🚪</span>
                <div className="text-xs font-medium">Logout</div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;