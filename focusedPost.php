
<?php
session_start();
if(isset($_SESSION['logged'])){

?>

    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home</title>
        <link rel="stylesheet" href="css/focusedPost.css">
        <link rel="stylesheet" href="css/light.css">
        <link rel='stylesheet' href='css/post.css'>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    </head>

    <script>
        localStorage.setItem( "name" , '<?php echo $_SESSION["name"]; ?>');
        localStorage.setItem( "sid" , '<?php echo $_SESSION["sid"]; ?>' );
        localStorage.setItem( "bachelor" , '<?php echo $_SESSION["bachelor"]; ?>' );
        localStorage.setItem( "email" , '<?php echo $_SESSION["email"]; ?>' );
        localStorage.setItem( "profile" , '<?php echo $_SESSION["pic"]; ?>' );
    </script>

    <script src="javascript/focusedPost.js" type="module"></script>
    <script src="javascript/fhloader.js"></script>

    <body onload="loadLHeader();">
    

        <div id="header"></div>

        <div class="background">
            <div class='postContainer'>

                <div class = 'post' id="post">

                </div>
                
            </div>

            <div id='commentSection'>  

        </div>
        
    </body>

    </html>

<?php

} else {
    header("Location: login.php");
    exit();
}

?>