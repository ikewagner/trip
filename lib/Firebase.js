// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBkLpXDoGqHOqEz2HGv_K7BJ9vjSEnjmA8",
    authDomain: "trip-86968.firebaseapp.com",
    projectId: "trip-86968",
    storageBucket: "trip-86968.appspot.com",
    messagingSenderId: "1044264757062",
    appId: "1:1044264757062:web:77c7022d5dd5847db8a747",
    measurementId: "G-DTSNEKDKSR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();