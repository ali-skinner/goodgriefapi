import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { FavoritesProvider } from './context/FavoritesContext';
import LoginPage from './components/LoginPage';
import SearchPage from './components/SearchPage';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <FavoritesProvider>
        <Router>
          <AppContent />
        </Router>
      </FavoritesProvider>
    </UserProvider>
  );
}

// Separate component to use the contexts
function AppContent() {
  const { user, isAuthenticated, handleLogout } = useUser();
  
  return (
    <>
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
    </>
  );
}

export default App;