// firebase.js or firebase.ts (if using TypeScript)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA7VXqZumOet6pV7upznbjx_PiZTFMP-Y",
  authDomain: "electronic-cheque.firebaseapp.com",
  projectId: "electronic-cheque",
  storageBucket: "electronic-cheque.firebasestorage.app",
  messagingSenderId: "867235480953",
  appId: "1:867235480953:web:dcda1d1c3d415cf5899ba8",
  measurementId: "G-NZYMKCNWEN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };
