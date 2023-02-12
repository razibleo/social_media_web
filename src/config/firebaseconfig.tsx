import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseconfig from "../firebase.json";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: firebaseconfig["apiKey"],
  authDomain: firebaseconfig["authDomain"],
  projectId: firebaseconfig["projectId"],
  storageBucket: firebaseconfig["storageBucket"],
  messagingSenderId: firebaseconfig["messagingSenderId"],
  appId: firebaseconfig["appId"],
  measurementId: firebaseconfig["measurementId"],
};

// Initialize Firebase
export const firebaseapp = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebaseapp);
const analytics = getAnalytics(firebaseapp);
