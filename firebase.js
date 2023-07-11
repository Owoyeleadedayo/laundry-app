import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA_6RP9drO4_61fdyHfV3Em9JSh1UsK4mg",
  authDomain: "laundry-app-bd2ca.firebaseapp.com",
  projectId: "laundry-app-bd2ca",
  storageBucket: "laundry-app-bd2ca.appspot.com",
  messagingSenderId: "904847209203",
  appId: "1:904847209203:web:b844c6505e8deafe4ebd86"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};