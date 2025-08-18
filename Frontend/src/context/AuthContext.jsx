// File: src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import React from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw && raw !== 'undefined' ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
const [user, setUser] = useState(getUserFromStorage());  const [token, setToken] = useState(localStorage.getItem('token') || null);

const login = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  setToken(token);
  setUser(user);
  setLoggedIn(true);
};


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setLoggedIn(false);
  };

useEffect(() => {
  const handleStorage = () => {
    const savedUser = localStorage.getItem('user');
    setToken(localStorage.getItem('token'));
    try {
      setUser(savedUser ? JSON.parse(savedUser) : null);
    } catch {
      setUser(null);
    }
    setLoggedIn(!!localStorage.getItem('token'));
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}, []);


  return (
    <AuthContext.Provider value={{ loggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
