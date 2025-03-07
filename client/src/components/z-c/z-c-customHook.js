// useGiphySearch.js
import { useState } from 'react';

const useGiphySearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGiphy = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = 'your_giphy_api_key';
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=25`);
      const data = await response.json();
      setResults(data.data);
    } catch (err) {
      setError('Failed to fetch gifs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchGiphy };
};

export default useGiphySearch;