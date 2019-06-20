$(document).ready(function () {
    var jsxm = $.cookie("jsxm");
    var cph = $.cookie("cph");
    var endTime = $.cookie("endTime");
    var sgfsdd = $.cookie("sgfsdd");
    var normalDriving = $.cookie("normalDriving");
    var personnelInjury = $.cookie("personnelInjury");
    var responsibilityJudgement = $.cookie("responsibilityJudgement");
    var we = $.cookie("we");
    var weAmountDamage = $.cookie("weAmountDamage");
    var other = $.cookie("other");

    var otherAmountDamage = $.cookie("otherAmountDamage");
    var others = $.cookie("others");
    var othersAmountDamage = $.cookie("othersAmountDamage");
    var personnelInjuries = $.cookie("personnelInjuries");
    var personnelInjuryAmountDamage = $.cookie("personnelInjuryAmountDamage");
    var handle = $.cookie("handle");
    var kpiDeduction = $.cookie("kpiDeduction");
    var amountPenalty = $.cookie("amountPenalty");
    var proportionCompensation = $.cookie("proportionCompensation");
    var compensationAmountTechnicians = $.cookie("compensationAmountTechnicians");

    var ourFixedLoss = $.cookie("ourFixedLoss");
    var ourInsurance = $.cookie("ourInsurance");
    var ourTime = $.cookie("ourTime");
    var ourArrivalAccount = $.cookie("ourArrivalAccount");
    var otherFixedLoss = $.cookie("otherFixedLoss");
    var otherInsurance = $.cookie("otherInsurance");
    var otherTime = $.cookie("otherTime");
    var otherArrivalAccount = $.cookie("otherArrivalAccount");
    var othersFixedLoss = $.cookie("othersFixedLoss");
    var othersInsurances = $.cookie("othersInsurances");

    var othersTime = $.cookie("othersTime");
    var othersArrivalAccount = $.cookie("othersArrivalAccount");
    var personnelInjuryFixedLoss = $.cookie("personnelInjuryFixedLoss");
    var personnelInjuryInsurance = $.cookie("personnelInjuryInsurance");
    var personnelInjuryTime = $.cookie("personnelInjuryTime");

    var personnelInjuryArrivalAccount = $.cookie("personnelInjuryArrivalAccount");
    var oppositeTime = $.cookie("oppositeTime");
    var oppositeArrivalAccount = $.cookie("oppositeArrivalAccount");
    var gsssje = $.cookie("gsssje");
    var sfwtpf = $.cookie("sfwtpf");
    var accidentAnalysis = $.cookie("accidentAnalysis");
    var cgxm = $.cookie("cgxm");


    $("#jsxm").html(jsxm);
    $("#cph").html(cph);
    $("#endTime").html(endTime);
    $("#sgfsdd").html(sgfsdd);
    $("#normalDriving").html(normalDriving);
    $("#personnelInjury").html(personnelInjury);
    $("#responsibilityJudgement").html(responsibilityJudgement);
    $("#we").html(we);
    $("#weAmountDamage").html(weAmountDamage);
    $("#other").html(other);

    $("#otherAmountDamage").html(otherAmountDamage);
    $("#others").html(others);
    $("#othersAmountDamage").html(othersAmountDamage);
    $("#personnelInjuries").html(personnelInjuries);
    $("#personnelInjuryAmountDamage").html(personnelInjuryAmountDamage);
    $("#handle").html(handle);
    $("#kpiDeduction").html(kpiDeduction);
    $("#amountPenalty").html(amountPenalty);
    $("#proportionCompensation").html(proportionCompensation);
    $("#compensationAmountTechnicians").html(compensationAmountTechnicians);

    $("#ourFixedLoss").html(ourFixedLoss);
    $("#ourInsurance").html(ourInsurance);
    $("#ourTime").html(ourTime);
    $("#ourArrivalAccount").html(ourArrivalAccount);
    $("#otherFixedLoss").html(otherFixedLoss);
    $("#otherInsurance").html(otherInsurance);
    $("#otherTime").html(otherTime);
    $("#otherArrivalAccount").html(otherArrivalAccount);
    $("#othersFixedLoss").html(othersFixedLoss);
    $("#othersInsurances").html(othersInsurances);

    $("#othersTime").html(othersTime);
    $("#othersArrivalAccount").html(othersArrivalAccount);
    $("#personnelInjuryFixedLoss").html(personnelInjuryFixedLoss);
    $("#personnelInjuryInsurance").html(personnelInjuryInsurance);
    $("#personnelInjuryTime").html(personnelInjuryTime);
    $("#personnelInjuryArrivalAccount").html(personnelInjuryArrivalAccount);
    $("#oppositeTime").html(oppositeTime);
    $("#oppositeArrivalAccount").html(oppositeArrivalAccount);
    $("#gsssje").html(gsssje);
    $("#sfwtpf").html(sfwtpf);
    $("#accidentAnalysis").html(accidentAnalysis);
    $("#cgxm").html(cgxm);


    var conHeight = $("#text").height();
    var conWidth = $("#text").width();
    console.log(conHeight);
    console.log(conWidth);
    var num = Math.ceil(conHeight * conWidth / 300 / 500);
    console.log(num);
    for (var i = 0; i < num; i++) {
        $('#a').append('<img style="width: 300px" src="img/bgWatermark.jpg" />');
    }
    ;



       $("#bd").on("click", function () {
           $("#dy").jqprint({debug: false, importCSS: true, printContainer: true, operaSupport: false, printTime: 6000});
       })

});