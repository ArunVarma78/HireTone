import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3mo1JedEAoW5mzOvXceJF6xufD05RgTQ",
  authDomain: "hiretone-9b9a4.firebaseapp.com",
  projectId: "hiretone-9b9a4",
  storageBucket: "hiretone-9b9a4.firebasestorage.app",
  messagingSenderId: "37156929468",
  appId: "1:37156929468:web:c9d5a38773c99c705e35b9",
  measurementId: "G-WHJJT1V98E",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
