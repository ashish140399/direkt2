<?php //error_reporting(E_ALL); ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
if(!isset($_COOKIE['_sidr'])) {
    $result['result']= false;
	$result['msg'] = "Failed to send message";
    echo json_encode($result);
    exit();	
}else{
	$user = $_COOKIE["_sidr"]; 
}

include 'config.php';
mysqlCheck($conn);
if($_POST['message']){
	$message = mysqli_real_escape_string($conn,$_POST['message']);
	$message = strip_tags($message);
	$sqlBan = "SELECT * from banned where address='".mysqli_real_escape_string($conn, $user)."'";
	$resBan = mysqli_query($conn,$sqlBan);
	if($resBan){	
		if(mysqli_num_rows($resBan)>0){
			mysqli_close($conn);
	    	$result['result']= false;
	    	$result['msg'] = 'You have been permanently Banned from chat.';
		    echo json_encode($result);
		    exit();	
		}
	}
	
	$sqlMute = "SELECT * from muted where address='".mysqli_real_escape_string($conn, $user)."'";
	$resMute = mysqli_query($conn,$sqlMute);
	if($resMute){	
		if(mysqli_num_rows($resMute)>0){
			mysqli_close($conn);
	    	$result['result']= false;
	    	$result['msg'] = 'You have been Muted from chat for 24 hours.';
		    echo json_encode($result);
		    exit();	
		}
	}

	$sqlLvl = "SELECT level from users where useraddress='".mysqli_real_escape_string($conn, $user)."'"; 
	$resLvl = mysqli_query($conn,$sqlLvl);
	if($resLvl){
		$rowLvl = mysqli_fetch_array($resLvl);
		$userLvl = $rowLvl['level'];
		if($userLvl==0){
			mysqli_close($conn);
	    	$result['result']= false;
		    echo json_encode($result);
		    exit();
		}
		if($userLvl==9999){
			$ban = substr($message, 0,4);
			$mute = substr($message, 0,5);
			if($ban=='/ban'){
				$address = substr($message, 5);
				$sqlDel = "DELETE from chat where userid = '".mysqli_real_escape_string($conn, $address)."'";
				mysqli_query($conn,$sqlDel);
				$sqlBan =  "INSERT INTO banned (address) values ('".mysqli_real_escape_string($conn, $address)."')";
				mysqli_query($conn,$sqlBan);
				mysqli_close($conn);
	    		$result['result']= true;
		    	echo json_encode($result);
		    	exit();
			}
			if($mute=='/mute'){
				$time = time() + 24*60*60;
				$address = substr($message, 6);
				$sqlDel = "DELETE from chat where userid = '".mysqli_real_escape_string($conn, $address)."'";
				mysqli_query($conn,$sqlDel);
				$sqlMuted =  "INSERT INTO muted (`address`,`tilltime`) values ('".mysqli_real_escape_string($conn, $address)."','".$time."')";
				mysqli_query($conn,$sqlMuted);
				mysqli_close($conn);
	    		$result['result']= true;
		    	echo json_encode($result);
		    	exit();
			}		
		}
	}else{
		mysqli_close($conn);
    	$result['result']= false;
	    echo json_encode($result);
	    exit();
	}
		
	$sqlT = "select username from users where useraddress='".$user."'";
	$resT = mysqli_query($conn,$sqlT);
     
    if($resT){
    	$rowT = mysqli_fetch_array($resT);		
    	$username = $rowT['username'];
    }else{
    	$username = substr($user, 0, 5).'...'.substr($user, 0, 5);
    }
	$sql = "INSERT INTO chat (userid,username,message) values ('".mysqli_real_escape_string($conn, $user)."','".mysqli_real_escape_string($conn, $username)."','".mysqli_real_escape_string($conn, $message)."')";    
    $res = mysqli_query($conn,$sql);
     
    if($res){
    	$result['result']= true;
    	//$result['lastid'] = mysqli_insert_id($conn);
    	mysqli_close($conn);
	    echo json_encode($result);
	    exit() ;	
    }else{
    	mysqli_close($conn);
    	$result['result']= false;
    	$result['msg'] = "Failed to store message";
	    echo json_encode($result);
	    exit() ;	
    }
}else{
	mysqli_close($conn);
	$result['result']= false;
	$result['msg'] = "Missing parameters";
	echo json_encode($result);
	exit() ;	
}
mysqli_close($conn);
?>