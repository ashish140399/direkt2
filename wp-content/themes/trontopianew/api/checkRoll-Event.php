<?php
include 'config.php';
mysqlCheck($conn);
if(isset($_POST['txid']) && $_POST['txid']!=""){
    $txid = $_POST['txid'];
    $query = "SELECT * FROM `betStarted` WHERE `transaction_id`='".$txid."'";
    $result = mysqli_query($conn,$query);
    mysqli_close($conn);
    $resultarr = array();
   if(mysqli_num_rows($result)>0){
        $row = mysqli_fetch_array($result);
        $arr = array('_gambler'=>$row['user'],'betHash'=>$row['newUnfinishedBetHash'],'_uniqueBetId'=>$row['uniqueBetId'],'_userSeed'=>$row['userSeed'],'_blockNumber'=>$row['blockNumber'],'_rollIntegerVariables'=>$row['rollIntegerVariables']);
        mysqli_close($conn);
	    $resultarr['result']= true;
	    $resultarr['data'] = $arr;
	    echo json_encode($resultarr);    
    }else{
        
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