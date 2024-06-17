import React from 'react'
import "./EventDetails.css"
import HeaderGlass from './HeaderGlass'
import EventsContext from '../context/EventsContext';


function EventDetails() {
console.log("events")
    return (
    <div className="event-detals-holder">
<h2 className='event-title-details'>Event Name</h2>


<HeaderGlass/>

    </div>
  )
}

export default EventDetails