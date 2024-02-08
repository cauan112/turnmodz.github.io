// code of main too 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase ,ref , push ,set, onValue,onChildAdded,get,remove,update, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxUpY5MatqsyN_PBy9rujaHoQe4REI0o",
  authDomain: "playplus-app.firebaseapp.com",
  databaseURL: "https://playplus-app-default-rtdb.firebaseio.com",
  projectId: "playplus-app",
  storageBucket: "playplus-app.appspot.com",
  messagingSenderId: "469616481306",
  appId: "1:469616481306:web:a66768caa7481b8a14ada3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

onAuthStateChanged(auth, (user) => {
    if (user) {
    } else {
        window.location.href = "/login";
    }
  
  });