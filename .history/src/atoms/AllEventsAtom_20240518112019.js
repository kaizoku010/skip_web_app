import React, { useContext } from 'react';
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'
import EventsContext from '../logic/DataPoint';
import { useNavigate } from 'react-router-dom';

function AllEventsAtom() {
  // console.log("events passed: ", allEvents)
  const events = useContext(EventsContext);
  const navigate = useNavigate();

  const handleEventClick = (index) => {
    history.push(`/event-details/${index}`);
  };

  return (
    <div className='all-Godly-people'>
    <h3 className='ev-titled'>Latest Events</h3>
    <div className='holders'>
    <ul className='events-list'>
          {events?.map((event, index) => (
            <li key={index} className='event-item' onClick={() => handleEventClick(index)}>
              <EventHolder
                imageLink={event.eventGraphicsURL}
                eventName={event.eventName}
                date={event.eventDate}
                desc={event.eventDescription}
              />
            </li>
          ))}
        </ul>
    {/* <EventHolder/>
    <EventHolder/> */}
    </div>
            
    </div>
  )
}

export default AllEventsAtom