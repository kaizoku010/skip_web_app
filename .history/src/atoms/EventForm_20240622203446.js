// EventForm.js
import React, { useEffect, useState, useContext } from 'react';
import EventsContext from '../logic/DataPoint';
import { useParams } from 'react-router-dom';
import MXForm from './MXForm';
import testBg from "../assets/bg.jpg";

function EventForm() {
  const { events, loading, error } = useContext(EventsContext);
  const { id } = useParams();
  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
  
  const event = events.find(event => event.mdx === id);
  
  const handleRegistrationSuccess = () => {
    setIsRegistrationSuccessful(true);
  };

  return (
    // Your component JSX
  );
}

export default EventForm; // Ensure EventForm is exported as default
