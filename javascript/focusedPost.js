import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onValue, get, onChildAdded,onChildRemoved} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";


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


const urlParams = new URLSearchParams(window.location.search);
const postID = urlParams.get("postID");

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const startCountRef = ref(db, 'POSTS/'+postID+"/commentSection");


if (!postID) {

} else {
  const postRef = ref(db, `POSTS/${postID}`);
  onValue(postRef, (snapshot) => {
    if (snapshot.exists()) {
      const post = snapshot.val();
      renderPost(post, snapshot.key);
    } else {
      
    }
  });
}

function renderPost(post, key) {
  const container = document.getElementById("container");

  //profili
  document.getElementById("poster").src = post.profileURL;
  document.getElementById("name").innerText = post.poster;
  document.getElementById("time").innerText = post.posttime;

  //post details
  document.getElementById("title").innerText = post.title ;
  document.getElementById("desc").innerText = post.desc ;

  const userRef = ref(db, `USERS/${post.posterID}`);

  get(userRef).then((userSnap) => {
    if (userSnap.exists()) {
      document.getElementById("uni").innerText = userSnap.val().DREJTIMI ;
    } else {
      document.getElementById("uni").innerText;
    }
  });
  document.getElementById("likes").innerText = post.likes;
  document.getElementById("comments").innerText = post.comments;
}
  
  
  console.log(postID);
  
  
  onChildAdded(startCountRef, comment=>{
    addComment(comment);
  })
  
  onChildRemoved(startCountRef, comment=>{
    document.getElementById(comment.key).remove()
  })
  
  function addComment(comment){
    var nComment = document.createElement("div");
    nComment.id = comment.key
    nComment.className = "comment";
    document.getElementById("commentSection").prepend(nComment);
  
    fetch('comment.html').then(response => response.text()).then(data => {
        document.getElementById(nComment.id).innerHTML = data;
  
        document.getElementById('commentPic').id = "commentPic" + nComment.id;
        document.getElementById('commentName').id = "commentName" + nComment.id;
        document.getElementById('commentTime').id = "commentTime" + nComment.id;
        document.getElementById('content').id = "content" + nComment.id;
  
  
        document.getElementById("commentPic" + nComment.id).src = "" + comment.child("commenterProfileURL").val();
        document.getElementById("commentName" + nComment.id).innerHTML = comment.child("commentuserName").val();
        document.getElementById("commentTime" + nComment.id).innerHTML = comment.child("commentTime").val();
        document.getElementById("content" + nComment.id).innerHTML = comment.child("commentDescription").val();
  
    })
  }
      