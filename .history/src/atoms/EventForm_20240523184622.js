import React, { useState, useContext } from 'react';
import "./EventForm.css"
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import MXForm from './MXForm'
import testBg from "../assets/bg.jpg"

function EventForm() {
  const events = useContext(EventsContext);
  const { id } = useParams();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  
  const event = events.find(event => event.id === id);

  const handleRegistrationSuccess = (email, password) => {
    setIsRegistrationSuccessful(true);
    setUserEmail(email);
    setUserPassword(password);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(userPassword)
      .then(() => {
        alert('Password copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy password: ', err);
      });
  };

  return (
    <div className='evt-form'>
      <div className='inner-form'>
        {isRegistrationSuccessful ? (
          <div className='show-me-we-are-good'>
            <h2>Registration Successful!</h2>
            <p>Your account has been created.</p>
            <p>Email: <strong>{userEmail}</strong></p>
            <p>Password: <strong>{userPassword}</strong> <button onClick={handleCopyPassword}>Copy Password</button></p>
          </div>
        ) : (
          <>
            <div className='form-side'>
              <div className='form-side-holder'>
                <h2 className='title form-title'>Event Registration</h2>
                <p className='sub-title'>
                  Fill this form to get your e-ticket for {event?.eventName || "the event"}, the form automatically adds the event of choice to your profile. After filling the form, download our Events apps to proceed with your profile.
                </p>
                <MXForm id={id} onRegistrationSuccess={handleRegistrationSuccess} />  {/* Pass the callback as a prop */}
              </div>
            </div>
            <div className='image-side'>
              <div style={{ backgroundImage: `url(${event?.eventGraphicsURL || testBg})` }} className='img-box'>
                <div></div>
                <div className='selected-event glassy'>
                  <p className='passed-data'>Location:<span className='passed-data2'>{event?.eventLocation || "Loading"}</span></p>
                  <p className='passed-data'>Name: <span className='passed-data2'>{event?.eventName || "Loading"}</span></p>
                  <p className='passed-data'>Price:<span className='passed-data2'>{event?.eventPrice || "Loading"}</span></p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EventForm;
