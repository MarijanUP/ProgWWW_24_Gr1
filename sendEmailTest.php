<?php


    
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


function sendEmail($email, $token) {
    require 'vendor/autoload.php';

    $mail = new PHPMailer(true);

    try {
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'catchup.ks@gmail.com'; 
        $mail->Password = 'cuaplenlopznwfyb'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        echo "test1";
        $mail->setFrom('catchup.ks@gmail.com', 'CatchUP - Account verification');
        $mail->addAddress($email); 

        
        echo "test2";
        $mail->isHTML(true);
        $mail->Subject = 'CatchUP - Account verification';
        $mail->Body = 'Your access token to log in is '.$token.' write this in your register page!';

        
        echo "test3";
        $mail->send();
        // header("Location: register.php?token=sent");
        // exit;   
        // echo 'The email message was sent.';
        
        echo "test4";
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
