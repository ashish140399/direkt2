var tokenContractInstance;
const tokenContractAddress             =   'TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8';
async function tokenContractInit(){
	 var tokenContractInfo = await tronWeb.trx.getContract(tokenContractAddress);
     tokenContractInstance = await tronWeb.contract(tokenContractInfo.abi.entrys, tokenContractInfo.contract_address);

     /*For getting the total minted tokens*/
     var totalSupply  = await tokenContractInstance.totalSupply().call();               
     totalSupply = window.tronWeb.toDecimal(totalSupply);
     totalSupply = totalSupply /100000000;
     /*get stage and calculate TRX for wagers*/     
     var stage = parseInt(totalSupply/1000000);
     stageCount(stage);
}

async function updateTokenData(){
    /*For getting the tokens balance*/
        var myTotalToken =0;
       
        var tokens  = await tokenContractInstance.balanceOf(global.userAddress).call();
        var val = Object.values(tokens);
        var tokenNumber = window.tronWeb.toDecimal(val[0]);
        tokenNumber =tokenNumber /100000000;
        if(tokenNumber>0){
            tokenNumber = tokenNumber.toString(); 
            //tokenNumber = tokenNumber.slice(0, (tokenNumber.indexOf("."))+3);
            if(parseFloat(tokenNumber)>0.01){
                $("#myAvailableToken2").html(number_to_2decimals(tokenNumber));
                $("#myAvailableToken3").val(tokenNumber);
                $('#tokenBalance').html(tokenNumber.slice(0, (tokenNumber.indexOf("."))+9));
            }else{
                $("#myAvailableToken2").html('0.00');
                $("#myAvailableToken3").val('0');
                $('#tokenBalance').html('0');
            }
            
        }else{
            $("#myAvailableToken2").html(0.00);
            $("#myAvailableToken3").val(0.00);
            $('#tokenBalance').html(0.00);
        }

        myTotalToken = myTotalToken + parseFloat(tokenNumber);
        
        /* For getting user available tokens to  */
        var userAvailableToken  = await tokenContractInstance.displayAvailabletoWithdrawTOPIA().call();
        var val = Object.values(userAvailableToken);
        var userTokensAvailable = window.tronWeb.toDecimal(val[0]);
        userTokensAvailable = userTokensAvailable / 100000000;
        if(parseFloat(userTokensAvailable)>0.01){
            userTokensAvailable = userTokensAvailable.toString(); 
            $("#myAvailableToken").html(number_to_2decimals(userTokensAvailable));
        }else{
            $("#myAvailableToken").html("0.00");
        }

        var frozenTokens  = await tokenContractInstance.frozenTopia(global.userAddress).call();
        var val = Object.values(frozenTokens);
        var frozentokenNumber = window.tronWeb.toDecimal(val[0]);
        frozentokenNumber = frozentokenNumber / 100000000;
        if(parseFloat(frozentokenNumber)>0.01){
            $("#myFreezeToken").val(number_to_2decimals(frozentokenNumber));
            $("#myFreezeToken2").html(number_to_2decimals(frozentokenNumber));
        }else{
            $("#myFreezeToken").val('0');
            $("#myFreezeToken2").html('0.00');
        }

        var myUnfrozenTokens  = await tokenContractInstance.frozenTopiaReleaseAmount(global.userAddress).call();
        var val = Object.values(myUnfrozenTokens);
        var myUnfrozentokenNumber = window.tronWeb.toDecimal(val[0]);
        myUnfrozentokenNumber = myUnfrozentokenNumber /100000000;
        $("#myUnFrozenTopia").html(myUnfrozentokenNumber);
        myTotalToken = myTotalToken + myUnfrozentokenNumber + frozentokenNumber;
        myTotalToken = myTotalToken.toString(); 
        if(myUnfrozentokenNumber>0){ $('#frzDiv').show();}
        //myTotalToken = myTotalToken.slice(0, (myTotalToken.indexOf("."))+3);
        $('#myTotalToken').html(number_to_2decimals(myTotalToken));  
        $('#myTotalToken2').html(number_to_2decimals(myTotalToken)); 
        if(myUnfrozentokenNumber>0){ $('#frzDiv').show();}


}

