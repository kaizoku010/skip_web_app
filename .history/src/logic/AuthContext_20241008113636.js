// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [token, setToken] = useState(null); // Store JWT token

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, message } = response.data;

      // Store token and user data in state
      setToken(token);
      setUser({ email, isAdmin: response.data.isAdmin }); // Assuming `isAdmin` is part of response

      // Optionally, save token to localStorage for persistence
      localStorage.setItem('auth_token', token);
      console.log(message);
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
    }
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
  };

  // Check for token in local storage when the component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      setToken(savedToken);
      // Ideally, you should verify the token or fetch user data here
      // For example, using a verify token endpoint
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
