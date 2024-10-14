import React, { useContext } from 'react';
import "./EventDetails.css";
import HeaderGlass from './EvenTImageHeader';
import { AuthContext } from "../logic/AuthContext";
import { useParams } from 'react-router-dom';

function EventDetails() {
  const { events, loading, error } = useContext(AuthContext);
  const { id } = useParams();
  const event = events.find(event => event.eventId === id);

  // Parse the agenda from JSON string to array
  const agenda = event?.agenda ? JSON.parse(event.agenda) : [];

  return (
    <div className="event-detals-holder">
      <div className='closeMe'>
        <h2 className='event-title-details'>{event?.eventName}</h2>
      </div>
      <HeaderGlass 
        status={event?.eventStatus}
        date={event?.eventDate}
        price={event?.eventPrice}
        location={event?.eventLocation}
        time={event?.eventTime}
        id={event?._id}
        host={event?.eventHost}
        image={event?.eventImage} 
      />
      <div className="event-content">
        <div className='agendaSpeakersSessions'>
          <p className='event-full-desc'>{event?.eventDescription}</p>
          <h3>Event Details</h3>
          {agenda.map((item, index) => (
            <div key={index} className="agenda-item">
              <p><strong>Title:</strong> {item.title}</p>                
              <p><strong>Speaker:</strong> {item.speaker}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Sessions:</strong> {item.session}</p> {/* Changed from eventSessions to session */}
              {/* Add more details as needed */}
            </div>
          ))}
        </div>
      </div>
      {/* <div className='event-actions'>
        <button className='event-actions-btn'>Get Ticket</button>
      </div> */}
    </div>
  );
}

export default EventDetails;
