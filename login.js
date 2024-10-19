// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref,get, child} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = ref(getDatabase(app));

var loginButton = document.getElementById("submitButton");

loginButton.addEventListener('click', function(){
    var SID = document.getElementById("sid").value;
    // console.log(SID+" "+PASS)
    var PASS = document.getElementById("pass").value;

    if(SID===""){
        alert("Student ID is empty!");
    }else if(PASS===""){
        alert("Password is empty!");
    }else{
        get(child(db, `USERS/${SID}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                alert("User does not exist!");
            } else if (snapshot.exists() && !(snapshot.child("PASS").val()===PASS)){
                alert("Incorrect password!");
            } else if (snapshot.exists() && snapshot.child("PASS").val()===PASS){
                window.location.href="home.html"
            }
        }).catch((error) => {
            console.error(error);
        });
    }
   

});

