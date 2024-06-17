import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './EvenTImageHeader'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";


function EventDetails() {
    const events = useContext(EventsContext);
    const { id } = useParams();
    const event = events.find(event => event.id === id);

console.log("event passed: ", event)
    return (
    <div className="event-detals-holder">
        <div className='closeMe'>
        <h2 className='event-title-details'>{event?.eventName}</h2>
        {/* <p className='close' style={{color:"white"}}><IoMdCloseCircle /> */}
</p>
        </div>
<HeaderGlass status={event?.eventStatus}
date={event?.eventDate}
price={event?.eventPrice}
location={event?.eventLocation}
time={event?.eventTime}
id={event?.id}
host={event?.eventHost}
image={event?.eventGraphicsURL}/>
<dvi className="event-content">
        <p className='event-full-desc'>
       {event?.eventDescription} </p>
</dvi>
    </div>
  )
}

export default EventDetails