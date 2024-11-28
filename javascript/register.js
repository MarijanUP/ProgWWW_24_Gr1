import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onChildAdded, onValue, onChildRemoved, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

//qtu shkon firebase stuff, nuk i kam qit per shkak te privatesise
const firebaseConfig = {
    apiKey: "AIzaSyCz21d0Tzykamo2rcHJ0-l-qRYSJZ429PM",
    authDomain: "seks-f1000.firebaseapp.com",
    databaseURL: "https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "seks-f1000",
    storageBucket: "seks-f1000.appspot.com",
    messagingSenderId: "1084488790517",
    appId: "1:1084488790517:web:5e885dfa5e2d3839a3f0bc",
    measurementId: "G-KT8PQT8XMT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const startCountRef = ref(db, 'USERS/');




