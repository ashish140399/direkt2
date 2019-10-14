<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
    <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css?v.30.40" />
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css?v.30.40" />
    <link rel="stylesheet" type="text/css" href="css/nouislider.css?v.30.40" />
    <link rel="stylesheet" href="http://github.hubspot.com/odometer/themes/odometer-theme-car.css?v.30.40" />
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
        $('.ranger-block').css({"background": "url("+a+") 0 0 no-repeat", "background-size": "cover"});
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
   <div>

    <section class="main-wrapper ">
        <!-- Left Side Bar -->
        <?php include ('header.php'); ?>
        <!-- End Left Side Bar -->

        <!-- Main Center -->
        <div class="main-center-block"> 
            <header>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-6 col-sm-6 col-xs-8">
                            <div class="heading-tilte">
                                <a href="javascript:void(0);" class="bar-box"><i class="fa fa-bars"></i></a>
                                <h1><img src="images/head-ic.png" alt=""> ultimate dice</h1>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-6 col-xs-4">
                            <div class="right-heds">
                                <div class="enter-bx">
                                    <a href="#" id="login_or_not" data-toggle="modal" data-target="#pls-login"><i class="fa fa-plus"></i> Sign in</a>
                                    <a href="#" id="isLogin"><i class="fa fa-user"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
     
    
            <div class="ranger-block ultimate">
                <div style="text-align: left;position: relative;top: 10px;right: 5px; z-index: 1">
                    <button class="btn bkground_img_change" type="button" onclick='changeImage("images/lucky-banner.png")' autofocus="">1</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/31.png")'>2</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/26.png")'>3</button>
                    <button class="btn bkground_img_change " type="button" onclick='changeImage("images/30.png")'>4</button>
                </div>
               <div class="sound">
                    <i class="fa fa-volume-off fa-volume-up" aria-hidden="true" id="sound-icon"></i>
                </div>
                
                <div class="ultimate-dc">
                    <div class="row">
                        <div class="col-md-9 col-sm-9" id="oneon">
                            <div class="rang-bx">
                                <div class="slider" id="slider-pips"></div>
                                <input type="hidden" id="startVal">
                                <input type="hidden" id="endVal">
                            </div>
                        </div>
                        <div class="col-md-3 col-sm-3" id="twoon">
                            <div class="count-one count-right cneter-block">
                                <h3>Lucky number</h3>
                                <h6 id="odometer" class="odometer">0</h6>
                                <h6 id="odometer-tei" class="odometer newtoy">0</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="all-information-blok">
                <div class="row">
                    <div class="col-md-5 col-sm-5">
                        <div class="form-group">
                            <label>TRX Balance <button id="btnRefreshTRX" class="ref-btn"><img src="images/refresh.png" alt=""></button></label>
                            <div class="text-center" id="bounce_num_div">
                                <span class="bounce_number colorGreen" id="bounce_num" style=""></span>
                                <span class="bounce_number colorGreen" id="bounce_num2" style=""></span>
                            </div>
                            <input type="text" id="trxBalance" readonly="" name="" placeholder="0.00" class="form-control">
                            <span>TRX</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group activetbxs">
                            <label><b>auto betting </b>
                                <div class="customecheck">
                                    <input class="styled-checkbox" id="stoponloss" type="checkbox" value="value1">
                                    <strong for="styled-checkbox-1">Stop on Loss</strong>                                    
                                </div>
                            </label>
                            <div class="main-on">
                                <h4 id="autoBetText">Deactivated</h4>

                                <div class="act-active">
                                    <ul>
                                        <li><a href="javascript:void(0);" class="selected autoRoll" data-auto="off">
                                            <label class="checkbx">
                                                <input type="radio" name="r1" checked>
                                                <span class="checkmark"></span>
                                            </label>
                                        off</a></li>
                                        <li><a href="javascript:void(0);" class="autoRoll" data-auto="on">
                                            <label class="checkbx">
                                                <input type="radio" name="r1">
                                                <span class="checkmark"></span>
                                            </label>
                                        on</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3">
                        <div class="form-group">
                            <label></label>
                            <a href="#" id="rollDice" onclick="move()" class="roll-btn">
                                <div class="roin">Roll</div>
                                <!-- <div class="pro-roll">
                                    <div class="progress">
                                        <div class="progress-bar">
                                            <div class="progress-shadow"></div>
                                        </div>
                                    </div>
                                </div> -->
                                
                                <div style="display: none;" id="myProgress">
                                    <div id="myBar"></div>
                                </div>

                            </a>
                            <a href="#" id="rollBtn" class="roll-btn">
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
                    </div>
                </div>

                <div class="main-bet">
                    <h6>main bet</h6>
                    <div class="row">
                        <div class="col-md-5 col-sm-5">
                           <div class="form-group">
                                <input type="text" name="" id="betAmt" value="50" placeholder="50.00" class="form-control" autocomplete="off">
                                <span>TRX</span>
                            </div> 
                        </div>
                        <div class="col-md-7 col-sm-7">
                            <div class="selct-size">
                                <ul>
                                    <li><a href="javascript:void(0);" onclick="updateBetAmount('min')" id="betClass-min" class="minMaxBet" data-id="min">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r2" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    MIN</a></li>
                                    <li><a href="javascript:void(0);" onclick="updateBetAmount('hlf')" id="betClass-hlf" class="minMaxBet" data-id="hlf">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r2">
                                            <span class="checkmark"></span>
                                        </label>
                                    1/2</a></li>
                                    <li><a href="javascript:void(0);" onclick="updateBetAmount('dbl')" id="betClass-dbl" class="minMaxBet" data-id="dbl">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r2">
                                            <span class="checkmark"></span>
                                        </label>
                                    X2</a></li>
                                    <li><a href="javascript:void(0);" onclick="updateBetAmount('max')" id="betClass-max" class="minMaxBet" data-id="max">
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

                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>PAYOUT ON WIN</label>
                            <input type="text" name="" id="payout" readonly="" placeholder="19.00" class="form-control">
                            <span>TRX</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>WIN CHANCE</label>
                            <input type="text" name="" id="winChance" readonly="" placeholder="51%" class="form-control">
                            <span>%</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>MULTIPLIER</label>
                            <input type="text" name="" id="multiplier" readonly="" placeholder="1.8922" class="form-control">
                            <input type="hidden" id="hidden_multiplier" value="">
                            <span>X</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="all-information-blok side-bat-wrp">
                <div class="main-bet">
                    <h6>Side bet</h6>
                    <div class="row">
                        <div class="col-md-5 col-sm-5">
                           <div class="form-group">
                                <input type="text" name="" id="sidebetAmount" value="" class="form-control" autocomplete="off">
                                <span>TRX</span>
                            </div> 
                        </div>
                        <div class="col-md-7 col-sm-7">
                            <div class="selct-side" id="sidebet">
                                <ul>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="odd" data-id="odd">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3">
                                            <span class="checkmark"></span>
                                        </label>
                                    odd</a></li>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="even" data-id="even">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3">
                                            <span class="checkmark"></span>
                                        </label>
                                    even</a></li>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="yin" data-id="yin">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3">
                                            <span class="checkmark"></span>
                                        </label>
                                    Yin</a></li>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="yang" data-id="yang">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3">
                                            <span class="checkmark"></span>
                                        </label>
                                    yang</a></li>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="bang" data-id="bang">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3" checked>
                                            <span class="checkmark"></span>
                                        </label>
                                    bang</a></li>
                                    <li><a href="javascript:void(0);" class="btn OddEvenBet" id="zero" data-id="zero">
                                        <label class="checkbx">
                                            <input type="checkbox" name="r3">
                                            <span class="checkmark"></span>
                                        </label>
                                    zero</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>PAYOUT ON WIN</label>
                            <input type="text" name="" readonly id="sidebet-payout" placeholder="0.00" class="form-control">
                            <span>TRX</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>WINCHANCE</label>
                            <input type="text" name="" id="sidebet-winChance" placeholder="" class="form-control">
                            <span>%</span>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-4">
                        <div class="form-group">
                            <label>MULTIPLIER</label>
                            <input type="text" name="" id="sidebet-multiplier" placeholder="" class="form-control">
                            <span>X</span>
                            <input type="hidden" id="hidden_sidebetmultiplier" name="">
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

                    <li><a data-toggle="tab" href="#bet5">ALL SIDE BETS </a></li>

                    <li><a data-toggle="tab" href="#bet6">MY SIDE BETS</a></li>

                </ul>

                <div class="dropdown hdn-blk">

                    <button onclick="myFunction()" class="btn dropbtn dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">All Bets<i class="fa fa-caret-down"></i></button>

                    <ul class="dropdown-menu">

                        <ul class="nav nav-tabs" id="myDropdown">

                            <li><a data-toggle="tab" href="#bet1">My Bets</a></li>

                            <li class="active"><a data-toggle="tab" href="#bet2">All Bets</a></li>

                            <li><a data-toggle="tab" href="#bet3">High Rollers</a></li>

                            <li><a data-toggle="tab" href="#bet4">Rare Wins</a></li>

                            <li><a data-toggle="tab" href="#bet5">All Side Bets</a></li>

                            <li><a data-toggle="tab" href="#bet6">My Side Bets</a></li>

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
        <!-- End Main Center -->
        </div>

        <!-- Right Side Bar -->
        <?php include('sidebar.php'); ?>
         <!-- End Right Side Bar -->   
    </section>

 </div> 
    <script type="text/javascript" src="js/jquery.min.js?v.30.40"></script> 
    <script type="text/javascript" src="js/bootstrap.min.js?v.30.40"></script>
    <script type="text/javascript" src="js/nouislider.js?v.30.40"></script>
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
    <script type="text/javascript" src="js/ultimate-dice-script.js?v.30.69"></script>
    <!--<script type="text/javascript" src="js/simplebar.js"></script>-->
    <script src="http://github.hubspot.com/odometer/odometer.js"></script>

    <script type="text/javascript">
    
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
    
    
    
        // window.odometerOptions = {
        //   // auto: false,
        //     format: '(ddd).dd',
        //     /*selector: '.odometer',*/
        //     animation: 'count',
        //     duration:6000,     
        // };
     
        /* ** Loader ** */
        $(window).on('load', function(){
           // setTimeout(removeLoader, 3000); 
            $('#poip-fri').show();
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
        $('.minMaxBet').click(function(){
            var thisid = $(this).data('id');
            //var getselected = $('#betClass-'+thisid).hasClass('selected');
            //if(getselected==true){
             //   $('#betClass-'+thisid).removeClass('selected');
            //}else{
                $('.minMaxBet').removeClass('selected');
                $('#betClass-'+thisid).addClass('selected');
            //}            
        });
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
        $('.OddEvenBet').click(function(){
            var thisid = $(this).data('id');
            
            var getselected = $('#'+thisid).hasClass('selected');
            if(getselected==true){
                $('.OddEvenBet').removeClass('selected');
            }else{
                $('.OddEvenBet').removeClass('selected');
                $('#'+thisid).addClass('selected');
            }            
        });
        // $(".selct-side ul li a").click(function(e){
        //     var cb = $(this).find(":checkbox")[0];
        //         //$(".selct-side ul li a").removeClass("selected");
        //         if (e.target != cb) cb.checked = !cb.checked;
        //         $(this).toggleClass("selected", cb.checked);
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
        var pipsSlider = document.getElementById('slider-pips');

        noUiSlider.create(pipsSlider, {
            range: {
                min: 0,
                max: 99
            },
            step: 1,

            start: [25,  75],
            connect: true,
            // Move handle on tap, bars are draggable
           
            tooltips: true,
            format: wNumb({
                decimals: 0
            }),
            pips: {mode: 'count', values: 5}
        });

        pipsSlider.noUiSlider.on('update', function (values, handle) {
            var start, end;
            var startValue = parseInt(values[0]);
            var endValue = parseInt(values[1]);
                if((endValue - startValue) > 94) {
                  if(endValue > 94) {
                      let val_0 = endValue - 94;
                      values[0] = val_0;
                  }
                  if(startValue < 5) {
                      let val_1 = 94 + startValue;
                      values[1] = val_1;
                    }
                    pipsSlider.noUiSlider.set([values[0], values[1]]);
                }

                values[0] >= 10 ? start = values[0] : start = "0" + values[0];
                values[1] >= 10 ? end = values[1] : end = "0" + values[1];
                $('#startVal').val(start);
                $('#endVal').val(end);
                getMultiplierValue(start, end);
        });
        // var connect = pipsSlider.querySelectorAll('.noUi-origin'); 
        // var classes = ['dice-prb', '']; 
        // for (var i = 0; i < connect.length; i++) { 
        //     connect[i].nextSibling.classList.add(classes[i]);
        // }

            //pipsSlider.setAttribute('disabled', true);


        var pips = pipsSlider.querySelectorAll('.noUi-value');

        function clickOnPip() {
            var value = Number(this.getAttribute('data-value'));
            pipsSlider.noUiSlider.set(value);
        }

        for (var i = 0; i < pips.length; i++) {

            // For this example. Do this in CSS!
            pips[i].style.cursor = 'pointer';
            pips[i].addEventListener('click', clickOnPip);
        }

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
  

  //$(".send-btn").click(function() {
  //  var data = $("#btn-input").val();
      //  alert("1");
        
      //  $('chat_log').append('<div class="row msg_container base_receive"><div class="col-md-10 col-xs-10"><div class="messages msg_receive"><p>'+data+'</p></div></div></div>');
        //clearInput();
        //$("#chatDiv").stop().animate({ scrollTop: $("#chatDiv")[0].scrollHeight}, 1000);
        	//$("#tab1 .right-box").mCustomScrollbar({
        	  //  theme:"minimal",
        	
        	 			//	});
				 
//});
  
  
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