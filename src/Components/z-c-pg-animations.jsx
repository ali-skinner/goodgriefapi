import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

// Wrap each page component with motion
const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const handleLogin = (email, password) => {
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const addToFavorites = (gif) => {
    setFavorites(prev => [...prev, gif]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        {isLoggedIn && <Navigation />}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  !isLoggedIn ? (
                    <AnimatedPage>
                      <LoginPage onLogin={handleLogin} />
                    </AnimatedPage>
                  ) : (
                    <Navigate to="/search" />
                  )
                } 
              />
              <Route 
                path="/search" 
                element={
                  isLoggedIn ? (
                    <AnimatedPage>
                      <SearchPage onAddFavorite={addToFavorites} />
                    </AnimatedPage>
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  isLoggedIn ? (
                    <AnimatedPage>
                      <FavoritesPage favorites={favorites} />
                    </AnimatedPage>
                  ) : (
                    <Navigate to="/" />
                  )
                } 
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;