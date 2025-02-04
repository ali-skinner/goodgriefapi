import React from "react";

const API_KEY = "3ZkAsAtjGs6SJgjRttscxEyJ8pq6odBV"
let search = input value from the search box

//https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&limit=10
//api.giphy.com/v1/gifs/trending
//Do not cache API responses -- means what?
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

function GiphySearchPage() {
     
    return(

    );
};

export default GiphySearchPage;