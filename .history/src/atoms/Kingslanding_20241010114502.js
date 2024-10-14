// Kingslanding.js
import React, { useContext, useEffect } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";
import Recents from "./Recents.js"
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../logic/AuthContext";

function Kingslanding() {
  const { userObject } = useContext(AuthContext);


  useEffect(() => {
    if (userObject) {
      navigate('/dash');
    }
  }, [userObject, navigate]);


  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom />
        {/* Pass events array to AllEventsAtom */}
        <Recents/>
        <Footer />
      </div>
    </div>
  );
}

export default Kingslanding;
