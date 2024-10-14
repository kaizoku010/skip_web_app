import React, { useContext } from 'react';
import "./EventDetails.css";
import HeaderGlass from './EvenTImageHeader';
import { AuthContext } from "../logic/AuthContext";
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';

import { SlBell } from "react-icons/sl";

function EventDetails() {
  const { events, loading, error } = useContext(AuthContext);
  const { id } = useParams();
  const event = events.find(event => event.eventId === id);
  const eventdesc = "Our workshop is specially designed to give international job seekers in Sweden an insight into what is required by Swedish employers and how to improve their chances of success. All workshops are held as 1 on 1 sessions via online web meetings over Skype. Typical duration is 45 mins."
  // Parse the agenda from JSON string to array
  const agenda = event?.agenda ? JSON.parse(event.agenda) : [];

  return (
    // <div className="event-detals-holder">
    //   <div className='closeMe'>
    //     <h2 className='event-title-details'>{event?.eventName}</h2>
    //   </div>
    //   <HeaderGlass 
    //     status={event?.eventStatus}
    //     date={event?.eventDate}
    //     price={event?.eventPrice}
    //     location={event?.eventLocation}
    //     time={event?.eventTime}
    //     id={event?._id}
    //     host={event?.eventHost}
    //     image={event?.eventImage} 
    //   />
    //   <div className="event-content">
    //     <div className='agendaSpeakersSessions'>
    //       <p className='event-full-desc'>{event?.eventDescription}</p>
    //       <h3>Event Details</h3>
    //       {agenda.map((item, index) => (
    //         <div key={index} className="agenda-item">
    //           <p><strong>Title:</strong> {item.title}</p>                
    //           <p><strong>Speaker:</strong> {item.speaker}</p>
    //           <p><strong>Time:</strong> {item.time}</p>
    //           <p><strong>Sessions:</strong> {item.session}</p> {/* Changed from eventSessions to session */}
    //           {/* Add more details as needed */}
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    // </div>

    <div className='event-details-container'>
  <div className="scrollable-div">      
    <div className='event-details-section'>
<div className='eds-chip'>
  <SlBell className="bell-me"/>
  <p className='ticket-status'>Ticket sales end soon</p>
</div>
<p className='event-date-details'>{event?.eventDate} | {event?.eventTime}</p>
<h1 className='ed-event-name'>WORLD HEART DAY</h1>
<p className='ed-evnt-desc'>{eventdesc}</p>
<Divider orientation='left' plain>Event Info</Divider>

<p className='ed-evnt-desc'>{event?.eventHost}</p>
<p className='ed-evnt-desc'>{event?.eventLocation}</p>
<p className='ed-evnt-desc'>{event?.eventHost}</p>
<p className='ed-evnt-desc'>{event?.eventHost}</p>

<img className='ed-image' src={event?.eventImage}/>

    </div>
      </div>
      <div className="fixed-div">
        {/* Content for the right div (fixed) */}
        <h2>Fixed Content</h2>
        <p>This content does not scroll.</p>
      </div>
    </div>
  );
}

export default EventDetails;
