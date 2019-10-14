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
$timestamp = $timestamp*1000;
$sql = "SELECT * from luckyOneBetFinished where timestamp>".$timestamp." order by timestamp DESC limit 0,50";
$res = mysqli_query($conn, $sql);
mysqli_close($conn);
$resultarr = array();
if ($res && mysqli_num_rows($res) > 0)
{
    $data = array();
	while ($row = mysqli_fetch_array($res))
	{
		$arr = array('user'=>$row['gambler'],'randomNumber'=>$row['randomNumber'],'bet'=>$row['betTRX'],'normalPayout'=>$row['normalPayout'],'jackpotPayout'=>$row['jackpotPayout'],'profit'=>$row['profit'],'timestamp'=> date('m/d/Y H:i:s', $row['timestamp']/1000));
		array_push($data, $arr);
	}
	$resultarr['result'] = true;
	$resultarr['data'] = $data;
	echo json_encode($resultarr);
}
else
{
	$resultarr['result'] = false;
	$resultarr['msg'] = 'No Data Found.';
	echo json_encode($resultarr);
}

?>