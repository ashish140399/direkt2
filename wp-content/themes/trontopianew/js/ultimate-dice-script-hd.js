var global = {
     contractInstance : "",
     tokencontractInstance: "",
     timestamp : 0,
     totalTxn : 0,
     internetConnection : "true",
     oldWinningNumber : '',
     txid : '',
     loggedIn : false,
     userAddress:'',
     userAddressHex:'',
     username:'',
     lastChatID:'',
     lastTxID:'',
     userSigned: false,
     uniqueBetId:''
 };

var ultimateDiceContractInstance;

document.cookie = "tronlinkLoginTracker=0";
var interval_id=0;
var betStartTimeStamp=0;
var transaction_id='';
var DB_startNumber=0;
var DB_endNumber=0;
var DB_betAmt=50;

var multiplierJSON = [{
            "win_val": "95",
            "value": "1.0211"
        },
        {
            "win_val": "94",
            "value": "1.0319"
        },
        {
            "win_val": "93",
            "value": "1.0430"
        },
        {
            "win_val": "92",
            "value": "1.0543"
        },
        {
            "win_val": "91",
            "value": "1.0659"
        },
        {
            "win_val": "90",
            "value": "1.0778"
        },
        {
            "win_val": "89",
            "value": "1.0899"
        },
        {
            "win_val": "88",
            "value": "1.1023"
        },
        {
            "win_val": "87",
            "value": "1.1149"
        },
        {
            "win_val": "86",
            "value": "1.1279"
        },
        {
            "win_val": "85",
            "value": "1.1412"
        },
        {
            "win_val": "84",
            "value": "1.1548"
        },
        {
            "win_val": "83",
            "value": "1.1687"
        },
        {
            "win_val": "82",
            "value": "1.1829"
        },
        {
            "win_val": "81",
            "value": "1.1975"
        },
        {
            "win_val": "80",
            "value": "1.2125"
        },
        {
            "win_val": "79",
            "value": "1.2278"
        },
        {
            "win_val": "78",
            "value": "1.2436"
        },
        {
            "win_val": "77",
            "value": "1.2597"
        },
        {
            "win_val": "76",
            "value": "1.2763"
        },
        {
            "win_val": "75",
            "value": "1.2933"
        },
        {
            "win_val": "74",
            "value": "1.3108"
        },
        {
            "win_val": "73",
            "value": "1.3288"
        },
        {
            "win_val": "72",
            "value": "1.3472"
        },
        {
            "win_val": "71",
            "value": "1.3662"
        },
        {
            "win_val": "70",
            "value": "1.3857"
        },
        {
            "win_val": "69",
            "value": "1.4058"
        },
        {
            "win_val": "68",
            "value": "1.4265"
        },
        {
            "win_val": "67",
            "value": "1.4478"
        },
        {
            "win_val": "66",
            "value": "1.4697"
        },
        {
            "win_val": "65",
            "value": "1.4923"
        },
        {
            "win_val": "64",
            "value": "1.5156"
        },
        {
            "win_val": "63",
            "value": "1.5397"
        },
        {
            "win_val": "62",
            "value": "1.5645"
        },
        {
            "win_val": "61",
            "value": "1.5902"
        },
        {
            "win_val": "60",
            "value": "1.6167"
        },
        {
            "win_val": "59",
            "value": "1.6441"
        },
        {
            "win_val": "58",
            "value": "1.6724"
        },
        {
            "win_val": "57",
            "value": "1.7018"
        },
        {
            "win_val": "56",
            "value": "1.7321"
        },
        {
            "win_val": "55",
            "value": "1.7636"
        },
        {
            "win_val": "54",
            "value": "1.7963"
        },
        {
            "win_val": "53",
            "value": "1.8302"
        },
        {
            "win_val": "52",
            "value": "1.8654"
        },
        {
            "win_val": "51",
            "value": "1.9020"
        },
        {
            "win_val": "50",
            "value": "1.9400"
        },
        {
            "win_val": "49",
            "value": "1.9796"
        },
        {
            "win_val": "48",
            "value": "2.0208"
        },
        {
            "win_val": "47",
            "value": "2.0638"
        },
        {
            "win_val": "46",
            "value": "2.1087"
        },
        {
            "win_val": "45",
            "value": "2.1556"
        },
        {
            "win_val": "44",
            "value": "2.2045"
        },
        {
            "win_val": "43",
            "value": "2.2558"
        },
        {
            "win_val": "42",
            "value": "2.3095"
        },
        {
            "win_val": "41",
            "value": "2.3659"
        },
        {
            "win_val": "40",
            "value": "2.4250"
        },
        {
            "win_val": "39",
            "value": "2.4872"
        },
        {
            "win_val": "38",
            "value": "2.5526"
        },
        {
            "win_val": "37",
            "value": "2.6216"
        },
        {
            "win_val": "36",
            "value": "2.6944"
        },
        {
            "win_val": "35",
            "value": "2.7714"
        },
        {
            "win_val": "34",
            "value": "2.8529"
        },
        {
            "win_val": "33",
            "value": "2.9394"
        },
        {
            "win_val": "32",
            "value": "3.0313"
        },
        {
            "win_val": "31",
            "value": "3.1290"
        },
        {
            "win_val": "30",
            "value": "3.2333"
        },
        {
            "win_val": "29",
            "value": "3.3448"
        },
        {
            "win_val": "28",
            "value": "3.4643"
        },
        {
            "win_val": "27",
            "value": "3.5926"
        },
        {
            "win_val": "26",
            "value": "3.7308"
        },
        {
            "win_val": "25",
            "value": "3.8800"
        },
        {
            "win_val": "24",
            "value": "4.0417"
        },
        {
            "win_val": "23",
            "value": "4.2174"
        },
        {
            "win_val": "22",
            "value": "4.4091"
        }, {
            "win_val": "21",
            "value": "4.6190"
        }, {
            "win_val": "20",
            "value": "4.8500"
        }, {
            "win_val": "19",
            "value": "5.1053"
        }, {
            "win_val": "18",
            "value": "5.3889"
        },
        {
            "win_val": "17",
            "value": "5.7059"
        }, {
            "win_val": "16",
            "value": "6.0625"
        },
        {
            "win_val": "15",
            "value": "6.4667"
        }, {
            "win_val": "14",
            "value": "6.9286"
        },
        {
            "win_val": "13",
            "value": "7.4615"
        }, {
            "win_val": "12",
            "value": "8.0833"
        }, {
            "win_val": "11",
            "value": "8.8182"
        }, {
            "win_val": "10",
            "value": "9.7000"
        }, {
            "win_val": "9",
            "value": "10.7778"
        }, {
            "win_val": "8",
            "value": "12.1250"
        }, {
            "win_val": "7",
            "value": "13.8571"
        },
        {
            "win_val": "6",
            "value": "16.1667"
        }, {
            "win_val": "5",
            "value": "19.4000"
        },
        {
            "win_val": "4",
            "value": "24.2500"
        },
        {
            "win_val": "3",
            "value": "32.3333"
        },
        {
            "win_val": "2",
            "value": "48.5000"
        }, {
            "win_val": "1",
            "value": "97.0000"
        }
    ];

