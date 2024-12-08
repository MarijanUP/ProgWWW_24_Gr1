import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import { getDatabase, ref as dbRef, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Firebase Config
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
const storage = getStorage(app);
const db = getDatabase(app);

const imgBtn = document.getElementById("profilePic");
const fileInp = document.querySelector('[type="file"]');
const userId = document.getElementById("sid").value.trim();

imgBtn.addEventListener("click", () => fileInp.click());

fileInp.addEventListener("change", () => {
  const file = fileInp.files[0];

  if (file) {
    const fileRef = storageRef(storage, `ProfilePictures/${file.name}`);

    uploadBytes(fileRef, file)
      .then(() => {
        console.log("File uploaded!");
        return getDownloadURL(fileRef);  // e kthen url qe ne mujt me shtu ne firebase
      })
      .then((url) => {
        console.log("File URL:", url);

        imgBtn.src = url;
        localStorage.setItem('profile',url);

        update(dbRef(db, `USERS/${userId}`), { PROFILE: url })
          .then(() => console.log("Profile updated in database"))
          .catch((error) => console.error("Database update failed:", error));
      })
      .catch((error) => console.error("File upload error:", error));
  }
});
