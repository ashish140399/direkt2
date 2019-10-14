<?php
 
include 'config.php';


if(isset($_GET['fingerprint']) && $_GET['fingerprint'] !='' ){
    $fingerprint = $_GET['fingerprint'];
}else{
    $fingerprint = '';
}
if(isset($_GET['page']) && $_GET['page'] !='' ){
    $page = $_GET['page'];
}else{
    $page = 1;
}


$contractAddress = "TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8";        
$url = "https://api.trongrid.io/v1/contracts/".$contractAddress."/events?limit=200&event_name=Transfer&fingerprint=".$fingerprint;

$counter = 1;


echo "<center><h1> Page: ".$page." </h1> </center>";


do {

    
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,$url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close ($ch);

$result = json_decode($output);
//var_dump($result);



foreach ($result->data as $value){

$blockNumber = $value->block_number;
$txid = $value->transaction_id;
$timestamp = $value->block_timestamp;
$from = $value->result->from;
$to = $value->result->to;
$value = $value->result->value;

//add to DB
if($from == "0x0000000000000000000000000000000000000000"){
    
/*
$insertSQL  = "INSERT INTO `transfer_leaderboard`( `txid`, `fromAddress`, `toAddress`, `tokenAmount`, `timestamp`) VALUES ( '$txid', '$from', '$to', $value,$timestamp)";
mysqli_query($conn,$insertSQL);
*/

}

echo $blockNumber." - ".$timestamp." - ".$txid." - ".$to. " - ".$value;

echo "<br>";
}

$url =  $result->meta->links->next;
$fingerprintNext = $result->meta->fingerprint;





echo "<br>===============================================================================================================";echo "<br>";





if($counter >= 10){
    $page++;
    echo "<a href='https://trontopia.co/api/transfer_leaderboard_manual.php?page=".$page."&fingerprint=".$fingerprintNext."' target='_blank'> NEXT </a>";
    echo "<br>";echo "<br>";echo "<br>";
    break;
}
$counter++;


    
} while (count($result->data) > 0);







mysqli_close($conn);


?>