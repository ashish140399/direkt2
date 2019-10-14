<?php error_reporting(E_ALL); ini_set('display_errors',1);

include_once '../vendor/autoload.php';

$fullNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$solidityNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$eventServer = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
try {
    $tron = new \IEXBase\TronAPI\Tron($fullNode, $solidityNode, $eventServer);
} catch (\IEXBase\TronAPI\Exception\TronException $e) {
    exit($e->getMessage());
}
$tron->setAddress('TLdooei4yKKE2FeyHzdvgEzADCuhsZSGCu');


if(isset($_GET['txid']) && $_GET['txid']!=''){

$txid = $_GET['txid'];
$resultarr = array();

	$detail = $tron->getEventByTransactionID($txid);
	
	//txid is invalid
	if(!isset($detail[0]['block_number'])){
	    $resultarr['result']= false;
        $resultarr['msg'] = 'Invalid Txid Provided';
        echo json_encode($resultarr); 
	}
	else{
	    foreach($detail as $event){
		//print_r($event);
		
		$event_name = $event['event_name'];

		if($event_name=='BetStarted'){
		    
		    //print_r($event['result']);
		    
		    $rollIntegerVariables = $event['result']['_rollIntegerVariables'];
		    
		    $start = hexdec(substr($rollIntegerVariables,2*64,64));
			$end = hexdec(substr($rollIntegerVariables,3*64,64));
			$betAmount = hexdec(substr($rollIntegerVariables,4*64,64));
			$sidebetAmount = hexdec(substr($rollIntegerVariables,5*64,64));
			$sidebetInt =  hexdec(substr($rollIntegerVariables,6*64,64));
			$rollArray = array($start,$end,$betAmount,$sidebetAmount,$sidebetInt);

			$jsonarray = json_encode($rollArray);
		    
		    echo $eventTableHTML = "<table border=1><tr><th>Name</th><th>Description</th></tr> </tr><td> Gambler: </td> <td> ".$event['result']['_gambler'] ." </td> </tr> <tr> <td> Bet ID: </td> <td> ".$event['result']['_uniqueBetId'] ." </td> </tr><tr> <td> Seed: </td> <td> ".$event['result']['_userSeed'] ." </td> </tr><tr> <td> Block Number: </td> <td> ".$event['result']['_blockNumber'] ." </td> </tr><tr> <td> Roll Integer Variables: </td> <td> ". $jsonarray  ." </td> </tr>    </table>";
		    
		    
		}
	    }
	}
	
	
}