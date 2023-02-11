import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseconfig from "../firebase.json";
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
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
