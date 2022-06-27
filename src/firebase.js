import firebase from "firebase/compat/app"
import {getApp} from "firebase/app"
import getAuth from "firebase/auth"
import {getStorage} from "firebase/storage"
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBbol2sbCfQaw8EoZvipNRIMivhQi_4dpE",
  authDomain: "chello4.firebaseapp.com",
  projectId: "chello4",
  storageBucket: "chello4.appspot.com",
  messagingSenderId: "463324528454",
  appId: "1:463324528454:web:3a62c09ef144478601af47"
})

export const auth = app.getAuth
export default app
// const firebaseApp = getApp();
// const storage = getStorage(firebaseApp, "gs://chelloo-bb68e.appspot.com");
// const database = getDatabase(app);