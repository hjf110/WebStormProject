
function initPageMain() {
	var indexObj;

	initIndexVar();
	initIndexListener();
    initIndexView();


	function initIndexVar() {
		if(!indexObj) {
			indexObj = new Index();
		}
	}
	function initIndexListener() {
		if(indexObj) {
			indexObj.setOnIndexClickListener();
		}
	}

	function initIndexView(){
		indexObj.getAjaxForSJList();
	}
}

function Index() {
	var thisObj = this;
    var getZSFListUrl = SERVER_URL+"ex/stay/list";	 //住宿费
    var getGQFListUrl = SERVER_URL+"ex/bridge/list";		//过桥费
    var getNSFFListUrl = SERVER_URL+"ex/urea/list";		//尿素费
    var getSGListUrl = SERVER_URL+"ex/hAccidentApplication/list";		//事故
    var userInfo = JSON.parse(sessionStorage.getItem("user_info"));	//获取用户数据
    var jobInfo = JSON.parse(sessionStorage.getItem("user_jobInfo"));	//获取用户数据
    var state = parseInt(publicObj.getUrlParameter("state"));
    var typeNum = sessionStorage.getItem("typeNum")
	this.setOnIndexClickListener = function() {

		//顶部选项卡选中样式
		var $tab = $(".topTabBar").children();
		$tab.on("click", function() {
			var $this = $(this);
			$tab.removeClass("topTabBar_select");
			$this.addClass("topTabBar_select");
		});

		$(".tab2").click(function() {
			$(".tab2 i").addClass("public-iconListWhite");
			$(".tab1 i").addClass("public-iconApplyBlack");
			$(".list").show();
			$(".apply").hide();
		})
		$(".tab1").click(function() {
			$(".tab1 i").removeClass("public-iconApplyBlack");
			$(".tab2 i").removeClass("public-iconListWhite");
			$(".apply").show();
			$(".list").hide();
		})

        $(".listItem").click(function(_event){
        	if($(this).attr("data-page")){
                location.href = "../html/"+$(this).attr("data-page")+"?type=-3";
			}else{
        		publicObj.openDingdingPopup("该功能还在开发中");
			}
		});

		$("#select1").change(function(){
            thisObj.getAjaxForSJList();
		});

	};

	//获取司机订单列表
	this.getAjaxForSJList = function(){
        $(".listContent>.listItem:not([id])").remove();
        console.log(state)
        console.log(state, typeNum)
        switch (typeNum) {
            case "1":
                if ( state == "-9") {
                    $.get(getZSFListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "3,8" }, function (_data) {
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("住宿费报销单");
                            var stateText;
                            switch (parseInt(thisItem.isSend)) {
                                case 1:
                                    stateText = "未寄";
                                    break;
                                case 2:
                                    stateText = "已寄";
                                    break;
                                default:
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "hotelbx.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }else if(state == 20 || state == "20"){
                    $.get(getZSFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: "2,3,6,8" }, function (_data) {
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("住宿费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "hotelbx.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }else{
                    console.log("出现了状态");
                    console.log(state);
                    $.get(getZSFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: state }, function (_data) {
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("住宿费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "hotelbx.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }
               
            case "2":
                if (state == "-9") {
                    $.get(getGQFListUrl, { userId: jobInfo.structureUserId, isSend:"1,2", limit: 10000, page: 1, order: "ecs", state: "3,8"  }, function (_data) {
                        console.log(_data)
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("过桥费报销单");
                            var stateText;
                            switch (parseInt(thisItem.isSend)) {
                                case 1:
                                    stateText = "未寄";
                                    break;
                                case 2:
                                    stateText = "已寄";
                                    break;
                                default:
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "pontage.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }else if(state == 20||state == "20"){    //20的时候应该查询状态为2,3,6,8
                    console.log("是20 ");
                    $.get(getGQFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: "2,3,6,8" }, function (_data) {
                        console.log(_data)
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("过桥费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                                    stateText = "已审批";
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "pontage.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }else{
                    $.get(getGQFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: state }, function (_data) {
                        console.log(_data)
                        if(_data.data.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.data.records) {
                            var thisItem = _data.data.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text("¥" + thisItem.money);
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("过桥费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                                    stateText = "已审批";
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "pontage.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }
            case "3":
                if (state == "-9") {
                    $.get(getNSFFListUrl, { userId: jobInfo.structureUserId, isSend: "1,2", limit: 10000, page: 1, order: "ecs", state: "8" }, function (_data) {
                        console.log(_data);
                        if(_data.page.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.page.records) {
                            var thisItem = _data.page.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id", thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text((thisItem.money == null ? "暂无" : ("¥" + thisItem.money)));
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("尿素费报销单");
                            var stateText;
                            switch (parseInt(thisItem.isSend)) {
                                case 1:
                                    stateText = "未寄";
                                    break;
                                case 2:
                                    stateText = "已寄";
                                    break;
                                default:
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "ureadeclare.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                } else if(state == 20 || state == "20"){
                    $.get(getNSFFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: "1,2,3,6,8" }, function (_data) {
                        console.log(_data);
                        if(_data.page.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.page.records) {
                            var thisItem = _data.page.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id",thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text((thisItem.money == null ? "暂无" : ("¥" + thisItem.money)));
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("尿素费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                                    stateText = "已审批";
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "ureadeclare.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }else {
                    $.get(getNSFFListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: state }, function (_data) {
                        console.log(_data);
                        if(_data.page.records.length==0){
                            $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                        }
                        for (var i in _data.page.records) {
                            var thisItem = _data.page.records[i];
                            var $listItemClone = $("#listItem").clone();
                            $listItemClone.removeAttr("id");
                            $listItemClone.attr("data-id",thisItem.id);
                            $listItemClone.find(".listName").text(thisItem.number);
                            $listItemClone.find(".money").text((thisItem.money == null ? "暂无" : ("¥" + thisItem.money)));
                            $listItemClone.find("#sj").text(thisItem.driverName);
                            $listItemClone.find("#bxdType").text("尿素费报销单");
                            var stateText;
                            switch (thisItem.state) {
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
                                    stateText = "已审批";
                                    break;
                            }
                            $listItemClone.find("#state").text(stateText);
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                            $listItemClone.click(function (_event) {
                                location.href = "ureadeclare.html?id=" + $(this).attr("data-id");
                            });
                            $(".listContent").append($listItemClone.show());
                        }
                    });
                    break;
                }
            case "4":
                console.log("是第四个流程");

                $.get(getSGListUrl, { userId: jobInfo.structureUserId, limit: 10000, page: 1, order: "ecs", state: "1,2,3,4,5" }, function (_data) {
                    console.log(_data);
                    if(_data.page.records.length==0){
                        $(".listContent").append("<p style='text-align:center;font-size:20px;'>暂时没有数据！</p>");
                    }
                    for (var i in _data.page.records) {
                        var thisItem = _data.page.records[i];
                        var $listItemClone = $("#listItem").clone();
                        $listItemClone.removeAttr("id");
                        $listItemClone.attr("data-id",thisItem.id);
                        console.log(thisItem);
                        switch(thisItem.natureAccident){
                            case 1:
                                $listItemClone.find(".money").text("装卸事故");
                                break;
                            case 2:
                                $listItemClone.find(".money").text("新车检查");
                                break;
                            case 3:
                                $listItemClone.find(".money").text("交通事故");
                                break;
                            case 4:
                                $listItemClone.find(".money").text("新车装卸");
                                break;
                        }
                        $listItemClone.find(".listName").text(thisItem.number);
                        $listItemClone.find("#sj").text(thisItem.name);
                        $listItemClone.find("#bxdType").text("事故申报");
                        var stateText;
                        switch (thisItem.start) {
                            case 1:
                                stateText = "未处理";
                                break;
                            case 2:
                                stateText = "未调度";
                                break;
                            case 3:
                                stateText = "已调度";
                                break;
                            case 4:
                                stateText = "继续跑";
                                break;
                            case 5:
                                stateText = "已完成";
                                break;
                        }
                        $listItemClone.find("#state").text(stateText);
                        if(thisItem.declarationTime==null){
                            $listItemClone.find(".time").text("暂未处理");
                        }else{
                            var thisDate = new Date();
                            thisDate.setTime(thisItem.declarationTime * 1000);
                            $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
                        }

                        $listItemClone.click(function (_event) {
                            location.href = "accidentdeclare.html?id=" + $(this).attr("data-id");
                        });
                        $(".listContent").append($listItemClone.show());
                    }
                });
                break;
        }
		// switch($("#select1").val()){
		// 	case "住宿费":
		// 		$.get(getZSFListUrl,{declarationUserId:userInfo.id,limit:10000,page:1,order:"ecs"},function(_data){
		// 			for(var i in _data.data.records){
		// 				var thisItem = _data.data.records[i];
		// 				var $listItemClone = $("#listItem").clone();
        //                 $listItemClone.removeAttr("id");
        //                 $listItemClone.attr("data-id",thisItem.id);
        //                 $listItemClone.find(".listName").text(thisItem.number);
        //                 $listItemClone.find(".money").text("¥"+thisItem.money);
        //                 $listItemClone.find("#sj").text(thisItem.driverName);
        //                 $listItemClone.find("#bxdType").text("住宿费报销单");
        //                 var stateText;
        //                 switch(thisItem.state){
		// 					case -2:
        //                         stateText = "未过审";
		// 						break;
		// 					case -1:
        //                         stateText = "未过审";
		// 						break;
		// 					case 0:
        //                         stateText = "待审批";
		// 						break;
		// 					case 1:
        //                         stateText = "待审核";
		// 						break;
		// 					case 2:
        //                         stateText = "待报销";
		// 						break;
        //                     case 3:
        //                         stateText = "待打款";
        //                         break;
        //                     case 4:
        //                         stateText = "待处理";
        //                         break;
        //                     case 5:
        //                         stateText = "在处理";
        //                         break;
        //                     case 6:
        //                         stateText = "已完成";
        //                         break;
        //                     case 7:
        //                         stateText = "已过审批";
        //                         break;
		// 				}
        //                 $listItemClone.find("#state").text(stateText);
        //                 var thisDate = new Date();
        //                 thisDate.setTime(thisItem.declarationTime*1000);
        //                 $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
        //                 $listItemClone.click(function(_event){
		// 					location.href = "hotelbx.html?id="+$(this).attr("data-id");
		// 				});
		// 				$(".listContent").append($listItemClone.show());
		// 			}
		// 		});
		// 		break;
		// 	case "过桥费":
        //         $.get(getGQFListUrl,{declarationUserId:userInfo.id,limit:10000,page:1,order:"ecs"},function(_data){
        //             for(var i in _data.data.records){
        //                 var thisItem = _data.data.records[i];
        //                 var $listItemClone = $("#listItem").clone();
        //                 $listItemClone.removeAttr("id");
        //                 $listItemClone.attr("data-id",thisItem.id);
        //                 $listItemClone.find(".listName").text(thisItem.number);
        //                 $listItemClone.find(".money").text("¥"+thisItem.money);
        //                 $listItemClone.find("#sj").text(thisItem.driverName);
        //                 $listItemClone.find("#bxdType").text("过桥费报销单");
        //                 var stateText;
        //                 switch(thisItem.state){
        //                     case -2:
        //                         stateText = "未过审";
        //                         break;
        //                     case -1:
        //                         stateText = "未过审";
        //                         break;
        //                     case 0:
        //                         stateText = "待审批";
        //                         break;
        //                     case 1:
        //                         stateText = "待审核";
        //                         break;
        //                     case 2:
        //                         stateText = "待报销";
        //                         break;
        //                     case 3:
        //                         stateText = "待打款";
        //                         break;
        //                     case 4:
        //                         stateText = "待处理";
        //                         break;
        //                     case 5:
        //                         stateText = "在处理";
        //                         break;
        //                     case 6:
        //                         stateText = "已完成";
        //                         break;
        //                     case 7:
        //                         stateText = "已审批";
        //                         break;
        //                 }
        //                 $listItemClone.find("#state").text(stateText);
        //                 var thisDate = new Date();
        //                 thisDate.setTime(thisItem.declarationTime*1000);
        //                 $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
        //                 $listItemClone.click(function(_event){
        //                     location.href = "pontage.html?id="+$(this).attr("data-id");
        //                 });
        //                 $(".listContent").append($listItemClone.show());
        //             }
        //         });
		// 		break;
		// 	case "尿素费":
        //         $.get(getNSFFListUrl,{declarationUserId:userInfo.id,limit:10000,page:1,order:"ecs"},function(_data){
        //             for(var i in _data.page.records){
        //                 var thisItem = _data.page.records[i];
        //                 var $listItemClone = $("#listItem").clone();
        //                 $listItemClone.removeAttr("id");
        //                 $listItemClone.attr("data-id",thisItem.id);
        //                 $listItemClone.find(".listName").text(thisItem.number);
        //                 $listItemClone.find(".money").text("¥"+(thisItem.money==null?"暂无":thisItem.money));
        //                 $listItemClone.find("#sj").text(thisItem.driverName);
        //                 $listItemClone.find("#bxdType").text("尿素费报销单");
        //                 var stateText;
        //                 switch(thisItem.state){
        //                     case -2:
        //                         stateText = "未过审";
        //                         break;
        //                     case -1:
        //                         stateText = "未过审";
        //                         break;
        //                     case 0:
        //                         stateText = "待审批";
        //                         break;
        //                     case 1:
        //                         stateText = "待审核";
        //                         break;
        //                     case 2:
        //                         stateText = "待报销";
        //                         break;
        //                     case 3:
        //                         stateText = "待打款";
        //                         break;
        //                     case 4:
        //                         stateText = "待处理";
        //                         break;
        //                     case 5:
        //                         stateText = "在处理";
        //                         break;
        //                     case 6:
        //                         stateText = "已完成";
        //                         break;
        //                     case 7:
        //                         stateText = "已过审";
        //                         break;
        //                 }
        //                 $listItemClone.find("#state").text(stateText);
        //                 var thisDate = new Date();
        //                 thisDate.setTime(thisItem.declarationTime*1000);
        //                 $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
        //                 $listItemClone.click(function(_event){
        //                     location.href = "ureadeclare.html?id="+$(this).attr("data-id");
        //                 });
        //                 $(".listContent").append($listItemClone.show());
        //             }
        //         });
		// 		break;
		// 	case "事故申报":
        //         $.get(getSGListUrl,{declarationUserId:userInfo.id,limit:10000,page:1,order:"ecs"},function(_data){
        //             for(var i in _data.page.records){
        //                 var thisItem = _data.page.records[i];
        //                 var $listItemClone = $("#listItem").clone();
        //                 $listItemClone.removeAttr("id");
        //                 $listItemClone.attr("data-id",thisItem.id);
        //                 $listItemClone.find(".listName").text(thisItem.number);
        //                 $listItemClone.find(".money").hide();
        //                 $listItemClone.find("#sj").text(thisItem.driverName);
        //                 $listItemClone.find("#bxdType").text("事故申请单");
        //                 var stateText;
        //                 switch(thisItem.state){
        //                     case -2:
        //                         stateText = "未过审";
        //                         break;
        //                     case -1:
        //                         stateText = "未过审";
        //                         break;
        //                     case 0:
        //                         stateText = "待审批";
        //                         break;
        //                     case 1:
        //                         stateText = "待审核";
        //                         break;
        //                     case 2:
        //                         stateText = "待报销";
        //                         break;
        //                     case 3:
        //                         stateText = "待打款";
        //                         break;
        //                     case 4:
        //                         stateText = "待处理";
        //                         break;
        //                     case 5:
        //                         stateText = "在处理";
        //                         break;
        //                     case 6:
        //                         stateText = "已完成";
        //                         break;
        //                     case 7:
        //                         stateText = "已过审";
        //                         break;
        //                 }
        //                 $listItemClone.find("#state").text(stateText);
        //                 var thisDate = new Date();
        //                 thisDate.setTime(thisItem.declarationTime*1000);
        //                 $listItemClone.find(".time").text(thisDate.Format("yyyy-MM-dd hh:mm"));
        //                 $listItemClone.click(function(_event){
        //                     location.href = "accidentdeclare.html?id="+$(this).attr("data-id");
        //                 });
        //                 $(".listContent").append($listItemClone.show());
        //             }
        //         });
		// 		break;

		// }
	}
}