$(document).ready(async function() {
    
    //checking if betStarted Event failed
    async function checkBetStartedFailed(){
         if(betStartTimeStamp!=0){
            var millis = Date.now() - betStartTimeStamp;
            var sec = Math.floor(millis/1000);
            console.log("seconds elapsed = " + sec );
            //console.log('bet started txid = ' + transaction_id);
            if(sec>10){
                 if(sec>20){
                    checkBetResultHashFailed(); 
                     return false;
                  }
                //betStartTimeStamp=0;
                console.log('Checking BetStarted from DB => result : txid = ' + transaction_id);   
                var postData = 'txid=' + transaction_id;
              
            if(transaction_id!=''){
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
                            betStartTimeStamp=0;
                            var user = data.data._gambler;
                            var test = user.substring(0,2);
                            var user1 = user;
                            if(test=='0x'){
                                user1 = '41'+user1.slice(2);
                            }
                            console.log('Step 2 checking');
                            console.log(' from betStarted DB : user rolled = '+user);
                            const _rollIntegerVariables = [];
                            var _uniqueBetId = '0x'+data.data._uniqueBetId;
                            var _userSeed = '0x'+data.data._userSeed;
                            if(user1==global.userAddressHex && global.uniqueBetId==_uniqueBetId){
                                 var mainBetWin = 0;
                                 var sideBetWin = 0;
                                 var newWinningNumber = 0;

                                    let start;
                                    if (data.data._rollIntegerVariables.length === 7 * 64) start = 2 * 64;
                                    else if (data.data._rollIntegerVariables.length === 5 * 64) start = 0 * 64;
                                    else throw "Should never happen";
                                    //const rollIntegerVariables = [start,end,betAmount,sidebetAmount,sidebetInt];
                                    const betAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64));
                                    const sidebetAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+3*64, start+4*64));
                                    const startNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64));
                                    const endNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64));
                                    const sidebetInt  = parseInt("0x" + data.data._rollIntegerVariables.slice(start+4*64, start+5*64));

                                    const rollIntegerVariables2 = ["0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64),
                                        "0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64),
                                        "0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64),
                                        "0x" + data.data._rollIntegerVariables.slice(start+3*64, start+4*64),
                                        "0x" + data.data._rollIntegerVariables.slice(start+4*64, start+5*64)];

                                const block = await tronWeb.trx.getBlock(data.data._blockNumber);

                                //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
                                var firstBetData = [global.userAddress, '0x'+data.data._uniqueBetId,'0x'+data.data._userSeed,data.data._blockNumber,[startNumber,endNumber,betAmount,sidebetAmount,sidebetInt]];
                                if (localStorage.hasOwnProperty("DebugLog"))
                                {
                                    console.log("Adding unfinished bet to localstorage:");
                                    console.log(firstBetData);
                                }
                                let betArray = [];
                                if (localStorage.getItem('previousFinishBet') !== null &&
                                    localStorage.getItem('previousFinishBet') != "" &&
                                    JSON.parse(localStorage.getItem('previousFinishBet')).length !== 0)
                                {
                                    betArray = JSON.parse(localStorage.getItem('previousFinishBet'));
                                }
                                betArray.push(firstBetData);
                                
                                localStorage.setItem("previousFinishBet", JSON.stringify(betArray));
                                 const rollIntegerVariables = [startNumber,endNumber,betAmount,sidebetAmount,sidebetInt];
                                //setting this variables for "unclaimed winners" section
                                $("#finishBetGambler").val(global.userAddress);
                                $("#finishBetUniqueID").val('0x'+data.data._uniqueBetId);
                                $("#finishBetUserSeed").val('0x'+data.data._userSeed);
                                $("#finishBetBlockNumber").val(data.data._blockNumber);
                                //$("#finishBetParamsArray").val('['+start+','+end+','+betAmount+','+sidebetAmount+','+sidebetInt+']');
                                $("#finishBetParamsArray").val(rollIntegerVariables);


                                var calculateBetResult = await ultimateDiceContractInstance.calculateBetResultWithBlockHash(global.userAddress, '0x'+data.data._uniqueBetId, '0x'+data.data._userSeed, data.data._blockNumber, rollIntegerVariables2, "0x"+block.blockID).call();
            
                                //console.log(calculateBetResult);

                                mainBetWin = Object.values(calculateBetResult.mainBetWin);
                                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
                                            
                                sideBetWin =    Object.values(calculateBetResult.sideBetWin);
                                sideBetWin = window.tronWeb.toDecimal(sideBetWin[0]);
                                sideBetWin = sideBetWin/1000000;
                                        
                                          
                                newWinningNumber = Object.values(calculateBetResult.winningNumber);
                                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
                                
                                displayLuckyNumber(newWinningNumber,mainBetWin,sideBetWin,betAmount,sidebetAmount);                
                               
                                         var autoRoll=''; 
                                            $('.autoRoll').each(function(){
                                                var checked = $(this).hasClass('selected');
                                                if(checked){
                                                    autoRoll = $(this).data('auto');
                                                }

                                            });
                                        var stopOnLoss =$('#stoponloss').prop('checked');
                                        if(autoRoll=='on'){
                                            if(mainBetWin <= 0){
                                                setTimeout(function(){
                                                    $("#rollDice").attr("disabled", false);
                                                    $("#rollBtn").attr("disabled", false);
                                                    
                                                     if(stopOnLoss==true){
                                                      resetBtnSlider();
                                                     }else{
                                                        $('#rollDice').click(); 
                                                     }
                                                },3000);
                                            }else{
                                                setTimeout(function(){
                                                    $("#rollDice").attr("disabled", false);
                                                    $("#rollBtn").attr("disabled", false);
                                                    $('#rollDice').click();
                                                },6000);
                                            }
                                        }else{
                                            //finishManyBetsIfExist();
                                            setTimeout(function(){
                                                resetBtnSlider();
                                            },2000); 
                                           
                                        }
                                
                            }
                            //if user = global user ends
                    //if result = false go in else
                    }else{
                        //no data get from betstarted db table then check one more time 
                        checkBetResultHashFailed();
                    }
                } //success ends here
               }); // ajax ends here
            } // if tx id ends 
        } // if sec > 10 ends here
    } //if betstarted = 0 ends here

    }


    //checking db if calculateBetResultWithBlockHash failed
    async function checkBetResultHashFailed(){
        if(betStartTimeStamp!=0){
            var millis = Date.now() - betStartTimeStamp;
            var sec = Math.floor(millis/1000);
            console.log("seconds elapsed = " + sec );
            //console.log('bet started txid = ' + transaction_id);
            if(sec>22){
                betStartTimeStamp=0;
                console.log('checking db for roll result : txid = ' + transaction_id);   
                //var postData = 'txid=' + transaction_id;
                var DB_userAddress = global.userAddressHex;
                DB_userAddress = DB_userAddress.substring(2);
                var postData = 'txid=' + transaction_id+'&startNumber='+DB_startNumber+'&endNumber='+DB_endNumber+'&bet='+DB_betAmt+'&user='+DB_userAddress+'&timestamp='+betStartTimeStamp;
                
            if(transaction_id!=''){
                $.ajax({
                url: API_URL + "checkRoll.php",
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
                success: function(data) {
                    data = JSON.parse(data);
                    if(data.result==true){
                            var startNumber = data.data.startNumber;
                            var endNumber = data.data.endNumber;
                            var betAmount = data.data.bet;
                            let multiplier =  getMultiplier(startNumber,endNumber);
                            payout = multiplier*betAmount;
                            payout = payout.toFixed(2);
                            var mainBetWin =payout;
                            var sideBetWin = data.data.sideBetWin;
                            var newWinningNumber =  data.data.winningNumber;
                            var sidebetAmount = data.data.sidebetAmount;
                            console.log('Step 3 checking');
                            
                            displayLuckyNumber(newWinningNumber,mainBetWin,sideBetWin,betAmount,sidebetAmount);                
                            
                            betStartTimeStamp=0;
                             var autoRoll=''; 
                            $('.autoRoll').each(function(){
                                var checked = $(this).hasClass('selected');
                                if(checked){
                                    autoRoll = $(this).data('auto');
                                }

                            });
                            var stopOnLoss =$('#stoponloss').prop('checked');
                            if(autoRoll=='on'){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                if(stopOnLoss==true){
                                  resetBtnSlider();
                                 }else{
                                    $('#rollDice').click(); 
                                 }
                            }else{
                                
                                 setTimeout(function(){
                                    resetBtnSlider();
                                 },2000); 
                               
                            }           
                           
                    }
                    transaction_id = '';
    
                    if(data.result==false){
                            $("#rollDice").attr("disabled", false);
                            $("#rollBtn").attr("disabled", false);
                            $("#rollBtn").hide();
                            $("#rollDice").show(); 
                            betStartTimeStamp=0;
                            transaction_id='';
                             var autoRoll=''; 
                            $('.autoRoll').each(function(){
                                var checked = $(this).hasClass('selected');
                                if(checked){
                                    autoRoll = $(this).data('auto');
                                }

                            });
                             var stopOnLoss =$('#stoponloss').prop('checked');
                            if(autoRoll=='on'){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                if(stopOnLoss==true){
                                  resetBtnSlider();
                                 }else{
                                    $('#rollDice').click(); 
                                 }
                            }else{
                                setTimeout(function(){
                                    resetBtnSlider();
                                 },2000); 
                               
                            }   
                    }
                    
                }
             });
            
                
            }
                
                
                $("#rollDice").attr("disabled", false);
                $("#rollBtn").attr("disabled", false);
                $("#rollBtn").hide();
                $("#rollDice").show(); 
                transaction_id ='';
                betStartTimeStamp=0;
                 var autoRoll=''; 
                $('.autoRoll').each(function(){
                    var checked = $(this).hasClass('selected');
                    if(checked){
                        autoRoll = $(this).data('auto');
                    }

                });
                var stopOnLoss =$('#stoponloss').prop('checked');
                if(autoRoll=='on'){
                    $("#rollDice").attr("disabled", false);
                    $("#rollBtn").attr("disabled", false);
                    if(stopOnLoss==true){
                      resetBtnSlider();
                     }else{
                        $('#rollDice').click(); 
                     }
                }else{
                    setTimeout(function(){
                        resetBtnSlider();
                     },2000); 
                }
               
            }
        }
    }

    function displayLuckyNumber(newWinningNumber,mainBetWin,sideBetWin,betAmount,sidebetAmount){
         console.log("Winning number: "+newWinningNumber);
         
         if (newWinningNumber < 10) { newWinningNumber = '0' + newWinningNumber; }
        
         if(mainBetWin <= 0){
             //lose
              let rollWinAmt = '-'+ betAmount;
                $('#odometer').removeClass('green-sucs');
                $('#odometer-tei').removeClass('green-sucs');
                $('#odometer').addClass('red-alert');
                $('#odometer-tei').addClass('red-alert');    
                var firstNumber = parseInt(newWinningNumber/10);
                var lastNumber = newWinningNumber - (firstNumber*10); 
                //$('#odometer').html(firstNumber);
                //$('#odometer-tei').html(lastNumber);
                
                //odometer settings on load
                var el1 = document.getElementById('odometer');
                var el2 = document.getElementById('odometer-tei');
                od1 = new Odometer({
                  el: el1,
                  // Any option (other than auto and selector) can be passed in here
                  format: 'd'
                });
                od2 = new Odometer({
                  el: el2,
                  // Any option (other than auto and selector) can be passed in here
                  format: 'd'
                });
                od1.update(0);
                od2.update(0);
                // or
                el1.innerHTML = firstNumber;
                el2.innerHTML = lastNumber;

                if(localStorage.getItem("UDSOUND")=="on"){
                    try
                    {
                        const audio = new Audio('audio/loss.mp3');
                         setTimeout(function(){
                            audio.play();
                         },2000);
                    }
                    catch (e)
                    {
                        console.log("Failed to play loss sound:", e);
                    }
                 }
                        setTimeout(function(){
                            $("#bounce_num").css({"color": "#ff006c","top": "-40px", "background" : "transparent" });
                            $("#bounce_num").text(rollWinAmt +' TRX');
                            //$("#bounce_num").show();
                            $("#bounce_num").animate({top: '0px',opacity: '0'}, 3000);
                        },2000);

                    
                     if(sidebetAmount > 0){
                         if(sideBetWin <= 0){
                            //for loss  
                            sidebetWinAmt = '-' + sidebetAmount;
                            setTimeout(function(){
                                $("#bounce_num2").css({"color": "#ff006c","top": "-22px","background" : "transparent"});
                                $("#bounce_num2").text(sidebetWinAmt+ ' TRX');
                                $("#bounce_num2").animate({top: '0px',opacity: '0'}, 3000);
                            },2000);
                        }else{
                            //for win
                             sidebetWinAmt = '+' + sideBetWin; //sBetAmt.toFixed(3);
                             setTimeout(function(){
                                $("#bounce_num2").css({"color": "#01f593","top": "-22px","background" : "transparent"});
                                $("#bounce_num2").text(sidebetWinAmt+ ' TRX');
                                $("#bounce_num2").animate({top: '0px',opacity: '0'}, 3000);
                             },2000);
                        } 
                       
                            //$("#bounce_num2").show();
                            //$("#bounce_num2").animate({top: '0px',opacity: '0'}, 6000);
                       
                          
                     }
                   
                    setTimeout(function(){
                        $("#rollBtn").hide();
                        $("#rollDice").show();    
                        $("#rollDice").attr("disabled", false);
                        $("#rollBtn").attr("disabled", false);
                        updateBalance();
                    },2000);
         
         }else{
             //win
             setTimeout(function(){
                let rollWinAmt = tronWeb.fromSun(mainBetWin);
                rollWinAmt = "+" + rollWinAmt;
                $('#odometer').removeClass('red-alert');
                $('#odometer-tei').removeClass('red-alert');
                $('#odometer').addClass('green-sucs');
                $('#odometer-tei').addClass('green-sucs');
                
                var firstNumber = parseInt(newWinningNumber/10);
                var lastNumber = newWinningNumber - (firstNumber*10); 
                //$('#odometer').html(firstNumber);
                //$('#odometer-tei').html(lastNumber);
                
                //odometer settings on load
                var el1 = document.getElementById('odometer');
                var el2 = document.getElementById('odometer-tei');
                od1 = new Odometer({
                  el: el1,
                  // Any option (other than auto and selector) can be passed in here
                  format: 'd'
                });
                od2 = new Odometer({
                  el: el2,
                  // Any option (other than auto and selector) can be passed in here
                  format: 'd'
                });
                od1.update(0);
                od2.update(0);
                // or
                el1.innerHTML = firstNumber;
                el2.innerHTML = lastNumber;
                
                if(localStorage.getItem("UDSOUND")=="on"){
                    try
                    {
                      const audio = new Audio('audio/win.mp3');
                        setTimeout(function(){
                            audio.play();
                        },3000);
                    }
                    catch (e)
                    {
                        console.log("Failed to play win sound:", e);
                    }
                }
                   setTimeout(function(){
                        $("#bounce_num").css({"color": "#01f593","top": "-40px","background" : "transparent"});
                        $("#bounce_num").text(rollWinAmt +' TRX');
                        //$("#bounce_num").show();
                        $("#bounce_num").animate({top: '0px',opacity: '0'}, 3000);
                    },2000);
                   
                   
                     if(sidebetAmount > 0){
                         if(sideBetWin <= 0){
                            //for loss  
                            sidebetWinAmt = '-' + sidebetAmount;
                            setTimeout(function(){
                                $("#bounce_num2").css({"color": "#ff006c","top": "-22px","background" : "transparent"});
                                $("#bounce_num2").text(sidebetWinAmt+ ' TRX');
                                $("#bounce_num2").animate({top: '0px',opacity: '0'}, 3000);
                            },3000);
                            
                        }else{
                            //for win
                             sidebetWinAmt = '+' + sideBetWin; //sBetAmt.toFixed(3);
                             setTimeout(function(){
                                $("#bounce_num2").css({"color": "#01f593","top": "-22px","background" : "transparent"});
                                $("#bounce_num2").text(sidebetWinAmt+ ' TRX');
                                $("#bounce_num2").animate({top: '0px',opacity: '0'}, 3000);
                            },3000);
                        }
                        
                            //$("#bounce_num2").show();
                            //$("#bounce_num2").animate({top: '0px',opacity: '0'}, 6000);
                        
                          
                     }
                      
                        setTimeout(function(){
                            $("#rollDice").attr("disabled", false);
                            $("#rollBtn").attr("disabled", false);
                            $("#rollBtn").hide();
                            $("#rollDice").show();     
                            updateBalance();
                        },2000);
             },3000);
             
         }


    }
    setInterval(checkBetStartedFailed,1000);
     //var socket = io.connect( 'https://'+window.location.hostname+':3000' );
     var socket = io.connect( 'https://nodejs.trontopia.co:8080' );
    // var socket = io.connect( 'https://34.66.248.44:3000' );
     //var socket = io.connect('http://34.66.248.44:3000/', {secure: true});

     socket.on( 'newEvent', async function( data ) {
     
     var eventName = data.name;
     if(eventName=='BetStarted'){
        var user = data.result._gambler;
        console.log('user rolled = '+user);
        const _rollIntegerVariables = [];
        var _uniqueBetId = '0x'+data.result._uniqueBetId;
        if(user==global.userAddressHex && global.uniqueBetId==_uniqueBetId){
             var mainBetWin = 0;
             var sideBetWin = 0;
             var newWinningNumber = 0;

                let start;
                if (data.result._rollIntegerVariables.length === 7 * 64) start = 2 * 64;
                else if (data.result._rollIntegerVariables.length === 5 * 64) start = 0 * 64;
                else throw "Should never happen";
                //const rollIntegerVariables = [start,end,betAmount,sidebetAmount,sidebetInt];
                const betAmount = parseInt("0x" + data.result._rollIntegerVariables.slice(start+2*64, start+3*64));
                const sidebetAmount = parseInt("0x" + data.result._rollIntegerVariables.slice(start+3*64, start+4*64));
                const startNumber = parseInt("0x" + data.result._rollIntegerVariables.slice(start+0*64, start+1*64));
                const endNumber = parseInt("0x" + data.result._rollIntegerVariables.slice(start+1*64, start+2*64));
                const sidebetInt  = parseInt("0x" + data.result._rollIntegerVariables.slice(start+4*64, start+5*64));

                const rollIntegerVariables2 = ["0x" + data.result._rollIntegerVariables.slice(start+0*64, start+1*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+1*64, start+2*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+2*64, start+3*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+3*64, start+4*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+4*64, start+5*64)];

            const block = await tronWeb.trx.getBlock(data.result._blockNumber);


            //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
                var firstBetData = [global.userAddress, '0x'+data.result._uniqueBetId,'0x'+data.result._userSeed,data.result._blockNumber,[startNumber,endNumber,betAmount,sidebetAmount,sidebetInt]];
                if (localStorage.hasOwnProperty("DebugLog"))
                {
                    console.log("Adding unfinished bet to localstorage:");
                    console.log(firstBetData);
                }
                let betArray = [];
                if (localStorage.getItem('previousFinishBet') !== null &&
                    localStorage.getItem('previousFinishBet') != "" &&
                    JSON.parse(localStorage.getItem('previousFinishBet')).length !== 0)
                {
                    betArray = JSON.parse(localStorage.getItem('previousFinishBet'));
                }
                betArray.push(firstBetData);
                
                localStorage.setItem("previousFinishBet", JSON.stringify(betArray));
                 const rollIntegerVariables = [startNumber,endNumber,betAmount,sidebetAmount,sidebetInt];
                //setting this variables for "unclaimed winners" section
                $("#finishBetGambler").val(global.userAddress);
                $("#finishBetUniqueID").val('0x'+data.result._uniqueBetId);
                $("#finishBetUserSeed").val('0x'+data.result._userSeed);
                $("#finishBetBlockNumber").val(data.result._blockNumber);
                //$("#finishBetParamsArray").val('['+start+','+end+','+betAmount+','+sidebetAmount+','+sidebetInt+']');
                $("#finishBetParamsArray").val(rollIntegerVariables);
                

                var calculateBetResult = await ultimateDiceContractInstance.calculateBetResultWithBlockHash(global.userAddress, '0x'+data.result._uniqueBetId, '0x'+data.result._userSeed, data.result._blockNumber, rollIntegerVariables2, "0x"+block.blockID).call();
            
                //console.log(calculateBetResult);

                mainBetWin = Object.values(calculateBetResult.mainBetWin);
                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
                            
                sideBetWin =    Object.values(calculateBetResult.sideBetWin);
                sideBetWin = window.tronWeb.toDecimal(sideBetWin[0]);
                sideBetWin = sideBetWin/1000000;
                        
                          
                newWinningNumber = Object.values(calculateBetResult.winningNumber);
                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
                
                displayLuckyNumber(newWinningNumber,mainBetWin,sideBetWin,betAmount,sidebetAmount);                

   
                    betStartTimeStamp=0;
                    //var autoRoll =$('#autoCallRoll').prop('checked');
                    var autoRoll=''; 
                    $('.autoRoll').each(function(){
                        var checked = $(this).hasClass('selected');
                        if(checked){
                            autoRoll = $(this).data('auto');
                        }

                    });
                    var stopOnLoss =$('#stoponloss').prop('checked');
                  
                    if(autoRoll=='on'){
                        if(mainBetWin <= 0){
                            setTimeout(function(){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                if(stopOnLoss==true){
                                  resetBtnSlider();
                                 }else{
                                    $('#rollDice').click(); 
                                 }
                            },3000);
                        }else{
                            setTimeout(function(){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                $('#rollDice').click();
                            },6000);
                        }
                    }else{
                        setTimeout(function(){
                            resetBtnSlider();
                        },2000); 
                       
                    }

            }
        }else if(eventName=='Roll'){
            var result = data.result.result;
            var userHex = data.result.user;
            var startNumber = data.result._startNumber;
            var endNumber = data.result._endNumber;
            var betAmount = data.result._value;
            var winningNumber = data.result._winningNumber;
            var timestamp = data.timestamp;
            
            if(result=="true" || result== true){
                rowBoarderColorClass = "safe";
                let multiplier =  getMultiplier(startNumber,endNumber);
                var payout = multiplier*betAmount;
                payout = payout.toFixed(2);
                payout += " <span>TRX</span>";
            }else{
                 rowBoarderColorClass = "redalt";                 
                 payout = '-';
            }
            let userID = getUserAddress(tronWeb.address.fromHex(userHex));
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+startNumber + " - " + endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
            if($('#bet2 li').length==1){
                $("#bet2 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet2 li:eq(1)").before(allBetDataNew);
            }

            // if(userHex==global.userAddressHex){
            //     if($('#bet1 li').length==1){
            //         $("#bet1 li:eq(0)").after(allBetDataNew);    
            //     }else{
            //         $("#bet1 li:eq(1)").before(allBetDataNew);
            //     }
            // }

            $('#bet2 li:eq(49)').remove();
            //$('#bet1 li:eq(49)').remove();
            
        }else if(eventName=='HighRollers'){
            var result = data.result.result;
            var userHex = data.result.user;
            var startNumber = data.result._startNumber;
            var endNumber = data.result._endNumber;
            var betAmount = data.result._value;
            var winningNumber = data.result._winningNumber;
            var timestamp = data.timestamp;
            
            if(result=="true" || result== true){
                rowBoarderColorClass = "safe";
                let multiplier =  getMultiplier(startNumber,endNumber);
                var payout = multiplier*betAmount;
                payout = payout.toFixed(2);
                payout += " <span>TRX</span>";
            }else{
                 rowBoarderColorClass = "redalt";                 
                 payout = '-';
            }
            let userID = getUserAddress(tronWeb.address.fromHex(userHex));
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+startNumber + " - " + endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
            if($('#bet3 li').length==1){
                $("#bet3 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet3 li:eq(1)").before(allBetDataNew);
            }
            $('#bet3 li:eq(49)').remove();
        }else if(eventName=='RareWins'){
            var result = data.result.result;
            var userHex = data.result.user;
            var startNumber = data.result._startNumber;
            var endNumber = data.result._endNumber;
            var betAmount = data.result._value;
            var winningNumber = data.result._winningNumber;
            var timestamp = data.timestamp;
            
            if(result=="true" || result== true){
                rowBoarderColorClass = "safe";
                let multiplier =  getMultiplier(startNumber,endNumber);
                var payout = multiplier*betAmount;
                payout = payout.toFixed(2);
                payout += " <span>TRX</span>";
            }else{
                 rowBoarderColorClass = "redalt";                 
                 payout = '-';
            }
            let userID = getUserAddress(tronWeb.address.fromHex(userHex));
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+startNumber + " - " + endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
            if($('#bet4 li').length==1){
                $("#bet4 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet4 li:eq(1)").before(allBetDataNew);
            }
            $('#bet4 li:eq(49)').remove();
        }else if(eventName=='SideBetRolls'){
            var result = data.result.result;
            var userHex = data.result.user;
            var sideBet = data.result.sideBet;
            var betAmount = data.result._betValue;
            var winAmount = data.result.winAmount;
            var winningNumber = data.result._winningNumber;
            var timestamp = data.timestamp;
            var _sidebet;
        
        if(sideBet==1){_sidebet='yin';}
        if(sideBet==2){_sidebet='yang';}
        if(sideBet==3){_sidebet='bang';}
        if(sideBet==4){_sidebet='zero';}
        if(sideBet==5){_sidebet='odd';}
        if(sideBet==6){_sidebet='even';}
        
            if(result=="true" || result== true){
                rowBoarderColorClass = "safe";
                var payout = winAmount/1000000;
                payout = payout.toFixed(2);
                payout += " <span>TRX</span>";
            }else{
                 rowBoarderColorClass = "redalt";                 
                 payout = '-';
            }
            let userID = getUserAddress(tronWeb.address.fromHex(userHex));
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+_sidebet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
            if($('#bet5 li').length==1){
                $("#bet5 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet5 li:eq(1)").before(allBetDataNew);
            }
            if(userHex==global.userAddressHex){
                if($('#bet6 li').length==1){
                    $("#bet6 li:eq(0)").after(allBetDataNew);    
                }else{
                    $("#bet6 li:eq(1)").before(allBetDataNew);
                }
                $('#bet6 li:eq(49)').remove();
            }
            $('#bet5 li:eq(49)').remove();
        }

    
    });


    $("#login_or_not").hide();
    //$("#trxBalance").hide();
    $("#trx").show();
    $("#rollBtn").hide();
    $("#lucky_no").html('00');
    $("#myBetVals").html('Loading..');
    $("#myTotalWon").html('Loading..');
    localStorage.setItem("SIDEBETS", '');
    //var setBtn = localStorage.getItem("SIDEBETS");  
    //setBtn ? $("."+setBtn).removeClass('bg-primary') : '';
    //setBtn ? $("."+setBtn).addClass('bg-secondarybg-secondary') : '';    
    var soundBtn = localStorage.getItem("UDSOUND");
    
    if(soundBtn=='off'){
        $("#sound-icon").removeClass('fa-volume-up');    
    }else if(soundBtn=='on'){
        $("#sound-icon").addClass('fa-volume-up');    
    }else{
        localStorage.setItem("UDSOUND", 'on');
        $("#sound-icon").addClass('fa-volume-up');    
    }
    
    var sideBetMultiplier = {"yin":2.1111,"yang":2.1111,"bang":9.50,"zero":95.0,"odd":1.90,"even":1.90};
    var sideBetWinChance = {"yin":45,"yang":45,"bang":10,"zero":1,"odd":50,"even":50};
  
    /*Check updateBetAmount() ALSo */
    const MAX_BET_AMOUNT = 25000;
    const MIN_BET_AMOUNT = 10;
    const MAX_SIDEBET_AMOUNT = 25000;
    const MIN_SIDEBET_AMOUNT = 10;
    var REFID = '';
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    };
    if (window.location.href.indexOf('?refid=') > 0) {
        if($.urlParam('refid')!=''){
            REFID =$.urlParam('refid');
        }
    }
    
    setTimeout(tronLoginCheck, 2000);
    async function tronLoginCheck() {
        
        try {
            if (!window.tronWeb)  { //throw "You must install tronlink extension";
                $('#preloader').hide();
                removeLoader(); 
            }
             if (!(window.tronWeb && window.tronWeb.ready)){
                 $("#poip-fri").modal('show');
                 removeLoader(); 
                 $('#preloader').hide();
                 $('#myBetVals').html(0);
                 $('#myTotalWon').html(0);
                 $('#myTotalToken').html(0);
                 $('#myTotalToken2').html(0);
                 setTimeout(function() {
                        $("#poip-fri").hide();
                    }, 10000);
                 global.userAddress = '';
                 //return false;
             document.cookie = "tronlinkLoginTracker=1";
             //console.log("1");
             }

            else{
                global.userAddress = await window.tronWeb.defaultAddress.base58;
                global.userAddressHex = await window.tronWeb.defaultAddress.hex;
                document.cookie = "_sidr="+global.userAddress;
                global.loggedIn = true;
                    setTimeout(function() {
                        showAccountInfo();
                    }, 1000);

            }
                //alert("Logint to Tronlink to get going");
                
            //setTimeout(init,5000);
        } catch (e) {
            console.log("Stop", e, tronLoginCheck);
        }
    }
    setTimeout(init,2000);
    //Try to set handle address change event
    let intervalID = setInterval(async function() {
        if (typeof window.tronWeb == "object") {
            
            window.tronWeb.on("addressChanged", showAccountInfo);
            var userAddress = await window.tronWeb.defaultAddress.base58;
            var userAddressHex = await window.tronWeb.defaultAddress.hex;    
            if(global.userAddress=='' && userAddress!=''){
                global.userAddress =  userAddress;
                global.userAddressHex =  userAddressHex;    
                //updateInterface();
            }
            if(global.userAddress!='' && global.userAddress!=userAddress){
                global.userAddress =  userAddress;
                global.userAddressHex =  userAddressHex;    
                document.cookie = "_sidr="+global.userAddress;
                location.reload();
                updateInterface();

            }
            
            //clearInterval(intervalID);
        }
    }, 1000);
   
    async function showAccountInfo() {
        var firstFive,lastFive,isLogin;
        $("#poip-fri").hide();
    
/*  to process cookies  */
try {
    let myCookie = document.cookie.match('(^|;) *tronlinkLoginTracker=([^;]*)')[2];
    if(myCookie == "1"){
        setTimeout(function(){  }, 3000);
        location.reload();
    }
} catch (_) {
    // handle missing cookie
}
    
        if(global.userAddress) {             
             isLogin     = getUserAddress(global.userAddress);
             $("#zerox").hide();
             $("#isLogin").html(isLogin);
             $("#loggedIn").show();
             $("#login_or_not").hide();
             //app();
            setReferralLink();
                       
        }else{
             $("#loggedIn").hide();
             isLogin     = 'Login';
             $("#zerox").show();
             $("#isnotLogin").html(isLogin);
             $("#login_or_not").show();
        }

    }

  //  $('#closeNotSignIn').click(function(){$("#notSignIn").hide();});
    
    $('#btnRefreshTRX').click(function(){updateBalance();});
    $('#sound-icon').click(function(){
        var soundStats = $(this).hasClass('fa-volume-up');
        if(soundStats==true){
            $(this).removeClass('fa-volume-up');    
            localStorage.setItem("UDSOUND", 'off');
        }else if(soundStats==false){
            $(this).addClass('fa-volume-up');    
            localStorage.setItem("UDSOUND", 'on');
        }
    });
    
    
    $("#new_seedValue").click(function(e){
        e.preventDefault();
        var searchQuery = $("#new_seeds").val();
        if(searchQuery){
            var new_sed     =  window.tronWeb.sha3(searchQuery, false);
            var newSeedFormated = '0x' + new_sed;
            $("#formated_seeds").val(newSeedFormated);
            $("#cur_seeds").val(newSeedFormated);
            localStorage.setItem("NEWSEED", newSeedFormated);
        }
    });
    
    $("#finishBetBtn").click(async function(){
       var finishBetGambler = $('#finishBetGambler').val();
       var finishBetUniqueID = $('#finishBetUniqueID').val();
       var finishBetUserSeed = $('#finishBetUserSeed').val();
       var finishBetBlockNumber = $('#finishBetBlockNumber').val();
       var finishBetParamsArray = $('#finishBetParamsArray').val();
       var strArray = finishBetParamsArray.split(",");
       finishBetParamsArray = [parseInt(strArray[0]),parseInt(strArray[1]),parseInt(strArray[2]),parseInt(strArray[3]),parseInt(strArray[4])];
       //console.log(finishBetParamsArray)
       try{
            var result = await ultimateDiceContractInstance.finishBet(finishBetGambler, finishBetUniqueID, finishBetUserSeed, finishBetBlockNumber, finishBetParamsArray ).send({
                 shouldPollResponse: false,
                 feeLimit: 5000000,
                 callValue: callValue,
                 from: global.userAddress
            });
             if(result!=''){
                 alertify.success('Bet Finished.');
                 $('#finishBetGambler').val('');
                 $('#finishBetUniqueID').val('');
                 $('#finishBetUserSeed').val('');
                 $('#finishBetBlockNumber').val('');
                 $('#finishBetParamsArray').val('');
             }else{
                alertify.error('Bet Failed');
             }
        }catch(err) {
            console.log(err);
        }
    });


    $('#sidebet .btn').on('click', function(ty){               
       this.id != localStorage.getItem("SIDEBETS") ? localStorage.setItem("SIDEBETS", this.id) : localStorage.setItem("SIDEBETS", '');
       var sidebet = localStorage.getItem("SIDEBETS");
       if(sidebet!=''){
           
           var sidebetMultiplierAmount = sideBetMultiplier[sidebet];
           $('#sidebet-multiplier').val(sidebetMultiplierAmount +' x');
           $('#sidebet-winChance').val(sideBetWinChance[sidebet]+'%');
           $('#hidden_sidebetmultiplier').val(sideBetMultiplier[sidebet]);
           $('#sidebetAmount').prop("disabled", false);
           $('#sidebetAmount').val(10);
           $('#sidebet-span-info').hide();
           calculateSideBetPayout();
        }else{
           $('#sidebet-multiplier').val('');
           $('#sidebet-winChance').val('');
           $('#hidden_sidebetmultiplier').val('');
           $('#sidebetAmount').val('');
           $('#sidebet-payout').val(0);
           $('#sidebet-jackpot').html(0); 
           $('#sidebet-span-info').show(); 
           $('#sidebetAmount').prop("disabled", true);
        }     

    });

    function calculateSideBetPayout(){
        var sidebetAmount = $('#sidebetAmount').val();
       if(isNaN(sidebetAmount)){
            alertify.error('Input must be Numeric');
            $('#sidebetAmount').val('');
            $("#sidebet-payout").val(0);
       }else if(sidebetAmount < 0){
            alertify.error('Wager amount must be Positive!');
            $('#sidebetAmount').val('');
            $("#sidebet-payout").val('');
       }else{
         var multiplier = $("#hidden_sidebetmultiplier").val();
         res = parseInt(sidebetAmount) * multiplier;
         res = res.toString(); 
         if(res.indexOf(".")!=-1){
            res = res.slice(0, (res.indexOf("."))+3);
         }
         if(isNaN(res)) {
             $("#sidebet-payout").val(0);
             //$('#sidebet-jackpot').html(0);  
        }else{
            /*
            if(sidebetAmount==0 || sidebetAmount==''){
                $('#sidebet-jackpot').html(0);    
            }else if(sidebetAmount>250){
                $('#sidebet-jackpot').html(numberWithCommas(250000));    
            }else{
                $('#sidebet-jackpot').html(numberWithCommas(sidebetAmount*1000));    
            }
            */
            $("#sidebet-payout").val(res);   
         }
         
       }

    }
    async function updateBalance(){
        
        var pData = { address : global.userAddressHex}
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": TRONGRID_URL,
          "method": "POST",
          "headers": {
            "content-type": "application/json"
          },
          "data": JSON.stringify(pData)
          }
        
        $.ajax(settings).done(async function (response) {
          response = JSON.parse(response);
         let trxBal = response['balance'];
         $("#trxBalance").val(sun_to_TRX_2decimals(trxBal));
        });
        
    }
    setInterval(function(){
        if (!window.rolling)
        {
            updateBalance();
        }
    }, 20*1000);
    
    const app = async() => {
        var pData = { address : global.userAddressHex}
      
        var settings = {
          "async": true,
          "crossDomain": true,
          "url": TRONGRID_URL,
          "method": "POST",
          "headers": {
            "content-type": "application/json"
          },
          "data": JSON.stringify(pData)
          }
        
        $.ajax(settings).done(async function (response) {
          response = JSON.parse(response);
         let trxBal = response['balance'];
         $("#trxBalance").val(sun_to_TRX_2decimals(trxBal));
         console.log("Initial TRX balance update");
        });
    };
    
    let gameStats_running = false;
    function gameStats(){
        if (gameStats_running) return;
        gameStats_running = true;
        
        try
        {
            $.getJSON(API_URL + "getBetsWin.php", function( data, sucess,xhr ) {
                try
                {
                    
                    if(xhr.status==200){
                        if (data.result==true){
                            $('#totalBets').html(data.totalbets);
                            $('#totalWon').html(data.totalWin);
                        }
        
                    }else{
                        console.log('error gettting api data');
                    }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Failed to parse getBetsWin.php");
                }
                gameStats_running = false;
                setTimeout(gameStats, 5000);
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Failed to load getBetsWin.php");
            gameStats_running = false;
            setTimeout(gameStats, 5000);
        }
    }
    
    async function gameStats2(){
        try
        {
            //update token every 5 sec
            if(tokenContractInstance!=undefined){
                var myTotalToken = 0;
                var tokentoMint = 1000000;
                /*For getting the tokens balance*/
                var tokens  = await tokenContractInstance.balanceOf(global.userAddress).call();
                var val = Object.values(tokens);
                var tokenNumber = window.tronWeb.toDecimal(val[0]);
                tokenNumber =tokenNumber /100000000;
                if(tokenNumber>0){
                    tokenNumber = tokenNumber.toString(); 
                    //tokenNumber = tokenNumber.slice(0, (tokenNumber.indexOf("."))+3);
                    $("#myAvailableToken2").val(number_to_2decimals(tokenNumber));
                    $('#tokenBalance').html(tokenNumber.slice(0, (tokenNumber.indexOf("."))+9));
                }else{
                    $("#myAvailableToken2").val(0);
                    $('#tokenBalance').html(0);
                }
    
                myTotalToken = myTotalToken + parseFloat(tokenNumber);
                    
                var frozenTokens  = await tokenContractInstance.frozenTopia(global.userAddress).call();
                var val = Object.values(frozenTokens);
                var frozentokenNumber = window.tronWeb.toDecimal(val[0]);
                frozentokenNumber = frozentokenNumber / 100000000;
    
                var myUnfrozenTokens  = await tokenContractInstance.frozenTopiaReleaseAmount(global.userAddress).call();
                var val = Object.values(myUnfrozenTokens);
                var myUnfrozentokenNumber = window.tronWeb.toDecimal(val[0]);
                myUnfrozentokenNumber = myUnfrozentokenNumber /100000000;
                $("#myUnFrozenTopia").html(myUnfrozentokenNumber);
                myTotalToken = myTotalToken + myUnfrozentokenNumber + frozentokenNumber;
                myTotalToken = myTotalToken.toString(); 
                //myTotalToken = myTotalToken.slice(0, (myTotalToken.indexOf("."))+3);
                $('#myTotalToken').html(number_to_2decimals(myTotalToken));   
                $('#myTotalToken2').html(number_to_2decimals(myTotalToken));  
            }
        }
        catch (e)
        {
           // console.error(e);
        }
        setTimeout(gameStats2, 5000);
    }
     
    async function init(){
        
        localStorage.removeItem('previousFinishBet');
        var ultimateDiceContractInfo = await tronWeb.trx.getContract(ultimateDiceContractAddress);
        ultimateDiceContractInstance = await tronWeb.contract(ultimateDiceContractInfo.abi.entrys, ultimateDiceContractInfo.contract_address);
        
        //voucher.js contract init   
        voucherContractInit();
        //dividend.js dividend contract init
        dividendContractInit();
        //token.js token contract init
        tokenContractInit();
        //shares.js shares contract init
        shareContractInit();
        //referral.js referral contract init
        referralContractInit();
         //diamonds.js diamond contract init
        diamondsContractInit();
        ultimateDiceContractInstance.SideBetJackpot().watch((err,resultData) => {
            //if(err) {return console.log("Failed to bind the event :", err);}
            if(resultData){ 
                 var result = resultData.result;
                 var transaction = resultData.transaction;
                 var txURL = 'https://tronscan.org/#/transaction/'+transaction;
                 var user = getUserAddress(tronWeb.address.fromHex(result.winner));
                 var jackpotAmount = result.jackpotAmount/1000000;
                 $('#sidebetWinUser').html(user);
                 $('#sidebetWinAmount').html('<a style="color:#fff;text-decoration: underline;" href="'+txURL+'" target="_blank">'+jackpotAmount+'</a> ');
                 $('#sidebetWinNotify').show();
            }
         });
         
        if(global.loggedIn==true){
            //updateInterface();
            setTimeout(updateInterface,3000);
            app();
        }     
         
         /* Getting currentSideBetJackpotSize from game contract */
         async function updateCurrentJackpotSize() {
             let currentSideBetJackpotSize = await ultimateDiceContractInstance.currentSideBetJackpotSize().call();
             const sideBetJackpotTRX = window.tronWeb.fromSun(currentSideBetJackpotSize);
             //currentSideBetJackpotSize = window.tronWeb.toDecimal(currentSideBetJackpotSize);
             $('#sidebet-jackpot').html(numberWithCommas(number_to_2decimals(sideBetJackpotTRX))); //numberWithCommas(currentSideBetJackpotSize / 1000000));
             setTimeout(updateCurrentJackpotSize, 15000);
         }
         await updateCurrentJackpotSize();
        
         displayboards();
         getluckyTimer();
         getLukcyLeaders();
         setInterval(displayboards,60000);
         setInterval(getLukcyLeaders,60000);
         removeLoader();  
         var cur_seeds,new_seeds,formated_seeds,totalBets,totalWin;
         /*To get Seeds*/             
         //cur_seeds = await ultimateDiceContractInstance.getSeed().call();
         var SEEDTEXT = localStorage.getItem("NEWSEED");
          if(SEEDTEXT!=''){
            cur_seeds = SEEDTEXT;
          }else{
            cur_seeds = "0x0";
          }
         $("#cur_seeds").val(cur_seeds);
         setTimeout(showData,3000);


            //function to check internet speed
            function checkInternet(){
                 if(navigator.onLine){
                    if(global.internetConnection=="false"){
                        $("#rollBtn").hide();
                        $("#rollDice").show();  
                            var autoRoll=''; 
                            $('.autoRoll').each(function(){
                                var checked = $(this).hasClass('selected');
                                if(checked){
                                    autoRoll = $(this).data('auto');
                                }

                            });
                    
                    if(autoRoll=='on'){
                            global.internetConnection = "true";
                            console.log("Internet is back Rolling Again.");
                            setTimeout (function () { $('#rollDice').click()},2000);
                            return false;
                        }
                    }
                 } else {
                  global.internetConnection = "false";
                  console.log("No Internet Connection.Cheking Again.");
                  $("#rollBtn").hide();
                  $("#rollDice").show();  
                 }
            }
    setInterval(checkInternet,1000);
        $('#preloader').hide();
        $('#allBetTableButton').trigger('click');
      setTimeout(removeLoader, 3000);  
    }

   async function updateInterface(){
            var myTotalToken = 0;
            var tokentoMint = 1000000;
            //get global settings for user
             $.get(API_URL + "getuserlvl.php?id="+global.userAddress, function(data, status,xhr){
                if(xhr.status==200){
                        data = JSON.parse(data);
        
                        if(data.result==true){
                            var userData = data.data[0];
                            global.image_url = userData.image;
                            global.color = userData.color;
                            global.level = userData.level;
                            global.username = userData.username;
                        }
                    }
                }); 
            //voucher.js voucher init code
            updateVouchersData();

            //tokens.js token init code
            updateTokenData();

            //dividend.js for getting avilable dividend in dividend popup
            updateDividendData();

            //token.js for unfrozen countdown
            unFrozenCountDown();
            
             //referral.js set referral link, display bonus, data set ref id 
             setReferralLink();
             referralBonusData();
             var refid = await referralContractInstance.referrers(global.userAddress).call();
             refid = window.tronWeb.address.fromHex(refid);
             if(REFID==''){  REFID = refid; }
            
            //token.js current freeze tier    
            currentFreezeTier();

            //referral.js progress bar
            referralProgressBar();
            
            //shares.js shares data
             updateSharesData();  
            
            //diamonds.js diamonds data
             updateDiamondsData();       

             diamondsProgressBar(); 
            // updateICODiamondsData();
    }

    async function showData(){
            
            //voucher.js voucher data code
            updateVouchersData();
            //dividend.js display dividend panel data
            updateDividendData();

            //token.js display total frozen topia etc
            updateTokenData();
            displayTokenData();
            
            //token.js freeze tier percentage
            currentFreezeTier();

            //voucher.js voucher progress bar code
            voucherProgressBar();
            
            //token.js progress bar
            tokenProgressBar();

            //referral.js bonus balance 
             referralBonusData();
              /*get stage and calculate TRX for wagers*/    
             // console.log(totalSupply);
             
             //shares.js
             updateSharesData();
             shareProgressBar();

              //diamonds.js diamonds data
             updateDiamondsData();      
             diamondsProgressBar(); 
            // updateICODiamondsData();
    }
    //setTimeout( function (){ $('#pills-all-bets-tab').click();},2000);
    gameStats();
    gameStats2();
    setInterval(gameStats,5000);
    //setInterval(allbetsData,1000);
    setTimeout(allbetsData,3000);
    setTimeout(mybetsData,3000);
    setInterval(mybetsData,10000);
    setTimeout(highRollersData,3000);
    setTimeout(rareWinsData,3000);
    setTimeout(allSideBetsData,3000);
    setTimeout(mybsidebetsData,3000); 
    setInterval(showData,60000);
   
    let allbetsData_running = false;
    function allbetsData(){
        if (allbetsData_running) return;
        allbetsData_running = true;
        try
        {
            $.get(API_URL + "allbets.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if (data.result == true)
                    {
                        $('#tab_2').empty();
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        //var allBetTableHTML;
                        var allBetTableHTML= ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                        
                        $.each(resultking, function(key, obj) {
                            var result = obj.result;
                            if (result == "true")
                            {
                                rowBoarderColorClass = "safe";
                                let multiplier =  getMultiplier(obj.startNumber,obj.endNumber);
                                var payout = multiplier*obj.bet;
                                payout = payout.toFixed(2);
                                //payout = payout.toString(); 
                                //payout = payout.slice(0, (payout.indexOf("."))+3);
                                payout += " <span>TRX</span>";
                            }
                            else
                            {
                                 rowBoarderColorClass = "redalt";
                                 //payout = '-'+obj.bet;
                                 payout = '-';
                            }
                            
                            let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                            
                            allBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.startNumber + " - " + obj.endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                        });
                        
                        allBetTableHTML += '</ul></div>';
                        
                        $("#bet2").html(allBetTableHTML);
                    }
                    else
                    {
                       // $("#bet2").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>'); 
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Parsing all bets data failed. Retrying in 2 seconds...");
                    setTimeout(allbetsData, 2000);
                }
                allbetsData_running = false;
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Loading all bets data failed. Retrying in 2 seconds...");
            setTimeout(allbetsData, 2000);
            allbetsData_running = false;
        }
    }

    let mybetsData_running = false;
    function mybetsData(){
        if (mybetsData_running) return;
        mybetsData_running = true;
        
        try
        {
            //mybets table data
            //console.log
           var userAddress = global.userAddressHex;
           userAddress = userAddress.substring(2);
            $.get(API_URL + "mybets.php?user="+userAddress, function(data, status,xhr){
                //data = JSON.parse(data);
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        for (let i=0; i<extraBetsToDisplayAtTopOfMyBets.length; i++)
                        {
                            const extraBet = extraBetsToDisplayAtTopOfMyBets[i];
                            if (extraBet.timestampMs < Date.now() - 30*1000)
                            {
                                console.log("extraBetsToDisplayAtTopOfMyBets is too old: ", extraBet);
                                extraBetsToDisplayAtTopOfMyBets.splice(i, 1);
                                i--;
                            }
                            else
                            {
                                let found = false;
                                for (let j=0; j<data.data.length; j++)
                                {
                                    //console.log("Comparing", data.data[j], " to ", extraBet, "t1="+data.data[j].timestamp.substring(data.data[j].timestamp.length-5)+" t2="+extraBet.timestamp.substring(extraBet.timestamp.length-5));
                                    
                                    if (parseInt(data.data[j].startNumber) == parseInt(extraBet.startNumber) &&
                                        parseInt(data.data[j].endNumber) == parseInt(extraBet.endNumber) &&
                                        parseInt(data.data[j].bet) == parseInt(extraBet.bet) &&
                                        parseInt(data.data[j].winningNumber) == parseInt(extraBet.winningNumber) &&
                                        data.data[j].timestamp.substring(data.data[j].timestamp.length-5) == extraBet.timestamp.substring(extraBet.timestamp.length-5))
                                    {
                                        console.log("extraBetsToDisplayAtTopOfMyBets already exists: ", extraBet);
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found)
                                {
                                    console.log("prepending from extraBetsToDisplayAtTopOfMyBets: ", extraBet);
                                    data.data.unshift(extraBet);
                                }
                            }
                        }
                        
                        //$('#tab_1').empty();
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var myBetTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                        $.each(resultking, function(key, obj) {
                                var result = obj.result;
                                if(result=="true"){
                                    rowBoarderColorClass = "safe";
                                    let multiplier =  getMultiplier(obj.startNumber,obj.endNumber);
                                    var payout = multiplier*obj.bet;
                                    payout = payout.toFixed(2);
                                    //payout = payout.toString(); 
                                    //payout = payout.slice(0, (payout.indexOf("."))+3);
                                    payout += " <span>TRX</span>";
                                    
                                }else{
                                     rowBoarderColorClass = "redalt";
                                     payout = '-';
                                }
                                
                                let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                                
                                myBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.startNumber + " - " + obj.endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                         });
                        
                        myBetTableHTML += '</ul></div>';
                        
                        $("#bet1").html(myBetTableHTML);
                        
                    }
                    else{
                        //$("#bet1").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>'); 
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Loading my bets data failed. Retrying in 2 seconds...");
                    setTimeout(mybetsData, 2000);
                }
                mybetsData_running = false;

            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Loading my bets data failed. Retrying in 2 seconds...");
            setTimeout(mybetsData, 2000);
            mybetsData_running = false;
        }
    }

 
$('#dividendPopup').click(function(){
    showData();
    $('#tokenToFreeze').val('');
});

    let highRollersData_running = false;
    function highRollersData(){
        if (highRollersData_running) return;
        highRollersData_running = true;
        
        try
        {
            $.get(API_URL + "highrollers.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var highRollersTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                       
                        $.each(resultking, function(key, obj) {
                                var result = obj.result;
                                if(result=="true"){
                                    rowBoarderColorClass = "safe";
                                    let multiplier =  getMultiplier(obj.startNumber,obj.endNumber);
                                    var payout = multiplier*obj.bet;
                                    payout = payout.toFixed(2);
                                    //payout = payout.toString(); 
                                    //payout = payout.slice(0, (payout.indexOf("."))+3);
                                    payout += " <span>TRX</span>";
                                    
                                }else{
                                     rowBoarderColorClass = "redalt";
                                     payout = '-';
                                }
                               
                                let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                                
                                /* 1st position:  "dividend * 0.5 /100 * 50 /100"  and so on. */
                                
                                highRollersTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.startNumber + " - " + obj.endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                                
                        });
                        
                        highRollersTableHTML += '</ul></div>';
                        
                        $("#bet3").html(highRollersTableHTML);
                        
                    }else{
        
                      //$("#bet3").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>'); 
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Failed to parse high rollers data.");
                }
                highRollersData_running = false;
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Failed to fetch high rollers data");
            highRollersData_running = false;
        }
    }

    let rareWinsData_running = false;
    function rareWinsData(){
        if (rareWinsData_running) return;
        rareWinsData_running = true;
        
        try
        {
            $.get(API_URL + "rarewins.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var rareWinsTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                       
                        $.each(resultking, function(key, obj) {
                                var result = obj.result;
                                if(result=="true"){
                                    rowBoarderColorClass = "safe";
                                    let multiplier =  getMultiplier(obj.startNumber,obj.endNumber);
                                    var payout = multiplier*obj.bet;
                                    payout = payout.toFixed(2);
                                    //payout = payout.toString(); 
                                    //payout = payout.slice(0, (payout.indexOf("."))+3);
                                    payout += " <span>TRX</span>";
                                    
                                }else{
                                     rowBoarderColorClass = "redalt";
                                     payout = '-';
                                }
                                
                                let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                                rareWinsTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.startNumber + " - " + obj.endNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                                
                        });
                        
                        rareWinsTableHTML += '</ul></div>';
                        
                        $("#bet4").html(rareWinsTableHTML);
                        
                    }else{
                        
                      //$("#bet4").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>');  
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Failed to parse rare wins data");
                }
                rareWinsData_running = false;
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Failed to fetch rare wins data");
            rareWinsData_running = false;
        }
    }

    let allSideBetsData_running = false;
    function allSideBetsData(){
        if (allSideBetsData_running) return;
        allSideBetsData_running = true;
        
        try
        {
            $.get(API_URL + "allsidebets.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var allSideBetsTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                       
                        $.each(resultking, function(key, obj) {
                                var result = obj.result;
                                if(result=="true"){
                                     rowBoarderColorClass = "safe";
                                     payout = obj.winamount/1000000;
                                     payout = payout.toFixed(2);
                                     //payout = payout.toString(); 
                                     //payout = payout.slice(0, (payout.indexOf("."))+3);
                                     payout += " <span>TRX</span>";
                                }else{
                                     rowBoarderColorClass = "redalt";
                                     payout = '-';
                                }
                                
                                let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                                if(obj.bet!=0){
                                    
                                    allSideBetsTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.sidebet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                                
                                }
                        });
                        
                        allSideBetsTableHTML += '</ul></div>';
                        
                        $("#bet5").html(allSideBetsTableHTML);
                        
                    }else{
        
                     // $("#bet5").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>');  
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Failed to parse all side bets data");
                }
                allSideBetsData_running = false;
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Failed to fetch all side bets data");
            allSideBetsData_running = false;
        }
    }
   
    let mysidebetsData_running = false;
    function mybsidebetsData()
    {
        if (mysidebetsData_running) return;
        mysidebetsData_running = true;
        
        
        try
        {
            //$("#bet6").empty();
           var userAddress = global.userAddressHex;
           userAddress = userAddress.substring(2);
            $.get(API_URL + "mysidebets.php?user="+userAddress, function(data, status,xhr)
            {
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if (data.result == true)
                    {
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var mySideBetsTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                       
                        $.each(resultking, function(key, obj)
                        {
                            var result = obj.result;
                            if (result=="true")
                            {
                                 rowBoarderColorClass = "safe";
                                 payout = obj.winamount/1000000;
                                 payout = payout.toFixed(2);
                                 payout += " <span>TRX</span>";
                                 //payout = payout.toString(); 
                                 //payout = payout.slice(0, (payout.indexOf("."))+3);
                            }
                            else
                            {
                                 rowBoarderColorClass = "redalt";
                                 payout = '-';
                            }
                           
                            
                            let user = getUserAddress(tronWeb.address.fromHex(obj.user));                        
                            mySideBetsTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.sidebet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                        });
                        
                        mySideBetsTableHTML += '</ul></div>';
                        
                        $("#bet6").html(mySideBetsTableHTML);
                        
                    }
                    else
                    {
                       // $("#bet6").html('<div class="text-center" style="color: #fff; padding: 60px;">'+data.msg+'</div>');  
                    }
                }
                }
                catch (e)
                {
                    console.error(e);
                    console.error("Failed to parse mysidebets.php, retrying in 2 seconds...");
                }
                mysidebetsData_running = false;
            });
        }
        catch (e)
        {
            console.error(e);
            console.error("Failed to fetch mysidebets.php, retrying in 2 seconds...");
            setTimeout(mybsidebetsData, 2000);
            mysidebetsData_running = false;
        }
    }

    
    
    $('#showAllTokens').click(async function(){
        var tokens = $('#myAvailableToken3').val();
        $('#tokenToFreeze').val(tokens);
    });
    
    //freeze token
    $('#freezeTopia').click(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
             $('#dividend').modal('hide');
        }
    });
    $('#btnTokenFreeze').click(async function(){
        var tokensAvailable = $('#myAvailableToken3').val();
        var tokens = $('#tokenToFreeze').val();
        tokens = parseFloat(tokens);
        tokensAvailable = parseFloat(tokensAvailable);
        $('#freezeTokenPopup').modal('hide');
        
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setTimeout(function(){
                    $('#dividend').modal('show');
                    $('body').addClass('modal-open'); 
                },2000);
            }
            
        if(tokens>0){
             tokens = tokens * 100000000;
             tokens = parseInt(tokens);
            var result = await tokenContractInstance.freezeTopia(tokens).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
            if(result==true){
                alertify.success('Tokens Frozen.');
                $('#dividend').modal('hide');
                // setTimeout(function(){
                //     showData();              
                // },3000);
            }else{
                alertify.error('Something went wrong, please try again');
            }
        }
    })
    //unfreeze token
    $('#unfreezeTopia').click(async function(){
        var token = $('#myFreezeToken').val();
        token = parseInt(token * 100000000);
        if(token>0){
            alertify.confirm('This will unfreeze all of your TOPIA. This process takes 24 hours for you to be able to withdraw your tokens to your wallet. You will miss the next dividend distribution, your tier status will reset to Bronze, and you will have to start over.').setHeader('<b>Are you sure?</b>').set('onok', async function(closeEvent){
        
                var result = await tokenContractInstance.unfreezeTopia().send({
                    shouldPollResponse: true,                
                    feeLimit: 5000000,
                    callValue: 0,
                    from: global.userAddress
                });
                if(result==true){
                    alertify.success('Token Unfreeze Process Started');                
                    setTimeout(function(){
                        showData();                 
                    },3000);
                }else{
                    alertify.error('Something went wrong, please try again.');
                }            
            }).set('labels', {ok:'Unfreeze', cancel:'Cancel'});
        }
    });
    
    // shares buttons
 $('#withdrawSharesEverythingBtn').click(async function(){
     var result = await shareContractInstance.withdrawDividendsEverything().send({
        shouldPollResponse: true,
        //feeLimit: 1000000000,
        feeLimit: 5000000,
        callValue: 0,
        from: global.userAddress
     })
    if(result==true){
        alertify.success('Withdrawal successfull.');
        setTimeout(function(){
            showData();              
        },3000);
    }else{
        alertify.error('Something went wrong, please try again');
    }   
 });

 $('#withdrawUnFrozenSharesBtn').click(async function(){
     var result = await shareContractInstance.withdrawUnfrozenShares().send({
        shouldPollResponse: true,
        //feeLimit: 1000000000,
        feeLimit: 5000000,
        callValue: 0,
        from: global.userAddress
     })
    if(result==true){
        alertify.success('Withdrawal successfull.');
        setTimeout(function(){
            showData();              
        },3000);
    }else{
        alertify.error('Something went wrong, please try again');
    }   
 });
 

 $('#unfreezeShareBtn').click(async function(){
     var result = await shareContractInstance.unfreezeShares().send({
        shouldPollResponse: true,
        //feeLimit: 1000000000,
        feeLimit: 5000000,
        callValue: 0,
        from: global.userAddress
     })
    if(result==true){
        alertify.success('UnFrozen Shares.');
        setTimeout(function(){
            showData();              
        },3000);
    }else{
        alertify.error('Something went wrong, please try again');
    }   
 });
 
 //referral withdraw
 
