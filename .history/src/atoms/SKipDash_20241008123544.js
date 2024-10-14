import React from 'react';
import "./skipdash.css";

function SKipDash() {
  return (
    <div className='skipdash'>
      <div className='facebook_header'>
        EventApp
      </div>

      <div className='faebook_elements'>
        {/* Left Sidebar */}
        <div className='left-sidebar'>
          <div>Chat</div>
          <div>Attendees</div>
          <div>Events</div>
          <div>Wall</div>
          <div>Tickets</div>
        </div>

        {/* Main Content Area */}
        <div className='skip-user-content'>
          <p>Welcome to the Event</p>
          <p>Select a section from the sidebar to get started.</p>
        </div>

        {/* Right Sidebar with Cards */}
        <div className='right-sidebar'>
          <div className='card'>Notifications</div>
          <div className='card'>Current Event Info</div>
        </div>
      </div>
    </div>
  );
}

export default SKipDash;
