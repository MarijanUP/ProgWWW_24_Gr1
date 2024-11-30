<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function sendEmail($email, $token) {
    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'catchup.ks@gmail.com'; 
        $mail->Password = 'cuaplenlopznwfyb'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('catchup.ks@gmail.com', 'CatchUP - Account verification');
        $mail->addAddress($email); 

        $mail->isHTML(true);
        $mail->Subject = 'CatchUP - Account verification';
        $mail->Body = 'Your CatchUP verification token is: [ '.$token.' ]';

        $mail->send();

}
