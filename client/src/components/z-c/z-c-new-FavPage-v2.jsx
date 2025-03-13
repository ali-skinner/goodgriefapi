import { useState } from "react";
import useSearch from "./SearchHook_useSearch";

export default function FavoritesPage() {
    const { favorites, toggleFavorite } = useSearch();

    return (
        <>
            <div className="navigation">
                <h1>My Favorite GIFs</h1>
                <button onClick={() => window.location.href = '/'}>
                    Back to Search
                </button>
            </div>

            {favorites.length === 0 ? (
                <p>You haven't added any favorites yet.</p>
            ) : (
                <div className="gif-container">
                    {favorites.map((gif) => (
                        <div key={gif.id} className="gif-item">
                            <img
                                src={gif.images.fixed_height.url}
                                alt={gif.title}
                            />
                            <button 
                                onClick={() => toggleFavorite(gif)}
                                className="favorite active"
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}