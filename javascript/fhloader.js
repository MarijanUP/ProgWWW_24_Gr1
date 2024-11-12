function loadLHeader(){
    fetch('loggedHeader.html').then(response => response.text()).then(data=> {
        document.getElementById('header').innerHTML = data;

        // document.getElementById("settingsButton").addEventListener("click", function (event) {
        //     console.log("Settings button clicked");  // This should be fine.
        //     var dropdownMenu = document.querySelector(".dropdown-menu");
        //     dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
        // });
        
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
