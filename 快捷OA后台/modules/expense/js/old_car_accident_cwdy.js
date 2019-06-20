$(document).ready(function () {

    /*获取当前日期*/
    var timenow = new Date();
    var year = timenow.getFullYear();
    var mouth = timenow.getMonth() + 1;
    if (mouth < 10) {
        mouth = "0" + mouth;
    }
    var date = timenow.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    var nowtime = year + "-" + mouth + "-" + date;
    $("#time").html(nowtime);
    console.log($("#time").html(nowtime));


    var payType = $.cookie("payType");
    var payment = $.cookie("payment");
    var bankCardId = $.cookie("bankCardId");
    var bankName = $.cookie("bankName");
    var acceptingOfficer = $.cookie("acceptingOfficer");
    var insider = $.cookie("insider");
    var amountCollected = $.cookie("amountCollected");
    var financialRemarks = $.cookie("financialRemarks");
    var cwxm = $.cookie("cwxm");
    var xmname = $.cookie("xmname");
    var cgxm = $.cookie("cgxm");
    var jsxm = $.cookie("jsxm");


    $("#payType").html(payType);
    $("#payment").html(payment+"元");
    $("#bankCardId").html(bankCardId);
    $("#bankName").html(bankName);
    $("#acceptingOfficer").html(acceptingOfficer);
    $("#insider").html(insider);
    $("#amountCollected").html(amountCollected+"元");
    $("#financialRemarks").html(financialRemarks);
    $("#cwxm").html(cwxm);
    $("#cgxm").html(cgxm);
    $("#jsxm").html(jsxm);

    $("#xmname").html(xmname);
    $("#tou").html(xmname);
   // $("#cgxm").html(cgxm);








    var conHeight = $("#text").height();
    var conWidth = $("#text").width();
    console.log(conHeight);
    console.log(conWidth);
    var num = 6//Math.ceil(conHeight * conWidth / 800 / 855);
    console.log(num);
    // for (var i = 0; i < num; i++) {
    //     $('#a').append('<img style="width: 300px" src="img/bgWatermark.jpg" />');
    // }
    ;

     $("#bd").on("click", function () {
        $("#dy").jqprint({debug: false, importCSS: true, printContainer: true, operaSupport: false, printTime: 6000});
    })

});