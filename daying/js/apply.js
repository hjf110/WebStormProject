$(document).ready(function () {







    var conHeight = $("#text").height();
    var conWidth = $("#text").width();
    console.log(conHeight);
    console.log(conWidth);
    var num = Math.ceil(conHeight * conWidth / 300 / 256/3.5);
    console.log( "图片数量"+ num);
    for (var i = 0; i < num; i++) {
        $('#a').append('<img style="width: 300px" src="img/bgWatermark.jpg" />');
    }
    ;
 $("#bd").on("click", function () {
        $("#dy").jqprint({debug: false, importCSS: true, printContainer: true, operaSupport: false, printTime: 6000});
    })

});