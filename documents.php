<?php
session_start();
if(isset($_SESSION['logged'])){
 
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/light.css">
    <link rel="stylesheet" href="css/documents.css">
    <title>Documents</title>
</head>

<body onload="loadLHeader()">
    <div id="header"></div>
    
    <div class="background">

        <table>
            <tr>
                <td><a href="documentData.php?document=ligjerata">Ligjerata</a></td>
                <td><a href="documentData.php?document=afate">Afate</td>
                <td><a href="documentData.php?document=projekte">Projekte</td>
            </tr>
            <tr>
                <td><a href="documentData.php?document=kuize">Kuiz</a></td>
                <td><a href="documentData.php?document=libra">Libra</a></td>
                <td><a href="documentData.php?document=bin">Bin</a></td>
            </tr>
        </table>

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