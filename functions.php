<?php 


function isUserLoggedIn($user) {
    if(!$user) {
        header("Location : index.php");
        exit;
    }
}
?>