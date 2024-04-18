// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-6079f.firebaseapp.com",
  projectId: "blog-6079f",
  storageBucket: "blog-6079f.appspot.com",
  messagingSenderId: "886595622840",
  appId: "1:886595622840:web:d10a9a2ae7cb799399614d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
