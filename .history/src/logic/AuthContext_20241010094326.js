import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

  // Function to handle user login
  const login = async (email, password,  rememberMe = false) => {
    setLoading(true);
    try {
      const response = await axios.post('https://skip-api-1gup.onrender.com/auth/login', { email, password });
      const { token } = response.data;

      const loggedInUser = { email, token };
      setUser(loggedInUser);

         // Optionally, save token to local storage for persistence
         if (rememberMe) {
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_email', email);
        } else {
          sessionStorage.setItem('auth_token', token); // For session storage if "Remember Me" is not checked
        }

      // Store user and token in state
      console.log("login response: ", loggedInUser)
      // // Optionally, save token to local storage for persistence
      // localStorage.setItem('auth_token', token);
    return true;

    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      return false; // Return false indicating login failure

    } finally {
      setLoading(false);
    }
  };


    // Auto-login if token is found in localStorage
    useEffect(() => {
      const token = localStorage.getItem('auth_token');
      const email = localStorage.getItem('user_email');
      if (token && email) {
        setUser({ email, token });
      }
    }, []);

  return (
    <AuthContext.Provider value={{ user, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
