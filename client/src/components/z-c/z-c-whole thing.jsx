import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

// Create a context to store and share user data across components
const UserContext = createContext(null);

// Custom hook to use the user context
const useUser = () => useContext(UserContext);

// Main App component with routing and state management
function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Function to add a gif to favorites
  const addToFavorites = (gif) => {
    setFavorites(prevFavorites => {
      // Check if the gif is already in favorites
      if (!prevFavorites.some(fav => fav.id === gif.id)) {
        return [...prevFavorites, gif];
      }
      return prevFavorites;
    });
  };

  // Function to remove a gif from favorites
  const removeFromFavorites = (gifId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(gif => gif.id !== gifId)
    );
  };

  return (
    <UserContext.Provider value={{ user, setUser, favorites, addToFavorites, removeFromFavorites }}>
      <BrowserRouter>
        <div className="app">
          <header>
            <h1>Giphy Explorer</h1>
            {user && (
              <nav>
                <Link to="/search">Search</Link>
                <Link to="/favorites">My Favorites</Link>
                <button onClick={() => setUser(null)}>Logout</button>
              </nav>
            )}
          </header>

          <main>
            <Routes>
              <Route 
                path="/" 
                element={user ? <Navigate to="/search" /> : <LoginPage />} 
              />
              <Route 
                path="/search" 
                element={user ? <SearchPage /> : <Navigate to="/" />} 
              />
              <Route 
                path="/favorites" 
                element={user ? <FavoritesPage /> : <Navigate to="/" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

// Login Page Component
function LoginPage() {
  const [username, setUsername] = useState('');
  const { setUser } = useUser();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUser({ username: username.trim() });
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

// Search Page Component with GIF search functionality
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, addToFavorites } = useUser();

  const searchGiphy = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API key
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20`
      );
      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError('Failed to fetch gifs: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchGiphy(query);
    }
  };

  return (
    <div className="search-page">
      <h2>Search Gifs</h2>
      <p>Welcome, {user.username}!</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for gifs..."
        />
        <button type="submit">Search</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="results-grid">
        {results.map(gif => (
          <div key={gif.id} className="gif-item">
            <img 
              src={gif.images.fixed_height.url} 
              alt={gif.title} 
            />
            <button onClick={() => addToFavorites(gif)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Favorites Page Component
function FavoritesPage() {
  const { user, favorites, removeFromFavorites } = useUser();
  
  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h2>{user.username}'s Favorites</h2>
        <p>You haven't saved any favorites yet. Go to the search page to find some gifs!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h2>{user.username}'s Favorites</h2>
      <div className="favorites-grid">
        {favorites.map(gif => (
          <div key={gif.id} className="gif-item">
            <img 
              src={gif.images.fixed_height.url} 
              alt={gif.title} 
            />
            <button onClick={() => removeFromFavorites(gif.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;