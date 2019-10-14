<?php 
//database config

/*
//system default localhost server
define('DB_HOST','localhost');
define('DB_USER','trontopi_main');
define('DB_PASS','TronTopiaIsComing4###');
define('DB_NAME','trontopi_main');
*/


//system default localhost server
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','trontopi_main');

// new ones main net 21-09-19
//define('CLASSIC_DICE_GAME_CONTRACT_ADDRESS','TRujGG6yD1uTWmC21pPnHjBhbPuwX5GbeR');
//define('GAME_CONTRACT_ADDRESS','TYufTg9BVa3GkVakCfDoosdJB6FVdojUH6');
//define('TOKEN_CONTRACT_ADDRESS','TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8');
//define('LUCKY_ONE_CONTRACT_ADDRESS','TVpiKnHCesoXTbzAVHzoyRtFUQxCbzS5Wk');
//define('VOUCHER_CONTRACT_ADDRESS','TTje3yoadUpuHrVnm9Bju4njBv3vm4WRrQ');

// new ones main net 28-09-19
define('CLASSIC_DICE_GAME_CONTRACT_ADDRESS','TRzwSBRFzfUuKwTAh7Yh4ih6UGTfaDDrGY');
define('GAME_CONTRACT_ADDRESS','TVjPNiXRohHupNr44LsDngqQZ5gndan5FT');
define('TOKEN_CONTRACT_ADDRESS','TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8');
define('LUCKY_ONE_CONTRACT_ADDRESS','TBetsski7xFQcTBV9qeqPoBtHDqHcvaXW8');
define('VOUCHER_CONTRACT_ADDRESS','TTje3yoadUpuHrVnm9Bju4njBv3vm4WRrQ');

//API URLs
define('TRONGRID_EVENT_API_URL','https://api.trongrid.io/event/contract/');
define('TRONGRID_V2_EVENT_API_URL','https://v2.api.trongrid.io/event/contract/');
define('TRONEX_EVENT_API_URL','https://api.tronex.io/events/');
define('CUSTOM_NODE_EVENT_API_URL','http://api.topia.network/events/');

$conn = mysqli_connect(DB_HOST,DB_USER, DB_PASS,DB_NAME);
// Check connection
if (mysqli_connect_errno()){
  //	echo "Failed to connect to MySQL: " . mysqli_connect_error();
 }

function mysqlCheck($conn){
    if(!$conn){
        $resultarr['result'] = false;
	    $resultarr['msg'] = 'Mysql Connection Failed.';
	    echo json_encode($resultarr);
	    exit;
    }

}

?>
