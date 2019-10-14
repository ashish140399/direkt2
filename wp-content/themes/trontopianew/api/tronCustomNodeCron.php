<?php error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
include 'encodeAddress.php';
//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint){
        
    $url = CUSTOM_NODE_EVENT_API_URL.GAME_CONTRACT_ADDRESS.'?limit=200';
    
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
//print_r($output);
//exit;
 $last = null;
foreach ($output as $key => $value) {
    if($last==null){$last = $value;}
    
    if($value->eventName == 'BetStarted'){
    	    $transaction_id = $value->transactionId;
            $user = $value->{1};
            $user = convertAddress($user);
            $betHash =$value->{0};
            $strvars = $value->{2};
            $uniqueBetId = substr($strvars,0,64);
            $userSeed = substr($strvars,64,64);
            $blockNumber = $value->blockNumber;    	
            $rollIntegerVariables = $strvars; 
        	
        
           $insertSQL  = "Insert into betStarted (transaction_id,user,newUnfinishedBetHash,uniqueBetId,userSeed, rollIntegerVariables, blockNumber  ) values ('$transaction_id','$user','$betHash','$uniqueBetId','$userSeed', '$rollIntegerVariables', '$blockNumber')";
        	mysqli_query($conn,$insertSQL);
    	    
    	}
    	
    	else if($value->eventName == 'BetFinished'){
    	    $transaction_id = $value->transactionId;
            $betHash =$value->{0};

           $insertSQL  = "Insert into betFinished (betHash,txid) values ('$betHash','$transaction_id' )";
        	mysqli_query($conn,$insertSQL);
    	    
    /*	}
    	
    	else if($value->eventName == 'BetExpired'){
    	    

    	    $transaction_id = $value->transactionId;
        	$betHash = $value->{0};
        	$user = $value->result->user;
        	$betAmount = $value->result->betAmount;
        	
        
           $insertSQL  = "Insert into betExpired (betHash,txid,user,amount) values ('$betHash','$transaction_id', '$user', '$betAmount' )";
        	mysqli_query($conn,$insertSQL);
    */
    	    
    	}else if($value->eventName == 'KingTopian'){
	    $transaction_id = $value->transactionId;
    	$trxplayed = $value->{2};
    	$prize = $value->{1};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{3};
    
        $insertSQL  = "Insert into kingtopian (transaction_id,user,trxplayed,prize,timestamp) values ('$transaction_id','$user','$trxplayed','$prize','$timestamp')";
    	mysqli_query($conn,$insertSQL);
	    
	}elseif($value->eventName == 'Roll'){
	    $transaction_id = $value->transactionId;
    	$result = $value->{5};
    	$winningNumber = $value->{3};
    	$startNumber = $value->{1};
    	$endNumber = $value->{2};
    	$bet = $value->{4};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{6};
    
        $insertSQL  = "Insert into roll (transaction_id,result,start_number,end_number,winning_number,bet,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$user','$timestamp')";
    	mysqli_query($conn,$insertSQL);
	    
	}elseif($value->eventName == 'UnluckyBunch'){
	    $transaction_id = $value->transactionId;
    	$trxplayed = $value->{1};
    	$loose = $value->{2};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{3};
    
    	 $insertSQL  = "Insert into unluckybunch (transaction_id,user,trxplayed,loose,timestamp) values ('$transaction_id','$user','$trxplayed','$loose','$timestamp')";
    	mysqli_query($conn,$insertSQL);
	    
	}elseif($value->eventName == 'HighRollers'){
	    $transaction_id = $value->transactionId;
    	$result = $value->{6};
    	$winningNumber = $value->{3};
    	$startNumber = $value->{1};
    	$endNumber = $value->{2};
    	$winamount = $value->{5};
    	$bet = $value->{4};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{7};
    
    	 $insertSQL  = "Insert into highrollers (transaction_id,result,start_number,end_number,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$winamount','$user','$timestamp')";
    	mysqli_query($conn,$insertSQL);
	    
	}elseif($value->eventName == 'RareWins'){
	    $transaction_id = $value->transactionId;
    	$result = $value->{6};
    	$winningNumber = $value->{3};
    	$startNumber = $value->{1};
    	$endNumber = $value->{2};
    	$winamount = $value->{5};
    	$bet = $value->{4};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{7};
    
    	 $insertSQL  = "Insert into rarewins (transaction_id,result,start_number,end_number,winning_number,bet,winamount,user,timestamp) values ('$transaction_id','$result','$startNumber','$endNumber','$winningNumber','$bet','$winamount','$user','$timestamp')";
    	mysqli_query($conn,$insertSQL);
	    
	}elseif($value->eventName == 'SideBetRolls'){
	    $transaction_id = $value->transactionId;
    	$result = $value->{5};
    	$winningNumber = $value->{1};
    	$winamount = $value->{3};
    	$sidebet = $value->{4};
    	$bet = $value->{2};
    	$user = $value->{0};
    	$user = convertAddress($user);
    	$timestamp = $value->{6};
    
    	if($sidebet==1){$sidebet='yin';}
        if($sidebet==2){$sidebet='yang';}
        if($sidebet==3){$sidebet='bang';}
        if($sidebet==4){$sidebet='zero';}
        if($sidebet==5){$sidebet='odd';}
        if($sidebet==6){$sidebet='even';}
    
    	 $insertSQL  = "insert into sidebetrolls (transaction_id,result,sidebet,bet,winning_number,winamount,user,timestamp) values ('$transaction_id','$result','$sidebet','$bet',$winningNumber,'$winamount','$user','$timestamp')";
    	mysqli_query($conn,$insertSQL);

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
        echo "Fetched 200 up to fingerprint ".$lastEvent->timeStamp."<br/>";
        usleep(250*1000);
        $lastEvent = fetchData($conn, $lastEvent->timeStamp);
        echo "Fetched 200 more up to fingerprint ".$lastEvent->timeStamp."<br/>";
        flush();
        
        //echo "<br><br>";
        sleep(4);
        //mail("yogeshpadsala@gmail.com", "TT test", "rrr");
    }
mysqli_close($conn);
?>