//withdraw referral bonus button 
$('#withdrawReferralBonus').click(async function(){
        
        var result = await referralContractInstance.claimReferrerBonus().send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             }).then(function(error,result){
                if(!error){

                }else{
                    console.log(error)
                }
            })
             if(result.result==true){
                 alertify.success('Referral Bonus Withdrawn');
                  setTimeout(function(){
                    showData();              
                },3000);
             }else{
                 alertify.error('Nothing to Withdraw')
             }
});
    
    /**
     * ===  DEV - PLEASE READ  ====
     * Because there was a BUG(!!) found in token contract at line number #871..
     * if we call withdrawDividendTRXandTopia function in dividend contract, then it was sending tokens to contract addresses instead of user
     * So.. we have to withdraw both separately.
     * To withdraw Topia, we have to call withdrawUnfrozenTopia function in token contract
     * And to withdraw Dividends, we have to call withdrawDividendTRXandTopia in dividend contract.
     * VERY IMPORTANT:  Before calling withdrawDividendTRXandTopia in div contract, we have to withdraw all available topia, otherwise..
     * withdrawDividendTRXandTopia function will again send Topia to div contract instead of user. 
     * SO.. we have to withdraw topia before TRX.. 
     * This is quick fix until we swap the div contract and resolved this bug.
     */
    //withdraw Topia token
    $('#withdrawTopiaBtn').click(async function(){
        //first we will check if user has any available topia to withdraw. If so, then we will first withdraw it.
        var availableTopia = await tokenContractInstance.displayAvailabletoWithdrawTOPIA().call();
        val = Object.values(availableTopia);
        var finalTopiaAvailable = window.tronWeb.toDecimal(val[0]);
        console.log(finalTopiaAvailable);
        if(finalTopiaAvailable > 0){
            var result = await tokenContractInstance.withdrawUnfrozenTopia().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
            if(result.result==true){
                alertify.success('Topia Withdrawal Successful');
                 setTimeout(function(){
                    showData();                  
                },3000);
            }
        }
        else{
            alertify.error("Insufficient Topia Available");
        }
    });
    
    //withdraw TRX
    $('#withdrawTrxBtn').click(async function(){
        
        //checking if user has dividend available
        var dividends = await divContractInstance.userConfirmedDividendDivRake(global.userAddress).call();
        var val2 = Object.values(dividends);
        var divNumber = window.tronWeb.toDecimal(val2[0]);
        if(divNumber > 0){
        
            //we will check if user has any available topia to withdraw. If so, then we will first withdraw it.
            var availableTopia = await tokenContractInstance.displayAvailabletoWithdrawTOPIA().call();
            var val = Object.values(availableTopia);
            var finalTopiaAvailable = window.tronWeb.toDecimal(val[0]);
            
            if(finalTopiaAvailable > 0){
                //withdrawing available topia now
                alertify.alert("Gentle Note!", "It seems you have available Topia to withdraw. So, system will first withdraw Topia and then your dividends.",
                    async function(){
                        var withdrawTopia = await tokenContractInstance.withdrawUnfrozenTopia().send({
                            shouldPollResponse: true,
                            feeLimit: 5000000,
                            callValue: 0,
                            from: global.userAddress
                        });
                        if(result.result==true){
                            alertify.success('Topia withdrawn successfully. Now withdrawing Dividend.');
                            //now we are withdrawing dividend calling dividend contract
                            var withdrawDividend = await divContractInstance.withdrawDividendDivRake().send({
                                shouldPollResponse: true,
                                feeLimit: 5000000,
                                callValue: 0,
                                from: global.userAddress
                            });
                            
                            if(withdrawDividend.result==true){
                                alertify.success('Dividend withdrawn successfully');
                                setTimeout(function(){
                                    showData();                 
                                },3000);
                            }
                        }
                    }
                );
            }
            
            //there is no topia available to withdraw. So, we will just withdraw dividends directly
            else{
                var withdrawDividend = await divContractInstance.withdrawDividendDivRake().send({
                    shouldPollResponse: true,
                    feeLimit: 5000000,
                    callValue: 0,
                    from: global.userAddress
                });
                
                if(withdrawDividend.result==true){
                    alertify.success('Dividend withdrawn successfully');
                    showData();              
                }
            }
    
        }
        
        //if user does not dividend available to withdraw, then just show error message
        else{
            alertify.error("Insufficient Dividend Available ");
        }
        
    });

    //upgrade button click 
    $('#upgrade').click(async function(){
            var result = await tokenContractInstance.upgradeTopia().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
            if(result.result==true){
                alertify.success('User Account Upgraded');
                 showData();              
            }
        
    });

    $("#rollPopClose").click(function(){
        $("#roll_status").hide();
        $("#poip-fri").hide();
    });
    //setInterval(updateBalance,5000);
   
   function converSidebetToInt(sidebet){
        var sidebet_;
        if(sidebet=='yin'){sidebet_=1;}
        if(sidebet=='yang'){sidebet_=2;}
        if(sidebet=='bang'){sidebet_=3;}
        if(sidebet=='zero'){sidebet_=4;}
        if(sidebet=='odd'){sidebet_=5;}
        if(sidebet=='even'){sidebet_=6;}
        return sidebet_;
   }
