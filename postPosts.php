<?php
session_start();
if(($_SESSION['sid']) && isset($_SESSION['name'])){
 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/light.css">
    <link rel="stylesheet" href="css/postPosts.css">
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
        echo "Post successfully added to Firebase!";
    } else {
        echo "Failed to add post. Error: $response";
    }
}
?>



<body onload="loadLHeader()">
    <div id="header"></div>
    
    <div class="mainContainer">
  <div class="switcher">
    <h1>Create Post</h1>
    <form action="" method="post" enctype="multipart/form-data" class="loginInput">
      <input type="text" name="title" placeholder="Post Title" class="inp" required>
      <input type="text" name="description" placeholder="Post Description" class="inp" required>
      <input type="file" name="file" class="inp">
      <button type="submit" name="submit" id="submitButton">Submit</button>
    </form>
  </div>
</div>



    <script src="javascript/fhloader.js"></script>
</body>
</html>

<?php

}else{
    header("Location: login.php");
    exit();
}

?>