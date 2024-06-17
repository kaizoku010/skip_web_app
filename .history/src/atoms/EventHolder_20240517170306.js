import React from 'react'
import "./EventHolder.css"
import TestImg from "../assets/bg.jpg"
function EventHolder() {
  return (
    <div className='event-holder glassy'>
        <div className='event-content-holder'>
        <img src={TestImg}/>
        </div>
    </div>
  )
}

export default EventHolder