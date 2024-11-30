<?php
session_start();
if(isset($_SESSION['logged'])) {
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/light.css">
    <link rel="stylesheet" href="css/documentData.css">
    <title>Documents</title>

    <style>
        

      
    </style>

</head>

<body onload="loadLHeader()">
    <div id="header"></div>
    
    <div class="background">
            <div class="row-container" id="row-container"></div>

            <p id="nothing-to-show-div" class="nothing-to-show-div"></p>

    </div>

    <script src="javascript/fhloader.js"></script>
    <script type="module">
    // Import the Firebase functions
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
    import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

    // Firebase configuration
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    //REFERENCEE
    <?php
    if($_GET['document'] == 'afate') {
        echo 'const folderRef = ref(storage, "/Documents/AFATE");';
    }
    if($_GET['document'] == 'ligjerata') {
        echo 'const folderRef = ref(storage, "/Documents/LIGJERATA");';
    }
    if($_GET['document'] == 'projekte') {
        echo 'const folderRef = ref(storage, "/Documents/PROJEKTE");';
    }
    if($_GET['document'] == 'kuize') {
        echo 'const folderRef = ref(storage, "/Documents/KUIZ");';
    }
    if($_GET['document'] == 'libra') {
        echo 'const folderRef = ref(storage, "/Documents/LIBRA");';
    }
    if($_GET['document'] == 'bin') {
        echo 'const folderRef = ref(storage, "/Documents/BIN");';
    }
    ?>

    listAll(folderRef)
      .then((result) => {
        
        console.log(`Number of files in Documents/AFATET: ${result.items.length}`);

        if(result.items.length === 0 ) {
            const rowcontainer = document.getElementById('nothing-to-show-div');
            rowcontainer.innerHTML = "Nothing to show here.....";
        } else {

            const rowContainer = document.getElementById('row-container');

            result.items.forEach((itemRef) => {
            console.log(itemRef.name); 

            const fileDiv = document.createElement('div');
            fileDiv.classList.add('file-item');

            getDownloadURL(itemRef)
                .then((url) => {
                const fileLink = document.createElement('a');
                fileLink.href = url;
                fileLink.textContent = itemRef.name;
                fileLink.target = "_blank";  

                fileDiv.appendChild(fileLink);

                const separator = document.createElement('hr');
                separator.classList.add('separator');
                fileDiv.appendChild(separator);
                })
                .catch((error) => {
                console.error("Error fetching file URL:", error);
                });

            rowContainer.appendChild(fileDiv);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching file list:", error);
      });
  </script>

</body>
</html>

<?php
} else {
    header("Location: login.php");
    exit();
}
?>
