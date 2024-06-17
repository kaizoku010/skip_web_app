import React from 'react'
import "./EventForm.css"
import BG from "../assets/formbg.jpg"
import Connect_ from "../assets/connects.png"

function EventForm() {
  return (
    <div className='evt-form'>
<div className='inner-form'>
{/* form side */}
<div className='form-side'>
<div className='form-side-holder'>
<h2 className='title form-title'>Event Regestration</h2>
<p className='sub-title'>Fill the form below to get your e-ticket for the event, the form automatically adds the event of choice to your profile, after filling the form, download our Events apps to proceed with your profile. </p>
</div>
</div>
{/* image side */}
<div className='image-side'>
  <div className='img-box'>
      {/* <img src={Connect_}  className='right-img-box'/> */}
  </div>
</div>
</div>
    </div>
  )
}

export default EventForm