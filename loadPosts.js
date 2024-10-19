// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onChildAdded , onValue} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
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

const db = getDatabase(app);
const startCountRef = ref(db, 'POSTS/');

onValue(startCountRef, posts => {
    posts.forEach((post)=>{
        var nPost = document.createElement("div");
        nPost.id = post.key;
        document.getElementById("postContainer").prepend(nPost);

        fetch('post.html').then(response => response.text()).then(data=>{
                document.getElementById(nPost.id).innerHTML = data;

                document.getElementById('poster').id = "poster"+nPost.id;
                document.getElementById('name').id = "name"+nPost.id;
                document.getElementById('title').id = "title"+nPost.id;
                document.getElementById('desc').id = "desc"+nPost.id;
                document.getElementById('time').id = "time"+nPost.id;
                document.getElementById('likes').id = "likes"+nPost.id;
                document.getElementById('comments').id = "comments"+nPost.id;

                document.getElementById("poster"+nPost.id).src =""+ post.child("profileURL").val();
                document.getElementById("name"+nPost.id).innerHTML = post.child("poster").val();
                document.getElementById("title"+nPost.id).innerHTML = post.child("title").val();
                document.getElementById("desc"+nPost.id).innerHTML = post.child("desc").val();
                document.getElementById("time"+nPost.id).innerHTML = post.child("posttime").val();
                document.getElementById("likes"+nPost.id).innerHTML = post.child("likes").val();
                document.getElementById("comments"+nPost.id).innerHTML = post.child("comments").val();
            })
        .catch(error => console.error('Error loading post:', error));

    });
}, {
    onlyOnce:true
});

onValue(startCountRef, posts =>{
    posts.forEach((post)=>{
        try{
            document.getElementById("likes"+post.key).innerHTML = post.child("likes").val();
            document.getElementById("comments"+post.key).innerHTML = post.child("comments").val();
        }catch(error){
        }
        
    });
});

onChildAdded(startCountRef, post=>{
    var nPost = document.createElement("div");
        nPost.id = post.key;
        document.getElementById("postContainer").prepend(nPost);

        fetch('post.html').then(response => response.text()).then(data=>{
            document.getElementById(nPost.id).innerHTML = data;

            document.getElementById('poster').id = "poster"+nPost.id;
            document.getElementById('name').id = "name"+nPost.id;
            document.getElementById('title').id = "title"+nPost.id;
            document.getElementById('desc').id = "desc"+nPost.id;
            document.getElementById('time').id = "time"+nPost.id;
            document.getElementById('likes').id = "likes"+nPost.id;
            document.getElementById('comments').id = "comments"+nPost.id;

            document.getElementById("poster"+nPost.id).src =""+ post.child("profileURL").val();
            document.getElementById("name"+nPost.id).innerHTML = post.child("poster").val();
            document.getElementById("title"+nPost.id).innerHTML = post.child("title").val();
            document.getElementById("desc"+nPost.id).innerHTML = post.child("desc").val();
            document.getElementById("time"+nPost.id).innerHTML = post.child("posttime").val();
            document.getElementById("likes"+nPost.id).innerHTML = post.child("likes").val();
            document.getElementById("comments"+nPost.id).innerHTML = post.child("comments").val();
        })
        .catch(error => console.error('Error loading post:', error));
})