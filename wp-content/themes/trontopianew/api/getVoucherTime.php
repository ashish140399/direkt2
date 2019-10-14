<?php //error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");



include 'config.php';
mysqlCheck($conn);
$sql = "SELECT voucher_js_timestamp from settings where id  = 1";
$res = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($res);
$timestamp = $row['voucher_js_timestamp'];
echo $timestamp;
mysqli_close($conn);
?>