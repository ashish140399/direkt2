/*** TRONGRID URL ***/
//const TRONGRID_URL = "https://api.trongrid.io/wallet/getaccount";
const TRONGRID_URL = "https://super.guildchat.io/wallet/getaccount";
//const TRONGRID_URL = "https://api.shasta.trongrid.io/wallet/getaccount";

var API_URL = 'api/';

const ultimateDiceContractAddress       =   'TVjPNiXRohHupNr44LsDngqQZ5gndan5FT';
const classicDiceContractAddress        =   'TRzwSBRFzfUuKwTAh7Yh4ih6UGTfaDDrGY';
const luckyOneContractAddress           =   "TBetsski7xFQcTBV9qeqPoBtHDqHcvaXW8";

/* ** Copy Link ** */
function copyLink() {
  var copyText = document.getElementById("refLink");
  copyText.select();
  document.execCommand("copy");
}
//function for number with commas
function numberWithCommas(num)
{
    num = num.toString();
    let decimalPointIndex = num.indexOf(".");
    let numWithoutDecimals = (decimalPointIndex === -1) ? num : num.substr(0, decimalPointIndex);
    let numDecimals = (decimalPointIndex === -1) ? "" : num.substr(decimalPointIndex);
    
    let newNumWithCommas = "";
    for (let i=0; i<numWithoutDecimals.length/3; i++)
    {
    	 if ((i+1)*3 > numWithoutDecimals.length) newNumWithCommas = numWithoutDecimals.substr(0,  numWithoutDecimals.length - (i+1)*3 + 3) + "," + newNumWithCommas;
       else newNumWithCommas = numWithoutDecimals.substr(-((i+1)*3), 3) + "," + newNumWithCommas;
    }
    
    newNumWithCommas = newNumWithCommas.substr(0, newNumWithCommas.length-1);
    
    return newNumWithCommas + numDecimals;
    //return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//get percentage
function levelPercentages(i){
    if(i==0){ //level 1
        return 50;    
    }else if(i==1){ //level 2
        return 20;   
    }else if(i==2){ //level 3
        return 10;
    }else if(i==3 || i==4){ //level 4 and 5
        return 5;
    }else if(i==5 || i==6){ //level 6 and 7
        return 3;
    }else if(i==7){ //level 8
        return 2;  
    }else{ //level 9 and 10
        return 1;
    }
}

//get short user address
 function getUserAddress(userAddress){
        firstFive   = userAddress.substring(0 , 5); 
        lastFive    = userAddress.substr(userAddress.length - 5);
        return firstFive+'...'+lastFive;
}
function number_to_2decimals(str)
{
    str = str.toString();
    const decimalPointIndex = str.indexOf(".");
    if (decimalPointIndex === -1) return str + ".00";
    return (str+"00").substr(0, decimalPointIndex+3);
}

function sun_to_TRX_2decimals(sun)
{
    const str = window.tronWeb.fromSun(sun).toString();
    return number_to_2decimals(str);
}

function leadingZero_two_decimals(num)
{
    num = num.toString();
    if (num.length === 1) num = "0" + num;
    return num;
}

function strip_tags(str) {
    str = str.toString();
    str =str.replace(/<\/?[^>]+>/gi, '');
    return str.replace(/alert\([\'|\"](.*)[\'|\"]\)\;/gmi, "");
}


//get all chat
function getchat(lastchatid){
    $.get( API_URL + "getchatX.php", function(data, status,xhr){
        if(xhr.status==200){
            data = JSON.parse(data);
            if(data.result==true){
                var str='';
                var chatData = data.data;
                chatData.reverse();
                 $.each(data.data, function(key, obj) {
                    var cls;
                    global.lastChatID = obj.id;
                        if(obj.userid==global.userAddress){
                           
                            cls = 'snd';
                        }else{
                            cls = 'reci';
                        }
                       
                        var username = obj.username;
                        var message = obj.message;
                        var time = obj.time;
                        var image = obj.image;
                        var color = obj.color;
                        var level = obj.level;
                        if(level==9999){
                            level = " [Lvl MOD]";
                         }else{
                            level = " [Lvl " + obj.level + "]";
                         }
                        
                        username = username+level+' : ';
                        if(global.level=="9999" || global.level==9999){                        
                          username = '('+obj.userid+') : ';
                        }
                        if(image!=''){
                            image = '<img src="'+image+'" height="40" width="40">';
                        } 
                        //str += '<li class="'+cls+'"><div>'+image+'<strong>'+username+'</strong>'+message+'</div> <div> <span class="chat-time">'+ time + '</span> </div></li>'
                        str += '<li><div class="chet-box"><div class="chet-img">' + image + '</div><div class="chet-info"><h4 style="color:'+color+'">' + username + '</h4><p>' + message + '</p></div></div></li>';
                  });
                 
                 if(global.lastChatID==''){
                    $('#chatDiv').html(str);
                    $('#tab1').scrollTop($('#chatDiv').height());   
                     $('.right-box').animate({
                        scrollTop: $('.right-box').get(0).scrollHeight
                    }, 1500);
                 }else{
                    $('#chatDiv').append(str);
                    $('#tab1').scrollTop($('#chatDiv').height());
                     $('.right-box').animate({
                        scrollTop: $('.right-box').get(0).scrollHeight
                    }, 100);
                 }
                 
            }else{
               // $('#chatDiv').html(data.msg);
            }
        }
    });
}

    $(document).ready(function() {
       
         var chatSocket = io.connect( 'https://nodejs.trontopia.co:8080' );
        chatSocket.on('new message', function(data){
            var message = data.message;
            var hidemsg = false;
            var ban = message.includes("/ban");
            var muted = message.includes("/mute");
            if(ban==true){  
                hidemsg = true;
            }
            if(muted==true){ 
                hidemsg = true;
            }
            if(hidemsg==false){              
        
                var clst='reci';
                if(data.sender==global.userAddress){
                    clst = 'snd';
                }else{
                    clst = 'reci';
                } 
                var uImage = data.image;
                var color = data.color
                //var str = '<li id="divsndID" class="'+clst+'"><div>'+uImage+'<strong>'+data.username+'</strong>'+strip_tags(data.message)+'</div> <div> <span class="chat-time">'+ data.time + '</span> </div></li>';
                var str = '<li><div class="chet-box"><div class="chet-img">' + uImage + '</div><div class="chet-info"><h4 style="color:'+color+'">' + data.username + '</h4><p>' + strip_tags(data.message) + '</p></div></div></li>';
                $('#chatDiv').append(str);
                $('#tab1').scrollTop($('#chatDiv').height());   
                $('.right-box').animate({
                    scrollTop: $('.right-box').get(0).scrollHeight
                }, 1500);
            }
         });
         
         
            //send message
            $('#sendChat').click(async function(){ 
                  if(global.level==undefined || global.level==0){
                     alertify.error('You must wager 10,000 TRX to achieve Level 1 and access the Chat Feature.');
                     return true;
                  }
                  var isBanned = false;
                  function myCallback(response) {
                    result = response;
                    if(result==true){
                        alertify.error('You are Muted/Banned.');
                        isBanned = true;
                        return false;  
                    }      
                  }
            
                $.ajax({
                  type: "GET",
                  url: API_URL + "userBannedMuted.php?address="+global.userAddress,
                  datatype: "json",
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
                  success: myCallback,
                });
            
            
                if(global.userSigned==true){
                    var message = $('#message').val();
                    if(message==''){
                        return true;
                }
                if(message!='' || message.length==0){
                   message = strip_tags(message);
                    var user,useraddress;
                    var d = new Date();
                    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                    var nd = new Date(utc);
                    if(global.username!=''){
                        user = global.username;
                        useraddress = global.userAddress;
                    }else{
                        user = getUserAddress(global.userAddress);
                        useraddress = global.userAddress;
                    }
                    
            
                    var postData = 'useraddress='+ useraddress +'&user='+ user + '&message='+message;
                    //var d = new Date();
                    var h = nd.getHours();
                    var m = nd.getMinutes();
                    if(m<10){m='0'+m;}
                    var s = nd.getSeconds();
                    if(s<10){s='0'+s;}
                    var time = h+':'+m+':'+s;
                    myChatTime = time;
                    myLastChat = message;
                    if(message!=''){
                        var image = '';
                        if(global.level==9999){
                            level = " [Lvl MOD]";
                         }else{
                            level = " [Lvl " + global.level + "]";
                         }
                        username = user+level;
                        if(global.image_url!=''){
                            image = '<img src="'+global.image_url+'" height="40" width="40">';
                        }
                        
                        var ban = message.includes("/ban");
                        var muted = message.includes("/mute");
                        
                        if(ban==true || muted==true){
                            $('#message').val('');
                            alertify.success('User Banned/Muted.');
                        }else{
                           // $('#chatDiv').append(str);
                            //$('#tab7').scrollTop($('#chatDiv').height());     
                        }
                        
                    }
                    $.ajax({
                        url: API_URL + "sendchatX.php",
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
                                $('#sendChat').attr('disabled',true);
                                var hidemsg = false;
                                var ban = message.includes("/ban");
                                var muted = message.includes("/mute");
                                if(ban==true){  
                                    hidemsg = true;
                                }
                                if(muted==true){ 
                                    hidemsg = true;
                                }
                                if(hidemsg==false){ 
                                    chatSocket.emit('send message', {sender : global.userAddress, level : global.level, color : global.color, image: image, username : username,message : message,time : time});
                                 }
                                setTimeout(function(){
                                    $('#sendChat').attr('disabled',false);
                                },3000);
                            }
            
                            if(data.result==false){
                                // if(data.msg!=''){
                                //     alertify.error(data.msg);
                                // }
                                //$('#divsndID').remove();
                            }
                            
                        }
                    }); 
                    $('#message').val('');
                    
                }
             }else{
                var hex = tronWeb.toHex('trontopia');
                hex = hex.substring(2);
                var signed = await tronWeb.trx.sign(hex);
                if(signed!=''){
                    global.userSigned = true;
                    $('#sendChat').trigger('click');
                }
            }
            
            });
    });

function getluckyTimer(){
        var countDownDate = 1569344400000;
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
            document.getElementById("l1Countdown").innerHTML = hours + ": " + minutes + ": " + seconds;
        
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(y);
                document.getElementById("l1Countdown").innerHTML = "EXPIRED";
            }
        }, 1000); 
}


   getEventTimer();
