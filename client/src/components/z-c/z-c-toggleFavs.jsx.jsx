//favs toggle for searchComponent.
// full app code at end

function SearchPage() {
  // ... existing code ...
  const { user, favorites, addToFavorites, removeFromFavorites } = useUser();

  // Function to check if a gif is already in favorites
  const isInFavorites = (gifId) => {
    return favorites.some(fav => fav.id === gifId);
  };

  // Function to toggle favorite status
  const toggleFavorite = (gif) => {
    if (isInFavorites(gif.id)) {
      removeFromFavorites(gif.id);
    } else {
      addToFavorites(gif);
    }
  };

  return (
    <div className="search-page">
      {/* ... existing code ... */}
      
      <div className="results-grid">
        {results.map(gif => (
          <div key={gif.id} className="gif-item">
            <img 
              src={gif.images.fixed_height.url} 
              alt={gif.title} 
            />
            <button 
              onClick={() => toggleFavorite(gif)}
              className={isInFavorites(gif.id) ? "favorite-active" : "favorite-inactive"}
            >
              {isInFavorites(gif.id) ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


//full app code

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
                <Link to="/favorites">My Favorites ({favorites.length})</Link>
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

// Search Page Component with GIF search functionality and toggle favorites
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, favorites, addToFavorites, removeFromFavorites } = useUser();

  // Function to check if a gif is already in favorites
  const isInFavorites = (gifId) => {
    return favorites.some(fav => fav.id === gifId);
  };

  // Function to toggle favorite status
  const toggleFavorite = (gif) => {
    if (isInFavorites(gif.id)) {
      removeFromFavorites(gif.id);
    } else {
      addToFavorites(gif);
    }
  };

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
            <button 
              onClick={() => toggleFavorite(gif)}
              className={isInFavorites(gif.id) ? "favorite-active" : "favorite-inactive"}
            >
              {isInFavorites(gif.id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
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
            <button 
              onClick={() => removeFromFavorites(gif.id)}
              className="remove-button"
            >
              ❌ Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Optional: Add some basic CSS to style the favorites toggle button
const styles = `
  .favorite-active {
    background-color: #ff3366;
    color: white;
  }

  .favorite-inactive {
    background-color: #f0f0f0;
    color: #333;
  }

  .results-grid, .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 20px;
  }

  .gif-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .gif-item img {
    width: 100%;
    height: auto;
  }

  .gif-item button {
    margin: 8px;
    padding: 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .remove-button {
    background-color: #f0f0f0;
    color: #333;
  }

  nav {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }

  nav a {
    color: #0066cc;
    text-decoration: none;
  }

  nav a:hover {
    text-decoration: underline;
  }
`;

export default App;

//notes fromZ-C


// Here's the updated code with the favorites toggle button implementation:

// ```jsx
// import React, { useState, createContext, useContext } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';

// // Create a context to store and share user data across components
// const UserContext = createContext(null);

// // Custom hook to use the user context
// const useUser = () => useContext(UserContext);

// // Main App component with routing and state management
// function App() {
//   const [user, setUser] = useState(null);
//   const [favorites, setFavorites] = useState([]);

//   // Function to add a gif to favorites
//   const addToFavorites = (gif) => {
//     setFavorites(prevFavorites => {
//       // Check if the gif is already in favorites
//       if (!prevFavorites.some(fav => fav.id === gif.id)) {
//         return [...prevFavorites, gif];
//       }
//       return prevFavorites;
//     });
//   };

//   // Function to remove a gif from favorites
//   const removeFromFavorites = (gifId) => {
//     setFavorites(prevFavorites => 
//       prevFavorites.filter(gif => gif.id !== gifId)
//     );
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, favorites, addToFavorites, removeFromFavorites }}>
//       <BrowserRouter>
//         <div className="app">
//           <header>
//             <h1>Giphy Explorer</h1>
//             {user && (
//               <nav>
//                 <Link to="/search">Search</Link>
//                 <Link to="/favorites">My Favorites ({favorites.length})</Link>
//                 <button onClick={() => setUser(null)}>Logout</button>
//               </nav>
//             )}
//           </header>

//           <main>
//             <Routes>
//               <Route 
//                 path="/" 
//                 element={user ? <Navigate to="/search" /> : <LoginPage />} 
//               />
//               <Route 
//                 path="/search" 
//                 element={user ? <SearchPage /> : <Navigate to="/" />} 
//               />
//               <Route 
//                 path="/favorites" 
//                 element={user ? <FavoritesPage /> : <Navigate to="/" />} 
//               />
//               <Route path="*" element={<Navigate to="/" />} />
//             </Routes>
//           </main>
//         </div>
//       </BrowserRouter>
//     </UserContext.Provider>
//   );
// }

// // Login Page Component
// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const { setUser } = useUser();
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (username.trim()) {
//       setUser({ username: username.trim() });
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Enter your username"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// // Search Page Component with GIF search functionality and toggle favorites
// function SearchPage() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const { user, favorites, addToFavorites, removeFromFavorites } = useUser();

//   // Function to check if a gif is already in favorites
//   const isInFavorites = (gifId) => {
//     return favorites.some(fav => fav.id === gifId);
//   };

//   // Function to toggle favorite status
//   const toggleFavorite = (gif) => {
//     if (isInFavorites(gif.id)) {
//       removeFromFavorites(gif.id);
//     } else {
//       addToFavorites(gif);
//     }
//   };

//   const searchGiphy = async (query) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const apiKey = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API key
//       const response = await fetch(
//         `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=20`
//       );
//       const data = await response.json();
//       setResults(data.data);
//     } catch (err) {
//       setError('Failed to fetch gifs: ' + err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (query.trim()) {
//       searchGiphy(query);
//     }
//   };

//   return (
//     <div className="search-page">
//       <h2>Search Gifs</h2>
//       <p>Welcome, {user.username}!</p>
      
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for gifs..."
//         />
//         <button type="submit">Search</button>
//       </form>
      
//       {loading && <p>Loading...</p>}
//       {error && <p className="error">{error}</p>}
      
//       <div className="results-grid">
//         {results.map(gif => (
//           <div key={gif.id} className="gif-item">
//             <img 
//               src={gif.images.fixed_height.url} 
//               alt={gif.title} 
//             />
//             <button 
//               onClick={() => toggleFavorite(gif)}
//               className={isInFavorites(gif.id) ? "favorite-active" : "favorite-inactive"}
//             >
//               {isInFavorites(gif.id) ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Favorites Page Component
// function FavoritesPage() {
//   const { user, favorites, removeFromFavorites } = useUser();
  
//   if (favorites.length === 0) {
//     return (
//       <div className="favorites-page">
//         <h2>{user.username}'s Favorites</h2>
//         <p>You haven't saved any favorites yet. Go to the search page to find some gifs!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="favorites-page">
//       <h2>{user.username}'s Favorites</h2>
//       <div className="favorites-grid">
//         {favorites.map(gif => (
//           <div key={gif.id} className="gif-item">
//             <img 
//               src={gif.images.fixed_height.url} 
//               alt={gif.title} 
//             />
//             <button 
//               onClick={() => removeFromFavorites(gif.id)}
//               className="remove-button"
//             >
//               ❌ Remove
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Optional: Add some basic CSS to style the favorites toggle button
// const styles = `
//   .favorite-active {
//     background-color: #ff3366;
//     color: white;
//   }

//   .favorite-inactive {
//     background-color: #f0f0f0;
//     color: #333;
//   }

//   .results-grid, .favorites-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
//     gap: 16px;
//     margin-top: 20px;
//   }

//   .gif-item {
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     overflow: hidden;
//     display: flex;
//     flex-direction: column;
//   }

//   .gif-item img {
//     width: 100%;
//     height: auto;
//   }

//   .gif-item button {
//     margin: 8px;
//     padding: 8px;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }

//   .remove-button {
//     background-color: #f0f0f0;
//     color: #333;
//   }

//   nav {
//     display: flex;
//     gap: 16px;
//     margin-bottom: 20px;
//   }

//   nav a {
//     color: #0066cc;
//     text-decoration: none;
//   }

//   nav a:hover {
//     text-decoration: underline;
//   }
// `;

// export default App;

// ```

// The key changes I've made to implement the toggle functionality:

// 1. **In the SearchPage component**:
//    - Added `isInFavorites` function to check if a GIF is already in favorites
//    - Added `toggleFavorite` function to handle both adding and removing GIFs
//    - Updated the button to show different text and styling based on favorite status
//    - Added heart emoji (❤️/🤍) to provide a visual indicator of status

// 2. **In the App component**:
//    - Added a counter to the "My Favorites" navigation link to show how many favorites the user has

// 3. **Visual improvements**:
//    - Added basic CSS styling for the toggle buttons
//    - Changed the button color based on favorite status
//    - Added a grid layout for better visual presentation of GIFs
//    - Styled the navigation and GIF items

// 4. **UX improvements**:
//    - The same button now toggles between adding and removing
//    - Visual feedback makes it clear which GIFs are already favorited
//    - Maintained a separate "Remove" button on the Favorites page for simplicity

// This implementation creates a more intuitive user experience, as users can immediately see which GIFs they've already favorited while searching, and they can easily toggle the favorite status with a single button.

// You can further enhance this by:
// - Adding animations when toggling favorites
// - Using icons instead of emoji (like Font Awesome icons)
// - Adding a confirmation dialog when removing favorites
// - Implementing local storage to persist favorites between sessions

// Would you like me to make any additional changes or explain any part in more detail?
