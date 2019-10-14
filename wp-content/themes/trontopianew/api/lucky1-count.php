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
$data =array();
$resultarr = array();
        $sqluser = "SELECT count(*) as total,sum(bet) as bet,user FROM `roll` WHERE `winning_number`=1 AND timestamp>=".$timestamp." group by user order by total DESC, bet DESC limit 0,50";
		$resuser = mysqli_query($conn,$sqluser);
		if(mysqli_num_rows($resuser)>0){
			while($rowuser = mysqli_fetch_array($resuser)){

			$sql2 = "SELECT username,useraddress,level FROM `users` WHERE userhexaddress = '".$rowuser['user']."'";    
    		$res2 = mysqli_query($conn,$sql2);
    		$row2 = mysqli_fetch_array($res2);

	    	$image ='';
			$color = '#ffffff';
			$level = 0;
			$sqlQuery = "SELECT image_url,color,level from levels where level =".$row2['level'];
            $resQuery = mysqli_query($conn,$sqlQuery);        
            if(mysqli_num_rows($resQuery)>0){
                $rowQuery = mysqli_fetch_array($resQuery);
                $image = $rowQuery['image_url'];
                $color = $rowQuery['color'];
                $level = $rowQuery['level'];
            }  

			
			$arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'total'=>$rowuser['total']);
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