import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import EventsContext from '../logic/DataPoint';
import { Link, useParams } from 'react-router-dom';
import Login from './Login';
import MXForm from './MXForm';
import "./regesiter.css"



function Regesiter() {
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
         <div className='inner-form'>
        {/* Conditionally render success message */}
        {isRegistrationSuccessful && (
          <div className='show-me-we-are-good'>Registration was successful!</div>
        )}

        {/* Form Side */}
        <div style={{display:"flex", flexDirection:"column"}}>
            <p>Start by providigCreate Account </p>
             <div className='form-side'>
          <div className='form-side-holder'>         
            <MXForm
            price={eventPrice}
            eventName={eventName}
            type_={eventType}
            id={id} onRegistrationSuccess={handleRegistrationSuccess} /> 
            

             {/* <Login/> */}
             {/* Pass the callback as a prop */}
          </div>
        </div> 
        </div>
      

        
      </div>
   
   <div className='form-left-side register_page'>
    <span className='spacer'></span>
    <Link to="/login" className='breadcrumb bbc'>Back</Link>
   </div>
      
    </div>
  );
}


export default Regesiter