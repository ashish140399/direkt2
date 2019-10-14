<?php //error_reporting(E_ALL); ini_set('display_errors',1);


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");



    $id = (int)$_GET['id'];
	include 'config.php';
	mysqlCheck($conn);
    if($id!=''){
	   $sql = "SELECT * FROM chat where id>".$id." order by datetime DESC limit 0,35";    
    }else{
        $sql = "SELECT * FROM chat order by datetime DESC limit 0,35";    
    }
    $res = mysqli_query($conn,$sql);
    $data =array();
    if(mysqli_num_rows($res)>0){
        while($row = mysqli_fetch_array($res)){	
            $image ='';
            $color = '#a2a2a2';		
            $level = 0;
        	$time = date("H:i:s",strtotime($row['datetime']));
            $sqlQuery = "SELECT image_url,color,level from levels where level IN(select level from users where useraddress='".$row['userid']."')";
            $resQuery = mysqli_query($conn,$sqlQuery);        
            if(mysqli_num_rows($resQuery)>0){
                $rowQuery = mysqli_fetch_array($resQuery);
                $image = $rowQuery['image_url'];
                $color = $rowQuery['color'];
                $level = $rowQuery['level'];
            }         


			$arr = array('id'=>$row['id'],'userid'=>$row['userid'],'level'=>$level,'image'=>$image,'color'=>$color,'username'=>$row['username'],'message'=>strip_tags($row['message']),'time'=>$time);
			array_push($data,$arr);
    	}
            mysqli_close($conn);    
    		$result['result']= true;
    		$result['data'] = $data;
	    	echo json_encode($result);
	    	exit();	
    }else{
        mysqli_close($conn);
    	$result['result']= false;
    	$result['msg'] = 'No New chat.';
	    echo json_encode($result);
	    exit();	
    }
?>