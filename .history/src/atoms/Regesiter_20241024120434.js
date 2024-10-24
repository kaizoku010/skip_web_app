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
         <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
          
        )}

        {/* Form Side */}
        <div style={{display:"flex", flexDirection:"column"}}>
            <div className='create_mobile' style={{textAlign:"left", paddingLeft:"2rem"}}>
        <Link>
        </Link>
           <p className='backhme'><span><ArrowLeftOutlined style={{marginRight: ".5rem",}} /></span>Back Home</p>
           
            <h3>Create Account </h3>
            <p>Start by providing a few details about yourself and a profile image</p>
           
            </div>
          <div className='form-side'>
          <div className='form-side-holder'>         
            <MXForm/> 
          </div>
        </div> 
        </div>
      

        
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