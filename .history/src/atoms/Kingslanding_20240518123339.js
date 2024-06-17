import React, { useEffect, useState } from 'react';
import "./Kingslanding.css"
import HeaderGlass from './HeaderGlass'
import AllEventsAtom from './AllEventsAtom'
import Footer from "./Footer"

import { firestore, collection, getDocs,onSnapshot,query,
  storage, database, set,reference, ref,uploadBytes, getDownloadURL,
  auth, createUserWithEmailAndPassword,sendEmailVerification,
  updateProfile, db, addDoc }
  from '../operations/firebase';

function Kingslanding() {
const [events, setEvents]= useState()


  useEffect(()=>{

    const fetchEvents = async () => {
      try {
        const eventQuery = query(collection(firestore, "events"));
        const unsub = onSnapshot(eventQuery, (docs) => {
          const newETs = [];
          docs.forEach((doc) => {
            const et = doc.data();
            et.id = doc.id;
            newETs.push(et);
            setEvents(newETs);
          });
        });
      } catch(error){
console.log("error of kiyaye: ", error)
      }
    
  }
  fetchEvents()
  }, [])

  return (
    <div className='kings-holder'>
<div className='heading-holder'>
<h1 className='welcome-note'>All Corporate Events From</h1>
    <h2 className='heading'>leading companies in one place.</h2>
    
</div>
 <div className='content'>
     <HeaderGlass/>
    <AllEventsAtom allEvents = {events}/>
    {/* <Footer/> */}
 </div>
 
    </div>
  )
}

export default Kingslanding