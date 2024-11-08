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