import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  // collection,
  // onSnapshot,
  // addDoc,
  // deleteDoc,
  doc,
  // query,
  // where,
  // orderBy,
  // serverTimestamp,
  // updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import _ from "lodash";

// import { Data, FirebaseUser, FIREBASE_DOCUMENT, KEY, PAGE_SLUG_PL, TECHNICAL_PAGE_SLUG } from "../app/types";
// import {
//   getBooleanValue,
//   getItem,
//   getStringItem,
//   setBooleanValue,
//   setItem,
//   setStringItem,
//   tryToParseJson,
// } from "./js-utils";

// firebase
const firebaseConfig = {
  apiKey: "AIzaSyB5URsFrQos2JW2psYkja9f84m-Kn-Caaw",
  authDomain: "prawojazdy-a20bd.firebaseapp.com",
  projectId: "prawojazdy-a20bd",
  storageBucket: "prawojazdy-a20bd.appspot.com",
  messagingSenderId: "706828517872",
  appId: "1:706828517872:web:56c06206eefeb42cfedd35",
};
// init firebase
initializeApp(firebaseConfig);

const db = getFirestore();
export const auth = getAuth();

export const _logoutUser = () => signOut(auth);
