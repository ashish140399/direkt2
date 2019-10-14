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
            select gambler as user,betTRX as bet
            from luckyOneBetFinished
        ) t
        group by user order by total DESC limit 0,10";
        
	//	$sqluser = "SELECT sum(trxplayed) as trxplayed,user FROM `kingtopian` where timestamp >".$timestamp." group by user order by trxplayed DESC limit 0,10";
		$resuser = mysqli_query($conn,$sqluser);
		if(mysqli_num_rows($resuser)>0){
			while($rowuser = mysqli_fetch_array($resuser)){

			$arr = array('useraddres'=>$rowuser['user'],'trxplayed'=>$rowuser['total']);
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