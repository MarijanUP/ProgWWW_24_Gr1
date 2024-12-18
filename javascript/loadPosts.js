import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, onValue, onChildRemoved, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

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

var postArray = [];

function getData(post) {
    var nPost = document.createElement("div");
    nPost.id = post.key;
    nPost.className = "post";
    postArray.push(nPost.id);
    document.getElementById("newestPostContainer").prepend(nPost);

    fetch('post.html').then(response => response.text()).then(data => {


        document.getElementById(nPost.id).innerHTML = data;

        document.getElementById('poster').id = "poster" + nPost.id;
        document.getElementById('name').id = "name" + nPost.id;
        document.getElementById('time').id = "time" + nPost.id;
        document.getElementById('title').id = "title" + nPost.id;
        document.getElementById('desc').id = "desc" + nPost.id;
        document.getElementById('uni').id = "uni" + nPost.id;
        document.getElementById('likes').id = "likes" + nPost.id;
        document.getElementById('likeButton').id = "likeButton" + nPost.id;
        document.getElementById('commentButton').id = "commentButton" + nPost.id;
        document.getElementById('commentText').id = "commentText" + nPost.id;
        document.getElementById('comments').id = "comments" + nPost.id;
        document.getElementById('user').id = "user" + nPost.id;

        document.getElementById("poster" + nPost.id).src = "" + post.child("profileURL").val();
        document.getElementById("name" + nPost.id).innerHTML = post.child("poster").val();
        document.getElementById("time" + nPost.id).innerHTML = post.child("posttime").val();
        document.getElementById("title" + nPost.id).innerHTML = post.child("title").val();
        document.getElementById("desc" + nPost.id).innerHTML = post.child("desc").val();
        get(ref(db, "USERS/" + post.child("posterID").val())).then(user => {
            document.getElementById("uni" + nPost.id).innerHTML = user.child("DREJTIMI").val();
        })
        document.getElementById("likes" + nPost.id).innerHTML = post.child("likes").val();
        document.getElementById("comments" + nPost.id).innerHTML = post.child("comments").val();
        document.getElementById("user" + nPost.id).src = localStorage.getItem("profile");
        document.getElementById("mid").style.cursor = "pointer";
        document.getElementById("mid").addEventListener("click", function () {
            window.location.href = "focusedPost.php?postID=" + nPost.id;

        })

    }).then(data => {

        document.getElementById('commentButton' + post.key).addEventListener('click', function () {
            if (document.getElementById('commentText' + post.key).value.trim() === "") {
                console.log('empty comment');
            } else {
                const newCommentRef = push(ref(db, 'POSTS/' + post.key + "/commentSection"));
                var ms = Date.now();
                var d = new Date(ms);
                var time = ('0' + d.getDay()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

                set(newCommentRef, {
                    commentDescription: document.getElementById('commentText' + post.key).value.trim(),
                    commentID: newCommentRef.key,
                    commentLike: 0,
                    commentTime: time,
                    commentTimeStamp: ms,
                    commenterProfileURL: localStorage.getItem('profile'),
                    commentuserID: localStorage.getItem('sid'),
                    commentuserName: localStorage.getItem('name'),
                });

                //nese nuk o postimi yt qoje notification per koment
                if (("" + post.child('posterID').val()) === localStorage.getItem('sid')) {

                } else {
                    const newNotificationRef = push(ref(db, 'USERS/' + post.child('posterID').val() + "/NOTIFICATIONS"))
                    set(newNotificationRef, {
                        notificationOfPost: "" + post.key,
                        notificationSenderID: "" + post.child('posterID').val(),
                        notificationSenderName: localStorage.getItem('name'),
                        notificationSenderProfileURL: localStorage.getItem("profile"),
                        notificationSent: true,
                        notificationSentByID: localStorage.getItem('sid'),
                        notificationText: document.getElementById('commentText' + post.key).value.trim(),
                        notificationTime: time,
                        notificationType: "comment",
                    })
                }


                get(ref(db, 'POSTS/' + post.key)).then(post => {
                    update(ref(db, 'POSTS/' + post.key + "/"), {
                        comments: post.child('comments').val() + 1
                    });
                });


                console.log('commented');
                document.getElementById('commentText' + post.key).value = "";
            }
        })

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

                    //remove like
                    if (like == true) {
                        like = false;
                        remove(userRef)
                        get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                            if (Number(snapshot.val()) > 0) {
                                update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) - 1) });
                            }
                        })

                        //like
                    } else {

                        like = true;
                        set(userRef, " ");
                        get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                            update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) + 1) });
                        })

                        //nese nuk o postimi yt qoje notification per like
                        if (("" + post.child('posterID').val()) === localStorage.getItem('sid')) {

                        } else {
                            var likeNotif = false;
                            get(ref(db, 'USERS/' + post.child('posterID').val())).then(user => {
                                if (user.child('NOTIFICATIONS').exists()) {
                                    user.child("NOTIFICATIONS").forEach(notification => {
                                        if (notification.child("notificationSentByID").val() === localStorage.getItem("sid")) {
                                            likeNotif = true;
                                        }
                                    });
                                }
                            }).then(vazhdo => {
                                if (!likeNotif) {
                                    const newNotificationRef = push(ref(db, 'USERS/' + post.child('posterID').val() + "/NOTIFICATIONS"))
                                    var ms = Date.now();
                                    var d = new Date(ms);
                                    var time = ('0' + d.getDay()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

                                    set(newNotificationRef, {
                                        notificationOfPost: "" + post.key,
                                        notificationSenderID: "" + post.child('posterID').val(),
                                        notificationSenderName: localStorage.getItem('name'),
                                        notificationSenderProfileURL: localStorage.getItem("profile"),
                                        notificationSent: true,
                                        notificationSentByID: localStorage.getItem('sid'),
                                        notificationText: "",
                                        notificationTime: time,
                                        notificationType: "like",
                                    })
                                }
                            })
                        }
                    }

                } else {
                    //like if no users liked before
                    set(ref(db, 'POSTS/' + post.key + "/likedUsers/" + localStorage.getItem("sid")), "");
                    get(ref(db, 'POSTS/' + post.key + "/likes")).then(snapshot => {
                        update(ref(db, 'POSTS/' + post.key), { likes: "" + (Number(snapshot.val()) + 1) });
                    })

                    //nese nuk o postimi yt qoje notification per like
                    if (("" + post.child('posterID').val()) === localStorage.getItem('sid')) {

                    } else {
                        var likeNotif = false;
                        get(ref(db, 'USERS/' + post.child('posterID').val())).then(user => {
                            if (user.child('NOTIFICATIONS').exists()) {
                                user.child("NOTIFICATIONS").forEach(notification => {
                                    if (notification.child("notificationSentByID").val() === localStorage.getItem("sid")) {
                                        likeNotif = true;
                                    }
                                });
                            }
                        }).then(vazhdo => {
                            if (!likeNotif) {
                                const newNotificationRef = push(ref(db, 'USERS/' + post.child('posterID').val() + "/NOTIFICATIONS"))
                                var ms = Date.now();
                                var d = new Date(ms);
                                var time = ('0' + d.getDay()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

                                set(newNotificationRef, {
                                    notificationOfPost: "" + post.key,
                                    notificationSenderID: "" + post.child('posterID').val(),
                                    notificationSenderName: localStorage.getItem('name'),
                                    notificationSenderProfileURL: localStorage.getItem("profile"),
                                    notificationSent: true,
                                    notificationSentByID: localStorage.getItem('sid'),
                                    notificationText: "",
                                    notificationTime: time,
                                    notificationType: "like",
                                })
                            }
                        })
                    }

                }

            }, {
                onlyOnce: true
            })


        });


    }).then(whatever => {
        onValue(startCountRef, posts => {
            posts.forEach((post) => {

                if (post.child("likedUsers").exists()) {
                    var fill = false;

                    post.child("likedUsers").forEach(likedUser => {
                        if (likedUser.key === localStorage.getItem("sid")) {
                            fill = true;
                        }
                    })

                    try {
                        if (fill) {
                            document.getElementById("likeButton" + post.key).style.color = "#1877F2";
                        } else {
                            document.getElementById("likeButton" + post.key).style.color = "grey";
                        }
                    } catch (error) {
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
        });


    }).catch(error => console.error('Error loading post:', error));

    return nPost
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

            try {
                if (fill) {
                    document.getElementById("likeButton" + post.key).style.color = "#1877F2"
                } else {
                    document.getElementById("likeButton" + post.key).style.color = "grey"
                }
            } catch (error) {
            }

        } else {
            try {
                document.getElementById("likeButton" + post.key).style.color = "grey"
            } catch (error) {
            }
        }

        try {
            document.getElementById("likes" + post.key).innerHTML = post.child("likes").val();
            document.getElementById("comments" + post.key).innerHTML = post.child("comments").val();
        } catch (error) {
        }

    });

})

onChildAdded(startCountRef, post => {

    postArray.push(getData(post))

})

onChildRemoved(startCountRef, post => {
    document.getElementById(post.key).remove()
}) 