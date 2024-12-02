
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
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="css/light.css">
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
           
        <div id="container" style ="margin-top:50px;">
        <div id="top">
            <div class="cropper">
                <img class="pfp" id="poster" src="" alt="">
            </div>
            <div class="name-and-time">
                <div class="name" id="name">John Doe</div>
                <div id="time" class="time">00/00 00:00:00</div>
            </div>
        </div>

        <hr>

        <div id="mid">
            <div class="title" id="title">Title</div>
            <div class="desc" id="desc">Description</div>
        </div>

        <hr> 

        <div id="uniAndTime">
            <div id="uni">Bachelor</div>
        </div>
        
        <div id="interactions">
            <div class="count" id="likes">0</div>
            <i id="likeButton" class="fa fa-thumbs-up" style="color:grey;"></i>
            <div class="count" id="comments">0</div>
            <i id="social" class="fa fa-comment"></i>
        </div>

        <div id="bottom">
            <div class="cropper">
                <img class="pfp" id="user" src="<?php echo $_SESSION['pic'];?>" alt="">
            </div>
            <input id="commentText" type="text" placeholder="Leave a comment...">
            <input id="commentButton" type="submit" value="Comment">
        </div>




        </div>

        <div class = utility>
             
              <div class="cropper">
            <img class="pic" id='pic' src="images/jasini.jpg" alt="profilePic">
        </div>
        <div class="info">

            <div class="nameTime">
                <p id="name" class="name">John Doe</p>
                <p id="time" class="time">00/00 00:00:00</p>
            </div>

            <hr>

            <div class="notifContent" >
                <p id='content' class="content"></p>
            </div>
            
        </div>
    </body>

    </html>

<?php

} else {
    header("Location: login.php");
    exit();
}

?>