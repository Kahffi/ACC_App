// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "acc-monitoring.firebaseapp.com",
  projectId: "acc-monitoring",
  storageBucket: "acc-monitoring.firebasestorage.app",
  messagingSenderId: "381226610616",
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

// Export authentication and database services
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
