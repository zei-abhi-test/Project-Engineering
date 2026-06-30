import { createContext, useState, useEffect, useContext } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

/**
 * AuthProvider provides the authentication state to the application.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user session from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        // Clear corrupt storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  // Login handles state and persists the session to localStorage
  const login = (userData, fakeToken) => {
    setUser(userData);
    setToken(fakeToken);
    localStorage.setItem("authToken", fakeToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  // Logout clears state and removes data from storage completely
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token, 
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// FIX: Added the missing custom hook export that Navbar.jsx requires!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
