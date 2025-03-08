// SearchComponent.jsx
import { useState } from 'react';
import useGiphySearch from './useGiphySearch';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const { results, loading, error, searchGiphy } = useGiphySearch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchGiphy(query);
    }
  };

  return (
    <div>
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
      {error && <p>{error}</p>}
      
      <div className="results-container">
        {results.map((gif) => (
          <img 
            key={gif.id} 
            src={gif.images.fixed_height.url} 
            // height={gif.images.fixed_height.height} or call it a specifi height {number}
            alt={gif.title} 
          />
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;