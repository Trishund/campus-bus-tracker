import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFqutnSeXCgJmuTFTvvAvS33_TAzTS9XY",
  authDomain: "pondyuni-bus-tracker.firebaseapp.com",
  projectId: "pondyuni-bus-tracker",
  storageBucket: "pondyuni-bus-tracker.firebasestorage.app",
  messagingSenderId: "472382876786",
  appId: "1:472382876786:web:c843227629e6da6ddde6eb",
  measurementId: "G-MDNNY0MZSF",
  databaseURL: "https://pondyuni-bus-tracker-default-rtdb.firebaseio.com" // Inferred from projectId, usually this format
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
