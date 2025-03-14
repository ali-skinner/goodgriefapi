// src/context/FavoritesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';

// Hardcoded favorites for testing
const hardcodedFavorites = {
  'test1': [
    {
      id: "xT0xeJpnvWIYk5iBJC",
      title: "Excited Cat",
      images: {
        fixed_height: {
          url: "https://media.giphy.com/media/xT0xeJpnvWIYk5iBJC/200.gif"
        }
      }
    },
    {
      id: "ICOgUNjpvO0PC",
      title: "Happy Dog",
      images: {
        fixed_height: {
          url: "https://media.giphy.com/media/ICOgUNjpvO0PC/200.gif"
        }
      }
    }
  ],
  'test2': [
    {
      id: "l0MYJnJQ4EiYLxvQ4",
      title: "Funny Dance",
      images: {
        fixed_height: {
          url: "https://media.giphy.com/media/l0MYJnJQ4EiYLxvQ4/200.gif"
        }
      }
    }
  ],
  'admin': []
};

// Create the context
const FavoritesContext = createContext(null);

// Create the provider component
export function FavoritesProvider({ children }) {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  // Load favorites based on the current user
  useEffect(() => {
    if (user) {
      // First check if we have hardcoded favorites for this user
      if (hardcodedFavorites[user]) {
        setFavorites(hardcodedFavorites[user]);
      } else {
        // If not, try to load from localStorage
        const storedFavorites = localStorage.getItem(`favorites_${user}`);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        } else {
          // If no stored favorites, start with an empty array
          setFavorites([]);
        }
      }
    } else {
      // If no user is logged in, clear favorites
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  // Toggle favorite function
  const toggleFavorite = (gif) => {
    setFavorites(prevFavorites => {
      const existingIndex = prevFavorites.findIndex(item => item.id === gif.id);
      
      if (existingIndex >= 0) {
        return prevFavorites.filter(item => item.id !== gif.id);
      } else {
        return [...prevFavorites, gif];
      }
    });
  };

  // Check if a gif is in favorites
  const isFavorite = (gifId) => {
    return favorites.some(gif => gif.id === gifId);
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorite,
      hardcodedFavorites // Include for testing purposes
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Custom hook to use the favorites context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}