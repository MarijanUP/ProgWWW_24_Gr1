<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <title>Log in</title>
</head>
<?php include "header.php"; ?>




<?php

if(isset($_POST['submit'])) {


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $sid = $_POST['sid'] ?? '';
        $pass = $_POST['pass'] ?? '';
    
        if (empty($sid)) {
            echo "Student ID is empty!";
            exit;
        }
    
        if (empty($pass)) {
            echo "Password is empty!";
            exit;
        }
    
        // Firebase REST API URL
        $url = "https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/USERS/$sid.json";
    
        // Fetch user data from Firebase
        $response = file_get_contents($url);
        $user = json_decode($response, true);
    
        if ($user === null) {
            echo "User does not exist!";
            exit;
        }
    
        if (!isset($user['PASS']) || $user['PASS'] !== $pass) {
            echo "Incorrect password!";
            exit;
        }
    
        // Start session and set userID
        $_SESSION['userID'] = $sid;
    
        // Optionally store other user details in session
        $_SESSION['name'] = $user['EMRI'];
        $_SESSION['bachelor'] = $user['DREJTIMI'];
        $_SESSION['email'] = $user['EMAIL'];
        $_SESSION['profile'] = $user['PROFILE'];
    
        // Redirect to the home page
        header("Location: home.php");
        exit;
    }
}
?>

        <div class="background">
            <div class="switcher">
                <div class="loginGUI">
                    <h1>Log in</h1>
                    <div id="loginInfo">
    

                    <form action="" method='post'>
                        <div class="loginInput">
                            <label for="sid"> Student ID </label>
                            <input class="inp" name="sid" id="sid" type="text" placeholder="123456789000">    
                        </div>
    
                        <div class="loginInput">
                            <label for="pass"> Password </label>
                            <input class="inp" id="pass" name ="pass" type="password" minlength="5" maxlength="20" placeholder="5-20 characters">    
                        </div>
                        
                        <input type='submit' name='submit' id="submitButton" value="Log in">
                        </form>
                    </div>
                    
                </div>
                <a id="regLogSwitch" href="register.php">Don't have an account?</a>
            </div>
        </div>


    
    <!-- <script type="module" src="javascript/login.js"></script> -->
    <script src="javascript/fhloader.js"></script>
</body>
</html>