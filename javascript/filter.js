function filterPosts(){
    var filter = document.getElementById("search").value.toUpperCase();
    var posts = document.getElementsByClassName("post");
    var desc, title;

    for(var i=0;i<posts.length;i++){
        title = posts[i].getElementsByClassName("title")[0].textContent
        desc = posts[i].getElementsByClassName("desc")[0].textContent
        if(title.toUpperCase().indexOf(filter) >-1 ||  desc.toUpperCase().indexOf(filter) >-1){
            posts[i].style.display = "block";
        }else{
            posts[i].style.display = "none";
        }
    }
}

function filterNotifs(){
    var filter = document.getElementById("search").value.toUpperCase();
    var notifs = document.getElementsByClassName("notification");
    var name, content;

    for(var i=0;i<notifs.length;i++){
        name = notifs[i].getElementsByClassName("name")[0].textContent
        content = notifs[i].getElementsByClassName("content")[0].textContent
        if(name.toUpperCase().indexOf(filter) >-1 ||  content.toUpperCase().indexOf(filter) >-1){
            notifs[i].style.display = "flex";
        }else{
            notifs[i].style.display = "none";
        }
    }
}