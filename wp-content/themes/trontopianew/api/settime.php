<?php error_reporting(E_ALL); ini_set('display_errors',1);

if ($_GET["pass"] !== "supersecretpassword") exit();
else
{
    include 'config.php';
    $sql = "UPDATE settings SET js_timestamp = ".$_GET["js_timestamp"];
    mysqli_query($conn, $sql);
    mysqli_close($conn);
    echo "Done";
}
?>