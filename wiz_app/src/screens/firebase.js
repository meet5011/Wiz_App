// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
//import 'firebase/compat/firestore';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7zfS7vRtz-FHRy2wIz_TtAyQ2fVYjEjA",
  authDomain: "otp-demo-4c703.firebaseapp.com",
  projectId: "otp-demo-4c703",
  storageBucket: "otp-demo-4c703.appspot.com",
  messagingSenderId: "530725884282",
  appId: "1:530725884282:web:2cf5bcf087e1aa42c886c3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;