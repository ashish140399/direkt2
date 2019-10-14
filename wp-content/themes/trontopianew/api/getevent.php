<?php //error_reporting(E_ALL); ini_set('display_errors',1);
include 'config.php';
mysqlCheck($conn);
$xh = 1;
function getData($conn,$xh){
    //global $conn;
    $sidebet =array();
    $resultarr = array();
    $sql = "SELECT * FROM `roll` WHERE user = '".$_GET['user']."' order by timestamp DESC limit 0,1";    
    $res = mysqli_query($conn,$sql);
    if(mysqli_num_rows($res)>0){
        $row = mysqli_fetch_array($res);
        if(isset($_GET['txid']) && $row['transaction_id']==$_GET['txid']){
            if($xh>=5){
                mysqli_close($conn);
                $resultarr['result']= false;
                $resultarr['msg'] = 'No Data Found.';
                echo json_encode($resultarr);    
                exit();
            }
            $xh++;
            sleep(4);
            getData($conn,$xh);
        }else{
            $winningNumber = $row['winning_number'];
            if($winningNumber<10){ $winningNumber = '0'.$winningNumber;}
            $txid = $row['transaction_id'];
            $arr = array('user'=>$row['user'],'startNumber'=>$row['start_number'],'endNumber'=>$row['end_number'],'winningNumber'=>$winningNumber,'bet'=>$row['bet'],'result'=>$row['result'],'transaction_id'=>$row['transaction_id']);
            
                    $sidebetsql = "SELECT * FROM `sidebetrolls` WHERE user = '".$_GET['user']."' AND transaction_id='".$row['transaction_id']."' order by timestamp DESC limit 0,1";    
                    $result = mysqli_query($conn,$sidebetsql);
                    if(mysqli_num_rows($result)>0){
                        $row2 = mysqli_fetch_array($result);
                        
                        $sidebet = array ('result' => $row2['result'],'sidebet'=> $row2['sidebet'],'bet'=>$row2['bet'],'winamount'=>$row2['winamount']);
                        
                    }
			
             mysqli_close($conn);
	        $resultarr['result']= true;
	        $resultarr['data'] = $arr;
	        $resultarr['sidebet'] = $sidebet;
	        echo json_encode($resultarr);
	        exit() ;
        }
        
    }else{
        if($xh>=5){
            mysqli_close($conn);
            $resultarr['result']= false;
            $resultarr['msg'] = 'No Data Found.';
            echo json_encode($resultarr);    
            exit();
        }
        $xh++;
        sleep(4);
        getData($conn,$xh);
	    
    }
}

    getData($conn,$xh);


?>