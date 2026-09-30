import React, { createContext, useContext, useState } from 'react';

// Create Authentication Context object
const AuthContext = createContext();

// Custom hook so any component can access auth state easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  // Store user info in React state.
  // check localStorage first so user stays logged in after page refresh.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('movieAppUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authError, setAuthError] = useState(null);

  // Function to handle login with  credentials
  const login = (username, password) => {
    setAuthError(null);

    const isUserValid = username.trim() === 'himashi';
    const isPassValid = password === 'himashi123';

    if (isUserValid && isPassValid) {
      const userData = { username: 'Himashi', name: 'Himashi' };
      setUser(userData);
      localStorage.setItem('movieAppUser', JSON.stringify(userData));
      return { success: true, message: 'Welcome back, Himashi!' };
    } else if (!isUserValid && !isPassValid) {
      const errorMessage = 'Incorrect username and password.';
      setAuthError(errorMessage);
      return { success: false, message: errorMessage };
    } else if (!isUserValid) {
      const errorMessage = 'Incorrect username.';
      setAuthError(errorMessage);
      return { success: false, message: errorMessage };
    } else {
      const errorMessage = 'Incorrect password.';
      setAuthError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  // handle logout
  const logout = () => {
    setUser(null);
    setAuthError(null);
    localStorage.removeItem('movieAppUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        authError,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
