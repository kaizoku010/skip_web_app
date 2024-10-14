import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from '../atoms/Kingslanding';
import EventDetails from '../atoms/EventDetails';
import EventForm from '../atoms/EventForm';
import Regesiter from '../atoms/Regesiter';
import SKipDash from '../atoms/SKipDash';
import Login from '../atoms/Login';
import ProtectedRoute from '../components/ProtectedRoute'; // Import ProtectedRoute component

function AminatedRoutes() {
  const location = useLocation();
  
  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="login" element={<EventForm />} />
          <Route path="register" element={<Regesiter />} />
          {/* Wrap the dashboard path with the ProtectedRoute component */}
          <Route
            path="dash"
            element={
              <ProtectedRoute>
                <SKipDash />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AminatedRoutes;
