import { useState } from "react";
import useSearch from "./SearchHook_useSearch";
import { useFavorites } from "../context/FavoritesContext";
import GifCard from "./z-cV3Toggle_GifCard";


export default function SearchComponent() {
    const [query, setQuery] = useState('');
    const { results, loading, error, searchGiphy } = useSearch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            searchGiphy(query)
        };
    };

return (
    <>
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
        <button type="submit" name="submit-search-button" id="submit-search-button">Submit Search</button>
       </form>

        {loading && <p>Loading gifs...</p>}
        {error && <p>{error}</p>}

        <div>
            {results.map((gif) => ( 
                <GifCard
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt={gif.title}
                //height={gif.images.fixed_height.height} or call it a specific height {number}
                />
            ))}
        </div> 
        <button
        onClick={() => toggleFavorite(gif)}
        className={isFavorite(gif.id) ? 'favorited' : ''}
        >
            {isFavorite(gif.id) ? '❤️ Remove from favorites' : '🤍 Add to favorites'}
        </button>
    </>
    )
}

// Before the return:
    // call useSearch() by creating a new variable and destructure - useSearch should return error, results, loading, and searchGiphy? 
    // set query state
    // handleSubmit function for form onSubmit={handleSubmit}
        
// in the return stmnt:
    // return the the form/submit button; 
     //setQuery onChange in  form text input
     //map results from useSearch
     // {loading === true && (<div>loading...</div>)}
     // {loading === false && <ResultComponent  data={data}/>}