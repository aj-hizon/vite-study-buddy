import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBoKK-ie8uEkYYyFMT6DN--sWnljvdBSEU",
  authDomain: "study-buddy-d334d.firebaseapp.com",
  projectId: "study-buddy-d334d",
  storageBucket: "study-buddy-d334d.firebasestorage.app",
  messagingSenderId: "975726583471",
  appId: "1:975726583471:web:6d2e55db4e60cd27a0be5a",
  measurementId: "G-LYFPN635HS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();

export {
  app,
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  collection,
  addDoc,
  db,
  serverTimestamp,
  setDoc,
  doc,
  ref,
  storage,
  getDoc,
};
