import React, { useEffect, useState } from 'react';
import "./Kingslanding.css"
import HeaderGlass from './HeaderGlass'
import AllEventsAtom from './AllEventsAtom'
import Footer from "./Footer"

import { firestore, collection, getDocs,
  storage, database, set,reference, ref,uploadBytes, getDownloadURL,
  auth, createUserWithEmailAndPassword,sendEmailVerification,
  updateProfile, db, addDoc }
  from '../operations/firebase';

function Kingslanding() {



  useEffect(()=>{

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
      }

  }, [])

  return (
    <div className='kings-holder'>
<div className='heading-holder'>
<h1 className='welcome-note'>All Coperate Events from</h1>
    <h2 className='heading'>leading companies in one place.</h2>
    
</div>
 <div className='content'>
     <HeaderGlass/>
    <AllEventsAtom/>
    <Footer/>
 </div>
 
    </div>
  )
}

export default Kingslanding