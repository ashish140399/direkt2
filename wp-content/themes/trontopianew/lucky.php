<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css?v.30.40" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css?v.30.40" />
    <link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-car.css?v.30.40" />
    <link rel="stylesheet" type="text/css" href="css/nouislider.css?v.30.40" />
    <link rel="stylesheet" type="text/css" href="css/style.css?v.30.49" />
    <link rel="stylesheet" type="text/css" href="css/responsive.css?v.30.42" />
    <link rel="stylesheet" type="text/css" href="css/alertify.css?v.30.40" />
    <link rel="stylesheet" href="css/simplebar.min.css?v.30.40">
    <link rel="icon" type="png/jpg" href="images/favicon.png" />
    <title>Trontopia  - A DIAMOND Era</title>
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
$topian_timestamp2 = $rowTime['top_topain_jstimestamp2'];
$topian_timestamp3 = $rowTime['top_topain_jstimestamp3'];
mysqli_close($conn);
echo '<script>
    var top_topian_jstimestamp = '.$topian_timestamp.';
</script>';
/*echo '<script>
    var top_topian_jstimestamp = '.$topian_timestamp2.';
</script>'; */
/*echo '<script>
    var top_topian_jstimestamp = '.$topian_timestamp3.';
</script>';*/
?>
</head>
<script>
function changeImage(a) {
        $('.lucky-conts').css({"background": "url("+a+") 0 0 no-repeat", "background-size": "cover"});
        }
