<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/light.css">
    <link rel="stylesheet" href="css/documents.css">
    <title>Documents</title>
</head>

<?php include "header.php";
   if(!$_SESSION['userID']) {
    header("Location: index.php");
    exit;
} ?>
    <div class="background">

        <table>
            <tr>
                <td>Ligjerata</td>
                <td>Afate</td>
                <td>Projekte</td>
            </tr>
            <tr>
                <td>Kuiz</td>
                <td>Libra</td>
                <td>Bin</td>
            </tr>
        </table>

    </div>


    <script src="javascript/fhloader.js"></script>
</body>
</html>