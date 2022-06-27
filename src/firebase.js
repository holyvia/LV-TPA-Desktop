import firebase from "firebase/compat/app"
import {getApp} from "firebase/app"
import getAuth from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDrnXRKuGV4nvgPF0-8yMaQeIltU-Prwas",
  authDomain: "newchello-1dcbe.firebaseapp.com",
  projectId: "newchello-1dcbe",
  storageBucket: "newchello-1dcbe.appspot.com",
  messagingSenderId: "563861028484",
  appId: "1:563861028484:web:ca1d092327b854c2fcccd1"
})

export const auth = app.getAuth
export default app
// const firebaseApp = getApp();
// const storage = getStorage(firebaseApp, "gs://chelloo-bb68e.appspot.com");
// const database = getDatabase(app);