</script>
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
        <div class="main-center-block content"> 
            <header>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-8">
                            <div class="heading-tilte">
                                <a href="javascript:void(0);" class="bar-box"><i class="fa fa-bars"></i></a>
                                <h1><img src="images/head-ic.png" alt=""> lucky one <span>max</span></h1>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-4">
                            <div class="right-heds">
                                <div class="enter-bx">
                                    <a href="#" id="isLogin"><i class="fa fa-user"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Lucky Counter -->
            <div class="lucky-conts">
                  
                <div style="text-align: left;padding: 10px;">
                    <button class="btn bkground_img_change" type="button" onclick='changeImage("images/lucky-banner.png")' autofocus="">1</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/555.png")'>2</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/288.png")'>3</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/20.png")'>4</button>
                </div>
                <div class="sound">
                    <i class="fa fa-volume-off" aria-hidden="true" id="sound-icon"></i>
                </div>
                <div class="lucky-conts_odometer">
                    <h1 id="odometer" class="odometer">1111111</h1>
                </div>
              
                <!--h1 id="odometer" class="odometer">1111111</h1-->

                <a href="javascript:void(0)" class="roll-btn" id="rollDice">
                    <div class="roin">Roll</div>

                    <!-- <div class="pro-roll">
                        <div class="progress">
                            <div class="progress-bar">
                                <div class="progress-shadow"></div>
                            </div>
                        </div>
                    </div> -->
                </a>
                <a style="display:none;" href="#" id="rollBtn" class="roll-btn">
                    <div class="roin">Rolling...</div>
                    <div class="pro-roll">
                        <div class="progress">
                            <div class="progress-bar">
                                <div class="progress-shadow"></div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <!-- End Lucky Counter -->

            <div class="all-information-blok lucyboed">
                <div class="row">
                    <div class="col-md-3 col-sm-4">
                        <div class="form-group trx-ew">
                            <label>main bet</label>
                            <input type="text" id="mainBetTRX" name="" placeholder="10" value="10" class="form-control" autocomplete="off">
                            <span>TRX</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group activetbxs">
                            <label><b>auto betting </b>
                                <!--<div class="customecheck">
                                    <input class="styled-checkbox" id="stoponloss" type="checkbox" value="value1">
                                    <strong for="styled-checkbox-1">Stop on Loss</strong>
                                </div>-->
                            </label>
                            <div class="main-on">
                                <h4 id="autoBetText">Deactivated</h4>

                                <div class="act-active">
                                    <ul>
                                        <li><a href="javascript:void(0);" class="selected autoRoll" data-auto="off">
                                            <label class="checkbx">
                                                <input type="radio" name="r1">
                                                <span class="checkmark"></span>
                                            </label>
                                        off</a></li>
                                        <li><a href="javascript:void(0);" class="autoRoll" data-auto="on">
                                            <label class="checkbx">
                                                <input type="radio" name="r1" checked>
                                                <span class="checkmark"></span>
                                            </label>
                                        on</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 col-sm-4">
                        <div class="selct-size newsi">
                            <ul>
                                <li><a href="javascript:void(0);" id="minBetButton" class="minMaxBet" data-id="minBetButton">
                                    <label class="checkbx">
                                        <input type="checkbox" name="r2" checked>
                                        <span class="checkmark"></span>
                                    </label>
                                MIN</a></li>
                                <li><a href="javascript:void(0);" id="halfBetButton" class="minMaxBet" data-id="halfBetButton">
                                    <label class="checkbx">
                                        <input type="checkbox" name="r2">
                                        <span class="checkmark"></span>
                                    </label>
                                1/2</a></li>
                                <li><a href="javascript:void(0);" id="doubleBetButton" class="minMaxBet" data-id="doubleBetButton">
                                    <label class="checkbx">
                                        <input type="checkbox" name="r2">
                                        <span class="checkmark"></span>
                                    </label>
                                X2</a></li>
                                <li><a href="javascript:void(0);" id="maxBetButton" class="minMaxBet" data-id="maxBetButton">
                                    <label class="checkbx">
                                        <input type="checkbox" name="r2">
                                        <span class="checkmark"></span>
                                    </label>
                                MAX</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="all-information-blok new-ballucky">
                <div class="">
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="form-group">
                                <label>TRX Balance <button id="btnRefreshTRX" class="ref-btn"><img src="images/refresh.png" alt="" class="mCS_img_loaded"></button></label>
                                <span class="bounce_number" id="bounce_num" style=""></span>
                                <input type="text" name="" id="trxBalance" value="0.00" class="form-control" disabled>
                                <span>TRX</span>
                            </div> 
                        </div>
                        <!-- <div class="col-md-6 col-sm-6">
                            <div class="form-group jacde">
                                <label>jackpot</label>
                                <input type="text" name="" value="1.8922 x" class="form-control">
                                <span>TRX</span>
                            </div> 
                        </div> -->
                    </div>
                </div>

                <div class="main-bet">
                    <h6>pay out <i class="fa fa-info-circle"></i></h6>
                    <div class="row">
                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>l</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="payoutOneOne" name="" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>ll</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="payoutTwoOnes" name="" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>lll</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="payoutThreeOnes"  name="" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>lV</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" id="payoutFourOnes" name="" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>V</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="" id="payoutFiveOnes" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>Vl</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="" id="payoutSixOnes" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 col-sm-6">
                            <div class="pay-ot-bx">
                                <div class="numpy">
                                    <span>Vll</span>
                                </div>
                                <div class="form-group">
                                    <input type="text" name="" id="payoutSevenOnes" placeholder="0.00" class="form-control" disabled="">
                                    <span>TRX</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6">
                        </div>
                    </div>
                </div>
            </div>

            <div class="beting-wrp">
                <h4>betting history</h4>

                   <ul class="nav nav-tabs shw-blk">

                        <li><a data-toggle="tab" href="#bet1">MY BETS</a></li>

                        <li class="active"><a data-toggle="tab" href="#bet2">ALL BETS</a></li>

                        <li><a data-toggle="tab" href="#bet3">HIGH ROLLERS</a></li>

                        <li><a data-toggle="tab" href="#bet4">RARE WINS</a></li>

                    </ul>

                    <div class="dropdown hdn-blk">

                    <button onclick="myFunction()" class="btn dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">All Bets<i class="fa fa-caret-down"></i></button>

                    <ul class="dropdown-menu">

                        <ul class="nav nav-tabs" id="myDropdown">

                            <li><a data-toggle="tab" href="#bet1">My Bets</a></li>

                            <li class="active"><a data-toggle="tab" href="#bet2">All Bets</a></li>

                            <li><a data-toggle="tab" href="#bet3">High Rollers</a></li>

                            <li><a data-toggle="tab" href="#bet4">Rare Wins</a></li>


                        </ul>

                    </ul>

                </div>
                <div class="tab-content">
                    <div id="bet1" class="tab-pane fade"></div>
                    <div id="bet2" class="tab-pane fade in active"></div>
                    <div id="bet3" class="tab-pane fade"></div>
                    <div id="bet4" class="tab-pane fade"></div>
                    <div id="bet5" class="tab-pane fade"></div>
                    <div id="bet6" class="tab-pane fade"></div>
                </div>
            </div>
        </div>
        <!-- End Main Center -->

        <!-- Right Side Bar -->
        <?php include('sidebar.php'); ?>
        <!-- End Right Side Bar -->   
    </section>
    <!-- audio section -->
    <audio id="audio_1" style="display:none;" src="audio/1mp3.mp3"></audio>
    <audio id="audio_2" style="display:none;" src="audio/2mp3.mp3"></audio>
    <audio id="audio_3" style="display:none;" src="audio/3mp3.mp3"></audio>
    <audio id="audio_4" style="display:none;" src="audio/4mp3.mp3"></audio>
    <audio id="audio_5" style="display:none;" src="audio/5mp3.mp3"></audio>
    <audio id="audio_6" style="display:none;" src="audio/6mp3.mp3"></audio>
    <audio id="audio_7" style="display:none;" src="audio/7mp3.mp3"></audio>
	<audio id="audio_loss" style="display:none;" src="audio/losing.mp3"></audio>
	<!-- audio sectio ends -->
	
    <script type="text/javascript" src="js/jquery.min.js?v.30.40"></script> 
    <script type="text/javascript" src="js/bootstrap.min.js?v.30.40"></script>
    <script type="text/javascript" src="js/wNumb.js?v.30.40"></script>
    <script type="text/javascript" src="js/alertify.min.js?v.30.40"></script>
    <script type="text/javascript" src="js/socket.io.js?v.30.40"></script>
    <script type="text/javascript" src="js/general.js?v.30.66"></script>
    <script type="text/javascript" src="js/shares.js?v.30.47"></script>
    <script type="text/javascript" src="js/dividends.js?v.30.46"></script>
    <script type="text/javascript" src="js/referrals.js?v.30.44"></script>
    <script type="text/javascript" src="js/tokens.js?v.30.48"></script>
    <script type="text/javascript" src="js/vouchers.js?v.30.44"></script>
    <script type="text/javascript" src="js/diamonds.js?v.30.44"></script>
    <script type="text/javascript" src="js/lucky_one.js?v.30.58"></script>
    <script src="http://github.hubspot.com/odometer/odometer.js"></script>
    <!--<script type="text/javascript" src="js/simplebar.js"></script>-->

    <script type="text/javascript">
        /* window.odometerOptions = {
           // auto: false,
            format: '(ddd).dd',
           // format: 'd',
            selector: '.odometer',
            animation: 'count',
            duration: 3000,     
        }; */ 
        
          var rotated = false;
        $(".ref-btn").click(function() {
          if (!rotated) {
            $(this).find("img").css({
              "-moz-transform": "rotate(720eg)",
               "-webkit-transform": "rotate(720deg)",
                "-o-transform": "rotate(720deg)",
                 "-ms-transform": "rotate(720deg)",
                  "-webkit-transition": " -webkit-transform 2s ease-in-out",
                  "transform": "rotate(720deg)"
            }); 
          } else {
            $(this).find("img").css({
              "-moz-transform": "rotate(1440deg)",
               "-webkit-transform": "rotate(1440deg)",
                "-o-transform": "rotate(1440deg)",
                 "-ms-transform": "rotate(1440deg)",
                  "-webkit-transition": " -webkit-transform 2s ease-in-out",
                  "transform": "rotate(1440deg)"
            });
          }
          // Toggle the flag
          rotated = !rotated;
        });
        
        
        var el = document.querySelector('.odometer');

        od = new Odometer({
          el: el,
          value: 1111111,

          // Any option (other than auto and selector) can be passed in here
          format: 'd',
          //theme: 'digital'
        });
     
        // $(".roll-btn").click(function(){
        //    // od.update(21056);
        //     $('.odometer').html(100);
           
        //         $('.odometer').html(2105648);
        // });      

        /* ** Copy Link ** */
         function copyLink() {
              var copyText = document.getElementById("refLink");
              copyText.select();
              document.execCommand("copy");
              
        }
    
        $('.minMaxBet').click(function(){
            var thisid = $(this).data('id');
            //var getselected = $('#'+thisid).hasClass('selected');
            //if(getselected==true){
              //  $('#'+thisid).removeClass('selected');
            //}else{
                $('.minMaxBet').removeClass('selected');
                $('#'+thisid).addClass('selected');
            //}            
        });

        /* ** Loader ** */
        $(window).on('load', function(){
           // setTimeout(removeLoader, 3000); 
        });
        function removeLoader(){
            $( ".loader-blocks" ).fadeOut(200, function() {
                $( ".loader-blocks" ).remove(); 
            });
        }
        /* ** End Loader ** */
        
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
        window.onclick = function (e) {   

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

        }
        function myFunction() {   

            document.getElementById("myDropdown").classList.toggle("show");   

        }
        // $('.sound').click(function(e) {

        //       //e.preventDefault();

        //         $(this).find('i').toggleClass('fa-volume-up');

        // });
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
                var onOff = $(this).data('auto');
                if (e.target != cb) cb.checked = !cb.checked;
                $(this).addClass("selected", cb.checked);
                if(onOff=='on'){
                	$('#autoBetText').html('Activated');
                }
                if(onOff=='off'){
                	$('#autoBetText').html('Deactivated');
                }
        });

        /* **** Size **** */
        // $(".selct-size ul li a").on('click', function() {
        //   // in the handler, 'this' refers to the box clicked on
        //   var $box = $(this).find(":checkbox");
        //  // $($box).trigger("click");
          
        //   if ($box.is(":checked")) {
            
        //     // the name of the box is retrieved using the .attr() method
        //     // as it is assumed and expected to be immutable
        //     var group = "input:checkbox[name='" + $box.attr("name") + "']";
        //     // the checked state of the group/box on the other hand will change
        //     // and the current value is retrieved using .prop() method
        //     $(group).prop("checked", false);
        //     $(".selct-size ul li a").removeClass("selected");
        //     $box.prop("checked", true);
        //     $(this).addClass('selected');
        //   } else {
        //     $box.prop("checked", false);
        //      $box.parents('a').removeClass('selected');
        //   }
        // });

        /* **** Odd Event **** */
        // $(".selct-side ul li a").click(function(e){
        //     var cb = $(this).find(":radio")[0];
        //         $(".selct-side ul li a").removeClass("selected");
        //         if (e.target != cb) cb.checked = !cb.checked;
        //         $(this).addClass("selected", cb.checked);
        // });

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
    </script>
     <script src="js/lucky.min.js"></script>
    <script>
        $(document).ready(function(){

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
          var elem = document.getElementById("myBar");   
          var width = 1;
          var id = setInterval(frame, 5);
          function frame() {
            if (width >= 100) {
              clearInterval(id);
            } else {
              width++; 
              elem.style.width = width + '%'; 
            }
          }
        }
    </script>
</body>
</html>