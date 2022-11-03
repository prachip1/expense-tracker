// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase,ref,set} from "firebase/database";

import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0Mk8Tai5_F3x5mg2uTJMW_iGXFUWHo_o",
  authDomain: "expense-tracker-1ff96.firebaseapp.com",
  projectId: "expense-tracker-1ff96",
  storageBucket: "expense-tracker-1ff96.appspot.com",
  messagingSenderId: "189395091402",
  appId: "1:189395091402:web:2da25229b342dc992d5933",
  measurementId: "G-K2NT8RKDFZ"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth(fire);
const database = getDatabase(fire)

export {fire, auth,database};