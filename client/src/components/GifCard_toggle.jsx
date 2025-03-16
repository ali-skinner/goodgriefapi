// src/components/GifCard.js
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

function GifCard({ gif, toggleFavorite = null }) {
  const { isFavorite, toggleFavorite: contextToggleFavorite } = useFavorites();
  
  const handleToggleFavorite = () => {
    if (toggleFavorite) {
      toggleFavorite(gif);
    } else {
      contextToggleFavorite(gif);
    }
  };

  if (gif == null) return <div>Please wait....</div>

  return (
    <div className="gif-card">
      <img src={gif?.images.fixed_height.url ?? ""} alt={gif.title} />
      <div className="gif-card-info">
        <h3>{gif.title}</h3>
        <button 
          className={`favorite-btn ${isFavorite(gif.id) ? 'favorite' : ''}`}
          onClick={handleToggleFavorite}
        >
          {isFavorite(gif.id) ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  );
}

export default GifCard;