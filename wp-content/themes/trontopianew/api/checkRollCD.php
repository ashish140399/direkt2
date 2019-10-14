<?php
include 'config.php';
mysqlCheck($conn);
if(isset($_POST['txid']) && $_POST['txid']!=""){
    $txid = $_POST['txid'];
    $query = "SELECT txid FROM `betFinished_classicDice` WHERE betHash IN ( SELECT newUnfinishedBetHash FROM `betStarted_classicDice` WHERE `transaction_id`='".$txid."')";
    $result = mysqli_query($conn,$query);

    if(mysqli_num_rows($result)>1){
    	$startNumber =mysqli_real_escape_string($conn, $_POST['startNumber']);
    	$direction 	=mysqli_real_escape_string($conn, $_POST['direction']);
    	$bet =	mysqli_real_escape_string($conn, $_POST['bet']);
    	$user = mysqli_real_escape_string($conn, $_POST['user']);
    	$time = mysqli_real_escape_string($conn, $_POST['timestamp']);
    	$sql = "SELECT * from roll_classicDice where start_number=".$startNumber." AND direction=".$direction." AND bet=".$bet." AND timestamp>=".$timestamp." AND user='0x".$user."' ORDER BY timestamp DESC limit 0,1";

    }else{
    	$row = mysqli_fetch_array($result);
    	$transaction_id = $row['txid'];
    	$sql = "SELECT * from roll_classicDice where transaction_id='".$transaction_id."'";
    }
    
    $res = mysqli_query($conn,$sql);
    
    $data =array();
    $resultarr = array();
    if(mysqli_num_rows($res)>0){
	    $row2 = mysqli_fetch_array($res);
    //print_r($row2);
        // if($row2['direction']==0){
        //     $direction = "Under";
        // }
        // if($row2['direction']==1){
        //     $direction = "Over";
        // }
        
        $arr = array('user'=>$row2['user'],'startNumber'=>$row2['start_number'],'direction'=>$row2['direction'],'bet'=>$row2['bet'],'winningNumber'=>$row2['winning_number'],'result'=>$row2['result'],'timestamp'=> date('m/d/Y H:i:s', $row2['timestamp']));
        
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

}else{
        mysqli_close($conn);
        $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
}

?>