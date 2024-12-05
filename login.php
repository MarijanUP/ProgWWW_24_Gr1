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
                <p id='title'>Log in</p>
                    <div id="loginInfo">


                    <form action="login.php" method="post">

                        <div class="loginInput">
                            <label for="email"> Email </label>
                            <input name="email" class="inp" id="email" type="text" placeholder="123456789000">    
                        </div>
    
                        <div class="loginInput">
                            <label for="pass"> Password </label>
                            <input name="pass" class="inp" id="pass" type="password" minlength="5" maxlength="20" placeholder="5-20 characters">    
                        </div>
                        
                        <input type="submit" id="submitButton" value="Log in">
                    </form>

                    </div>
                    
                </div>
                <a id="regLogSwitch" href="register.php">Don't have an account?</a>
            </div>
        </div>

    <script src="javascript/fhloader.js"></script>
</body>
</html>

<?php

session_start();

if(isset($_POST['pass']) && isset($_POST['email'])){

    function validate($data){
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }


    $email = validate($_POST['email']);
    $pass = validate($_POST['pass']);

    $firebase = file_get_contents('https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/USERS/.json');
    $data = json_decode($firebase,true);

    foreach(array_keys($data) as $user){

        if(empty($email)){
            //no email
        }else if(empty($pass)){
            //no pass
        }else if(!($data[$user]['PASS']===$_POST['pass']) && ($data[$user]['EMAIL']==$_POST['email'])){
            //wrong pass
        }else if(($data[$user]['PASS']===$_POST['pass']) && ($data[$user]['EMAIL']==$_POST['email'])){
            $_SESSION['logged'] = True;
            $_SESSION['sid'] = $user;
            $_SESSION['name'] = $data[$user]['EMRI'];
            $_SESSION['bachelor'] = $data[$user]['DREJTIMI'];
            $_SESSION['email'] = $data[$user]['EMAIL'];
            $_SESSION['pic'] = $data[$user]['PROFILE'];
            header("Location: home.php");
            exit();
        }

    }
    
    
    
}

?>
