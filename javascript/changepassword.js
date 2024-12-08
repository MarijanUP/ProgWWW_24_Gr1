import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, update,get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCz21d0Tzykamo2rcHJ0-l-qRYSJZ429PM",
  authDomain: "seks-f1000.firebaseapp.com",
  databaseURL: "https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "seks-f1000",
  storageBucket: "seks-f1000.appspot.com",
  messagingSenderId: "1084488790517",
  appId: "1:1084488790517:web:5e885dfa5e2d3839a3f0bc",
  measurementId: "G-KT8PQT8XMT",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



const oldPasswordInput = document.getElementById("old-password");
const changePassButton = document.getElementById("submit");
const passwordInput = document.getElementById("password");
const rptPasswordInput = document.getElementById("rpt-password");

const inputUserID = document.getElementById("sid");


// console.log(userId);

changePassButton.addEventListener("click", (e) => {
  e.preventDefault(); 

  const oldPassword = oldPasswordInput.value.trim();
  const newPassword = passwordInput.value.trim();
  const repeatPassword = rptPasswordInput.value.trim();  
  const userId = inputUserID.value.trim();

  get(ref(db, `USERS/${userId}/PASS`))
  .then(snapshot => {
    if (!snapshot.exists() || oldPassword !== snapshot.val()) {
      alert("Old password is incorrect.");
      return; 
    }

  
  if (newPassword === "" || repeatPassword === "") {
    alert("Please write a password.");
    return;
  }

  if (newPassword !== repeatPassword) {
    alert("The passwords do not match.");
    return;
  }

  update(ref(db, `USERS/${userId}`), { PASS: newPassword })
    .then(() => {
      alert("Password updated successfully.");
      passwordInput.value = "";
      rptPasswordInput.value = "";
      window.location.href= "profile.php";
    })
    .catch((error) => {
      console.error("Error updating password:", error);
      alert("Failed to update password. Please try again.");
    });
  })
 .catch(console.error);
 });
