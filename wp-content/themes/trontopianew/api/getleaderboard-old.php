<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
mysqlCheck($conn);
$sql = "select user,sum(bet) total
from
(
    select user,bet
    from roll
    union all
    select user,bet
    from sidebetrolls
) t
group by user order by total DESC limit 0,50";
$res = mysqli_query($conn,$sql);
$data =array();
$resultarr = array();
if(mysqli_num_rows($res)>0){
	while($row = mysqli_fetch_array($res)){
		$user = $row['user'];
		$sql2 = "SELECT username FROM `users` WHERE userhexaddress = '".$row['user']."'";    
    	$res2 = mysqli_query($conn,$sql2);
    	$row2 = mysqli_fetch_array($res2);
		$total = $row['total'];
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

		$arr = array('user'=>$row2['username'],'level'=>$level,'image'=>$image,'color'=>$color,'total'=>$total);
		array_push($data,$arr);
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
?>