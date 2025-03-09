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