<?php
session_start();
if(isset($_SESSION['logged'])){
 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/light.css">
    <link rel="stylesheet" href="css/postPosts.css">
    <script>
        //kur ban refresh ne post per mos mu ba resubmit
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
    </script>
    <title>Documents</title>
</head>

<?php
if (isset($_POST['submit'])) {
    // Collect data from the form
    $title = $_POST['title'];
    $description = $_POST['description'];

    // Create the data array
    $data = [
        "comments" => 0,
        "desc" => $description,
        "likedUsers" => [],
        "likes" => 0,
        "postTimeStamp" => time(),
        "poster" => $_SESSION["name"],
        "posterID" => $_SESSION["sid"],
        "posttime" => date("d/m H:i:s"), 
        "profileURL" => $_SESSION["pic"],
        "publicKey" => uniqid(), 
        "title" => $title,
    ];

    $firebaseUrl = 'https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/POSTS.json';

    $ch = curl_init($firebaseUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        // echo "Post successfully added to Firebase!";
    } else {
        // echo "Failed to add post. Error: $response";
    }
}
?>



<body onload="loadLHeader()">
    <div id="header"></div>
    
    <div class="mainContainer">
        <div class="switcher">
            <h1>Create Post</h1>
            <form action="postPosts.php" method="post" class="postInput">

            <label for="title">Title:</label>  
            <input id='title' type="text" name="title" placeholder="Post Title" class="inp" required>

            <label for="title">Description:</label>  

            <div id='descOuter'>
                <textarea onkeydown='dis()' onkeyup='dis();' id='desc' name="description" placeholder="Post Description" class="inp" cols='10' rows="10" maxlength="1500" ></textarea>
                <div id='charcount'>0/1500</div>
            </div>  

            <input type="file" name="file" class="inp">
            
            <div id='buttons'>
                <button type="clear" name="clear" id="clearButton">Clear</button>
                <button type="submit" name="submit" id="submitButton">Post</button>
            </div>
            </form>
        </div>
    </div>


    <script>
        function dis(){
            document.getElementById('charcount').innerHTML = `${document.getElementById('desc').value.length}/1500`;
            if(document.getElementById('desc').value===""){
                document.getElementById('charcount').innerHTML =`${0}/1500`;
            }
            if(document.getElementById('desc').value.length>1400){
                document.getElementById('charcount').style.color = "#FF0000";
            }else{
                document.getElementById('charcount').style.color = "var(--text-color)";
            }
        }
        </script>
    <script src="javascript/fhloader.js"></script>
</body>
</html>

<?php

}else{
    header("Location: login.php");
    exit();
}

?>