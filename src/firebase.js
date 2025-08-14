// src/firebase.js
import { initializeApp } from "firebase/app";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
const firebaseConfig = {
 apiKey: "AIzaSyADa5cKKJhZFQalyWDi7nAQF-VaNBM8BEI",
  authDomain: "healia-517e1.firebaseapp.com",
  projectId: "healia-517e1",
  storageBucket: "healia-517e1.firebasestorage.app",
  messagingSenderId: "559781993519",
  appId: "1:559781993519:web:ae34ab002b7d38e68cbada",
  measurementId: "G-3W9RJYTN9G"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google login provider
const provider = new GoogleAuthProvider();

// Named exports (these must exist for your header to import them)
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logoutUser = () => signOut(auth);
export const functions = getFunctions(app);