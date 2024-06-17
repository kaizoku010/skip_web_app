import React, { useEffect, useState,useContext } from 'react';
import "./EventForm.css"
import BG from "../assets/formbg.jpg"
import Connect_ from "../assets/connects.png"
import MXForm from './MXForm'
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import testBg from "../assets/bg.jpg"



function EventForm() {
  const events = useContext(EventsContext);
  const { id } = useParams();

  const event = events.find(event => event.id === id);
  // console.log("first :", event)

  return (
    <div className='evt-form'>
    
<div className='inner-form'>
{/* form side */}
<div  className='show-me-we-are-goo' >show this if regestration was a success</div>
<div className='form-side'>
<div className='form-side-holder'>
<h2 className='title form-title'>{event?.eventName || "Event Regestration"}</h2>
<p className='sub-title'>Fill the form to get your e-ticket for the event, the form automatically adds the event of choice to your profile, after filling the form, download our Events apps to proceed with your profile. </p>
<MXForm id={id}/>
</div>
</div>
{/* image side */}
<div className='image-side'>
  <div style={{backgroundImage: `url(${event?.eventGraphicsURL || testBg})`}}  className='img-box'>
  {/* <div className='img-box'> */}
  <div></div>

  <div className='selected-event glassy'>
  <p>Event Name: event title</p>
  <p>Event Price: 30'000'000</p>
  <p>Event Location: Event Location</p>
  </div>
  </div>
 
</div>
</div>
    </div>
  )
}

export default EventForm