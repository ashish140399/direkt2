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
$l1timestamp = $timestamp*1000;
         $sqluser = "select user,sum(bet) total
        from
        (
            select user,bet
            from roll
            where timestamp >".$timestamp."
            union all
            select user,bet
            from sidebetrolls
            where timestamp >".$timestamp."
            union all
            select user,bet
            from roll_classicDice
            where timestamp >".$timestamp."
            union all
            select gambler user,betTRX bet
            from luckyOneBetFinished
            where timestamp>".$l1timestamp."
        ) t
        group by user order by total DESC limit 0,100";
        
	//	$sqluser = "SELECT sum(trxplayed) as trxplayed,user FROM `kingtopian` where timestamp >".$timestamp." group by user order by trxplayed DESC limit 0,10";
		$resuser = mysqli_query($conn,$sqluser);
		if(mysqli_num_rows($resuser)>0){
			while($rowuser = mysqli_fetch_array($resuser)){

			$sql2 = "SELECT username,useraddress FROM `users` WHERE userhexaddress = '".$rowuser['user']."'";    
    		$res2 = mysqli_query($conn,$sql2);
    		$row2 = mysqli_fetch_array($res2);

	    	$image ='';
			$color = '#ffffff';
			$level = 0;
			$sqlQuery = "SELECT image_url,color,level from levels where level IN(select level from users where userhexaddress='".$rowuser['user']."')";
            $resQuery = mysqli_query($conn,$sqlQuery);        
            if(mysqli_num_rows($resQuery)>0){
                $rowQuery = mysqli_fetch_array($resQuery);
                $image = $rowQuery['image_url'];
                $color = $rowQuery['color'];
                $level = $rowQuery['level'];
            }  

			
			$arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'trxplayed'=>$rowuser['total']);
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