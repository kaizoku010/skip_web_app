import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "../atoms/Kingslanding";
import EventDetails from "../atoms/EventDetails";
import EventForm from "../atoms/EventForm";
import Regesiter from "../atoms/Regesiter";
import SKipDash from "../atoms/SKipDash";
import { AuthContext } from "../logic/AuthContext"; // Make sure the path to AuthProvider is correct
import PrivateRoute from "./PrivateRoutes";
import UserDetailsBar from "../atoms/UserDetailsBar";
import CurrentEvent from "../atoms/CurrentEvent";
import UserContent  from "../atoms/UserContent";


function AminatedRoutes() {
  const location = useLocation();
   const {user, events} = useContext(AuthContext); // Get the user from AuthContext

  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="login" element={<EventForm />} />
          <Route path="register" element={<Regesiter />} />
          <Route path="/dash" element={<SKipDash />} />
        <Route path="/userdetails" element={<UserDetailsBar user={user} />} />
        <Route path="/currentevent" element={<CurrentEvent events={events} user={user} />} />
        <Route path="/content" element={<UserContent user={user} events={events} />} />
          <Route
            path="dash"
            element={
              <PrivateRoute>
                <SKipDash />
              </PrivateRoute>
            }
      
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AminatedRoutes;
