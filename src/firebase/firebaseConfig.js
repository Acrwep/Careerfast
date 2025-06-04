// File: firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoLvJnxu15PbJe0EKq02PdumEPXhDMDBw",
  authDomain: "markerzjobportal.firebaseapp.com",
  projectId: "markerzjobportal",
  storageBucket: "markerzjobportal.firebasestorage.app",
  messagingSenderId: "437652759709",
  appId: "1:437652759709:web:a9c77d0cf984ed1da6a074",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
