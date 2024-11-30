function loadLHeader(){
    fetch('loggedheader.html').then(response => response.text()).then(data=> {
        document.getElementById('header').innerHTML = data;
        if(localStorage.getItem('mode')==='dark'){
            document.body.classList.toggle('darkmode');
            document.getElementById('headerLogo').src='catchup/wLogo.png'
        }
    }).then(whatever=>{
        try{
            document.getElementById('profilePic').src = localStorage.getItem("profile");
        }catch(e){
            
        }
       
    }).catch(error => console.error('Error loading header:', error))
}

function loadHeader() {

    fetch('header.html')
        .then(response => response.text()).then(data => {
            document.getElementById('header').innerHTML = data;
            if(localStorage.getItem('mode')==='dark'){
                document.body.classList.toggle('darkmode');
                document.getElementById('headerLogo').src='catchup/wLogo.png'
            }
            
        })
    .catch(error => console.error('Error loading header:', error));

}