function resetBtnSlider(){
    $("#rollDice").attr("disabled", false);
    $("#rollBtn").attr("disabled", false);
    var pipsSlider = document.getElementById('slider-pips');
    pipsSlider.removeAttribute('disabled');
}
function resetrollUI(){
     $("#rollBtn").hide();
     $("#rollDice").show();
     $("#rollDice").attr("disabled", false);
     $("#rollBtn").attr("disabled", false);
     var pipsSlider = document.getElementById('slider-pips');
     pipsSlider.removeAttribute('disabled');
}

let extraBetsToDisplayAtTopOfMyBets = [];



let lastBlock_retrievedAllEvents = 0;
const blockNumber_to_event_to_amountReceived = {};

var lastRollResultTimestamp = 0;
let startBetTxid = null;


window.rolling = false;

  $('#rollDice').click(async function() { 
    console.log('rolling again');
      window.rolling = true;
      //we want to disable button for 4 seconds
      
      $("#rollDice").attr("disabled", true);
      $("#rollBtn").attr("disabled", true);
      
      if (lastRollResultTimestamp === 0)
      {
          lastRollResultTimestamp = Date.now() - 1000;
      }
        var timestamp = + new Date();
        var pipsSlider = document.getElementById('slider-pips');
        pipsSlider.setAttribute('disabled', true);
        
        //set cookies for finish bet alert
        document.cookie = "rollDiceClickTime="+timestamp;
        var contractInfo = await tronWeb.trx.getContract(ultimateDiceContractAddress);
        var gameContractInstance = tronWeb.contract(contractInfo.abi.entrys, ultimateDiceContractAddress);
        
        var sidebetInt =0;
        //clear style for bounce num 
        setTimeout(function(){
            $('#bounce_num').html("");
            $('#bounce_num2').html("");  
            $('#bounce_num').removeAttr("style");
            $('#bounce_num2').removeAttr("style");    
        },3000);
       
        var start, end, betAmt,betAmount, seed,newSeedVal,finalSeed,payout_to_win;
        
        start       = $("#startVal").val();
        end         = $("#endVal").val();
        betAmount   = $("#betAmt").val();
        betAmt      = parseInt(betAmount)
        DB_startNumber = start;
        DB_endNumber = end;
        DB_betAmt = betAmt;
        
        var sidebetAmount = $('#sidebetAmount').val(); 
        var sidebet = localStorage.getItem("SIDEBETS") ? localStorage.getItem("SIDEBETS") : '';  
        
        /*Checking the bet amount with defined bet value -  MAX_BET_AMOUNT */
        
        if(betAmt > MAX_BET_AMOUNT){
            alertify.error('The max bet amount is currently ' + MAX_BET_AMOUNT);
            resetrollUI();
            return false;
        }
        if(betAmt < MIN_BET_AMOUNT){
            alertify.error('The min bet amount is currently ' + MIN_BET_AMOUNT);
            resetrollUI();
            return false;
        }
        
        if(sidebetAmount > MAX_SIDEBET_AMOUNT){
            alertify.error('The max side bet amount is currently ' + MAX_SIDEBET_AMOUNT);
            resetrollUI();
            return false;
        }


        var maxWin = await gameContractInstance.maxWin().call();
        var val = Object.values(maxWin);
        maxWin = window.tronWeb.toDecimal(val[0]);
        maxWin = tronWeb.fromSun(maxWin); 
        maxWin = parseInt(maxWin);
        
        totalMaxAmount = maxWin - (maxWin*10/100);
        totalMaxAmount = parseInt(totalMaxAmount);
        
        var PAYOUT_WIN_AMOUNT = $('#payout').val();
        var single_payout =  PAYOUT_WIN_AMOUNT - betAmt;
        PAYOUT_WIN_AMOUNT = parseFloat(PAYOUT_WIN_AMOUNT);
        var SIDEBET_PAYOUT_WIN_AMOUNT = $('#sidebet-payout').val();
        if(sidebet!=""){ betAmt = betAmt + parseFloat(sidebetAmount); PAYOUT_WIN_AMOUNT = PAYOUT_WIN_AMOUNT + parseFloat(SIDEBET_PAYOUT_WIN_AMOUNT)}
        
        var PAYOUT_WIN_AMOUNT = PAYOUT_WIN_AMOUNT - betAmt;

        if(PAYOUT_WIN_AMOUNT>totalMaxAmount){
            alertify.error('Can not wager more than current Max Payout');   
            resetrollUI();         
            return false;  
        } 

        $("#rollBtn").show();
        $("#rollDice").hide();
        newSeedVal  = localStorage.getItem("NEWSEED");
        /* generating random hex for seed and betID  */
        var seed2 = Math.floor((Math.random() * 100000000) + 1);
        var uniqueString = timestamp + global.userAddress + seed2;
        uniqueString =  tronWeb.sha3(uniqueString, true);
        
        seed = newSeedVal ? newSeedVal : uniqueString;     
        global.uniqueBetId = uniqueString;   
        const userBalance = await window.tronWeb.trx.getBalance(global.userAddress);
        if (userBalance < betAmt) {
            alert('Your Tron wallet has insufficient balance to proceed');
            resetrollUI();
            return false;
        }
        
        callValue = betAmt * 1000000;
        //get old txid 
        /* get sidebet name as integer parameter
            yin = 1; yang = 2; bang = 3; zero = 4;odd = 5; even = 6; 
            pass array as [startnumber,endnumber,betamt,sidebetvalue,sidebet]
        */

        if(sidebet!=""){
         sidebetInt = converSidebetToInt(sidebet);
        }
        if(sidebetAmount==""){
            sidebetAmount = 0;
        }
        const rollIntegerVariables = [start,end,betAmount,sidebetAmount,sidebetInt];
       // console.log(rollIntegerVariables);
        let betToFinish = null;
        
        let betDataReceivedFunc = null;
        
        //checking variables for previous finish bet
        if (localStorage.getItem('previousFinishBet') !== null && localStorage.getItem('previousFinishBet') != "" && JSON.parse(localStorage.getItem('previousFinishBet')).length >= 1){
        
            let finishBetData = JSON.parse(localStorage.getItem('previousFinishBet'));
            
            betToFinish = finishBetData.shift();
            //console.log(finishBetData);
            
            var finishBet_gambler = betToFinish[0];
            var finishBet_uniqueBetId = betToFinish[1];
            var finishBet_userSeed = betToFinish[2];
            var finishBet_blockNumber = betToFinish[3];
            var finishBet_rollIntegerVariables = betToFinish[4];
            
            localStorage.setItem('previousFinishBet', JSON.stringify(finishBetData));
        }
        else
        {
            var finishBet_gambler = "0x0000000000000000000000000000000000000000";
            var finishBet_uniqueBetId = tronWeb.sha3("0", true);
            var finishBet_userSeed = tronWeb.sha3("0", true);
            //var finishBet_uniqueBetId = "0x0";
            //var finishBet_userSeed = "0x0";
            var finishBet_blockNumber = 0;
            var finishBet_rollIntegerVariables = [0,0,0,0,0];
        }
       
       /* console.log('finisheBet Gambler : '+ finishBet_gambler);
       console.log('finishBet UniqueBetid : ' + finishBet_uniqueBetId);
       console.log('finishBet User seed :' + finishBet_userSeed);
       console.log('finishBet blocknumber : ' + finishBet_blockNumber);
       console.log('finsihbet rollint vars : '+ finishBet_rollIntegerVariables);
       console.log('roll int vars : '+ rollIntegerVariables);
       console.log('refid'+ REFID);
       console.log('seed : '+ seed);
       console.log('unique string : '+ uniqueString); */
        try
        {
            console.log('finishbet unique id : ' +finishBet_uniqueBetId);
            // if(localStorage.getItem('previousFinishBet') == null || localStorage.getItem('previousFinishBet') == "" || JSON.parse(localStorage.getItem('previousFinishBet')).length == 0){
            //     console.log('startbet : ' + rollIntegerVariables + ',' +  REFID + ',' +  seed + ',' +  uniqueString );
            //     var result = await gameContractInstance.startBet(rollIntegerVariables, REFID, seed, uniqueString ).send({
            //         shouldPollResponse: false,
            //         feeLimit: 5000000,
            //         callValue: callValue,
            //         from: global.userAddress
            //     });
            // }else{
                var result = await gameContractInstance.finishBet_and_startBet(finishBet_gambler, finishBet_uniqueBetId, finishBet_userSeed, finishBet_blockNumber, finishBet_rollIntegerVariables, rollIntegerVariables, REFID, seed, uniqueString ).send({
                    shouldPollResponse: false,
                    feeLimit: 5000000,
                    callValue: callValue,
                    from: global.userAddress
                });   
            //}
             
            startBetTxid = result;
            console.log("startBetTxid="+startBetTxid);
            transaction_id = startBetTxid;
            betStartTimeStamp = Date.now();
        }
        catch(err)
        {
            console.log("tx failed");
            if (betToFinish !== null)
            {
                let finishBetData = JSON.parse(localStorage.getItem('previousFinishBet'));
                if (localStorage.hasOwnProperty("DebugLog"))
                {
                    console.log("Added back unfinished bet to local storage:");
                    console.log(betToFinish);
                }
                finishBetData.unshift(betToFinish);
                localStorage.setItem('previousFinishBet', JSON.stringify(finishBetData));
            }
            console.log(err);
            window.rolling = false;
            resetrollUI();
            //try { window.betStartedEventWatcher.stop(); } catch (e) {}
            return;
        }
       
                    var mainBetWin = 0;
                    var sideBetWin = 0;
                    var newWinningNumber = 0;
                    
                    //setting this variables for "unclaimed winners" section
                    $("#finishBetGambler").val(global.userAddress);
                    $("#finishBetUniqueID").val(uniqueString);
                    $("#finishBetUserSeed").val(seed);
                    //$("#finishBetBlockNumber").val(blockNumber);
                    //$("#finishBetParamsArray").val('['+start+','+end+','+betAmount+','+sidebetAmount+','+sidebetInt+']');
                    $("#finishBetParamsArray").val(rollIntegerVariables);
                    
                    const MAX_CALC_ATTEMPTS = 15;
                    let calcAttempts;
                    var calculateBetResult = null;
    });

    /* sidebet collapse 0 wager sidebet*/
    $('.accordion').click(function(){
        var status_collapse =$(this).hasClass( "active" ); 
        if(status_collapse==false){
            $('#odd').removeClass('bg-secondary');
            $('#odd').addClass('bg-primary');
            $('#even').removeClass('bg-secondary');
            $('#even').addClass('bg-primary');
            $('#yin').removeClass('bg-secondary');
            $('#yin').addClass('bg-primary');
            $('#yang').removeClass('bg-secondary');
            $('#yang').addClass('bg-primary');
            $('#zero').removeClass('bg-secondary');
            $('#zero').addClass('bg-primary');
            $('#sidebetAmount').val(0.00);
            $('#sidebetAmount').attr('disabled',true);
            $('#sidebet-payout').val(0);
            $('#sidebet-multiplier').val('');
            $('#sidebet-winChance').val('');
             localStorage.setItem("SIDEBETS", '');
        }
    });
    /* Updating the PAYOUT - initial call */
    
    $("#betAmt").focusout(function(){
      
      var betAmt,multiplier,payout,res;
      betAmt = $("#betAmt").val();
      multiplier = $("#hidden_multiplier").val();
      res = parseInt(betAmt) * multiplier;
      
      res = res.toString(); 
      /*if(res.indexOf(".")!=-1){
       res = res.slice(0, (res.indexOf("."))+3);
      }*/
      
      $("#payout").val(number_to_2decimals(res));
    });

   setTimeout(getleaderboard,3000);
