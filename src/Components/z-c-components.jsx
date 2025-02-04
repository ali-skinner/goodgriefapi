clauds components

// components/Navigation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Giphy App</h1>
        <div className="space-x-4">
          <Link to="/search" className="hover:text-blue-200">Search</Link>
          <Link to="/favorites" className="hover:text-blue-200">Favorites</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

// pages/LoginPage.jsx
import React, { useState } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

// pages/SearchPage.jsx
import React from 'react';
import GiphySearch from './GiphySearchPage';

const SearchPage = ({ onAddFavorite }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Search Gifs</h2>
      <GiphySearch onAddFavorite={onAddFavorite} />
    </div>
  );
};

export default SearchPage;

// pages/FavoritesPage.jsx
import React from 'react';

const FavoritesPage = ({ favorites }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
      <div className="grid grid-cols-3 gap-4">
        {favorites.map((gif) => (
          <div key={gif.id} className="border rounded overflow-hidden">
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;