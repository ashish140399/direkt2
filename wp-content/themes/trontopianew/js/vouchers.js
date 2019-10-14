var voucherContractInstance;
const voucherContractAddress           =   'TTje3yoadUpuHrVnm9Bju4njBv3vm4WRrQ';
async function voucherContractInit(){
	var voucherContractInfo = await tronWeb.trx.getContract(voucherContractAddress);
	voucherContractInstance = await tronWeb.contract(voucherContractInfo.abi.entrys, voucherContractInfo.contract_address);	
	//voucher contract code starts
    /*For getting the total vouchers*/
     var VtotalSupply  = await voucherContractInstance.totalSupply().call();               
     VtotalSupply = window.tronWeb.toDecimal(VtotalSupply);
     VtotalSupply = VtotalSupply /1000000;
     $('#vouchersMined').html(VtotalSupply.toFixed(2));
     var VmintingIncrementer  = await voucherContractInstance.mintingPriceIncrementer(ultimateDiceContractAddress).call(); 
     VmintingIncrementer = window.tronWeb.toDecimal(VmintingIncrementer);
     
     var VmintingBasePrice  = await voucherContractInstance.mintingBasePrice(ultimateDiceContractAddress).call(); 
     VmintingBasePrice = window.tronWeb.toDecimal(VmintingBasePrice);
     var Vstage2 = parseInt(VmintingBasePrice)+parseInt(VmintingIncrementer);
     $('#v-stageTRX').html(VmintingBasePrice);
     $('#v-stageTRX2').html(Vstage2); 
         
    //voucher contract code ends
}

async function updateVouchersData(){
	/*For getting the voucher balance*/
    var vouchers  = await voucherContractInstance.balanceOf(global.userAddress).call();
    var val_v = Object.values(vouchers);
    var voucherNumber = window.tronWeb.toDecimal(val_v[0]);
    voucherNumber = voucherNumber /1000000;
    var voucherNumber2 = voucherNumber;
    if(voucherNumber>0){
        voucherNumber = voucherNumber.toString(); 
        //tokenNumber = tokenNumber.slice(0, (tokenNumber.indexOf("."))+3);
        $("#myAvailableVoucher").html(number_to_2decimals(voucherNumber));
        $("#myAvailableVoucher3").html(number_to_2decimals(voucherNumber));
        $("#myAvailableVoucher2").val(voucherNumber);
        $('#voucherBalance').html(voucherNumber);
        $('#voucherBalance2').html(voucherNumber);
    }else{
        $("#myAvailableVoucher").html(0.00);
        $("#myAvailableVoucher2").val(0.00);
        $("#myAvailableVoucher3").html(0.00);
        $('#voucherBalance').html(0.00);
        $('#voucherBalance2').html(0.00);
    }

    // dice game voucher rake
    var voucherDivRake = await voucherContractInstance.getDividendPotential().call();
    var val_VoucherRake = Object.values(voucherDivRake);
    var voucherDivRake = window.tronWeb.toDecimal(val_VoucherRake)/1000000;
    $("#voucherDividends").val(number_to_2decimals(voucherDivRake));
    
    //get voucher available dividend 
    var availableVoucherDividend = await voucherContractInstance.getDividendPotential().call();
    var val_Voucher = Object.values(availableVoucherDividend);
    var voucherDivNumber = window.tronWeb.toDecimal(val_Voucher)/1000000;
    //$("#voucherDividends").val(number_to_2decimals(voucherDivNumber));
     
    //get divPercentageSUN
    var divPercentageSUN = await voucherContractInstance.divPercentageSUN().call();
    var val_divPerc = Object.values(divPercentageSUN);
    var val_divPerc = window.tronWeb.toDecimal(val_divPerc)/1000000;
    
    //end voucher dividend code
    //voucher burned total
    var voucherBurned = await voucherContractInstance.vouchersBurnedCurrentPeriod().call();
    var val_VoucherBurned = Object.values(voucherBurned);
    var voucherBurned = window.tronWeb.toDecimal(val_VoucherBurned)/1000000;
    $("#totalVoucherBurned").html(number_to_2decimals(voucherBurned));
    
    // get total vouchers minted
    var voucherTotalSupply = await voucherContractInstance.totalSupply().call();
    var val_VoucherTotalSupply = Object.values(voucherTotalSupply);
    var voucherTotalSupply = window.tronWeb.toDecimal(val_VoucherTotalSupply)/1000000;
    $('#vouchersMined').html(voucherTotalSupply.toFixed(2));
    //get user vouchers burned
    var userVoucherBurned = await voucherContractInstance.usersVoucherBurnedAmount(global.userAddress).call();
    var val_UaserVoucherBurned = Object.values(userVoucherBurned);
    var userVoucherBurned = window.tronWeb.toDecimal(val_UaserVoucherBurned)/1000000;
    var approxUserVoucherDividends = voucherDivNumber / voucherBurned * (userVoucherBurned);
    if(isNaN(approxUserVoucherDividends)){
          $('#approxUserVoucherDividends').html(0.00);
    }else{
        $("#approxUserVoucherDividends").html(number_to_2decimals(approxUserVoucherDividends));
    }

    //get dividend confirmed 
    var voucherDivConfirmed = await voucherContractInstance.getDividendConfirmed(global.userAddress).call();
    var val_VoucherDivConfirmed = Object.values(voucherDivConfirmed);
    var myAvailableVoucherDividend = window.tronWeb.toDecimal(val_VoucherDivConfirmed)/1000000;
    $("#myAvailableVoucherDividend").val(number_to_2decimals(myAvailableVoucherDividend));
    $("#myAvailableVoucherDividendText").html(number_to_2decimals(myAvailableVoucherDividend));
    $('#vouchersBurned').html(userVoucherBurned.toFixed(2));
    //pre Burn Estimate code
        var preBurnEstimate = voucherDivNumber / (voucherBurned + voucherNumber2)*voucherNumber2;
       
      if(isNaN(preBurnEstimate)){
          $('#preBurnEstimate').html(0);
      }else{
          $('#preBurnEstimate').html(preBurnEstimate.toFixed(2));   
      }
       
    //pre burn estimate code ends
}