setTimeout(getchat,3000);
//setInterval(getchat,10000);
setInterval(getleaderboard,60000);
   
   async function finishManyBetsIfExist()
   {
    if (localStorage.getItem('previousFinishBet') !== null &&
        localStorage.getItem('previousFinishBet') != "" &&
        JSON.parse(localStorage.getItem('previousFinishBet')).length !== 0)
    {
        var betArray = JSON.parse(localStorage.getItem('previousFinishBet'));
        if(betArray.length > 0){
            
               var betArrayLength = betArray.length;
               
                   var gamblers = [];
                   var uniqueBets = [];
                   var userseeds = [];
                   var blocks = [];
                   var rollsInt = [];
                    for(var t=0;t<betArrayLength;t++){
                        gamblers.push(betArray[t][0]);
                        uniqueBets.push(betArray[t][1]);
                        userseeds.push(betArray[t][2]);
                        blocks.push(betArray[t][3]);
                        rollsInt.push(betArray[t][4]);
                    }
                    
                  var finishRes = await ultimateDiceContractInstance.finishManyBets(gamblers,uniqueBets,userseeds,blocks,rollsInt,70000).send({
                       shouldPollResponse: false,
                       feeLimit: 1000000 * (2+gamblers.length),
                       callValue: 0,
                       from: global.userAddress
                    });
                    console.log(finishRes);
              // localStorage.removeItem('previousFinishBet');
               /*var autoRoll = $('#autoCallRoll').prop('checked');
                if(autoRoll==false){
                    setTimeout(updateBalance,2000);
                }*/

        }
    }
}


});

