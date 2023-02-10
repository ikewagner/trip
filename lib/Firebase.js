import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// replace this firebase conFigvariable with your own
const firebaseConfig = {
    apiKey: "AIzaSyBkLpXDoGqHOqEz2HGv_K7BJ9vjSEnjmA8",
    authDomain: "trip-86968.firebaseapp.com",
    projectId: "trip-86968",
    storageBucket: "trip-86968.appspot.com",
    messagingSenderId: "1044264757062",
    appId: "1:1044264757062:web:77c7022d5dd5847db8a747",
    measurementId: "G-DTSNEKDKSR",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };