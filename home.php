<?php
session_start();
if(isset($_SESSION['logged'])){

?>

    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="css/home.css">
        <link rel="stylesheet" href="css/post.css">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/css/light.css">
    </head>

    <script>
        localStorage.setItem( "name" , '<?php echo $_SESSION["name"]; ?>');
        localStorage.setItem( "sid" , '<?php echo $_SESSION["sid"]; ?>' );
        localStorage.setItem( "bachelor" , '<?php echo $_SESSION["bachelor"]; ?>' );
        localStorage.setItem( "email" , '<?php echo $_SESSION["email"]; ?>' );
        localStorage.setItem( "profile" , '<?php echo $_SESSION["pic"]; ?>' );
    </script>
    <script src="javascript/fhloader.js"></script>
    <script type="module" src="javascript/loadPosts.js"></script>

    <body onload="loadLHeader();">
    

        <div id="header"></div>

        <div class="background">
            <input type="text" id="search" onkeyup="filterPosts()" placeholder="Search for title or description...">
            <div id="newestPostContainer" class="postContainer">

            </div>

        </div>


        <script src="javascript/filter.js"></script>
        <script src="javascript/loadMore.js"></script>

    </body>

    </html>

<?php

} else {
    header("Location: login.php");
    exit();
}

?>