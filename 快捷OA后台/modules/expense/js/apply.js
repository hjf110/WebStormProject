$(document).ready(function () {
    var jsxm = $.cookie("jsxm");
    var cph = $.cookie("cph");
    var endTime = $.cookie("endTime");
    var sgfsdd = $.cookie("sgfsdd");
    var customerUnit = $.cookie("customerUnit");
    var orderNumber = $.cookie("orderNumber");
    var taskType = $.cookie("taskType");
    var newOld = $.cookie("newOld");
    var customerVehiclesDamage = $.cookie("customerVehiclesDamage");
    var ourVehiclesDamage = $.cookie("ourVehiclesDamage");

    var injured = $.cookie("injured");
    var customerVehicleDamageDescription = $.cookie("customerVehicleDamageDescription");
    var customerMoney = $.cookie("customerMoney");
    var ourVehicleDamageDescription = $.cookie("ourVehicleDamageDescription");
    var ourMoney = $.cookie("ourMoney");
    var otherInjuries = $.cookie("otherInjuries");
    var otherMoney = $.cookie("otherMoney");
    var peopleInjure = $.cookie("peopleInjure");
    var peopleMoney = $.cookie("peopleMoney");
    var companyTechnician = $.cookie("companyTechnician");

    var KPI = $.cookie("KPI");
    var techniciansPunishmentMonkey = $.cookie("techniciansPunishmentMonkey");
    var customerVehiclesFixedLoss = $.cookie("customerVehiclesFixedLoss");
    var actualAmountPaid = $.cookie("actualAmountPaid");
    var insuranceDeductibleAmount = $.cookie("insuranceDeductibleAmount");
    var depreciationExpenses = $.cookie("depreciationExpenses");
    var insurancePaymentsTime = $.cookie("insurancePaymentsTime");
    var insurancePaymentsMoney = $.cookie("insurancePaymentsMoney");
    var jscdbl = $.cookie("jscdbl");
    var jscdje = $.cookie("jscdje");

    var companyLostMonkey = $.cookie("companyLostMonkey");
    var ykhgtjgms = $.cookie("ykhgtjgms");
    var accidentAnalysisImprovementMeasures = $.cookie("accidentAnalysisImprovementMeasures");
    var cgxm = $.cookie("cgxm");
    var cwxm = $.cookie("cwxm");


    $("#jsxm").html(jsxm);
    $("#cph").html(cph);
    $("#endTime").html(endTime);
    $("#sgfsdd").html(sgfsdd);
    $("#customerUnit").html(customerUnit);
    $("#orderNumber").html(orderNumber);
    $("#taskType").html(taskType);
    $("#newOld").html(newOld);
    $("#customerVehiclesDamage").html(customerVehiclesDamage);
    $("#ourVehiclesDamage").html(ourVehiclesDamage);

    $("#injured").html(injured);
    $("#customerVehicleDamageDescription").html(customerVehicleDamageDescription);
    $("#customerMoney").html(customerMoney);
    $("#ourVehicleDamageDescription").html(ourVehicleDamageDescription);
    $("#ourMoney").html(ourMoney);
    $("#otherInjuries").html(otherInjuries);
    $("#otherMoney").html(otherMoney);
    $("#peopleInjure").html(peopleInjure);
    $("#peopleMoney").html(peopleMoney);
    $("#companyTechnician").html(companyTechnician);

    $("#KPI").html(KPI);
    $("#techniciansPunishmentMonkey").html(techniciansPunishmentMonkey);
    $("#customerVehiclesFixedLoss").html(customerVehiclesFixedLoss);
    $("#actualAmountPaid").html(actualAmountPaid);
    $("#insuranceDeductibleAmount").html(insuranceDeductibleAmount);
    $("#depreciationExpenses").html(depreciationExpenses);
    $("#insurancePaymentsTime").html(insurancePaymentsTime);
    $("#insurancePaymentsMoney").html(insurancePaymentsMoney);
    $("#jscdbl").html(jscdbl);
    $("#jscdje").html(jscdje);

    $("#companyLostMonkey").html(companyLostMonkey);
    $("#ykhgtjgms").html(ykhgtjgms);
    $("#accidentAnalysisImprovementMeasures").html(accidentAnalysisImprovementMeasures);
    $("#cgxm").html(cgxm);
    $("#cwxm").html(cwxm);


    var conHeight = $("#text").height();
    var conWidth = $("#text").width();
    console.log(conHeight);
    console.log(conWidth);
    var num = Math.ceil(conHeight * conWidth / 300 / 400);
    console.log( "图片数量"+ num);
    for (var i = 0; i < num; i++) {
        $('#a').append('<img style="width: 300px" src="img/bgWatermark.jpg" />');
    }
    ;
 $("#bd").on("click", function () {
        $("#dy").jqprint({debug: false, importCSS: true, printContainer: true, operaSupport: false, printTime: 6000});
    })

});