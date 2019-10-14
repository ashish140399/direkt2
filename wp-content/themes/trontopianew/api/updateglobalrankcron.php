<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';

$sql = "select user,sum(bet) total
from
(
    select user,bet from roll
    union all
    select user,bet from sidebetrolls
    union all
    select user,bet from roll_classicDice,
    union all
    select gambler,betTRX from luckyOneBetFinished
) t
group by user order by total DESC";
$res = mysqli_query($conn,$sql);
if(mysqli_num_rows($res)>0){
	while($row = mysqli_fetch_array($res)){
		$user = $row['user'];
		$total = $row['total'];
		//if($row['user']=='0x1861ba92e0a73b2b5cf8f09eb1012ced86a04a2e'){$total = 763000000;}
		// if($row['user']=='0x47dc7730c52457d426707da6a332f9b5583b42bc'){$total = 623000000;}
		// if($row['user']=='0x43bca911fc059a261b1975e9883d93853525c2bf'){$total = 26000000;}
		// if($row['user']=='0xc0e4576bb27079646f2d5c9acaac5c4c3e5e9c60'){$total = 11000000;}
		// if($row['user']=='0xc8555b90224cc82721dd2e8d93864d4e48966227'){$total = 31000000;}
		// if($row['user']=='0xba6032db9c8188d3377982013fcaa3a963b651be'){$total = 223000000;}
		$sqlQuery = "SELECT MAX(level) as level,MAX(wagered) FROM `levels` WHERE wagered <".$total.
			" UNION ALL".
		" SELECT MIN(level) as level ,MAX(wagered) FROM `levels` WHERE wagered >=".$total;
		$resQuery = mysqli_query($conn,$sqlQuery);
		if(mysqli_num_rows($resQuery)>0){
			while($rowQuery = mysqli_fetch_array($resQuery)){
				$level=0;
				if($rowQuery['level']!==NULL){
					$levelChk = $rowQuery['level'];
					if($total>=$wagered){
						if($levelChk==100){
							$level = $levelChk;
						}else{
							$level = $levelChk-1;
						}
					}
				}
			}
		}
		if($row['user']=='0x1861ba92e0a73b2b5cf8f09eb1012ced86a04a2e'){$level = 9999;}
		if($row['user']=='0xdd7229753d68712c5085b4b9feb4b1ccee151493'){$level = 9999;}
		if($row['user']=='0x351198e23a52ac30f1f9cbace91c45591f9a64ee'){$level = 9999;}
		if($row['user']=='0x3d9750aabd4350e79520388cdb6c04c8b93f987e'){$level = 9999;}
		if($row['user']=='0xfbaaeac8d18aac1ff0fbcdc005089425340874dc'){$level = 9999;}
		if($row['user']=='0xc4f53bc5be54a188a00cb508369ab77ef5abcc88'){$level = 9999;}
		if($row['user']=='0x9f7ae45e6bf0f9ef090797249a0463553b019b26'){$level = 9999;}	
		if($row['user']=='0x2d02f5d1efe173b25cbde03878f1d82e3e1a2787'){$level = 9999;}
		if($row['user']=='0x294f5ad73bfe06c6d41cda259962293864cbdd9f'){$level = 9999;}
		if($row['user']=='0xce54c700fc1e24b751580143bb8e2f3f542dedea'){$level = 9999;}
		if($row['user']=='0xc17bc1912cbd5c06929149f1ee87dbc5986c4179'){$level = 9999;}
		if($row['user']=='0x43bCa911FC059a261B1975E9883D93853525c2BF'){$level = 9999;}
		if($row['user']=='0xb5E050a5a067360C8753E6Ed1abF7Cc4d37E4655'){$level = 9999;}
		if($row['user']=='0x1A628a3F20074D08dA739409b974757c4f86a2F7'){$level = 9999;}

		$sql2 = "UPDATE `users` set trx_wagered=".$total.",level=".$level." WHERE userhexaddress = '".$row['user']."'";    
    	mysqli_query($conn,$sql2);
	}
	
}
 mysqli_close($conn);
?>