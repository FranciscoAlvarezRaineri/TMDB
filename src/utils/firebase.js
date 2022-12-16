// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDabb-d0VsJKZZM2OTepxFDIwdVm_7Ufl8",
  authDomain: "tmdb-ecf2d.firebaseapp.com",
  projectId: "tmdb-ecf2d",
  storageBucket: "tmdb-ecf2d.appspot.com",
  messagingSenderId: "880155721381",
  appId: "1:880155721381:web:4da1c0ac791c8c7384574c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const createUser = (email, password, name, lastname) =>
  createUserWithEmailAndPassword(auth, email, password).then((response) =>
    addDoc(collection(db, "users"), {
      name,
      lastname,
      email,
      favorites: [],
      userUID: response.user.uid,
    }).then(() => {
      return { email, name, lastname };
    })
  );

const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export { createUser, signIn };
