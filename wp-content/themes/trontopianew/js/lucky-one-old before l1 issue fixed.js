var global = {
     internetConnection : "true",
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

var luckyOneContractInstance;
var ultimateDiceContractInstance;

/*
1x One = 0.5x
2x One = 3x
3x One = 10x
4x One = 50x
5x One = 100x
6x One = 250x
7x One = 500x

Same jackpots:
11 or 1+pair pays 0.03%
111 or 1+trips pays 0.3%
1111 or 1+quads pays 3%
11111 pays 30%
of the jackpot balance
*/
document.cookie = "tronlinkLoginTracker=0";
var betStartTimeStamp=0;
var transaction_id='';
var DB_betAmt=5;
var interval_id=0;
var maxBet = 0;
var minBet = 0;
const amountOfOnes_to_multiplier = [0.5,3,10,50,100,250,500];
var nEqualDigits_to_jackpotPayoutPerMillion = [0.03,0.3,3,30];
var currentJackpotSize = 0;
var fullJackpotPayoutPercentage = 0;


$(document).ready(async function() {
	//checking if betStarted Event failed
    async function checkBetStartedFailed(){
    	 if(betStartTimeStamp!=0){
            var millis = Date.now() - betStartTimeStamp;
            var sec = Math.floor(millis/1000);
            console.log("seconds elapsed = " + sec );
            if(sec>10){
                 if(sec>20){
                    checkBetResultHashFailed(); 
                    return false;
                  }
                console.log('Checking BetStarted from DB => txid = ' + transaction_id);   
                var postData = 'txid=' + transaction_id;
              
            if(transaction_id!=''){
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
                    		var test = user.substring(0,2);
                    		var user1 = user;
                            if(test=='0x'){
                            	user1 = '41'+user1.slice(2);
                            }
                            console.log('Step 2 checking');
                            console.log(' from betStarted DB : user rolled = '+user);
					        
					        var _uniqueBetId 	= '0x'+data.data._uniqueBetId;
					        var _userSeed 		= '0x'+data.data._userSeed;

					        if(user1==global.userAddressHex && global.uniqueBetId==_uniqueBetId){
					           		var jackpotPayout = 0;
					            	var normalPayout = 0;
					            	var profit =0;
					             	var randomNumber = 0;
					                const betAmount = parseInt(data.data._betTRX);
					             	var blocknumber = data.data._blockNumber;
					        
					            	const block = await tronWeb.trx.getBlock(data.data._blockNumber);
					            	 //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
					                var firstBetData = [global.userAddress, _uniqueBetId,_userSeed,blocknumber,betAmount];
					                
					                let betArray = [];
					                if (localStorage.getItem('previousFinishBetLO') !== null &&
					                    localStorage.getItem('previousFinishBetLO') != "" &&
					                    JSON.parse(localStorage.getItem('previousFinishBetLO')).length !== 0)
					                {
					                    betArray = JSON.parse(localStorage.getItem('previousFinishBetLO'));

					                }
					                betArray.push(firstBetData);
					                
                                    betStartTimeStamp=0;
                                    transaction_id='';
					                localStorage.setItem("previousFinishBetLO", JSON.stringify(betArray));
					                //console.log('blocknumber ' + blocknumber);
					                //console.log('user ' + global.userAddress);
									//console.log('block hash ' + "0x"+block.blockID);
									//console.log('bet ' +		betAmount);
									//console.log('unique bet id ' + _uniqueBetId);
									//console.log('user seed ' + _userSeed);
					                //const result = await luckyOneContractInstance.calculateBetResultWithBlockHash(
                                    const result = await luckyOneContractInstance.calculateBetResult(
											blocknumber,
											global.userAddress,
											betAmount,
											_uniqueBetId,
											_userSeed
										).call();
                                   	
										const totalPayout = (parseInt(result._normalPayout) + parseInt(result._jackpotPayout)) / 1000000;

										try
										{
											receivedUserWin(
												parseInt(result._randomNumber.toString()),
												parseInt(result._amountOfOnes.toString()),
												totalPayout,
												betAmount
											);
                                            setTimeout(function(){
                                                doAutoRoll();
                                                updateBalance();
                                            },5000);
										}
										catch (ee)
										{
											console.error(ee);
											doAutoRoll();
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

    function checkBetResultHashFailed(){
    	if(betStartTimeStamp!=0){
            var millis = Date.now() - betStartTimeStamp;
            var sec = Math.floor(millis/1000);
            console.log("seconds elapsed = " + sec );
            //console.log('bet started txid = ' + transaction_id);
            if(sec>22){
                
                console.log('checking db for roll result : txid = ' + transaction_id);   
                var postData = 'txid=' + transaction_id+'&bet='+DB_betAmt+'&user='+global.userAddressHex+'&timestamp='+betStartTimeStamp;
                betStartTimeStamp=0;
            if(transaction_id!=''){
                $.ajax({
                url: API_URL + "luckyone-betfinished.php",
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
                    	var jackpotPayout = data.data.jackpotPayout;
		            	var normalPayout = data.data.normalPayout;
		            	var profit = data.data.profit;
		             	var randomNumber = data.data.randomNumber;
		                console.log('Step 3 checking');
		                const betAmount = data.data.bet;
		             	betStartTimeStamp=0;
		             	transaction_id = '';
		             	//localStorage.setItem('previousFinishBetLO','');
		                const totalPayout = (parseInt(normalPayout) + parseInt(jackpotPayout)) / 1000000;
		                // Count the amount of 1's
				        var _amountOfOnes = 0;
				        for (i=0; i<7; i++)
				        {
				            if (((randomNumber / (uint256(10) ** i)) % 10) == 1) amountOfOnes++;
				        }
							try
							{
								receivedUserWin(
									parseInt(randomNumber.toString()),
									parseInt(amountOfOnes.toString()),
									totalPayout,
									betAmount
								);
                                setTimeout(function(){
                                    doAutoRoll();
                                    updateBalance();
                                },2000);
							}
							catch (ee)
							{
								console.error(ee);
								doAutoRoll();
							}
                            


                    //// data.result ends here
                    }else{
                    	//no data get from betsfinished table then restore ui and reset 
                    	//localStorage.setItem('previousFinishBetLO','');
                    	betStartTimeStamp=0;
                        transaction_id='';
                    	setTimeout(function(){
                            doAutoRoll();
                            updateBalance();
                        },2000);
                    }
                } //success ends here
             }); //ajax ends here
          } //txid ends here

       } //22 secs ends here

      } //bet start timestamp ends here

    } // betstarted function ends here

	setInterval(checkBetStartedFailed,1000);

	var socket = io.connect( 'https://nodejs.trontopia.co:8082' );
	socket.on( 'newEvent', async function( data ) {

	     var eventName = data.name;
	     if(eventName=='BetStarted'){
	     	var user = data.result._gambler;
        	console.log('user rolled = '+user);

        	var _uniqueBetId = '0x'+data.result._uniqueBetId;
        	var _userSeed = '0x'+data.result._userSeed;
        	if(user==global.userAddressHex && global.uniqueBetId==_uniqueBetId){
            	var jackpotPayout = 0;
            	var normalPayout = 0;
            	var profit =0;
             	var randomNumber = 0;
                console.log('Step 1 checking');
                const betAmount = parseInt(data.result._betTRX);
             	var blocknumber = data.result._blockNumber;
        		
            	const block = await tronWeb.trx.getBlock(data.result._blockNumber);
            	 //saving start bet variables in local storage, which would be used by finish bet in subsequent roll.
                var firstBetData = [global.userAddress, _uniqueBetId,_userSeed,data.result._blockNumber,betAmount];
                
                let betArray = [];
                if (localStorage.getItem('previousFinishBetLO') !== null &&
                    localStorage.getItem('previousFinishBetLO') != "" &&
                    JSON.parse(localStorage.getItem('previousFinishBetLO')).length !== 0)
                {
                    betArray = JSON.parse(localStorage.getItem('previousFinishBetLO'));

                }
                betArray.push(firstBetData);
                
                localStorage.setItem("previousFinishBetLO", JSON.stringify(betArray));
                //console.log('blocknumber ' + blocknumber);
                //console.log('user ' + global.userAddress);
				//console.log('block hash ' + "0x"+block.blockID);
				//console.log('bet ' +		betAmount);
				//console.log('unique bet id ' + _uniqueBetId);
				//console.log('user seed ' + _userSeed);
                const result = await luckyOneContractInstance.calculateBetResultWithBlockHash(
						blocknumber,
						global.userAddress,
						"0x"+block.blockID,
						betAmount,
						_uniqueBetId,
						_userSeed
					).call();
					
					const totalPayout = (parseInt(result._normalPayout) + parseInt(result._jackpotPayout)) / 1000000;
					betStartTimeStamp=0;
                    
					try
					{
						receivedUserWin(
							parseInt(result._randomNumber.toString()),
							parseInt(result._amountOfOnes.toString()),
							totalPayout,
							betAmount
						);
                        setTimeout(function(){
                            doAutoRoll();
                            updateBalance();
                        },4000);
					}
					catch (ee)
					{
						console.error(ee);
						doAutoRoll();
					}
                    
					
            }

	     }else if(eventName=='BetFinished'){
	     	var user = data.result._gambler;
        	var betAmount = data.result._betTRX;
        	var jackpotPayout = data.result._jackpotPayout;
        	var normalPayout = data.result._normalPayout;
        	var profit = data.result._profit;
        	var randomNumber = data.result._randomNumber;
        	var timestamp = data.timestamp;

        	var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;

            let rowBoarderColorClass;
    		if (normalPayout != 0 || jackpotPayout != 0 ){
    			rowBoarderColorClass = "safe";
    		}else{
    			 rowBoarderColorClass = "redalt";
    		}      
    		randomNumber = leadingZeroes(randomNumber, 7);
			randomNumber = luckyOneColor(randomNumber);
            user = getUserAddress(tronWeb.address.fromHex(user));
            
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+betAmount+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(normalPayout) === 0 ? '-' : ((parseInt(normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
            if($('#bet2 li').length==1){
                $("#bet2 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet2 li:eq(1)").before(allBetDataNew);
            }

            $('#bet2 li:eq(49)').remove();
            
            if(betAmount>249){
                if($('#bet3 li').length==1){
                    $("#bet3 li:eq(0)").after(allBetDataNew);    
                }else{
                    $("#bet3 li:eq(1)").before(allBetDataNew);
                }
    
                $('#bet3 li:eq(49)').remove();
            }
	     
	     }else if(eventName=='HighRollers'){
	     	var user = data.result._gambler;
        	var betAmount = data.result._betTRX;
        	var jackpotPayout = data.result._jackpotPayout;
        	var normalPayout = data.result._normalPayout;
        	var profit = data.result._profit;
        	var randomNumber = data.result._randomNumber;
        	var timestamp = data.timestamp;

        	var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;

            let rowBoarderColorClass;
    		if (normalPayout != 0 || jackpotPayout != 0 ){
    			rowBoarderColorClass = "safe";
    		}else{
    			 rowBoarderColorClass = "redalt";
    		}      
    		randomNumber = leadingZeroes(randomNumber, 7);
			randomNumber = luckyOneColor(randomNumber);
            user = getUserAddress(tronWeb.address.fromHex(user));
            
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+betAmount+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(normalPayout) === 0 ? '-' : ((parseInt(normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
           // if($('#bet3 li').length==1){
            //    $("#bet3 li:eq(0)").after(allBetDataNew);    
            //}else{
              //  $("#bet3 li:eq(1)").before(allBetDataNew);
            //}

        //    $('#bet3 li:eq(49)').remove();

	     }else if(eventName=='RareWins'){
	     	var user = data.result._gambler;
        	var betAmount = data.result._betTRX;
        	var jackpotPayout = data.result._jackpotPayout;
        	var normalPayout = data.result._normalPayout;
        	var profit = data.result._profit;
        	var randomNumber = data.result._randomNumber;
        	var timestamp = data.timestamp;
            console.log(timestamp);
        	var d = new Date(timestamp);
            var hours = d.getHours();
            var minutes = d.getMinutes();
            var seconds = d.getSeconds();
            if(hours<10){ hours = '0' + hours; }
            if(minutes<10){ minutes = '0' + minutes;  }
            if(seconds<10){ seconds = '0' + seconds ; }            
            timestamp = (d.getMonth()+1) + '/' + d.getDate() +  '/' + d.getFullYear() + ' ' + hours + ':'+ minutes + ':' + seconds;

            let rowBoarderColorClass;
    		if (normalPayout != 0 || jackpotPayout != 0 ){
    			rowBoarderColorClass = "safe";
    		}else{
    			 rowBoarderColorClass = "redalt";
    		}      
    		randomNumber = leadingZeroes(randomNumber, 7);
			randomNumber = luckyOneColor(randomNumber);
            user = getUserAddress(tronWeb.address.fromHex(user));
            
            var allBetDataNew = '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+betAmount+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(normalPayout) === 0 ? '-' : ((parseInt(normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
            if($('#bet4 li').length==1){
                $("#bet4 li:eq(0)").after(allBetDataNew);    
            }else{
                $("#bet4 li:eq(1)").before(allBetDataNew);
            }

            $('#bet4 li:eq(49)').remove();

	     }


 	});
	
	//no 1 color code
	function luckyOneColor(randomNumber){
		var randomNumberText='';
		for (let i=6; i>=0; i--)
		{
			const digit = parseInt(randomNumber / (10 ** i)) % 10;
	        if(digit==1){
	        	randomNumberText = randomNumberText + ' <span style="color:#0cd6cf;">' + digit + '</span> ';
	        }else{
	        	randomNumberText = randomNumberText + ' ' + digit + ' ';
	        }
		
		}
    	return randomNumberText;
	}

	//convert number to 7 digit
	function numberToSevenDigit(number){
		number = number.toString();
		var len = number.length;
        
        if(len==1){
	         number = '000000'+number;
        }else if(len==2){
        	number = '00000'+number;
        }else if(len==3){
    		number = '0000'+number;    
        }else if(len==4){
        	number = '000'+number;
        }else if(len==5){
        	number = '00'+number;
        }else if(len==6){
        	number = '0'+number;
        }else{
        	number = number;
        }
        return number;
        
	}

	function doAutoRoll(){
		/* If the user is auto-rolling... */
			var autoRoll=''; 
            $('.autoRoll').each(function(){
                var checked = $(this).hasClass('selected');
                if(checked){
                     autoRoll = $(this).data('auto');
                }

                });
                
            if(autoRoll=='on'){
                //var stopOnLoss =$('#stoponloss').prop('checked');
                // if(stopOnLoss==false){
                 	$("#rollDice").attr("disabled", false);
                    $("#rollBtn").attr("disabled", false);
                    $("#rollBtn").hide();
          		    $("#rollDice").show(); 
                    $('#rollDice').click();
                 //}else{
                 //	$("#rollDice").attr("disabled", false);
                  //  $("#rollBtn").attr("disabled", false);
            //        $("#rollBtn").hide();
          	//	    $("#rollDice").show(); 
                 //}
				/* ... automatically trigger the roll button click event again */
			
			}
			
			/* If the user is not auto-rolling... */
			else
			{
				/* ... change the roll button text back to 'ROLL' */
				$("#rollBtn").hide();
          		$("#rollDice").show(); 
				$("#rollDice").attr("disabled", false);
                $("#rollBtn").attr("disabled", false);
			}
	}
	function receivedUserWin(luckyNumber, amountOfOnes, totalPayout, betAmount){
		//$('.odometer').html(luckyNumber);
		var randomNumber = leadingZeroes(luckyNumber, 7);
		randomNumber = luckyOneColor(randomNumber);
		//var nNumber = leadingZeroes(luckyNumber, 7);
		//console.log(nNumber);
		//console.log(luckyNumber);
		//$('.odometer').html(luckyNumber);
		    
		    //odometer settings on load
            var el1 = document.getElementById('odometer');
            
            od1 = new Odometer({
              el: el1,
              // Any option (other than auto and selector) can be passed in here
              format: 'd',
              minIntegerLen: 7
            });
            
            od1.update(0000000);
            od1.update(luckyNumber);
            // or
            //el1.innerHTML = nNumber;
            
		setTimeout(async function(){
	
			/* The roll is complete, we are no longer rolling. */
			window.rolling = false;

	        try{
	    		displayUserWin(luckyNumber, amountOfOnes, totalPayout,betAmount);
	        }catch (e){
	            console.error("Failure in displayUserWin:", e);
	        }
		}, 2000);
}


function displayUserWin(luckyNumber, amountOfOnes, totalPayout,betAmount)
{
    let digit_to_count, largestDigitAmount, jackpotType;
    [digit_to_count, largestDigitAmount, jackpotType] = randomNumber_to_digitToCount_and_largestDigitAmount_and_jackpotType(luckyNumber);
	/* Display the floating green or red text above the user balance box.
	\* It shows the user how much they won or lost. */
	try
	{
		$("#bounce_num").stop();
		if (totalPayout == 0)
		{
			$("#bounce_num").css({"color": "#ff006c","top": "-40px", "opacity": "1","background" : "transparent" });
			$("#bounce_num").text("-" + betAmount + " TRX");
			$("#bounce_num").show();
			$("#bounce_num").animate({"color": "#ff006c",top: '0px', opacity: '0'}, 2000);
		}
		else
		{
			$("#bounce_num").css({"color": "#01f593","top": "-40px", "opacity": "1","background" : "transparent"});
			$("#bounce_num").text(totalPayout.toFixed(2) + " TRX");
			$("#bounce_num").show();
			$("#bounce_num").animate({"color": "#01f593",top: '0px', opacity: '0'}, 2000);
		}
		
		
		$("#bounce_num2").stop();
		if (totalPayout == 0)
		{
			$("#bounce_num2").css({"color": "#ff006c","bottom": "40px", "right": "30px","opacity": "1","background" : "transparent" });
			$("#bounce_num2").text("-" + betAmount + " TRX");
			$("#bounce_num2").show();
			$("#bounce_num2").animate({"color": "#ff006c","bottom": "70px", "right": "30px", opacity: '0'}, 2000);
		}
		else
		{
			$("#bounce_num2").css({"color": "#01f593","bottom": "40px", "right": "30px","opacity": "1","background" : "transparent"});
			if (jackpotType !== null)
			{
			    $("#bounce_num2").text(totalPayout.toFixed(2) + " TRX");
				$("#bounce_num2").show();
    			$("#bounce_num2").animate({"color": "#01f593","bottom": "70px", "right": "30px", opacity: '0'}, 3000);
    		}
			else
			{
			    $("#bounce_num2").text("+ " + totalPayout.toFixed(2) + " TRX");
    			$("#bounce_num2").show();
    			$("#bounce_num2").animate({"color": "#01f593","bottom": "70px", "right": "30px", opacity: '0'}, 2000);
			}
		}
	}
	catch (eee)
	{
		console.error("Failed to show floating win amount", eee);
	}
	
	
	// Play the win or loss sound 
	try
	{
	    /* If sound is turned on... */
    	//if (localStorage.getItem("SOUND") === null || localStorage.getItem("SOUND") === "on")
    	if (localStorage.getItem("L1SOUND") == "on")
    	{
			// Select a sound to play 
			let audio = null;
			
			//console.log("totalPayout = "+totalPayout);
			//console.log("window.rollingBetTRX = "+betAmount);
			
			if (totalPayout == 0)
			{
			    //audio = new Audio("audio/lossnew.wav")
			    $('#audio_loss')[0].play();
			}
			else
			{
			    console.log(digit_to_count[1]);
				if (digit_to_count[1] === 7)  $('#audio_7')[0].play();
    			// Sound for 111111
    			else if (digit_to_count[1] === 6) $('#audio_6')[0].play();
			    // Sound for 11111
    			else if (digit_to_count[1] === 5) $('#audio_5')[0].play();
    			// Sound for 1111
    			else if (digit_to_count[1] === 4) $('#audio_4')[0].play();
    			// Sound for 111
    			else if (digit_to_count[1] === 3) $('#audio_3')[0].play();
    			// Sound for 11 and 1444
    			else if (digit_to_count[1] === 2) $('#audio_2')[0].play();
    			// Sound for 1
    			else if (digit_to_count[1] === 1) $('#audio_1')[0].play();
    			else if (digit_to_count[1] === 0) $('#audio_loss')[0].play();
				
				// Sound for 1111111
    			//if (digit_to_count[1] === 7) audio = new Audio("audio/7new.wav");
    			// Sound for 111111
    			//else if (digit_to_count[1] === 6) audio = new Audio("audio/6new.wav");
			    // Sound for 11111
    			//else if (digit_to_count[1] === 5) audio = new Audio("audio/5new.wav");
    			// Sound for 1111
    			//else if (digit_to_count[1] === 4) audio = new Audio("audio/4new.wav");
    			// Sound for 111
    			//else if (digit_to_count[1] === 3) audio = new Audio("audio/3new.wav");
    			// Sound for 11 and 1444
    			//else if (digit_to_count[1] === 2) audio = new Audio("audio/2new.wav");
    			// Sound for 1
    			//else if (digit_to_count[1] === 1) audio = new Audio("audio/1new.wav");
			}
			
			// Play the selected sound 
// 			if (audio !== null)
// 			{
// 				audio.play();
// 			}
    	}
	}
	catch (eee)
	{
		console.error("Failed to play sound", eee);
	}
}

function randomNumber_to_digitToCount_and_largestDigitAmount_and_jackpotType(randomNumber)
{
	const digit_to_count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	let largestDigitAmount = 0;
	for (let i=0; i<7; i++)
	{
		const digit = parseInt(randomNumber / (10 ** i)) % 10;
		digit_to_count[digit]++;
		
		if (digit_to_count[digit] > largestDigitAmount)
		{
			largestDigitAmount = digit_to_count[digit];
		}
	}
	
	let jackpotType = null;
	
	if (digit_to_count[1] >= 1)
	{
		if (largestDigitAmount === 7) jackpotType = "Grand";
		if (largestDigitAmount === 6) jackpotType = "Grand";
    	if (largestDigitAmount === 5) jackpotType = "Grand";
    	if (largestDigitAmount === 4) jackpotType = "Major";
    	if (largestDigitAmount === 3) jackpotType = "Minor";
    	if (largestDigitAmount === 2) jackpotType = "Mini";
	}
	
	return [digit_to_count, largestDigitAmount, jackpotType];
}



    $("#rollBtn").hide();
	$("#myBetVals").html('Loading..');
    $("#myTotalWon").html('Loading..');
    var soundBtn = localStorage.getItem("L1SOUND");
    
    if(soundBtn=='off'){
        $("#sound-icon").removeClass('fa-volume-up');    
    }else if(soundBtn=='on'){
        $("#sound-icon").addClass('fa-volume-up');    
    }else{
        localStorage.setItem("L1SOUND", 'on');
        $("#sound-icon").addClass('fa-volume-up');    
    }
    
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
                location.reload();
                updateInterface();

            }
            
            //clearInterval(intervalID);
        }
    }, 1000);

    async function showAccountInfo() {
        var firstFive,lastFive,isLogin;
        $("#notSignIn").hide();
		    
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

    //$('#closeNotSignIn').click(function(){$("#notSignIn").hide();});
    
    $('#btnRefreshTRX').click(function(){updateBalance();});
    $('#sound-icon').click(function(){
        //var soundStats = localStorage.getItem("L1SOUND");
        var soundStats = $(this).hasClass('fa-volume-up');
       
        if(soundStats==true){
            $(this).removeClass('fa-volume-up');    
            localStorage.setItem("L1SOUND", 'off');
        }else if(soundStats==false){
            $(this).addClass('fa-volume-up');    
            localStorage.setItem("L1SOUND", 'on');
        }
        //else{
          //  $(this).removeClass('fa-volume-up');    
        //    localStorage.setItem("L1SOUND", 'off');
        //}
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
        localStorage.removeItem('previousFinishBetLO');
        var ultimateDiceContractInfo = await tronWeb.trx.getContract(ultimateDiceContractAddress);
        ultimateDiceContractInstance = await tronWeb.contract(ultimateDiceContractInfo.abi.entrys, ultimateDiceContractInfo.contract_address);
        
        var luckyOneContractInfo = await tronWeb.trx.getContract(luckyOneContractAddress);
        luckyOneContractInstance = await tronWeb.contract(luckyOneContractInfo.abi.entrys, luckyOneContractInfo.contract_address);
		

		minBet = parseInt((await luckyOneContractInstance.minimumBetTRX().call()).toString());
		maxBet = parseInt((await luckyOneContractInstance.maximumBetTRX().call()).toString());

		$("#mainBetTRX").val(minBet);
		mainBetChanged();
		
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
            //updateInterface();
            setTimeout(updateInterface,3000);
            app();
        }     
         
         setTimeout(displayboards,2000);
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
         setTimeout(showData,10000);


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
             //updateICODiamondsData();
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

    gameStats();
    gameStats2();
    setInterval(gameStats,5000);
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
            $.get(API_URL + "luckyone-allbets.php", function(data, status,xhr){
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
                        var allBetTableHTML= ' <div class="table-bets"><ul>    <li class="head-at"><div class="row"> <div class="col-md-1 col-sm-1 col-xs-1"></div>    <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>    <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2"> <div class="head-th"> <p>Payout</p>  </div> </div> <div class="col-md-1 col-sm-1 col-xs-1"></div></div>  </li>';
                        
                        $.each(resultking, function(key, obj) {
                            
                            var result = obj;
                                
                         		let rowBoarderColorClass;
					    		if (result.normalPayout != 0 || result.jackpotPayout != 0 ){
					    			rowBoarderColorClass = "safe";
					    		}else{
					    			 rowBoarderColorClass = "redalt";
					    		}   

					    		var randomNumber = leadingZeroes(obj.randomNumber, 7);
					    		randomNumber = luckyOneColor(randomNumber);
                                let user = getUserAddress(tronWeb.address.fromHex(result.user));
                           
                            
                            allBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+obj.bet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(result.normalPayout) === 0 ? '-' : ((parseInt(result.normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
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
            $.get(API_URL + "luckyone-mybets.php?user="+userAddress, function(data, status,xhr){
                //data = JSON.parse(data);
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var myBetTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div>   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>    <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2"> <div class="head-th"> <p>Payout</p>  </div> </div><div class="col-md-1 col-sm-1 col-xs-1"></div> </div>  </li>';
                        $.each(resultking, function(key, obj) {
                                var result = obj;
                                
                         		let rowBoarderColorClass;
					    		if (result.normalPayout != 0 || result.jackpotPayout != 0 ){
					    			rowBoarderColorClass = "safe";
					    		}else{
					    			 rowBoarderColorClass = "redalt";
					    		}      
					    		var randomNumber = leadingZeroes(obj.randomNumber, 7);
					    		randomNumber = luckyOneColor(randomNumber);
                                let user = getUserAddress(tronWeb.address.fromHex(result.user));
                                
                                myBetTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+obj.bet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(result.normalPayout) === 0 ? '-' : ((parseInt(result.normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
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

    let highRollersData_running = false;
    function highRollersData(){
        if (highRollersData_running) return;
        highRollersData_running = true;
        
        try
        {
            $.get(API_URL + "luckyone-highrollers.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var highRollersTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row">  <div class="col-md-1 col-sm-1 col-xs-1"></div>  <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>    <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div> <div class="col-md-2 col-sm-2 col-xs-2"> <div class="head-th"> <p>Payout</p>  </div> </div> <div class="col-md-1 col-sm-1 col-xs-1"></div> </div>  </li>';
                       
                        $.each(resultking, function(key, obj) {
                                var result = obj;
                                
                         		let rowBoarderColorClass;
					    		if (result.normalPayout != 0 || result.jackpotPayout != 0 ){
					    			rowBoarderColorClass = "safe";
					    		}else{
					    			 rowBoarderColorClass = "redalt";
					    		}      
					    		var randomNumber = leadingZeroes(obj.randomNumber, 7);
					    		randomNumber = luckyOneColor(randomNumber);
                                let user = getUserAddress(tronWeb.address.fromHex(result.user));
                                
                                highRollersTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+obj.bet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(result.normalPayout) === 0 ? '-' : ((parseInt(result.normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
                                
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
            $.get(API_URL + "luckyone-rarewins.php", function(data, status,xhr){
                try
                {
                    if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        
                        var rowBoarderColorClass; 
                        var rareWinsTableHTML = ' <div class="table-bets"><ul>    <li class="head-at"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div>   <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Time</p>      </div>    </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Player</p>     </div>     </div>    <div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th">   <p>Lucky Number</p>     </div>   </div>     <div class="col-md-2 col-sm-2 col-xs-2">    <div class="head-th">   <p>Bets</p>     </div>    </div>    <div class="col-md-2 col-sm-2 col-xs-2"> <div class="head-th"> <p>Payout</p>  </div> </div><div class="col-md-1 col-sm-1 col-xs-1"></div>  </div>  </li>';
                       
                        $.each(resultking, function(key, obj) {
                                var result = obj;
                                
                         		let rowBoarderColorClass;
					    		if (result.normalPayout != 0 || result.jackpotPayout != 0 ){
					    			rowBoarderColorClass = "safe";
					    		}else{
					    			 rowBoarderColorClass = "redalt";
					    		}      
					    		var randomNumber = leadingZeroes(obj.randomNumber, 7);
					    		randomNumber = luckyOneColor(randomNumber);
		                        
                                let user = getUserAddress(tronWeb.address.fromHex(result.user));
                                
                                rareWinsTableHTML += '<li class="dt-tbs '+rowBoarderColorClass+'"><div class="row"><div class="col-md-1 col-sm-1 col-xs-1"></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+obj.timestamp+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p>'+user+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th"><p style=" font-family: \'Agency FB\';font-size: 15pt;">' + randomNumber + '</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p>'+obj.bet+'</p></div></div><div class="col-md-2 col-sm-2 col-xs-2"><div class="head-th poit"><p> '+ (parseInt(result.normalPayout) === 0 ? '-' : ((parseInt(result.normalPayout)/1000000).toFixed(2) +' <span>TRX</span>')) +' </p></div></div><div class="col-md-1 col-sm-1 col-xs-1"></div></div></li>';
                                
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


	$('#dividendPopup').click(function(){
	    showData();
	     $('#tokenToFreeze').val('');
	});
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
                setTimeout(function(){
                    showData();              
                },3000);
            }else{
                alertify.error('Something went wrong, please try again');
            }
        }
    });

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

//withdraw Topia token
    $('#withdrawTopiaBtn').click(async function(){
        //first we will check if user has any available topia to withdraw. If so, then we will first withdraw it.
        var availableTopia = await tokenContractInstance.displayAvailabletoWithdrawTOPIA().call();
        val = Object.values(availableTopia);
        var finalTopiaAvailable = window.tronWeb.toDecimal(val[0]);
        
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

    function resetrollUI(){
	     $("#rollBtn").hide();
	     $("#rollDice").show();
	     $("#rollDice").attr("disabled", false);
	     $("#rollBtn").attr("disabled", false);
	}
	
	//roll button code
	let startBetTxid = null;
	window.rolling = false;
	

	$('#rollDice').click(async function() { 
    	console.log('rolling again');
      	window.rolling = true;
      $("#rollDice").attr("disabled", true);
      $("#rollBtn").attr("disabled", true);
      
        var timestamp = + new Date();
        
        //set cookies for finish bet alert
        document.cookie = "rollDiceClickTime="+timestamp;
        var contractInfo = await tronWeb.trx.getContract(luckyOneContractAddress);
        var gameContractInstance = tronWeb.contract(contractInfo.abi.entrys, luckyOneContractAddress);
        
       
        //clear style for bounce num 
        setTimeout(function(){
        	$('#bounce_num').html("");
            $('#bounce_num2').html("");    
            $('#bounce_num').removeAttr("style");
            $('#bounce_num2').removeAttr("style");    
        },3000);
        
        var betAmt,betAmount, seed,newSeedVal,finalSeed,payout_to_win;

        betAmount      = $("#mainBetTRX").val();
        betAmt = parseInt(betAmount);
        DB_betAmt = betAmt;
        
        var dividends = await divContractInstance.displayAvailableDividendALL().call();
        var val = Object.values(dividends);
        var divNumber = window.tronWeb.toDecimal(val[1]);
        var dividend = tronWeb.fromSun(divNumber);
       
        
        /*Checking the bet amount with defined bet value -  MAX_BET_AMOUNT */
        
        if(betAmt > maxBet){
            alertify.error('The max bet amount is currently ' + maxBet);
            resetrollUI();
            return false;
        }
        if(betAmt < minBet){
            alertify.error('The min bet amount is currently ' + minBet);
            resetrollUI();
            return false;
        }
    

        var contractBalance = await window.tronWeb.trx.getBalance(ultimateDiceContractAddress);
        contractBalance = tronWeb.fromSun(contractBalance);    
        var totalMaxAmount = parseFloat(contractBalance);
        totalMaxAmount = totalMaxAmount/20;
        
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
        var blocknumber = 0;
        seed = newSeedVal ? newSeedVal : uniqueString;     
        global.uniqueBetId = uniqueString;   
        const userBalance = await window.tronWeb.trx.getBalance(global.userAddress);
        if (userBalance < betAmt) {
            alert('Your Tron wallet has insufficient balance to proceed');
            resetrollUI();
            return false;
        }
        
        callValue = betAmt * 1000000;
        
       
        let betToFinish = null;
        
        let betDataReceivedFunc = null;
        //checking variables for previous finish bet
        if (localStorage.getItem('previousFinishBetLO') !== null && localStorage.getItem('previousFinishBetLO') != "" && JSON.parse(localStorage.getItem('previousFinishBetLO')).length >= 1){
        
            let finishBetData = JSON.parse(localStorage.getItem('previousFinishBetLO'));
            
            betToFinish = finishBetData.shift();
	        //console.log(finishBetData);
            
            var finishBet_gambler 				= betToFinish[0];
            var finishBet_uniqueBetId 			= betToFinish[1];
            var finishBet_userSeed 				= betToFinish[2];
            var finishBet_blockNumber 			= betToFinish[3];
            var finishBet_trx 					= betToFinish[4];
            
            localStorage.setItem('previousFinishBetLO', JSON.stringify(finishBetData));
        }
        else
        {
            var finishBet_gambler 				= global.userAddress;
            var finishBet_uniqueBetId 			= tronWeb.sha3("0", true);
            var finishBet_userSeed 				= tronWeb.sha3("0", true);
            var finishBet_trx 					= 0;
            //var finishBet_uniqueBetId = "0x0";
            //var finishBet_userSeed = "0x0";
            var finishBet_blockNumber 			= 0;
           
        }
       
       /* console.log('finisheBet Gambler : '+ finishBet_gambler);
       console.log('finishBet UniqueBetid : ' + finishBet_uniqueBetId);
       console.log('finishBet User seed :' + finishBet_userSeed);
       console.log('finishBet blocknumber : ' + finishBet_blockNumber);
       
       console.log('refid'+ REFID);
       console.log('seed : '+ seed);
       console.log('unique string : '+ uniqueString); */
  	    try
  	    {
            console.log('finishbet unique id : ' +finishBet_uniqueBetId);
           
                var result = await gameContractInstance.finishBet_and_startBet(finishBet_blockNumber,finishBet_gambler, finishBet_trx, finishBet_userSeed,finishBet_uniqueBetId, REFID, betAmt, seed, uniqueString ).send({
                    shouldPollResponse: false,
                    feeLimit: 5000000,
                    callValue: callValue,
                    from: global.userAddress
                });   
             
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
      	        let finishBetData = JSON.parse(localStorage.getItem('previousFinishBetLO'));
                if (localStorage.hasOwnProperty("DebugLog"))
                {
                    console.log("Added back unfinished bet to local storage:");
                    console.log(betToFinish);
                }
                finishBetData.unshift(betToFinish);
      	        localStorage.setItem('previousFinishBetLO', JSON.stringify(finishBetData));
  	        }
  		    console.log(err);
  		    window.rolling = false;
            $("#rollBtn").hide();
            $("#rollDice").show();
            //$('#slider-range').slider({disabled:false});
            $("#rollDice").attr("disabled", false);
            $("#rollBtn").attr("disabled", false);
            //try { window.betStartedEventWatcher.stop(); } catch (e) {}
  		    return;
	    }
	   
                    var mainBetWin = 0;
                    var newWinningNumber = 0;
                    //var betArray = [global.userAddress,uniqueString,seed,blocknumber,betAmt];
                    //localStorage.setItem('previousFinishBetLO', JSON.stringify(betArray));
        	        //setting this variables for "unclaimed winners" section
        	        $("#finishBetGambler").val(global.userAddress);
        	        $("#finishBetUniqueID").val(uniqueString);
        	        $("#finishBetUserSeed").val(seed);
        	        //$("#finishBetBlockNumber").val(blockNumber);
        	        //$("#finishBetParamsArray").val('['+start+','+end+','+betAmount+','+sidebetAmount+','+sidebetInt+']');
        	       
        	        
        	        const MAX_CALC_ATTEMPTS = 15;
        	        let calcAttempts;
        	        var calculateBetResult = null;
    });
	
	 /* Updating the PAYOUT - initial call */
    
    $("#mainBetTRX").focusout(function(){
      
      var betAmt,multiplier,payout,res;
      betAmt = $("#mainBetTRX").val();
      multiplier = $("#hidden_multiplier").val();
      res = parseInt(betAmt) * multiplier;
      res = res.toString();       
      $("#payout").val(number_to_2decimals(res));
    });


setTimeout(getleaderboard,3000);
setTimeout(getchat,3000);
//setInterval(getchat,10000);
setInterval(getleaderboard,60000);

$( "#mainBetTRX" ).keyup(function() {
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
     if(betAmt>maxBet){
         alertify.error('Max Bet Amount is ' + maxBet);
            var userBalnce = $('#trxBalance').val();
            userBalnce = parseFloat(userBalnce);
            if(userBalnce<maxBet){
                betAmt = parseInt(userBalnce-1);
            }else{
                betAmt =  maxBet;     
            }
         //betAmt = 20;
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
    
	$("#minBetButton").click(async function(){
		$("#mainBetTRX").val(""+parseInt(minBet.toString()));
		mainBetChanged();});

	$("#halfBetButton").click(async function(){
		const curBet = parseInt($("#mainBetTRX").val());
		$("#mainBetTRX").val(""+Math.max(minBet, Math.floor(curBet/2)));
		mainBetChanged();});

	$("#doubleBetButton").click(async function(){
		const curBet = parseInt($("#mainBetTRX").val());
		$("#mainBetTRX").val(""+Math.min(maxBet, curBet * 2));
		mainBetChanged();});

	$("#maxBetButton").click(async function(){
	     
	    var betAmt;
	    var userBalnce = $('#trxBalance').val();
        userBalnce = parseFloat(userBalnce);
            if(userBalnce<maxBet){
                betAmt = parseInt(userBalnce-1);
            }else{
                betAmt =  maxBet;     
            }
		$("#mainBetTRX").val(betAmt);
		
		mainBetChanged();});

	$("#mainBetTRX").blur(async function(){
		const curBet = parseInt($("#mainBetTRX").val());
		if (curBet < minBet) $("#mainBetTRX").val(""+minBet);
		else if (curBet > maxBet) $("#mainBetTRX").val(""+maxBet);
		mainBetChanged();});

	$("#mainBetTRX").change(async function(){
		const curBet = parseInt($("#mainBetTRX").val());
		console.log("Bet field changed to "+curBet);
		if (curBet < minBet) $("#mainBetTRX").val(""+minBet);
		else if (curBet > maxBet) $("#mainBetTRX").val(""+maxBet);
		mainBetChanged();
	});

	function mainBetChanged(){
		const curBet = parseInt($("#mainBetTRX").val());
		$("#payoutOneOne").val((curBet * amountOfOnes_to_multiplier[0]).toFixed(2));
		$("#payoutTwoOnes").val((curBet * amountOfOnes_to_multiplier[1]).toFixed(2));
		$("#payoutThreeOnes").val((curBet * amountOfOnes_to_multiplier[2] ).toFixed(2));
		$("#payoutFourOnes").val((curBet * amountOfOnes_to_multiplier[3] ).toFixed(2));
		$("#payoutFiveOnes").val((curBet * amountOfOnes_to_multiplier[4] ).toFixed(2));
		$("#payoutSixOnes").val((curBet * amountOfOnes_to_multiplier[5] ).toFixed(2));
		$("#payoutSevenOnes").val((curBet * amountOfOnes_to_multiplier[6] ).toFixed(2));
	}
	
function leadingZeroes(num, amountOfDigits)
{
	num = num.toString();
	while (num.length < amountOfDigits) num = "0" + num;
	return num;
}

});