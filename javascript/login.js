import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref,get, child} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// qtu shkon firebase stuff, nuk i kam qit per shkak te privatsise
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

function addDetails(name,sid,bachelor,email,profile){
    localStorage.setItem("name",name);
    localStorage.setItem("sid",sid);
    localStorage.setItem("bachelor",bachelor);
    localStorage.setItem("email",email);
    localStorage.setItem("profile",profile);
}

const app = initializeApp(firebaseConfig);
const db = ref(getDatabase(app));

var loginButton = document.getElementById("submitButton");

loginButton.addEventListener('click', function(){
    document.getElementById("emptyId").style.display="none";
    document.getElementById("emptyPass").style.display="none";
    document.getElementById("userExist").style.display="none";
    document.getElementById("incoPass").style.display="none";
    var SID = document.getElementById("sid").value;
    var PASS = document.getElementById("pass").value;

    if(SID===""){
        document.getElementById("emptyId").style.display="block"
    }else if(PASS===""){
        document.getElementById("emptyPass").style.display="block"
    }else if(!(SID==="" || PASS==="")){
        get(child(db, `USERS/${SID}`)).then((snapshot) => {
            if (!snapshot.exists()) {
                document.getElementById("userExist").style.display="block"
            } else if (snapshot.exists() && !(snapshot.child("PASS").val()===PASS)){
                document.getElementById("incoPass").style.display="block"
            } else if (snapshot.exists() && snapshot.child("PASS").val()===PASS){
                get(child(db,`USERS/${SID}`)).then(snapshot => {
                    addDetails(
                        snapshot.child("EMRI").val(),
                        snapshot.key,
                        snapshot.child("DREJTIMI").val(),
                        snapshot.child("EMAIL").val(),
                        snapshot.child("PROFILE").val()
                    );
                }).then(promise => {
                    window.location.href="home.html"
                }).catch((er) =>{
                    console.error(er);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }
   
});