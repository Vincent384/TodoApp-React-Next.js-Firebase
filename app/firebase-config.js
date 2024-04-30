'use client'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6TE6ARTYrKDu9EniVWQvCYqoth3xjv5Y",
  authDomain: "cms-test-35913.firebaseapp.com",
  projectId: "cms-test-35913",
  storageBucket: "cms-test-35913.appspot.com",
  messagingSenderId: "223857046011",
  appId: "1:223857046011:web:0190d8743e821c84871b5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db