// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-46c31.firebaseapp.com",
  projectId: "mern-auth-46c31",
  storageBucket: "mern-auth-46c31.appspot.com",
  messagingSenderId: "571191416390",
  appId: "1:571191416390:web:8e0026ed3fb33fbc6f1c47"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);