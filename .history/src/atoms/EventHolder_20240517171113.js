import React from 'react'
import "./EventHolder.css"
import TestImg from "../assets/bg.jpg"
function EventHolder() {
  return (
    <div className='event-holder glassy'>
        <div className='event-content-holder'>
        <img className='event-image' src={TestImg}/>
        <h4 className='heaven counterHeading'>Best collection of Events</h4>
        <h5 className='event-desc'>The operating system is what makes an Apple product an Apple product. When you’re on the team that forms the core of that personality, you help ensure it’s inseparable from the device’s identity as a whole. You can do that here because Apple has always had a fully integrated operating system, combining hardware, software, and applications. </h5>
        </div>
    </div>
  )
}

export default EventHolder