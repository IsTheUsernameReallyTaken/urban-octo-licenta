import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDruLt8YqOu6IPkw0V2ZSsjy5-FxvicSAE",
    authDomain: "licenta-of.firebaseapp.com",
    projectId: "licenta-of",
    storageBucket: "licenta-of.appspot.com",
    messagingSenderId: "424283543088",
    appId: "1:424283543088:web:5e8fd3561b608093a5fff5"
};

firebase.initializeApp(firebaseConfig);

export default firebase;