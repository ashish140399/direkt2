<?php //error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

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
    $sqltrx = "select sum(bet) total from ( select bet from roll where timestamp<='".$timestamp."'  union all select bet from sidebetrolls where timestamp<='".$timestamp."' union all select bet from roll_classicDice where timestamp <=".$timestamp.") t";
    $restrx = mysqli_query($conn,$sqltrx);
    
    if($restrx && mysqli_num_rows($restrx)>0){
	    $rowtrx = mysqli_fetch_array($restrx);
	    $totaltrx = $rowtrx['total'];
	    
	    $sqluser = "select user,sum(bet) total
                from
                (
                    select user,bet
                    from roll 
                    where timestamp>='".$timestamp."'
                    union all
                    select user,bet
                    from sidebetrolls
                    where timestamp>='".$timestamp."'
                    union all
                    select user,bet
                    from roll_classicDice
                    where timestamp >".$timestamp."
                ) t
                group by user order by total DESC limit 0,100";
        
        $resuser = mysqli_query($conn,$sqluser);
        
		if(mysqli_num_rows($resuser)>0){
		    $x=1;
			while($rowuser = mysqli_fetch_array($resuser)){
			    $sql2 = "SELECT username,useraddress FROM `users` WHERE userhexaddress = '".$rowuser['user']."'";    
    		    $res2 = mysqli_query($conn,$sql2);
    		    $row2 = mysqli_fetch_array($res2);

	    	    $image ='';
			    $color = '#ffffff';
			    $level = 0;
			    $sqlQuery = "SELECT image_url,color,level from levels where level IN(select level from users where userhexaddress='".$rowuser['user']."')";
                $resQuery = mysqli_query($conn,$sqlQuery);        
                if(mysqli_num_rows($resQuery)>0){
                    $rowQuery = mysqli_fetch_array($resQuery);
                    $image = $rowQuery['image_url'];
                    $color = $rowQuery['color'];
                    $level = $rowQuery['level'];
                }  
                
             $topia = $rowuser['total']/$mintRate;
             $topia = round($topia,2);
             $totalMinted = $totalMinted + $topia;
			echo $sqlTT = "UPDATE users set ".$column."=".$topia.", total_mined = (mined_833+mined_1000) where userhexaddress='".$rowuser['user']."'";
			 $resTTQuery = mysqli_query($conn,$sqlTT); 
		//	$arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'topia'=>strval($topia),'reward'=>$trxReward);
		//	array_push($data,$arr);
			$x++;
			}
		    mysqli_close($conn);
		   
        }else{
            mysqli_close($conn);
        	
	       echo  'No Data Found.';

        }
    }else{
	    mysqli_close($conn);

	  echo 'No Data Found.';
	    
    }
}else{
            mysqli_close($conn);
	    echo  'No Data Found.';
}
?>