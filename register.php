<?php
session_start();
ob_start();
?>

<html lang="en">

<head>


    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="css/light.css">


    <style>
        :root {

            --bg-color: #F2F2F2;
            --text-color: #050505;
            --secondary-text-color: #606770;
            --container-bg-color: #FFFFFF;
            --divider-color: #E4E6EB;
            --button-bg-color: #1877F2;
            --button-hover-bg-color: #155cb0;
            --header-bg: var(--bg-color);
        }

        /* Dark Theme */
        .darkmode {
            --bg-color: #18191A;
            --text-color: #E4E6EB;
            --secondary-text-color: #B0B3B8;
            --container-bg-color: #242526;
            --divider-color: #3A3B3C;
            --button-bg-color: #1877F2;
            --button-hover-bg-color: #155cb0;
            --header-bg: var(--container-bg-color);
        }


        #tokenModal {
            display: flex;
            /* Hidden by default */
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            /* Dark background with transparency */
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        #tokenModal div {
            background-color: var(--bg-color);
            padding: 20px;
            border-radius: 8px;
            width: 300px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
        }

        #tokenModal h2 {
            margin: 0;
            font-size: 1.5em;
        }

        #tokenModal hr {
            margin: 10px 0;
            border: none;
            border-top: 1px solid #ccc;
        }

        #tokenModal input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        #tokenModal button {
            padding: 10px 20px;
            margin: 5px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        #verifyToken {
            background-color: #28a745;
            color: white;
        }

        #verifyToken:hover {
            background-color: #218838;
        }

        #closeModal {
            background-color: #dc3545;
            color: white;
        }

        #closeModal:hover {
            background-color: #c82333;
        }
    </style>
    <script src="javascript/fhloader.js"></script>
    <script>
        //kur ban refresh ne post per mos mu ba resubmit
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
        }
    </script>
    <title>Register</title>
</head>

