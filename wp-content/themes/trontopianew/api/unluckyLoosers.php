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
    $newtimestamp = $timestamp*1000;
    $data =array();
    $resultarr = array();
    $sql = "select user,sum(bet) total from (
            select trxplayed as bet,user from unluckybunch where timestamp>=".$timestamp."
            union all
            select bet,user from sidebetrolls where timestamp>=".$timestamp." AND result='false'
            union all
            select bet,user from roll_classicDice where timestamp>=".$timestamp." AND result='false'
            union all
            select betTRX as bet,gambler as user from luckyOneBetFinished where timestamp>=".$newtimestamp." AND profit=0 AND normalPayout=0
            ) t 
            GROUP BY user ORDER BY total DESC LIMIT 0,100    ";
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
                 
			    $arr = array('useraddres'=>$row2['useraddress'],'user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'total'=>$vouchers);
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