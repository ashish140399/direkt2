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
$sql = "SELECT useraddress FROM `users` WHERE useraddress!='' AND name_updated = 0 AND status=0";    
$res = mysqli_query($conn,$sql);

if(mysqli_num_rows($res)>0){
    
    while($row = mysqli_fetch_array($res)){
        $useraddress = $row['useraddress'];
        $account = $tron->getAccount($useraddress);
        $account_name = '';

        if(!empty($account['account_name'])){
            $account_name = $tron->toUtf8($account['account_name']);
            $sql2 = "UPDATE users  set username = '".$account_name."',name_updated=1 where useraddress='".$useraddress."'";
            mysqli_query($conn,$sql2);
        }
        
    }
}
 mysqli_close($conn);

?>