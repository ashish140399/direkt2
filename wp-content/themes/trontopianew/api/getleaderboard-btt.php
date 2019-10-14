<?php //error_reporting(E_ALL); ini_set('display_errors',1);


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");


include 'config.php';
mysqlCheck($conn);
$sql = "select username,userhexaddress,level,trx_wagered_total as total from users2 order by trx_wagered_total DESC limit 0,100";
$res = mysqli_query($conn,$sql);
$data =array();
$resultarr = array();
if(mysqli_num_rows($res)>0){
	while($row = mysqli_fetch_array($res)){
		$user 		= $row['userhexaddress'];
		$username 	= $row['username'];
		$total 		= $row['total'];
		$image 		='';
		$color 		= '#ffffff';
		$level 		= $row['level'];
		$sqlQuery = "SELECT image_url,color from levels where level =".$level;
            $resQuery = mysqli_query($conn,$sqlQuery);        
            if(mysqli_num_rows($resQuery)>0){
                $rowQuery = mysqli_fetch_array($resQuery);
                $image = $rowQuery['image_url'];
                $color = $rowQuery['color'];
            }  

		$arr = array('user'=>$username,'level'=>$level,'image'=>$image,'color'=>$color,'total'=>$total);
		array_push($data,$arr);
	}
	 mysqli_close($conn);
	$resultarr['result']= true;
	$resultarr['data'] = $data;
	echo json_encode($resultarr);
}else{
	 mysqli_close($conn);
	$resultarr['result']= false;
	$resultarr['msg'] = 'No Data Found.';
	echo json_encode($resultarr);
}
?>