/* ************************************ */
//Function for getting the MULTIPLIER VALUES

function getMultiplierValue(start, end) {
    var differ = parseInt(end) - parseInt(start);
   
    if(differ==0){differ=1;}else if(differ==1){differ=2;}else{differ= differ+1};
    var winChance = parseInt(differ);
   
        $("#winChance").val(winChance + '%')
        $.each(multiplierJSON, function(key, value) {
                    if (differ == value.win_val) {
                        var multiplierAmount = value.value;
                       // multiplierAmount = multiplierAmount.toString(); 
                        //multiplierAmount = multiplierAmount.slice(0, (multiplierAmount.indexOf("."))+3);
                        $("#multiplier").val(multiplierAmount + ' x');
                        $("#hidden_multiplier").val(multiplierAmount);

                          var betAmt,multiplier,payout,fixedPayOut;
                          betAmt = $("#betAmt").val();
                          multiplier = $("#hidden_multiplier").val();
                          fixedPayOut = parseInt(betAmt) * multiplier;
                          fixedPayOut = fixedPayOut.toString(); 
                          /*if(fixedPayOut.indexOf(".")!=-1){
                            fixedPayOut = fixedPayOut.slice(0, (fixedPayOut.indexOf("."))+3);
                          }*/
                          
                          $("#payout").val(number_to_2decimals(fixedPayOut));

                        /*Checking the dividenet is greater than Payout*/
                        var dividentVal,payoutVal,res;
                        dividentVal = 500000;
                        res         = (parseInt( dividentVal ) * 1 ) / 100 ;

                        if( fixedPayOut > res ){ 
                            //document.getElementById("rollDice").disabled = true;
                            //return false;
                        }                        
                    }
        });
}

