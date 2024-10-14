import React from 'react';
import './skipdash.css';

function SkipDash() {
  return (
    <div className='skipdash'>
      <div className='facebook_header'>EventApp</div>
      <div className='faebook_elements'>
        <div className='left-sidebar'>
          <div className='menu-item'>Chat</div>
          <div className='menu-item'>Attendees</div>
          <div className='menu-item'>Events</div>
          <div className='menu-item'>Wall</div>
          <div className='menu-item'>Tickets</div>
        </div>
        <div className='skip-user-content'>
          <h2>Welcome to the Event</h2>
          <div className='content-box'>
            {/* Placeholder for different sections */}
            <p>Select a section from the sidebar to get started.</p>
          </div>
        </div>
        <div className='right-sidebar'>
          <div className='widget'>Notifications</div>
          <div className='widget'>Current Event Info</div>
        </div>
      </div>
    </div>
  );
}

export default SkipDash;
