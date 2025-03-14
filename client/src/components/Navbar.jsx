
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">Giphy Explorer</div>
      <div className="nav-links">
        <Link to="/search">Search</Link>
        <Link to="/favorites">Favorites</Link>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;