function getEventTimer(){
        var countDownDate = 1570035600000;
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
            $(".eventCountDown").html(hours + ": " + minutes + ": " + seconds);
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(y);
                $(".eventCountdown").html("EXPIRED");
            }
        }, 1000); 
}

function getLukcyLeaders(){
    
    $.get(API_URL + "getLuckyOneLeaderboard.php", function(data, status, xhr){
               if(xhr.status==200){
                    data = JSON.parse(data);
                    if(data.result==true){
                        var resultking = data.data;
                        resultking.sort(function(a, b){
                        return a.trxplayed-b.trxplayed
                    });
                
                resultking.reverse();
                var counterX = 0;
                var rankVariable;
                var luckyOneLeaderboardX = ' <li class="head-at"> <div class="row">  <div class="col-md-2 col-sm-2 col-xs-2">      <div class="head-th">   <p>Rank</p>   </div>   </div>   <div class="col-md-5 col-sm-5 col-xs-5">    <div class="head-th">         <p>Player</p>     </div>      </div>     <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">     <p>Total Played</p>  </div>     </div>     <div class="col-md-2 col-sm-2 col-xs-2">     <div class="head-th">    <p>Prize</p>   </div>   </div>    </div>  </li> ';

                $.each(resultking, function(key, obj) {
                    key = parseInt(key)+1;
                        
                        if(key<=20){
                            
                            //code for the 1-2-3 ranks
                            if(counterX==0){
                                rankVariable = '<div class="head-th number-b act1"> <img src="images/ranks/leaders1.png" height="30" width="30" alt=""> </div>';
                            }
                            else if(counterX==1){
                                rankVariable = ' <div class="head-th number-b act2"> <img src="images/ranks/leaders2.png" height="30" width="30" alt=""> </div>';
                            }
                            else if(counterX==2){
                                rankVariable = ' <div class="head-th number-b act3">  <img src="images/ranks/leaders3.png" height="30" width="30" alt=""> </div>';
                            }
                            else{
                                rankVariable = '<div class="head-th number-b"> <p>'+ (counterX + 1) +'</p></div>';
                            }
                            let user = obj.user;
                            
                            var color = obj.color;
                            var level = obj.level
                            if(level==9999){
                                level = " [Lvl MOD]";
                             }else{
                                level = " [Lvl " + obj.level + "]";
                             }
                             /* 
                                1st 50,000 TRX
                                2nd 25,000 TRX
                                3rd 10,000 TRX
                                4th 5,000 TRX
                                5th 4,000 TRX
                                6th 2,500 TRX
                                7th 1,500 TRX
                                8th 1,000 TRX
                                9th 750 TRX
                                10th 250 TRX
                                */
                            if(counterX==0){
                                payout = 50000;
                            }else if(counterX==1){
                                payout = 25000;
                            }else if(counterX==2){
                                payout = 10000;
                            }else if(counterX==3){
                                payout = 5000;
                            }else if(counterX==4){
                                payout = 4000;
                            }else if(counterX==5){
                                payout = 2500;
                            }else if(counterX==6){
                                payout = 1500;
                            }else if(counterX==7){
                                payout = 1000;
                            }else if(counterX==8){
                                payout = 750;
                            }else if(counterX==9){
                                payout = 250;
                            }else{
                                payout = 0;
                            }
                            var payOutText='';
                            if(counterX>9){
                                payOutText='';
                            }else{
                                payOutText='<p>'+payout+' <span>TRX</span></p>';
                            }


                             user = '<span style="color:'+color+'">'+user+level+'</span>';
                             
                            /* 1st position:  "dividend * 0.5 /100 * 50 /100"  and so on. */
                            
                            luckyOneLeaderboardX += ' <li class="dt-tbs">     <div class="row">    <div class="col-md-2 col-sm-2 col-xs-2">    '+ rankVariable +'  </div>   <div class="col-md-5 col-sm-5 col-xs-5">      <div class="head-th">   <p> '+ user +' </p>    </div>     </div>  <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">   <p>'+ obj.trxplayed +' TRX</p>    </div>    </div>   <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th poit">  '+payOutText+'  </div>   </div>   </div>   </li> ';
                        
                    }
                    counterX++;
                });
                 
               
                $("#luckyOneLeaderboardX").html(luckyOneLeaderboardX); 
               
            }else{
             // $("#kingtopianLeaderboardX").html(data.msg);  
            }
            }
        });
}

