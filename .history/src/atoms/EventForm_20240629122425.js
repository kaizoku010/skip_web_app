import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import BG from "../assets/formbg.jpg"
import Connect_ from "../assets/connects.png"
import MXForm from './MXForm'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import testBg from "../assets/bg.jpg"



function EventForm() {
  const { events} = useContext(EventsContext);
  const { id } = useParams();
  const [eventPrice, setEventPrice] = useState()
  const [eventName, setEventName] = useState()
  const [aws_event]
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  
  const event = events.find(event => event.mdx === id);
  setEventPrice(event?.eventPrice);  
  setEventName(event?.eventName)

  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccessful(true);
  };



  useEffect(()=>{

  }, [])

  return (
    <div className='evt-form'>
      <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
        )}

        {/* Form Side */}
        <div className='form-side'>
          <div className='form-side-holder'>
            <h2 className='title form-title'>{"Event Registration"}</h2>
            <p className='sub-title'>
              Fill this form to get your e-ticket for {event?.eventName || "the event"}, the form automatically adds the event of choice to your profile, after filling the form, download our Events apps to proceed with your profile.
            </p>
            <MXForm
            price={eventPrice}
            eventName={eventName}
            id={id} onRegistrationSuccess={handleRegistrationSuccess} />  {/* Pass the callback as a prop */}
          </div>
        </div>

        
      </div>
    </div>
  );
}


export default EventForm