// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ54XJ8wvks2zoTXFzyrtR46-79AYPhWY",
  authDomain: "project-vat.firebaseapp.com",
  projectId: "project-vat",
  storageBucket: "project-vat.appspot.com",
  messagingSenderId: "387964156110",
  appId: "1:387964156110:web:709eb626b4b7f3974cb89f",
  measurementId: "G-EWRT2FWQMV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
