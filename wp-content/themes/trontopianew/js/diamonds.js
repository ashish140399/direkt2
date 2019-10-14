var diamondContractInstance;
var ICOdiamondContractInstance;
var DivdiamondContractInstance;
var currentICO_Price=625;
const diamondContractAddress           =   'TXpSN9vd4VnSz8xvMhH7iabVaEtgWnfNiG';
const ICOdiamondContractAddress         =   'TTgY6xTE2mT2B5XAfesz6TP3jbFUfig4U2';
const diamondDividendContractAddress    =  'TFrynF47Q7JXarjy3Mk1TCQ1Yg3vWyL65x';

async function diamondsContractInit(){
	var diamondContractInfo = await tronWeb.trx.getContract(diamondContractAddress);
	diamondContractInstance = await tronWeb.contract(diamondContractInfo.abi.entrys, diamondContractInfo.contract_address);	
	
	var ICOdiamondContractInfo = await tronWeb.trx.getContract(ICOdiamondContractAddress);
	ICOdiamondContractInstance = await tronWeb.contract(ICOdiamondContractInfo.abi.entrys, ICOdiamondContractInfo.contract_address);	
	
	var divDiamondContractInfo = await tronWeb.trx.getContract(diamondDividendContractAddress);
	DivdiamondContractInstance = await tronWeb.contract(divDiamondContractInfo.abi.entrys, divDiamondContractInfo.contract_address);	
}

async function updateDiamondsData(){
	/*For getting the diamonds balance*/
	var diamonds  = await diamondContractInstance.balanceOf(global.userAddress).call();
    diamonds = Object.values(diamonds);
    diamonds = window.tronWeb.toDecimal(diamonds);
    diamonds = diamonds /1000000;
    if(diamonds>0){
        //diamonds = diamonds.toString();
        $("#myAvailableDiamonds").html(number_to_2decimals(diamonds));
        $("#myAvailableDiamonds2").val(diamonds);
        $('#diamondsBalance').html(diamonds);
    }else{
        $("#myAvailableDiamonds").html(0.00);
        $("#myAvailableDiamonds2").val(0.00);
        $('#diamondsBalance').html(0.00);
    }

    // dice game voucher rake
    var diamondsDividend = await DivdiamondContractInstance.getDividendPotential().call();
    diamondsDividend = Object.values(diamondsDividend);
    diamondsDividend = window.tronWeb.toDecimal(diamondsDividend)/1000000;
    $("#diamondsDividends").html(number_to_2decimals(diamondsDividend));
    $("#diamondsDividendsTotal").html(number_to_2decimals(diamondsDividend));
    
    //diamonds frozen total
     var diamondsFrozen = await diamondContractInstance.frozenDiamondsGlobal().call();
     var diamondsFrozen = Object.values(diamondsFrozen);
     var diamondsFrozen = window.tronWeb.toDecimal(diamondsFrozen)/1000000;
     $("#totalDiamondsFrozen").html(number_to_2decimals(diamondsFrozen));
     
     //diamonds frozen for user
     var usersDiamondFrozen = await diamondContractInstance.usersDiamondFrozen(global.userAddress).call();
     var usersDiamondFrozen = Object.values(usersDiamondFrozen);
     var usersDiamondFrozen = window.tronWeb.toDecimal(usersDiamondFrozen)/1000000;
     $("#myFrozenDiamonds").val(number_to_2decimals(usersDiamondFrozen));
     $("#myFrozenDiamonds2").html(number_to_2decimals(usersDiamondFrozen));
     
     // approx div code (getDividendPotential / totalFrozen) * usersFrozen
     var myAvailableDiamondsDividend = (diamondsDividend / diamondsFrozen) * usersDiamondFrozen;
     
    if(isNaN(myAvailableDiamondsDividend)){
         $('#approxUserDiamondDividends').html(0.00);
      }else{
        $("#approxUserDiamondDividends").html(number_to_2decimals(myAvailableDiamondsDividend));
      }
      
    //getting user confirmed dividend trx
     var diamondsDividend = await DivdiamondContractInstance.userConfirmedDividendTRX(global.userAddress).call();
     var diamondsDividend = Object.values(diamondsDividend);
     var diamondsDividend = window.tronWeb.toDecimal(diamondsDividend)/1000000;
     $("#diamondsDividendConfirmed").html(number_to_2decimals(diamondsDividend));
    
}

async function diamondsProgressBar(){
	//diamonds progress code
   // for getting max supply 
    var maxSupply  = await diamondContractInstance.maxSupply().call();               
    maxSupply = window.tronWeb.toDecimal(maxSupply);
    maxSupply = 20958.871956;
    
    // for getting ICO total sold diamonds
     var totalDiamondSold  = await ICOdiamondContractInstance.totalDiamondSold().call();               
     totalDiamondSold = window.tronWeb.toDecimal(totalDiamondSold);
     totalDiamondSold = totalDiamondSold /1000000;
    
   /*For getting the total diamonds minted life time*/
    var totalMintedLifetime  = await diamondContractInstance.totalMintedLifetime().call();               
    totalMintedLifetime = window.tronWeb.toDecimal(totalMintedLifetime);
    totalMintedLifetime = 20958.871956;
    var totalDiamonds = totalMintedLifetime + totalDiamondSold;
    totalDiamonds = 20958.871956;
    
    $("#diamond-jd-text").html(totalDiamonds.toFixed(2)+' / '+maxSupply.toFixed(2)); 
    var diamond_progress = (totalDiamonds/maxSupply)*100;
    //voucher progress bar 
    $('#diamond-progress').css('cssText',"width: "+ diamond_progress + "% !important;");
}


//withdraw diamonds dividend
$('#withdrawDiamondsDividendBtn').click(async function(){
   var result =  DivdiamondContractInstance.withdrawDividendsEverything().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             });
            //if(result){
               // alertify.success('Dividend Withdrawn Successful.');
                $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                      updateDiamondsData();
                        diamondsProgressBar();                 
                },3000);
            //}else{
            //    alertify.error("No Diamonds Available to Unfreeze");
        //    }
});

//unfreeze diamonds 
    $('#unfreezeDiamondsBtn').click(async function(){
        var diamonds = $('#myFrozenDiamonds').val();
        if(diamonds > 0){
            var result =  diamondContractInstance.unfreezeDiamonds().send({
                shouldPollResponse: true,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             })
           // if(result.result==true){
                //alertify.success('Diamonds Unfreeze Successful');
                 $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                      updateDiamondsData();
                        diamondsProgressBar();                 
                },3000);
            //}
        }
        else{
            alertify.error("No Diamonds Available to Unfreeze");
        }
    });
//burn voucher button
    
    $('#freezeDiamondsBtn').click(function(){
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
             $('#dividend').modal('hide');
        }
    });
    
    $('#showAllDiamonds').click(function(){
        var diamonds = $('#diamondsBalance').html();
        $('#diamondsToFreeze').val(diamonds);
    });
    //burn voucher button code
$('#btnFreezeDiamonds').click(async function(){
        var diamondsAvailable = $('#myAvailableDiamonds2').val();
        var diamonds = $('#diamondsToFreeze').val();
        diamonds = parseFloat(diamonds);
        diamondsAvailable = parseFloat(diamondsAvailable);
       // console.log('vouchers available : ' + vouchersAvailable);
        //console.log('vouchers to burn : ' + vouchers);
        $('#freezeDiamonds').modal('hide');
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                setTimeout(function(){
                    $('#dividend').modal('show');
                    $('body').addClass('modal-open'); 
                },2000);
            }
         if(diamonds>0 && diamonds<=diamondsAvailable){
            diamonds = diamonds * 1000000;
            diamonds = parseInt(diamonds);
            var result =  diamondContractInstance.freezeDiamond(diamonds).send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: 0,
                from: global.userAddress
             });
            //console.log(result.success);
             
            //if(result==true){
                //alertify.success('Diamonds Frozen.');
                $('#dividend').modal('hide');
                setTimeout(function(){
                    $('#dividend').modal('show');
                      updateDiamondsData();
                        diamondsProgressBar();                 
                },3000);
            //}else{
            //    alertify.error('Something went wrong, please try again');
        //    }
        }else{
            alertify.error('Not enough Diamonds available to Freeze.');
        }
                   
            
    });
    
 $('#diamnodsPopup').click(function(){
    updateDiamondsData();
    diamondsProgressBar();
    //updateICODiamondsData();
    $('#diamondsToFreeze').val('');
});

$('#buyDiamondsPopup, #diamondsBuyPopup2').click(function(){
     updateDiamondsData();
     diamondsProgressBar();
     //updateICODiamondsData();
});

$('#diamondsToBuy').keyup(function() {
    var diamondsToBuy = $(this).val();
    if(isNaN(diamondsToBuy)){
        alertify.error('Input must be Numeric');
        $("#diamondsToBuy").val(0.00);
        $('#buyDiamondFinalPrice').val(0.00);
   }else if(diamondsToBuy < 0){
        alertify.error('Buy Price must be Positive');
        $("#diamondsToBuy").val(0.00);
        $('#buyDiamondFinalPrice').val(0.00);
   }else{
    
   }
   $('#buyDiamondFinalPrice').val(currentICO_Price * diamondsToBuy);
 
});

