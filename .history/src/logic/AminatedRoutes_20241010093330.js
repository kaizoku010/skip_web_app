import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import WelcomeScreen from "../screens/WelcomeScreen";
import {AnimatePresence, motion} from 'framer-motion'
import MoxiEmbedd from "../atoms/MoxiEmbedd";
import MXForm from "../atoms/MXForm"; 
import Landing from "../atoms/Kingslanding";
import EventDetails from "../atoms/EventDetails";
import EventForm from "../atoms/EventForm";
import Regesiter from "../atoms/Regesiter";
import SKipDash from "../atoms/SKipDash";
import { AuthContext } from '../logic/AuthContext'; // Make sure the path to AuthProvider is correct


function AminatedRoutes() {
 const location = useLocation();
  return (
    <div>
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
             <Route path="/" element={<Landing/>} />
             <Route path="event-details/:id" element={<EventDetails/>} />
             <Route path="login" element={<EventForm/>} />
             <Route path="register" element={<Regesiter/>} />
            <Route path="dash" element={<SKipDash/>}/>
        </Routes>
        </AnimatePresence>
    </div>
  );
}

export default AminatedRoutes;