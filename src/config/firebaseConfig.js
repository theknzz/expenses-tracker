import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCcUn0ITIZ9mqiZEzUMbvjOg4yABvnIJJc",
    authDomain: "expenses-tracker-knzz.firebaseapp.com",
    databaseURL: "https://expenses-tracker-knzz.firebaseio.com",
    projectId: "expenses-tracker-knzz",
    storageBucket: "expenses-tracker-knzz.appspot.com",
    messagingSenderId: "681762464055",
    appId: "1:681762464055:web:a0a3db600eb61c5a3a3ab2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase