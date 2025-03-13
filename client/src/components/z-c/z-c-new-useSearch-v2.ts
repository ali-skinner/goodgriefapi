function useSearch() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState(() => {
        // Initialize favorites from localStorage
        const savedFavorites = localStorage.getItem('giphyFavorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

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

    const toggleFavorite = (gif) => {
        setFavorites(prevFavorites => {
            // Check if this GIF is already in favorites
            const existingIndex = prevFavorites.findIndex(fav => fav.id === gif.id);
            
            let newFavorites;
            if (existingIndex >= 0) {
                // Remove from favorites if already there
                newFavorites = prevFavorites.filter(fav => fav.id !== gif.id);
            } else {
                // Add to favorites if not there
                newFavorites = [...prevFavorites, gif];
            }
            
            // Save to localStorage
            localStorage.setItem('giphyFavorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const isFavorite = (gifId) => {
        return favorites.some(fav => fav.id === gifId);
    };

    return { 
        results, 
        loading, 
        error, 
        searchGiphy, 
        favorites, 
        toggleFavorite, 
        isFavorite 
    };
};