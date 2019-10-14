<?php error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
//get latest timestamp from roll table
$query = "SELECT max(timestamp) timestamp FROM `roll`";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
$DBtimestamp = $row['timestamp'];

//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint,$DBtimestamp){
        
    $url = TRONGRID_V2_EVENT_API_URL.GAME_CONTRACT_ADDRESS.'?size=200';
    
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
    //exit;
    $last = null;
    foreach ($output as $key => $value) {
    	//print_r($value->event_name);
    	
    	$last = $value;
    	
    	if($value->event_name == 'BetStarted'){
    	    $transaction_id = $value->transaction_id;
        	$user = $value->result->_gambler;
        	$betHash = $value->result->_betHash;
        	$uniqueBetId = $value->result->_uniqueBetId;
        	$userSeed = $value->result->_userSeed;
        	$blockNumber = $value->result->_blockNumber;    	
        	$rollIntegerVariables = $value->result->_rollIntegerVariables;    	
        	
        
           $insertSQL  = "Insert into betStarted (transaction_id,user,newUnfinishedBetHash,uniqueBetId,userSeed, rollIntegerVariables, blockNumber  ) values ('$transaction_id','$user','$betHash','$uniqueBetId','$userSeed', '$rollIntegerVariables', '$blockNumber')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}
    	
    	else if($value->event_name == 'BetFinished'){
    	    

    	    $transaction_id = $value->transaction_id;
        	$betHash = $value->result->_betHash;
        	
        
           $insertSQL  = "Insert into betFinished (betHash,txid) values ('$betHash','$transaction_id' )";
        	mysqli_query($conn,$insertSQL);
    	    
    	}
    	
    	else if($value->event_name == 'BetExpired'){
    	    

    	    $transaction_id = $value->transaction_id;
        	$betHash = $value->result->betHash;
        	$user = $value->result->user;
        	$betAmount = $value->result->betAmount;
        	
        
           $insertSQL  = "Insert into betExpired (betHash,txid,user,amount) values ('$betHash','$transaction_id', '$user', '$betAmount' )";
        	mysqli_query($conn,$insertSQL);
    	    
    	}
    	
    	elseif($value->event_name == 'KingTopian'){
    	    $transaction_id = $value->transaction_id;
        	$trxplayed = $value->result->_trxplayed;
        	$prize = $value->result->_prize;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
            
            $insertSQL  = "Insert into kingtopian (transaction_id,user,trxplayed,prize,timestamp) values ('$transaction_id','$user','$trxplayed','$prize','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'Roll'){
    
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$endNumber = $value->result->_endNumber;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
            if($timestamp>=$DBtimestamp){
        		$sql = "SELECT * FROM `roll` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND user='".$user."' AND winning_number=".$winningNumber;
        		$res = mysqli_query($conn,$sql);
        		$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
        			
            		$insertSQL  = "Insert into roll (transaction_id,result,start_number,end_number,winning_number,bet,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$user','$timestamp')";
        	        mysqli_query($conn,$insertSQL);
        		}
        		
        	}
        	
        }elseif($value->event_name == 'UnluckyBunch'){
    	    $transaction_id = $value->transaction_id;
        	$trxplayed = $value->result->_trxplayed;
        	$loose = $value->result->_loose;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
            $sql = "SELECT * FROM `unluckybunch` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND user='".$user."' AND trxplayed=".$trxplayed;
        	$res = mysqli_query($conn,$sql);
        	$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
        	        $insertSQL  = "Insert into unluckybunch (transaction_id,user,trxplayed,loose,timestamp) values ('$transaction_id','$user','$trxplayed','$loose','$timestamp')";
        	        mysqli_query($conn,$insertSQL);
        		}
    	    
    	}elseif($value->event_name == 'HighRollers'){
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$endNumber = $value->result->_endNumber;
        	$winamount = $value->result->_winamount;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
        	 $insertSQL  = "Insert into highrollers (transaction_id,result,start_number,end_number,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$winamount','$user','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'RareWins'){
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$startNumber = $value->result->_startNumber;
        	$endNumber = $value->result->_endNumber;
        	$winamount = $value->result->_winamount;
        	$bet = $value->result->_value;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
        	 $insertSQL  = "Insert into rarewins (transaction_id,result,start_number,end_number,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$winamount','$user','$timestamp')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}elseif($value->event_name == 'SideBetRolls'){
    	    $transaction_id = $value->transaction_id;
        	$result = $value->result->result;
        	$winningNumber = $value->result->_winningNumber;
        	$winamount = $value->result->winAmount;
        	$sidebet = $value->result->sideBet;
        	$bet = $value->result->_betValue;
        	$user = $value->result->user;
        	$timestamp = $value->result->timestamp;
        
        	if($sidebet==1){$sidebet='yin';}
            if($sidebet==2){$sidebet='yang';}
            if($sidebet==3){$sidebet='bang';}
            if($sidebet==4){$sidebet='zero';}
            if($sidebet==5){$sidebet='odd';}
            if($sidebet==6){$sidebet='even';}
        
        	if($timestamp>=$DBtimestamp){
        		$sql = "SELECT * FROM `sidebetrolls` where transaction_id='".$transaction_id."' AND timestamp=".$timestamp." AND user='".$user."' AND winning_number=".$winningNumber;
        		$res = mysqli_query($conn,$sql);
        		$num_rows = mysqli_num_rows($res);
        		if($num_rows==0){
        		
            		$insertSQL  = "insert into sidebetrolls (transaction_id,result,sidebet,bet,winning_number,winamount,user,timestamp) values ('$transaction_id','$result','$sidebet','$bet',$winningNumber,'$winamount','$user','$timestamp')";
        	        mysqli_query($conn,$insertSQL);
        		}
        		
        	}
        	
        	
    
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
        
        
        
        $lastEvent = fetchData($conn, null, $DBtimestamp);
        echo "Fetched 200 up to fingerprint ".$lastEvent->_fingerprint."<br/>";
        usleep(250*1000);
        $lastEvent = fetchData($conn, $lastEvent->_fingerprint, $DBtimestamp);
        echo "Fetched 200 more up to fingerprint ".$lastEvent->_fingerprint."<br/>";
        flush();
        
        //echo "<br><br>";
        sleep(4);
        //mail("yogeshpadsala@gmail.com", "TT test", "rrr");
    }
}
mysqli_close($conn);
?>