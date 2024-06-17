import React from 'react'
import "./EventHolder.css"
import TestImg from "../assets/bg.jpg"
function EventHolder() {
  return (
    <div className='event-holder glassy'>
        <div className='event-content-holder'>
        <img className='event-image' src={TestImg}/>
        
        </div>
    </div>
  )
}

export default EventHolder