// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.EXPO_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "tripper-06.firebaseapp.com",
  projectId: "tripper-06",
  storageBucket: "tripper-06.firebasestorage.app",
  messagingSenderId: "538383093799",
  appId: "1:538383093799:web:18aa3d391d74901dc87e02",
  measurementId: "G-BT15PECDEP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
