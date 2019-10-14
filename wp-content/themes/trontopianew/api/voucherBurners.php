<?php //error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

include 'config.php';
mysqlCheck($conn);
$query = "SELECT voucher_timestamp FROM settings where  id=1";
$result = mysqli_query($conn,$query);
if($result){
    $row = mysqli_fetch_array($result);
    $timestamp = $row['voucher_timestamp'];
    $data =array();
    $resultarr = array();
    $sql = "select user,sum(value) total
        from
        (
            select value,user 
            from burnedvouchers
            where timestamp>=".$timestamp." AND user NOT IN('0x9f775ba53c7d00ca716d318f4e116b93b2a123af','0x7d8fcac35967f30794d22e42950817c46128a2cf','0x04e4f95e7BAF105921C0CcfeF40896B91502676f')
            union all
            select value,to_address user 
            from transfervouchers
            where timestamp>=".$timestamp." AND from_address='0x0000000000000000000000000000000000000000' AND  to_address NOT IN('0x9f775ba53c7d00ca716d318f4e116b93b2a123af','0x7d8fcac35967f30794d22e42950817c46128a2cf','0x04e4f95e7BAF105921C0CcfeF40896B91502676f')
        ) t
        GROUP BY user ORDER BY total DESC LIMIT 0,100";
    $res = mysqli_query($conn,$sql);

    if($res && mysqli_num_rows($res)>0){
	     $x=1;
			while($row = mysqli_fetch_array($res)){
			    $sql2 = "SELECT username,useraddress FROM `users` WHERE userhexaddress = '".$row['user']."'";    
    		    $res2 = mysqli_query($conn,$sql2);
    		    $row2 = mysqli_fetch_array($res2);
			    
			    $image ='';
			    $color = '#ffffff';
			    $level = 0;
			    $sqlQuery = "SELECT image_url,color,level from levels where level IN(select level from users where userhexaddress='".$row['user']."')";
                $resQuery = mysqli_query($conn,$sqlQuery);        
                if(mysqli_num_rows($resQuery)>0){
                    $rowQuery = mysqli_fetch_array($resQuery);
                    $image = $rowQuery['image_url'];
                    $color = $rowQuery['color'];
                    $level = $rowQuery['level'];
                }  
             
                 $vouchers = $row['total'];
                 $vouchers = $vouchers / 1000000;
			     $arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'vouchers'=>strval($vouchers));
			     array_push($data,$arr);
			     $x++;
			}
		    mysqli_close($conn);
		    $resultarr['result']= true;
		    $resultarr['data'] = $data;
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