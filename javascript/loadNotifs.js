import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, child, onChildAdded, onChildRemoved, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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
const startCountRef = ref(db, 'USERS/'+localStorage.getItem('sid')+'/NOTIFICATIONS');

onChildAdded(startCountRef, notif=>{
    addNotif(notif);
})

onChildRemoved(startCountRef, notif=>{
    document.getElementById(notif.key).remove()
})

function addNotif(notif){
    var nNotif = document.createElement("div");
    nNotif.id = notif.key
    nNotif.className = "notification";
    document.getElementById("notiContainer").prepend(nNotif);

    fetch('notif.html').then(response => response.text()).then(data => {
        document.getElementById(nNotif.id).innerHTML = data;

        document.getElementById('pic').id = "pic" + nNotif.id;
        document.getElementById('name').id = "name" + nNotif.id;
        document.getElementById('time').id = "time" + nNotif.id;
        document.getElementById('content').id = "content" + nNotif.id;
        document.getElementById('deleteNotif').id = "deleteNotif" + nNotif.id;


        document.getElementById("pic" + nNotif.id).src = "" + notif.child("notificationSenderProfileURL").val();
        document.getElementById("name" + nNotif.id).innerHTML = notif.child("notificationSenderName").val();
        document.getElementById("time" + nNotif.id).innerHTML = notif.child("notificationTime").val();

        if(notif.child("notificationType").val()==="comment"){
            document.getElementById("content" + nNotif.id).innerHTML = notif.child("notificationText").val();
        }else{
            document.getElementById("content" + nNotif.id).innerHTML = "Liked your post!";
        }

        document.getElementById('deleteNotif'+ nNotif.id).addEventListener('click', function (){
            deleteNotif(nNotif.id);
        })
    })
}
    
function clearNotifs(){
    get(child(ref(db, 'USERS/'+localStorage.getItem('sid')),"NOTIFICATIONS")).then((snapshot) =>{
        if(snapshot.exists()){
            remove(startCountRef);
        }
    }) 
}

function deleteNotif(id){
   remove(child(startCountRef, id));
}

document.getElementById("clear").addEventListener("click", clearNotifs);


