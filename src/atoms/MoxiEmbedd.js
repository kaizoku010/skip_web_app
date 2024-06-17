import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore, collection, getDocs, database, set, ref, auth, createUserWithEmailAndPassword, updateProfile } from '../operations/firebase';
import { v4 as uuidv4 } from 'uuid';

const MoxiEmbedd = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch event data from Firestore
    const fetchEvents = async () => {
      const eventsCollection = collection(firestore, 'Events');
      const snapshot = await getDocs(eventsCollection);
      const eventData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventData);
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform form validation
    if (!name || !email || !selectedEvent) {
      alert('Please fill in all fields');
      return;
    }
  
    // Generate UUID
    const uuid = uuidv4();
  
    try {

      const newcode = uuid.substring(0, 6)

      const userCredential = await createUserWithEmailAndPassword(auth, email, newcode);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      // Implement your sign-up logic here, e.g., store user data in Firestore
      console.log('User profile:', user);
      // Reset form fields
      setName('');
      setEmail('');
      setSelectedEvent('');
  
      // Save user data with UUID to your real-time database
      await set(ref(database, "attendees/"+uuid.substring(0, 6)),{
        name: name,
        email: email,
        password:newcode,
        selectedEvent: selectedEvent
        //we can even passin an image
        //  profile_picture : imageUrl
        
      });
      //csnt we create the user here, then read them from the app
      console.log('User Data:', { name, email, selectedEvent, uuid });
alert("User event info save")
  
      console.log('User data saved to real-time database with UUID:', uuid);
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div>
      <h2>Sign Up for an Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="event">Select Event:</label>
          <select id="event" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
            <option value="">Select an event</option>
            {events.map(event => (
              <option key={event.id} value={event.id}>{event.event_name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default MoxiEmbedd;
