import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context for authentication
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // Load user from localStorage if available when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem('user_data');
    const savedToken = localStorage.getItem('auth_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser)); // Restore user state
    }
  }, []);



  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://skip-api-1gup.onrender.com/get_all_events');
        setEvents(response.data); // Save the events data to state
      } catch (err) {
        setError('Failed to load events');
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('https://skip-api-1gup.onrender.com/auth/login', { email, password });
      const { token, user } = response.data;

      // Store user and token in state
      setUser(user);

      // Save user and token to localStorage for persistence
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_data', JSON.stringify(user));

      return true; // Login was successful
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      return false; // Return false indicating login failure
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  };

  const checkoutJob = async()

  return (
    <AuthContext.Provider value={{ events, user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
