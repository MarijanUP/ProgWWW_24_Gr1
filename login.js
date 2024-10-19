import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref,get, child} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// qtu shkon firebase stuff, nuk i kam qit per shkak te privatsise

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
            } else if (snapshot.exists() && !snapshot.child("PASS").val()===PASS){
                alert("Incorrect password!");
            } else if (snapshot.exists() && snapshot.child("PASS").val()===PASS){
                window.location.href="home.html"
            }
        }).catch((error) => {
            console.error(error);
        });
    }
   

});

