// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDgEDObnyJfbr3qvTYb_nDGOyfbXvfBG0",
  authDomain: "developerlook-to-do.firebaseapp.com",
  projectId: "developerlook-to-do",
  storageBucket: "developerlook-to-do.firebasestorage.app",
  messagingSenderId: "283456078872",
  appId: "1:283456078872:web:28a4e51b0dbdb57480ef6d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth