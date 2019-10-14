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

$(document).ready(async function() {
    $('#trxTopiaVoucherText').html('Play Any game to mine VOUCHER');
    $("#login_or_not").hide();
    $("#trxBalance").hide();
    $("#trx").show();
    $("#rollBtn").hide();
    $("#lucky_no").html('00');
    $("#myBetVals").html('Loading..');
    $("#myTotalWon").html('Loading..');
    localStorage.setItem("SIDEBETS", '');
      
    var soundBtn = localStorage.getItem("SOUND");
    
    if(soundBtn=='off'){
        $("#sound-icon").attr('src','images/sound_off.png');    
    }else if(soundBtn=='on'){
        $("#sound-icon").attr('src','images/sound_on.png');    
    }else{
        localStorage.setItem("SOUND", 'on');
        $("#sound-icon").attr('src','images/sound_on.png');    
    }
    
    var sideBetMultiplier = {"yin":2.1111,"yang":2.1111,"bang":9.50,"zero":95.0,"odd":1.90,"even":1.90};
    var sideBetWinChance = {"yin":45,"yang":45,"bang":10,"zero":1,"odd":50,"even":50};
  
    /*Check updateBetAmount() ALSo */
    const MAX_BET_AMOUNT = 50000;
    const MIN_BET_AMOUNT = 50;
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
                removeLoader();  
                 $("#poip-fri").modal('show');
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
             $("#walletID").html(isLogin);
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
    
    $('#btnRefreshTRX').click(function(){updateBalance();});

    
    
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
         //getluckyTimer();
         //getLukcyLeaders();
         setInterval(displayboards,60000);
         setInterval(getLukcyLeaders,60000);
         removeLoader();  
         var cur_seeds,new_seeds,formated_seeds,totalBets,totalWin;
         /*To get Seeds*/             
         //cur_seeds = await ultimateDiceContractInstance.getSeed().call();
        var SEEDTEXT = localStorage.getItem("NEWSEED");
          if(SEEDTEXT!='' || SEEDTEXT==NULL){
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
                            // if(userData.level==9999){
                            //     getchat();
                            // }
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
             /*Getting total minted topia */
            var mintedTokens  = await tokenContractInstance.totalSupply().call();
            var val = Object.values(mintedTokens);
            mintedTokens = window.tronWeb.toDecimal(val[0]);
            mintedTokens = mintedTokens / 100000000;
            $('#minedToken2').html(parseInt(mintedTokens));
    }
    //setTimeout( function (){ $('#pills-all-bets-tab').click();},2000);
    gameStats();
    gameStats2();
    setInterval(gameStats,5000);
    setInterval(showData,60000);
   
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
     var result = await shareDividendContractInstance.withdrawDividendsEverything().send({
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
  
setTimeout(getleaderboard,3000);
setTimeout(getchat,3000);
//setInterval(getchat,10000);
setInterval(getleaderboard,60000);

});   