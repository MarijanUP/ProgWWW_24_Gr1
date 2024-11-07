function loadProfile(){
    document.getElementById("name").innerHTML=localStorage.getItem("name");
    document.getElementById("sid").innerHTML=localStorage.getItem("sid");
    document.getElementById("bachelor").innerHTML=localStorage.getItem("bachelor");
    document.getElementById("email").innerHTML=localStorage.getItem("email");
    document.getElementById("profilePic").src=localStorage.getItem("profile");
}