// get multiplier only 
function getMultiplier(start, end,callback) {
    var differ = parseInt(end) - parseInt(start);
    var _returnValue;
    if(differ==0){differ=1;}else if(differ==1){differ=2;}else{differ= differ+1};

        $.each(multiplierJSON, function(key, value) {
            if (differ == value.win_val) {
                _returnValue = value.value;
            }
        })
        return _returnValue;
}

function updateBetAmount(type){
    const MAX_BET_AMOUNT = 25000;
    const MIN_BET_AMOUNT = 10;
    //var isBet = $('#betClass-'+type).hasClass('selected');
   
   // if(isBet==true){return false;}
    var betAmt,userBalnce;
    betAmt = $("#betAmt").val();
    switch (type) {
        case 'dbl': 
            betAmt = parseInt(betAmt) * 2 ; 
            betAmt = betAmt > MAX_BET_AMOUNT ? MAX_BET_AMOUNT : betAmt;          
            break;
        case 'hlf':
            betAmt = Math.floor(parseInt(betAmt) / 2); 
            betAmt = betAmt < MIN_BET_AMOUNT ? MIN_BET_AMOUNT : betAmt;
            break;
        case 'max':
            userBalnce = $('#trxBalance').val();
            userBalnce = parseFloat(userBalnce);
            if(userBalnce<MAX_BET_AMOUNT){
                betAmt = parseInt(userBalnce-1);
            }else{
                betAmt =  MAX_BET_AMOUNT;     
            }
            break;
        default: //MINIMUM BET AMOUNT
            betAmt =  MIN_BET_AMOUNT;
    }
    $("#betAmt").val(betAmt);

      /*Updating Payout*/
      var betAmt,multiplier,payout,res;
      betAmt = $("#betAmt").val();
      multiplier = $("#hidden_multiplier").val();
      res = parseInt(betAmt) * multiplier;
      //res = res.toString(); 
     //if(res.indexOf(".")!=-1){
      // res = res.slice(0, (res.indexOf("."))+4);
      //}
      
      $("#payout").val(res.toFixed(2));
}

