// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJt3j3tOxiEPsbf5amaCHqKdqVopjx--k",
    authDomain: "imagecommunity-aabf8.firebaseapp.com",
    projectId: "imagecommunity-aabf8",
    storageBucket: "imagecommunity-aabf8.appspot.com",
    messagingSenderId: "395005360391",
    appId: "1:395005360391:web:b60a4f853dccb92b44ada2",
    measurementId: "G-W4ZVXNB98E"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

export { auth };