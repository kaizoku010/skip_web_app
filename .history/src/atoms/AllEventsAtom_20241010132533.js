import React, { useContext, useState } from 'react';
import "./AllEventsAtom.css"
import EventHolder from './EventHolder'
import EventsContext from '../logic/AuthContext';
import { useNavigate } from 'react-router-dom';

function AllEventsAtom() {
  const navigate = useNavigate();
  const { events, loading, error } = useContext(EventsContext); // Get events from context
  const eventsPerPage = 9; // Display 9 events (3x3 grid)
  const [currentPage, setCurrentPage] = useState(1);

  const handleEventClick = (index) => {
    navigate(`/event-details/${index}`);
    // console.log("event id")
  };



  console.log("events:" )



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

      {/* Show loading or error */}
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='holders'>
          <ul className='events-list'>
            {currentEvents.map((event, index) => (
              <li key={event._id} className='event-item'>
                <div className='new_holder' onClick={() => handleEventClick(index)}>
                  <EventHolder
                    imageLink={event.eventGraphicsURL}
                    eventName={event.eventName}
                    date={event.eventDate}
                    desc={event.eventDescription}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination Controls */}
      <div className='pagination-controls'>
        <button className='pagination-button' onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className='pagination-info'>
          Page {currentPage} of {totalPages}
        </span>
        <button className='pagination-button' onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default AllEventsAtom