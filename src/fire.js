// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get ,child,set, query, orderByChild } from "firebase/database";
import { getAuth } from "firebase/auth"
import {useState} from "react";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyDQQJ9RAugEJaWWaeB3hniPshKaQuMBE",
  authDomain: "epm-xamarin-2b378.firebaseapp.com",
  databaseURL: "https://epm-xamarin-2b378-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "epm-xamarin-2b378",
  storageBucket: "epm-xamarin-2b378.appspot.com",
  messagingSenderId: "616848277653",
  appId: "1:616848277653:web:b3e4fd3223f054d86bdb9c",
  measurementId: "G-4WYJJQ2WEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth = getAuth(app);

export function UpdateUsers(){

  set(ref(database, 'users/'), {
    username: "name",
    email: "email"
  });

}