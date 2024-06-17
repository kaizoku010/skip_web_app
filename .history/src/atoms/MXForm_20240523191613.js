import React, { useEffect, useState, useContext } from 'react';
import './MXForm.css';
import IC from "../assets/moxieladbs.png";
import {
  firestore, collection, getDocs, storage, database, set, reference, ref, uploadBytes, getDownloadURL,
  auth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile, db, addDoc
} from '../operations/firebase';
import { v4 as uuidv4 } from 'uuid';
import EventsContext from '../logic/DataPoint';
import { useNavigate } from 'react-router-dom';

function MXForm({ id, onRegistrationSuccess }) {
  const navigate = useNavigate();
  const events = useContext(EventsContext);
  const event = events.find(event => event.id === id);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newImage, setNewImage] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState('');
  const [office, setOffice] = useState('');
  const [newUserId, setRegesteredId] = useState('');
  const [simu, setSimu] = useState('');
  const [passcode, setPassCode] = useState('');
  const [success, setSuccess] = useState(false);
  const eventData =[]

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, 'events'));
        snapshot.forEach(doc => {
          eventData.push({ id: doc.id, ...doc.data() });
        });
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !simu || !job || !office || !image) {
      alert('Please fill in all fields');
      setLoading(false);
      return;
    }

    const uuid = uuidv4();
    try {
      const imageFileName = `${uuidv4()}-${image.name}`;
      const imageUrl = await uploadImageToStorage(image, imageFileName);
      const newcode = uuid.substring(0, 6);
      const userCredential = await createUserWithEmailAndPassword(auth, email, newcode);
      setPassCode(newcode);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name, photoURL: imageUrl, selectedEvent: id });
      setLoading(false);

      const formData = {
        name: name,
        occupation: job,
        email: email,
        office: office,
        image: imageUrl,
        password: newcode,
        selectedEvent: id,
        phonenumber: simu,
        uid: auth.currentUser.uid
      };

      await set(ref(database, "attendees/" + newcode), formData);
      await addDoc(collection(db, 'attendees'), formData).then((userRef) => {
        setRegesteredId(userRef.id);
      }).catch((error) => {
        console.error('Error adding user firestore data: ', error);
        alert('An error occurred while adding the event. Please try again.');
      });

      setSuccess(true);
      onRegistrationSuccess();
      sendEmailVerification(auth.currentUser);
    } catch (error) {
      console.error('Error signing up:', error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  const uploadImageToStorage = async (imageFile, fileName) => {
    const metadata = { contentType: 'image/jpeg' };
    try {
      const storageRef = reference(storage, `/images/${uuidv4()}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      setNewImage(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image to storage:', error);
      throw error;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Password copied to clipboard');
    });
  };

  return (
    <div className='form-holder' style={{ display: "flex" }}>
      {!success ? (
        <div className='div-1'>
          <div className="login-holder flex-form">
            <div className="well">
              <form onSubmit={handleSubmit} className="material-form">
                <div className='flexMeForm'>
                  <div className="nice-form-group">
                    <input type="text" placeholder="Full Username" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="nice-form-group">
                    <input type="tel" placeholder="Phone Number" value={simu} onChange={(e) => setSimu(e.target.value)} required />
                  </div>
                  <div className="nice-form-group">
                    <input type="text" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="nice-form-group">
                  <input type="text" placeholder="Company" value={office} onChange={(e) => setOffice(e.target.value)} required />
                </div>
                <div className="nice-form-group">
                  <input type="text" placeholder="Position" value={job} onChange={(e) => setJob(e.target.value)} required />
                </div>
                <div className="nice-form-group">
                  <label className='sub-title'> Add Profile Image</label>
                  <input className='img-input' type="file" onChange={handleImageChange} accept="image/*" required />
                </div>
                <button type="submit" className="btn">Submit</button>
                {loading && <div className="progress-bar">please wait...</div>}
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="confirmation-message">
          <h2>Registration Successful</h2>
          <p>Next Steps</p>
          <p>Take your credentials:</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Password:</strong> {passcode} <button className='copy-pass'   onClick={() => copyToClipboard(passcode)}>Copy Password</button></p>
          <p>Download Our App:</p>
<p>Google Play Store</p>
<p>Link........................</p>

        </div>
      )}
    </div>
  );
}

export default MXForm;
