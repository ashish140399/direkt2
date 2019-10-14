var referralContractInstance;
const referralContractAddress             =   'TZ1ayhyREGg7ZLdRcyQQQMG1A5Btivf5Dh';
async function referralContractInit(){
	 var referralContractInfo = await tronWeb.trx.getContract(referralContractAddress);
     referralContractInstance = await tronWeb.contract(referralContractInfo.abi.entrys, referralContractInfo.contract_address);
}
function setReferralLink(){
	if(global.userAddress) {  
		 //set referral link url 
         $('#refLink').attr('href',global.userAddress);
         //$('#referalURL').html(userAddress)
         $('#refLink').attr('href','https://trontopia.co/index.php?refid='+global.userAddress);
         $('#refLink').val('https://trontopia.co/index.php?refid='+global.userAddress);
	}
}

async function referralBonusData(){
	/*For getting the Bonus*/
     var bonusVal = await referralContractInstance.referrerBonusBalance(global.userAddress).call();
     var val = Object.values(bonusVal);             
     var myBonus = window.tronWeb.toDecimal(val[0]);
     myBonus = myBonus/1000000;
     myBonus = myBonus.toString(); 
    // console.log(myBonus);
     //myBonus = myBonus.slice(0, (myBonus.indexOf("."))+3);
     
     $("#my_bonus").val(number_to_2decimals(myBonus) + ' TRX ');
     if(myBonus>0){
        $('#withdrawReferralBonus').attr('disabled',false);
     }else{
        $('#withdrawReferralBonus').attr('disabled',true);
     }
}

//to display referral levels
async function referralProgressBar(){
        //Bronze = default 0.2%
        //Silver = after 10,000,000 wagered by referralâ€™s 0.25%
        //Gold = after 100,000,000 wagered by referralâ€™s 0.30%
        var referralsWageredAllTime  = await referralContractInstance.referralsWageredAllTime(global.userAddress).call();  
        var val = Object.values(referralsWageredAllTime);             
        var referralsWageredAllTime = window.tronWeb.toDecimal(val[0]);
        referralsWageredAllTime = referralsWageredAllTime/1000000;

        var refrral_tier_text;
        var till_what_reward_ref;
        var ref_wager_to;
        var left_image = 'images/nut1bronze.png';
        var right_image = 'images/nut2silver.png';
        if(referralsWageredAllTime<100000000){
            refrral_tier_text = 'Bronze Referral(0.05%)';
            till_what_reward_ref = 'Till Silver Referral(0.075%)';
            ref_wager_to = '1,000,000,000';
            left_image = 'images/nut1bronze.png';
            right_image = 'images/nut2silver.png';
        }
        if(referralsWageredAllTime>100000000 && referralsWageredAllTime<1000000000){
            refrral_tier_text = 'Silver Referral(0.25%)';
            till_what_reward_ref = 'Till Gold Referral(0.10% )';
            ref_wager_to = '10,000,000,000';
            left_image = 'images/nut2silver.png';
            right_image = 'images/nut3gold.png';
        }
        if(referralsWageredAllTime>1000000000){
            refrral_tier_text = 'Gold Referral(0.10% )';
            till_what_reward_ref = 'Gold Referral(0.10% )';
            ref_wager_to = '10,000,000,000';
            left_image = 'images/nut3gold.png';
            right_image = 'images/nut3gold.png';
        }
        $('#ref-left-image').attr('src',left_image);
        $('#ref-right-image').attr('src',right_image);
        $('#ref-cur-lvl').html(refrral_tier_text);
        $('#till_what_reward_ref').html(till_what_reward_ref);
        $('#ref_wager').html(referralsWageredAllTime);
        $('#ref_wager_to').html(ref_wager_to);
        var ref_wager_percent = (referralsWageredAllTime*100)/100000000;
        $('#referral_progress').css('cssText',"max-width: "+ ref_wager_percent + "% !important;");

}
