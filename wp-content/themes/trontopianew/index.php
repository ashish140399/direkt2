<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
    
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="css/nouislider.css" />
    <link rel="stylesheet" type="text/css" href="css/style.css?v.30.49" />
    <link rel="stylesheet" type="text/css" href="css/social.css?v.30.22" />
    <link rel="stylesheet" type="text/css" href="css/responsive.css?v.30.28" />
    <link rel="stylesheet" type="text/css" href="css/alertify.css" />
    <link rel="stylesheet" href="css/simplebar.min.css">
    <link rel="icon" type="png/jpg" href="images/favicon.png" />
    <title>TRONTOPIA  - A DIAMOND Era</title>
    <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-149350431-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-149350431-1');
</script>
<?php
include 'api/config.php';
mysqlCheck($conn);
$sqlTime = "SELECT * from settings where id  = 1";
$resTime = mysqli_query($conn,$sqlTime);
$rowTime = mysqli_fetch_array($resTime);
$topian_timestamp = $rowTime['top_topain_jstimestamp'];
mysqli_close($conn);
echo '<script>
    var top_topian_jstimestamp = '.$topian_timestamp.';
</script>';
?>
</head>
<body data-simplebar> 
    <!-- Loader -->
    <div class="loader-blocks">
        <div class="logo-loader">
            <img src="images/loader-logo.png" alt="">

            <div class="progress skill-bar ">
                <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                </div>
            </div>
        </div>
    </div>
    <!-- End Loader -->
    
    <section class="main-wrapper">
        <!-- Left Side Bar -->
        <?php include ('header.php'); ?>
        <!-- End Left Side Bar -->

        <!-- Main Center -->
        <div class="main-center-block content" data-simplebar> 
            <header>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-8">
                            <div class="heading-tilte">
                                <a href="javascript:void(0);" class="bar-box"><i class="fa fa-bars"></i></a>
                                <h1>welcome <span id="walletID"></span></h1>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-4">
                            <div class="right-heds">
                                <div class="enter-bx">
                                    <a href="#" id="login_or_not" data-toggle="modal" data-target="#pls-login"><i class="fa fa-user"></i> profile</a>
                                    <a href="#" id="isLogin"><i class="fa fa-user"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
                            <div class="info-sec">
                    <div class="row">
                        <div class="col-md-4 col-sm-4">
                            <a href="/ultimate-dice.php"><div class="info-select">
                                <img src="images/UD1.png" alt="">
                            </div></a>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <a href="/classic-dice.php"><div class="info-select">
                                <img src="images/CD1.png" alt="">
                            </div></a>
                        </div>
                        <div class="col-md-4 col-sm-4">
                            <a href="/lucky.php"><div class="info-select">
                                <img src="images/L11.png" alt="">
                            </div></a>
                        </div>
                    </div>
                </div>
                <br>
            <div class="main-infor-wrp">
                <div class="row" style="background-image: url('images/2959.jpg');background-size: cover;padding: 15px 0px">
                    <div class="col-md-8 col-sm-8">
                        <div class="infor-box">
                            <div class="info-heds">
                                <div class="row">
                                    <div class="col-md-8 col-sm-7">
                                        <div class="info-title">
                                            <h4>RANDOM LUCKY TOPIAN CHALLENGE</h4>
                                            <h6>Oct-8-2019</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-4 col-sm-5">
                                        <div class="soshr-bx social">
                                            <a href="https://t.me/share/url?url={https://trontopia.co}&text={A Diamond Era begins}&to={phone_number}https://telegram.me/share/url?url={https://trontopia.co}&text={A Diamond Era begins}&to={phone_number}tg://msg?url={https://trontopia.co}&text={A Diamond Era begins}&to={phone_number}"><img src="images/socil1.png" alt=""></a>
                                            <a href="https://twitter.com/intent/tweet?text=Trontopia%20Season%20Two%20Diamond%20Era&amp;url=https%3A%2F%2Ftrontopia.co;via=tron_topia" class="twitter">
                                                <img src="images/socil2.png" alt="">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="info-details">
                                <img src="images/shufflecontest.jpg" width="300px"><br>
                                <p>Starting today Tuesday 10-8-19(NOW) we are running a SPECIAL EVENT!<br><br>

