// import * as firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

// import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBHV7FRa5hHyPUiqVji88Dg7QMBkDNdcb8",
    authDomain: "chat-app-1b31f.firebaseapp.com",
    projectId: "chat-app-1b31f",
    storageBucket: "chat-app-1b31f.appspot.com",
    messagingSenderId: "991213084386",
    appId: "1:991213084386:web:cf419cb1fc8c545da7c8bb",
    measurementId: "G-Z9HC8PCH3R"
  };

  let app;
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = firebase.firestore();
  const auth = firebase.auth();

  export { db, auth };