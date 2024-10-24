import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import { Link, useParams } from 'react-router-dom';
import Login from './Login';
import Quotes from './Quotes';



function EventForm() {
  const { id } = useParams();
  const [eventPrice, setEventPrice] = useState()
  const [eventName, setEventName] = useState()
  const [awEvent, setAwsEvent] = useState()
  const [eventType, setEventType] = useState();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  


  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccessful(true);
  };


  const path = "/"

  return (
    <div className='evt-form'>
   <div className='form-left-side'>
    <span className='spacer'></span>
    <div style={{display:"flex", jus,flexDirection:"column"}}>
    <Link to={`${path}`} className='breadcrumb'>Home / Login</Link>

      <Quotes color={"white"}/>
    </div>
   </div>
   
      <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
        )}

        {/* Form Side */}
        <div className='form-side'>
          <div className='form-side-holder'>         
            {/* <MXForm
            price={eventPrice}
            eventName={eventName}
            type_={eventType}
            id={id} onRegistrationSuccess={handleRegistrationSuccess} /> 
             */}

             <Login/>
             {/* Pass the callback as a prop */}
          </div>
        </div>

        
      </div>
   
   
    </div>
  );
}


export default EventForm