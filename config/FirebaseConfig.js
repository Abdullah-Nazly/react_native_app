// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcbIOAdjBuHDI4d9lySvSC71rooIeIUJA",
  authDomain: "my-app-bd9bc.firebaseapp.com",
  projectId: "my-app-bd9bc",
  storageBucket: "my-app-bd9bc.appspot.com",
  messagingSenderId: "698667619645",
  appId: "1:698667619645:web:8a6eb052afe143e9b7a154",
  measurementId: "G-WBXHS54ERD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);
// const analytics = getAnalytics(app);