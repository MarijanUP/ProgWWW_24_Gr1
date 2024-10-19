import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, onChildAdded , onValue} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

//qtu shkon firebase stuff, nuk i kam qit per shkak te privatesise

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