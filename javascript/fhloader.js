function loadLHeader(){
    fetch('loggedheader.php').then(response => response.text()).then(data=> {
        document.getElementById('header').innerHTML = data;
        if(localStorage.getItem('mode')==='dark'){
            document.body.classList.toggle('darkmode');
            document.getElementById('headerLogo').src='catchup/wLogo.png'
        }
    }).catch(error => console.error('Error loading header:', error))
    console.log()
}

function loadHeader() {

    fetch('header.php')
        .then(response => response.text()).then(data => {
            document.getElementById('header').innerHTML = data;
            if(localStorage.getItem('mode')==='dark'){
                document.body.classList.toggle('darkmode');
                document.getElementById('headerLogo').src='catchup/wLogo.png'
            }
        })
    .catch(error => console.error('Error loading header:', error));

}

