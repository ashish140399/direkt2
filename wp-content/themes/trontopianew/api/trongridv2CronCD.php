<?php error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
//get latest timestamp from roll_classicDice table
$query = "SELECT max(timestamp) timestamp FROM `roll_classicDice`";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
//$DBtimestamp = $row['timestamp'];
$DBtimestamp = 0;
//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint,$DBtimestamp){
        
   echo $url = TRONGRID_V2_EVENT_API_URL.CLASSIC_DICE_GAME_CONTRACT_ADDRESS.'?size=200';
    
    if ($previousLastEventFingerprint !== null)
    {
        $url .= "&start_timeStamp=".$previousLastEventFingerprint;
    }
    
    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL,$url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $output = curl_exec($ch);
    $output = json_decode($output);
    curl_close ($ch);
   // print_r($output);
//    exit;
    $last = null;
    foreach ($output as $key => $value) {
    	//print_r($value->event_name);
    	
    	$last = $value;
    	
    	if($value->event_name == 'BetStarted'){
    	    //print_r($value);
    	    $transaction_id = $value->transaction_id;
        	$user = $value->result->_gambler;
        	$betHash = $value->result->_betHash;
        	$uniqueBetId = $value->result->_uniqueBetId;
        	$userSeed = $value->result->_userSeed;
        	$blockNumber = $value->result->_blockNumber;    	
        	$rollIntegerVariables = $value->result->_rollIntegerVariables;    	
        	$timestamp = $value->block_timestamp;
            
            $insertSQL  = "Insert into betStarted_classicDice (transaction_id,user,newUnfinishedBetHash,uniqueBetId,userSeed, rollIntegerVariables, blockNumber,timestamp  ) values ('$transaction_id','$user','$betHash','$uniqueBetId','$userSeed', '$rollIntegerVariables', '$blockNumber',$timestamp)";
        	mysqli_query($conn,$insertSQL);
    	    
    	}else if($value->event_name == 'BetFinished'){
    	    

    	    $transaction_id = $value->transaction_id;
        	$betHash = $value->result->_betHash;
        	
        
           $insertSQL  = "Insert into betFinished_classicDice (betHash,txid) values ('$betHash','$transaction_id' )";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'KingTopian'){
    	    $transaction_id = $value->transaction_id;
        	$trxplayed = $value->result->_trxplayed;
        	$prize = $value->result->_prize;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
            $insertSQL  = "Insert into kingtopian_classicDice (transaction_id,user,trxplayed,prize,timestamp) values ('$transaction_id','$user','$trxplayed','$prize','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'Roll'){
    
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$direction = $value->result->_endNumber;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
            //echo $insertSQL  = "Insert into roll_classicDice (transaction_id,result,start_number,direction,winning_number,bet,user,timestamp) values ('$transaction_id','$result','$startNumber','$direction','$winningNumber',$bet,'$user','$timestamp')";
        	//mysqli_query($conn,$insertSQL);
        	
        	if($timestamp>=$DBtimestamp){
        		$sql = "SELECT * FROM `roll_classicDice` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND user='".$user."' AND winning_number=".$winningNumber;
        		$res = mysqli_query($conn,$sql);
        		$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
        			$count++;
            		$insertSQL  = "Insert into roll_classicDice (transaction_id,result,start_number,direction,winning_number,bet,user,timestamp) values ('$transaction_id','$result','$startNumber','$direction','$winningNumber',$bet,'$user','$timestamp')";
            		mysqli_query($conn,$insertSQL);		
        		}
        		
        	}
    	    
    	}elseif($value->event_name == 'HighRollers'){
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$direction = $value->result->_endNumber;
        	$winamount = $value->result->_winamount;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
        	 $insertSQL  = "Insert into highrollers_classicDice (transaction_id,result,start_number,direction,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$direction','$winningNumber','$bet','$winamount','$user','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'RareWins'){
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$direction = $value->result->_endNumber;
        	$winamount = $value->result->_winamount;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
        	 $insertSQL  = "Insert into rarewins_classicDice (transaction_id,result,start_number,direction,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$direction','$winningNumber','$bet','$winamount','$user','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}
    	
    }
    
    return $last;
}

if (isset($_GET["JesseTesting"]))
{
    $lastEvent = fetchData($conn, null);
    echo "Last event fingerprint is ".$lastEvent->_fingerprint."<br/>";
    
    usleep(200*1000);
    $lastEvent = fetchData($conn, $lastEvent->_fingerprint);
    echo "Last event fingerprint is ".$lastEvent->_fingerprint."<br/>";
    
    usleep(200*1000);
    $lastEvent = fetchData($conn, $lastEvent->_fingerprint);
    echo "Last event fingerprint is ".$lastEvent->_fingerprint."<br/>";
}
else
{
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
        
        
       
        $lastEvent = fetchData($conn, null,$DBtimestamp);
        echo "Fetched 200 up to fingerprint ".$lastEvent->block_timestamp."<br/>";
        usleep(250*1000);
        $lastEvent = fetchData($conn, $lastEvent->block_timestamp,$DBtimestamp);
        echo "Fetched 200 more up to fingerprint ".$lastEvent->block_timestamp."<br/>";
        flush();
        
        //echo "<br><br>";
        sleep(4);
        //mail("yogeshpadsala@gmail.com", "TT test", "rrr");
    }
}
mysqli_close($conn);
?>