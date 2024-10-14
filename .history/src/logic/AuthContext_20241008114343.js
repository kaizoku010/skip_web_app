
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://skip-api-1gup.onrender.com/auth/login', { email, password });
      const { token } = response.data;

      // Store user and token in state
      setUser({ email, token });

      // Optionally, save token to local storage for persistence
      localStorage.setItem('auth_token', token);

      // Navigate to a protected route (e.g., dashboard)
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
