<?php //error_reporting(E_ALL); ini_set('display_errors',1);



header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");



$id = $_GET['id'];
include 'config.php';
mysqlCheck($conn);

if ($id != '')
{
    $sqluser = "SELECT level,username from users where useraddress='".mysqli_real_escape_string($conn, $id)."'";    
    $resuser = mysqli_query($conn,$sqluser);
    $data = array();
    if(mysqli_num_rows($resuser)==1){
        
        $rowuser = mysqli_fetch_array($resuser);    
    //$sql = "SELECT image_url,color,level from levels where level IN(select level from users where useraddress='".mysqli_real_escape_string($conn, $id)."')";    
    $sql = "SELECT image_url,color,level from levels where level =".$rowuser['level'];    
    $image ='';
    $color = '#ffffff';     
    $level = 0;
    $res = mysqli_query($conn,$sql);
    mysqli_close($conn);
    
    if(mysqli_num_rows($res)>0){
        $row = mysqli_fetch_array($res);    
        $image = $row['image_url'];
        $color = $row['color'];
        $level = $row['level'];
    	$arr = array('username'=>$rowuser['username'],'level'=>$level,'image'=>$image,'color'=>$color);
			array_push($data,$arr);
    	$result['result']= true;
    	$result['data'] = $data;
	    echo json_encode($result);
	    exit();	
    }else{
    	$result['result']= false;
    	$result['msg'] = 'Something wrong happen.';
	    echo json_encode($result);
	    exit();	
    }
    }else{
        mysqli_close($conn);
        $image ='';
        $color = '#ffffff';     
        $level = 0;
        $username = substr($id, 0, 5).'...'.substr($id, -5);
    	$arr = array('username'=>$username,'level'=>$level,'image'=>$image,'color'=>$color);
		array_push($data,$arr);
        $result['result']= true;
    	$result['data'] = $data;
	    echo json_encode($result);
        exit(); 
    }
}else{
    mysqli_close($conn);
    $result['result']= false;
    $result['msg'] = 'Something wrong happen.';
    echo json_encode($result);
    exit(); 
}
?>