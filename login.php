<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <title>Log in</title>
</head>

<body onload="loadHeader()">
    <div id="header"></div>

        <div class="background">
            <div class="switcher">
                <div class="loginGUI">
                    <h1>Log in</h1>
                    <div id="loginInfo">


                    <form action="login.php" method="post">

                        <div class="loginInput">
                            <label for="sid"> Student ID </label>
                            <input name="sid" class="inp" id="sid" type="text" placeholder="123456789000">    
                        </div>
    
                        <div class="loginInput">
                            <label for="pass"> Password </label>
                            <input name="pass" class="inp" id="pass" type="password" minlength="5" maxlength="20" placeholder="5-20 characters">    
                        </div>
                        
                        <input type="submit" id="submitButton" value="Log in">
                    </form>

                    </div>
                    <p id="emptyId" class="message">Student ID is empty!</p>
                    <p id="emptyPass" class="message">Password is empty!</p>
                    <p id="userExist" class="message">User does not exist!</p>
                    <p id="incoPass" class="message">Password is incorrect!</p>
                </div>
                <a id="regLogSwitch" href="register.php">Don't have an account?</a>
            </div>
        </div>

    <script src="javascript/fhloader.js"></script>
</body>
</html>

<?php

session_start();

if(isset($_POST['pass']) && isset($_POST['sid'])){

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    //

    $sid = validate($_POST['sid']);
    $pass = validate($_POST['pass']);

    $firebase = file_get_contents('https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/USERS/'.$_POST["sid"].'.json');
    $data = json_decode($firebase,true);
    
    if(empty($sid)){
        //no sid
    }else if(empty($pass)){
        //no pass
    }else if($firebase==='null'){
        //user no exist
    }else if(!($data['PASS']===$_POST['pass'])){
        //wrong pass
    }else{
        $_SESSION['name'] = $data['EMRI'];
        $_SESSION['sid'] = $_POST['sid'];
        $_SESSION['bachelor'] = $data['DREJTIMI'];
        $_SESSION['email'] = $data['EMAIL'];
        $_SESSION['pic'] = $data['PROFILE'];
        header("Location: home.php");
        exit();
    }
}

?>
