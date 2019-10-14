<?php //error_reporting(E_ALL); ini_set('display_errors',1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

    include 'config.php';
    mysqlCheck($conn);
    $sidebet =array();
    $resultarr = array();
    $totalwin = 0;
    $totalbets = 0;

    $sql = "SELECT  totalBets,totalWins FROM totalBetsWins where id=1";      
    $res = mysqli_query($conn,$sql);
    mysqli_close($conn);
    if(mysqli_num_rows($res)>0){
        $row = mysqli_fetch_array($res);
        $totalbets = $row['totalBets'];
        $totalwin = $row['totalWins'];
        $resultarr['result']= true;
        $resultarr['totalWin']= strval($totalwin);
        $resultarr['totalbets'] = $totalbets;
	    echo json_encode($resultarr);
	    exit() ;
                
    }else{
	    $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
    }

?>