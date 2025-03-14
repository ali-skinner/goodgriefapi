import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';

// Create user context
const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

function App() {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser('');
  };

  return (
    <UserContext.Provider 
      value={{
        user, 
        setUser, 
        isAuthenticated,
        handleLogin,
        handleLogout
      }}
    >
      <FavoritesProvider>
        <Router>
          {isAuthenticated && <Navbar onLogout={handleLogout} />}
          <Routes>
            <Route 
              path="/" 
              element={!isAuthenticated ? <LoginPage /> : <Navigate to="/search" />} 
            />
            <Route 
              path="/search" 
              element={isAuthenticated ? <SearchPage /> : <Navigate to="/" />} 
            />
            <Route 
              path="/favorites" 
              element={isAuthenticated ? <FavoritesPage /> : <Navigate to="/" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </FavoritesProvider>
    </UserContext.Provider>
  );
}

export default App;