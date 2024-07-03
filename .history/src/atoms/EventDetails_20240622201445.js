import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './EvenTImageHeader'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import { IoMdCloseCircle } from "react-icons/io";

function EventDetails() {

    const events = useContext(EventsContext);
    const { id } = useParams();
    console.log(first)
    const event = events.find(event => event.mdx === id);

    return (
    <div className="event-detals-holder">
        <div className='closeMe'>
        <h2 className='event-title-details'>{event?.eventName}</h2>
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
    <div className='agendaSpeakersSessions'>
    <p className='event-full-desc'>{event?.eventDescription} </p>
    <h3>Event Agenda</h3>
          {event?.agenda?.map((item, index) => (
            <div key={index} className="agenda-item">
              <p><strong>Title:</strong> {item.title}</p>                
              <p><strong>Speaker:</strong> {item.speaker}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Sessions:</strong> {item.eventSessions}</p>
              {/* Add more details as needed */}
            </div>
          ))}
    </div>
</dvi>
{/* <div className='event-actions'>
<button className='event-actions-btn'>Get Ticket</button>
</div> */}
    </div>
  )
}

export default EventDetails