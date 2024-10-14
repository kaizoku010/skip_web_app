// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../logic/'; // Make sure the path to AuthProvider is correct

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the children components (protected routes)
  return children;
};

export default PrivateRoute;
