
application/x-httpd-php luckyOneCron.php ( PHP script, ASCII text )
<?php error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
//get latest timestamp from roll_classicDice table
$query = "SELECT max(timestamp) timestamp FROM `luckyOneBetFinished`";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
$DBtimestamp = $row['timestamp'];

//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint,$DBtimestamp){
        
    $url = TRONGRID_EVENT_API_URL.LUCKY_ONE_CONTRACT_ADDRESS.'?size=200';
    
    if ($previousLastEventFingerprint !== null)
    {
         $url .= "&start_timeStamp=".$previousLastEventFingerprint;
    }
    echo $url;
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
        //print_r($value);
        $last = $value;
        
        if($value->event_name == 'BetFinished'){
            
            $transaction_id = $value->transaction_id;
            $user = $value->result->_gambler;
            $betHash = $value->result->_betHash;
            $randomNumber = $value->result->_randomNumber;
            $betTRX = $value->result->_betTRX;
            $normalPayout = $value->result->_normalPayout;      
            $jackpotPayout = $value->result->_jackpotPayout;
            $profit = $value->result->_profit;
            $timestamp = $value->block_timestamp;
            //echo $newtimestamp = $value->result->_timestamp;
            //echo '<br>';
            
            
           // if($timestamp>=$DBtimestamp){
                $sql = "SELECT * FROM `luckyOneBetFinished` where txid='".$transaction_id."' AND timestamp=".$timestamp." AND gambler='".$user."' AND randomNumber=".$randomNumber;
                $res = mysqli_query($conn,$sql);
                $num_rows = mysqli_num_rows($res);
                if($num_rows==0){
                    
                  echo  $insertSQL  = "Insert into luckyOneBetFinished (txid,betHash,randomNumber,betTRX, normalPayout, jackpotPayout, profit,gambler, timestamp  ) values ('$transaction_id','$betHash','$randomNumber','$betTRX', '$normalPayout', '$jackpotPayout', '$profit','$user', '$timestamp')";
                    mysqli_query($conn,$insertSQL); 
                    echo '<br>';
                }
            //}
            if($betTRX>249){
                $insertSQL  = "Insert into highrollers_luckyOne (transaction_id,betHash,randomNumber,bet,normalPayout, jackpotPayout, profit ,user, timestamp  ) values ('$transaction_id','$betHash',$randomNumber,'$betTRX', '$normalPayout', '$jackpotPayout', '$profit','$user','$timestamp')";
                mysqli_query($conn,$insertSQL);    
            }
            
        }else if ($value->event_name == 'BetStarted'){
            
            $transaction_id = $value->transaction_id;
            $user = $value->result->_gambler;
            $betHash = $value->result->_betHash;
            $uniqueBetId = $value->result->_uniqueBetId;
            $userSeed = $value->result->_userSeed;
            $blockNumber = $value->block_number;
            $betTRX = $value->result->_betTRX;
            $timestamp = $value->block_timestamp/1000;
            
            $insertSQL  = "Insert into betStarted_luckyOne (transaction_id,user,newUnfinishedBetHash,uniqueBetId,userSeed, blockNumber, betTRX , timestamp  ) values ('$transaction_id','$user','$betHash', '$uniqueBetId', '$userSeed', '$blockNumber','$betTRX', '$timestamp')";
            mysqli_query($conn,$insertSQL);
        
        }else if ($value->event_name == 'HighRollers'){
            
            $transaction_id = $value->transaction_id;
            $user = $value->result->_gambler;
            $betHash = $value->result->_betHash;
            $randomNumber = $value->result->_randomNumber;
            $betTRX = $value->result->_betTRX;
            $normalPayout = $value->result->_normalPayout;
            $jackpotPayout = $value->result->_jackpotPayout;
            $profit = $value->result->_profit;
            $timestamp = $value->block_timestamp/1000;
            
            $insertSQL  = "Insert into highrollers_luckyOne (transaction_id,betHash,randomNumber,bet,normalPayout, jackpotPayout, profit ,user, timestamp  ) values ('$transaction_id','$betHash',$randomNumber,'$betTRX', '$normalPayout', '$jackpotPayout', '$profit','$user','$timestamp')";
            //mysqli_query($conn,$insertSQL);
        
        }else if ($value->event_name == 'RareWins'){
            
            $transaction_id = $value->transaction_id;
            $user = $value->result->_gambler;
            $betHash = $value->result->_betHash;
            $randomNumber = $value->result->_randomNumber;
            $betTRX = $value->result->_betTRX;
            $normalPayout = $value->result->_normalPayout;
            $jackpotPayout = $value->result->_jackpotPayout;
            $profit = $value->result->_profit;
            $timestamp = $value->block_timestamp/1000;
            
         echo   $insertSQL  = "Insert into rareWins_luckyOne (transaction_id,betHash,randomNumber,bet,normalPayout, jackpotPayout, profit ,user, timestamp  ) values ('$transaction_id','$betHash',$randomNumber,'$betTRX', '$normalPayout', '$jackpotPayout', '$profit','$user','$timestamp')";
            mysqli_query($conn,$insertSQL);
        
        }
        
    }
    
    return $last;
    
}



for($i=0; $i<10; $i++){
        
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
    
    mysqli_close($conn);
?>