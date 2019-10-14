    <?php 
        if(isset($_GET['refid']) && $_GET['refid']!==''){
            $refid=$_GET['refid'];
            $index_url = "index.php?refid=".$refid;
            $howtoplay_url="howtoplay.php?refid=".$refid;
            $classic_dice_url = "classic-dice.php?refid=".$refid;
            $ultimate_dice_url = "ultimate-dice.php?refid=".$refid;
            $lucky_url = "lucky.php?refid=".$refid;
        }else{
            $refid="";
            $index_url = "index.php";
            $howtoplay_url="howtoplay.php";
            $classic_dice_url = "classic-dice.php";
            $ultimate_dice_url = "ultimate-dice.php";
            $lucky_url = "lucky.php";
        }
    $ultimate = '';
    $lukypg = '';
    $howtoplay ='';
    $dice ='';
    $active = '';
    $actives = '';
    $uri_parts = explode('?', $_SERVER['REQUEST_URI'], 2);
    $baseurl = basename($uri_parts[0]);
    if($baseurl == 'index.php'){
        $actives = 'active';
        $active = 'active';
    }else if($baseurl=='classic-dice.php'){
        $classicpg = 'active';
    }else if($baseurl=='ultimate-dice.php'){
        $ultimate = 'active';
    }else if($baseurl=='lucky.php'){
        $lukypg = 'active';
    }else if($baseurl=='howtoplay.php'){
        $howtopg = 'active';
    }else{
         $actives = 'active';
         $active = 'active';
    }
    ?>

    <!-- Invite Friend -->
    <div id="invite-fri" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>

                <div class="invite-wrps">                    
                    <h1>Get rewarded just by referring your friends!</h1>

                    <p>We offer a lifetime referral rewards program. Just simply refer your friends and family, you will receive up to 0.10% of all their wagers! <span>You will receive the referral rewards automatically, and it will be withdrawable instantly.</span> <strong>Copy your unique referral link below, and share!</strong></p>

                    <div class="refrel-wrp">
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label>YOUR PERSONAL REFERRAL LINK</label>
                                    <input type="text" id="refLink" readonly="" name="" value="https://www.trontopia.co" class="form-control">
                                    <a href="#"><span onclick="copyLink()">copy</span></a>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group withdrw">
                                    <label>REFERRAL BONUS</label>
                                    <input type="text" name="" id="my_bonus" readonly="" value="0.00" class="form-control">
                                    <span id="withdrawReferralBonus">withdraw</span>
                                </div>
                            </div>
                        </div>

                        <div class="progress-report-block">
                            <h4>Current Level: <span id="ref-cur-lvl">Bronze Referral(0.20%)</span> <strong><span id="ref_wager">0</span> / <span id="ref_wager_to">1,000,000,000</span></strong></h4>

                            <div class="progress-bx">
                                <div class="icnbxon progress-bx_icnbxon">
                                    <img id="ref-left-image" src="images/nut1bronze.png" alt="">
                                </div>
                                <div class="progress progress-bx_progress">
                                    <div class="progress-bar" id="referral_progress" role="progressbar" data-percent="0" style="max-width:80%">
                                    </div>
                                </div>
                                <div class="icnbxon progress-bx_icnbxon">
                                    <img id="ref-right-image" src="images/nut2silver.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="dowl">
                        <h6><a href="./TRONTOPIAMarketingPack.zip"><img src="images/coude.png" alt=""> download</a> marketing package</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Invite Friend -->
   <!--INFO MODAL-->
    <div id="info_modal_topia" class="modal fade" role="dialog" style="z-index: 1000">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>TOPIA</h1>

                    <div class="refrel-wrp login-wrp">
                        
                    <p><font color="#0cd6cf">1.</font>  TOPIA is minted with every wager placed while playing our games.</p>
                    <p><font color="#0cd6cf">2.</font>  TOPIA can be traded, or frozen for TRX rewards.</p>
                    <p><font color="#0cd6cf">3.</font>  Freezing Topia will include you into the Reward Distribution Pool.</p>
                    <p><font color="#0cd6cf">4.</font>  The longer you stay frozen, the better rewards you will receive!</p>
                    <br><p><font color="#0cd6cf">Day 0-30</font>: Receive <font color="#cd7f32">75%</font><br>
                    <p><font color="#0cd6cf">Day 30-60</font>: Receive <font color="#D3D3D3">85%</font><br>
                    <p><font color="#0cd6cf">Day 60+</font>: Receive <font color="#FFD700">100%</font></p>
                    <br>
                    <p><font color="#0cd6cf">5.</font>  There is a 24 hour thawing period to Unstake your Topia. Your Stake Tier will Reset to Bronze (0 Days). You will not receive a Reward distribution while thawing, after thawing is completed, you can withdraw your Topia to your wallet.</p>
                    
                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>                      
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="info_modal_voucher" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>VOUCHERS</h1>

                    <div class="refrel-wrp login-wrp">
                     
                    <p><font color="#0cd6cf">1.</font>  Vouchers are minted alongside TOPIA while playing our games.</p>
                    <p><font color="#0cd6cf">2.</font>  Vouchers cannot be traded, they have only two functions. Burn them, or hold them.</p>
                    <p><font color="#0cd6cf">3.</font>  Burning Vouchers will mint you Shares tokens.</p>
                    <p>Mainbet Mints <font color="#0cd6cf">1x</font> Vouchers @ 138 TRX<br>
                    Sidebet Mints <font color="#0cd6cf">2x</font> Vouchers @ 138 TRX<br>
                    Classic Dice Mints <font color="#0cd6cf">1x</font> Vouchers @ 276 TRX<br>
                    Lucky One Max Mints <font color="#0cd6cf">1x</font> Vouchers @ 100 TRX</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>                       
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="info_modal_diamonds" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>DIAMONDS</h1>

                    <div class="refrel-wrp login-wrp">
                        <p><font color="#0cd6cf">1.</font>  Diamonds are tradable, and can instantly stake/unstake.</p>
                    <p><font color="#0cd6cf">2.</font>  Staking Diamonds will include your Diamonds into the daily raked Diamond TRX reward pool distribution.</p>
                    <p><font color="#0cd6cf">3.</font>  Half of the House Edge of Every Game on TRONTOPIA is raked to this pool, daily.</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="info_modal_shares" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>SHARES</h1>

                    <div class="refrel-wrp login-wrp">
                    <p><font color="#0cd6cf">1.</font>  You can earn Shares by burning Vouchers.</p>
                    <p><font color="#0cd6cf">2.</font>  Shares are tradable and can instantly stake/unstake.</p>
                    <p><font color="#0cd6cf">3.</font>  Staking shares will include your shares into the daily TRC10 and TRC20 Shares reward pool distribution.</p>
                    <p><font color="#0cd6cf">4.</font>  10% of Topia Reward Pool will be used to fund the Shares pool, daily.</p>
                    <p><font color="#0cd6cf">5.</font>  Minting Rate for Shares is always:<br>
                    <font color="#0cd6cf">1:1</font> Voucher:Share</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>            
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="info_modal_fairness" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>FAIRNESS</h1>

                    <div class="refrel-wrp login-wrp">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="info_modal_token" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>TOKEN</h1>

                    <div class="refrel-wrp login-wrp">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <!--INFO MODAL end-->
    <!-- Dividends -->
    <div id="dividend" class="modal fade" role="dialog" style="z-index: 999">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <div class="divid-tabs">
                        <ul class="nav nav-tabs">
                            <li class="active"><a data-toggle="tab" href="#td1" id="dividendPopup">topia</a></li>
                            <!--<li><a data-toggle="tab" href="#td2" id="voucherPopup">vouchers</a></li>-->
                            <li><a data-toggle="tab" href="#td3" id="diamnodsPopup">diamonds</a></li>
                            <li><a data-toggle="tab" href="#td4" id="sharesPopup">shares</a></li>
                        </ul>

                        <div class="tab-content">
                            <div id="td1" class="tab-pane fade in active">
                                <div class="refrel-wrp divi-step">
                                    <h3 style="text-align:center;">For More Information: Click <span><a href="#" alt="" data-toggle="modal" data-target="#info_modal_topia" target=""><font color="#0cd6cf">Here</font></a></span></h3>
                                    <h3><span><font color="white">Stage:</font> <span id="stageNumber">1</span></span>(Play <span id="stageTRX">833</span>TRX to mine <font color="#0CD6C">1</font> TOPIA) <strong>Next Stage: <span id="stageNumber2">2</span> (Play <span id="stageTRX2">1000</span> TRX to mine <font color="#0CD6C">1</font> TOPIA)</strong></h3>

                                    <div class="dif-progers">
                                        <div class="bar-one bar-con">
                                            <div id="topia-progress" class="bar" data-percent="0"></div>
                                            <span class="title" id="ante-jd-text">Loading..</span>
                                        </div>
                                    </div>

                                    <br>
                                    <h5>Available Rewards</h5>

                                    <label><span id="dividends">0</span> <span>TRX</span></label>

                                    <p>A total of <span id="totalFrozenTopia">0</span> TOPIA is staked across the network - You will receive <span id="approxUserDividends">0</span> TRX Rewards Countdown: <span id="dividendCountdown"></span></p>
                                     <p id="frzDiv" style="display:none;">A total of <span id="myUnFrozenTopia"></span> is being Unstaked. Unstake Countdown: <span id="unFreezeCountDown"></span></p>
                                </div>

                                <div class="refrel-pro">
                                    <h4 id="freeze-tier-lvl">Current Level: Bronze Stake(75% Reward) <span>Till &nbsp;<span id="till_what_reward">Silver Stake(85% Reward)</span></span></h4>
                                    <div class="progress-bx">
                                        <div class="icnbxon">
                                            <img  id="div-left-image" src="images/freeze1.png" alt="">
                                        </div>
                                        <div class="progress">
                                            <div class="center-bx">
                                                <div class="bar-two bar-con">
                                                    <div id="freeze-progress" class="bar" data-percent="80"></div>
                                                    <span class="title"><span id="days">0 Days</span> / <span id="days-to-complete">60 Days</span></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="icnbxon">
                                            <img id="div-right-image" src="images/freeze2.png" alt="">
                                        </div>
                                        <div class="up-re">
                                            <a href="#" id="upgrade">Upgrade</a>
                                        </div>
                                    </div>
                                </div>

                                <div class="action-divi">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>WITHDRAW TRX</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableDividend">0.00</h3>
                                                    <a href="#" class="withbtn" id="withdrawTrxBtn">withdraw</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>WITHDRAW TOPIA</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableToken">0.00</h3>
                                                    <a href="#" class="withbtn-te" id="withdrawTopiaBtn">withdraw</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>STAKE TOPIA</h5>
                                                <div class="divibx">
                                                    <input type="hidden" name="" id="myAvailableToken3" value="0">
                                                    <h3 id="myAvailableToken2">0.00</h3>
                                                    <a href="#" class="freeze" id="freezeTopia" data-toggle="modal" data-target="#freezeTokenPopup">STAKE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>STAKED TOPIA</h5>
                                                <div class="divibx">
                                                    <h3 id="myFreezeToken2">0.00</h3>
                                                    <input type="hidden" id="myFreezeToken" placeholder="0 Topia" style="color: #0cd6cf;" disabled="">
                                                    <a href="#" id="unfreezeTopia">unstake</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          <!--  <div id="td2" class="tab-pane fade">
                                <div class="refrel-wrp divi-step">
                                    <h3><span>Current Level : </span> (Play <span id="v-stageTRX">100</span> TRX to mine 1 VOUCHER) <strong>Next Level : (Play <span id="v-stageTRX2">100</span> TRX to mine 1 TOPIA)</strong></h3>
                                    <div class="progress-bx">
                                        <div class="dif-progers">
                                            <div class="bar-one bar-con">
                                                <div id="voucher-progress" class="bar" data-percent="0"></div>
                                                <span class="title" id="voucher-jd-text">Loading..</span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <h5>Available Rewards</h5>

                                    <label><span id="voucherDividends">0.00</span> <span>TRX</span></label>

                                    <p>A total of <span id="totalVoucherBurned--">0</span> VOUCHERS are burned across the network - You will receive <span id="approxUserVoucherDividends">0</span> TRX Rewards Countdown : <span id="voucherDividendCountdown"></span></p>
                                </div>

                                <div class="action-divi">
                                    <div class="row">
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>VOUCHERS BURNED</h5>
                                                <div class="divibx">
                                                    <h3 id="vouchersBurned">0.00</h3>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>WITHDRAW DIVIDEND</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableVoucherDividendText">0.00</h3>
                                                    <input type="hidden" value="0.00" id="myAvailableVoucherDividend" name="">
                                                    <a href="#" id="withdrawVoucherTrxBtn" class="freeze">withdraw</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>BURN VOUCHER</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableVoucher">0</h3>
                                                    <input type="hidden" id="myAvailableVoucher2" value="0.00" name="">
                                                    <a href="#" class="withbtn" data-target="#burnVoucher" data-toggle="modal">burn</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>PRE-BURN ESTIMATE</h5>
                                                <div class="divibx">
                                                    <h3 id="preBurnEstimate">0</h3>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                            <div id="td3" class="tab-pane fade">
                                <div class="refrel-wrp divi-step">
                                    <h3 style="text-align:center;">For More Information: Click <span><a href="#" alt="" data-toggle="modal" data-target="#info_modal_diamonds" target=""><font color="#0cd6cf">Here</font></a></span></h3>                   
                                    <!-- <h3 style="text-align:center;">Current Level : (Burn 1 VOUCHER to mine 0.001 DIAMOND)</h3> -->
                                    <div class="progress-bx">
                                        <div class="dif-progers">
                                            <div class="bar-one bar-con">
                                                <div id="diamond-progress" class="bar" data-percent="0"></div>
                                                <span class="title" id="diamond-jd-text">Loading..</span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>

                                    <h5>Available Rewards</h5>
                                    <label><span id="diamondsDividends">0.00</span> <span>TRX</span></label>
                                    <p>A total of <span id="totalDiamondsFrozen">0</span> DIAMONDS are staked across the network - You will receive <span id="approxUserDiamondDividends">0</span> TRX Rewards Countdown: <span id="diamondDividendCountdown">0:00:00</span></p>                    
                                </div>
                            
                                <div class="action-divi">
                                    <div class="row">
                                        <div class="col-md-4 col-sm-4">
                                            <div class="withdrv-div">
                                                <h5>WITHDRAW TRX</h5>
                                                <div class="divibx">
                                                    <h3 id="diamondsDividendConfirmed">0.00</h3>
                                                   
                                                    <a href="#" class="withbtn-te" id="withdrawDiamondsDividendBtn">WITHDRAW</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="withdrv-div">
                                                <h5>STAKE DIAMONDS</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableDiamonds">0.00</h3>
                                                    <input type="hidden" id="myAvailableDiamonds2" value="0.00" name="">
                                                    <a href="#" class="freeze" id="freezeDiamondsBtn" data-toggle="modal" data-target="#freezeDiamonds">STAKE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-sm-4">
                                            <div class="withdrv-div">
                                                <h5> STAKED DIAMONDS</h5>
                                                <div class="divibx">
                                                    <h3 id="myFrozenDiamonds2">0.00</h3>
                                                    <input type="hidden" id="myFrozenDiamonds" value="0.00" name="">
                                                    <a href="#" id="unfreezeDiamondsBtn">unstake</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="td4" class="tab-pane fade">
                                <div class="refrel-wrp divi-step">
                                    <h3 style="text-align:center;">For More Information: Click <span><a href="#" alt="" data-toggle="modal" data-target="#info_modal_shares" target=""><font color="#0cd6cf">Here</font></a></span></h3> 
                                    <h3 style="text-align:center;">Burn <font color="#0CD6C">1</font> VOUCHER to mine <font color="#0CD6C">1</font> SHARE</h3> 
                                    <div class="progress-bx">
                                        <div class="dif-progers">
                                            <div class="bar-one bar-con">
                                                <div id="shares-progress" class="bar" data-percent="0"></div>
                                                <span class="title" id="shares-jd-text">Loading..</span>
                                            </div>
                                        </div>
                                    </div>
                                    <br>
                                    <h3 style="text-align:center;" id="trxTopiaVoucherText">Play <span style="color:#0CD6C;" id="trxToPlay">0</span>TRX to mine <span id="voucherToMine" style="color:#0CD6C;">1</span>VOUCHER</h3>
                                    <div class="available-bx" style="text-align: center;">
                                        <h3>TRX Accumulated</h3>
                                        <label><span id="accumulatedTRX">00</span> <span>TRX</span></label>
                                        
                                        <h3>Available Rewards</h3>
                                        
                                        <div class="row">
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="padding: 7px 0;">Pool Size</div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="padding: 7px 0;">You'll Receive</div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="padding: 7px 0;">Your Rewards</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="color: #0CD6CF">
                                                <div class="col-md-6 col-sm-6 col-xs-12 text-right">
                                                    <img src="images/topia-min.png" width="35px" alt="TOPIA" style="display: inline-block;margin-right: 10px;">
                                                
                                                </div>
                                                
                                                <div class="col-md-6 col-sm-6 col-xs-12 text-left text-right-m" style="padding: 7px 0;">
                                                  TOPIA: (<span id="topiaSharesText">0.00</span>)
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #0CD6CF">(<span id="topiaShareUser">0.00</span>)</div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #0CD6CF">(<span id="topiaShareUserDividend">0.00</span>)</div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="color: #01f593">
                                                <div class="col-md-6 col-sm-6 col-xs-12 text-right">
                                                    <img src="images/Shares.png" width="33px" alt="Topia Shares" style="display: inline-block;margin-right: 10px;">
                                                
                                                </div>
                                                
                                                <div class="col-md-6 col-sm-6 col-xs-12 text-left text-right-m" style="padding: 7px 0;">
                                                  SHARE: (<span id="shareSharesText">0.00</span>)
                                                </div>
                                                
                                            </div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #01f593">(<span id="shareShareUser">0.00</span>)</div>
                                            <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #01f593">(<span id="shareShareUserDividend">0.00</span>)</div>
                                        </div>
                                        <div class="row">
                                          <div class="col-md-4 col-sm-4 col-xs-4 text-center" style="color: #fff;">
                                              <div class="col-md-6 col-sm-6 col-xs-12 text-right">
                                              <img src="images/BTT.png" width="35px" alt="BitTorrent" style="display: inline-block;margin-right: 9px;"> 
                                              </div>
                                              <div class="col-md-6 col-sm-6 col-xs-12 text-left text-right-m" style="padding: 7px 0;">
                                                BTT: (<span id="bttSharesText">0.00</span>)
                                              </div>
                                          </div>
                                          <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #fff;">(<span id="bttShareUser">0.00</span>)</div>
                                          <div class="col-md-4 col-sm-4 col-xs-4 text-center padding-bottom-m" style="padding: 7px 0;color: #fff;">(<span id="bttShareUserDividend">0.00</span>)</div>
                                        </div>
                                    
                                        <p>A total of <span id="frozenSharesGlobal">0</span> SHARES are staked across the network.  <br>Countdown: <span id="sharesDividendCountdown">10: 17: 42</span></p>
                                        
                                    </div>
                                   
                                </div>

                                <div class="action-divi">
                                    <div class="row">
                                      <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>BURN VOUCHER</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableVoucher">0</h3>
                                                    <input type="hidden" id="myAvailableVoucher2" value="0.00" name="">
                                                    <a href="#" class="withbtn" data-target="#burnVoucher" data-toggle="modal">burn</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>WITHDRAW ALL</h5>
                                                <div class="divibx">
                                                    <h3>&nbsp;</h3>
                                                    <a href="#" class="withbtn-te" id="withdrawSharesEverythingBtn">withdraw</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>STAKE SHARES</h5>
                                                <div class="divibx">
                                                    <h3 id="myAvailableShares">0.00</h3>
                                                    <input type="hidden" id="myAvailableShares2" value="0.00">
                                                    <a href="#" class="freeze" id="freezeShareBtn" data-toggle="modal" data-target="#freezesharesPopup">STAKE</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-3 col-sm-3">
                                            <div class="withdrv-div">
                                                <h5>STAKED SHARES</h5>
                                                <div class="divibx">
                                                    <h3 id="usersShareFrozen">0.00</h3>
                                                    <a href="#" id="unfreezeShareBtn">unstake</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Dividends -->

    <!-- sub-popups -->

    <!-- burnVoucher -->
    <div id="burnVoucher" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" id="closeBurnPopup" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>BurnVoucher </h1>

                    <form>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-12 col-form-label text-white" style="color: #fff;">Voucher Balance : <b id="voucherBalance">0</b></label>
                        <!--<div class="col-sm-8">-->
                        <!--  <input type="text" readonly class="form-control-plaintext" id="voucherBalance" style="border: none;">-->
                        <!--</div>-->
                      </div>
                      <!-- <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Select one option from Below :</label>
                             <div class="col-sm-8">
                            <select class="form-control" id="voucherBurnType" style="border-radius: 25px;border: 2px solid #0cd6cf;">
                                <option value="0">Burn for TRX</option>
                                <option value="1">Burn for Both</option>
                                <option value="2">Burn for Shares</option>
                            </select>
                            </div>
                      </div> -->
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Enter Desire Burn Amount Below :</label>
                        <!--<div class="col-sm-4">-->
                        <!--  <input type="button" readonly class="btn btn-default" value="All" style="border: none;">-->
                        <!--</div>-->
                      </div>
                      <div class="form-group row">
                          <!--<input type="number" class="form-control" id="voucherToBurn" placeholder="Enter Vouchers" style="width: 70%;border: 2px solid #0cd6cf;">-->
                          
                          
                          <div class="col-sm-8">
                              <input type="hidden" id="voucherBurnType" value="2">
                          <input type="number" class="form-control" id="voucherToBurn" placeholder="Enter Vouchers" style="background: rgba(20, 23, 32, 0.70);border:none;border-radius: 5px;color: #fff;box-shadow: 0 0 30px rgba(0,0,0,0.20);border-bottom: 1px solid rgba(12, 214, 207, 0.4);">
                          </div>
                          <div class="col-sm-4" style="padding-left: 0;">
                          <button type="button" class="btn btn-primary" id="showAllVouchers" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">All</button>
                            </div>
                          
                      </div>
                    </form>
               </div>
               
               <div class="modal-footer with-bx-v" style="border-top: none;">
                    <button type="button" id="btnBurnVoucher" class="btn btn-primary btn-main-voucher" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">OK</button>
                    <button type="button" id="btnBurnCancel" class="btn btn-secondary btn-main-voucher" data-dismiss="modal" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">Cancel</button>
                </div>
            </div>
       


       </div>
    </div>
    <!-- End burnVoucher -->

    <!-- burnVoucher2 -->
    <div id="burnVoucher2" class="modal fade sub-models" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content referrals-pop">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>BurnVoucher </h1>

                    <form>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-12 col-form-label text-white" style="color: #fff;">Voucher Balance : <b id="voucherBalance2">0</b></label>
                        <!--<div class="col-sm-8">-->
                        <!--  <input type="text" readonly class="form-control-plaintext" id="voucherBalance" style="border: none;">-->
                        <!--</div>-->
                      </div>
                      
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Enter Desire Burn Amount Below :</label>
                        
                      </div>
                      <div class="form-group row">
                          
                          <div class="col-sm-8">
                          <input type="number" class="form-control" id="voucherToBurn2" placeholder="Enter Vouchers" style="border-radius: 25px;border: 2px solid #0cd6cf;">
                          </div>
                          <div class="col-sm-4" style="padding-left: 0;">
                          <button type="button" class="btn btn-primary" id="showAllVouchers2" style="padding: 8px 15px;border-radius: 10px;font-size: 18px;font-weight: 500;color: #fff;background: #0cd6cf;">All</button>
                            </div>
                          
                      </div>
                    </form>
               </div>
               
               <div class="modal-footer with-bx-v" style="border-top: none;">
                    <button type="button" id="btnBurnVoucher2" class="btn btn-primary btn-main-voucher" style="padding: 8px 15px;border-radius: 10px;font-size: 18px;font-weight: 500;color: #fff;background: #0cd6cf;">OK</button>
                    <button type="button" class="btn btn-secondary btn-main-voucher" data-dismiss="modal" style="padding: 8px 15px;border-radius: 10px;font-size: 18px;font-weight: 500;color: #fff;background: #0cd6cf;">Cancel</button>
                </div>
            </div>
       


       </div>
    </div>
    <!-- End burnVoucher -->

     <div id="freezeTokenPopup" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                <div class="invite-wrps">                    
                    <h1>Stake Tokens </h1>
                    <form>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-12 col-form-label text-white" style="color: #fff;">Token Balance : <b id="tokenBalance">0.00</b></label>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Enter Desire Token Amount Below :</label>
                      </div>
                      <div class="form-group row">
                          <div class="col-sm-8">
                          <input type="number" class="form-control" id="tokenToFreeze" placeholder="Enter Tokens" style="background: rgba(20, 23, 32, 0.70);border:none;border-radius: 5px;color: #fff;box-shadow: 0 0 30px rgba(0,0,0,0.20);border-bottom: 1px solid rgba(12, 214, 207, 0.4)">
                          </div>
                          <div class="col-sm-4" >
                          <button type="button" class="btn" id="showAllTokens" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">All</button>
                            </div>     
                      </div>
                    </form>
                </div>
                <div class="modal-footer with-bx-v" style="border-top: none;padding: 15px 15px 0px 15px">
                    <button type="button" id="btnTokenFreeze" class="btn btn-main-voucher" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">OK</button>
                    <button type="button" id="btnFreezeCancel" class="btn btn-secondary btn-main-voucher" data-dismiss="modal" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">Cancel</button>
                </div>
            </div>
        </div>
    </div>
   
    <!-- End freezeTopia -->

    <!-- freezeshares -->

  
    <div id="freezesharesPopup" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                <div class="invite-wrps">                    
                    <h1>Stake Shares</h1>
                    <form>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-12 col-form-label text-white" style="color: #fff;">Shares Balance : <b id="sharesBalance">0</b></label>
                      </div>
                      <div class="form-group row">
                        <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Enter Desire Shares Amount Below :</label>
                      </div>
                      <div class="form-group row">
                          <div class="col-sm-8">
                          <input type="number" class="form-control" id="sharesToFreeze" placeholder="Enter Shares" style="background: rgba(20, 23, 32, 0.70);border:none;border-radius: 5px;color: #fff;box-shadow: 0 0 30px rgba(0,0,0,0.20);border-bottom: 1px solid rgba(12, 214, 207, 0.4);">
                          </div>
                          <div class="col-sm-4" >
                          <button type="button" class="btn" id="showAllShares" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">All</button>
                            </div>
                          
                      </div>
                    </form> 
                </div>
                <div class="modal-footer with-bx-v" style="border-top: none;padding: 15px 15px 0px 15px">
                    <button type="button" id="btnFreezeShares" class="btn btn-main-voucher" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">OK</button>
                    <button type="button" class="btn btn-secondary btn-main-voucher" data-dismiss="modal" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">Cancel</button>
                </div>
            </div>
        </div>
    </div>
 
    <!-- End shares -->

    <!-- freezeDiamonds -->
   
    <div id="freezeDiamonds" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>Stake Diamonds</h1>

                    <div class="refrel-wrp login-wrp">
                        <form>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-12 col-form-label text-white" style="color: #fff;">Diamonds Balance : <b id="diamondsBalance">0</b></label>
                            </div>
                            <div class="form-group row">
                                <label for="staticEmail" class="col-sm-8 col-form-label text-white" style="color: #fff;">Enter Desire Diamonds Amount Below :</label>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-8">
                                    <input type="number" class="form-control" id="diamondsToFreeze" placeholder="Enter Diamonds" style="background: rgba(20, 23, 32, 0.70);border-radius: 5px;color: #fff;box-shadow: 0 0 30px rgba(0,0,0,0.20);border-bottom: 1px solid rgba(12, 214, 207, 0.4);padding: 8px 15px">
                                </div>
                                <div class="col-sm-4">
                                    <button type="button" class="btn " id="showAllDiamonds" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">All</button>
                                </div>
                            </div>
                        </form>                        
                    </div>
                </div>
                 <div class="modal-footer with-bx-v" style="border-top: none;padding: 15px 15px 0px 15px">
                    <button type="button" id="btnFreezeDiamonds" class="btn  btn-main-voucher" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">OK</button>
                    <button type="button" id="btnfreezeDiamondCancel" class="btn btn-secondary btn-main-voucher" data-dismiss="modal" style="padding: 8px 15px;border-radius: 5px;font-size: 14px;font-weight: bold;background: -webkit-linear-gradient(45deg, rgba(16,135,135,0.09) 0%,rgba(12,214,207,0.09) 100%);color: #0CD6CF;text-shadow: 0 0 15px #0CD6CF;border-color: none">Cancel</button>
                </div>
            </div>
        </div>
    </div>
  
    <!-- freeze Diamonds -->

    <!-- BUYDiamonds -->
    <div id="buyDiamondsPopup" class="modal fade" role="dialog">
       <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>DIAMONDS</h1>
                    <div class="refrel-wrp divi-step">
                        <h3 style="text-align:center;">For More Information: Click <span><a href="#" alt="" data-toggle="modal" data-target="#new-popdiamonds" target=""><font color="#0cd6cf">Here</font></a></span></h3>                   
                        <h3 style="text-align:center;">Current Round : (BUY 1 DIAMOND FOR 0 TRX)</h3>
                        <div class="loading-divi">
                            <h4>Loading..</h4>
                        </div>
                        <h6 class="step-note">Next Round : <span id="icoNextRoundNumber">2</span> (   BUY 1 DIAMOND FOR <span id="icoBuyDiamondPriceNext">0</span> TRX   )</h6>

 
                        <div class="withdr-bx">
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                   <div class="with-bx with-bx1">                                
                                        <h5>DIAMOND AMOUNT</h5>
                                        <input type="number" name="" id="diamondsToBuy" placeholder="1.00">
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="divibx with-bx1 with-bx1-none">                                
                                        <h5>Current Price</h5>
                                        <input type="" name="" id="buyDiamondFinalPrice" placeholder="0.00" disabled="">
                                         <a href="#" class="withbtn-te" id="withdrawTopiaBtn" data-toggle="modal" data-target="#btnBuyDiamondFinal">BUY DIAMONDS</a>
                                    </div>
                                </div>
                            </div>   
                            
                            <div class="row">
                                <div class="col-md-6 col-sm-6">
                                    <div class="col-sm-8 col-sm-offset-4 text-left-p">
                                        <p>Round 1: <span style="color: #0cd6cf;" id="priceRound1">625</span> TRX</p>
                                        <p>Round 2: <span style="color: #0cd6cf;" id="priceRound2">875</span> TRX</p>
                                        <p>Round 3: <span style="color: #0cd6cf;" id="priceRound3">1125</span> TRX</p>
                                        <p>Round 4: <span style="color: #0cd6cf;" id="priceRound4">1325</span> TRX</p>
                                    </div>
                                </div>
                                <div class="col-md-6 col-sm-6">
                                    <div class="col-sm-12 text-left-p">
                                        <p>FOR 1 DIAMOND VOUCHER</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- BUY Diamonds -->

    <!-- Provably Fair Betting -->
    <div id="fair-bet" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>Provably Fair Betting</h1>

                    <div class="refrel-wrp fiar-wrp">
                        <form>
                            <div class="form-group">
                                <label>Current Seed (SHA256) :</label>
                                <input type="text" name="" id="cur_seeds" placeholder="" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>Enter Your Custom Seed :</label>
                                <input type="text" name="" placeholder="" id="new_seeds" class="form-control">
                            </div>

                            <div class="form-group">
                                <label>New Seed (SHA256) :</label>
                                <input type="text" name="" id="formated_seeds" placeholder="" class="form-control">
                            </div>

                            <button class="btn-update" id="new_seedValue">Update</button>
                        </form>
                    </div>

                    <div class="fair-noted">
                        <p>All bets on TRONTOPIA are placed directly to our Smart Contracts on the blockchain. The wager results are verifiable on the blockchain by viewing the transaction ID's for your wagers.

                        <p><span>You can enter your own seed above, to be utilized for your wagers. This can be changed at your own will. If you do not enter your own seed, then a random seed will be used.</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Provably Fair Betting -->
    <!-- Live Help -->
    <div id="livehelp" class="modal fade" role="dialog" style="z-index: 1000">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>Live Help</h1>

                    <div class="refrel-wrp login-wrp">
                        
                    <p><font color="#0cd6cf">Telegram</font>  <a href="https://t.me/trontopia" target="_blank">TRONTOPIA</a></p>
                    <br>
                    <p>Click the TRONTOPIA Telegram (Button Above) for Live Chat Help 24 Hours a Day.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Live Help -->
    <!-- Disclaimer -->
    <div id="disclaimerPopup" class="modal fade" role="dialog" style="z-index: 1000">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>Disclaimer</h1>

                    <div class="refrel-wrp login-wrp">
                        
                    <p>Please do not click on any links on this site if you reside in a location where gambling, betting, or lottery over the internet is illegal.  All visitors must must be 21 years of age to participate in any activities on this site regardless of any local law that may be in conflict.  Players are responsible for checking all local laws within their jurisdiction to ensure proper understanding of activities covered.

