import React, { useContext } from 'react';
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'
import EventsContext from '../logic/AuthContext';
import { useNavigate } from 'react-router-dom';

function AllEventsAtom() {
  const navigate = useNavigate();

  const eventsPerPage = 9; // Display 9 events (3x3 grid)

  const handleEventClick = (index) => {
    navigate(`/event-details/${index}`);
    // console.log("event id")
  };




  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Handlers for next and previous pages
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <div className='all-Godly-people'>
    <h3 className='ev-titled'>Explore Our Events</h3>
    <div className='holders'>

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