//ico contract data for diamond panel
async function updateICODiamondsData(){
	/*For getting the current ico prices*/
    var currentIcoDetail  = await ICOdiamondContractInstance.currentIcoDetail().call();
    var val = Object.values(currentIcoDetail);
    var val1 = window.tronWeb.toDecimal(val[0]);
    var val2 = window.tronWeb.toDecimal(val[1]);
    var nextRound = parseInt(val1)+1;
    $('#icoBuyDiamondPrice').html(val2);
    $('#icoCurrentRoundeNumber').html(val1);
    $('#icoNextRoundNumber').html(nextRound);
    $('#DiamondCurrentPrice').html(val2);
    currentICO_Price = val2;
    $('#buyDiamondFinalPrice').val(val2);
    var totalDiamondSold = await ICOdiamondContractInstance.totalDiamondSold().call();
    totalDiamondSold = Object.values(totalDiamondSold);
    totalDiamondSold = window.tronWeb.toDecimal(totalDiamondSold)/1000000;
    totalDiamonds = 5000;
    
    var total = totalDiamondSold%totalDiamonds;
    total = total.toFixed(2);
    $('#ico-diamond-jd-text').html(total+' / ' + totalDiamonds);

    var ico_diamond_progress = (total/totalDiamonds)*100;
    //voucher progress bar 
    $('#diamond-progress2').css('cssText',"max-width: "+ ico_diamond_progress + "% !important;");
    
    
    //get rounds data for diamonds
    //round 1
    var priceRound1 = await ICOdiamondContractInstance.priceRound1().call();
    priceRound1 = Object.values(priceRound1);
    priceRound1 = window.tronWeb.toDecimal(priceRound1);
    $("#priceRound1").html(priceRound1);
    
    //round 2
    var priceRound2 = await ICOdiamondContractInstance.priceRound2().call();
    priceRound2 = Object.values(priceRound2);
    priceRound2 = window.tronWeb.toDecimal(priceRound2);
    $("#priceRound2").html(priceRound2);
    
    //round 3
    var priceRound3 = await ICOdiamondContractInstance.priceRound3().call();
    priceRound3 = Object.values(priceRound3);
    priceRound3 = window.tronWeb.toDecimal(priceRound3);
    $("#priceRound3").html(priceRound3);
    
    //round 4
    var priceRound4 = await ICOdiamondContractInstance.priceRound4().call();
    priceRound = Object.values(priceRound4);
    priceRound4 = window.tronWeb.toDecimal(priceRound4);
    $("#priceRound4").html(priceRound4);
    
    if(nextRound==1){
        $('#icoBuyDiamondPriceNext').html(priceRound1);
    }else if(nextRound==2){
        $('#icoBuyDiamondPriceNext').html(priceRound2);
    }else if(nextRound==3){
        $('#icoBuyDiamondPriceNext').html(priceRound3);
    }else if(nextRound==4){
        $('#icoBuyDiamondPriceNext').html(priceRound4);
    }else{
        $('#icoBuyDiamondPriceNext').html(priceRound4);
    }
    

}


//button buy diamond code for contract call
$('#btnBuyDiamondFinal').click(async function(){
   var buyDiamondFinalPrice = $('#buyDiamondFinalPrice').val();
  if(isNaN(buyDiamondFinalPrice)){
        alertify.error('Input must be Numeric');
  }else if(buyDiamondFinalPrice < 0){
        alertify.error('Buy Price must be Positive');
  }else{
  }
   var mytrxBalance = $('#trxBalance').val();
   
    //if(mytrxBalance>0 && mytrxBalance<=buyDiamondFinalPrice){
            buyDiamondFinalPrice = buyDiamondFinalPrice * 1000000;
            var result = await ICOdiamondContractInstance.buyDiamonds().send({
                shouldPollResponse: true,
                //feeLimit: 1000000000,
                feeLimit: 5000000,
                callValue: buyDiamondFinalPrice,
                from: global.userAddress
             });
   
             
            if(result){
               // alertify.success('Diamonds Bought Successfully.');
                $('#diamondsBuyPopup').modal('hide');
                 setTimeout(function(){
                     updateDiamondsData();
                     diamondsProgressBar();              
                },3000);
            }else{
                alertify.error('Something went wrong, please try again');
            }
        // }else{
        //     alertify.error('Not enough Balance to Buy Diamonds.');
        // }
    
});
 //set timer for voucher panel
 $.getJSON( API_URL + "getVoucherTime.php", function( data, status, xhr ) { 
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
        document.getElementById("diamondDividendCountdown").innerHTML = hours + ": " + minutes + ": " + seconds;
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(y);
            document.getElementById("diamondDividendCountdown").innerHTML = "EXPIRED";
        }
    }, 1000);   
    }
 });