Event Ends Wednesday 10-9-19 @8pm EST<strong>(at Diamonds Rewards Distro)</strong><br><br>

100,000 <font color="#0CD6CF">TRX</font> in Prizes!<br><br>
The Top 10 wagerer's prize size will be randomly drawn via Rollbot in our <a href="https://t.me/trontopia" target="_blank">Telegram</a>.<br><br>
<strong>Prizes</strong><br>
<font color="#0CD6CF">1:</font> 40,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">2:</font> 20,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">3:</font> 15,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">4:</font> 10,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">5:</font> 5,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">6:</font> 4,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">7:</font> 3,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">8:</font> 1,500 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">9:</font> 1,000 <font color="#0CD6CF">TRX</font><br>
<font color="#0CD6CF">10:</font> 500 <font color="#0CD6CF">TRX</font><br><br>

<strong>GOOD LUCK!</strong>
</div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="infor-box">
                            <div class="scor-board">
                                <div class="soc-bxs">
                                    <p>topia mined</p>
                                    <h4 id="minedToken2">0.00</h4>
                                </div>

                                <div class="soc-bxs">
                                    <p>topia rewards</p>
                                    <h4 id="dividendsTotal">0.0</h4>
                                </div>

                                <div class="soc-bxs">
                                    <p>unburned vouchers</p>
                                    <h4 id="vouchersMined">0.00</h4>
                                </div>

                                <div class="soc-bxs">
                                    <p>diamond rewards</p>
                                    <h4 id="diamondsDividendsTotal">0.0</h4>
                                </div>

                                <a href="javascript:void(0);" data-toggle="modal" data-target="#dividend" class="btn-infos">rewards</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
        <!-- End Main Center -->

        <!-- Right Side Bar -->
        <?php include('sidebar.php'); ?>
        <!-- End Right Side Bar -->   
    </section>

    <script type="text/javascript" src="js/jquery.min.js"></script> 
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <!-- <script type="text/javascript" src="js/nouislider.js"></script> -->
    <script type="text/javascript" src="js/wNumb.js"></script>
    <script type="text/javascript" src="js/alertify.min.js"></script>
    <script type="text/javascript" src="js/socket.io.js"></script>
   <script type="text/javascript" src="js/general.js?v.30.66"></script>
    <script type="text/javascript" src="js/shares.js?v.30.47"></script>
    <script type="text/javascript" src="js/dividends.js?v.30.46"></script>
    <script type="text/javascript" src="js/referrals.js?v.30.43"></script>
    <script type="text/javascript" src="js/tokens.js?v.30.48"></script>
    <script type="text/javascript" src="js/vouchers.js?v.30.44"></script>
    <script type="text/javascript" src="js/diamonds.js?v.30.44"></script>
    <script type="text/javascript" src="js/index-script.js?v=81"></script>
    <script type="text/javascript" src="js/social.js"></script>
    <!--<script type="text/javascript" src="js/simplebar.js"></script>-->

    <script type="text/javascript">
        /* ** Loader ** */
        $(window).on('load', function(){
            //setTimeout(removeLoader, 3000); 
        });
        function removeLoader(){
            $( ".loader-blocks" ).fadeOut(200, function() {
                $( ".loader-blocks" ).remove(); 
            });
        }
        /* ** End Loader ** */
       /* window.onclick = function (e) {   

            if (!e.target.matches('.dropbtn')) {  

                var myDropdown = document.getElementById("myDropdown");   

                var items = myDropdown.getElementsByTagName("li");   

                if (myDropdown) {       

                    for (var i = 0; i < items.length; ++i) {   

                        if(items[i].classList.contains('active')){   

                            var livalue = $(items[i]).find('a').text();



                            $('.dropbtn').html(livalue + '<i class="fa fa-caret-down"></i>');   

                        }   

                    }       

                    if (myDropdown.classList.contains('show')) {   

                        myDropdown.classList.remove('show');   

                    }   

                }   

            }

        } */
        function myFunction() {   

            document.getElementById("myDropdown").classList.toggle("show");   

        }
        $('.sound').click(function(e) {

              //e.preventDefault();

                $(this).find('i').toggleClass('fa-volume-up');

        });
        /* ** Responsive Nav js ** */
        $('.bar-box').on('click', function(){
          $('.left-bar').addClass('leftbar-open');
        });

        $('.close-side').on('click', function(){
          $('.left-bar').removeClass('leftbar-open');
        });

        $('.right-chat').on('click', function(){
          $('.right-bar').toggleClass('rightbar-open');
        });
        /* ** End Responsive Nav js ** */  

        /* **** On Off **** */
        $(".act-active ul li a").click(function(e){
            var cb = $(this).find(":radio")[0];
                $(".act-active ul li a").removeClass("selected");
                if (e.target != cb) cb.checked = !cb.checked;
                $(this).addClass("selected", cb.checked);
        });

        /* **** Size **** */
        $(".selct-size ul li a").click(function(e){
            var cb = $(this).find(":radio")[0];
                $(".selct-size ul li a").removeClass("selected");
                if (e.target != cb) cb.checked = !cb.checked;
                $(this).addClass("selected", cb.checked);
        });

        /* **** Odd Event **** */
        $(".selct-side ul li a").click(function(e){
            var cb = $(this).find(":radio")[0];
                $(".selct-side ul li a").removeClass("selected");
                if (e.target != cb) cb.checked = !cb.checked;
                $(this).addClass("selected", cb.checked);
        });

        var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

          // Get today's date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          document.getElementById("demo").innerHTML = hours + ":"
          + minutes + ":" + seconds + "";

          // If the count down is finished, write some text 
          if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
          }
        }, 1000);
    </script>

    <!-- Range slider -->
    <script>
        /* Loader Progress BAR */
        $(document).ready(function() {
            $('.progress .progress-bar').css("width",
                function() {
                    return $(this).attr("aria-valuenow") + "%";
                }
                );

        });
        /* End Loader Progress Bar */
        
        (function ( $ ) {
          $.fn.progress = function() {
            var percent = this.data("percent");
            this.css("width", percent+"%");
          };
        }( jQuery ));

        $(document).ready(function(){
          $(".bar-one .bar").progress();
          $(".bar-two .bar").progress();
        });
    </script>
     <script src="js/lucky.min.js"></script>
    <script>
        (function () {
            'use strict';

            var init = function () {                


                var slider3 = new rSlider({
                    target: '#slider3',
                    values: {min: 0, max: 100},
                    step: 1,
                    range: true,
                    set: [50],
                    scale: true,
                    labels: false,
                    onChange: function (vals) {
                        console.log(vals);
                    }
                });

           
            };
            window.onload = init;
        })();
    </script>
   <script>
