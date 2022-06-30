// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPemElhX9UQtpoVA5lpZriq7xuE44pRN4",
  authDomain: "freelancer-132db.firebaseapp.com",
  projectId: "freelancer-132db",
  storageBucket: "freelancer-132db.appspot.com",
  messagingSenderId: "207262680997",
  appId: "1:207262680997:web:cb57f09c38a97c9c054a4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;