<body onload="loadHeader()">
    <div id="header"></div>


    <div class="background">
        <div class="switcher">
            <div class="loginGUI">
            <p id='title'>Register</p>
                <div id="loginInfo">

                    <form action="" method="post" >

                        <div class="loginInput">
                            <label for="email">
                                Email
                            </label>
                            <input autocomplete='off' readonly onfocus="this.removeAttribute('readonly');" required class="inp" name="email" type="email" placeholder="john.doe@student.uni-pr.edu">
                        </div>

                        <div class="loginInput">
                            <label for="bach">
                                Studying
                            </label>
                            <select class="inp" name="bach" id="bach">
                                <option selected value="Shkenca Kompjuterike">Shkenca Kompjuterike</option>
                                <option value="Matematike Financiare">Matematike Financiare</option>
                                <option value="Gjuhe Angleze">Gjuhe Angleze</option>
                            </select>
                        </div>

                        <div class="loginInput">
                            <label for="pass">
                                Password
                            </label>
                            <input autocomplete='off' readonly onfocus="this.removeAttribute('readonly');" required class="inp" name="pass" type="password" minlength="5" maxlength="20" placeholder="5-20 characters">
                        </div>

                        <div class="loginInput">
                            <label for="confirmpass">
                                Confirm Password
                            </label>
                            <input autocomplete='off' readonly onfocus="this.removeAttribute('readonly');" required class="inp" name="confirmpass" type="password" minlength="5" maxlength="20" placeholder="Confirm password">
                        </div>

                        <input type="submit" name="submit" value="Register" id="submitButton">

                    </form>

                    <?php
                    include "sendEmailTest.php";
                    $regex = '/[A-Za-z]+\\.[A-Za-z0-9]+@student\\.uni-pr\\.edu/i';
                    if (isset($_POST['submit'])) {

                        if(!isset($_POST['email'])){

                        }else if(!preg_match($regex,$_POST['email'])){
                            echo 'Incorrect email input';
                        }else if(!($_POST['pass']===$_POST['confirmpass'])){
                            echo 'Password doesnt match';
                        }else{
                            $url = file_get_contents("https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/USERS/.json");
                            $data = json_decode($url,true);

                            foreach(array_keys($data) as $user){
                                if($data[$user]['EMAIL']===$_POST['email']){
                                    echo "User already exists";
                                    return;
                                }
                            }

                            $email = $_POST['email'];
                            $text = "1234567890qwertyuiopasdfghjklzxcvbnm";
                            $token = "";
                            for ($i = 0; $i < 6; $i++) {
                                $token .= strtoupper($text[random_int(0, strlen($text) - 1)]);
                            }
    
                            $nameParts = explode('@',$_POST['email']);
                            $nameParts = explode('.',$nameParts[0]);
                            $nameParts[1] = preg_replace('/[0-9]+/', '', $nameParts[1]);
                            $nameParts[0] = ucfirst($nameParts[0]);
                            $nameParts[1] = ucfirst($nameParts[1]);
                            
                            $_SESSION['name'] = $nameParts[0]." ".$nameParts[1];
                            $_SESSION['bachelor'] = $_POST['bach'];
                            $_SESSION['email'] = $_POST['email'];
                            $_SESSION['pass'] = $_POST['pass'];
                            $_SESSION['pic'] = 'https://firebasestorage.googleapis.com/v0/b/seks-f1000.appspot.com/o/ProfilePictures%2Fdefult.jpg?alt=media&token=33cf33bd-f5d4-4e34-bf1c-af535d529011';
                            try{
                                sendEmail($email, $token);
                                $_SESSION['token'] = $token; //set token only if its sent
                            }catch(Exception $e){
                                echo "Couldnt sent token";
                            }
                        }
                    }

                    if (isset($_SESSION['token'])) {
                        echo '<div id="tokenModal">
                                    <div>
                                        <h2>Enter Token</h2>
                                        <hr>
                                        <form action="" method="post">
                                        <input type="text" name="tokenVerify" id="tokenInput" placeholder="Enter your token here">
                                        <input type="submit" name="verify" id="verify" value="Verify Token">
                                        <input type="submit" name="close" id="closeModal" value="Close">
                                        </form>
                                    </div>
                                </div>';

                        if (isset($_POST['verify'])) {

                            if ($_POST['tokenVerify'] === $_SESSION['token']) {
                                
                                $data = [
                                    'DREJTIMI' => $_SESSION['bachelor'],
                                    "EMAIL" => $_SESSION['email'],
                                    "EMRI" => $_SESSION['name'],
                                    "PASS" => $_SESSION['pass'],
                                    "PROFILE" => "https://firebasestorage.googleapis.com/v0/b/seks-f1000.appspot.com/o/ProfilePictures%2Fdefult.jpg?alt=media&token=33cf33bd-f5d4-4e34-bf1c-af535d529011"
                                ];

                                $url = 'https://seks-f1000-default-rtdb.europe-west1.firebasedatabase.app/USERS/.json';

                                $ch = curl_init($url);
                                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                curl_setopt($ch, CURLOPT_POST, true);
                                curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
                                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

                                $response = curl_exec($ch);
                                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                                curl_close($ch);

                                $_SESSION['sid'] = ((array)json_decode(curl_multi_getcontent($ch)))['name'];

                                if ($httpCode == 200) {
                                    $_SESSION['logged']=True;
                                    unset($_SESSION['token']);
                                    header("Location: home.php");
                                    exit();
                                }else{

                                }
                            } else {
                                echo '<p>Invalid token.</p>';
                            }
                        }else if (isset($_POST['close'])) {
                            session_destroy();
                            header("Location: register.php");
                            exit;
                        }
                    }
                    
                    ?>
                </div>
            </div>
            <a id="regLogSwitch" href="login.php">Already have an account?</a>
        </div>
    </div>

</body>

</html>