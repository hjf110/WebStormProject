$(document).ready(function () {
    var jsxm = $.cookie("jsxm");
    var cph = $.cookie("cph");
    var endTime = $.cookie("endTime");
    var sgfsdd = $.cookie("sgfsdd");

    var orderNumber = $.cookie("orderNumber");
    var customerUnit = $.cookie("customerUnit");
    var cjh = $.cookie("cjh");
    var khclpp = $.cookie("khclpp");
    var vehicleModels = $.cookie("vehicleModels");
    var customerVehicleDamageDescription = $.cookie("customerVehicleDamageDescription");

    var ywyxm = $.cookie("ywyxm");
    var ywyclsj = $.cookie("ywyclsj");
    var ywyclyj = $.cookie("ywyclyj");
    var customerVehiclesDamage = $.cookie("customerVehiclesDamage");
    var customerMoney = $.cookie("customerMoney");
    var otherInjuries = $.cookie("otherInjuries");
    var otherMoney = $.cookie("otherMoney");
    var companyTechnician = $.cookie("companyTechnician");
    var kpi = $.cookie("kpi");
    var techniciansPunishmentMonkey = $.cookie("techniciansPunishmentMonkey");

    var techniciansRatio = $.cookie("techniciansRatio");
    var techniciansMonkey = $.cookie("techniciansMonkey");
    var customerVehiclesFixedLoss = $.cookie("customerVehiclesFixedLoss");
    var depreciationExpenses = $.cookie("depreciationExpenses");
    var settlementMonkey = $.cookie("settlementMonkey");
    var insuranceDeductibleAmount = $.cookie("insuranceDeductibleAmount");
    var insurancePaymentsTime = $.cookie("insurancePaymentsTime");
    var insurancePaymentsMoney = $.cookie("insurancePaymentsMoney");
    var companyLostMonkey = $.cookie("companyLostMonkey");
    var ykhgtjgms = $.cookie("ykhgtjgms");

    var accidentAnalysisImprovementMeasures = $.cookie("accidentAnalysisImprovementMeasures");
    var cgxm = $.cookie("cgxm");



    $("#jsxm").html(jsxm);
    $("#cph").html(cph);
    $("#endTime").html(endTime);
    $("#sgfsdd").html(sgfsdd);
    $("#orderNumber").html(orderNumber);
    $("#customerUnit").html(customerUnit);
    $("#cjh").html(cjh);
    $("#khclpp").html(khclpp);
    $("#vehicleModels").html(vehicleModels);
    $("#customerVehicleDamageDescription").html(customerVehicleDamageDescription);

    $("#ywyxm").html(ywyxm);
    $("#ywyclsj").html(ywyclsj);
    $("#ywyclyj").html(ywyclyj);
    $("#customerVehiclesDamage").html(customerVehiclesDamage);
    $("#customerMoney").html(customerMoney);
    $("#otherInjuries").html(otherInjuries);
    $("#otherMoney").html(otherMoney);
    $("#companyTechnician").html(companyTechnician);
    $("#kpi").html(kpi);
    $("#techniciansPunishmentMonkey").html(techniciansPunishmentMonkey);

    $("#techniciansRatio").html(techniciansRatio);
    $("#techniciansMonkey").html(techniciansMonkey);
    $("#customerVehiclesFixedLoss").html(customerVehiclesFixedLoss);
    $("#depreciationExpenses").html(depreciationExpenses);
    $("#settlementMonkey").html(settlementMonkey);
    $("#insuranceDeductibleAmount").html(insuranceDeductibleAmount);
    $("#insurancePaymentsTime").html(insurancePaymentsTime);
    $("#insurancePaymentsMoney").html(insurancePaymentsMoney);
    $("#companyLostMonkey").html(companyLostMonkey);
    $("#ykhgtjgms").html(ykhgtjgms);

    $("#accidentAnalysisImprovementMeasures").html(accidentAnalysisImprovementMeasures);
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