import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleLogin = (email, password) => {
    // For demo purposes - replace with real authentication
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const addToFavorites = (gif) => {
    setFavorites(prev => [...prev, gif]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && <Navigation />}
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={!isLoggedIn ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/search" />} 
            />
            <Route 
              path="/search" 
              element={isLoggedIn ? <SearchPage onAddFavorite={addToFavorites} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/favorites" 
              element={isLoggedIn ? <FavoritesPage favorites={favorites} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;