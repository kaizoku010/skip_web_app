import React from 'react'
import "./EventHolder.css"
import TestImg from "../assets/bg.jpg"
function EventHolder() {
  return (
    <div className='event-holder glassy'>
        <div className='event-content-holder'>
        <img className='event-image' src={TestImg}/>
        <h4 className='heaven counterHeading'>Best collection of Events</h4>
        < className='event-desc-new newtext'>The operating system is what makes an Apple product an Apple product. When you’re on the team that forms the core of that personality, you help ensure it’s inseparable from the device’s identity as a whole.</h5>
        </div>
    </div>
  )
}

export default EventHolder