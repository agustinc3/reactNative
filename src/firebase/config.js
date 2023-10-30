// Import the functions you need from the SDKs you need
import app from 'firebase/app'
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDipALj1owxxhe2FXI7HqqCKAYtqy-sUDE",
  authDomain: "proyectointegrador2-1c1ab.firebaseapp.com",
  projectId: "proyectointegrador2-1c1ab",
  storageBucket: "proyectointegrador2-1c1ab.appspot.com",
  messagingSenderId: "356149005685",
  appId: "1:356149005685:web:8e8c5caf166c41339b973c"
};

// Initialize Firebase
app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()