async function voucherProgressBar(){
	//voucher progress code
    /*For getting the total vouchers*/
    var VBurnedAllTime  = await voucherContractInstance.vouchersBurnedAllTime().call();               
    //VBurnedAllTime = window.tronWeb.toDecimal(VBurnedAllTime);
    VBurnedAllTime = VBurnedAllTime /1000000;
    
   // console.log(VBurnedAllTime);
    var VMintedLifeTime  = await voucherContractInstance.totalMintedLifetime().call();               
    //VMintedLifeTime = window.tronWeb.toDecimal(VMintedLifeTime);
    VMintedLifeTime = VMintedLifeTime /1000000;
    //console.log(VMintedLifeTime);
    
    $("#voucher-jd-text").html(VBurnedAllTime.toFixed(2)+' / '+VMintedLifeTime.toFixed(2)); 
    var voucher_progress = (VBurnedAllTime/VMintedLifeTime)*100;
    //voucher progress bar 
    $('#voucher-progress').css('cssText',"width: "+ voucher_progress + "% !important;");
}

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
            //if(result){
                //alertify.success('Dividend Withdrawal Successful');
                $('#dividend').modal('hide');
                setTimeout(function(){
                   // showData();        
                   $('#dividend').modal('show');
                   updateVouchersData();
                   voucherProgressBar();
                },3000);
            //}
        }
        else{
            alertify.error("Insufficient Dividend Available");
        }
    });
//burn voucher button
    
    $('#burnVoucher').click(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
             $('#dividend').modal('hide');
             $('body').addClass('modal-open');
        }
    });
    $('#burnVoucher2').click(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
             $('#pls-volt').modal('hide');
        }
        $('#pls-volt').hide();
    });
    $('#showAllVouchers').click(function(){
        var vouchers = $('#myAvailableVoucher2').val();
        $('#voucherToBurn').val(vouchers);
    });
    $('#showAllVouchers2').click(function(){
        var vouchers = $('#myAvailableVoucher2').val();
        $('#voucherToBurn2').val(vouchers);
    });
    //burn voucher button code
$('#btnBurnVoucher').click(async function(){
        var voucherBurnType = $('#voucherBurnType').val();
        var vouchersAvailable = $('#myAvailableVoucher2').val();
        var vouchers = $('#voucherToBurn').val();
        vouchers = parseFloat(vouchers);
        vouchersAvailable = parseFloat(vouchersAvailable);
       // console.log('vouchers available : ' + vouchersAvailable);
        //console.log('vouchers to burn : ' + vouchers);
        $('#burnVoucher').modal('hide');
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setTimeout(function(){
                    $('#dividend').modal('show');
                    $('body').addClass('modal-open'); 
                },2000);
            }
         if(vouchers>0 && vouchers<=vouchersAvailable){
            vouchers = vouchers * 1000000;
            vouchers = parseInt(vouchers);
            var result =  voucherContractInstance.burnVoucher(vouchers,voucherBurnType).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             });
            //console.log(result.success);
             
           // if(result){
               // alertify.success('Vouchers Burned.');
                $('#dividend').modal('hide');
                //updateVouchersData();
                //voucherProgressBar();
                $('#voucherToBurn').val('');
                $('#burnVoucher').modal('hide');
                 setTimeout(function(){
                  $('#dividend').modal('show');
                  updateVouchersData();
                   voucherProgressBar();
               },3000);
           // }else{
           //     alertify.error('Something went wrong, please try again');
            //}
        }else{
            alertify.error('Not enough vouchers available to Burn.');
        }
                   
            
    });
