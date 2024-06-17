import React from 'react'
import "./footer.css"
import IC from "../assets/white_logo.png"

function Footer() {
  return (

    <div className='footer'>
        <img src={IC} className='footer-ic'/>
        {/* Footer */}
        <p className=''>www.moxie5agency.com</p>
        </div>
  )
}

export default Footer