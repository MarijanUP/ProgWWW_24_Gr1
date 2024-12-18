<?php
session_start();
if(isset($_SESSION['logged'])){
 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/profile.css">
    <link rel="stylesheet" href="css/light.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
   
    
<?php
$url = "https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/.json";

$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$response = curl_exec($ch);

curl_close($ch);

if ($response === false) {
    // echo "Error fetching data.";
} else {
    $data = json_decode($response, true);
    // echo "asdasd";
    // echo $_SESSION['sid'];
    $_SESSION['pic'] = $data['USERS'][$_SESSION['sid']]['PROFILE'];
    
}
?>

   
   <script>
        localStorage.setItem('profile',"<?php echo $_SESSION['pic']; ?>");
    </script>
    <title>Profile</title>
</head>

<body onload="loadLHeader();">



    <div id="header"></div>

    <div class="background">
        <div class="profileContainer">
            <img id="profilePic">
            <input type="file" accept="image/png, image/jpeg, image/jpg" />
            <div class="bottom">
                <div id="icons">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M840-280v-276L480-360 40-600l440-240 440 240v320h-80ZM480-120 200-272v-200l280 152 280-152v200L480-120Z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/></svg>    
                </div>
                <div class="profileInfo"> 
                    <div id="name"><?php echo $_SESSION['name']; ?></div>
                    <div id="bachelor"><?php echo $_SESSION['bachelor']; ?></div>
                    <div id="email"><?php echo $_SESSION['email']; ?></div>
                </div>
            </div>
            <div class="buttons">
                <form action="logout.php">
                    <input type="submit" class="button" id="logout" value="Log out"></input>
                </form>
                <a href="changepass.php"><button class="button" id="changepass">Change password</button></a>
            </div>
        </div>
    </div>





    <script src="javascript/fhloader.js"></script>
    
    <script type="module" src="javascript/changepfp.js"></script>
</body>
</html>


<?php

}else{
    header("Location: login.php");
    exit();
}

?>