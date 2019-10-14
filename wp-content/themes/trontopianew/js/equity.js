var shareContractInstance;
var shareDividendContractInstance;
var twxContractInstance;
var usdtContractInstance;

const shareContractAddress            =   'TWwSQ7M7i5KD5HQ9pdwJi5B7nEv18Ka3En';
const shareDividendContractAddress    =   'TDy2yBzMm3diGNzgi51ehTbSRDHAHB5VZT';
const topiaContractAddress            =   'TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8';
const wallet_Address                  =   'TCC8HykTGkMUaiyb3J7qkXW2CzN4ieqyS3';

const ACCOUNTS_URL = 'https://api.trongrid.io/v1/accounts/'+wallet_Address;
async function shareContractInit(){
    var shareContractInfo = await tronWeb.trx.getContract(shareContractAddress);
    shareContractInstance = await tronWeb.contract(shareContractInfo.abi.entrys, shareContractInfo.contract_address);
    var shareDivContractInfo = await tronWeb.trx.getContract(shareDividendContractAddress);
    shareDividendContractInstance = await tronWeb.contract(shareDivContractInfo.abi.entrys, shareDivContractInfo.contract_address);
     /*For getting the total shares*/
     var totalSupply  = await shareContractInstance.totalSupply().call();               
     totalSupply = window.tronWeb.toDecimal(totalSupply);
     totalSupply = totalSupply /1000000;
     $("#shares-jd-text").html(totalSupply.toFixed(2)+'/'+'1000000');  
}

async function updateSharesData(){
    /*For getting  shares*/
       
        var shares  = await shareContractInstance.balanceOf(global.userAddress).call();
        var val = Object.values(shares);
        shares = window.tronWeb.toDecimal(val[0]);
        shares =shares /1000000;
        if(shares>0){
            $("#myAvailableShares").html(number_to_2decimals(shares));
            $("#myAvailableShares2").val(shares);
            $('#sharesBalance').html(shares);
        }else{
            $('#myAvailableShares').html(0.00);
            $('#myAvailableShares2').val(0.00);
            $('#sharesBalance').html(0.00);
        }

        var usersShareFrozen  = await shareContractInstance.usersShareFrozen(global.userAddress).call();
        var val = Object.values(usersShareFrozen);
        usersShareFrozen = window.tronWeb.toDecimal(val[0]);
        usersShareFrozen = usersShareFrozen / 1000000;
        $("#usersShareFrozen").html(number_to_2decimals(usersShareFrozen));

        //var displayAvailabletoWithdrawSHARES  = await shareContractInstance.frozenTopiaReleaseAmount(global.userAddress).call();
        //var val = Object.values(displayAvailabletoWithdrawSHARES);
        //displayAvailabletoWithdrawSHARES = window.tronWeb.toDecimal(val[0]);
        //displayAvailabletoWithdrawSHARES = displayAvailabletoWithdrawSHARES /1000000;
        //$("#displayAvailabletoWithdrawSHARES").html(displayAvailabletoWithdrawSHARES);

        var frozenSharesGlobal  = await shareContractInstance.frozenSharesGlobal().call();
        var val = Object.values(frozenSharesGlobal);
        frozenSharesGlobal = window.tronWeb.toDecimal(val[0]);
        frozenSharesGlobal = frozenSharesGlobal / 1000000;
        //frozenSharesGlobal = frozenSharesGlobal.toString();
        //totalfrozentokenNumber = totalfrozentokenNumber.slice(0, (totalfrozentokenNumber.indexOf("."))+3);
        $("#frozenSharesGlobal").html(number_to_2decimals(frozenSharesGlobal)); 
        
        //getting shares BTT,SEED tokens
        //pool size of token / total frozen shares * users frozen shares
        // var settings = {
        //   "async": true,
        //   "crossDomain": true,
        //   "url": ACCOUNTS_URL,
        //   "method": "GET",
        //   "headers": {
        //     "content-type": "application/json"
        //   }
        // }
        
        // $.ajax(settings).done(async function (response) {
        //   var assetV2 = response.data[0].assetV2;
        //   $.each( assetV2, function( key, value ){
        //     if(assetV2[key]['key']=='1002000'){
        //         var btt = assetV2[key]['value']/1000000;
        //         var bttuserShare = (btt/frozenSharesGlobal) * usersShareFrozen;
        //         $('#bttSharesText').html(number_to_2decimals(btt));
        //         if(bttuserShare>0){
        //             $('#bttShareUser').html(number_to_2decimals(bttuserShare));
        //         }
        //     }
        // });
        // });
    //    tronscan BTT balance code
        // $.getJSON("https://api.trongrid.io/v1/accounts/"+wallet_Address,function( data, status, xhr ) { 
            // var assetV2 = data.data[0]['assetV2'];
            // $.each( assetV2, function( key, value ){
            //      if(assetV2[key]['key']=='1002000'){
                     //var btt = assetV2[key]['value']/1000000;
                  //   var btt = 39921.99;
                 //    $('#bttSharesText').html(number_to_2decimals(btt));
                //     var bttuserShare = (39921.99 / frozenSharesGlobal) * usersShareFrozen;
                  //   if(bttuserShare>0){
                 //        $('#bttShareUser').html(number_to_2decimals(bttuserShare));
               //      }
             //    }
           //  });
         //});
        
        //apilist BTT balance code
        //  $.getJSON("https://api.tronscan.org/api/account?address=TXRY3SF9bgczdr4DMc6qFd8iEVcDKyinfb",function( data, status, xhr ) { 
        //        var tokenBalances = data.tokenBalances;
        //        $.each( tokenBalances, function( key, value ){
        //                if(value['name']=='1002000'){
        //                    var btt = value['balance']/1000000;
        //                    $('#bttSharesText').html(number_to_2decimals(btt));
        //                    var bttuserShare = (btt / frozenSharesGlobal) * usersShareFrozen;
        //                    if(bttuserShare>=0.01){
        //                    $('#bttShareUser').html(number_to_2decimals(bttuserShare));
        //                    }else{
        //                        $('#bttShareUser').html('0.00');
        //                   }
        //               }
        //            });
       // });
         //apilist SWG balance code
        // $.getJSON("https://api.tronscan.org/api/account?address=TXRY3SF9bgczdr4DMc6qFd8iEVcDKyinfb",function( data, status, xhr ) { 
          //      var tokenBalances = data.tokenBalances;
            //    $.each( tokenBalances, function( key, value ){
            //			if(value['name']=='1002082'){
              //    		    var swg = value['balance']/1000;
                //            $('#swgSharesText').html(number_to_2decimals(swg));
                  //          var swguserShare = (swg / frozenSharesGlobal) * usersShareFrozen;
                    //        if(swguserShare>=0.01){
                      //      $('#swgShareUser').html(number_to_2decimals(swguserShare));
                        //    }else{
                          //      $('#swgShareUser').html('0.00');
                          // }
                      // }
             	//	});
    //    });
        
        //get TWX token balance 
      //  var twxContractInfo = await tronWeb.trx.getContract(twxContractAddress);
      //  twxContractInstance = await tronWeb.contract(twxContractInfo.abi.entrys, twxContractInfo.contract_address);
      //  var twx  = await twxContractInstance.balanceOf(wallet_Address).call();
        
      //  var val = Object.values(twx);
      //  twx = window.tronWeb.toDecimal(val[0]);
      //  twx =twx /1000000;
      //  if(twx>0){
      //      var twxuserShare = (twx/frozenSharesGlobal) * usersShareFrozen;
      //      $("#twxSharesText").html(number_to_2decimals(twx));
      //      if(twxuserShare>=0.01){
      //          $('#twxShareUser').html(number_to_2decimals(twxuserShare));
      //      }else{
      //          $('#twxShareUser').html('0.00');
      //      }
     //   }else{
     //       $('#twxSharesText').html('0.00');
    //    }
        
        //get BNKR token balance 
    //    var bnkrContractInfo = await tronWeb.trx.getContract(bnkrContractAddress);
     //   bnkrContractInstance = await tronWeb.contract(bnkrContractInfo.abi.entrys, bnkrContractInfo.contract_address);
     //   var bnkr  = await bnkrContractInstance.balanceOf(wallet_Address).call();
    //    
    //    var val = Object.values(bnkr);
     //   bnkr = window.tronWeb.toDecimal(val[0]);
    //    bnkr =bnkr /1000000;
     //   if(bnkr>0){
     //       var bnkruserShare = (bnkr/frozenSharesGlobal) * usersShareFrozen;
     //       $("#bnkrSharesText").html(number_to_2decimals(bnkr));
     //       if(bnkruserShare>=0.01){
     //           $('#bnkrShareUser').html(number_to_2decimals(bnkruserShare));
     //       }else{
     //           $('#bnkrShareUser').html('0.00');
     //       }
     //   }else{
     //       $('#bnkrSharesText').html('0.00');
     //   }
        
        //get USDT token balance 
     //   var usdtContractInfo = await tronWeb.trx.getContract(usdtContractAddress);
     //   usdtContractInstance = await tronWeb.contract(usdtContractInfo.abi.entrys, usdtContractInfo.contract_address);
     //   var usdt  = await usdtContractInstance.balanceOf(wallet_Address).call();
     //   var val = Object.values(usdt);
     //   usdt = window.tronWeb.toDecimal(val[0]);
     //   usdt =usdt /1000000;
     //   if(usdt>0){
     //       var usdtuserShare = (usdt/frozenSharesGlobal) * usersShareFrozen;   
     //       $("#usdtSharesText").html(number_to_2decimals(usdt));
     //       if(usdtuserShare>=0.01){
     //           $('#usdtShareUser').html(number_to_2decimals(usdtuserShare));
     //       }else{
     //           $('#usdtShareUser').html('0.00');
     //       }
            
     //   }else{
     //       $('#usdtSharesText').html('0.00');
     //   }
          //get TOPIA token balance 
        var topiaContractInfo = await tronWeb.trx.getContract(topiaContractAddress);
        topiaContractInstance = await tronWeb.contract(topiaContractInfo.abi.entrys, topiaContractInfo.contract_address);
        var topia  = await topiaContractInstance.balanceOf(wallet_Address).call();
        var val = Object.values(topia);
        topia = window.tronWeb.toDecimal(val[0]);
        topia =topia /100000000;
        if(topia){
            var topiauserShare = (topia/frozenSharesGlobal) * usersShareFrozen;   
            $("#topiaSharesText").html(number_to_2decimals(topia));
            if(topiauserShare>=0.01){
                $('#topiaShareUser').html(number_to_2decimals(topiauserShare));
            }else{
                $('#topiaShareUser').html('0.00');
            }
    
        }else{
            $('#topiaSharesText').html('0.00');
        }
        
        //get SHARES token balance 
    //    var shareContractInfo = await tronWeb.trx.getContract(shareContractAddress);
    //    shareContractInstance = await tronWeb.contract(shareContractInfo.abi.entrys, shareContractInfo.contract_address);
    //    var share  = await shareContractInstance.balanceOf(wallet_Address).call();
    //    var val = Object.values(share);
    //    share = window.tronWeb.toDecimal(val[0]);
    //    share =share /1000000;
    //    if(share){
    //        var shareuserShare = (share/frozenSharesGlobal) * usersShareFrozen;   
    //        $("#shareSharesText").html(number_to_2decimals(share));
    //        if(shareuserShare>=0.01){
    //            $('#shareShareUser').html(number_to_2decimals(shareuserShare));
    //        }else{
    //            $('#shareShareUser').html('0.00');
    //        }
    //
    //    }else{
    //        $('#shareSharesText').html('0.00');
    //    }
        
        //get FRAG token balance 
    //    var fragContractInfo = await tronWeb.trx.getContract(fragContractAddress);
    //    fragContractInstance = await tronWeb.contract(fragContractInfo.abi.entrys, fragContractInfo.contract_address);
    //    var frag  = await fragContractInstance.balanceOf(wallet_Address).call();
    //    var val = Object.values(frag);
    //    frag = window.tronWeb.toDecimal(val[0]);
    //    frag =frag /1000000000000000000;
    //    if(frag>0){
    //        var fraguserShare = (frag/frozenSharesGlobal) * usersShareFrozen;   
    //        $("#fragSharesText").html(number_to_2decimals(number_to_2decimals(frag)));
    //        if(fraguserShare>=0.01){
    //            $('#fragShareUser').html(number_to_2decimals(fraguserShare));
    //        }else{
    //            $('#fragShareUser').html('0.00');
    //        }
            
    //    }else{
    //        $('#fragSharesText').html('0.00');
    //    }
        
      
        //getting user avialable tokens dividends
    //    var swgShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRXandTRC10(global.userAddress,1002082).call();
     //   var val = Object.values(swgShareUserDividend);
    //    swgShareUserDividend = window.tronWeb.toDecimal(val[0]);
     //   swgShareUserDividend = swgShareUserDividend / 1000;
    //    $("#swgShareUserDividend").html(number_to_2decimals(swgShareUserDividend));
        
    //    var bttShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRXandTRC10(global.userAddress,1002000).call();
    //    var val = Object.values(bttShareUserDividend);
    //    bttShareUserDividend = window.tronWeb.toDecimal(val[0]);
    //    bttShareUserDividend = bttShareUserDividend / 1000000;
    //    $("#bttShareUserDividend").html(number_to_2decimals(bttShareUserDividend));

    //    var bnkrShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,bnkrContractAddress).call();
    //    var val = Object.values(bnkrShareUserDividend);
    //    bnkrShareUserDividend = window.tronWeb.toDecimal(val[0]);
    //    bnkrShareUserDividend = bnkrShareUserDividend / 1000000;
    //    $("#bnkrShareUserDividend").html(number_to_2decimals(bnkrShareUserDividend));

    //    var fragShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,fragContractAddress).call();
    //    var val = Object.values(fragShareUserDividend);
     //   fragShareUserDividend = window.tronWeb.toDecimal(val[0]);
     //   fragShareUserDividend = fragShareUserDividend / 1000000000000000000;
    //    $("#fragShareUserDividend").html(number_to_2decimals(fragShareUserDividend));
        
    //    var usdtShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,usdtContractAddress).call();
    //    var val = Object.values(usdtShareUserDividend);
    //    usdtShareUserDividend = window.tronWeb.toDecimal(val[0]);
    //    usdtShareUserDividend = usdtShareUserDividend / 1000000;
    //    $("#usdtShareUserDividend").html(number_to_2decimals(usdtShareUserDividend));
        
    //    var twxShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,twxContractAddress).call();
    //    var val = Object.values(twxShareUserDividend);
    //    twxShareUserDividend = window.tronWeb.toDecimal(val[0]);
    //    twxShareUserDividend = twxShareUserDividend / 1000000;
    //    $("#twxShareUserDividend").html(number_to_2decimals(twxShareUserDividend));
        
        var topiaShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,topiaContractAddress).call();
        var val = Object.values(topiaShareUserDividend);
        topiaShareUserDividend = window.tronWeb.toDecimal(val[0]);
        topiaShareUserDividend = topiaShareUserDividend / 100000000;
        $("#topiaShareUserDividend").html(number_to_2decimals(topiaShareUserDividend));
        
    //    var shareShareUserDividend  = await shareDividendContractInstance.userConfirmedDividendTRC20(global.userAddress,shareContractAddress).call();
    //    var val = Object.values(shareShareUserDividend);
    //    shareShareUserDividend = window.tronWeb.toDecimal(val[0]);
    //    shareShareUserDividend = shareShareUserDividend / 1000000;
    //    $("#shareShareUserDividend").html(number_to_2decimals(shareShareUserDividend));

}

async function shareProgressBar(){
     /*For getting the total minted tokens*/
    var sharetoMint = 1000000000;
    var totalMintedShares;
    var totalSupply  = await shareContractInstance.totalSupply().call();               
    var totalSupply = window.tronWeb.toDecimal(totalSupply);
    totalSupply = totalSupply /1000000;            
    if(totalSupply>sharetoMint){
        totalMintedShares = totalSupply%sharetoMint;
    }else{
        totalMintedShares =  totalSupply;    
    }
   
    $("#shares-jd-text").html(totalMintedShares.toFixed(2)+' / '+sharetoMint);  
    var share_progress = (totalMintedShares*100)/sharetoMint;
    //token progress bar 
    $('#shares-progress').css('cssText',"width: "+ share_progress + "% !important;");
   
}

//set timer for voucher panel
 $.getJSON(API_URL + "getSharesTime.php", function( data, status, xhr ) { 
      if(xhr.status==200){  
        var countDownDate = data;
        var y = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        if(distance==0){location.reload();}
        //comment line no 793 to remvoe 80 hours countdown and remove comment from line 794
        var hours = parseInt(Math.abs((distance /36e5)));
        //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));                
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(seconds<10){
            seconds = '0' + seconds ;
        }
        document.getElementById("sharesDividendCountdown").innerHTML = hours + ": " + minutes + ": " + seconds;
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(y);
            document.getElementById("sharesDividendCountdown").innerHTML = "EXPIRED";
        }
    }, 1000);   
    }
 });
 
 
 //burn voucher button
    
    $('#freezeShareBtn').click(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
             $('#dividend').modal('hide');
             $('body').addClass('modal-open');
        }
    });
    
    $('#showAllShares').click(function(){
        var shares = $('#myAvailableShares2').val();
        $('#sharesToFreeze').val(shares);
    });
    //burn voucher button code
$('#btnFreezeShares').click(async function(){
        var sharesAvailable = $('#myAvailableShares2').val();
        var shares = $('#sharesToFreeze').val();
        shares = parseFloat(shares);
        sharesAvailable = parseFloat(sharesAvailable);
       // console.log('vouchers available : ' + vouchersAvailable);
        //console.log('vouchers to burn : ' + vouchers);
        $('#freezeShares').modal('hide');
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setTimeout(function(){
                    $('#dividend').modal('show');
                    $('body').addClass('modal-open'); 
                },2000);
            }
         if(shares>0 && shares<=sharesAvailable){
            shares = shares * 1000000;
            shares = parseInt(shares);
            var result = shareContractInstance.freezeShares(shares).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             });
           // console.log(result);
             
            //if(result){
                alertify.success('Shares Frozen.');
                $('#dividend').modal('hide');
                $('#freezeShares').modal('hide');
                $('#freezesharesPopup').modal('hide');
                $('#myAvailableShares2').val(0.00);
                $('#myAvailableShares').html(0.00);
                setTimeout(function(){
                    $('#dividend').modal('show');
                      updateSharesData();
                  shareProgressBar();               
                },3000);
                 
            //}else{
               // alertify.error('Something went wrong, please try again');
           // }
        }else{
            alertify.error('Not enough shares available to Freeze.');
        }
                   
            
    });
    
 $('#sharesPopup').click(function(){
    updateSharesData();
    shareProgressBar();
    $('#sharesToFreeze').val('');
});

