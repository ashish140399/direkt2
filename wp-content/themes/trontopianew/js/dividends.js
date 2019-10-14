var divContractInstance;
const dividendContractAddress          =   'TQAWokJg23BxHXYV7RFrUMsXG6948n8tmq';
async function dividendContractInit(){
	 var divContractInfo = await tronWeb.trx.getContract(dividendContractAddress);
     divContractInstance = await tronWeb.contract(divContractInfo.abi.entrys, divContractInfo.contract_address);
     var tokenContractInfo = await tronWeb.trx.getContract(tokenContractAddress);
     tokenContractInstance = await tronWeb.contract(tokenContractInfo.abi.entrys, tokenContractInfo.contract_address);

}

async function updateDividendData(){
	// user avialable dividend 
	var trxAccumulated = 0 ;
    var availableMainDividends  = await divContractInstance.userConfirmedDividendDivRake(global.userAddress).call();
    var val = Object.values(availableMainDividends);
    var availableMainDivUser = window.tronWeb.toDecimal(val[0]);
    availableMainDivUser = tronWeb.fromSun(availableMainDivUser);
    if(parseFloat(availableMainDivUser)>0.01){
        availableMainDivUser = availableMainDivUser.toString(); 
        $("#myAvailableDividend").html(number_to_2decimals(availableMainDivUser));
    }else{
        $("#myAvailableDividend").html("0.00");
    }

    var availableDividend = await divContractInstance.displayAvailableDividendALL().call();
    var val = Object.values(availableDividend);
    var divNumber = window.tronWeb.toDecimal(val[1])/1000000;
   
    if(val[0]==false){ 
        trxAccumulated = (divNumber*10)/100;
        divNumber = '- '+ divNumber;
    }else{
        divNumber = divNumber;     
        trxAccumulated = (divNumber*10)/100;
    }
    trxAccumulated = trxAccumulated.toString();
    $("#accumulatedTRX").html(number_to_2decimals(trxAccumulated));
    divNumber = divNumber.toString();
    $("#dividends").html(number_to_2decimals(divNumber));
    $("#dividendsTotal").html(number_to_2decimals(divNumber));
}

async function getDivNumber(){
	var availableDividend = await divContractInstance.displayAvailableDividendALL().call();
    var val = Object.values(availableDividend);
    var divNumber = window.tronWeb.toDecimal(val[1])/1000000;

    var diceRakePool = await ultimateDiceContractInstance.ownerRakePool().call();
    var val1 = Object.values(diceRakePool);
    var diceRakePool = window.tronWeb.toDecimal(val1[0])/1000000;

    var rakePool = diceRakePool;
    if(val[0]==false){ 
        //divNumber = divNumber - rakePool;    
        divNumber = '- '+ divNumber;
    }else{
        divNumber = divNumber - rakePool;    
    }
    return divNumber;
}
//set timer for dividend pool
 $.getJSON( API_URL + "gettime.php", function( data, status, xhr ) { 
      if(xhr.status==200){  
        var countDownDate = data;
        var x = setInterval(function() {
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
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = hours + ": " + minutes + ": " + seconds;
        //document.getElementById("demo2").innerHTML = hours + ": " + minutes + ": " + seconds;
        document.getElementById("dividendCountdown").innerHTML = hours + ": " + minutes + ": " + seconds;
        
        
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
            //document.getElementById("demo2").innerHTML = "EXPIRED";
            document.getElementById("dividendCountdown").innerHTML = "EXPIRED";
           
        }
    }, 1000);   
    }
 });