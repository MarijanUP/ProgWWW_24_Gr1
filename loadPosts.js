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
const startCountRef = ref(db, 'POSTS/');

function getData(post){
    var nPost = document.createElement("div");
        nPost.id = post.key;
        nPost.className = "post";
        document.getElementById("newestPostContainer").prepend(nPost);

        fetch('post.html').then(response => response.text()).then(data => {
            document.getElementById(nPost.id).innerHTML = data;

            document.getElementById('poster').id = "poster" + nPost.id;
            document.getElementById('name').id = "name" + nPost.id;
            document.getElementById('title').id = "title" + nPost.id;
            document.getElementById('desc').id = "desc" + nPost.id;
            document.getElementById('uni').id = "uni" + nPost.id;
            document.getElementById('time').id = "time" + nPost.id;
            document.getElementById('likes').id = "likes" + nPost.id;
            document.getElementById('likeButton').id = "likeButton" + nPost.id;
            document.getElementById('comments').id = "comments" + nPost.id;
            document.getElementById('user').id = "user" + nPost.id;

            document.getElementById("poster" + nPost.id).src = "" + post.child("profileURL").val();
            document.getElementById("name" + nPost.id).innerHTML = post.child("poster").val();
            document.getElementById("title" + nPost.id).innerHTML = post.child("title").val();
            document.getElementById("desc" + nPost.id).innerHTML = post.child("desc").val();
            document.getElementById("time" + nPost.id).innerHTML = post.child("posttime").val();
            get(ref(db, "USERS/" + post.child("posterID").val())).then(user => {
                document.getElementById("uni" + nPost.id).innerHTML = user.child("DREJTIMI").val();
            })
            document.getElementById("likes" + nPost.id).innerHTML = post.child("likes").val();
            document.getElementById("comments" + nPost.id).innerHTML = post.child("comments").val();
            document.getElementById("user" + nPost.id).src = localStorage.getItem("profile");


        })
            .then(data => {
                document.getElementById("likeButton" + post.key).addEventListener('click', function () {
                    const postLikesRef = ref(db, 'POSTS/' + post.key + "/");

                    var like = false;

                    onValue(postLikesRef, post => {
                        if (post.child("likedUsers").exists()) {
                            var userRef = ref(db, 'POSTS/' + post.key + "/likedUsers/" + localStorage.getItem("sid") + "/");

                            post.child("likedUsers").forEach(user => {
                                if (user.key === localStorage.getItem("sid")) {
                                    like = true;
                                }
                            })

                            if (like == true) {
                                like = false;
                                remove(userRef)
                                get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                                    if (Number(snapshot.val()) > 0) {
                                        update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) - 1) });
                                    }
                                })
                            } else {
                                like = true;
                                set(userRef, " ");
                                get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                                    update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) + 1) });
                                })
                            }

                        } else {
                            set(ref(db, 'POSTS/' + post.key + "/likedUsers/" + localStorage.getItem("sid")), "");
                            get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                                update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) + 1) });
                            })
                        }
                    }, {
                        onlyOnce: true
                    })


                });

                onValue(startCountRef, posts => {
                    posts.forEach((post) => {

                        if (post.child("likedUsers").exists()) {
                            var fill = false;

                            post.child("likedUsers").forEach(likedUser => {
                                if (likedUser.key === localStorage.getItem("sid")) {
                                    fill = true;
                                }
                            })

                            if (fill) {
                                document.getElementById("likeButton" + post.key).src = "catchup/filledthumbsup.png"
                            } else {
                                document.getElementById("likeButton" + post.key).src = "catchup/blankthumbsup.png"
                            }
                        }

                        try {
                            document.getElementById("likes" + post.key).innerHTML = post.child("likes").val();
                            document.getElementById("comments" + post.key).innerHTML = post.child("comments").val();
                        } catch (error) {
                        }

                    });

                }, {
                    onlyOnce: true
                })


            }).catch(error => console.error('Error loading post:', error));
}

onValue(startCountRef, posts => {
    posts.forEach((post) => {

        if (post.child("likedUsers").exists()) {
            var fill = false;

            post.child("likedUsers").forEach(likedUser => {
                if (likedUser.key === localStorage.getItem("sid")) {
                    fill = true;
                }
            })

            if (fill) {
                document.getElementById("likeButton" + post.key).src = "catchup/filledthumbsup.png"
            } else {
                document.getElementById("likeButton" + post.key).src = "catchup/blankthumbsup.png"
            }
        }else{
            document.getElementById("likeButton" + post.key).src = "catchup/blankthumbsup.png"
        }

        try {
            document.getElementById("likes" + post.key).innerHTML = post.child("likes").val();
            document.getElementById("comments" + post.key).innerHTML = post.child("comments").val();
        } catch (error) {
        }

    });

})

onChildAdded(startCountRef, post => {
    getData(post);
})

onChildRemoved(startCountRef, post => {
    document.getElementById(post.key).remove()
}) 