import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import EventsContext from '../logic/DataPoint';
import { Link, useParams } from 'react-router-dom';
import Login from './Login';
import MXForm from './MXForm';
import "./regesiter.css"
import {
  ArrowLeftOutlined 
} from '@ant-design/icons';

import Quotes from "./Quotes.js"



function Regesiter() {
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  return (
    <div className='evt-form'>
      {/* this side shld scroll on shld scroll on mobile */}
      <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
          
        )}

        {/* Form Side */}
  
      

        
      </div>
   
   <div className='form-left-side register_page'>
    <span className='spacer'></span>
    <div className='qoutes_layout'>
      <Quotes/>
    </div>
   </div>
      
    </div>
  );
}


export default Regesiter