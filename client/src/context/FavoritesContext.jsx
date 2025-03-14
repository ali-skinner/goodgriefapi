// src/context/FavoritesContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FavoritesContext = createContext(null);

// Create the provider component
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite function (add if not exists, remove if exists)
  const toggleFavorite = (gif) => {
    setFavorites(prevFavorites => {
      // Check if gif is already in favorites
      const existingIndex = prevFavorites.findIndex(item => item.id === gif.id);
      
      if (existingIndex >= 0) {
        // Remove from favorites
        return prevFavorites.filter(item => item.id !== gif.id);
      } else {
        // Add to favorites
        return [...prevFavorites, gif];
      }
    });
  };

  // Check if a gif is in favorites
  const isFavorite = (gifId) => {
    return favorites.some(gif => gif.id === gifId);
  };

  // The value that will be provided to consumers of this context
  const value = {
    favorites,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
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