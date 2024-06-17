import React from 'react'
import "./footer.css"
import IC from "../assets/white_logo.png"

function Footer() {
  return (

    <div className='footer'>
        <img src={IC} className='footer-ic'/>
        {/* Footer */}
        <p>www.moxie</p>
        </div>
  )
}

export default Footer