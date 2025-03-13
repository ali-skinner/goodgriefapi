import { useState } from "react";
import useSearch from "./SearchHook_useSearch";

export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const { 
        results, 
        loading, 
        error, 
        searchGiphy, 
        favorites, 
        toggleFavorite, 
        isFavorite 
    } = useSearch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            searchGiphy(query);
        }
    };

    return (
        <>
            <div className="navigation">
                <h1>Giphy Search</h1>
                <button onClick={() => window.location.href = '/favorites'}>
                    My Favorites ({favorites.length})
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="search-query">Search Query</label>
                <input
                    type="text"
                    placeholder="Search for GIFS!"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    name="search-query"
                    id="search-query"
                />
                <button type="submit" name="submit-search-button" id="submit-search-button">
                    Submit Search
                </button>
            </form>

            {loading && <p>Loading gifs...</p>}
            {error && <p>{error}</p>}

            <div className="gif-container">
                {results.map((gif) => ( 
                    <div key={gif.id} className="gif-item">
                        <img
                            src={gif.images.fixed_height.url}
                            alt={gif.title}
                        />
                        <button 
                            onClick={() => toggleFavorite(gif)}
                            className={isFavorite(gif.id) ? "favorite active" : "favorite"}
                        >
                            {isFavorite(gif.id) ? "Remove from Favorites" : "Add to Favorites"}
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}