async function displayTokenData(){
        /*For getting the total frozen tokens*/
        var myTotalToken2 =0;
        var FreezeTierPercentageColor;
        var FreezeTierPercentage;
        var tokens  = await tokenContractInstance.balanceOf(global.userAddress).call();
        var val = Object.values(tokens);
        var tokenNumber = window.tronWeb.toDecimal(val[0]);
        tokenNumber =tokenNumber /100000000;
        myTotalToken2 = myTotalToken2 + parseFloat(tokenNumber);

        var totalfrozenTokens  = await tokenContractInstance.frozenTopiaGlobal().call();
        var val = Object.values(totalfrozenTokens);
        var totalfrozentokenNumber = window.tronWeb.toDecimal(val[0]);
        totalfrozentokenNumber = totalfrozentokenNumber / 100000000;
        totalfrozentokenNumber = totalfrozentokenNumber.toString();
        //totalfrozentokenNumber = totalfrozentokenNumber.slice(0, (totalfrozentokenNumber.indexOf("."))+3);
        $("#totalFrozenTopia").html(number_to_2decimals(totalfrozentokenNumber)); 

        var frozenTokens  = await tokenContractInstance.frozenTopia(global.userAddress).call();
        var val = Object.values(frozenTokens);
        var frozentokenNumber = window.tronWeb.toDecimal(val[0]);
        frozentokenNumber = frozentokenNumber / 100000000;

        var availableDividend = await divContractInstance.displayAvailableDividendALL().call();
        var val = Object.values(availableDividend);
        var divNumber = window.tronWeb.toDecimal(val[1])/1000000;

        if(val[0]==false){ 
            divNumber = '- '+ divNumber;
        }else{
            divNumber = divNumber;    
        }

        var userFreezeTierAndAmount  = await tokenContractInstance.userFreezeTierAndAmount(global.userAddress).call();  
        var val = Object.values(userFreezeTierAndAmount);             
        var freezeTierLevel = window.tronWeb.toDecimal(val[0]);

         if(freezeTierLevel==0){
            FreezeTierPercentage = 0.75;
            FreezeTierPercentageColor = "#cd7f32";      //for bronze tier
        }
        if(freezeTierLevel==1){
            FreezeTierPercentage = 0.85;
            FreezeTierPercentageColor = "#D3D3D3";      //for silver tier
        }
        if(freezeTierLevel==2){
            FreezeTierPercentage = 1.00;
            FreezeTierPercentageColor = "#FFD700";      //for gold tier
        }
        myTotalToken2 = myTotalToken2 + parseFloat(frozentokenNumber);
        let myFutureDividend = (divNumber /totalfrozentokenNumber )* frozentokenNumber;
        myFutureDividend = myFutureDividend * FreezeTierPercentage;
        if(isNaN(myFutureDividend)) {myFutureDividend=0;}
        myFutureDividend = myFutureDividend.toString(); 
        $("#approxUserDividends").html( '<span style="color:#2df88c;" >'+ number_to_2decimals(myFutureDividend)+' </span> '+' <span style="color:'+FreezeTierPercentageColor+';"> '+'('+'x'+FreezeTierPercentage+' '+' '+'Tier'+') </span>');
    



}
async function tokenProgressBar(){
     /*For getting the total minted tokens*/
    var tokentoMint = 1000000;
    var totalSupply  = await tokenContractInstance.totalSupply().call();               
    var totalSupply = window.tronWeb.toDecimal(totalSupply);
    totalSupply = totalSupply /100000000;            
    if(totalSupply>tokentoMint){
        totalMintedToken = totalSupply%tokentoMint;
    }else{
        totalMintedToken =  totalSupply;    
    }
   
    $("#ante-jd-text").html(totalMintedToken.toFixed(2)+' / '+tokentoMint);  
    var topia_progress = (totalMintedToken*100)/tokentoMint;
    //token progress bar 
    $('#topia-progress').css('cssText',"width: "+ topia_progress + "% !important;");
    var stage = parseInt(totalSupply/1000000);
    stageCount(stage);
}

