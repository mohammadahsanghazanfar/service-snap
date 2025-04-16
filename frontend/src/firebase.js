// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoDFG4XRA6pMCkeWwYjoABjxbN2fg5EBc",
  authDomain: "ru-novel-images.firebaseapp.com",
  projectId: "ru-novel-images",
  storageBucket: "ru-novel-images.appspot.com",
  messagingSenderId: "690261004979",
  appId: "1:690261004979:web:af048e201834bc913d16c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;