import React, { useEffect, useState } from 'react';
import './MXForm.css';
import IC from "../assets/moxieladbs.png"
import { firestore, collection, getDocs,
  storage, database, set,reference, ref,uploadBytes, getDownloadURL,
  auth, createUserWithEmailAndPassword,sendEmailVerification,
  updateProfile, db, addDoc }
  from '../operations/firebase';
import { v4 as uuidv4 } from 'uuid';
import TextField from '@mui/material/TextField';
import { onSnapshot, query } from 'firebase/firestore';
import ICo from "../assets/moxieladbs.png"

function MXForm() {
  const moxie5ImageLink = "https://mlef76ith63u.i.optimole.com/w:1920/h:514/q:mauto/ig:avif/https://moxie5agency.com/wp-content/uploads/2024/03/moxie-large-2.png";
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newImage, setNewImage] = useState('')
  const [image, setImage] = useState(null); // State to store the selected image file
  const [showFullDescription, setShowFullDescription] = useState(false); // State to toggle full description
  const [loading, setLoading] = useState(false); // State to control the visibility of the progress bar or spinner
  const [job, setJob]=useState()
  const eventData = []
  const [office, setOffice] = useState();
  const [newUserId ,setRegesteredId] = useState()
    

    const handleImageChange = (e) => {
          setImage(e.target.files[0]); // Update the image state with the selected file
        };
