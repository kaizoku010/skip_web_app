import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';
import {getDatabase, ref, set} from "firebase/database"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA689XXkcCzM-Q4GTSNrHbI9e13-9XKHoA",
    authDomain: "selfcheckinapps.firebaseapp.com",
    databaseURL: "https://selfcheckinapps-default-rtdb.firebaseio.com",
    projectId: "selfcheckinapps",
    storageBucket: "selfcheckinapps.appspot.com",
    messagingSenderId: "861079724058",
    appId: "1:861079724058:web:82a9e409fd999be8a6f1a3"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  const auth = getAuth(app)

  // Initialize Firestore
  const firestore = getFirestore(app);
  export { app,auth, createUserWithEmailAndPassword, firestore, collection,database,updateProfile, getDocs, ref, set };