async function unFrozenSharesCountDown(){
     /*For getting the countdown for unfrozen tokens*/
        var myUnfrozenTokensTime  = await tokenContractInstance.frozenTopiaReleaseTime(global.userAddress).call();
        var val = Object.values(myUnfrozenTokensTime);
        var UnfrozenTime = window.tronWeb.toDecimal(val[0]);
        setInterval( function() { countDownTimer(UnfrozenTime) }, 1000);
}
function SharesCountDownTimer(UnfrozenTime) {
        let endDate = UnfrozenTime * 1000;
        let startDate = new Date();
        startDate = startDate.getTime();
        //document.writeln(startDate);
        let timeRemaining = parseInt((endDate - startDate) / 1000);
        
        if (timeRemaining >= 0) {
              days = parseInt(timeRemaining / 86400);
              timeRemaining = (timeRemaining % 86400);
              
              hours = parseInt(timeRemaining / 3600);
              timeRemaining = (timeRemaining % 3600);
              
              minutes = parseInt(timeRemaining / 60);
              timeRemaining = (timeRemaining % 60);
              
              seconds = parseInt(timeRemaining);
              hours = ("0" + hours).slice(-2);
              minutes = ("0" + minutes).slice(-2);
              seconds = ("0" + seconds).slice(-2);
              
             $("#unFreezeCountDown").html(hours + ":" + minutes +":" + seconds);
             
         }
}