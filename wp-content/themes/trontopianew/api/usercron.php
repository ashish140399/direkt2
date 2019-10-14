<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';

include '/home/trontopia/public_html/vendor/autoload.php';
$fullNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$solidityNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$eventServer = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
try {
    $tron = new \IEXBase\TronAPI\Tron($fullNode, $solidityNode, $eventServer);
} catch (\IEXBase\TronAPI\Exception\TronException $e) {
    exit($e->getMessage());
}

$query = "SELECT timestamp FROM settings where  id=1";
$result = mysqli_query($conn,$query);
$row = mysqli_fetch_array($result);
$timestamp = $row['timestamp'];
//$sql2 = "SELECT DISTINCT(user) FROM `roll` WHERE timestamp > '".$timestamp."' and user NOT IN (select userhexaddress from users)";    
$sql2 = "SELECT DISTINCT(user) FROM `roll` WHERE user NOT IN (select userhexaddress from users) UNION ALL SELECT DISTINCT(user) FROM `roll_classicDice` WHERE user NOT IN (select userhexaddress from users)";    
$res2 = mysqli_query($conn,$sql2);
if(mysqli_num_rows($res2)>0){
    while($row2 = mysqli_fetch_array($res2)){
        $userhexaddress = $row2['user'];
        $useraddress = str_replace('0x', '41', $userhexaddress);
        $useraddress = $tron->fromHex($useraddress);
        $account = $tron->getAccount($useraddress);
        $account_name = '';
        $name_updated = 0;
        if(!empty($account['account_name'])){
            $account_name = $tron->toUtf8($account['account_name']);
        }
        if($account_name==''){
            $username = substr($useraddress, 0, 5).'...'.substr($useraddress, -5);
        }else{
            $username = $account_name;
            $name_updated = 1;
        }
        
        $sql3 = "INSERT INTO users (userhexaddress,useraddress,username,name_updated) values ('".$userhexaddress."','".$useraddress."','".$username."',$name_updated)";
    echo'<br>'.$sql3;
        mysqli_query($conn,$sql3);
    }
}


//this is for LUCKY ONE address update
$sqlLucky = "SELECT DISTINCT(gambler) FROM `luckyOneBetFinished` WHERE gambler NOT IN (select userhexaddress from users)";    
$res2 = mysqli_query($conn,$sqlLucky);
if(mysqli_num_rows($res2)>0){
    while($row2 = mysqli_fetch_array($res2)){
        $userhexaddress = $row2['gambler'];
        $useraddress = str_replace('0x', '41', $userhexaddress);
        $useraddress = $tron->fromHex($useraddress);
        $account = $tron->getAccount($useraddress);
        $account_name = '';
        $name_updated = 0;
        if(!empty($account['account_name'])){
            $account_name = $tron->toUtf8($account['account_name']);
        }
        if($account_name==''){
            $username = substr($useraddress, 0, 5).'...'.substr($useraddress, -5);
        }else{
            $username = $account_name;
            $name_updated = 1;
        }
        
        $sql3 = "INSERT INTO users (userhexaddress,useraddress,username,name_updated) values ('".$userhexaddress."','".$useraddress."','".$username."',$name_updated)";
    echo'<br>'.$sql3;
       mysqli_query($conn,$sql3);
    }
}




 mysqli_close($conn);
?>