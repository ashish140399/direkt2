const API_URL = 'api/';
var ultimateDiceContractInstance;
var classicDiceContractInstance;
var luckyOneContractInstance;

const ultimateDiceContractAddress       =   'TVjPNiXRohHupNr44LsDngqQZ5gndan5FT';
const classicDiceContractAddress        =   'TRzwSBRFzfUuKwTAh7Yh4ih6UGTfaDDrGY';
const luckyOneContractAddress           =   "TBetsski7xFQcTBV9qeqPoBtHDqHcvaXW8";



document.cookie = "tronlinkLoginTracker=0";

$(document).ready(async function() {
    setTimeout(init,5000);
    
    async function init(){
        var ultimateDiceContractInfo = await tronWeb.trx.getContract(ultimateDiceContractAddress);
        ultimateDiceContractInstance = await tronWeb.contract(ultimateDiceContractInfo.abi.entrys, ultimateDiceContractInfo.contract_address);
        
        var classicDiceContractInfo = await tronWeb.trx.getContract(classicDiceContractAddress);
        classicDiceContractInstance = await tronWeb.contract(classicDiceContractInfo.abi.entrys, classicDiceContractInfo.contract_address);
        

        var luckyOneContractInfo = await tronWeb.trx.getContract(luckyOneContractAddress);
        luckyOneContractInstance = await tronWeb.contract(luckyOneContractInfo.abi.entrys, luckyOneContractInfo.contract_address);
    }
   //ultimate Dice Result
    $('#udVerify').click(async function(){
        var udTxid = $('#udTxid').val();
            
        if(udTxid==""){
            alertify.alert('ERROR',"Invalid Transaction ID");
            return false;
        }

        var postData = 'txid=' + udTxid;
         $.ajax({
                url: API_URL + "checkRoll-Event.php",
                type: "post",
                data: postData,
                statusCode: {
                        400: function() {
                            console.log( "400 Bad Request" );
                            return false;
                        },
                        403: function(){
                            console.log('403 Forbidden');
                            return false;
                        },
                        404: function() {
                          console.log( "404 Not Found" );
                          return false;
                        },
                        500: function() {
                            console.log("500 Internal Server Error");
                        },
                        502: function() {
                          console.log( "502 Bad request" );
                          return false;
                        },
                        503: function() {
                          console.log( "503 Service Unavailable" );
                          return false;
                        },
                        504: function() {
                          console.log( "504 Gateway Timeout" );
                          return false;
                        }
        
              },
                success: async function(data) {
                    data = JSON.parse(data);
                    if(data.result==true){
                            var user = data.data._gambler;
                            const _rollIntegerVariables = [];
                            var _uniqueBetId = '0x'+data.data._uniqueBetId;
                            var _userSeed = '0x'+data.data._userSeed;
                            var betHash = data.data.betHash;
                            var mainBetWin = 0;
                            var sideBetWin = 0;
                            var newWinningNumber = 0;
                            var sideBetName = '';
                            let start;
                            if (data.data._rollIntegerVariables.length === 7 * 64) start = 2 * 64;
                            else if (data.data._rollIntegerVariables.length === 5 * 64) start = 0 * 64;
                            else throw "Should never happen";                            
                            const betAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64));
                            const sidebetAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+3*64, start+4*64));
                            const startNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64));
                            const endNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64));
                            const sidebetInt  = parseInt("0x" + data.data._rollIntegerVariables.slice(start+4*64, start+5*64));
                            const block = await tronWeb.trx.getBlock(data.data._blockNumber);
                            const rollIntegerVariables = [startNumber,endNumber,betAmount,sidebetAmount,sidebetInt];

                            var calculateBetResult = await ultimateDiceContractInstance.calculateBetResultWithBlockHash(user, '0x'+data.data._uniqueBetId, '0x'+data.data._userSeed, data.data._blockNumber, rollIntegerVariables, "0x"+block.blockID).call();
                
                            var postData2 = 'betHash=' + betHash + '&betType=UD';
                                 $.ajax({
                                        url: API_URL + "getFinishBetTxid.php",
                                        type: "post",
                                        data: postData2,
                                        statusCode: {
                                                400: function() {
                                                    console.log( "400 Bad Request" );
                                                    return false;
                                                },
                                                403: function(){
                                                    console.log('403 Forbidden');
                                                    return false;
                                                },
                                                404: function() {
                                                  console.log( "404 Not Found" );
                                                  return false;
                                                },
                                                500: function() {
                                                    console.log("500 Internal Server Error");
                                                },
                                                502: function() {
                                                  console.log( "502 Bad request" );
                                                  return false;
                                                },
                                                503: function() {
                                                  console.log( "503 Service Unavailable" );
                                                  return false;
                                                },
                                                504: function() {
                                                  console.log( "504 Gateway Timeout" );
                                                  return false;
                                                }
                                
                                      },
                                        success: async function(data2) {
                                            var data2 = JSON.parse(data2);
                                            if(data2.result==true){
                                                $('#udfinishBetID').html('<a target="_blank" href="https://tronscan.org/#/transaction/'+data2.data.betFinishedTxid+'">'+data2.data.betFinishedTxid+'</a>');
                                            }else{
                                                $('#udfinishBetID').html('no tx id found');
                                            }
                                        }
                                 });                
                                mainBetWin = Object.values(calculateBetResult.mainBetWin);
                                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
                                mainBetWin = mainBetWin/1000000;        
                                sideBetWin =    Object.values(calculateBetResult.sideBetWin);
                                sideBetWin = window.tronWeb.toDecimal(sideBetWin[0]);
                                sideBetWin = sideBetWin/1000000;
                                        
                                newWinningNumber = Object.values(calculateBetResult.winningNumber);
                                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
                                if (newWinningNumber < 10) { newWinningNumber = '0' + newWinningNumber; }
                                if(mainBetWin <= 0){
                                    $("#udBetResult").html('LOSE');
                                }else{
                                    $("#udBetResult").html('WIN');
                                }
                                
                                user =  '41'+user.slice(2);
                                user =  tronWeb.address.fromHex(user);
                                if(sidebetAmount>0){
                                    if(sidebetInt==1){sideBetName='YIN';}
                                    if(sidebetInt==2){sideBetName='YANG';}
                                    if(sidebetInt==3){sideBetName='BANG';}
                                    if(sidebetInt==4){sideBetName='ZERO';}
                                    if(sidebetInt==5){sideBetName='ODD';}
                                    if(sidebetInt==6){sideBetName='EVEN';}    
                                    if(sideBetWin <= 0){
                                        $("#udSideBetResult").html('LOSE');
                                    }else{
                                        $("#udSideBetResult").html('WIN');
                                    }
                                    
                                }else{
                                    
                                    sideBetName = '--';
                                    $("#udSideBetResult").html('--');
                                }
                                
                                
                                
                                $("#udWallet").html(user);
                                $("#udBet").html(betAmount + ' TRX');
                                $("#udPrediction").html(startNumber+ ' - '+ endNumber);
                                $("#udLuckyNumber").html(newWinningNumber);
                                $("#udPayout").html(mainBetWin + ' TRX');
                                $("#udSideBet").html(sideBetName);
                                $("#udSideBetAmount").html(sidebetAmount);
                                $("#udSideBetPayout").html(sideBetWin);
                                $("#udTotalPayout").html((mainBetWin+sideBetWin) + ' TRX');
                                
                                
                                
                                
                            }else{
                                alertify.alert('ERROR',"No Data Found");
                                return false;
                            }
                        }

        
                 });
    });
    //classic Dice Result
    $('#cdVerify').click(async function(){
        var cdTxid = $('#cdTxid').val();
            
        if(cdTxid==""){
            alertify.alert('ERROR',"Invalid Transaction ID");
            return false;
        }

        var postData = 'txid=' + cdTxid;
         $.ajax({
                url: API_URL + "checkRoll-EventCD.php",
                type: "post",
                data: postData,
                statusCode: {
                        400: function() {
                            console.log( "400 Bad Request" );
                            return false;
                        },
                        403: function(){
                            console.log('403 Forbidden');
                            return false;
                        },
                        404: function() {
                          console.log( "404 Not Found" );
                          return false;
                        },
                        500: function() {
                            console.log("500 Internal Server Error");
                        },
                        502: function() {
                          console.log( "502 Bad request" );
                          return false;
                        },
                        503: function() {
                          console.log( "503 Service Unavailable" );
                          return false;
                        },
                        504: function() {
                          console.log( "504 Gateway Timeout" );
                          return false;
                        }
        
              },
                success: async function(data) {
                    data = JSON.parse(data);
                    if(data.result==true){
                            var user = data.data._gambler;
                            const _rollIntegerVariables = [];
                            var _uniqueBetId = '0x'+data.data._uniqueBetId;
                            var _userSeed = '0x'+data.data._userSeed;
                            var mainBetWin = 0;
                            var newWinningNumber = 0;
                            var betHash = data.data.betHash;
                            
			                let start;
			                if (data.data._rollIntegerVariables.length === 5 * 64) start = 2 * 64;
			                else if (data.data._rollIntegerVariables.length === 3 * 64) start = 0 * 64;
			                else throw "Should never happen";
			                
			                const betAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64));
			                const startNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64));
			                var direction = parseInt("0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64));
			                
			                const rollIntegerVariables = ["0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64),
			                    "0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64),
			                    "0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64)];

			                const block = await tronWeb.trx.getBlock(data.data._blockNumber);

                            var calculateBetResult = await classicDiceContractInstance.calculateBetResultWithBlockHash(user, '0x'+data.data._uniqueBetId, '0x'+data.data._userSeed, data.data._blockNumber, rollIntegerVariables, "0x"+block.blockID).call();
            
                            var postData2 = 'betHash=' + betHash + '&betType=CD';
                                 $.ajax({
                                        url: API_URL + "getFinishBetTxid.php",
                                        type: "post",
                                        data: postData2,
                                        statusCode: {
                                                400: function() {
                                                    console.log( "400 Bad Request" );
                                                    return false;
                                                },
                                                403: function(){
                                                    console.log('403 Forbidden');
                                                    return false;
                                                },
                                                404: function() {
                                                  console.log( "404 Not Found" );
                                                  return false;
                                                },
                                                500: function() {
                                                    console.log("500 Internal Server Error");
                                                },
                                                502: function() {
                                                  console.log( "502 Bad request" );
                                                  return false;
                                                },
                                                503: function() {
                                                  console.log( "503 Service Unavailable" );
                                                  return false;
                                                },
                                                504: function() {
                                                  console.log( "504 Gateway Timeout" );
                                                  return false;
                                                }
                                
                                      },
                                        success: async function(data2) {
                                            var data2 = JSON.parse(data2);
                                            if(data2.result==true){
                                                $('#cdfinishBetID').html('<a target="_blank" href="https://tronscan.org/#/transaction/'+data2.data.betFinishedTxid+'">'+data2.data.betFinishedTxid+'</a>');
                                            }else{
                                                $('#cdfinishBetID').html('no tx id found');
                                            }
                                        }
                                 });
                                
                                mainBetWin = Object.values(calculateBetResult.mainBetWin);
                                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
                                mainBetWin = mainBetWin/1000000;
                                        
                                newWinningNumber = Object.values(calculateBetResult.winningNumber);
                                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
                                if(direction==0){
                                    direction = 'RollUnder';
                                }
                                if(direction==1){
                                    direction = 'RollOver';
                                }
                                user =  '41'+user.slice(2);
                                user =  tronWeb.address.fromHex(user);
                                $("#cdWallet").html(user);
                                $("#cdBet").html(betAmount + ' TRX');
                                $("#cdPrediction").html(direction + ' ' + startNumber);
                                $("#cdLuckyNumber").html(newWinningNumber);
                                $("#cdPayout").html(mainBetWin + ' TRX');
                                
                            }else{
                                alertify.alert('ERROR',"No Data Found");
                                return false;
                            }
                        }

        
                 });
    });
    //lucky One Result
    $('#luckyVerify').click(async function(){
        var luckyTxid = $('#luckyTxid').val();
            
        if(luckyTxid==""){
            alertify.alert('ERROR',"Invalid Transaction ID");
            return false;
        }

        var postData = 'txid=' + luckyTxid;
         $.ajax({
                url: API_URL + "luckyone-betstarted.php",
                type: "post",
                data: postData,
                statusCode: {
                        400: function() {
                            console.log( "400 Bad Request" );
                            return false;
                        },
                        403: function(){
                            console.log('403 Forbidden');
                            return false;
                        },
                        404: function() {
                          console.log( "404 Not Found" );
                          return false;
                        },
                        500: function() {
                            console.log("500 Internal Server Error");
                        },
                        502: function() {
                          console.log( "502 Bad request" );
                          return false;
                        },
                        503: function() {
                          console.log( "503 Service Unavailable" );
                          return false;
                        },
                        504: function() {
                          console.log( "504 Gateway Timeout" );
                          return false;
                        }
        
              },
                success: async function(data) {
                    data = JSON.parse(data);
                    if(data.result==true){
                            var user = data.data._gambler;
                            const _rollIntegerVariables = [];
                            var _uniqueBetId = '0x'+data.data._uniqueBetId;
                            var _userSeed = '0x'+data.data._userSeed;
                            var betHash = data.data.betHash;
		                	var jackpotPayout = 0;
				            var normalPayout = 0;
				            var profit =0;
				            var randomNumber = 0;
				            const betAmount = parseInt(data.data._betTRX);
				            var blocknumber = data.data._blockNumber;
                            const block = await tronWeb.trx.getBlock(data.data._blockNumber);
			                
                            const result = await luckyOneContractInstance.calculateBetResultWithBlockHash(
											blocknumber,
											user,
											"0x"+block.blockID,
											betAmount,
											_uniqueBetId,
											_userSeed
										).call();
							const totalPayout = (parseInt(result._normalPayout) + parseInt(result._jackpotPayout)) / 1000000;
                             var postData2 = 'betHash=' + betHash + '&betType=L1';
                                 $.ajax({
                                        url: API_URL + "getFinishBetTxid.php",
                                        type: "post",
                                        data: postData2,
                                        statusCode: {
                                                400: function() {
                                                    console.log( "400 Bad Request" );
                                                    return false;
                                                },
                                                403: function(){
                                                    console.log('403 Forbidden');
                                                    return false;
                                                },
                                                404: function() {
                                                  console.log( "404 Not Found" );
                                                  return false;
                                                },
                                                500: function() {
                                                    console.log("500 Internal Server Error");
                                                },
                                                502: function() {
                                                  console.log( "502 Bad request" );
                                                  return false;
                                                },
                                                503: function() {
                                                  console.log( "503 Service Unavailable" );
                                                  return false;
                                                },
                                                504: function() {
                                                  console.log( "504 Gateway Timeout" );
                                                  return false;
                                                }
                                
                                      },
                                        success: async function(data2) {
                                            var data2 = JSON.parse(data2);
                                            if(data2.result==true){
                                                $('#luckyfinishBetID').html('<a target="_blank" href="https://tronscan.org/#/transaction/'+data2.data.betFinishedTxid+'">'+data2.data.betFinishedTxid+'</a>');
                                            }else{
                                                $('#luckyfinishBetID').html('no tx id found');
                                            }
                                        }
                                 });  
                                user =  '41'+user.slice(2);
                                user =  tronWeb.address.fromHex(user);
                                $("#luckyeWallet").html(user);
                                $("#luckyBet").html(betAmount + ' TRX');
                                $("#luckyNumber").html(tronWeb.toDecimal(result._randomNumber));
                                $("#luckyPayout").html(totalPayout + ' TRX');
                                
                            }else{
                                alertify.alert('ERROR',"No Data Found");
                                return false;
                            }
                        }

        
                 });
    });
});   