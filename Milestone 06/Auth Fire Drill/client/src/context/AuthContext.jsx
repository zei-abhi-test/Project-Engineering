import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(null); 

  useEffect(() => {
    // If we have a token but no user object yet, you would typically 
    // fetch the profile data here. For now, this syncs the state.
    if (token && user) {
        setRole(user.role);
    } else if (!token) {
        setUser(null);
        setRole(null);
    }
  }, [token, user]);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data.user);
    setRole(data.user.role);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
