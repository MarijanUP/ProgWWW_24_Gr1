<?php
session_start();
if(isset($_SESSION['logged'])){

?>

    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Notifications</title>
        <link rel="stylesheet" href="css/light.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/notifications.css">
    </head>

    <body onload="loadLHeader();">
    

        <div id="header"></div>

        <div class="background">
            <div class = utility>
                <input type="text" id="search" onkeyup="filterNotifs()" placeholder="Search for name or content...">
                <button id="clear">
                    Clear notifications
                </button>
            </div>
            <div id='notifier'>You currently have no notifications.</div>
            <div id='notiContainer'></div>
        </div>


        <script src="javascript/fhloader.js"></script>
        <script src="javascript/filter.js"></script>
        <script type='module' src='javascript/loadNotifs.js'></script>
    </body>

    </html>

<?php

} else {
    header("Location: login.php");
    exit();
}

?>