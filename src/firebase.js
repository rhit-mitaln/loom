import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAym_vbTfyb3cRCjZTGjklyEaHD97sSpLs",
    authDomain: "loom-9ad76.firebaseapp.com",
    projectId: "loom-9ad76",
    storageBucket: "loom-9ad76.firebasestorage.app",
    messagingSenderId: "465075501934",
    appId: "1:465075501934:web:0859a97fba760ac3829f7f",
    measurementId: "G-GWB6EXF7MR"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);