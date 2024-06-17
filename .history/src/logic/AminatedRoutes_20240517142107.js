import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import WelcomeScreen from "../screens/WelcomeScreen";
import {AnimatePresence, motion} from 'framer-motion'
import MoxiEmbedd from "../atoms/MoxiEmbedd";
import MXForm from "../atoms/MXForm";
import Landing from Kingslanding 
import Kingslanding from "../atoms/Kingslanding";

function AminatedRoutes() {
 const location = useLocation();
  return (
    <div>
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
             <Route path="/" element={<MXForm />} />
        </Routes>
        </AnimatePresence>
    </div>
  );
}

export default AminatedRoutes;
