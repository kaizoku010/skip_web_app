import React, { useContext } from 'react';
import "./EventDetails.css"
import HeaderGlass from './HeaderGlass'
import EventsContext from '../logic/DataPoint';


function EventDetails() {
    const events = useContext(EventsContext);

console.log("events: ", events)
    return (
    <div className="event-detals-holder">
<h2 className='event-title-details'>Event Name</h2>
<HeaderGlass/>
<dvi className="event-content">

</dvi>
    </div>
  )
}

export default EventDetails