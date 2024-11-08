function loadFooter() {
    fetch('footer.html')
        .then(response => response.text()).then(data => {
            document.getElementById('footer').innerHTML = data;
        })
    .catch(error => console.error('Error loading footer:', error));
}

function loadLHeader(){
    fetch('loggedHeader.html').then(response => response.text()).then(data=> {
        document.getElementById('header').innerHTML = data;
    }).catch(error => console.error('Error loading header:', error))
    console.log()
}

function loadHeader() {

    
    fetch('header.html')
        .then(response => response.text()).then(data => {
            document.getElementById('header').innerHTML = data;
        })
    .catch(error => console.error('Error loading header:', error));


    
}
