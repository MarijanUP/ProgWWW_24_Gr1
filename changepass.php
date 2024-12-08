<?php
session_start();
if(isset($_SESSION['logged'])){
 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/changepass.css">
    <link rel="stylesheet" href="css/light.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    <script>
        // localStorage.setItem('profile',"<?php // echo $_SESSION['pic']; ?>");
    </script>
    <title>Profile</title>
</head>

<body onload="loadLHeader();">

    <div id="header"></div>

    <div class="background">
        <div class="change-password-container">
                <h1 id="change-password-text">Change password</h1>

                
                    <div class="data">
                        <label for="password" id="labels">Old Password:</label>
                        <input type="password" name="password" class="password-input" id="old-password">
                    </div>

                    <div class="data">
                        <label for="password" id="labels">Password:</label>
                        <input type="password" name="password" class="password-input" id="password">
                    </div>
                    <!-- <br> -->
                     <div class="data">
                        <label for="password" id="labels">Repeat password:</label>
                        <input type="password" name="repeat-password" class="password-input" id="rpt-password">
                    </div>

                    <input type="hidden" value="<?php echo $_SESSION['sid'];?>" id="sid">
                
                        <?php //echo $_SESSION['sid'];?>
                    <button type="submit" name="submit" id="submit"> Change Password</button>

        </div>
    </div>

    <script src="javascript/fhloader.js"></script>


    <!-- <script type="module" src=""></script> -->
    <script type="module"src="javascript/changepassword.js" defer></script>
</body>
</html>


<?php

}else{
    header("Location: login.php");
    exit();
}

?>