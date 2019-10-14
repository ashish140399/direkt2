<?php
include 'config.php';
mysqlCheck($conn);
if(isset($_POST['txid']) && $_POST['txid']!=""){
    $txid = $_POST['txid'];
    $query = "SELECT txid FROM `betFinished` WHERE betHash IN ( SELECT newUnfinishedBetHash FROM `betStarted` WHERE `transaction_id`='".$txid."')";
    $result = mysqli_query($conn,$query);
    $row = mysqli_fetch_array($result);
    $transaction_id = $row['txid'];
    $sql = "SELECT * from roll where transaction_id='".$transaction_id."'";
     if(mysqli_num_rows($result)>1){
        $startNumber =mysqli_real_escape_string($conn, $_POST['startNumber']);
    	$endNumber 	= mysqli_real_escape_string($conn,$_POST['endNumber']);
    	$bet =	mysqli_real_escape_string($conn,$_POST['bet']);
    	$user = mysqli_real_escape_string($conn,$_POST['user']);
    	$time = mysqli_real_escape_string($conn,$_POST['timestamp']);
    	$sql = "SELECT * from roll where start_number=".$startNumber." AND endNumber=".$endNumber." AND bet=".$bet." AND timestamp>=".$timestamp." AND user='0x".$user."' ORDER BY timestamp DESC limit 0,1";

    }else{
        
    }
    $res = mysqli_query($conn,$sql);
    
    $data =array();
    $resultarr = array();
    if(mysqli_num_rows($res)>0){
	    $row2 = mysqli_fetch_array($res);
    //print_r($row2);
    
        $sql3 = "SELECT bet,winamount from sidebetrolls where transaction_id='".$transaction_id."' AND user='".$row2['user']."'";
        $res3 = mysqli_query($conn,$sql3);
        if(mysqli_num_rows($res3)>0){
            $row3 = mysqli_fetch_array($res3);
			$arr = array('user'=>$row2['user'],'startNumber'=>$row2['start_number'],'endNumber'=>$row2['end_number'],'bet'=>$row2['bet'],'winningNumber'=>$row2['winning_number'],'result'=>$row2['result'],'timestamp'=> date('m/d/Y H:i:s', $row2['timestamp']),'sidebetAmount'=>$row3['bet'],'sideBetWin'=>$row3['winamount']);
        }else{
            $arr = array('user'=>$row2['user'],'startNumber'=>$row2['start_number'],'endNumber'=>$row2['end_number'],'bet'=>$row2['bet'],'winningNumber'=>$row2['winning_number'],'result'=>$row2['result'],'timestamp'=> date('m/d/Y H:i:s', $row2['timestamp']));
        }

		mysqli_close($conn);
	    $resultarr['result']= true;
	    $resultarr['data'] = $arr;
	    echo json_encode($resultarr);
    }else{
        mysqli_close($conn);
	    $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
    }
    mysqli_close($conn);

}else{
        mysqli_close($conn);
        $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
}

?>