//get all global Rank
function getleaderboard(){
    $.get(API_URL + "getleaderboard.php", function(data, status,xhr){
        if(xhr.status==200){
            data = JSON.parse(data);
            if(data.result==true){
                var leaderboardHtml='';
                var counterX=0;
                var leaderboardData = data.data;
            
                  $.each(leaderboardData, function(key, obj) {
                         key = parseInt(key)+1;
                         var user = obj.user;
                         var image = obj.image;
                         var color = obj.color;
                         var level = obj.level;
                         if(level==9999){
                            level = " [Lvl MOD]";
                         }else{
                            level = " [Lvl " + obj.level + "]";
                         }
                         user = user + level;
                         if(image!=''){
                            image = '<img src="'+image+'" height="30" width="30">';
                         }
                         if(key==1){
                            key = '<img src="images/ranks/1.png" height="30" width="30">';
                         }else if(key==2){
                            key = '<img src="images/ranks/2.png" height="30" width="30">';
                         }else if(key==3){
                            key = '<img src="images/ranks/3.png" height="30" width="30">';
                         }else{
                            key = image;
                         }
                         
                         leaderboardHtml += '<div class="topblocks">'+
                                                '<h3 style="color:'+color+'">'+ key +' '+ user +'</h3>'+
                                                '<div class="top-scr">'+
                                                    '<h4>'+ obj.total +' <span>TRX</span></h4>'+
                                                '</div>'+
                                            '</div>';   

                        counterX++;
                 });
                 
                $("#globalLeaderboard").html(leaderboardHtml); 
            }else{
                //$('#globalLeaderboard').html(data.msg);
            }
        }
    });

}

