useEffect(() => {
    // Create an AbortController to manage this specific fetch request
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Start loading state
    setIsLoading(true);
    
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchTerm}`, {
      signal: signal // Connect the fetch to our controller
    })
      .then(response => response.json())
      .then(data => {
        if (!signal.aborted) { // Check if request was aborted before updating state
          setSearchResults(data.data);
        }
      })
      .catch(error => {
        // AbortError is expected when we cancel, so don't treat it as an error
        if (error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      });
    
    // Return cleanup function
    return () => {
      controller.abort(); // Cancel the fetch if component unmounts or effect reruns
    };
  }, [searchTerm]); // Run effect when searchTerm changes