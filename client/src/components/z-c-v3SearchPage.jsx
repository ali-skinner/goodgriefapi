import React, { useState } from 'react';
import { useUser } from '../App'; // For user context
import { useFavorites } from '../context/FavoritesContext'; // For favorites context
import GifCard from './GifCard_toggle';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites(); // Use the favorites context

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=YOUR_API_KEY&q=${searchTerm}&limit=20`
      );
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error searching Giphy:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Giphy</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for GIFs..."
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      <div className="gif-grid">
        {searchResults.map(gif => (
          <div key={gif.id} className="gif-card">
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <div className="gif-info">
              <button 
                onClick={() => toggleFavorite(gif)}
                className={isFavorite(gif.id) ? 'favorited' : ''}
              >
                {isFavorite(gif.id) ? '❤️ Remove from favorites' : '🤍 Add to favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;