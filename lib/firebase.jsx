
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCuMAadP_ff6mXFFePIiCKJYXRNv0eD0s4",
  authDomain: "blog-47482.firebaseapp.com",
  projectId: "blog-47482",
  storageBucket: "blog-47482.appspot.com",
  messagingSenderId: "385868054390",
  appId: "1:385868054390:web:6676f36fa810897f350457",
  measurementId: "G-LZKPE098Z4"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth()
export const db  = getFirestore()
export const storage = getStorage()