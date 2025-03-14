//add pre-existing favorites for different users that are hard coded into the application. Once you do that, add the following functionality:
// Allow someone to go to: /user/username and based off the username, pull that user's favorites from the pre-built list.
// Strip out any code to different files as needed and think about how you might protect against any errors that might pop up.


import React from 'react';
import { useFavorites } from '../context/FavoritesContext'; // Import the favorites context

function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites(); // Use the favorites context

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet!</p>
      ) : (
        <div className="gif-grid">
          {favorites.map(gif => (
            <div key={gif.id} className="gif-card">
              <img 
                src={gif.images?.fixed_height?.url || gif.url} 
                alt={gif.title} 
              />
              <div className="gif-info">
                <button onClick={() => toggleFavorite(gif)}>
                  ❤️ Remove from favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;




