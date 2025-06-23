// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Announcement from './components/Announcement';  

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Affichée partout */}

        <Routes>          
         <Route path="/" element={<Home />} />
         <Route path="/Home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Announcement" element={<Announcement/>}/>
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
