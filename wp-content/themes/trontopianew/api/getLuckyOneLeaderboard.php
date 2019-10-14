<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
/*$query = "SELECT timestamp FROM settings where id=1";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
$timestamp = $row['timestamp'];
$timestamp = $timestamp*1000; */
$timestamp = 1569085200000;
$data =array();
$resultarr = array();
		$sqluser = "SELECT sum(betTRX) as trxplayed,gambler FROM `luckyOneBetFinished` where timestamp >".$timestamp." group by gambler order by trxplayed DESC limit 0,20";
		$resuser = mysqli_query($conn,$sqluser);
		if(mysqli_num_rows($resuser)>0){
			while($rowuser = mysqli_fetch_array($resuser)){				
				$sql2 = "SELECT username,useraddress FROM `users` WHERE userhexaddress = '".$rowuser['gambler']."'";    
     			$res2 = mysqli_query($conn,$sql2);
     			$row2 = mysqli_fetch_array($res2);
     			
     			$image ='';
				 $color = '#ffffff';
				 $level = 0;
				 $sqlQuery = "SELECT image_url,color,level from levels where level IN(select level from users where userhexaddress='".$rowuser['gambler']."')";
             	$resQuery = mysqli_query($conn,$sqlQuery);        
             	if(mysqli_num_rows($resQuery)>0){
                 	$rowQuery = mysqli_fetch_array($resQuery);
                 	$image = $rowQuery['image_url'];
                 	$color = $rowQuery['color'];
                 	$level = $rowQuery['level'];
             	}  

				 $arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'trxplayed'=>$rowuser['trxplayed']);
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