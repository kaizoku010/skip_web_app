import React, { useContext } from 'react';
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'
import EventsContext from '../logic/DataPoint';
import { useNavigate } from 'react-router-dom';

function AllEventsAtom() {
  // const events = useContext(EventsContext);
  const navigate = useNavigate();

  const handleEventClick = (index) => {
    navigate(`/event-details/${index}`);
    // console.log("event id")
  };

  return (
    <div className='all-Godly-people'>
    <h3 className='ev-titled'>Explore Our Events</h3>
    <div className='holders'>
    {/* <ul className='events-list'>
          {events?.map((event, index) => (
            <li key={index} className='event-item' onClick={() => handleEventClick(event.mdx)}>
              <EventHolder
                imageLink={event.eventGraphicsURL}
                eventName={event.eventName}
                date={event.eventDate}
                desc={event.eventDescription}
              />
            </li>
          ))}
        </ul> */}
<div className='new_holder'>
<EventHolder
                imageLink={"event.eventGraphicsURL"}
                eventName={"event.eventName"}
                date={"event.eventDate"}
                desc={"event.eventDescription"}
              />
</div>
    </div>
            
    </div>
  )
}

export default AllEventsAtom