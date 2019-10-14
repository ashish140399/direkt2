<?php //error_reporting(E_ALL); ini_set('display_errors',1);


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");



include 'config.php';
mysqlCheck($conn);


$query = "SELECT timestamp FROM settings where  id=1";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
$timestamp = $row['timestamp'];
$sql = "SELECT * from rarewins_classicDice where timestamp>".$timestamp." order by timestamp DESC limit 0,50";

//$sql = "SELECT * from rarewins ORDER BY id DESC LIMIT 50";
$res = mysqli_query($conn,$sql);
$data =array();
$resultarr = array();
 mysqli_close($conn);
if(mysqli_num_rows($res)>0){
	while($row = mysqli_fetch_array($res)){

			$arr = array('user'=>$row['user'],'bet'=>$row['bet'],'startNumber'=>$row['start_number'],'direction'=>$row['direction'],'winningNumber'=>$row['winning_number'],'result'=>$row['result'],'timestamp'=> date('m/d/Y H:i:s', $row['timestamp']));
			array_push($data,$arr);

		}
	$resultarr['result']= true;
	$resultarr['data'] = $data;
	echo json_encode($resultarr);
}else{
	$resultarr['result']= false;
	$resultarr['msg'] = 'No Data Found.';
	echo json_encode($resultarr);
}
?>