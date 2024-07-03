import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import BG from "../assets/formbg.jpg"
import Connect_ from "../assets/connects.png"
import MXForm from './MXForm'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import testBg from "../assets/bg.jpg"



function EventForm() {
  const { events, loading, error } = useContext(EventsContext);
  const { id } = useParams();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  
  const event = events.find(event => event.mdx === id);
  // console.log("first :", event)
  
  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccessful(true);
  };

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
            <MXForm id={id} onRegistrationSuccess={handleRegistrationSuccess} />  {/* Pass the callback as a prop */}
          </div>
        </div>

        {/* Image Side */}
        <div className='image-side'>
          <div style={{ backgroundImage: `url(${event?.eventGraphicsURL || testBg})` }} className='img-box'>
            {/* Event Details Overlay */}
            <div></div>
            <div className='selected-event glassy'>
            <p className='passed-data'>Location:<span className='passed-data2'>{event?.eventLocation || "Loading"}</span></p>
              <p className='passed-data'>Name: <span className='passed-data2'>{event?.eventName || "Loading"}</span></p>
              <p className='passed-data'>Price:<span className='passed-data2'>{event?.eventPrice || "Loading"}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default EventForm