$(document).ready(function(){
 $('#trxTopiaVoucherText').html('Play Any game to mine VOUCHER');

 $("#btnRefreshTRX").click(function() {
    $("#trxBalance").load(" #trxBalance > *");
  }); 
  
  
  //$(".roll-btn").click(function(){
     // alert("1");
   //  $(".pro-roll"). css("display","block");
     
    // if($("#slider-pips ").prop( "disabled", true ))  
     //{
      //  alert("2");
      //  $(".pro-roll"). css("animation-duration","50s");  
    // }
     
 // });

  
  // right side toggle//
     $(".losers").click(function(){
     
        $("#subTab1").css("display","none");
        $("#subTab3").css("display","none");
        //$("#subTab2").css("display","block");
        $(".losers").addClass("burner");
        $(".Topian").removeClass("burner");
        $(".burnertab").removeClass("burner");
  });
  $(".Topian").click(function(){
      
        $("#subTab2").css("display","none");
        $("#subTab3").css("display","none");
        $("#subTab1").css("display","block");
        $(".losers").removeClass("burner");
        $(".Topian").addClass("burner");
        $(".burnertab").removeClass("burner");
  });
  $(".burnertab").click(function(){
       $("#subTab1").css("display","none");
       $("#subTab2").css("display","none");
       $("#subTab3").css("display","block");
       $(".losers").removeClass("burner");
       $(".Topian").removeClass("burner");
       $(".burnertab").addClass("burner");
  });
  
});
</script>
<script>
function move() {
  /*var elem = document.getElementById("myBar");   
  var width = 1;
  var id = setInterval(frame, 5);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++; 
      elem.style.width = width + '%'; 
    }
  }*/
}
</script>

</body>
</html>