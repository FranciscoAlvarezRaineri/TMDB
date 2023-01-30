// Importar las funciones de firebase y los modelos

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { User, userConverter } from "./User";

// Configurar de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyDabb-d0VsJKZZM2OTepxFDIwdVm_7Ufl8",
  authDomain: "tmdb-ecf2d.firebaseapp.com",
  projectId: "tmdb-ecf2d",
  storageBucket: "tmdb-ecf2d.appspot.com",
  messagingSenderId: "880155721381",
  appId: "1:880155721381:web:4da1c0ac791c8c7384574c",
};

// Inicializar de los servicios de Firebase:

const app = initializeApp(firebaseConfig); // Inicializa la "app" Firebase.
const auth = getAuth(app); // Inicializa los servicios de auth.
// firebase.auth().useDeviceLanguage(); // Acivate to set language

const db = getFirestore(app); // Inicializa los servicios de la base de datos Firestore.

const users = collection(db, "users"); // Inicializa la colección en la base de datos para los usuarios.

// Definir las funciones que se exportan para usar en el front:

// Función para crear un nuevo usuario, paso a paso:
// "createUserWithEmailAndPassword()" es una función de Auth para generar un nuevo usuario con email y contraseña.
// Pero Auth no es una base de datos tradicional. Solo guarda un set de datos del usuario mínimo y fijo. Email, contraseña, log de conexiones y no mucho más.
// La solución es crear una colección en la base de datos donde guardar los demás datos del usuario y relacionarla.
// La relación que está implementada es la más sencilla, pero también más "suave". Se guarda un documento cuyo id coincide con la uid del usuario en Auth.
// "setDoc()" es una función de firestore para guardar nuevos documentos en la base de datos.
// "setDoc()" toma como argumentos: (1.) la función "doc()" con (2.) el conversor "withConverter()" y (3.) los datos a guardar.
// 1. "doc()" toma como argumentos la colección donde guardar y la id del documento (en este caso es la uid del usuario que viene en la respuesta de Auth).
// 2. "withConverter()" es necesaria porque la estructura de los datos en firestore no es excatamente un objeto de JavasCript ni un JSON.
// Por eso, es necesario instanciar un "modelo" de cómo es el objeto con el que el resto de nuestra app trabaja.
// Antes de guardarlo y despues de requerirlo, "withConverter()" lo convierte a la estructura de firebase.
// 3. Los datos a guardar son una nueva instancia del modelo del objeto User, definido en "./User.js", con los datos pasados por parámetro.
// Firestore por defecto no devuelve el nuevo documento creado, por lo que hay que buscarlo para devolverlo al front.
// "getDoc()" es una función de firestore para pedir documentos a la base de datos. Tiene una estructura similar a "setDoc()".
// Aplicación:
const createUser = (email, password, name, lastname) =>
  createUserWithEmailAndPassword(auth, email, password).then((response) =>
    setDoc(
      doc(users, response.user.uid).withConverter(userConverter),
      new User(name, lastname, email, [])
    )
      .then(() =>
        getDoc(doc(users, response.user.uid).withConverter(userConverter)).then(
          (response) => response.data()
        )
      )
      .catch((err) => console.log(err))
  );

// Función para hacer un signIn con email y password y devolver el objeto usuario en la base de datos.
const getCurrentUser = () => auth.currentUser;

const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((response) =>
      getDoc(doc(users, response.user.uid).withConverter(userConverter)).then(
        (response) => response.data()
      )
    )
    .catch((err) => console.log(err));

export { createUser, signIn, getCurrentUser };
