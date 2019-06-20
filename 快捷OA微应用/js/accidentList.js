"use strict";
function initPageMain(){
    var accidentListObj;

    initAccidentVar();
    initAccidentListener();
    initAccidentView();

    function initAccidentVar() {
        if(!accidentListObj) {
            accidentListObj = new AccidentList();
        }
    }

    function initAccidentListener() {
        if(accidentListObj) {
            accidentListObj.setOnIndexClickListener();
        }
    }

    function initAccidentView(){
        accidentListObj.getAjaxForSJList();
    }

}

function AccidentList(){
    var _this = this;
    var getOldCarListUrl = SERVER_URL+"ex/HoldCar/list";   //旧车装卸事故列表接口
    var getSelfTestListUrl = SERVER_URL + "ex/HSelfTest/list";   //自测交通事故接口
    var getNewCarCheckListUrl = SERVER_URL + "ex/hNewCarCheck/list";        //新车检查事故列表接口
    var getNewCarHandinglistUrl = SERVER_URL + "ex/hNewCarHanding/list";      //新车装卸事故列表接口
    var getNewCarReportListUrl = SERVER_URL + "ex/hProblem/list";   // 新车问题检查列表接口

    var jobInfo = JSON.parse(sessionStorage.getItem("user_jobInfo"));	//获取用户数据

    //获取所有flowId
    var userJob = JSON.parse(sessionStorage.getItem("user_job"));
    console.log(userJob);
    var flowIdArray = [];
    for(var i in userJob) {
        flowIdArray.push(userJob[i].flowId);
    }
    var flowId = flowIdArray.join(",");
    console.log(flowId);

    //设置点击事件
    this.setOnIndexClickListener  = function(){

        //改变事件
        $("#select1").on("change",function(_event){
            _this.getAjaxForSJList();
        });
    };

//    获取网络请求
    this.getAjaxForSJList = function(){
        console.log("进入了："+$("#select1").val());
        $(".listContent>.listItem:not([id])").remove();
        $(".listContent>p").remove();
        switch(parseInt($("#select1").val())){
            case 1: //新车问题检查反馈

                $.get(getNewCarReportListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "1,4,5,9", flowId: flowId }, function (_data) {
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    console.log(_data.page.records);
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id", thisItem.id);
                        $listItemClone.attr("data-type", thisItem.natureAccident);
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find(".money").text(thisItem.licensePlate);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("新车检查问题反馈");
                        var stateText;
                        switch (parseInt(thisItem.isSend)) {
                            case 1:
                                stateText = "待处理";
                                break;
                            case 4:
                                stateText = "继续完成";
                                break;
                            case 5:
                                stateText = "已完成";
                            case 9:
                                stateText = "放弃任务";
                                break;
                            default:
                                break;
                        }
                        $listItemClone.find("#state").text(stateText);
                        var thisTime =  new Date();
                        thisTime.setTime(thisItem.addTime*1000);
                        console.log(thisTime.Format);
                        $listItemClone.find(".time").text(thisTime.Format("yyyy年MM月dd日 hh:mm"));
                        $listItemClone.click(function (_event) {
                            location.href = "xcjcwtfk_index.html?id=" + $(this).attr("data-id")+"_"+ $(this).attr("data-type");
                        });
                        $(".listContent").append($listItemClone.show());
                    }
                });



                break;
            case 2:     //自车交通事故

                $.get(getSelfTestListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "1,2,4,5", flowId: flowId }, function (_data) {
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    console.log(_data.page.records);
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id", thisItem.id);
                        $listItemClone.attr("data-type", thisItem.natureAccident);
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find(".money").text(thisItem.licensePlate);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("自车交通事故");
                        var stateText;
                        switch (parseInt(thisItem.isSend)) {
                            case 1:
                                stateText = "待处理";
                                break;
                            case 2:
                                stateText = "发起改派";
                                break;
                            case 4:
                                stateText = "继续完成";
                                break;
                            case 5:
                                stateText = "已完成";
                                break;
                            default:
                                break;
                        }
                        var thisTime =  new Date();
                        thisTime.setTime(thisItem.addTime*1000);
                        console.log(thisTime.Format);
                        $listItemClone.find(".time").text(thisTime.Format("yyyy年MM月dd日 hh:mm"));
                        $listItemClone.find("#state").text(stateText);
                        $listItemClone.click(function (_event) {
                            location.href = "zcjtsg_index.html?id=" + $(this).attr("data-id")+"_"+ $(this).attr("data-type");
                        });
                        $(".listContent").append($listItemClone.show());
                    }
                });

                break;
            case 3:     //旧车装卸事故
                $.get(getOldCarListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "1,2,4,5", flowId: flowId }, function (_data) {
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    console.log(_data.page.records);
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id", thisItem.id);
                        $listItemClone.attr("data-type", thisItem.natureAccident);
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find(".money").text(thisItem.licensePlate);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("旧车装卸事故");

                        var stateText;
                        switch (parseInt(thisItem.isSend)) {
                            case 1:
                                stateText = "待处理";
                                break;
                            case 2:
                                stateText = "发起改派";
                                break;
                            case 4:
                                stateText = "继续完成";
                                break;
                            case 5:
                                stateText = "已完成";
                                break;
                            default:
                                break;
                        }
                        $listItemClone.find("#state").text(stateText);
                        var thisTime =  new Date();
                        thisTime.setTime(thisItem.addTime*1000);
                        console.log(thisTime.Format);
                        $listItemClone.find(".time").text(thisTime.Format("yyyy年MM月dd日 hh:mm"));
                        $listItemClone.click(function (_event) {
                            location.href = "jczxsg_index.html?id=" + $(this).attr("data-id")+"_"+ $(this).attr("data-type");
                        });
                        $(".listContent").append($listItemClone.show());
                    }

                });

                break;
            case 4:     //新车检查装卸事故
                $.get(getNewCarHandinglistUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "1,2,4,5,10,11", flowId: flowId }, function (_data) {
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    console.log(_data.page.records);
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id", thisItem.id);
                        $listItemClone.attr("data-type", thisItem.natureAccident);
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find(".money").text(thisItem.licensePlate);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("新车检查装卸事故");
                        var thisTime =  new Date();
                        thisTime.setTime(thisItem.addTime*1000);
                        console.log(thisTime.Format);
                        $listItemClone.find(".time").text(thisTime.Format("yyyy年MM月dd日 hh:mm"));
                        var stateText;
                        switch (parseInt(thisItem.isSend)) {
                            case 1:
                                stateText = "待处理";
                                break;
                            case 5:
                                stateText = "已完成";
                                break;
                            case 6:
                                stateText = "等待";
                                break;
                            case 7:
                                stateText = "离开";
                                break;
                            case 8:
                                stateText = "脱离";
                                break;
                            default:
                                break;
                        }
                        $listItemClone.find("#state").text(stateText);
                        $listItemClone.click(function (_event) {
                            location.href = "xcjczxsg_index.html?id=" + $(this).attr("data-id")+"_"+ $(this).attr("data-type");
                        });
                        $(".listContent").append($listItemClone.show());
                    }

                });
                break;
            case 5:     //新车检查事故
                $.get(getNewCarCheckListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "1,5,4,9", flowId: flowId }, function (_data) {
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    console.log(_data.page.records);
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id", thisItem.id);
                        $listItemClone.attr("data-type", thisItem.natureAccident);
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find(".money").text(thisItem.licensePlate);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("新车检查事故");

                        var stateText;
                        switch (parseInt(thisItem.isSend)) {
                            case 1:
                                stateText = "待处理";
                                break;
                            case 5:
                                stateText = "已完成";
                                break;
                            case 6:
                                stateText = "等待";
                                break;
                            case 7:
                                stateText = "离开";
                                break;
                            case 8:
                                stateText = "脱离";
                                break;
                            default:
                                break;
                        }
                        $listItemClone.find("#state").text(stateText);
                        var thisTime =  new Date();
                        thisTime.setTime(thisItem.addTime*1000);
                        console.log(thisTime.Format);
                        $listItemClone.find(".time").text(thisTime.Format("yyyy年MM月dd日 hh:mm"));
                        $listItemClone.click(function (_event) {
                            location.href = "accidentdeclare.html?id=" + $(this).attr("data-id")+"_"+ $(this).attr("data-type");
                        });
                        $(".listContent").append($listItemClone.show());
                    }

                });
                break;
        }
    };

}