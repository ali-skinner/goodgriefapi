
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';


const UserContext = createContext(null);
const useUser = useContext(UserContext);


function App() {
  const [user, setUser] = useState('');
  const [favorites, setFavorites] = useState([]);

  //are these FAV functions toggling? would be nice to remove fav on search page if accidentally click fav button
  //do i need to save to local storage?
  //can i move these to components? how does this move affect useState? need to call addtoFavs in SearchComp. 

  const addToFavorites = (gif) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites.some(fav => fav.id === gif.id)) {
        return [...prevFavorites, gif];
      }
      return prevFavorites;
    });
  };

  const removeFromFavorites = (gifId) => {
    setFavorites(prevFavorites =>
      prevFavorites.filter(gif => gif.id !== gifId)
    );
  }; //why dont i have to return preFavs? and not using the spreader operator to keep track of whts removed? why doesnt removeFavs match addFavs return stmnt?


  return (
    <>
      <UserContext.Provider value={{ user, setUser, favorites, addToFavorites, removeFromFavorites }}>
        <Router>
          <div>
            <header>
              <h1>Giphy Playland</h1>
              {user && (
                <nav>
                  <Link to="/search">Search</Link>
                  <Link to="/favorites">Favorites</Link>
                  <button onClick={()=>setUser(null)}>Logout</button>
                </nav>
              )}
            </header>
            
            <main>

            </main>
          </div>

        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;