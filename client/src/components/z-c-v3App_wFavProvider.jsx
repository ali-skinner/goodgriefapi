// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <FavoritesProvider>
      <Router>
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route 
            path="/" 
            element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/search" />} 
          />
          <Route 
            path="/search" 
            element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/favorites" 
            element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/" />} 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;