//burn voucher button vault code
$('#btnBurnVoucher2').click(async function(){
        var voucherBurnType = 2;
        var vouchersAvailable = $('#myAvailableVoucher2').val();
        var vouchers = $('#voucherToBurn2').val();
        vouchers = parseFloat(vouchers);
        vouchersAvailable = parseFloat(vouchersAvailable);
       // console.log('vouchers available : ' + vouchersAvailable);
        //console.log('vouchers to burn : ' + vouchers);
        $('#burnVoucher2').modal('hide');
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setTimeout(function(){
                    $('#pls-volt').modal('show');
                },2000);
            }
         if(vouchers>0 && vouchers<=vouchersAvailable){
            vouchers = vouchers * 1000000;
            vouchers = parseInt(vouchers);
            var result =  voucherContractInstance.burnVoucher(vouchers,voucherBurnType).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             });
            //console.log(result.success);
             
            //if(result){
              //  alertify.success('Vouchers Burned.');
                $('#pls-volt').modal('hide');
                $('#burnVoucher').modal('hide');
                $('#voucherToBurn').val('');
                 setTimeout(function(){
                  $('#dividend').modal('show');
                  updateVouchersData();
                   voucherProgressBar();
               },3000);
           // }else{
           //     alertify.error('Something went wrong, please try again');
           // }
        }else{
            alertify.error('Not enough vouchers available to Burn.');
        }
                   
            
    });

 //set timer for voucher panel
//  $.getJSON( API_URL + "getVoucherTime.php", function( data, status, xhr ) { 
//       if(xhr.status==200){  
//         var countDownDate = data;
//         var y = setInterval(function() {
//         // Get todays date and time
//         var now = new Date().getTime();
//         // Find the distance between now and the count down date
//         var distance = countDownDate - now;
//         if(distance==0){location.reload();}
//         //comment line no 793 to remvoe 80 hours countdown and remove comment from line 794
//         var hours = parseInt(Math.abs((distance /36e5)));
//         //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));                
//         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//         if(seconds<10){
//             seconds = '0' + seconds ;
//         }
//         document.getElementById("voucherDividendCountdown").innerHTML = hours + ": " + minutes + ": " + seconds;
        
//         // If the count down is over, write some text 
//         if (distance < 0) {
//             clearInterval(y);
//             document.getElementById("voucherDividendCountdown").innerHTML = "EXPIRED";
//         }
//     }, 1000);   
//     }
//  });

//  $('#voucherPopup').click(function(){
//     updateVouchersData();
//     voucherProgressBar();
//     $('#voucherToBurn').val('');
// });

//top voucher burners data		
 function topVoucherBurners(){
        $.get(API_URL + "voucherBurners.php", function(data, status,xhr){		
            if(xhr.status==200){
            data = JSON.parse(data);		
            if(data.result==true){		
                var resultburners = data.data;		
                var counterX = 0;		
                var rankVariable;		
                var burnersLeaderboardHTML = ' <li class="head-at"> <div class="row">  <div class="col-md-2 col-sm-2 col-xs-2">      <div class="head-th">   <p>Rank</p>   </div>   </div>   <div class="col-md-5 col-sm-5 col-xs-5">    <div class="head-th">         <p>Player</p>     </div>      </div>     <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">     <p>Total Burned</p>  </div>     </div>     <div class="col-md-2 col-sm-2 col-xs-2">     <div class="head-th">    <p>Prize</p>   </div>   </div>    </div>  </li>';		
                
                $.each(resultburners, function(key, obj) {		
                    key = parseInt(key)+1;		
                    var payout = 0;		
                    //code for the 1-2-3 ranks		
                    if(counterX==0){		
                        rankVariable = '<div class="head-th number-b act1"> <img src="images/ranks/leaders1.png" height="30" width="30" alt=""> </div>';		
                    }else if(counterX==1){		
                        rankVariable = ' <div class="head-th number-b act2"> <img src="images/ranks/leaders2.png" height="30" width="30" alt=""> </div>';		
                    }else if(counterX==2){		
                        rankVariable = ' <div class="head-th number-b act3">  <img src="images/ranks/leaders3.png" height="30" width="30" alt=""> </div>';		
                    }else{		
                        rankVariable = '<div class="head-th number-b"> <p>'+ (counterX + 1) +'</p></div>';		
                    }		
                    //let user = getUserAddress(tronWeb.address.fromHex(obj.user));		
                    let user = obj.user;		
                    var color = obj.color;		
                    var level = obj.level;		
                    if(level==9999){		
                        level = " [Lvl MOD]";		
                    }else{		
                        level = " [Lvl " + obj.level + "]";		
                    }		
                   
                    user = '<span style="color:'+color+'">'+user+level+'</span>';		
                    burnersLeaderboardHTML += ' <li class="dt-tbs">     <div class="row">    <div class="col-md-2 col-sm-2 col-xs-2">    '+ rankVariable +'  </div>   <div class="col-md-5 col-sm-5 col-xs-5">      <div class="head-th">   <p> '+ user +' </p>    </div>     </div>  <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">   <p>'+ obj.vouchers +'<br>Vouchers</p>    </div>    </div>   <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th poit">  <p>'+obj.reward+' <span style="font-size:11px;">Vouchers</span></p>   </div>   </div>   </div>   </li> ';		
                    counterX++;		
                });		
                		
                $("#burnersLeaderboard").html(burnersLeaderboardHTML); 		
                		
            }else{		
                //$("#burnersLeaderboard").html(data.msg);  
            }
        }
        });
 }