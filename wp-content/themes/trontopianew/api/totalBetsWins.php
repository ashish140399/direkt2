<?php //error_reporting(E_ALL); ini_set('display_errors',1);
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

    include 'config.php';
    mysqlCheck($conn);
    $totalwin = 0;
    $totalwin2 = 0;
    $totalbets = 0;
    $totalbets2 = 0;
    $totalwinfinal = 0;
    $sql = "SELECT  SUM(totalbets) totalbets".
            " FROM (".
            " SELECT count(*) as totalbets FROM `roll`".
            " UNION".
            " SELECT count(*) as totalbets FROM `roll_classicDice`".
            " ) a";      
    $res = mysqli_query($conn,$sql);
    if(mysqli_num_rows($res)>0){
        $row = mysqli_fetch_array($res);
        if($row['totalbets']>0){
           // $sql2 = "SELECT SUM(kingtopian.prize + sidebetrolls.winamount) totalwin From kingtopian, sidebetrolls where kingtopian.transaction_id = sidebetrolls.transaction_id";    
        //    $sql2 = "SELECT  SUM(totalWin) totalWin".
        //     " FROM".
        //     " ( ".
        //     " select sum(prize) totalWin from kingtopian".
        //     " UNION ALL".
        //     " select sum(winamount) totalWin from sidebetrolls".
        // ") s";
             $sql2 = "SELECT  SUM(totalWin) totalWin".
                    " FROM".
                    " ( ".
                    " select sum(prize) totalWin from kingtopian".
                    " UNION ALL".
                    " select sum(winamount) totalWin from sidebetrolls".
                    " UNION ALL".
                    " select sum(prize) totalWin from kingtopian_classicDice".
            ") s";
            $res2 = mysqli_query($conn,$sql2);
            mysqli_num_rows($res2);
            if(mysqli_num_rows($res2)>0){
                $row2 = mysqli_fetch_array($res2);
                $totalwin= $row2['totalWin']/1000000;
                $totalwin = round($totalwin,2);
            }
             $totalbets = $row['totalbets'];
        }
        
        //now getting lucky one data
        $sql = "SELECT count(*) as totalbets FROM `luckyOneBetFinished`";
        $res = mysqli_query($conn,$sql);
        if(mysqli_num_rows($res)>0){
            $row = mysqli_fetch_array($res);
            if($row['totalbets']>0){
               $sql2 = "SELECT  SUM(normalPayout) totalWin FROM luckyOneBetFinished";
                $res2 = mysqli_query($conn,$sql2);
                mysqli_num_rows($res2);
                if(mysqli_num_rows($res2)>0){
                    $row2 = mysqli_fetch_array($res2);
                    $totalwin2= $row2['totalWin']/1000000;
                    $totalwin2 = round($totalwin2,2);
                }
                $totalbets2 = $row['totalbets'];
            }
        }
        $totalwinfinal = $totalwin + $totalwin2;
        //$resultarr['result']= true;
        //$resultarr['totalWin']= strval($totalwinfinal);
        //$resultarr['totalbets'] = $totalbets + $totalbets2;
	    //echo json_encode($resultarr);
	    $totalbets = $totalbets + $totalbets2;
	    mysqli_query($conn,"UPDATE totalBetsWins set totalBets=".$totalbets.", totalWins = ".$totalwinfinal);
	    mysqli_close($conn);
	    exit() ;
                
    }else{
        mysqli_close($conn);
	    $resultarr['result']= false;
	    $resultarr['msg'] = 'No Data Found.';
	    echo json_encode($resultarr);
    }

?>