async function unFrozenCountDown(){
     /*For getting the countdown for unfrozen tokens*/
        var myUnfrozenTokensTime  = await tokenContractInstance.frozenTopiaReleaseTime(global.userAddress).call();
        var val = Object.values(myUnfrozenTokensTime);
        var UnfrozenTime = window.tronWeb.toDecimal(val[0]);
        setInterval( function() { countDownTimer(UnfrozenTime) }, 1000);
}
function countDownTimer(UnfrozenTime) {
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

async function currentFreezeTier(){
    //to display current Freeze tiers
    // Tier 0 Default 75% of div pool - Bronze
    // Tier 1 30 days frozen 85% of div pool - Silver
    // Tier 2 60 days frozen 100% of div pool - Gold
    var userFreezeTierAndAmount  = await tokenContractInstance.userFreezeTierAndAmount(global.userAddress).call();  
    var val = Object.values(userFreezeTierAndAmount);             
    var freezeTierLevel = window.tronWeb.toDecimal(val[0]);

    var freezeTierTime  = await tokenContractInstance.freezeTierTime(global.userAddress).call();  
    var val = Object.values(freezeTierTime);             
    var freezeTierTime = window.tronWeb.toDecimal(val[0]);
    //changing colors of FreezeTierPercentage
    var FreezeTierPercentageColor;
    var FreezeTierPercentage;
    var freeze_text;
    var complete_to_days;
    var till_what_reward;
    var freeze_left_image='images/freeze1.png';
    var freeze_right_image='images/freeze2.png';
    if(freezeTierLevel==0){
        FreezeTierPercentage = 0.75;
        FreezeTierPercentageColor = "#cd7f32";      //for bronze tier
        freeze_text = 'Bronze Stake(75% Reward)';
        complete_to_days = 30;
        till_what_reward = 'Till Silver Stake(85% Reward)';
        var freeze_left_image='images/freeze1.png';
        var freeze_right_image='images/freeze2.png';
    }
    if(freezeTierLevel==1){
        FreezeTierPercentage = 0.85;
        FreezeTierPercentageColor = "#D3D3D3";      //for silver tier
        freeze_text = 'Silver Stake(85% Reward)';
        complete_to_days = 60;
        till_what_reward = 'Till Gold Stake(100% Reward)';
        var freeze_left_image='images/freeze2.png';
        var freeze_right_image='images/freeze3.png';
    }
    if(freezeTierLevel==2){
        FreezeTierPercentage = 1.00;
        FreezeTierPercentageColor = "#FFD700";      //for gold tier
        freeze_text = 'Gold Stake(100% Reward)';
        complete_to_days = 60;
        till_what_reward = 'Gold Stake(100% Reward)';
        var freeze_left_image='images/freeze3.png';
        var freeze_right_image='images/freeze3.png';
    }
    var days = 0;
    if(freezeTierTime!=0){
        $('#freeze-tier-lvl').html(freeze_text);
        var dt = new Date().getTime();
        dt = parseInt(dt/1000);
        var dist = dt - freezeTierTime;
        days = Math.floor(dist / (3600*24));
        $('#days').html(days + ' Days');
        $('#days-to-complete').html(complete_to_days + ' Days');
        $('#till_what_reward').html(till_what_reward);
        if(days>=60){
            $('#freeze-progress').css('cssText',"width: 100% !important;");
        }else{
            $('#freeze-progress').css('cssText',"width: "+ days / complete_to_days * 100 + "% !important;");    
        }
        
    }else{
        $('#freeze-progress').css('cssText',"max-width: 0% !important;");
        $('#days').html(days + ' Days');
        $('#days-to-complete').html(complete_to_days + ' Days');
    }
    $('#div-left-image').attr('src',freeze_left_image);
    $('#div-right-image').attr('src',freeze_right_image);
}

function stageCount(stage){
         var nextStage = 1;
         var trx = 833;
         var nextTrx = 1000;
        if(stage<=2){
            if(stage==2){
                nextTrx = 1000;    
            }
            
        }else if(stage>=3 && stage<=9){
            trx = 10 * stage;
            trx = 1000 + trx - 30;
            nextTrx = trx + 10;
            if(stage==9){nextTrx=nextTrx+2 ;}

        }else if(stage>=10 && stage<=19){
            var s = stage%10;
            s = (s+1)*12;
            trx = 1000 + 60;
            trx =  trx + s;
            nextTrx = trx + 12 ; 
             if(stage==19){nextTrx=nextTrx+2 ;}
        }else if(stage>=20 && stage<=29){
            var s = stage%10;
            s = (s+1)*14;
            trx = 1000 + 180;
            trx =  trx + s;
            nextTrx = trx + 14 ; 
             if(stage==29){nextTrx=nextTrx+2 ;}
        }else if(stage>=30 && stage<=39){
            var s = stage%10;
            s = (s+1)*16;
            trx = 1000 + 320;
            trx =  trx + s;
            nextTrx = trx + 16 ; 
             if(stage==39){nextTrx=nextTrx+2 ;}
        }else if(stage>=40 && stage<=49){
            var s = stage%10;
            s = (s+1)*18;
            trx = 1000 + 480;
            trx =  trx + s;
            nextTrx = trx + 18 ; 
             if(stage==49){nextTrx=nextTrx+2 ;}
        }else if(stage>=50 && stage<=59){
            var s = stage%10;
            s = (s+1)*20;
            trx = 1000 + 660;
            trx =  trx + s;
            nextTrx = trx + 20 ; 
             if(stage==59){nextTrx=nextTrx+2 ;}
        }else if(stage>=60 && stage<=69){
            var s = stage%10;
            s = (s+1)*22;
            trx = 1000 + 860;
            trx =  trx + s ;
            nextTrx = trx + 22 ; 
             if(stage==69){nextTrx=nextTrx+2 ;}
        }else if(stage>=70 && stage<=79){
            var s = stage%10;
            s = (s+1)*24;
            trx = 1000 + 1080;
            trx =  trx + s ;
            nextTrx = trx + 24 ; 
             if(stage==79){nextTrx=nextTrx+2 ;}
        }else if(stage>=80 && stage<=89){
            var s = stage%10;
            s = (s+1)*26;
            trx = 1000 + 1320;
            trx =  trx + s ;
            nextTrx = trx + 26 ; 
             if(stage==89){nextTrx=nextTrx+2 ;}
        }else if(stage>=90 && stage<99){
            var s = stage%10;
            s = (s+1)*28;
            trx = 1000 + 1580;
            trx =  trx + s ;
            nextTrx = trx + 28 ; 
            
        }else{trx = 2860; nextTrx = 2860;}
        stage = stage + 1;
        nextStage = stage +1;

        $('#stageNumber').html(stage);
        $('#stageTRX').html(trx);
        $('#stageNumber2').html(nextStage);
        $('#stageTRX2').html(nextTrx);
    }
