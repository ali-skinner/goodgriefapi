// src/context/UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Define hardcoded users for testing
const hardcodedUsers = [
  { username: 'test1', password: 'password1' },
  { username: 'test2', password: 'password2' },
  { username: 'admin', password: 'admin123' }
];

// Create user context
const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // Check if username and password match a hardcoded user
    const foundUser = hardcodedUsers.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      setUser(username);
      setIsAuthenticated(true);
      return true;
    }
    return false;
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
        handleLogin, //need to pass to Register (when ready for the feature)
        handleLogout,
        hardcodedUsers // Include for testing purposes
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};