import React from "react";
import { useState } from "react";

// 'https://api.giphy.com/v1/gifs/search?api_key=3ZkAsAtjGs6SJgjRttscxEyJ8pq6odBV&q=${query}&limit=10'

function useSearch(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<String|null>(null);

    const searchGiphy = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=3ZkAsAtjGs6SJgjRttscxEyJ8pq6odBV&q=${query}&limit=10`);
            if (response.ok) {
                const jsonDetails = await response.json();
                console.log('Full Giphy response/json:', jsonDetails);
                setResults(jsonDetails.data);
            } else {
                throw response;
            }
        } catch (err) {
            setError(`Failed to display your stuff. Error message: ${err}`);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, error, searchGiphy };
};

export default useSearch;


//api.giphy.com/v1/gifs/trending
//Do not cache API responses -- means what? -- don't store in local storage
//t’s best to use the smaller fixed_height or fixed_width renditions on your preview grid.
//We require all apps that use the GIPHY API to conspicuously display "Powered By GIPHY" attribution marks where the API is utilized 

//do i list the parameters from giphy docs?
// Search Endpoint:
// --> api_key: string(required); q: string(required)
// q =Search query term or phrase. Adding @<username> anywhere in the q parameter effectively changes the search query to be a search for a specific user’s GIFs (user has to be public and verified user by GIPHY.)
// If the q parameter contains one of these words: sticker, stickers, or transparent, the search will return stickers content.
// Maximum length: 50 chars.


// Trending Endpoint:
// --> api_key: string(required); limit: integer (int32); offset: integer (int32); rating: string; [there are more]

//do i need a ref/useRef (.current property) in the useEffect so the giphs stay mounted and the api call doesnt keep calling giph/re-rendering  and showing same pix ovr n ovr = slow and using a ton of memory?