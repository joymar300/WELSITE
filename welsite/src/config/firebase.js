// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {doc, getDoc, getFirestore} from "firebase/firestore"
import {getStorage} from"firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0av6DjjFMkrcsLgUxSXem0vRYmm6NY1E",
  authDomain: "welsite.firebaseapp.com",
  projectId: "welsite",
  storageBucket: "welsite.appspot.com",
  messagingSenderId: "752905568879",
  appId: "1:752905568879:web:7fecfd39790c06246dc39a",
  measurementId: "G-0414M7H0G1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);

export async function userExist (uId){
  const docRef = doc(db, 'users' , uId);
  const res = await getDoc(docRef);
  console.log(res);
  return res.exists();
}