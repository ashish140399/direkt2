<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
$sql = "SELECT useraddress FROM `users`";    
$res = mysqli_query($conn,$sql);
$data = array();
$resultarr = array();
function fill_chunck($array, $parts) {
    $t = 0;
    $result = array_fill(0, $parts - 1, array());
    $max = ceil(count($array) / $parts);
    foreach($array as $v) {
        count($result[$t]) >= $max and $t ++;
        $result[$t][] = $v;
    }
    return $result;
}
if(mysqli_num_rows($res)>0){
    while($row = mysqli_fetch_array($res)){
        $useraddress = $row['useraddress'];
        array_push($data,$useraddress);
        
        }
        $resultarr['result']= true;
	   // $resultarr['data'] = $data;
	    $array = range(1, 100); // same as your array
        $resultarr['data2'] = fill_chunck($data, 20);
	    echo json_encode($resultarr);
}
 mysqli_close($conn);
?>