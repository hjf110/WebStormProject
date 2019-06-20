"use strict";
function initPageMain(){
    var getSGListUrl = SERVER_URL+"ex/fault/list";		//事故
    var userInfo = JSON.parse(sessionStorage.getItem("user_info"));	//获取用户数据
    var jobInfo = JSON.parse(sessionStorage.getItem("user_job"));

    $("#select1").change(function(){
        thisObj.getAjaxForSJList();
    });
    getAjaxForSJList();

    //获取司机订单列表
    function getAjaxForSJList(){
        $(".listContent>.listItem:not([id])").remove();
        $.get(getSGListUrl,{company:jobInfo[0].companyKey,state:4,limit:10000,page:1,order:"ecs"},function(_data){
            for(var i in _data.page.records){
                var thisItem = _data.page.records[i];
                var $listItemClone = $("#listItem").clone();
                $listItemClone.removeAttr("id");
                $listItemClone.attr("data-id",thisItem.id);
                $listItemClone.find(".listName").text(thisItem.number);
                $listItemClone.find(".money").hide();
                $listItemClone.find("#sj").text(thisItem.driverName);
                $listItemClone.find("#bxdType").text("事故申请单");
                var stateText;
                switch(thisItem.state){
                    case -2:
                        stateText = "未过审";
                        break;
                    case -1:
                        stateText = "未过审";
                        break;
                    case 0:
                        stateText = "待审批";
                        break;
                    case 1:
                        stateText = "待审核";
                        break;
                    case 2:
                        stateText = "待报销";
                        break;
                    case 3:
                        stateText = "待打款";
                        break;
                    case 4:
                        stateText = "待处理";
                        break;
                    case 5:
                        stateText = "在处理";
                        break;
                    case 6:
                        stateText = "已完成";
                        break;
                    case 7:
                        stateText = "已过审批";
                        break;
                }
                $listItemClone.find("#state").text(stateText);
                var thisDate = new Date();
                thisDate.setTime(thisItem.declarationTime*1000);
                $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd"));
                $listItemClone.click(function(_event){
                    location.href = "accidentdeclare.html?id="+$(this).attr("data-id");
                });
                $(".listContent").append($listItemClone.show());
            }
        });
        $.get(getSGListUrl,{company:jobInfo[0].companyKey,state:5,limit:10000,page:1,order:"ecs"},function(_data){
            for(var i in _data.page.records){
                var thisItem = _data.page.records[i];
                var $listItemClone = $("#listItem").clone();
                $listItemClone.removeAttr("id");
                $listItemClone.attr("data-id",thisItem.id);
                $listItemClone.find(".listName").text(thisItem.number);
                $listItemClone.find(".money").hide();
                $listItemClone.find("#sj").text(thisItem.driverName);
                $listItemClone.find("#bxdType").text("事故申请单");
                var stateText;
                switch(thisItem.state){
                    case -2:
                        stateText = "未过审";
                        break;
                    case -1:
                        stateText = "未过审";
                        break;
                    case 0:
                        stateText = "待审批";
                        break;
                    case 1:
                        stateText = "待审核";
                        break;
                    case 2:
                        stateText = "待报销";
                        break;
                    case 3:
                        stateText = "待打款";
                        break;
                    case 4:
                        stateText = "待处理";
                        break;
                    case 5:
                        stateText = "在处理";
                        break;
                    case 6:
                        stateText = "已完成";
                        break;
                    case 7:
                        stateText = "已过审批";
                        break;
                }
                $listItemClone.find("#state").text(stateText);
                var thisDate = new Date();
                thisDate.setTime(thisItem.declarationTime*1000);
                $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                $listItemClone.click(function(_event){
                    location.href = "accidentdeclare.html?id="+$(this).attr("data-id");
                });
                $(".listContent").append($listItemClone.show());
            }
        });
    }
}