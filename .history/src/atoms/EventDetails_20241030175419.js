import React, { useContext } from 'react';
import "./EventDetails.css";
import HeaderGlass from './EvenTImageHeader';
import { AuthContext } from "../logic/AuthContext";
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';

import { SlBell } from "react-icons/sl";
import Checkout from './Checkout';
import Payments from './Payments';

function EventDetails() {
  const { events, loading, error } = useContext(AuthContext);
  const { id } = useParams();
  const event = events.find(event => event.eventId === id);
 
 console.log("event receiverd: ", event);
 
  return (

    <div className='event-details-container'>
  <div className="scrollable-div">      
    <div className='event-details-section'>
<div className='eds-chip'>
  <SlBell className="bell-me"/>
  <p className='ticket-status'> {event?.eventStatus}</p>
</div>
<p className='event-date-details'>{event?.eventDate} | {event?.eventTime}</p>
<h1 className='ed-event-name'>{event?.eventName}</h1>
<p className='ed-evnt-desc'>{event?.eventDescription}</p>
<Divider orientation='left' plain>Event Info</Divider>

<div style={{display:"flex"}} className='event-details-chips'>
<p className='ed-evnt-desc'><span className='eded-span'>Host: </span>{event?.eventHost}</p>
<p className='ed-evnt-desc'><span className='eded-span'>Location: </span>{event?.eventLocation}</p>
<p className='ed-evnt-desc'><span className='eded-span'>Type: </span>{event?.eventType}</p>
<p className='ed-evnt-desc'><span className='eded-span'>Pricing: </span>{event?.eventPrice}</p>

</div>

<img className='ed-image' src={event?.eventImage}/>

    </div>
      </div>
      <div className="fixed-div">
        {/* Content for the right div (fixed) */}
     //  <Checkout eventPrice={event?.eventPrice} eventId={event?.eventId}/>
       <p className='powered-payment'>Secure payments powerd by flutterwave oba...something like that to show that paywments are secure</p>
      </div>
    </div>
  );
}

export default EventDetails;