async function displayboards(){
        //kingtopian table data
        var availableDividend = await divContractInstance.displayAvailableDividendALL().call();
        var val = Object.values(availableDividend);
        var divNumber = window.tronWeb.toDecimal(val[1]);
        var divNumber = divNumber/1000000;
        var dividend = divNumber *1/100;
        if(val[0]==false){ divNumber = 0;}
        
        $.get(API_URL + "kingtopian2.php", function(data, status, xhr){
            if(xhr.status==200){
            //$("#sr-table").empty();
            data = JSON.parse(data);
            if(data.result==true){
                var resultking = data.data;
                resultking.sort(function(a, b){
                 return a.trxplayed-b.trxplayed
                });
                
                resultking.reverse();
                var counterX = 0;
                var rankVariable;
                var kingtopianLeaderboardHTML = ' <li class="head-at"> <div class="row">  <div class="col-md-2 col-sm-2 col-xs-2">      <div class="head-th">   <p>Rank</p>   </div>   </div>   <div class="col-md-5 col-sm-5 col-xs-5">    <div class="head-th">         <p>Player</p>     </div>      </div>     <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">     <p>Total Played</p>  </div>     </div>     <div class="col-md-2 col-sm-2 col-xs-2">     <div class="head-th">    <p>Prize</p>   </div>   </div>    </div>  </li> ';

                $.each(resultking, function(key, obj) {
                    key = parseInt(key)+1;
                        
                        if(key<=20){
                            
                            //code for the 1-2-3 ranks
                            if(counterX==0){
                                rankVariable = '<div class="head-th number-b act1"> <img src="images/ranks/leaders1.png" height="30" width="30" alt=""> </div>';
                            }
                            else if(counterX==1){
                                rankVariable = ' <div class="head-th number-b act2"> <img src="images/ranks/leaders2.png" height="30" width="30" alt=""> </div>';
                            }
                            else if(counterX==2){
                                rankVariable = ' <div class="head-th number-b act3">  <img src="images/ranks/leaders3.png" height="30" width="30" alt=""> </div>';
                            }
                            else{
                                rankVariable = '<div class="head-th number-b"> <p>'+ (counterX + 1) +'</p></div>';
                            }
                            let user = obj.user;
                            
                            var color = obj.color;
                            var level = obj.level
                            if(level==9999){
                                level = " [Lvl MOD]";
                             }else{
                                level = " [Lvl " + obj.level + "]";
                             }
                            //let user = getUserAddress(tronWeb.address.fromHex(obj.user));
                            if(val[0]==true){
                                payout = dividend * 50 * levelPercentages(counterX) / 1000;
                                payout = number_to_2decimals(payout.toString());
                                //payout = payout.slice(0, (payout.indexOf("."))+3);
                            }else{
                                payout = 0;
                            }
                            var payOutText='';
                            if(counterX>9){
                                payOutText='';
                            }else{
                                payOutText='<p>'+payout+' <span>TRX</span></p>';
                            }


                             user = '<span style="color:'+color+'">'+user+level+'</span>';
                             
                            /* 1st position:  "dividend * 0.5 /100 * 50 /100"  and so on. */
                            
                            kingtopianLeaderboardHTML += ' <li class="dt-tbs">     <div class="row">    <div class="col-md-2 col-sm-2 col-xs-2">    '+ rankVariable +'  </div>   <div class="col-md-5 col-sm-5 col-xs-5">      <div class="head-th">   <p> '+ user +' </p>    </div>     </div>  <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">   <p>'+ obj.trxplayed +' TRX</p>    </div>    </div>   <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th poit">  '+payOutText+'  </div>   </div>   </div>   </li> ';
                        
                    }
                    counterX++;
                });
                 
               
                $("#kingtopianLeaderboardX").html(kingtopianLeaderboardHTML); 
               
            }else{
             // $("#kingtopianLeaderboardX").html(data.msg);  
            }
            }
        });

        var us_address = global.userAddressHex;
        us_address = us_address.substring(2);
        us_address = '0x'+us_address;
        		
        //top miners data		
       /* $.get(API_URL + "tokenMinters.php?user="+us_address, function(data, status,xhr){		
            //$("#sr-table2").empty();		

            if(xhr.status==200){
            data = JSON.parse(data);		
            if(data.result==true){		
                var resultminers = data.data;		
                $('#minedTotalTokan').html(data.totalSupply);		
                $('#minedToken').html(data.totalMinted);
                $('#myTokenMinted').html(data.myTotalMinted);
               		
                var counterX = 0;		
                var rankVariable;		
                var minersLeaderboardHTML = ' <li class="head-at"> <div class="row">  <div class="col-md-2 col-sm-2 col-xs-2">      <div class="head-th">   <p>Rank</p>   </div>   </div>   <div class="col-md-5 col-sm-5 col-xs-5">    <div class="head-th">         <p>Player</p>     </div>      </div>     <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">     <p>Total Mined</p>  </div>     </div>     <div class="col-md-2 col-sm-2 col-xs-2">     <div class="head-th">    <p>Prize</p>   </div>   </div>    </div>  </li>';		
                $.each(resultminers, function(key, obj) {		
                		
                    key = parseInt(key)+1;		
                    var payout = 0;		
                		
                    //code for the 1-2-3 ranks		
                    if(counterX==0){		
                        rankVariable = '<div class="head-th number-b act1"> <img src="images/ranks/leaders1.png" height="30" width="30" alt=""> </div>';		
                    }		
                    else if(counterX==1){		
                        rankVariable = ' <div class="head-th number-b act2"> <img src="images/ranks/leaders2.png" height="30" width="30" alt=""> </div>';		
                    }		
                    else if(counterX==2){		
                        rankVariable = ' <div class="head-th number-b act3">  <img src="images/ranks/leaders3.png" height="30" width="30" alt=""> </div>';		
                    }		
                    else{		
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
                    var reward ='';
                    if(counterX>9){
                        reward = '';
                    }else{
                        reward = '<p>'+obj.reward+' <span>TRX</span></p>';
                    }
                    		
                    user = '<span style="color:'+color+'">'+user+level+'</span>';		
                    minersLeaderboardHTML += ' <li class="dt-tbs">     <div class="row">    <div class="col-md-2 col-sm-2 col-xs-2">    '+ rankVariable +'  </div>   <div class="col-md-5 col-sm-5 col-xs-5">      <div class="head-th">   <p> '+ user +' </p>    </div>     </div>  <div class="col-md-3 col-sm-3 col-xs-3">   <div class="head-th">   <p>'+ obj.topia +' TOPIA</p>    </div>    </div>   <div class="col-md-2 col-sm-2 col-xs-2">   <div class="head-th poit"> '+reward+'    </div>   </div>   </div>   </li> ';		
                        		
                   		
                    counterX++;		
                });		
                		
                $("#minersLeaderboard").html(minersLeaderboardHTML); 		
                		
            }else{		
               // $("#minersLeaderboard").html(data.msg);  
            }
        }
        });*/
        
        //topVoucherBurners();

    }
$('#message').keypress(function(event){
    var maxChars = 150;
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        var isdisabled = $('#sendChat').attr('disabled');
        if(isdisabled=='disabled'){
            return true;
        }else{
            $('#sendChat').trigger('click');
        }
    }
    if ($(this).val().length > maxChars) {
       $(this).val($(this).val().substr(0, maxChars));
       //Take action, alert or whatever suits
        alertify.error("This field can take a maximum of 150 characters");
    }
});



$('#closeFreezePopup, #closeFreezeDiamondsPopup,#closeBurnPopup,#btnBurnCancel,#btnFreezeCancel,#btnfreezeDiamondCancel,#freezeSharesClose,#btnfreezeSharesCancel').click(function(){
        $('#dividend').modal();
        setTimeout(function(){
         $('body').addClass('modal-open');   
        },1000);
         
    });  