TRONtopia provides its players with the world's first undoubtedly fair e-Gaming platform!  We encourage all players to consider the fact that online gambling may expose the player to a particular level of financial risk.  Because of this, it is strongly advised that our players remain aware of the risks involved at all times and take appropriate action.

Our goal is to provide a safe, fair, and fun experience to all of our customers.  If you feel that you require assistance with any gambling related addiction, please contact one of our Administrators in our <a href="https://t.me/trontopia">Telegram</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Disclaimer -->
    <!-- PLEASE LOGIN TO TRONLINK -->
    <div id="pls-login" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>PLEASE LOGIN TO TRONLINK</h1>

                    <div class="refrel-wrp login-wrp">
                        <img src="images/login-ic.png" alt="">

                        <p>TRONLINK WALLET INSTALLED PLEASE VISIT  <a href="https://www.tronlink.org/">TRONLINK</a>  AND DOWNLOAD THE CHROME EXTENSION.</p>

                        <h6>TRONTOPIA IS ONLY AVAILABLE USING CHROME BROWSER FOR THE TIME BEING</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End PLEASE LOGIN TO TRONLINK -->

    <!-- PLEASE LOGIN TO TRONLINK -->
    <div id="pls-volt" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps volt-we">
                    <div class="refrel-wrp login-wrp">
                        <img src="images/safe.png" alt="">

                        <div class="time-down">
                            <div class="bar">
                                <div class="in"></div>
                            </div>
                        </div>

                        <p>TOPIA VAULT TIMER  <a href="#" id="demo"></a></p>

                        <h6>Burn 10 Vouchers to Stoke the Flame</h6>
                    </div>

                    <h5>VAULT BALANCE: <span>15.457 <strong>TRX</strong></span></h5>
                    <h5>VOUCHER BALANCE: <span id="myAvailableVoucher3">0.00</span></h5>
                    <button class="withbtn" data-target="#burnVoucher2" data-toggle="modal">burn</button>
                </div>
            </div>

            <div class="leader-boxs">
                <h2>Leaderboard</h2>

                <div class="lead-table">
                    <div class="table-bets">
                        <ul>
                            <li class="head-at">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-4">
                                        <div class="head-th">
                                            <p>Player</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <p>burned</p>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <p>prize</p>
                                        </div>
                                    </div>
                                </div>
                            </li> 

                            <li class="dt-tbs">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-4">
                                        <div class="head-th number-b act1">
                                            <h6><img src="images/vault-ic.png" alt=""> Dustin</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5>500</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5><span>1500</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="dt-tbs">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-4">
                                        <div class="head-th number-b act1">
                                            <h6><img src="images/vault-ic.png" alt=""> Dustin</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5>500</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5><span>1500</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="dt-tbs">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-4">
                                        <div class="head-th number-b act1">
                                            <h6><img src="images/vault-ic.png" alt=""> Dustin</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5>500</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5><span>1500</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </li>

                            <li class="dt-tbs">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-4">
                                        <div class="head-th number-b act1">
                                            <h6><img src="images/vault-ic.png" alt=""> Dustin</h6>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5>500</h5>
                                        </div>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-4">
                                        <div class="head-th">
                                            <h5><span>1500</span></h5>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End PLEASE LOGIN TO TRONLINK -->

    <!-- Popup -->
    <div id="poip-fri" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-pop.png" alt=""></button>
                
                <div class="invite-wrps">                    
                    <h1>PLEASE LOGIN TO TRONLINK</h1>

                    <div class="refrel-wrp login-wrp">
                        <img src="images/login-ic.png" alt="">

                        <p>TRONLINK WALLET INSTALLED PLEASE VISIT  <a href="#">TRONLINK</a>  AND DOWNLOAD THE CHROME EXTENSION.</p>

                        <h6>TRONTOPIA IS ONLY AVAILBLE USING CHROME BROWSER FOR THE TIME BEING</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- End Popup -->

    <!-- Extra Popup -->
    <div id="new-poptopia" class="modal fade in" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content referrals-pop">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-po.png" alt=""></button>

                <h6>Topia</h6>



                <div class="refre-data">

                    <br>
                    <p><font color="#0cd6cf">1.</font>  TOPIA is minted with every wager placed while playing our games.</p>
                    <p><font color="#0cd6cf">2.</font>  TOPIA can be traded, or frozen for TRX rewards.</p>
                    <p><font color="#0cd6cf">3.</font>  Freezing Topia will include you into the Reward Distribution Pool.</p>
                    <p><font color="#0cd6cf">4.</font>  The longer you stay frozen, the better rewards you will receive!</p>
                    <br><p><font color="#0cd6cf">Day 0-30</font>: Receive <font color="#cd7f32">75%</font><br>
                    <p><font color="#0cd6cf">Day 30-60</font>: Receive <font color="#D3D3D3">85%</font><br>
                    <p><font color="#0cd6cf">Day 60+</font>: Receive <font color="#FFD700">100%</font></p>
                    <br>
                    <p><font color="#0cd6cf">5.</font>  There is a 24 hour thawing period to Unstake your Topia. Your Stake Tier will Reset to Bronze (0 Days). You will not receive a Reward distribution while thawing, after thawing is completed, you can withdraw your Topia to your wallet.</p>
                    
                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>

                </div>
            </div>

        </div>

    </div>
    <div id="new-popvouchers" class="modal fade in" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content referrals-pop">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-po.png" alt=""></button>

                <h6>Vouchers</h6>



                <div class="refre-data">

                    <br>
                    <p><font color="#0cd6cf">1.</font>  Vouchers are minted alongside TOPIA while playing our games.</p>
                    <p><font color="#0cd6cf">2.</font>  Vouchers cannot be traded, they have only two functions. Burn them, or hold them.</p>
                    <p><font color="#0cd6cf">3.</font>  Burning Vouchers will mint you Shares tokens.</p>
                    <p>Mainbet Mints <font color="#0cd6cf">1x</font> Vouchers<br>
                    Sidebet Mints <font color="#0cd6cf">2x</font> Vouchers<br>
                    Classic Dice Mints <font color="#0cd6cf">1/2</font> Vouchers</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>

                </div>
            </div>

        </div>

    </div>
    <div id="new-popdiamonds" class="modal fade in" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content referrals-pop">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-po.png" alt=""></button>

                <h6>Diamonds</h6>



                <div class="refre-data">

                    <br>
                    <p><font color="#0cd6cf">1.</font>  Diamonds are tradable, and can instantly stake/unstake.</p>
                    <p><font color="#0cd6cf">2.</font>  Freezing Diamonds will include your Diamonds into the daily raked Diamond pool distribution.</p>
                    <p><font color="#0cd6cf">3.</font>  Half of the House Edge of Every Game on TRONTOPIA is raked to this pool, daily.</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>

                </div>
            </div>

        </div>

    </div>
    <div id="new-popshares" class="modal fade in" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content referrals-pop">
                <button type="button" class="close" data-dismiss="modal"><img src="images/close-po.png" alt=""></button>

                <h6>Shares</h6>



                <div class="refre-data">

                    <br>
                    <p><font color="#0cd6cf">1.</font>  You can earn Shares by burning Vouchers and selecting a burn option that mints Shares.</p>
                    <p><font color="#0cd6cf">2.</font>  Shares are tradable and can instantly stake/unstake.</p>
                    <p><font color="#0cd6cf">3.</font>  Freezing shares will include your shares into the daily TRC10 and TRC20 Shares pool distribution.</p>
                    <p><font color="#0cd6cf">4.</font>  10% of Topia Reward Pool will be used to fund the Shares pool, daily.</p>
                    <p><font color="#0cd6cf">5.</font>  Minting Rate for Shares is always:<br>
                    <font color="#0cd6cf">1:1</font> Voucher:Share</p>

                    <h6>If you have any questions, join our Telegram group by clicking <a href="https://t.me/TRONtopia" target="_blank">here</a> and we will

                        be more than happy to help you with your questions. You will also be able to stay in the loop of

                        our future announcements and giveaways.</h6>

                </div>
            </div>

        </div>

    </div>
    <!-- End Extra Popup -->