//get events
  useEffect(() => {
    // Fetch event data from Firestore
    const fetchEvents = async () => {
      try {
        const q = query(collection(firestore, "events"));
        const unsub = onSnapshot(q, (docs) => {
          const newETs = [];
          docs.forEach((doc) => {
            const et = doc.data();
            et.id = doc.id;
            newETs.push(et);
            // console.log("New Entities: ", newETs);
            setEvents(newETs);
          });
        });

    

        const snapshot = await getDocs(collection(firestore, 'events'));
        snapshot.forEach(doc => {
          // Extract document data and add it to the eventData array
          eventData.push({ id: doc.id, ...doc.data() });
        });
        // Set the events state with the extracted data
        // console.log("Events Data:", eventData);
      } catch (error) {
        console.error('Error fetching events:', error);
        // Handle any errors that occur during fetching
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show the progress bar or spinner

    // console.log("form data: ", "name +", name, "email + ", email, "event + ", selectedEvent);
    // Perform form validation
    if (!name || !email || !selectedEvent) {
      alert('Please fill in all fields');
      return;
    }

    // Generate UUID
    const uuid = uuidv4();
    try { 

      const imageFileName = `${uuidv4()}-${image.name}`;
      const imageUrl = await uploadImageToStorage(image, imageFileName);

      const newcode = uuid.substring(0, 6);
      const userCredential = await createUserWithEmailAndPassword(auth, email, newcode);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name, photoURL: imageUrl,
        selectedEvent: selectedEvent
      });

      // Implement your sign-up logic here, e.g., store user data in Firestore
      // console.log('New profile Image:', imageUrl);
      setLoading(false);

      // Reset form fields
      setName('');
      setEmail('');
      setSelectedEvent('');
      setImage(null);


      const formData = {
        name:name,
        occupation:job,
        email:email,
        office:office,
        image:imageUrl,
        password:newcode,
        selectedEvent:selectedEvent
      }




      //Save user data with UUID to your real-time database
      await set(ref(database, "attendees/" + newcode), {
        name: name,
        email: email,
        image:imageUrl,
        office:office,
        password: newcode,
        occupation:job,
        selectedEvent: selectedEvent
      });

      addDoc(collection(db, 'attendees'), formData).then((userRef) => {
        console.log('Attendee written with ID: ', userRef.id);
        setRegesteredId(userRef.id)
      }).catch((error) => {
        console.error('Error adding user firestore data: ', error);
        alert('An error occurred while adding the event. Please try again.');
      });
      //csnt we create the user here, then read them from the app
      console.log('User Data:', { name, email, selectedEvent, newcode, imageUrl, office,job });
      alert("Your information has been recorded, please open your email on how to proceed:", auth.currentUser.uid);
      console.log("text uid: ", auth.currentUser.uid)
sendEmailVerification(auth.currentUser).then(()=>{

})
      console.log('User data saved to real-time database with UUID:', uuid);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setLoading(false); // Hide the progress bar or spinner if an error occurs

      alert('An error occurred. Please try again.');
    }
  };
  
  const toggleDescription = (eventId) => {
    setEvents(prevEvents =>
      prevEvents.map(event =>
        event.id === eventId ? { ...event, showFullDescription: !event.showFullDescription } : event
      )
    );
  };

  const uploadImageToStorage = async (imageFile, fileName) => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    try {
      const storageRef = reference(storage, `/images/${uuidv4()}`); // Reference to the storage location with the specified filename
      await uploadBytes(storageRef, imageFile); // Upload the image file to Firebase Storage
  
      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      console.log("user image", downloadURL)
      setNewImage(downloadURL)
      return downloadURL; // Return the download URL of the uploaded image
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      throw error; // Throw the error for handling in the calling function
    }
  };



  return(
  <div className='form-holder' style={{display:"flex", height:"100vh"}}>
  
    <div className='div-2'>
    <div className='content'>
        <div className='header'>
        <h3 className='all-events'>All Events</h3>
        <h3 className='all-events2'>Moxi5 Events</h3>
        <img className='all-events-img' src={IC}/>
        {/* <img className='all-events' src={newImage}/> */}

        </div>
        
      <div className='flex-events'>
        <ul className='event-list'>
          {events.map((event, index) => (
            <li className='list-item' key={index}>
              <div className=''>
                <img className='event-img' src={event.eventGraphicsURL} />
              </div>
              <div className='event-date-time'>
                <p className='event-date'>{"Date: " + event.eventDate}</p>
                <p style={{ marginLeft: "5px", fontStyle: "small" }} className='event-date'>{" Time: " + event.eventTime}</p>
              </div>
              <div className='event-date-time'>
                <p className='event-location event-date'>{"Location: " + event.eventLocation}</p>
              </div>
              <div className='event-date-time event-date'>
                <p>{"Host: " +event.host}</p>
              </div>
              <div className='event-date-time'>
                <h4 className='event-title'>{event.eventName}</h4>
              </div>
              <div className='event-date-time' style={{display:"flex", flexDirection:"column"}}>
              <p className='event-desc'>
    {event.showFullDescription ? event.eventDescription : event.eventDescription.substring(0, 160)}
  </p>
  {event.eventDescription.length > 100 && (
    <p className='readmore-btn' onClick={() => toggleDescription(event.id)}>
      {event.showFullDescription ? 'Read less' : 'Read more'}
    </p>
  )}
              </div>
            </li>
          ))}
        </ul>
      </div>  
      </div>


    </div>




    <div className='div-1'>
 {/* section one */}
 <div className="login-holder flex-form">
        <div className="well">
          <div className="logo-holder-login">
            <img className="login-logo" src={IC} alt="Logo" />
          </div>
          <form onSubmit={handleSubmit} className="material-form">
            <div className="form-group">
              <input type="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Full Name</label>
              <span className="input-border"></span>
            </div>
         
            <div className="form-group">
              <input type="name" className="form-control" value={office} onChange={(e) => setOffice(e.target.value)} />
              <label>Company Name</label>
              <span className="input-border"></span>
            </div>
            
            <div className="form-group">
              <input type="name" className="form-control" value={job} onChange={(e) => setJob(e.target.value)} />
              <label>Position</label>
              <span className="input-border"></span>
            </div>
           
         
            <div className="form-group">
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Email</label>
              <span className="input-border"></span>
            </div>
         
            <div className="form-group image-upload-section">
            <input className='img-input' type="file" onChange={handleImageChange} accept="image/*" />

            </div>


            <div className="form-group events-options">
              <select id="event" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                <option value="">Select An Event</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.eventName}</option>
                ))}
              </select>
            </div>
              {/* Progress bar or spinner */}
              {loading && <div className="progress-bar">please wait...</div>}
              

            <a>
              <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </a>
            <p className="helper-text">Fill the form with your information and choose the event yould like to attend or book. Having trouble siging up? <a href="#">Contact Support</a> here.</p>
          </form>
        </div>
      </div>

    </div>

  </div>
)

}

export default MXForm;
