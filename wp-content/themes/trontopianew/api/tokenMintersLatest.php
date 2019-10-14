<?php error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
if(isset($_GET['user'])){
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
try {
    $triggerContract = $tron->readContract($token_contract_abi,$token_contract,$function,$params,$feeLimit,$address,$callValue ,$bandwidthLimit = 10);
	$totalSupply = gmp_intval($triggerContract[0]->value);
} catch (\IEXBase\TronAPI\Exception\TronException $e) {
    die($e->getMessage());
}
$totalMinted = 0;
$myTotalMinted= 0;
$totalSupply = $totalSupply/100000000;
$stage = $totalSupply/1000000;
$stage = (int)$stage;
$mintRate =  stageCount($stage);
if($mintRate==833){
    $column = 'mined_833';
}else if($mintRate='1000'){
    $column = 'mined_1000';
}else if($mintRate='1010'){
    $column = 'mined_1010';
}else{
    $column = 'mined_1020';
}
$query = "SELECT topiaMintTime FROM settings where  id=1";
$result = mysqli_query($conn,$query);
if($result){
    $row = mysqli_fetch_array($result);
    $timestamp = $row['topiaMintTime'];
    $data =array();
    $resultarr = array();
    //uncomment below line for 4th Stage (1000 TRX) commnet line no 52
   // $sqltrx = "select sum(bet) total from ( select bet from roll where timestamp>='".$timestamp."'  union all select bet from sidebetrolls where timestamp>='".$timestamp."' union all select bet from roll_classicDice where timestamp >".$timestamp.") t";
   //uncomment below line after 3rd Stage ( 833 trx)
   // $sqltrx = "select sum(bet) total from ( select bet from roll where timestamp<='".$timestamp."'  union all select bet from sidebetrolls where timestamp<='".$timestamp."' union all select bet from roll_classicDice where timestamp <=".$timestamp.") t";
    //user total minted token query
    $sqluser_token = "select sum(tokenAmount) total_mined from transfer_leaderboard where timestamp>=".$timestamp." AND toAddress='".$userAddress."'";
    $resuser_token = mysqli_query($conn,$sqluser_token);
    if($resuser_token && mysqli_num_rows($resuser_token)>0){
        $row_user_token = mysqli_fetch_array($resuser_token);
        $myTotalMinted = $row_user_token['total_mined']/100000000;
    }else{
        $myTotalMinted = 0;
    }
    $sqltrx = "SELECT sum(tokenAmount) total,toAddress FROM `transfer_leaderboard` WHERE timestamp>=".$timestamp." AND toAddress!='0xeB5559E04A27c55060292c3BF4996Bdcc9CdC956' group by toAddress order by total DESC limit 0,100";
    $restrx = mysqli_query($conn,$sqltrx);
    
    if($restrx && mysqli_num_rows($restrx)>0){
        $x=1;
	   while($rowtrx = mysqli_fetch_array($restrx)){
	    $totaltrx = $rowtrx['total']/100000000;
	    $user = $rowtrx['toAddress'];
		    
			
			   
			    $sql2 = "SELECT username,useraddress,level FROM `users` WHERE userhexaddress = '".$user."'";    
    		    $res2 = mysqli_query($conn,$sql2);
    		    $row2 = mysqli_fetch_array($res2);

	    	    $image ='';
			    $color = '#ffffff';
			    $level = 0;
			   	if($row2['level']>0){

				    $sqlQuery = "SELECT image_url,color,level from levels where level =".$row2['level'];
	                $resQuery = mysqli_query($conn,$sqlQuery);        
	                if(mysqli_num_rows($resQuery)>0){
	                    $rowQuery = mysqli_fetch_array($resQuery);
	                    $image = $rowQuery['image_url'];
	                    $color = $rowQuery['color'];
	                    $level = $rowQuery['level'];
	                }  
               }
             $topia = $totaltrx;
             $topia = round($topia,2);
             $totalMinted = $totalMinted + $topia;
			//echo $sqlTT = "UPDATE users set ".$column."=".$topia.", total_mined = (mined_833+mined_1000) where userhexaddress='".$rowuser['user']."'";
			 //$resTTQuery = mysqli_query($conn,$sqlTT); 
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
			if($user!="0xeb5559e04a27c55060292c3bf4996bdcc9cdc956"){
			    $arr = array('user_wallet'=>$row2['useraddress'],'useraddres'=>$user,'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'topia'=>strval($topia),'reward'=>$trxReward);
			    array_push($data,$arr);    
			}
			
			$x++;
			}
		    mysqli_close($conn);
		   	$resultarr['result']= true;
		    $resultarr['data'] = $data;
		    $resultarr['totalSupply'] = number_format($totalSupply,2);
		    $resultarr['totalMinted'] = number_format($totalMinted,2);
		    $resultarr['myTotalMinted'] = number_format($myTotalMinted ,2);
		    echo json_encode($resultarr);
        
    }else{
	    mysqli_close($conn);
		$resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
	    
    }
}else{
        mysqli_close($conn);
	    $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
}
?>