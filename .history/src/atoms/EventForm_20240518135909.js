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
  <h2>Hello Form</h2>
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