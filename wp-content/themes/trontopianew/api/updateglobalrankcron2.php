<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
$table_name = 'users2';
/*
//this can not run every time it only run 1 time 

$sql = "SELECT sum(bet) total ,user FROM `all_bets` group by user order by total desc";
$res = mysqli_query($conn,$sql);
	if(mysqli_num_rows($res)>0){
		while($row = mysqli_fetch_array($res)){
			echo $sql2 = "UPDATE `users2` set trx_wagered_old=".$row['total']." WHERE userhexaddress = '".$row['user']."'";    
	    	mysqli_query($conn,$sql2);
	    }
	}

exit;
*/
$timestamp = 1566822762;

$sql = "select user,sum(bet) total
from
(
    select user,bet from roll where timestamp>".$timestamp."
    union all
    select user,bet from sidebetrolls WHERE timestamp>".$timestamp."
    union all
    select user,bet from roll_classicDice where timestamp>".$timestamp."
    union all
    select gambler,betTRX from luckyOneBetFinished where timestamp>".$timestamp."
) t
group by user order by total DESC";
$res = mysqli_query($conn,$sql);
if(mysqli_num_rows($res)>0){
	while($row = mysqli_fetch_array($res)){
		$user = $row['user'];
		$total = $row['total'];
		// add trx_wagered 
        $sql2 = "UPDATE ".$table_name." set trx_wagered=".$total." WHERE userhexaddress = '".$user."'";    
    	mysqli_query($conn,$sql2);
    }
}
// update trx wagered total
$sql2 = "UPDATE ".$table_name." set trx_wagered_total=trx_wagered_old+trx_wagered";    
mysqli_query($conn,$sql2);


//update level
$wagered = 763000000;
$sql3 = "SELECT userhexaddress as user,trx_wagered_total as total from ".$table_name;
$res3 = mysqli_query($conn,$sql3);
if(mysqli_num_rows($res3)>0){
	while($row3 = mysqli_fetch_array($res3)){
		$user = $row3['user'];
		$total = (int)$row3['total'];
		//if($row['user']=='0x1861ba92e0a73b2b5cf8f09eb1012ced86a04a2e'){$total = 763000000;}
		// if($row['user']=='0x47dc7730c52457d426707da6a332f9b5583b42bc'){$total = 623000000;}
		// if($row['user']=='0x43bca911fc059a261b1975e9883d93853525c2bf'){$total = 26000000;}
		// if($row['user']=='0xc0e4576bb27079646f2d5c9acaac5c4c3e5e9c60'){$total = 11000000;}
		// if($row['user']=='0xc8555b90224cc82721dd2e8d93864d4e48966227'){$total = 31000000;}
		// if($row['user']=='0xba6032db9c8188d3377982013fcaa3a963b651be'){$total = 223000000;}
	
		
        $sqlQuery = "SELECT MAX(level) as level,MAX(wagered) as wagered FROM `levels` WHERE level!=9999 AND wagered <".$total.
			" UNION ALL".
		" SELECT MIN(level) as level ,MAX(wagered) as wagered FROM `levels` WHERE level!=9999 AND wagered >=".$total;
		$resQuery = mysqli_query($conn,$sqlQuery);
		if(mysqli_num_rows($resQuery)>0){
		    $level=0;
			while($rowQuery = mysqli_fetch_array($resQuery)){
			    
				if($rowQuery['level']!==NULL){
					$levelChk = $rowQuery['level'];
					$wagered = (int)$rowQuery['wagered'];
					if($total>=$wagered){
						if($levelChk==100){
							$level = $levelChk;
						}else{
						    if($levelChk>=1){
						        $level = $levelChk-1;
						    }else{
						        $level = $levelChk;
						    }
						    
						}
					}
				}
			}
		}
		if($row3['user']=='0x1861ba92e0a73b2b5cf8f09eb1012ced86a04a2e'){$level = 9999;}
		if($row3['user']=='0xdd7229753d68712c5085b4b9feb4b1ccee151493'){$level = 9999;}
		if($row3['user']=='0x351198e23a52ac30f1f9cbace91c45591f9a64ee'){$level = 9999;}
		if($row3['user']=='0x3d9750aabd4350e79520388cdb6c04c8b93f987e'){$level = 9999;}
		if($row3['user']=='0xfbaaeac8d18aac1ff0fbcdc005089425340874dc'){$level = 9999;}
		if($row3['user']=='0xc4f53bc5be54a188a00cb508369ab77ef5abcc88'){$level = 9999;}
		if($row3['user']=='0x9f7ae45e6bf0f9ef090797249a0463553b019b26'){$level = 9999;}	
		if($row3['user']=='0x2d02f5d1efe173b25cbde03878f1d82e3e1a2787'){$level = 9999;}
		if($row3['user']=='0x294f5ad73bfe06c6d41cda259962293864cbdd9f'){$level = 9999;}
		if($row3['user']=='0xce54c700fc1e24b751580143bb8e2f3f542dedea'){$level = 9999;}
		if($row3['user']=='0xc17bc1912cbd5c06929149f1ee87dbc5986c4179'){$level = 9999;}
		if($row3['user']=='0x43bCa911FC059a261B1975E9883D93853525c2BF'){$level = 9999;}
		if($row3['user']=='0xb5E050a5a067360C8753E6Ed1abF7Cc4d37E4655'){$level = 9999;}
		if($row3['user']=='0x1A628a3F20074D08dA739409b974757c4f86a2F7'){$level = 9999;}

		$sql4= "UPDATE `users2` set level=".$level." WHERE userhexaddress = '".$user."'";    
	//	echo $sql4.'<br>';
    	mysqli_query($conn,$sql4);
	}
	
}



 mysqli_close($conn);
?>