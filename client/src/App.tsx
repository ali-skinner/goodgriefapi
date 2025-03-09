
import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import './App.css';
import SearchPage from './components/SearchPage';
import LoginPage from './components/LoginPage';
import FavoritesPage from './components/FavoritesPage';




function App() {
const [user, setUser] = useState('');
const [favorites, setFavorites] = useState([]);
//const addToFavorites function
//const removeFromFavorites function
//are these functions a toggle? would be nice to remove fav on search page if accidentally click fav button
//do i need to save to local storage?
//can i move these to components? how does this move affect useState? need to call addtoFavs in SearchComp. 


  return (
    <>
      {/* <LoginPage /> */}
      <SearchPage />
      {/* <FavoritesPage /> */}
    </>
  )
}

export default App


// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
