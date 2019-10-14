<?php
include 'config.php';
mysqlCheck($conn);
if(isset($_POST['txid']) && $_POST['txid']!=""){
    $txid = $_POST['txid'];
    $query = "SELECT transaction_id FROM `luckyOneBetFinished` WHERE betHash IN ( SELECT newUnfinishedBetHash FROM `betStarted_luckyOne` WHERE `transaction_id`='".$txid."')";
    $result = mysqli_query($conn,$query);

    if(mysqli_num_rows($result)>1){
        $bet =  mysqli_real_escape_string($conn, $_POST['bet']);
        $user = mysqli_real_escape_string($conn, $_POST['user']);
        $time = mysqli_real_escape_string($conn, $_POST['timestamp']);
        $sql = "SELECT * from luckyOneBetFinished where bet=".$bet." AND timestamp>=".$timestamp." AND user='0x".$user."' ORDER BY timestamp DESC limit 0,1";

    }else{
        $row = mysqli_fetch_array($result);
        $transaction_id = $row['txid'];
        $sql = "SELECT * from luckyOneBetFinished where transaction_id='".$transaction_id."'";
    }
    
    $res = mysqli_query($conn,$sql);
    
    $data =array();
    $resultarr = array();
    if(mysqli_num_rows($res)>0){
        $row2 = mysqli_fetch_array($res);
        $arr = array('user'=>$row2['user'],'randomNumber'=>$row2['randomNumber'],'bet'=>$row2['betTRX'],'normalPayout'=>$row2['normalPayout'],'jackpotPayout'=>$row2['jackpotPayout'],'profit'=>$row2['profit'],'timestamp'=> date('m/d/Y H:i:s', $row2['timestamp']));
        
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
        $resultarr['msg'] = 'No Txid passed.';
        echo json_encode($resultarr);
}

?>