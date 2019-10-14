<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
echo $time = time();
$sql = "DELETE from muted where tilltime<='$time'";
$res = mysqli_query($conn,$sql);
mysqli_close($conn);
if($res){
	$result['result']= true;
	echo json_encode($result);
	exit();
}else{
	$result['result']= false;
    echo json_encode($result);
    exit();
}
?>