$( "#betAmt" ).keyup(function() {
    const MAX_BET_AMOUNT = 25000;
   
    var betAmt = $(this).val();
   if(isNaN(betAmt)){
        alertify.error('Input must be Numeric');
        $(this).val('');
        $("#payout").val(0);
   }else if(betAmt < 0){
        alertify.error('Wager amount must be Positive');
        $(this).val('');
        $("#payout").val('');
   }else{
     if(betAmt>MAX_BET_AMOUNT){
         alertify.error('Max Bet Amount is ' + MAX_BET_AMOUNT);
            var userBalnce = $('#trxBalance').val();
            userBalnce = parseFloat(userBalnce);
            if(userBalnce<MAX_BET_AMOUNT){
                betAmt = parseInt(userBalnce-1);
            }else{
                betAmt =  MAX_BET_AMOUNT;     
            }
         $(this).val(betAmt);
        // return false;
     }
    
     var multiplier = $("#hidden_multiplier").val();
     res = parseInt(betAmt) * multiplier;

     /*res = res.toString(); 
     if(res.indexOf(".")!=-1){
       res = res.slice(0, (res.indexOf("."))+3);
      }*/
     if(isNaN(res)) { 
         $("#payout").val(0);
    }else{
        $("#payout").val(number_to_2decimals(res));   
     }
     
   }
 
});

   $("#betAmt").blur(function(){
       const MIN_BET_AMOUNT = 50;
      var betAmt,multiplier,payout,res;
      betAmt = $("#betAmt").val();
      multiplier = $("#hidden_multiplier").val();
        if(betAmt<MIN_BET_AMOUNT){
          betAmt = MIN_BET_AMOUNT;
           $(this).val(betAmt);
      }
      res = parseInt(betAmt) * multiplier;
      res = res.toString();       
      $("#payout").val(number_to_2decimals(res));
    });
    
    $("#sidebetAmount").blur(function(){
      var MIN_SIDEBET_AMOUNT = 10;
      var betAmt,multiplier,payout,res;
      betAmt = $("#sidebetAmount").val();
      multiplier = $("#hidden_sidebetmultiplier").val();
      if(betAmt<MIN_SIDEBET_AMOUNT){
          betAmt = MIN_SIDEBET_AMOUNT;
           $(this).val(betAmt);
      }
      res = parseInt(betAmt) * multiplier;
      res = res.toString();       
      $("#sidebet-payout").val(number_to_2decimals(res));
    });

$( "#sidebetAmount" ).keyup(function() {
    var MAX_SIDEBET_AMOUNT = 25000;
    
  var sidebetAmount = $(this).val();
   if(isNaN(sidebetAmount)){
        alertify.error('Input must be Numeric');
        $(this).val('');
        $("#sidebet-payout").val(0);
   }else if(sidebetAmount < 0){
        alertify.error('Wager amount must be Positive');
        $(this).val('');
        $("#sidebet-payout").val('');
   }else{
     var multiplier = $("#hidden_sidebetmultiplier").val();
     sidebetAmount = parseInt(sidebetAmount);
     
    //  if(sidebetAmount<MIN_SIDEBET_AMOUNT){
    //      sidebetAmount = MIN_SIDEBET_AMOUNT;
    //         $(this).val(sidebetAmount);
    //  }
     if(sidebetAmount>MAX_SIDEBET_AMOUNT){
         sidebetAmount = MAX_SIDEBET_AMOUNT;
         $(this).val(sidebetAmount);
     }
     res = parseInt(sidebetAmount) * multiplier;
     res = res.toString(); 
     /*if(res.indexOf(".")!=-1){
       res = res.slice(0, (res.indexOf("."))+3);
      }*/
      
     if(isNaN(res)) { 
         $("#sidebet-payout").val(0);
         //$('#sidebet-jackpot').html(0);   
    }else{
        
        /*
        if(sidebetAmount==0 || sidebetAmount==''){
            $('#sidebet-jackpot').html(0);    
        }else if(sidebetAmount>250){
            $('#sidebet-jackpot').html(numberWithCommas(250000));    
        }else{
            $('#sidebet-jackpot').html(numberWithCommas(sidebetAmount*1000));    
        }
        */
        
        res = res.toString();
        $("#sidebet-payout").val(number_to_2decimals(res));   
     }
     
   }

 
});



