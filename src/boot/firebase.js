import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyAhWDKWtJxW5tQvkp48pxgBytIAB9VNqG4",
  authDomain: "harbison-todo.firebaseapp.com",
  databaseURL: "https://harbison-todo.firebaseio.com",
  projectId: "harbison-todo",
  storageBucket: "harbison-todo.appspot.com",
  messagingSenderId: "105373123155",
  appId: "1:105373123155:web:df2f0ef3fc30f66ce07ca6",
  measurementId: "G-HDZ7JDGHKR"
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()
firebase.analytics()

export { firebaseAuth, firebaseDb }
