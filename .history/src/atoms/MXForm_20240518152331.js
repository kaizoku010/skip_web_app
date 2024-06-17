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
  const [simu, setSimu] = useState()

    const handleImageChange = (e) => {
          setImage(e.target.files[0]); // Update the image state with the selected file
        };
//get events
  useEffect(() => {
    // Fetch event data from Firestore
    const fetchEvents = async () => {
      try {
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
        name: name,
        occupation: job,
        email: email,
        office: office,
        image: imageUrl,
        password: newcode,
        selectedEvent: selectedEvent,
        uid: auth.currentUser.uid // Add the UID of the current user
      };
      



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
        setRegesteredId(userRef.id);
      }).catch((error) => {
        console.error('Error adding user firestore data: ', error);
        alert('An error occurred while adding the event. Please try again.');
      });
      
      //csnt we create the user here, then read them from the app
      // console.log('User Data:', { name, email, selectedEvent, newcode, imageUrl, office,job });
      alert("Your information has been recorded, please open your email on how to proceed:", auth.currentUser.uid);
      // console.log("text uid: ", auth.currentUser.uid)
sendEmailVerification(auth.currentUser).then(()=>{

})
      console.log('User data saved to real-time database with UUID:');
    } catch (error) {
      console.error('Error signing up:', error.message);
      setLoading(false); // Hide the progress bar or spinner if an error occurs

      alert('An error occurred. Please try again.');
    }
  };
  
  console.log('Attendee written with ID: ', newUserId);

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
  <div className='form-holder' style={{display:"flex"}}>
    <div className='div-1'>
 {/* section one */}
 <div className="login-holder flex-form">
        <div className="well">
          <form onSubmit={handleSubmit} className="material-form">
            <div className='flexMeForm'>
            <div className="form-group">
              <input type="name" className="newInputs form-control" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Full Name</label>
              <span className="input-border"></span>
            </div>
          <div className="form-group">
              <input type="email" className="newInputs form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label for="name" class="form__label">Email</label>
              <span className="input-border"></span>
            </div>

            <div className="form-group">
              <input type="name" className="newInputs form-control" value={simu} onChange={(e) => setSimu(e.target.value)} />
              <label>Phone Number</label>
              <span className="input-border"></span>
            </div>
          
            </div>
            <div className='flexMeForm'>

            <div className="form-group">
              <input type="name" className="newInputs form-control" value={office} onChange={(e) => setOffice(e.target.value)} />
              <label>Company Name</label>
              <span className="input-border"></span>
            </div>  

            <div className="form-group">
              <input type="name" className="newInputs form-control" value={job} onChange={(e) => setJob(e.target.value)} />
              <label>Position</label>
              <span className="input-border"></span>
            </div>
            </div>
               
            <div className="form-group image-upload-section">
            <input className='img-input' type="file" onChange={handleImageChange} accept="image/*"/>
            <label className='profile-img'> Upload A Profile Image</label>
           <a>
              <button type="submit" className="glassy btn btn-primary btn-lg">Submit</button>
            </a>  
            <div class="modal">
	<div class="modal-body">
		<button class="upload-area">
			<span class="upload-area-icon">
<svg xmlns="http://www.w3.org/2000/svg" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
  <g id="files-new" clip-path="url(#clip-files-new)">
    <path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)"/>
  </g>
</svg>
			</span>
			<span class="upload-area-title">Drag file(s) here to upload.</span>
			<span class="upload-area-description">
				Alternatively, you can select a file by <br/><strong>clicking here</strong>
			</span>
		</button>
	</div>
</div>
            </div>

{/* 
            <div className="form-group events-options">
              <select id="event" value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                <option value="">Select An Event</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.eventName}</option>
                ))}
              </select>
            </div> */}
              {/* Progress bar or spinner */}
              {loading && <div className="progress-bar">please wait...</div>}
              

           
            {/* <p className="helper-text">Having trouble siging up? <a href="#">Contact Support</a> here.</p> */}
          </form>
        </div>
      </div>

    </div>

  </div>
)

}

export default MXForm;
