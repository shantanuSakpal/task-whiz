import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwG5m7XztQbiu0u8DEAlxWkqs7xW_soPs",
  authDomain: "iitb-brogrammers.firebaseapp.com",
  databaseURL: "https://iitb-brogrammers-default-rtdb.firebaseio.com",
  projectId: "iitb-brogrammers",
  storageBucket: "iitb-brogrammers.appspot.com",
  messagingSenderId: "948463004294",
  appId: "1:948463004294:web:1ef3ebe905be312ee57f07",
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const auth = getAuth(app);

export { auth, firestore };
