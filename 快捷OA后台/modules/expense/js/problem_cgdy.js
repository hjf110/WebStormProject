$(document).ready(function () {
    var jsxm = $.cookie("jsxm");
    var cph = $.cookie("cph");
    var endTime = $.cookie("endTime");
    var sgfsdd = $.cookie("sgfsdd");

    var orderNumber = $.cookie("orderNumber");
    var customerUnit = $.cookie("customerUnit");
    var frame = $.cookie("frame");
    var taskType = $.cookie("taskType");
    var vehicleModels = $.cookie("vehicleModels");
    var customerVehicleDamageDescription = $.cookie("customerVehicleDamageDescription");

    var ywyxm = $.cookie("ywyxm");
    var ywyclsj = $.cookie("ywyclsj");
    var ywyyj = $.cookie("ywyyj");
    var customerVehiclesDamage = $.cookie("customerVehiclesDamage");
    var customerMoney = $.cookie("customerMoney");
    var otherInjuries = $.cookie("otherInjuries");
    var otherMoney = $.cookie("otherMoney");

    var cgxm = $.cookie("cgxm");



    $("#jsxm").html(jsxm);
    $("#cph").html(cph);
    $("#endTime").html(endTime);
    $("#sgfsdd").html(sgfsdd);
    $("#orderNumber").html(orderNumber);
    $("#customerUnit").html(customerUnit);
    $("#frame").html(frame);
    $("#taskType").html(taskType);
    $("#vehicleModels").html(vehicleModels);
    $("#customerVehicleDamageDescription").html(customerVehicleDamageDescription);

    $("#ywyxm").html(ywyxm);
    $("#ywyclsj").html(ywyclsj);
    $("#ywyyj").html(ywyyj);
    $("#customerVehiclesDamage").html(customerVehiclesDamage);
    $("#customerMoney").html(customerMoney);
    $("#otherInjuries").html(otherInjuries);
    $("#otherMoney").html(otherMoney);

    $("#cgxm").html(cgxm);



    var conHeight = $("#text").height();
    var conWidth = $("#text").width();
    console.log(conHeight);
    console.log(conWidth);
    var num = 6//Math.ceil(conHeight * conWidth / 800 / 855);
    console.log(num);
    for (var i = 0; i < num; i++) {
        $('#a').append('<img style="width: 300px" src="img/bgWatermark.jpg" />');
    }
    ;

    $("#bd").on("click", function () {
        $("#dy").jqprint({debug: false, importCSS: true, printContainer: true, operaSupport: false, printTime: 6000});
    })

});