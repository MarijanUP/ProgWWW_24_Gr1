<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="/css/light.css">
    <title>Register</title>
</head>
<!-- <body onload="loadHeader()">
    <div id="header"></div> -->


    
    <?php include "header.php"; ?>

        <div class="background">
            <div class="switcher">
                <div class="loginGUI">
                    <h1>Register</h1>
                    <div id="loginInfo">

                        <div class="loginInput">
                            <label for="name">
                                Full Name
                            </label>
                            <input class="inp" name="name" type="text" placeholder="John Doe">
                        </div>

                        <div class="loginInput">
                            <label for="sid">
                                Student ID
                            </label>
                            <input class="inp" name="sid" type="text" placeholder="123456789000">
                        </div>

                        <div class="loginInput">
                            <label for="email">
                                Email
                            </label>
                            <input class="inp" name="email" type="email" placeholder="User@student.uni-pr.edu">    
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
                            <input class="inp" name="pass" type="password" minlength="5" maxlength="20" placeholder="5-20 characters">    
                        </div>

                        <div class="loginInput">
                            <label for="confirmpass">
                                Confirm Password
                            </label>
                            <input class="inp" name="confirmpass" type="password" minlength="5" maxlength="20" placeholder="Confirm password">    
                        </div>
                        
                        <button id="submitButton">Register</button>
            
                    </div>
                </div>
                <a id="regLogSwitch" href="login.php">Already have an account?</a>
            </div>
        </div>


    <div id="footer"></div>

    <script src="javascript/fhloader.js"></script>
</body>
</html>