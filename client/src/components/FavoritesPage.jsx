//add pre-existing favorites for different users that are hard coded into the application. Once you do that, add the following functionality:
// Allow someone to go to: /user/username and based off the username, pull that user's favorites from the pre-built list.
// Strip out any code to different files as needed and think about how you might protect against any errors that might pop up.


import React from "react";
import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
    const { favorites, toggleFavorite, isFavorite } = useFavorites();

    return (
    <div className="">
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet!</p>
      ) : (
        <div className="">
          {favorites.map(gif => (
            <img //check if this should be a <div> or <p> ITS <img>!
              key={gif.id} 
              gif={gif} 
              isFavorite={true}
              toggleFavorite={() => toggleFavorite(gif)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;




