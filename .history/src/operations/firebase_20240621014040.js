import { initializeApp } from "firebase/app";
import {getStorage, ref as reference, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage"

import { getFirestore, onSnapshot,collection, getDocs, query, addDoc } from 'firebase/firestore';
import {getDatabase, ref, set} from "firebase/database"
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification, updateProfile } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyA689XXkcCzM-Q4GTSNrHbI9e13-9XKHoA",
//     authDomain: "selfcheckinapps.firebaseapp.com",
//     databaseURL: "https://selfcheckinapps-default-rtdb.firebaseio.com",
//     projectId: "selfcheckinapps",
//     storageBucket: "selfcheckinapps.appspot.com",
//     messagingSenderId: "861079724058",
//     appId: "1:861079724058:web:82a9e409fd999be8a6f1a3"
//   };
  
const firebaseConfig = {
  apiKey: "AIzaSyC7jhaOeDPOnWJ43rCjz7eSEMav79pNU9k",
  authDomain: "selfcheckinapps-b7264.firebaseapp.com",
  databaseURL: "https://selfcheckinapps-b7264-default-rtdb.firebaseio.com",
  projectId: "selfcheckinapps-b7264",
  storageBucket: "selfcheckinapps-b7264.appspot.com",
  messagingSenderId: "898290487365",
  appId: "1:898290487365:web:d2297f8f06ce206ac1132c"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  const db = getFirestore(app)
  // Initialize Firestore
  const firestore = getFirestore(app);
  export { addDoc,db,app,auth,query, storage, reference, uploadBytes,sendEmailVerification, getDownloadURL ,onSnapshot,createUserWithEmailAndPassword, firestore, collection,database,updateProfile, getDocs, ref, set };