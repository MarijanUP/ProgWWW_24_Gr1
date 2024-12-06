import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, remove, set, update, onValue, get, onChildAdded, onChildRemoved, push } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";


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
const startCountRef = ref(db, 'POSTS/' + postID + "/commentSection");

if (!postID) {

} else {
  const postRef = ref(db, `POSTS/${postID}`);
  get(postRef).then(snapshot => {
    if (snapshot.exists()) {
      const post = snapshot.val();
      renderPost(post);
    } else {
    }
  });
}




function renderPost(post) {

  fetch('post.html').then(response => response.text()).then(data => {
    document.getElementById('post').innerHTML = data;

    document.getElementById("user").src = localStorage.getItem("profile");
    document.getElementById("poster").src = "" + post.profileURL;
    document.getElementById("name").innerHTML = post.poster;
    document.getElementById("time").innerHTML = post.posttime;
    document.getElementById("title").innerHTML = post.title;
    document.getElementById("desc").innerHTML = post.desc;
    get(ref(db, "USERS/" + post.posterID)).then(user => {
      document.getElementById("uni").innerHTML = user.child('DREJTIMI').val();
    });
    document.getElementById("likes").innerHTML = post.likes
    document.getElementById("comments").innerHTML = post.comments


  }).then(oops => {

    document.getElementById('commentButton').addEventListener('click', function () {
      if (document.getElementById('commentText').value.trim() === "") {
        console.log('empty comment');
      } else {
        const newCommentRef = push(ref(db, 'POSTS/' + postID + "/commentSection"));
        var ms = Date.now();
        var d = new Date(ms);
        var time = ('0' + d.getDay()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

        set(newCommentRef, {
          commentDescription: document.getElementById('commentText').value.trim(),
          commentID: newCommentRef.key,
          commentLike: 0,
          commentTime: time,
          commentTimeStamp: ms,
          commenterProfileURL: localStorage.getItem('profile'),
          commentuserID: localStorage.getItem('sid'),
          commentuserName: localStorage.getItem('name'),
        });

        //nese nuk o postimi yt qoje notification per koment
        if (("" + post.posterID) === localStorage.getItem('sid')) {

        } else {
          const newNotificationRef = push(ref(db, 'USERS/' + post.posterID + "/NOTIFICATIONS"))
          set(newNotificationRef, {
            notificationOfPost: "" + postID,
            notificationSenderID: "" + post.posterID,
            notificationSenderName: localStorage.getItem('name'),
            notificationSenderProfileURL: localStorage.getItem("profile"),
            notificationSent: true,
            notificationSentByID: localStorage.getItem('sid'),
            notificationText: document.getElementById('commentText').value.trim(),
            notificationTime: time,
            notificationType: "comment",
          })
        }

        get(ref(db, 'POSTS/' + postID)).then(post => {
          update(ref(db, 'POSTS/' + postID + "/"), {
            comments: post.child('comments').val() + 1
          });
        });
        console.log('commented');
        document.getElementById('commentText').value = "";
      }
    })

    document.getElementById("likeButton").addEventListener('click', function () {
      const postLikesRef = ref(db, 'POSTS/' + postID + "/");

      var like = false;

      onValue(postLikesRef, post => {
        if (post.child("likedUsers").exists()) {
          var userRef = ref(db, 'POSTS/' + postID + "/likedUsers/" + localStorage.getItem("sid") + "/");

          post.child("likedUsers").forEach(user => {
            if (user.key === localStorage.getItem("sid")) {
              like = true;
            }
          })

          if (like == true) {
            like = false;
            remove(userRef)
            get(ref(db, 'POSTS/' + postID + "/likes")).then(snapshot => {
              if (Number(snapshot.val()) > 0) {
                update(ref(db, 'POSTS/' + postID), { likes: "" + (Number(snapshot.val()) - 1) });
              }
            })
          } else {
            like = true;
            set(userRef, " ");
            get(ref(db, 'POSTS/' + postID + "/likes")).then(snapshot => {
              update(ref(db, 'POSTS/' + postID), { likes: "" + (Number(snapshot.val()) + 1) });
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
          set(ref(db, 'POSTS/' + postID + "/likedUsers/" + localStorage.getItem("sid")), "");
          get(ref(db, 'POSTS/' + postID + "/likes")).then(snapshot => {
            update(ref(db, 'POSTS/' + postID), { likes: "" + (Number(snapshot.val()) + 1) });
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
    onValue(ref(db, `POSTS/${postID}`), post => {
      if (post.child('commentSection').exists()) {

        document.getElementById('comments').innerHTML = Object.keys(post.child("commentSection").val()).length;

        if (post.child("likedUsers").exists()) {
          var fill = false;

          post.child("likedUsers").forEach(likedUser => {
            if (likedUser.key === localStorage.getItem("sid")) {
              fill = true;
            }
          })

          try {
            if (fill) {
              document.getElementById("likeButton").style.color = "#1877F2";
            } else {
              document.getElementById("likeButton").style.color = "grey";
            }
          } catch (error) {
          }

        }
      }
    });
  }).catch(error => {
    console.log(error);
  });

}

const startPostRef = ref(db, 'POSTS/');

onValue(startPostRef, post => {

  if (post.child(postID).child("likedUsers").exists()) {
    var fill = false;

    post.child(postID).child("likedUsers").forEach(likedUser => {
      if (likedUser.key === localStorage.getItem("sid")) {
        fill = true;
      }
    })

    try {
      if (fill) {
        document.getElementById("likeButton").style.color = "#1877F2"
      } else {
        document.getElementById("likeButton").style.color = "grey"
      }
    } catch (error) {
    }

  } else {
    try {
      document.getElementById("likeButton").style.color = "grey"
    } catch (error) {
    }
  }

  try {
    document.getElementById("likes").innerHTML = post.child(postID).child("likes").val();
    document.getElementById("comments").innerHTML = post.child(postID).child("comments").val();
  } catch (error) {
  }

});

onChildAdded(startCountRef, comment => {
  addComment(comment);
})

onChildRemoved(startCountRef, comment => {
  document.getElementById(comment.key).remove()
})

function addComment(comment) {
  var nComment = document.createElement("div");
  nComment.id = comment.key
  nComment.className = 'comment';
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

