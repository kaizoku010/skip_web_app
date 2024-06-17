import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './EvenTImageHeader'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';


function EventDetails() {
    const events = useContext(EventsContext);
    const { id } = useParams();
    // const event = events[id];
    const event = events.find(event => event.id === id);

console.log("event passed: ", event)
    return (
    <div className="event-detals-holder">
        <div>
        <h2 className='event-title-details'>{event.eventName}</h2>
        <p style={{color:"white"}}>close x</p>
        </div>
<HeaderGlass status={event.eventStatus}

location={event.eventLocation}
image={event.eventGraphicsURL}/>
<dvi className="event-content">
        <p className='event-full-desc'>
       {event.eventDescription} </p>
</dvi>
    </div>
  )
}

export default EventDetails