$(document).ready(function() {

    $(function() {
        var start, end;
        $("#slider-range").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 99,
            values: [40, 70],
            step: 1,

            slide: function(event, ui) {
                if (ui.values[0] == ui.values[1]) {
                   // return false;
                }
                if(ui.values[0] == 3 && ui.values[1] > 99){
                 return false;
                }
                if(ui.values[0] == 2 && ui.values[1] > 98){
                 return false;
                }
                if(ui.values[0] == 1 && ui.values[1] > 97){
                 return false;
                }
                if(ui.values[0] == 0 && ui.values[1] > 96){
                 return false;
                }                

                start = ui.values[0];
                end = ui.values[1];
                if(start<10){ start = '0'+start}
                if(end<10){ end = '0'+end}
                $("#min_price").html(start);
                $("#max_price").html(end);

                $("#startVal").val(start);
                $("#endVal").val(end);

                getMultiplierValue(start, end);
            }
        });

        $("#min_price").html($("#slider-range").slider("values", 0));
        $("#max_price").html($("#slider-range").slider("values", 1));

        start = $("#slider-range").slider("values", 0);
        end = $("#slider-range").slider("values", 1);
        
        $("#startVal").val(start);
        $("#endVal").val(end);

        getMultiplierValue(start, end);
    });



});