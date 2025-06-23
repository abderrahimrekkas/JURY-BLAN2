import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
 const [formData, setFormData] = useState({
  startPoint: '',
  wayPoints: '', // Keep as string for form input
  destination: '',
  maxDimensions: { length: 0, width: 0, height: 0 },
  packageTypes: '', // Keep as string for form input
  availableCapacity: 0,
  startDate: '',
});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Fetch all announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8000/api/announcements/getall', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setAnnouncements(res.data);
        setMessage('');
      } catch (error) {
        console.error('Error fetching announcements:', error.response?.data || error.message);
        setMessage('Failed to load announcements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (['length', 'width', 'height'].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        maxDimensions: { ...prev.maxDimensions, [name]: Number(value) },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!token) {
    return navigate('/login');
  }

  try {
    setLoading(true);
    
    // Prepare the data with proper array transformations
    const submissionData = {
      startPoint: formData.startPoint,
      destination: formData.destination,
      // Transform waypoints - handle empty string case and use consistent naming
      waypoints: formData.wayPoints 
        ? formData.wayPoints.split(',').map(point => point.trim()).filter(point => point.length > 0)
        : [],
      // Transform package types - handle empty string case
      packageTypes: formData.packageTypes
        ? formData.packageTypes.split(',').map(pkg => pkg.trim()).filter(pkg => pkg.length > 0)
        : [],
      maxDimensions: formData.maxDimensions,
      availableCapacity: Number(formData.availableCapacity),
      startDate: formData.startDate
    };

    console.log('Submitting:', submissionData); // Debug log

    await axios.post(
      'http://localhost:8000/api/announcements/create',
      submissionData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setMessage('Announcement posted successfully! 🎉');
    setFormVisible(false);
    
    // Reset form
    setFormData({
      startPoint: '',
      wayPoints: '',
      destination: '',
      maxDimensions: { length: 0, width: 0, height: 0 },
      packageTypes: '',
      availableCapacity: 0,
      startDate: '',
    });
    
    // Refresh announcements
    const res = await axios.get('http://localhost:8000/api/announcements/getall', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAnnouncements(res.data);
  } catch (error) {
    console.error('Submission error:', error.response?.data || error.message);
    setMessage(error.response?.data?.error || 'Error creating announcement');
  } finally {
    setLoading(false);
  }
};

  // Helper function to safely display arrays
  const displayArray = (arr, fallback = 'Not specified') => {
    if (!arr) return fallback;
    if (Array.isArray(arr)) {
      return arr.length > 0 ? arr.join(', ') : fallback;
    }
    if (typeof arr === 'string') {
      return arr.trim() !== '' ? arr : fallback;
    }
    return fallback;
  };

  if (loading && announcements.length === 0) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading announcements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        {/* Primary floating orbs */}
        <div className="absolute top-16 left-16 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-16 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-75"></div>
        <div className="absolute -bottom-8 left-24 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-violet-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-150"></div>
        
        {/* Secondary floating particles */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-teal-400/10 to-cyan-500/10 rounded-full filter blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 bg-gradient-to-r from-rose-400/10 to-pink-500/10 rounded-full filter blur-2xl animate-bounce delay-200"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/3 w-6 h-6 bg-blue-400/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 left-1/5 w-4 h-4 bg-purple-400/40 rounded-full animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-pink-400/50 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/3 w-5 h-5 bg-cyan-400/30 rounded-full animate-float"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-purple-500/5 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 pt-24">
        <div className="w-full max-w-4xl">
          {/* Enhanced Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mb-6 shadow-2xl ring-4 ring-white/20 backdrop-blur-sm">
              <span className="text-3xl">📢</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-3 drop-shadow-2xl">
              Announcements
            </h1>
            <p className="text-white/80 text-xl font-medium">Find or post transportation opportunities</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Announcements Container */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/25 to-white/10 rounded-3xl p-10 shadow-2xl border border-white/30 ring-1 ring-white/20">
            {/* Header with toggle button */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                  📦
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Transport Opportunities</h2>
                  <p className="text-white/70">{announcements.length} active announcements</p>
                </div>
              </div>
              
              {token && (
                <button
                  onClick={() => setFormVisible(!formVisible)}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-blue-400/30 hover:border-blue-300/50 shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                  <span className="flex items-center">
                    <span className="mr-2 group-hover:scale-110 transition-transform duration-300">
                      {formVisible ? '❌' : '➕'}
                    </span>
                    {formVisible ? 'Cancel' : 'Post Announcement'}
                  </span>
                </button>
              )}
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-xl text-center text-sm border backdrop-blur-sm ${
                message.includes('successfully') || message.includes('🎉')
                  ? 'bg-green-500/20 text-green-100 border-green-400/30 shadow-green-500/20' 
                  : 'bg-red-500/20 text-red-100 border-red-400/30 shadow-red-500/20'
              } shadow-lg`}>
                <div className="flex items-center justify-center">
                  <span className="font-medium text-base">{message}</span>
                </div>
              </div>
            )}

            {/* Announcement Form */}
            {formVisible && (
              <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Start Point */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Start Point
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="startPoint"
                        value={formData.startPoint}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="Where are you starting from?"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Destination
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="Where are you going to?"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Waypoints */}
                <div className="group">
                  <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                    Waypoints (comma separated)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="wayPoints"
                      value={formData.wayPoints}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                      placeholder="Optional stops along the way (city1, city2)"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Package Types */}
                <div className="group">
                  <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                    Package Types (comma separated)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="packageTypes"
                      value={formData.packageTypes}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                      placeholder="What can you transport? (boxes, furniture, etc)"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Length */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Max Length (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="length"
                        value={formData.maxDimensions.length}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="Length"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Width */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Max Width (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="width"
                        value={formData.maxDimensions.width}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="Width"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Max Height (cm)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="height"
                        value={formData.maxDimensions.height}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="Height"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Capacity and Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Available Capacity */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Available Capacity (kg)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="availableCapacity"
                        value={formData.availableCapacity}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        placeholder="How much can you carry?"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="group">
                    <label className="block text-white/90 text-sm font-semibold mb-3 tracking-wide">
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/15 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/20 group-hover:border-white/40"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-green-400/30 hover:border-green-300/50 disabled:cursor-not-allowed shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-1 hover:scale-[1.02] disabled:transform-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 group-hover:from-white/10 group-hover:to-white/5 transition-all duration-300"></div>
                    <div className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          <span className="text-lg">Posting...</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300">📢</span>
                          <span className="text-lg">Post Announcement</span>
                        </>
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormVisible(false)}
                    disabled={loading}
                    className="flex-1 group bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-400 hover:to-gray-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 backdrop-blur-sm border border-gray-400/30 hover:border-gray-300/50 shadow-lg hover:shadow-gray-500/25 transform hover:-translate-y-1"
                  >
                    <span className="flex items-center justify-center">
                      <span className="mr-3 text-xl group-hover:scale-110 transition-transform duration-300">❌</span>
                      <span className="text-lg">Cancel</span>
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* Announcements List */}
            <div className="grid md:grid-cols-2 gap-6">
              {announcements.length > 0 ? (
                announcements.map((announce) => (
                  <div key={announce._id} className="group backdrop-blur-sm bg-gradient-to-br from-white/15 to-white/10 p-6 rounded-2xl shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/20">
                    <h2 className="text-xl font-bold text-white mb-2">
                      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        {announce.startPoint} ➜ {announce.destination}
                      </span>
                    </h2>
                    <p className="text-sm text-white/80 mb-1">
                      <strong>📅 Date:</strong> {new Date(announce.startDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-sm text-white/80 mb-1">
                      <strong>📍 Waypoints:</strong> {displayArray(announce.waypoints, 'None')}
                    </p>
                    <p className="text-sm text-white/80 mb-1">
                      <strong>📦 Package Types:</strong> {displayArray(announce.packageTypes)}
                    </p>
                    <p className="text-sm text-white/80 mb-1">
                      <strong>⚖️ Capacity:</strong> {announce.availableCapacity} kg
                    </p>
                    <p className="text-sm text-white/80">
                      <strong>📏 Max Dimensions:</strong> {announce.maxDimensions?.length || 0}cm × {announce.maxDimensions?.width || 0}cm × {announce.maxDimensions?.height || 0}cm
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs text-white/60">
                        Posted by: {
                          announce.driver 
                            ? `${announce.driver.firstName || ''} ${announce.driver.lastName || ''}`.trim() || 'Anonymous'
                            : 'Anonymous'
                        }
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center py-10">
                  <p className="text-white/70 text-lg">No announcements found. Be the first to post one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(90deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Announcement;