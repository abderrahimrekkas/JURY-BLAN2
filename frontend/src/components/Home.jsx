import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-pink-300/10 to-purple-300/10 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-indigo-300/10 to-blue-300/10 rounded-full mix-blend-multiply filter blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full mix-blend-multiply filter blur-xl animate-float-slow"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-pink-300/30 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-300/40 rounded-full animate-bounce delay-200"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mb-6 shadow-lg">
              <span className="text-4xl">🚚</span>
            </div>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            TransportConnect
          </h1>
          <p className="text-white/90 text-2xl leading-relaxed max-w-3xl mx-auto mb-12">
            Professional freight transport platform connecting shippers, carriers, and logistics providers
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 backdrop-blur-sm border border-pink-300/40 hover:border-pink-200/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 group"
            >
              <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">🚚</span>
              <span>Get Started</span>
            </Link>
            
            <Link
              to="/login"
              className="inline-flex items-center px-10 py-4 backdrop-blur-xl bg-white/10 text-white font-bold text-xl rounded-2xl transition-all duration-300 border border-white/20 hover:border-white/40 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 group"
            >
              <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">👋</span>
              <span>Sign In</span>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="text-5xl mb-6">🛡️</div>
            <h3 className="text-2xl font-bold text-white mb-4">Secure Logistics</h3>
            <p className="text-white/90 leading-relaxed">
              All carriers are verified and insured. Track your cargo with real-time monitoring and security protocols.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="text-5xl mb-6">📦</div>
            <h3 className="text-2xl font-bold text-white mb-4">Freight Management</h3>
            <p className="text-white/90 leading-relaxed">
              Comprehensive cargo handling from pickup to delivery with documentation and customs support.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div className="text-5xl mb-6">📊</div>
            <h3 className="text-2xl font-bold text-white mb-4">Analytics & Reports</h3>
            <p className="text-white/90 leading-relaxed">
              Advanced logistics analytics with route optimization and cost analysis for better decision making.
            </p>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-white/15 to-white/5 rounded-3xl p-12 shadow-2xl border border-white/20 mb-16">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Shippers */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3 text-3xl">📦</span>
                For Shippers
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Create Shipment</h4>
                    <p className="text-white/80">Post your cargo details, pickup location, and delivery requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Choose Carrier</h4>
                    <p className="text-white/80">Review proposals from verified carriers and select the best offer.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Track & Deliver</h4>
                    <p className="text-white/80">Monitor your shipment in real-time until safe delivery.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Carriers */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="mr-3 text-3xl">🚚</span>
                For Carriers
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">1</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Register Fleet</h4>
                    <p className="text-white/80">Verify your vehicles, drivers, and insurance documentation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">2</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Bid on Loads</h4>
                    <p className="text-white/80">Browse available shipments and submit competitive proposals.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-4 mt-1">3</div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Transport & Earn</h4>
                    <p className="text-white/80">Execute shipments efficiently and build your reputation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">2500+</div>
            <div className="text-white/80 font-medium">Active Shippers</div>
          </div>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">800+</div>
            <div className="text-white/80 font-medium">Verified Carriers</div>
          </div>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">50k+</div>
            <div className="text-white/80 font-medium">Completed Shipments</div>
          </div>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/15 to-white/5 rounded-3xl p-8 shadow-2xl border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-white/80 font-medium">On-Time Delivery</div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="backdrop-blur-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-3xl p-12 shadow-2xl border border-pink-300/20 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Ready to Optimize Your Logistics?</h3>
          <p className="text-white/90 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
            Join thousands of businesses who trust TransportConnect for their freight transportation needs.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xl rounded-2xl transition-all duration-300 backdrop-blur-sm border border-pink-300/40 hover:border-pink-200/60 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 group"
          >
            <span className="mr-3 text-2xl group-hover:scale-110 transition-transform duration-300">🚀</span>
            <span>Join Now - ItS Free</span>
          </Link>
        </div>
      </main>

      {/* Custom animations */}
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

export default LandingPage;