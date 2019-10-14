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

var classicDiceContractInstance;


document.cookie = "tronlinkLoginTracker=0";
var interval_id=0;
var betStartTimeStamp=0;
var transaction_id='';
var DB_startNumber=0;
var DB_direction=0;
var DB_betAmt=10;
var multiplierJSON = [{
            "win_val": "95",
            "value": "1.0368"
        },
        {
            "win_val": "94",
            "value": "1.0478"
        },
        {
            "win_val": "93",
            "value": "1.0591"
        },
        {
            "win_val": "92",
            "value": "1.0706"
        },
        {
            "win_val": "91",
            "value": "1.0824"
        },
        {
            "win_val": "90",
            "value": "1.0944"
        },
        {
            "win_val": "89",
            "value": "1.1067"
        },
        {
            "win_val": "88",
            "value": "1.1193"
        },
        {
            "win_val": "87",
            "value": "1.1321"
        },
        {
            "win_val": "86",
            "value": "1.1453"
        },
        {
            "win_val": "85",
            "value": "1.1588"
        },
        {
            "win_val": "84",
            "value": "1.1726"
        },
        {
            "win_val": "83",
            "value": "1.1867"
        },
        {
            "win_val": "82",
            "value": "1.2012"
        },
        {
            "win_val": "81",
            "value": "1.2160"
        },
        {
            "win_val": "80",
            "value": "1.2312"
        },
        {
            "win_val": "79",
            "value": "1.2468"
        },
        {
            "win_val": "78",
            "value": "1.2628"
        },
        {
            "win_val": "77",
            "value": "1.2792"
        },
        {
            "win_val": "76",
            "value": "1.2960"
        },
        {
            "win_val": "75",
            "value": "1.3133"
        },
        {
            "win_val": "74",
            "value": "1.3310"
        },
        {
            "win_val": "73",
            "value": "1.3493"
        },
        {
            "win_val": "72",
            "value": "1.3680"
        },
        {
            "win_val": "71",
            "value": "1.3873"
        },
        {
            "win_val": "70",
            "value": "1.4071"
        },
        {
            "win_val": "69",
            "value": "1.4275"
        },
        {
            "win_val": "68",
            "value": "1.4485"
        },
        {
            "win_val": "67",
            "value": "1.4701"
        },
        {
            "win_val": "66",
            "value": "1.4924"
        },
        {
            "win_val": "65",
            "value": "1.5153"
        },
        {
            "win_val": "64",
            "value": "1.5390"
        },
        {
            "win_val": "63",
            "value": "1.5634"
        },
        {
            "win_val": "62",
            "value": "1.5887"
        },
        {
            "win_val": "61",
            "value": "1.6147"
        },
        {
            "win_val": "60",
            "value": "1.6416"
        },
        {
            "win_val": "59",
            "value": "1.6694"
        },
        {
            "win_val": "58",
            "value": "1.6982"
        },
        {
            "win_val": "57",
            "value": "1.7280"
        },
        {
            "win_val": "56",
            "value": "1.7589"
        },
        {
            "win_val": "55",
            "value": "1.7909"
        },
        {
            "win_val": "54",
            "value": "1.8240"
        },
        {
            "win_val": "53",
            "value": "1.8584"
        },
        {
            "win_val": "52",
            "value": "1.8942"
        },
        {
            "win_val": "51",
            "value": "1.9313"
        },
        {
            "win_val": "50",
            "value": "1.9700"
        },
        {
            "win_val": "49",
            "value": "2.0102"
        },
        {
            "win_val": "48",
            "value": "2.0520"
        },
        {
            "win_val": "47",
            "value": "2.0957"
        },
        {
            "win_val": "46",
            "value": "2.1413"
        },
        {
            "win_val": "45",
            "value": "2.1888"
        },
        {
            "win_val": "44",
            "value": "2.2386"
        },
        {
            "win_val": "43",
            "value": "2.2906"
        },
        {
            "win_val": "42",
            "value": "2.3452"
        },
        {
            "win_val": "41",
            "value": "2.4024"
        },
        {
            "win_val": "40",
            "value": "2.4625"
        },
        {
            "win_val": "39",
            "value": "2.5256"
        },
        {
            "win_val": "38",
            "value": "2.5921"
        },
        {
            "win_val": "37",
            "value": "2.6621"
        },
        {
            "win_val": "36",
            "value": "2.7361"
        },
        {
            "win_val": "35",
            "value": "2.8142"
        },
        {
            "win_val": "34",
            "value": "2.8970"
        },
        {
            "win_val": "33",
            "value": "2.9848"
        },
        {
            "win_val": "32",
            "value": "3.0781"
        },
        {
            "win_val": "31",
            "value": "3.1774"
        },
        {
            "win_val": "30",
            "value": "3.2833"
        },
        {
            "win_val": "29",
            "value": "3.3965"
        },
        {
            "win_val": "28",
            "value": "3.5178"
        },
        {
            "win_val": "27",
            "value": "3.6481"
        },
        {
            "win_val": "26",
            "value": "3.7884"
        },
        {
            "win_val": "25",
            "value": "3.9400"
        },
        {
            "win_val": "24",
            "value": "4.1041"
        },
        {
            "win_val": "23",
            "value": "4.2826"
        },
        {
            "win_val": "22",
            "value": "4.4772"
        }, {
            "win_val": "21",
            "value": "4.6904"
        }, {
            "win_val": "20",
            "value": "4.9250"
        }, {
            "win_val": "19",
            "value": "5.1842"
        }, {
            "win_val": "18",
            "value": "5.4722"
        },
        {
            "win_val": "17",
            "value": "5.7941"
        }, {
            "win_val": "16",
            "value": "6.1562"
        },
        {
            "win_val": "15",
            "value": "6.5666"
        }, {
            "win_val": "14",
            "value": "7.0357"
        },
        {
            "win_val": "13",
            "value": "7.5769"
        }, {
            "win_val": "12",
            "value": "8.2083"
        }, {
            "win_val": "11",
            "value": "8.9545"
        }, {
            "win_val": "10",
            "value": "9.8500"
        }, {
            "win_val": "9",
            "value": "10.9444"
        }, {
            "win_val": "8",
            "value": "12.3125"
        }, {
            "win_val": "7",
            "value": "14.0714"
        },
        {
            "win_val": "6",
            "value": "16.4166"
        }, {
            "win_val": "5",
            "value": "19.7000"
        },
        {
            "win_val": "4",
            "value": "24.6250"
        },
        {
            "win_val": "3",
            "value": "32.8333"
        },
        {
            "win_val": "2",
            "value": "49.2500"
        }, {
            "win_val": "1",
            "value": "98.5000"
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
                url: API_URL+ "checkRoll-EventCD.php",
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
					             var newWinningNumber = 0;

					                let start;
					                if (data.data._rollIntegerVariables.length === 5 * 64) start = 2 * 64;
					                else if (data.data._rollIntegerVariables.length === 3 * 64) start = 0 * 64;
					                else throw "Should never happen";
					                
					                const betAmount = parseInt("0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64));
					                const startNumber = parseInt("0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64));
					                const direction = parseInt("0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64));
					                
					                const rollIntegerVariables2 = ["0x" + data.data._rollIntegerVariables.slice(start+0*64, start+1*64),
					                    "0x" + data.data._rollIntegerVariables.slice(start+1*64, start+2*64),
					                    "0x" + data.data._rollIntegerVariables.slice(start+2*64, start+3*64)];

					            const block = await tronWeb.trx.getBlock(data.data._blockNumber);

					            //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
				                var firstBetData = [global.userAddress, '0x'+data.data._uniqueBetId,'0x'+data.data._userSeed,data.data._blockNumber,[startNumber,direction,betAmount]];
				                if (localStorage.hasOwnProperty("DebugLog"))
				                {
				                    console.log("Adding unfinished bet to localstorage:");
				                    console.log(firstBetData);
				                }
				                let betArray = [];
				                if (localStorage.getItem('previousFinishBetCD') !== null &&
				                    localStorage.getItem('previousFinishBetCD') != "" &&
				                    JSON.parse(localStorage.getItem('previousFinishBetCD')).length !== 0)
				                {
				                    betArray = JSON.parse(localStorage.getItem('previousFinishBetCD'));
				                }
				                betArray.push(firstBetData);
				                
				                localStorage.setItem("previousFinishBetCD", JSON.stringify(betArray));
				                 const rollIntegerVariables = [startNumber,direction,betAmount];
				                //setting this variables for "unclaimed winners" section
				                $("#finishBetGambler").val(global.userAddress);
				                $("#finishBetUniqueID").val('0x'+data.data._uniqueBetId);
				                $("#finishBetUserSeed").val('0x'+data.data._userSeed);
				                $("#finishBetBlockNumber").val(data.data._blockNumber);
				                $("#finishBetParamsArray").val(rollIntegerVariables);


				                var calculateBetResult = await ultimateDiceContractInstance.calculateBetResultWithBlockHash(global.userAddress, '0x'+data.data._uniqueBetId, '0x'+data.data._userSeed, data.data._blockNumber, rollIntegerVariables2, "0x"+block.blockID).call();
            
					            //console.log(calculateBetResult);

				                mainBetWin = Object.values(calculateBetResult.mainBetWin);
				                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
				                            
				                newWinningNumber = Object.values(calculateBetResult.winningNumber);
				                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
				                
                                displayLuckyNumber(newWinningNumber,mainBetWin,betAmount);                
                               				                    
				                        var stopOnLoss =$('#stoponloss').prop('checked');
					                    var autoRoll=''; 
                                            $('.autoRoll').each(function(){
                                                var checked = $(this).hasClass('selected');
                                                if(checked){
                                                    autoRoll = $(this).data('auto');
                                                }

                                            });
                                            
                                        if(autoRoll=='on'){
					                        if(mainBetWin <= 0){
					                            setTimeout(function(){
					                                $("#rollDice").attr("disabled", false);
                                                    $("#rollBtn").attr("disabled", false);
					                                if(stopOnLoss==false){
					                                    $('#rollDice').click();
					                                }else{
					                                    resetBtnSlider();
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
                var postData = 'txid=' + transaction_id+'&startNumber='+DB_startNumber+'&direction='+DB_direction+'&bet='+DB_betAmt+'&user='+global.userAddressHex+'&timestamp='+betStartTimeStamp;
                
            if(transaction_id!=''){
                $.ajax({
                url:  API_URL+ "checkRollCD.php",
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
                            var direction = data.data.direction;
                            var betAmount = data.data.bet;
                            var rollResult = data.data.result;
                            var user_address = data.data.user;
                            let multiplier =  getMultiplier(startNumber,direction);
                            payout = multiplier*betAmount;
                            payout = payout.toFixed(2);
                            var mainBetWin =payout;
                            var newWinningNumber =  data.data.winningNumber;
                            console.log('Step 3 checking');
                            displayLuckyNumber(newWinningNumber,mainBetWin,betAmount);                
                            
                            betStartTimeStamp=0;
                            var autoRoll=''; 
                            $('.autoRoll').each(function(){
                                var checked = $(this).hasClass('selected');
                                if(checked){
                                    autoRoll = $(this).data('auto');
                                }

                            });
                             var stopOnLoss = $('#stoponloss').prop('checked');
                            if(autoRoll=='on'){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                if(stopOnLoss==false){
                                    $('#rollDice').click();
                                }else{
                                    resetBtnSlider();
                                    
                                }
                            }else{
                                //finishManyBetsIfExist();
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
                            var stopOnLoss = $('#stoponloss').prop('checked');
                            if(autoRoll=='on'){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                                 if(stopOnLoss==false){
                                    $('#rollDice').click();
                                }else{
                                    resetBtnSlider();
                                
                                }
                            }else{
                                //finishManyBetsIfExist();
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
                var stopOnLoss = $('#stoponloss').prop('checked');
                if(autoRoll=='on'){
                    $("#rollDice").attr("disabled", false);
                    $("#rollBtn").attr("disabled", false);
                     if(stopOnLoss==false){
                        $('#rollDice').click();
                     }else{
                         resetBtnSlider();
                     }
                }else{
                    setTimeout(function(){
                       resetBtnSlider();
                     },2000); 
                }
               
            }
        }
    }

    function displayLuckyNumber(newWinningNumber,mainBetWin,betAmount){
         console.log("Winning number: "+newWinningNumber);
         if (newWinningNumber < 10) { newWinningNumber = '0' + newWinningNumber; }
         if(mainBetWin <= 0){
             //lose
              let rollWinAmt = '-'+ betAmount;
                $('#odometer').removeClass('green-sucs');
                $('#odometer').addClass('red-alert');
                $('#odometer-tei').removeClass('green-sucs');
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

                if(localStorage.getItem("CDSOUND")=="on"){
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
                            $("#bounce_num").css({"color": "#ff006c","top": "-40px","background" : "transparent" });
                            $("#bounce_num").text(rollWinAmt +' TRX');
                            //$("#bounce_num").show();
                            $("#bounce_num").animate({top: '0px',opacity: '0'}, 3000);
                        },2000);
                   
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
                $('#odometer').addClass('green-sucs');
                $('#odometer').removeClass('red-alert');
                $('#odometer-tei').addClass('green-sucs');
                $('#odometer-tei').removeClass('red-alert');
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
                if(localStorage.getItem("CDSOUND")=="on"){
                    try
                    {
                      const audio = new Audio('audio/win.mp3');
                        setTimeout(function(){
                            audio.play();
                        },2000);
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
     var socket = io.connect( 'https://nodejs.trontopia.co:8081' );
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
             var newWinningNumber = 0;
                console.log('Step 1 checking');
                let start;
                if (data.result._rollIntegerVariables.length === 5 * 64) start = 2 * 64;
                else if (data.result._rollIntegerVariables.length === 3 * 64) start = 0 * 64;
                else throw "Should never happen";
                const betAmount = parseInt("0x" + data.result._rollIntegerVariables.slice(start+2*64, start+3*64));
                const startNumber = parseInt("0x" + data.result._rollIntegerVariables.slice(start+0*64, start+1*64));
                const direction = parseInt("0x" + data.result._rollIntegerVariables.slice(start+1*64, start+2*64));
                    
        
                const rollIntegerVariables2 = ["0x" + data.result._rollIntegerVariables.slice(start+0*64, start+1*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+1*64, start+2*64),
                    "0x" + data.result._rollIntegerVariables.slice(start+2*64, start+3*64)];
    
            const block = await tronWeb.trx.getBlock(data.result._blockNumber);


            //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
                var firstBetData = [global.userAddress, '0x'+data.result._uniqueBetId,'0x'+data.result._userSeed,data.result._blockNumber,[startNumber,direction,betAmount]];
                if (localStorage.hasOwnProperty("DebugLog"))
                {
                    console.log("Adding unfinished bet to localstorage:");
                    console.log(firstBetData);
                }
                let betArray = [];
                if (localStorage.getItem('previousFinishBetCD') !== null &&
                    localStorage.getItem('previousFinishBetCD') != "" &&
                    JSON.parse(localStorage.getItem('previousFinishBetCD')).length !== 0)
                {
                    betArray = JSON.parse(localStorage.getItem('previousFinishBetCD'));
                }
                betArray.push(firstBetData);
                
                localStorage.setItem("previousFinishBetCD", JSON.stringify(betArray));
                 const rollIntegerVariables = [startNumber,direction,betAmount];
                //setting this variables for "unclaimed winners" section
                $("#finishBetGambler").val(global.userAddress);
                $("#finishBetUniqueID").val('0x'+data.result._uniqueBetId);
                $("#finishBetUserSeed").val('0x'+data.result._userSeed);
                $("#finishBetBlockNumber").val(data.result._blockNumber);
                $("#finishBetParamsArray").val(rollIntegerVariables);
                


            var calculateBetResult = await ultimateDiceContractInstance.calculateBetResultWithBlockHash(global.userAddress, '0x'+data.result._uniqueBetId, '0x'+data.result._userSeed, data.result._blockNumber, rollIntegerVariables2, "0x"+block.blockID).call();
            
            //console.log(calculateBetResult);

                mainBetWin = Object.values(calculateBetResult.mainBetWin);
                mainBetWin = window.tronWeb.toDecimal(mainBetWin[0]);
                            
                newWinningNumber = Object.values(calculateBetResult.winningNumber);
                newWinningNumber = window.tronWeb.toDecimal(newWinningNumber[0]);
                
                displayLuckyNumber(newWinningNumber,mainBetWin,betAmount);                

                    
                    betStartTimeStamp=0;
                    var autoRoll=''; 
                    $('.autoRoll').each(function(){
                        var checked = $(this).hasClass('selected');
                        if(checked){
                            autoRoll = $(this).data('auto');
                        }

                    });
                     var stopOnLoss = $('#stoponloss').prop('checked');
                    
                    if(autoRoll=='on'){
                        if(mainBetWin <= 0){
                            setTimeout(function(){
                                $("#rollDice").attr("disabled", false);
                                $("#rollBtn").attr("disabled", false);
                               if(stopOnLoss==false){
                                    $('#rollDice').click();
                                 }else{
                                     resetBtnSlider();
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
            var prediction='';
            if(endNumber==1){
                    prediction = 'Over '+ startNumber;
                }
            if(endNumber==0){
                prediction = 'Under '+ startNumber;
            }
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
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
            var prediction='';
            if(endNumber==1){
                    prediction = 'Over '+ startNumber;
                }
            if(endNumber==0){
                prediction = 'Under '+ startNumber;
            }
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
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
            var prediction='';
            if(endNumber==1){
                    prediction = 'Over '+ startNumber;
                }
            if(endNumber==0){
                prediction = 'Under '+ startNumber;
            }
            var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+userID+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+betAmount+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
            if($('#bet4 li').length==1){
                $("#bet4 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet4 li:eq(1)").before(allBetDataNew);
            }
            $('#bet4 li:eq(49)').remove();
        }
    });
    
    
    // socket.on('new message', function(data){
    //     var message = data.message;
    //     var hidemsg = false;
    //     var ban = message.includes("/ban");
    //     var muted = message.includes("/mute");
    //     if(ban==true){  
    //         hidemsg = true;
    //     }
    //     if(muted==true){ 
    //         hidemsg = true;
    //     }
    //     if(hidemsg==false){              
        
    //         var clst='reci';
    //         if(data.sender==global.userAddress){
    //           clst = 'snd';
    //         }else{
    //           clst = 'reci';
    //         } 
    //         var uImage = data.image;
    //         //var str = '<li id="divsndID" class="'+clst+'"><div>'+uImage+'<strong>'+data.username+'</strong>'+data.message+'</div> <div> <span class="chat-time">'+ data.time + '</span> </div></li>';
    //         var str = '<li id="divsndID" class="'+clst+'"><div class="chet-box"><div class="chet-img">' + uImage + '</div><div class="chet-info"><h4>' + data.username + '</h4><p>' + strip_tags(data.message) + '</p></div></div></li>';
    //         $('#chatDiv').append(str);
    //         $('#tab1').scrollTop($('#chatDiv').height());   
    //     }
    // });

    $("#login_or_not").hide();
    $("#trx").show();
    $("#rollBtn").hide();
    $("#lucky_no").html('00');
    $("#myBetVals").html('Loading..');
    $("#myTotalWon").html('Loading..');
    var soundBtn = localStorage.getItem("CDSOUND");
    
    if(soundBtn=='off'){
        $("#sound-icon").removeClass('fa-volume-up');    
    }else if(soundBtn=='on'){
        $("#sound-icon").addClass('fa-volume-up');    
    }else{
        localStorage.setItem("CDSOUND", 'on');
        $("#sound-icon").addClass('fa-volume-up');    
    }
    
    /*Check updateBetAmount() ALSo */
    const MAX_BET_AMOUNT = 50000;
    const MIN_BET_AMOUNT = 10;
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
                global.loggedIn = true;
                document.cookie = "_sidr="+global.userAddress;
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
             //set referral link url 
             $('#refLink').attr('href',global.userAddress);
             //$('#referalURL').html(userAddress)
             $('#refLink').attr('href','https://trontopia.co/index.php?refid='+global.userAddress);
             $('#refLink').val('https://trontopia.co/index.php?refid='+global.userAddress);
                       
        }else{
             $("#loggedIn").hide();
             isLogin     = 'Login';
             $("#zerox").show();
             $("#isnotLogin").html(isLogin);
             $("#login_or_not").show();
        }

    }

    //$('#closeNotSignIn').click(function(){$("#notSignIn").hide();});
    
    $('#btnRefreshTRX').click(function(){updateBalance();});
    $('#sound-icon').click(function(){
       var soundStats = $(this).hasClass('fa-volume-up');
       
        if(soundStats==true){
            $(this).removeClass('fa-volume-up');    
            localStorage.setItem("CDSOUND", 'off');
        }else if(soundStats==false){
            $(this).addClass('fa-volume-up');    
            localStorage.setItem("CDSOUND", 'on');
        }
    });
    
    $('#showAllTokens').click(async function(){
        var tokens = $('#myAvailableToken3').val();
        $('#tokenToFreeze').val(tokens);
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
                 //alertify.success('Bet Finished.');
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

 

    $('#btnRollUnder').on('click', function(ty){ 
        $('#btnRollUnder').addClass('selected');
        $('#btnRollOver').removeClass('selected');

        $(".noUi-connects").removeClass('slider-red'); 
        $(".noUi-connect").removeClass('slider-blue'); 

        $(".noUi-connects").addClass('slider-blue'); 
        $(".noUi-connect").addClass('slider-red'); 

        var pipsSlider = document.getElementById('slider-pips');
        var sliderVal = pipsSlider.noUiSlider.get();
        sliderVal = parseInt(sliderVal);

        if(sliderVal>95){
            $( "#startVal" ).val(95);
            pipsSlider.noUiSlider.set(95);
            getMultiplierValue(95,0);
        }else if(sliderVal<=4){
             getMultiplierValue(sliderVal,0);
        }else{
             getMultiplierValue(sliderVal,0);
        }
    });

    $('#btnRollOver').on('click', function(ty){ 
        $('#btnRollUnder').removeClass('selected');
        $('#btnRollOver').addClass('selected');

        $(".noUi-connects").removeClass('slider-blue'); 
        $(".noUi-connect").removeClass('slider-red'); 

        $(".noUi-connects").addClass('slider-red'); 
        $(".noUi-connect").addClass('slider-blue');

        var pipsSlider = document.getElementById('slider-pips');
        var sliderVal = pipsSlider.noUiSlider.get();
        sliderVal = parseInt(sliderVal);

        if(sliderVal<=4){
            $( "#startVal" ).val(4);
            pipsSlider.noUiSlider.set(4);
            getMultiplierValue(4,1);
        }else{
             getMultiplierValue(sliderVal,1);
        }              
    });

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
        localStorage.removeItem('previousFinishBetCD');
        var ultimateDiceContractInfo = await tronWeb.trx.getContract(classicDiceContractAddress);
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
        if(global.loggedIn==true){
            setTimeout(updateInterface,3000);
            app();
        }     


         setTimeout(displayboards,2000);
         //getluckyTimer();
        // getLukcyLeaders();
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
                var autoRoll = $('#autoCallRoll').prop('checked');
                if(autoRoll==true){
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
    async function trxTopiaFunc(){
        var voucherMintRate = await voucherContractInstance.mintingBasePrice(classicDiceContractAddress).call();
        voucherMintRate = Object.values(voucherMintRate);
        voucherMintRate = window.tronWeb.toDecimal(voucherMintRate[0]);
        $('#trxToPlay').html(voucherMintRate);
    }
    async function updateInterface(){
            var myTotalToken = 0;
            var tokentoMint = 1000000;
            var myTotalVouchers = 0;
            var vouchersToMint = 1000000;
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
            trxTopiaFunc(); 
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
    setInterval(showData,60000);
   
    let allbetsData_running = false;
    function allbetsData(){
        if (allbetsData_running) return;
        allbetsData_running = true;
        try
        {
            $.get(API_URL + "allbetsCD.php", function(data, status,xhr){
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
                            var prediction='';
                             if(obj.endNumber==1){
                                prediction = 'Over '+ obj.startNumber;
                            }
                            if(obj.endNumber==0){
                                prediction = 'Under '+ obj.startNumber;
                            }
                            allBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
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
            $.get(API_URL + "mybetsCD.php?user="+userAddress, function(data, status,xhr){
                //data = JSON.parse(data);
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                    
                        
                        //$('#tab_1').empty();
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var myBetTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>  <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th">  <p>Prediction</p>     </div>  </div>   <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">      <p>Payout</p>        </div>     </div>   </div>   </li>';
                        $.each(resultking, function(key, obj) {
                                var result = obj.result;
                                if(result=="true"){
                                    rowBoarderColorClass = "safe";
                                    let multiplier =  getMultiplier(obj.startNumber,obj.direction);
                                    var payout = multiplier*obj.bet;
                                    payout = payout.toFixed(2);
                                    //payout = payout.toString(); 
                                    //payout = payout.slice(0, (payout.indexOf("."))+3);
                                    payout += " <span>TRX</span>";
                                    
                                }else{
                                     rowBoarderColorClass = "redalt";
                                     payout = '-';
                                }
                                var prediction='';
                                if(obj.direction==1){
                                prediction = 'Over '+ obj.startNumber;
                                }
                                if(obj.direction==0){
                                    prediction = 'Under '+ obj.startNumber;
                                }
                                let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                                
                                myBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
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
$('#dividendPopup2').click(function(){
    showData();
    $('#tokenToFreeze').val('');
});

   let highRollersData_running = false;
    function highRollersData(){
        if (highRollersData_running) return;
        highRollersData_running = true;
        
        try
        {
            $.get(API_URL + "highrollersCD.php", function(data, status,xhr){
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
                                    let multiplier =  getMultiplier(obj.startNumber,obj.direction);
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
                                var prediction='';
                                if(obj.direction==1){
                                    prediction = 'Over '+ obj.startNumber;
                                }
                                if(obj.direction==0){
                                    prediction = 'Under '+ obj.startNumber;
                                }
                                /* 1st position:  "dividend * 0.5 /100 * 50 /100"  and so on. */
                                
                                highRollersTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                                
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
            $.get(API_URL + "rarewinsCD.php", function(data, status,xhr){
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
                                    let multiplier =  getMultiplier(obj.startNumber,obj.direction);
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
                                var prediction='';
                                if(obj.direction==1){
                                prediction = 'Over '+ obj.startNumber;
                                }
                                if(obj.direction==0){
                                    prediction = 'Under '+ obj.startNumber;
                                }
                                rareWinsTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+prediction+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.winningNumber+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+obj.bet+' <span>TRX</span></p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+payout+' </p></div></div></div></li>';
                                
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
   
    // shares buttons
 $('#withdrawSharesEverythingBtn').click(async function(){
     var result = shareDividendContractInstance.withdrawDividendsEverything().send({
        shouldPollResponse: true,
        //feeLimit: 1000000000,
        feeLimit: 5000000,
        callValue: 0,
        from: global.userAddress
     })
   // if(result==true){
        //alertify.success('Withdrawal successfull.');
       $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
            updateSharesData();
            shareProgressBar();             
        },3000);
    //}else{
    //    alertify.error('Something went wrong, please try again');
    //}   
 });
 
 $('#unfreezeShareBtn').click(async function(){
     var result =  shareContractInstance.unfreezeShares().send({
        shouldPollResponse: true,
        //feeLimit: 1000000000,
        feeLimit: 5000000,
        callValue: 0,
        from: global.userAddress
     })
   //if(result==true){
        //alertify.success('UnFrozen Shares.');
        $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
            updateSharesData();
            shareProgressBar();
        },3000);
    //}else{
     //   alertify.error('Something went wrong, please try again');
    //}   
 });
    //withdraw voucher dividend trx 
    $('#withdrawVoucherTrxBtn').click(async function(){
        var vouchersDiv = $('#myAvailableVoucherDividend').val();
        if(vouchersDiv > 0){
            var result = voucherContractInstance.withdrawDividend().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
           // if(result.result==true){
               // alertify.success('Dividend Withdrawal Successful');
                $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                    updateVouchersData();
                },3000);
            }
       // }
      //  else{
         //   alertify.error("Insufficient Dividend Available");
       // }
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
        $('body').addClass('modal-open'); 
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
            var result = tokenContractInstance.freezeTopia(tokens).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
           // if(result==true){
                //alertify.success('Tokens Frozen.');
                $('#dividend').modal('hide');
                $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                    showData();
                },3000);
            //}else{
            //    alertify.error('Something went wrong, please try again');
           // }
        }else{
            $('body').addClass('modal-open'); 
        }
    })
    //unfreeze token
    $('#unfreezeTopia').click(async function(){
        var token = $('#myFreezeToken').val();
        token = parseInt(token * 100000000);
        if(token>0){
            alertify.confirm('This will unfreeze all of your TOPIA. This process takes 24 hours for you to be able to withdraw your tokens to your wallet. You will miss the next dividend distribution, your tier status will reset to Bronze, and you will have to start over.').setHeader('<b>Are you sure?</b>').set('onok', async function(closeEvent){
        
                var result = tokenContractInstance.unfreezeTopia().send({
                    shouldPollResponse: true,                
                    feeLimit: 5000000,
                    callValue: 0,
                    from: global.userAddress
                });
                //if(result==true){
                   // alertify.success('Token Unfreeze Process Started');                
                    $('#dividend').modal('hide');
                    setTimeout(function(){
                        $('#dividend').modal('show');
                        showData();
                    },3000);
               // }else{
                //    alertify.error('Something went wrong, please try again.');
               // }            
            }).set('labels', {ok:'Unfreeze', cancel:'Cancel'});
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
            var result = tokenContractInstance.withdrawUnfrozenTopia().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
            //if(result.result==true){
                //alertify.success('Topia Withdrawal Successful');
                 $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                    showData();
                },3000);
           // }
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
                        var withdrawTopia = tokenContractInstance.withdrawUnfrozenTopia().send({
                            shouldPollResponse: true,
                            feeLimit: 5000000,
                            callValue: 0,
                            from: global.userAddress
                        });
                        //if(result.result==true){
                            //alertify.success('Topia withdrawn successfully. Now withdrawing Dividend.');
                            //now we are withdrawing dividend calling dividend contract
                            var withdrawDividend = divContractInstance.withdrawDividendDivRake().send({
                                shouldPollResponse: true,
                                feeLimit: 5000000,
                                callValue: 0,
                                from: global.userAddress
                            });
                            
                           // if(withdrawDividend.result==true){
                                //alertify.success('Dividend withdrawn successfully');
                                $('#dividend').modal('hide');
                                setTimeout(function(){
                                    $('#dividend').modal('show');
                                    showData();
                                },3000);
                            //}
                       // }
                    }
                );
            }
            
            //there is no topia available to withdraw. So, we will just withdraw dividends directly
            else{
                var withdrawDividend = divContractInstance.withdrawDividendDivRake().send({
                    shouldPollResponse: true,
                    feeLimit: 5000000,
                    callValue: 0,
                    from: global.userAddress
                });
                
               // if(withdrawDividend.result==true){
                   // alertify.success('Dividend withdrawn successfully');
                    $('#dividend').modal('hide');
                    setTimeout(function(){
                        $('#dividend').modal('show');
                        showData();
                    },3000);             
               // }
            }
    
        }
        
        //if user does not dividend available to withdraw, then just show error message
        else{
            alertify.error("Insufficient Dividend Available ");
        }
        
    });

    //upgrade button click 
    $('#upgrade').click(async function(){
            var result = tokenContractInstance.upgradeTopia().send({
                shouldPollResponse: true,
                feeLimit: 10000000,
                callValue: 0,
                from: global.userAddress
             })
           // if(result.result==true){
                //alertify.success('User Account Upgraded');
                 $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                    showData();
                },3000);           
           // }
        
    });

    $("#rollPopClose").click(function(){
        $("#roll_status").hide();
        $("#poip-fri").hide();
    })


    //withdraw referral bonus button 
    $('#withdrawReferralBonus').click(async function(){
        
        var result = referralContractInstance.claimReferrerBonus().send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             }).then(function(error,result){
                if(!error){

                }else{
                    console.log(error);
                }
            })
             //if(result.result==true){
                 //alertify.success('Referral Bonus Withdrawn');
                $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                    showData();
                },3000);
            // }else{
             //    alertify.error('Nothing to Withdraw');
            // }
    })
    //setInterval(updateBalance,5000);
  
function resetrollUI(){
     $("#rollBtn").hide();
     $("#rollDice").show();
     $("#rollDice").attr("disabled", false);
     $("#rollBtn").attr("disabled", false);
     var pipsSlider = document.getElementById('slider-pips');
     pipsSlider.removeAttribute('disabled');
}
function resetBtnSlider(){
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
        var contractInfo = await tronWeb.trx.getContract(classicDiceContractAddress);
        var gameContractInstance = tronWeb.contract(contractInfo.abi.entrys, classicDiceContractAddress);
        
        //clear style for bounce num 
        setTimeout(function(){
            $('#bounce_num').html("");
            $('#bounce_num2').html("");  
            $('#bounce_num').removeAttr("style");
            $('#bounce_num2').removeAttr("style");
        },3000);
        
        
        var start, rollDirection, betAmt,betAmount, seed,newSeedVal,finalSeed,payout_to_win;
        
        start       = $("#startVal").val();
         if ($("#btnRollOver").hasClass("selected")) {
          rollDirection = 1;
        }
        if ($("#btnRollUnder").hasClass("selected")) {
          rollDirection = 0;
        }
       

        betAmount      = $("#betAmt").val();
        betAmt = parseInt(betAmount);
        DB_startNumber = start;
        DB_direction = rollDirection;
        DB_betAmt = betAmt;
        
        
        
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
        
        const rollIntegerVariables = [start,rollDirection,betAmount];
       // console.log(rollIntegerVariables);
        let betToFinish = null;
        
        let betDataReceivedFunc = null;
        
        //checking variables for previous finish bet
        if (localStorage.getItem('previousFinishBetCD') !== null && localStorage.getItem('previousFinishBetCD') != "" && JSON.parse(localStorage.getItem('previousFinishBetCD')).length >= 1){
        
            let finishBetData = JSON.parse(localStorage.getItem('previousFinishBetCD'));
            
            betToFinish = finishBetData.shift();
	        //console.log(finishBetData);
            
            var finishBet_gambler = betToFinish[0];
            var finishBet_uniqueBetId = betToFinish[1];
            var finishBet_userSeed = betToFinish[2];
            var finishBet_blockNumber = betToFinish[3];
            var finishBet_rollIntegerVariables = betToFinish[4];
            
            localStorage.setItem('previousFinishBetCD', JSON.stringify(finishBetData));
        }
        else
        {
            var finishBet_gambler = "0x0000000000000000000000000000000000000000";
            var finishBet_uniqueBetId = tronWeb.sha3("0", true);
            var finishBet_userSeed = tronWeb.sha3("0", true);
            //var finishBet_uniqueBetId = "0x0";
            //var finishBet_userSeed = "0x0";
            var finishBet_blockNumber = 0;
            var finishBet_rollIntegerVariables = [0,0,0];
        }
       
      /* console.log('finisheBet Gambler : '+ finishBet_gambler);
       console.log('finishBet UniqueBetid : ' + finishBet_uniqueBetId);
       console.log('finishBet User seed :' + finishBet_userSeed);
       console.log('finishBet blocknumber : ' + finishBet_blockNumber);
       console.log('finsihbet rollint vars : '+ finishBet_rollIntegerVariables);
       console.log('roll int vars : '+ rollIntegerVariables);
       console.log('refid'+ REFID);
       console.log('seed : '+ seed);
       console.log('unique string : '+ uniqueString);*/
  	    try
  	    {
            console.log('finishbet unique id : ' +finishBet_uniqueBetId);
            // if(localStorage.getItem('previousFinishBetCD') == null || localStorage.getItem('previousFinishBetCD') == "" || JSON.parse(localStorage.getItem('previousFinishBetCD')).length == 0){
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
      	        let finishBetData = JSON.parse(localStorage.getItem('previousFinishBetCD'));
                if (localStorage.hasOwnProperty("DebugLog"))
                {
                    console.log("Added back unfinished bet to local storage:");
                    console.log(betToFinish);
                }
                finishBetData.unshift(betToFinish);
      	        localStorage.setItem('previousFinishBetCD', JSON.stringify(finishBetData));
  	        }
  		    console.log(err);
  		    window.rolling = false;
            resetrollUI();
            //try { window.betStartedEventWatcher.stop(); } catch (e) {}
  		    return;
	    }
	   
                    var mainBetWin = 0;
                    var newWinningNumber = 0;
        	        
        	        //setting this variables for "unclaimed winners" section
        	        $("#finishBetGambler").val(global.userAddress);
        	        $("#finishBetUniqueID").val(uniqueString);
        	        $("#finishBetUserSeed").val(seed);
        	        $("#finishBetParamsArray").val(rollIntegerVariables);
        	        
        	        const MAX_CALC_ATTEMPTS = 15;
        	        let calcAttempts;
        	        var calculateBetResult = null;
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
    if (localStorage.getItem('previousFinishBetCD') !== null &&
        localStorage.getItem('previousFinishBetCD') != "" &&
        JSON.parse(localStorage.getItem('previousFinishBetCD')).length !== 0)
    {
        var betArray = JSON.parse(localStorage.getItem('previousFinishBetCD'));
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
              // localStorage.removeItem('previousFinishBetCD');
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

function getMultiplierValue(start,direction) {
    var differ = parseInt(start);
    if(differ==0){differ=1;}else if(differ==1){differ=2;}else{differ= differ+1};
    var winChance = parseInt(differ);
    
    if(direction==1){
        winChance = 99-start;
        differ = 99-start;
        if(winChance==0){winChance=1;}
        //var winChance = parseInt(winChance);
    }
    if(direction==0){
        winChance = start;
        differ =start;
        var winChance = parseInt(differ);
    }

        $("#winChance").val(winChance + '%')
        $.each(multiplierJSON, function(key, value) {
                    if (differ == value.win_val) {
                        var multiplierAmount = value.value;
                        $("#multiplier").val(multiplierAmount + ' x');
                        $("#hidden_multiplier").val(multiplierAmount);
                          var betAmt,multiplier,payout,fixedPayOut;
                          betAmt = $("#betAmt").val();
                          multiplier = $("#hidden_multiplier").val();
                          fixedPayOut = parseInt(betAmt) * multiplier;
                          fixedPayOut = fixedPayOut.toString(); 
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
function getMultiplier(start,direction) {

    var differ = parseInt(start);
    var _returnValue;
    if(differ==0){differ=1;}else if(differ==1){differ=2;}else{differ= differ+1};
    if(direction==1){
        differ = 99-start;
    }
    if(direction==0){
        differ =start;
    }
        $.each(multiplierJSON, function(key, value) {
            if (differ == value.win_val) {
                _returnValue = value.value;
            }
        })
        return _returnValue;
}


function updateBetAmount(type){
    const MAX_BET_AMOUNT = 50000;
    const MIN_BET_AMOUNT = 10;
    //var isBet = $('#betClass-'+type).hasClass('selected');
   
    //if(isBet==true){return false;}
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
 $("#betAmt").blur(function(){
       const MIN_BET_AMOUNT = 10;
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

$( "#betAmt" ).keyup(function() {
    const MAX_BET_AMOUNT = 50000;
    const MIN_BET_AMOUNT = 10;
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
    //  if(betAmt<MIN_BET_AMOUNT){
    //       betAmt = MIN_BET_AMOUNT;
    //       $(this).val(betAmt);
    //  }
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

