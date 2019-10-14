<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
$address = $_GET['address'];
$sql = "SELECT * from banned where address='$address'";
$res = mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    mysqli_close($conn);
	$result['result']= true;
	echo json_encode($result);
	exit();
}else{
        $sql = "SELECT * from muted where address='$address'";
        $res = mysqli_query($conn,$sql);
        mysqli_close($conn);
        if(mysqli_num_rows($res)>0){
        	$result['result']= true;
        	echo json_encode($result);
        	exit();
        }
	$result['result']= false;
    echo json_encode($result);
    exit();
}
?>
