<?php


error_reporting(E_ALL); ini_set('display_errors',1);

include 'config.php';
mysqlCheck($conn);


//this function will fetch and process data of ALL events
function fetchData($conn, $previousLastEventFingerprint){
$contractAddress = "TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8";        
$url = "https://api.trongrid.io/v1/contracts/".$contractAddress."/events?limit=200&event_name=Transfer&fingerprint=";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close ($ch);


$result = json_decode($output);



foreach ($result->data as $value){

echo $txid = $value->transaction_id;
echo "<br>";
echo $timestamp = $value->block_timestamp;
echo "<br>";
echo $from = $value->result->from;
echo "<br>";
echo $to = $value->result->to;
echo "<br>";
echo $value = $value->result->value;
echo "<br>";echo "<br>";echo "<br>";





if($from == "0x0000000000000000000000000000000000000000"){

	//add to DB
echo '<br>';
echo $insertSQL  = "INSERT INTO `transfer_leaderboard`( `txid`, `fromAddress`, `toAddress`, `tokenAmount`, `timestamp`) VALUES ( '$txid', '$from', '$to', $value,$timestamp)";
mysqli_query($conn,$insertSQL);
	
	
	
    }


    }
}

 for($i=0; $i<2; $i++){
    fetchData($conn, null);
    sleep(4);  
     
 }

mysqli_close($conn);


?>