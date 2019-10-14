<?php
$token_contract_abi = '[{"constant": true,"name": "whitelistCaller","inputs": [{"type": "address"}],"outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "durationFreezeTier2","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "goldTopiaUser","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "name","outputs": [{"type": "string"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "goldTopiaAllUsers","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "totalSupply","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "safeguardTokenMovement","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "bronzeTopiaUser","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "decimals","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "frozenTopiaReleaseAmount","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "dividendContractAddress","outputs": [{"type": "address"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "bronzeTopiaAllUsers","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "globalHalt","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "withdrawnOwnerTokens","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "silverTopiaUser","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "balanceOf","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "acceptOwnership","type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "symbol","outputs": [{"type": "string"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "tokenSwap","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "frozenTopiaReleaseTime","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "freezeTierTime","inputs": [{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "changeSigner","inputs": [{"name": "_signer","type": "address"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "whitelistCallerArray","inputs": [{"type": "uint256"}],"outputs": [{"type": "address"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "frozenAccount","inputs": [{"type": "address"}],"outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "silverTopiaAllUsers","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "burnTracker","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "allowance","inputs": [{"type": "address"},{"type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "freezeTierStatus","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "View"},{"name": "transferOwnership","inputs": [{"name": "_newOwner","type": "address"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "durationFreezeTier1","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"type": "Constructor","stateMutability": "Nonpayable"},{"type": "Fallback","payable": true,"stateMutability": "Payable"},{"name": "Transfer","inputs": [{"indexed": true,"name": "from","type": "address"},{"indexed": true,"name": "to","type": "address"},{"name": "value","type": "uint256"}],"type": "Event"},{"name": "Burn","inputs": [{"indexed": true,"name": "from","type": "address"},{"name": "value","type": "uint256"}],"type": "Event"},{"name": "FrozenFunds","inputs": [{"indexed": true,"name": "target","type": "address"},{"name": "frozen","type": "bool"}],"type": "Event"},{"name": "Approval","inputs": [{"indexed": true,"name": "owner","type": "address"},{"indexed": true,"name": "spender","type": "address"},{"name": "value","type": "uint256"}],"type": "Event"},{"name": "TokenSwap","inputs": [{"indexed": true,"name": "user","type": "address"},{"name": "value","type": "uint256"}],"type": "Event"},{"name": "OwnershipTransferred","inputs": [{"indexed": true,"name": "_from","type": "address"},{"indexed": true,"name": "_to","type": "address"}],"type": "Event"},{"name": "transfer","inputs": [{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"outputs": [{"name": "success","type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "transferFrom","inputs": [{"name": "_from","type": "address"},{"name": "_to","type": "address"},{"name": "_value","type": "uint256"}],"outputs": [{"name": "success","type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "approve","inputs": [{"name": "_spender","type": "address"},{"name": "_value","type": "uint256"}],"outputs": [{"name": "success","type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "burn","inputs": [{"name": "_value","type": "uint256"}],"outputs": [{"name": "success","type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "burnFrom","inputs": [{"name": "_from","type": "address"},{"name": "_value","type": "uint256"}],"outputs": [{"name": "success","type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "freezeAccount","inputs": [{"name": "target","type": "address"},{"name": "freeze","type": "bool"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "mintToken","inputs": [{"name": "_user","type": "address"},{"name": "_tronAmount","type": "uint256"}],"outputs": [{"type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "claimOwnerTokens","outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "displayTokensToClaim","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "updateDividendContract","inputs": [{"name": "_newAddress","type": "address"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "addWhitelistGameAddress","inputs": [{"name": "_newAddress","type": "address"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "removeWhitelistGameAddress","inputs": [{"name": "_address","type": "address"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "manualWithdrawTokens","inputs": [{"name": "tokenAmount","type": "uint256"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "changeSafeguardTokenMovement","outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "changeGlobalHalt","outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "updateMintingRates","inputs": [{"name": "ratesArray","type": "uint256[]"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "totalTRXbalanceContract","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "freezeTopia","inputs": [{"name": "_value","type": "uint256"}],"outputs": [{"type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "unfreezeTopia","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "displayAvailabletoWithdrawTOPIA","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "withdrawUnfrozenTopia","outputs": [{"type": "bool"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "findFreezeTierPercentage","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "changeFreezeTiersDuration","inputs": [{"name": "tier1","type": "uint256"},{"name": "tier2","type": "uint256"}],"outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"name": "upgradeTopia","outputs": [{"type": "string"}],"type": "Function","stateMutability": "Nonpayable"},{"constant": true,"name": "frozenTopia","inputs": [{"name": "_user","type": "address"}],"outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "frozenTopiaGlobal","outputs": [{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "totalFrozenTopiaIndividual","outputs": [{"type": "uint256"},{"type": "uint256"},{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"constant": true,"name": "userFreezeTierAndAmount","inputs": [{"name": "user","type": "address"}],"outputs": [{"type": "uint256"},{"type": "uint256"}],"type": "Function","stateMutability": "View"},{"name": "airdrop","inputs": [{"name": "recipients","type": "address[]"},{"name": "tokenAmount","type": "uint256"}],"type": "Function","stateMutability": "Nonpayable"}]';
        
    $token_contract_abi = json_decode($token_contract_abi,true);
    //contract address in hex
    $token_contract = '414b1d9a3f835cc8ecce58b66d0670d5fcaf038c4f';
    
    function stageCount($stage){
         $nextStage = 1;
         $trx = 833;
         $nextTrx = 1000;
        if($stage<=2){
            if($stage==2){
                $nextTrx = 1000;    
            }
            
        }else if($stage>=3 && $stage<=9){
            if($stage==3){
                $trx = $trx + 50;
                $nextTrx = 1000;    
            }else if($stage==4){
                $trx = $trx + 50;
                $nextTrx = 1050;    
            }else if($stage==5){
                $trx = $trx + 50;
                $nextTrx = 1100;    
            }else{
                $trx = 50 * $stage;
                $trx = 1000 + $trx - 30;
                $nextTrx = $trx + 50;
                if($stage==9){$nextTrx=$nextTrx+2 ;}
            }

        }else if($stage>=10 && $stage<=19){
            $s = stage%10;
            $s = ($s+1)*12;
            $trx = 1000 + 60;
            $trx =  $trx + s;
            $nextTrx = $trx + 12 ; 
             if($stage==19){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=20 && $stage<=29){
            $s = $stage%10;
            $s = ($s+1)*14;
            $trx = 1000 + 180;
            $trx =  $trx + $s;
            $nextTrx = $trx + 14 ; 
             if($stage==29){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=30 && $stage<=39){
            $s = $stage%10;
            $s = ($s+1)*16;
            $trx = 1000 + 320;
            $trx =  $trx + $s;
            $nextTrx = $trx + 16 ; 
             if($stage==39){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=40 && $stage<=49){
            $s = $stage%10;
            $s = ($s+1)*18;
            $trx = 1000 + 480;
            $trx =  $trx + $s;
            $nextTrx = $trx + 18 ; 
             if($stage==49){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=50 && $stage<=59){
            $s = $stage%10;
            $s = ($s+1)*20;
            $trx = 1000 + 660;
            $trx =  $trx + $s;
            $nextTrx = $trx + 20 ; 
             if($stage==59){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=60 && $stage<=69){
            $s = $stage%10;
            $s = ($s+1)*22;
            $trx = 1000 + 860;
            $trx =  $trx + $s ;
            $nextTrx = $trx + 22 ; 
             if($stage==69){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=70 && $stage<=79){
            $s = $stage%10;
            $s = ($s+1)*24;
            $trx = 1000 + 1080;
            $trx =  $trx + $s ;
            $nextTrx = $trx + 24 ; 
             if($stage==79){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=80 && $stage<=89){
            $s = $stage%10;
            $s = ($s+1)*26;
            $trx = 1000 + 1320;
            $trx =  $trx + $s ;
            $nextTrx = $trx + 26 ; 
             if($stage==89){$nextTrx=$nextTrx+2 ;}
        }else if($stage>=90 && $stage<99){
            $s = $stage%10;
            $s = ($s+1)*28;
            $trx = 1000 + 1580;
            $trx =  $trx + $s ;
            $nextTrx = $trx + 28 ; 
            
        }else{$trx = 2860; $nextTrx = 2860;}
        $stage = $stage + 1;
        $nextStage = $stage +1;
    return $trx;
    }
    
?>