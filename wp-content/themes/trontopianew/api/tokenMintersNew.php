<?php error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if($_GET['user']){
    $userAddress = $_GET['user'];
}else{
    $userAddress = '0x0';
}
include 'config.php';
mysqlCheck($conn);
include '/home/trontopia/public_html/vendor/autoload.php';
include 'contractabi.php';
$fullNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$solidityNode = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
$eventServer = new \IEXBase\TronAPI\Provider\HttpProvider('https://api.trongrid.io');
try {
    $tron = new \IEXBase\TronAPI\Tron($fullNode, $solidityNode, $eventServer);
} catch (\IEXBase\TronAPI\Exception\TronException $e) {
    exit($e->getMessage());
}
$function = 'totalSupply';
$params  = array("");
$feeLimit =1000000000;
$callValue = 0;
$address = '41e2f31FC61c04d462FD7b3Dc8A8aEAAc765B8A10B';
$myTotalMinted=0;

try {
    $triggerContract = $tron->readContract($token_contract_abi,$token_contract,$function,$params,$feeLimit,$address,$callValue ,$bandwidthLimit = 10);
	$totalSupply = gmp_intval($triggerContract[0]->value);
} catch (\IEXBase\TronAPI\Exception\TronException $e) {
    die($e->getMessage());
}
$totalMinted = 0;
$totalSupply = $totalSupply/100000000;
$query = "SELECT * FROM users order by total_mined DESC limit 0,100";
$result = mysqli_query($conn,$query);
//user total minted token query
    $sqluser_token = "select total_mined from users where userhexaddress='".$userAddress."'";
    $resuser_token = mysqli_query($conn,$sqluser_token);
    if($resuser_token && mysqli_num_rows($resuser_token)>0){
        $row_user_token = mysqli_fetch_array($resuser_token);
        $myTotalMinted = $row_user_token['total_mined'];
    }else{
        $myTotalMinted = 0;
    }
if($result){
	$data =array();
    $resultarr = array();
    $x=1;
    while($row = mysqli_fetch_array($result)){

	    $image ='';
	    $color = '#ffffff';
	    $level = 0;
	    $sqlQuery = "SELECT image_url,color,level from levels where level =".$row['level'];
        $resQuery = mysqli_query($conn,$sqlQuery);        
        if(mysqli_num_rows($resQuery)>0){
            $rowQuery = mysqli_fetch_array($resQuery);
            $image = $rowQuery['image_url'];
            $color = $rowQuery['color'];
            $level = $rowQuery['level'];
        }  
        	 $topia = $row['total_mined'];
             $topia = round($topia,2);
             $totalMinted = $totalMinted + $topia;
			if($x==1){
			    $trxReward = 1000000;
			}else if($x==2){
			    $trxReward = 500000;
			}else if($x==3){
			    $trxReward = 100000;
			}else if ($x==4){
			    $trxReward = 50000;
			}else if ($x==5){
			    $trxReward = 25000;
			}else if ($x==6){
			    $trxReward = 25000;
			}else if ($x==7){
			    $trxReward = 25000;
			}else if ($x==8){
			    $trxReward = 25000;
			}else if ($x==9){
			    $trxReward = 25000;
			}else if ($x==10){
			    $trxReward = 25000;
			}else if ($x==11){
			    $trxReward = 10000;
			}else if ($x==12){
			    $trxReward = 10000;
			}else if ($x==13){
			    $trxReward = 10000;
			}else if ($x==14){
			    $trxReward = 10000;
			}else if ($x==15){
			    $trxReward = 10000;
			}else if ($x==16){
			    $trxReward = 10000;
			}else if ($x==17){
			    $trxReward = 10000;
			}else if ($x==18){
			    $trxReward = 10000;
			}else if ($x==19){
			    $trxReward = 10000;
			}else if ($x==20){
			    $trxReward = 10000;
			}else if ($x==21){
			    $trxReward = 10000;
			}else if ($x==22){
			    $trxReward = 10000;
			}else if ($x==23){
			    $trxReward = 10000;
			}else if ($x==24){
			    $trxReward = 10000;
			}else if ($x==25){
			    $trxReward = 10000;
			}else if ($x==26){
			    $trxReward = 2000;
			}else if ($x==27){
			    $trxReward = 2000;
			}else if ($x==28){
			    $trxReward = 2000;
			}else if ($x==29){
			    $trxReward = 2000;
			}else if ($x==30){
			    $trxReward = 2000;
			}else if ($x==31){
			    $trxReward = 2000;
			}else if ($x==32){
			    $trxReward = 2000;
			}else if ($x==33){
			    $trxReward = 2000;
			}else if ($x==34){
			    $trxReward = 2000;
			}else if ($x==35){
			    $trxReward = 2000;
			}else if ($x==36){
			    $trxReward = 2000;
			}else if ($x==37){
			    $trxReward = 2000;
			}else if ($x==38){
			    $trxReward = 2000;
			}else if ($x==39){
			    $trxReward = 2000;
			}else if ($x==40){
			    $trxReward = 2000;
			}else if ($x==41){
			    $trxReward = 2000;
			}else if ($x==42){
			    $trxReward = 2000;
			}else if ($x==43){
			    $trxReward = 2000;
			}else if ($x==44){
			    $trxReward = 2000;
			}else if ($x==45){
			    $trxReward = 2000;
			}else if ($x==46){
			    $trxReward = 2000;
			}else if ($x==47){
			    $trxReward = 2000;
			}else if ($x==48){
			    $trxReward = 2000;
			}else if ($x==49){
			    $trxReward = 2000;
			}
			    
			$arr = array('useraddres'=>$row['useraddress'],'user'=>$row['username'],'level'=>$row['level'],'image'=>$image,'color'=>$color,'topia'=>strval($topia),'reward'=>$trxReward);
			array_push($data,$arr);

	$x++;
    }
		    mysqli_close($conn);
		    $resultarr['result']= true;
		    $resultarr['data'] = $data;
		    $resultarr['totalSupply'] = number_format($totalSupply,2);
		    $resultarr['totalMinted'] = number_format($totalMinted,2);
		    $resultarr['myTotalMinted'] = number_format($myTotalMinted ,2);
		   // $resultarr['query'] = $sqluser_token;
		    echo json_encode($resultarr);	
      
    
}else{
            mysqli_close($conn);
        	$resultarr['result']= false;
	        $resultarr['msg'] = 'No Data Found.';
	        echo json_encode($resultarr);
}
?>