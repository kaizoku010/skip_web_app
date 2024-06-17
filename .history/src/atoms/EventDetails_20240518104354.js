import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './HeaderGlass'
import EventsContext 


function EventDetails() {
    const events = useContext(EventsContext);

console.log("events: ", events)
    return (
    <div className="event-detals-holder">
<h2 className='event-title-details'>Event Name</h2>


<HeaderGlass/>

    </div>
  )
}

export default EventDetails