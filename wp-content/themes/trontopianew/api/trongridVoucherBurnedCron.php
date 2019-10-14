<?php error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';

//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint){
        
    $url = TRONGRID_EVENT_API_URL.VOUCHER_CONTRACT_ADDRESS.'?size=200';
    
    if ($previousLastEventFingerprint !== null)
    {
        $url .= "&previousLastEventFingerprint=".$previousLastEventFingerprint;
    }
    
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $output = curl_exec($ch);
    $output = json_decode($output);
    curl_close ($ch);
    //print_r($output);
   // exit;
    $last = null;
    foreach ($output as $key => $value) {
    	//print_r($value->event_name);
    	
    	$last = $value;
    	
    	if($value->event_name == 'Burn'){
    	   // print_r($value);
    	    $transaction_id = $value->transaction_id;
         	$user = $value->result->from;
            $amount = $value->result->value;
            $timestamp = $value->block_timestamp;
            $len =  strlen($timestamp);
            if($len==13){
                $timestamp = substr($timestamp, 0, -3);
            }
                $sql = "SELECT * FROM `burnedvouchers` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND user='".$user."' AND value=".$amount;
        		$res = mysqli_query($conn,$sql);
        		$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
                    $insertSQL  = "Insert into burnedvouchers (user,transaction_id,value,timestamp) values ('$user','$transaction_id',$amount,$timestamp)";
                    // echo '<br>'. $insertSQL;
                    mysqli_query($conn,$insertSQL);
        		}
    	    
    	}
    	
    	if($value->event_name == 'Transfer'){
    	    print_r($value);
    	    $transaction_id = $value->transaction_id;
         	$from = $value->result->from;
         	$to = $value->result->to;
            $amount = $value->result->value;
            $timestamp = $value->block_timestamp;
            $len =  strlen($timestamp);
            if($len==13){
                $timestamp = substr($timestamp, 0, -3);
            }
                $sql = "SELECT * FROM `transfervouchers` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND from_address='".$from."' AND to_address='".$to."' AND value=".$amount;
        		$res = mysqli_query($conn,$sql);
        		$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
                    $insertSQL  = "Insert into transfervouchers (transaction_id,from_address,to_address,value,timestamp) values ('$transaction_id','$from','$to',$amount,$timestamp)";
                    // echo '<br>'. $insertSQL;
                    mysqli_query($conn,$insertSQL);
        		}
    	    
    	}
    	
    	
    }
    
    return $last;
}

    for($i=0; $i<10; $i++){
        
        
        /*
        $lastEvent = fetchData($conn, null);
        echo "Last event fingerprint is ".$lastEvent->_fingerprint."<br/>";
        
        for ($j=0; $j<3; $j++)
        {
            usleep(300*1000);
            $lastEvent = fetchData($conn, $lastEvent->_fingerprint);
            echo "Last event fingerprint is ".$lastEvent->_fingerprint."<br/>";
            flush();
        }
        
        echo "<hr/>";
        sleep(1);
        */
        
        
        
        $lastEvent = fetchData($conn, null);
        echo "Fetched 200 up to fingerprint ".$lastEvent->_fingerprint."<br/>";
        usleep(250*1000);
        $lastEvent = fetchData($conn, $lastEvent->_fingerprint);
        echo "Fetched 200 more up to fingerprint ".$lastEvent->_fingerprint."<br/>";
        flush();
        
        //echo "<br><br>";
        sleep(4);
        //mail("yogeshpadsala@gmail.com", "TT test", "rrr");
    }

mysqli_close($conn);
?>