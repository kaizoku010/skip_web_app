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
<h2 className='title form-title'>Hello Form Moxie</h2>
<p>Fill the form below to requester for our events, the form automatically adds the event clip to your profile, after filling the form, you will reci </p>
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