<div class="right-bar">
    <a href="javascript:void(0);" class="right-chat"><i class="fa fa-comment"></i></a>
    <div class="chat-box">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#tab1">Chat</a></li>
            <li><a data-toggle="tab" href="#tab3">events</a></li>
            <li><a data-toggle="tab" href="#tab2">rank</a></li>
        </ul>

        <div class="tab-content">
            <div id="tab1" class="tab-pane fade in active">
                <div class="right-box">
                    <div class="chet-listing">
                          <ul id="chatDiv" style="max-height: 80vh">
                        </ul>
                    </div>
                    <div class="type-blocks">
                        <input type="text" name="" class="form-control" id="message" placeholder="Type here.." autocomplete="off">
                        <button type="submit" id="sendChat" class="send-btn"><i class="fa fa-paper-plane-o"></i></button>
                    </div>
                </div>
            </div>
            <div id="tab2" class="tab-pane fade">
                <div class="right-box content mCustomScrollbar" data-mcs-theme="minimal" >
                     <div class="listing-tops" id="globalLeaderboard">
                      </div>
                </div>
            </div>
            <span id="demo22" style="display: none;"></span>
            <div id="tab3" class="tab-pane fade">
                <div class="right-box">
                    <div class="top-rainks">
                        <ul>
                             <li><a href="#subTab1" data-toggle="tab" class="burner Topian">Random Lucky Topian Challenge</a></li>
                            <!--<li><a href="#subTab2" data-toggle="tab" class="miner">Lucky Leaders</a></li>-->
                            <!-- <li><a href="#subTab2" data-toggle="tab" class="miner">miners</a></li> -->
                           <!--  <li><a href="#subTab3" data-toggle="tab" class="burnertab">burners</a></li> -->
                            <!--<li><a href="#subTab3" data-toggle="tab" class="burnertab burner">Voucher Mining Extravaganza</a></li>-->
                            <!--<li><a href="#subTab4" data-toggle="tab" class="losers">losers</a></li> -->
                        </ul>
                         <div id="subTab1" class="tab-pane fade active in">
                            <div class="listing-tops" style="text-align: center; margin-left: 45px">
                                <!--<p><strong>Ends on 10/7 @ 5:00PM UTC (1PM EST)</strong><br><strong>Prize 250,000 TRX</strong><br><strong>ULTIMATE DICE ONLY</strong></p>-->
                                <p>Countdown : <span id="topTopianCountDown">00:00:00</span> <br><strong>100,000 <font color="#0cd6cf">TRX</font> in Prizes</strong></p>
                            </div>
                            <div class="listing-tops" id="kingtopianLeaderboardX">
                            </div>
                        </div> 
                        <div id="subTab3" class="tab-pane fade" style="display:none;">
                            <div class="listing-tops" style="text-align: center; margin-left: 45px">
                                <p>Countdown: <span id="eventCountDown1">0: 00: 00</span> <br><strong>Prize 100,000 TRX</strong></p>
                            </div>
                            <div class="listing-tops" id="vouchersLeaderboard">
                            </div>
                        </div>
                         <div id="subTab4" class="tab-pane fade" style="display:none;">
                            <div class="listing-tops" style="text-align: center; margin-left: 45px">
                                <p>Countdown: <span class="eventCountDown">0: 00: 00</span> <br><strong>Prize 100,000 TRX</strong></p>
                            </div>
                            <div class="listing-tops" id="loosersLeaderboard">
                            </div>
                        </div> 
                       <!-- <div id="subTab2" class="tab-pane fade">
                            <div class="listing-tops" style="text-align: center;">
                                <p>Countdown: <span id="l1Countdown">0: 00: 00</span> <br><strong>Prize 100,000 TRX</strong></p>
                            </div>
                            <div class="listing-tops" id="luckyOneLeaderboardX">
                            </div>
                        </div> -->
                        <!-- <div id="subTab2" class="tab-pane fade">
                            <div class="listing-tops" style="text-align: center;">
                                <p>Total Minted : <font color="#0cd6cf"><span id="minedTotalTokan"></span></font>
                                <br>You've Minted : <font color="#0cd6cf"><span id="myTokenMinted"></span></font>
                                <br>Prizes pay out at <font color="#0cd6cf">4,000,000 TOPIA</font> mined</p>
                            </div>
                            <div class="listing-tops" id="minersLeaderboard">
                            </div>
                        </div> -->
                       <!--  <div id="subTab3" class="tab-pane fade">
                            <div class="listing-tops" id="burnersLeaderboard">
                                <p>Top Burners</p>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