<div class="left-bar left-bar-wdth" data-simplebar>
    <a href="#" class="close-side"><img src="images/close-pop.png" alt=""></a>
    <div class="logo-box">
        <a href="/"><img src="images/logo.png" alt=""></a>
    </div>

     <div class="left-navs">
        <ul>
            <li class="<?php echo ($actives != '') ? $active : ''; ?>"><a href="<?php echo $index_url;?>"><span class="home"></span> Home</a></li>
            <li class="<?php echo ($dice != '') ? $dice : ''; ?>"><a href="<?php echo $classic_dice_url;?>"><span class="lucky"></span> CLASSIC DICE</a></li>
            <li class="<?php echo ($ultimate != '') ? $ultimate : ''; ?>"><a href="<?php echo $ultimate_dice_url;?>"><span class="croen"></span> ultimate dice</a></li>
            <li class="<?php echo ($lukypg != '') ? $lukypg : ''; ?>"><a href="<?php echo $lucky_url;?>"><span class="lnum"></span> lucky one</a></li>
            <!--<li><a href="#" data-toggle="modal" data-target="#pls-volt"><span class="token"></span> vault <strong id="volut"></strong></a></li>-->
            <li><a href="#" data-toggle="modal" data-target="#dividend" id="dividendPopup2"><span class="divid"></span> Staking</a></li>
            
            <!--<li><a href="#" data-toggle="modal" data-target="#vouchers"><span class="vouch"></span> vouchers</a></li>
            <li><a href="#" data-toggle="modal" data-target="#shares"><span class="earn"></span> shares</a></li>
            <li><a href="#" data-toggle="modal" data-target="#diamonds"><span class="earn"></span> diamonds</a></li>-->
            
            <li><a href="#" data-toggle="modal" data-target="#fair-bet"><span class="fair"></span> Fairness</a></li>
            <!--ashish code starts here-->
            <li class="dropdown"><div class="dropdown-toggle" data-toggle="dropdown"><a href="javascript:void(0);"><span class="whitep"></span> Info <i class="fa fa-angle-down"></i></a></div>
                <ul class="dropdown-menu">
                    <li><a href="whitepaper-english.pdf" target="_blank">White Paper</a></li>
                    <li><a href="javascript:void(0);" data-toggle="modal" data-target="#info_modal_voucher">Vouchers</a></li>
                    <li><a href="https://tronscan.org/#/address/TGpP9GPsjyq2yo4WrwSJvqYwqZLKRnSzE8" target="_blank">Token</a></li>
                    <li><a href="#" data-toggle="modal" data-target="#disclaimerPopup" id="disclaimerPopup">Disclaimer</a></li>
                </ul>
            </li>
            <!--li class="dropdown"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><span class="whitep"></span> Info <i class="fa fa-angle-down"></i></a>
                <ul class="dropdown-menu">
                    <li><a href="whitepaper-english.pdf" target="_blank">White Paper</a></li>
                    <li><a href="javascript:void(0);" data-toggle="modal" data-target="#new-pop">Topia</a></li>
                    <li><a href="#">Vouchers</a></li>
                    <li><a href="#">Diamonds</a></li>
                    <li><a href="#">Shares</a></li>
                    <li><a href="#">Fairness</a></li>
                    <li><a href="#">Token</a></li>
                </ul>
            </li-->
            <!--ashish code ends here-->
            <li><a href="#" data-toggle="modal" data-target="#livehelp"><span class="livehelp"></span> Live Help</a></li>
            <li class="<?php echo ($howtopg != '') ? $howtopg : ''; ?>"><a href="<?php echo $howtoplay_url;?>"><span class="howto"></span> how to play</a></li>
            <li><a href="#" data-toggle="modal" data-target="#invite-fri"><span class="invite"></span> invite friends</a></li>
            <li><a href="https://www.trontopia.co/Roadmap/index.html" target="_blank"><span class="roadmap"></span> Road Map</a></li>
            <!-- <li><a href="#" data-toggle="modal" data-target="#poip-fri">Pop-up</a></li> -->
        </ul>
    </div>

    <div class="scor-board">
        <div class="soc-bxs">
            <p>bets made</p>
            <h4 id="totalBets">0</h4>
        </div>

        <div class="soc-bxs">
            <p>topia</p>
            <h4 id="myTotalToken">0</h4>
        </div>

        <div class="soc-bxs">
            <p>total won</p>
            <h4 id="totalWon">0</h4>
        </div>
    </div>
</div>


<script type="text/javascript">
    /* **** Countdown *****/
    // var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    //     var x = setInterval(function() {

    //     var now = new Date().getTime();

    //     var distance = countDownDate - now;

    //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //     document.getElementById("volut").innerHTML = hours + ":"
    //     + minutes + ":" + seconds + "";

    //     if (distance < 0) {
    //         clearInterval(x);
    //         document.getElementById("volut").innerHTML = "EXPIRED";
    //     }
    // }, 1000);
    /* **** End Countdown *****/
</script>
