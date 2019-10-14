$(document).ready(function() {

    $(function() {
        var start, end;
        $("#slider-range").slider({
            range: true,
            orientation: "horizontal",
            min: 0,
            max: 99,
            values: [25, 75],
            step: 1,
            slide: function(event, ui) {
                if((ui.values[1] - ui.values[0]) > 94) {
                  if(ui.values[1] > 94) {
                      let val_0 = ui.values[1] - 94;
                      $("#slider-range").slider('values',0,val_0);
                  } if(ui.values[0] < 5) {
                      let val_1 = 94 + ui.values[0];
                      ui.values[1] = val_1;
                      $("#slider-range").slider('values',1,val_1);
                    }
                }

                ui.values[0] >= 10 ? start = ui.values[0] : start = "0" + ui.values[0];
                ui.values[1] >= 10 ? end = ui.values[1] : end = "0" + ui.values[1];

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
