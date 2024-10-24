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
      {/* on desktop i want this side shld scroll  */}
      {/* they shld all scrll as one page on */}
      <div className='inner-form'>

        </div>
      

        
      </div>
   {/* and this not to scroll */}
   <div className='form-left-side register_page'>
    <div className='spacer'>
    <Link to="/">
        <p className='backhme2'><span><ArrowLeftOutlined style={{marginRight: ".5rem",}} /></span>Back Home</p>
        </Link>
    </div>
    <div className='qoutes_layout'>
      <Quotes/>
    </div>
   </div>
      
    </div>
  );
}


export default Regesiter