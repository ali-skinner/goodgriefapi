//Whole Giphy project - starting with App

import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';

// Create auth context
export const AuthContext = createContext();

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {currentUser && (
            <header className="bg-white shadow-sm">
              <div className="container mx-auto p-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Giphy App</h1>
                <div className="flex items-center">
                  <span className="mr-4">Hello, {currentUser.username}</span>
                  <button 
                    onClick={logout}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </header>
          )}
          
          <main className="container mx-auto py-6">
            <Routes>
              <Route 
                path="/login" 
                element={currentUser ? <Navigate to="/search" /> : <LoginPage login={login} />} 
              />
              <Route 
                path="/search" 
                element={<SearchPage currentUser={currentUser} />} 
              />
              <Route 
                path="/favorites" 
                element={<FavoritesPage currentUser={currentUser} />} 
              />
              <Route 
                path="*" 
                element={<Navigate to={currentUser ? "/search" : "/login"} />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;




//loginPage

import React, { useState } from 'react';

const LoginPage = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    // In a real app, you would validate credentials against a backend
    // For this example, we'll simulate a successful login
    login({
      id: username.toLowerCase(), // Using username as ID for simplicity
      username: username
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Login to Giphy App</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;



//searchPage

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = ({ currentUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // API key - in a real app, you'd want to handle this securely
  const GIPHY_API_KEY = 'YOUR_GIPHY_API_KEY'; 

  useState(() => {
    // Check if user is logged in
    if (!currentUser || !currentUser.id) {
      navigate('/login');
      return;
    }

    // Load favorites for the current user
    loadFavorites();
  }, [currentUser, navigate]);

  const loadFavorites = () => {
    // Get favorites from localStorage based on user ID
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`)) || [];
    setFavorites(userFavorites);
  };

  const searchGifs = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}&limit=20`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error searching Giphy:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorite = (giphyId) => {
    return favorites.some(gif => gif.id === giphyId);
  };

  const toggleFavorite = (gif) => {
    let updatedFavorites = [...favorites];
    
    if (isFavorite(gif.id)) {
      // Remove from favorites
      updatedFavorites = favorites.filter(item => item.id !== gif.id);
    } else {
      // Add to favorites
      updatedFavorites.push(gif);
    }
    
    setFavorites(updatedFavorites);
    
    // Update localStorage
    localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(updatedFavorites));
  };

  const goToFavorites = () => {
    navigate('/favorites');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Search GIFs</h1>
        <button 
          onClick={goToFavorites} 
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded"
        >
          My Favorites ({favorites.length})
        </button>
      </div>

      <form onSubmit={searchGifs} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for GIFs..."
            className="flex-grow border border-gray-300 rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-r"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading results...</p>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map(gif => (
            <div key={gif.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={gif.images.fixed_height.url} 
                alt={gif.title} 
                className="w-full object-cover"
              />
              <div className="p-3">
                <p className="truncate text-sm">{gif.title}</p>
                <button 
                  onClick={() => toggleFavorite(gif)} 
                  className={`mt-2 ${
                    isFavorite(gif.id)
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-green-500 hover:bg-green-600"
                  } text-white text-sm py-1 px-2 rounded`}
                >
                  {isFavorite(gif.id) ? "Remove from favorites" : "Add to favorites"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm && !isLoading ? (
        <div className="text-center py-8">
          <p>No results found for "{searchTerm}"</p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;



//favsPage

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoritesPage = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    if (!currentUser || !currentUser.id) {
      navigate('/login');
      return;
    }

    // Load favorites for the current user
    loadFavorites();
  }, [currentUser, navigate]);

  const loadFavorites = () => {
    setIsLoading(true);
    
    // Get favorites from localStorage based on user ID
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser.id}`)) || [];
    setFavorites(userFavorites);
    setIsLoading(false);
  };

  const removeFavorite = (giphyId) => {
    const updatedFavorites = favorites.filter(gif => gif.id !== giphyId);
    setFavorites(updatedFavorites);
    
    // Update localStorage
    localStorage.setItem(`favorites_${currentUser.id}`, JSON.stringify(updatedFavorites));
  };

  const goToSearch = () => {
    navigate('/search');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Favorite GIFs</h1>
        <div>
          <button 
            onClick={goToSearch} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mr-2"
          >
            Search GIFs
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <p className="text-lg">Loading your favorites...</p>
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg mb-4">You don't have any favorite GIFs yet.</p>
          <button 
            onClick={goToSearch} 
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Find some GIFs to favorite
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map(gif => (
            <div key={gif.id} className="border rounded-lg overflow-hidden shadow-md">
              <img 
                src={gif.images.fixed_height.url} 
                alt={gif.title} 
                className="w-full object-cover"
              />
              <div className="p-3">
                <p className="truncate text-sm">{gif.title}</p>
                <button 
                  onClick={() => removeFavorite(gif.id)} 
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white text-sm py-1 px-2 rounded"
                >
                  Remove from favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;

