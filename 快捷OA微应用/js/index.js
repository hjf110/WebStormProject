"use strict";
function initPageMain(){
    var getUserInfoUrl = SERVER_URL + "/ex/user/GetUserByCode";

    var indexObj = new Index();

    //根据用户角色显示按钮
    indexObj.openRolePage();
    //根据用户角色跳转页面
    indexObj.goPage();

    function Index(){
        var userSignInUrl = SERVER_URL + "ex/user/CheckUserType";      //用户角色获取

        var thisObj = this;

        this.openRolePage = function(){
            publicObj.getUserInfo(null,function(_userInfo){
                thisObj.getRoleType(_userInfo.userid,function(_userJob){
                    var url = "";
                    console.log(_userJob);

                    if(_userJob==null||_userJob.length==0){
                        publicObj.openDingdingPopup("您不是该应用的人员","警告！","我知道了",function(){
                            publicObj.goBack();
                        });
                        return;
                    }
                    $.each(_userJob,function(index,item){
                        switch (item.role){
                            case "bridgeDriver":
                                $(".bridgeDriver").show();
                                break;
                            case "bridgeCheck":
                                $(".bridgeCheck").show();
                                break;
                            case "bridgeFinance":
                                $(".bridgeFinance").show();
                                break;
                            case "stayDriver":
                                $(".stayDriver").show();
                                break;
                            case "stayCheck":
                                $(".stayCheck").show();
                                break;
                            case "stayFinance":
                                $(".stayFinance").show();
                                break;
                            case "ureaDriver":
                                $(".ureaDriver").show();
                                break;
                            case "ureaBatch":
                                $(".ureaBatch").show();
                                break;
                            case "ureaCheck":
                                $(".ureaCheck").show();
                                break;
                            case "ureaFinance":
                                $(".ureaFinance").show();
                                break;
                            case "ureaCount":
                                $(".ureaCount").show();
                                break;
                            case "bridgeCount": //观察者和统计
                            case "bridgeObserver":
                            case "stayCount":
                            case "stayObserver":
                            case "ureaCount":
                            case "ureaObserver":
                                $(".all").show();
                                break;

                                //司机
                            case "accidentDriverHoldCar":
                                $(".accidentDriverHoldCar,.accidentSalesman").show();
                                break;
                            case "accidentDriverSelfTest":
                                $(".accidentDriverSelfTest,.accidentSalesman").show();
                                break;
                            case "accidentDriverNewCarCheck":
                                $(".accidentDriverNewCarCheck,.accidentSalesman").show();
                                break;
                            case "accidentDriverProblem":
                                $(".accidentDriverProblem,.accidentSalesman").show();
                                break;

                                //业务员
                            case "accidentSalesmanHoldCar":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentSalesmanSelfTest":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentSalesmanNewCarCheck":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentSalesmanProblem":
                                $(".accidentSalesman").show();
                                break;

                                //调度
                            case "accidentDispatchHoldCar":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentDispatchSelfTest":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentDispatchNewCarCheck":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentDispatchProblem":
                                $(".accidentSalesman").show();
                                break;

                                //车管
                            case "accidentManageHoldCar":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentManageSelfTest":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentManageNewCarCheck":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentManageProblem":
                                $(".accidentSalesman").show();
                                break;

                                //质检
                            case "accidentObservationHoldCar":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentObservationSelfTest":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentObservationNewCarCheck":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentObservationProblem":
                                $(".accidentSalesman").show();

                                //财务
                            case "accidentFinanceHoldCar":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentFinanceSelfTest":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentFinanceNewCarCheck":
                                $(".accidentSalesman").show();
                                break;
                            case "accidentFinanceProblem":
                                $(".accidentSalesman").show();




                        }
                    })
                    // switch(_userJob[0].role){
                    //     case "bridgeDriver":
                    //         $(".bridgeDriver").show();
                    //         break;
                    //     case "bridgeCheck":
                    //         $(".bridgeCheck").show();
                    //         break;
                    //     case "bridgeFinance":
                    //         $(".bridgeFinance").show();
                    //         break;
                    // }
                    // switch (_userJob[1].role) {
                    //     case "stayDriver":
                    //         $(".stayDriver").show();
                    //         break;
                    //     case "stayCheck":
                    //         $(".stayCheck").show();
                    //         break;
                    //     case "stayFinance":
                    //         $(".stayFinance").show();
                    //         break;
                        // case "ureaDriver":
                        //     location.href = "../html/sj_index.html";
                        //     break;
                        // case "bridgeCheck":
                        // case "stayCheck":
                        // case "ureaCheck":
                        //     location.href = "../html/sh_index.html";
                        //     break;
                        // case "bridgeFinance":
                        // case "stayFinance":
                        // case "ureaFinance":
                        //     location.href = "../html/cw_index.html";
                        //     break;
                        // case "ureaBatch":
                        //     location.href = "../html/sp_index.html";
                        //     break;
                        // case "ureaCount":
                        //     location.href = "../html/tj_index.html";
                        //     break;
                        // case "faultManage":
                        //     location.href = "../html/cg_index.html";
                        //     break;
                        // case "faultDispatch":
                        //     location.href = "../html/dd_index.html";
                        //     break
                        // default:
                        //     publicObj.openDingdingPopup("您所处角色列表页面正在开发中");
                        //     break;
                    
                });
            });
        }

    //    获取到角色类型
        this.getRoleType = function(_userId,_callBack,_boolean){
            if(!_boolean&&sessionStorage.getItem("user_job")&&sessionStorage.getItem("user_job").length>0){
                if(typeof _callBack == "function"){
                    _callBack(JSON.parse(sessionStorage.getItem("user_job")));
                }
            }else{
                $.get(userSignInUrl,{userId:_userId,},function(_data){
                    console.log(_data);
                    if(parseInt(_data.code)!=0){
                        publicObj.openDingdingPopup(_data.msg);
                    }else{
                        sessionStorage.setItem("user_job",JSON.stringify(_data.data.roleList));
                        sessionStorage.setItem("user_jobInfo",JSON.stringify(_data2.data.userInfo));
                        if(typeof _callBack == "function"){
                            _callBack(_data.data.roleList);
                        }
                    }

                });
            }
        }
        // 跳转页面
        
        this.goPage = function() {
            $(".Driver").click(function() {
                var state = $(this).attr("data-id");
                var num = $(this).attr("data-num");
                var acci = $(this).attr("data-acci");
                console.log(state, num, acci)
                window.location.href = "../html/sj_index.html?state=" + state;
                switch (state) {
                    case "-3":
                        if(num == "1"){
                            window.location.href = "../html/hotelbx.html?state=" + state;
                        }else if (num == "2"){
                            window.location.href = "../html/pontage.html?state=" + state;
                        } else if (num == "3") {
                            window.location.href = "../html/ureadeclare.html?state=" + state;
                        }else if(num == "4"&&acci == "1"){
                            window.location.href = "../html/jczxsg_index.html";
                        }else if(num == "4"&&acci == "2"){
                            window.location.href = "../html/xcjcwtfk_index.html";
                        }else if(num == "4"&&acci == "3"){
                            window.location.href = "../html/zcjtsg_index.html";
                        }else if(num == "4"&&acci == "4"){
                            window.location.href = "../html/xcjczxsg_index.html";
                        }
                        break;
                    default:
                        sessionStorage.setItem("typeNum", num)
                        window.location.href = "../html/sj_index.html?state=" + state;
                }
            });
            $(".Check").click(function () {
                var num = $(this).attr("data-num")
                var state = $(this).attr("data-id")
                sessionStorage.setItem("typeNum", num)
                window.location.href = "../html/sj_index.html?state=" + state;
            })
            $(".Finance").click(function () {
                var num = $(this).attr("data-num")
                var state = $(this).attr("data-id")
                sessionStorage.setItem("typeNum", num)
                window.location.href = "../html/sj_index.html?state=" + state;
            })
            $(".Batch").click(function () {
                var num = $(this).attr("data-num")
                var state = $(this).attr("data-id")
                sessionStorage.setItem("typeNum", num)
                window.location.href = "../html/sj_index.html?state=" + state;
            })
            $(".Count").click(function () {
                var num = $(this).attr("data-num")
                var state = $(this).attr("data-id")
                sessionStorage.setItem("typeNum", num)
                window.location.href = "../html/sj_index.html?state=" + state;
            });
        //    列表页面点击事件
            $(".listBox").click(function(){
                var num = $(this).attr("data-num");
                var state = $(this).attr("data-id");
                sessionStorage.setItem("typeNum", num);
                switch(parseInt(num)){
                    case 1:
                    case 2:
                    case 3:
                        window.location.href = "../html/sj_index.html?state="+state;
                        break;
                    case 4:
                        window.location.href = "../html/accidentList.html?state="+state;
                        break;

                }

            });




        }
    }
}