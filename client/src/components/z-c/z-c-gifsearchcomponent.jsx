import React, { useState } from 'react';
import { Search } from 'lucide-react';

const GiphySearch = ({ onAddFavorite }) => {
  const [search, setSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Replace this with your actual Giphy API key
  const API_KEY = 'YOUR_API_KEY';

  const searchGifs = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=9`
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Giphy Search App</h1>

      <form onSubmit={searchGifs} className="flex gap-2 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for GIFs..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Search size={20} />
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      <div className="grid grid-cols-3 gap-4">
        {gifs.map((gif) => (
          <div key={gif.id} className="border rounded overflow-hidden">
            <img
              src={gif.images.fixed_height.url}
              alt={gif.title}
              className="w-full h-48 object-cover"
            />
            <button
              onClick={() => onAddFavorite(gif)}
              className="w-full bg-blue-500 text-white py-1 hover:bg-blue-600"
            >
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GiphySearch;