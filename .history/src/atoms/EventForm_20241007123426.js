import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import BG from "../assets/formbg.jpg"
import Connect_ from "../assets/connects.png"
import MXForm from './MXForm'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import testBg from "../assets/bg.jpg"
import Login from './Login';



function EventForm() {
  const { events} = useContext(EventsContext);
  const { id } = useParams();
  const [eventPrice, setEventPrice] = useState()
  const [eventName, setEventName] = useState()
  const [awEvent, setAwsEvent] = useState()
  const [eventType, setEventType] = useState();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  


  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccessful(true);
  };



  useEffect(()=>{
  const event = events.find(event => event.mdx === id);
  setAwsEvent(event)
  setEventPrice(awEvent?.eventPrice);  
  setEventName(awEvent?.eventName)
  setEventType(awEvent?.eventType)
  console.log("event data: ", awEvent)

  }, [awEvent])


  return (
    <div className='evt-form'>
   <div className='form-left-side'></div>
   
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