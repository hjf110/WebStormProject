customerMoney = undefined;

function initPageMain() {
    var accidenteclareObj = new Accidenteclare();
    accidenteclareObj.initPageView();
    publicObj.reviewForRole();


    function Accidenteclare(){
        var updateOrSaveUrl = SERVER_URL + "/ex/hAccidentApplication/save";	//提交申请单接口
        var getReimbursementInfoUrl = SERVER_URL + "ex/hAccidentApplication/info/";		//获取报销单详情接口
        var getUserInfoByIdUrl = SERVER_URL + "ex/user/GetUserInfoByUserId";       //获取用户详情

        var getOldCarInfoUrl = SERVER_URL + "ex/HoldCar/info/";     //旧车装卸事故详情接口
        var getSelfTestInfoUrl = SERVER_URL+"ex/HSelfTest/info/";         //自测检查事故详情接口
        var getNewCarCheckInfoUrl = SERVER_URL + "ex/hNewCarCheck/info/";        //新车检查事故详情接口
        var getNewCarHandingInfoUrl = SERVER_URL + "ex/hNewCarHanding/info/";      //新车装卸事故详情接口
        var getNewCarReportInfoUrl = SERVER_URL + "ex/hProblem/info/";   // 新车检查问题反馈详情接口
        var postNewCarCheckUrl = SERVER_URL + "ex/hNewCarCheck/update";   //提交业务员处理意见
        var postNewCarHandingUrl = SERVER_URL + "ex/hNewCarHanding/update";     //新车装卸业务员处理意见
        var postProblemUrl = SERVER_URL + "ex/hProblem/update";   //新车问题检查事故业务员处理意见
        var postSelfTestUrl = SERVER_URL + "ex/HSelfTest/update";   //自车交通事故
        var postOldCarUrl = SERVER_URL + "ex/HoldCar/update";    //旧车装卸事故
        var postNewCarCheckUrl = SERVER_URL + "ex/hNewCarCheck/update";     //新车检查事故

        var saveExpenseUrl = SERVER_URL + "ex/stayExpense/save";

        var oldCarSaveUrl = SERVER_URL + "ex/HoldCar/save";    //旧车装卸事故保存接口
        var selfTestSaveUrl = SERVER_URL + "ex/HSelfTest/save";  //自测交通事故保存接口
        var newCarCheckSaveUrl = SERVER_URL + "ex/hNewCarCheck/save";           //新车检查事故保存接口
        var newCarHandingSaveUrl = SERVER_URL + "ex/hNewCarHanding/save";     //新车装卸事故保存接口
        var newCarCheckReportSaveUrl = SERVER_URL + "/ex/hProblem/save";     //新车问题检查事故

        var type = parseInt(publicObj.getUrlParameter("type"));
        var id = publicObj.getUrlParameter("id")&&publicObj.getUrlParameter("id").length>0?publicObj.getUrlParameter("id").split("_")[0]:"";
        var idType = publicObj.getUrlParameter("id")&&publicObj.getUrlParameter("id").length>0?parseInt(publicObj.getUrlParameter("id").split("_")[1]):"";
        var userInfo;
        var userJob = JSON.parse(sessionStorage.getItem("user_job"));
        var thisObj = this;
        var reimbursementInfo;
        var user_name;
        var tableInfo;//表格详情

        console.log(id+"---"+idType);
        publicObj.getUserInfo(null,function(_data){
/*            alert(_data.name);*/

            userInfo = _data;
            user_name=_data.name;
            $("#sjName").text(_data.name);
        });

        var newCar=0;

        console.log("开始检查角色");
        var isOk = false;
        for(var k in userJob){
            if(userJob[k].role == "accidentDispatchNewCarCheck"||userJob[k].role == "accidentDriverNewCarCheck"||userJob[k].role=="accidentManageNewCarCheck"||userJob[k].role=="accidentSalesmanNewCarCheck"||userJob[k].role=="accidentObservationNewCarCheck"||userJob[k].role=="accidentFinanceNewCarCheck"){
                isOk = true;
            }
        }
        if(!isOk){
            console.log(userJob);
            publicObj.openDingdingPopup("您没有操作或查看事故申报流程的权限！","提示",null,function(){
                publicObj.goBack();
            });
            return;
        }

        initXCJCZXSGView();
        // $("#je").change(function(){
        //     $(".chooseHide,.xcjczxsg,.xcjcwtfk,.jczxsg,.xcjcsg").hide();
        //     $(".xcjcwtfk.zcjtsg.jczxsg.xcjcsg>.submitBtn").show();
        //     switch ($("#je").val()) {
        //         case '1':
        //             initJSZXSGView();   //初始化旧车装卸事故
        //             break;
        //         case '2':
        //             initXCJCWTFKView();     //初始化新车检查问题反馈视图
        //             break;
        //         case '3':
        //             initZCJTSGView();       //初始化自车交通事故视图
        //             break;
        //         case '4':
        //             //$(".reimbursementType span").text('新车检查装卸事故');
        //             initXCJCZXSGView();     //初始化新车检查装卸事故
        //             break;
        //         case '5':
        //             initXCJCSGView();   //初始化新车检查事故
        //             break;
        //         default:
        //             $(".reimbursementType span").text('事故申报单');
        //             break;
        //     }
        //     // if($("#je").val()!='kong'){
        //     //     $('.khdw,.dis1,.dis2,.dis3,.dis4,.dis_btn').css('display','block');
        //     //     $(".orderNum span").text("事故地点:");
        //     // }
        //     // else if($("#je").val()=='kong'){
        //     //     $(".dis1").css("display","none");
        //     //     $('.dis2').css('display','none');
        //     //     $('.dis3').css('display','none');
        //     //     $('.dis4').css('display','none');
        //     //     $('.dis_btn').css('display','none');
        //     // }
        //     // if($("#je").val()=="1"||$("#je").val()=="4"){
        //     //     $(".orderNum span").text("检查地点:");
        //     // }
        //     // if($("#je").val()=="3"){
        //     //     $(".khdw").hide();
        //     // }
        //
        //     /*if ($("#je").val() == '2') {
        //         newCar = 1;
        //     } else {
        //         newCar = 0;
        //     }*/
        // });

        var user_longitude;
        var user_latitude;
        var user_adress;


        $("#btn_place").click(function () {
            console.log("zjw");
            dd.device.geolocation.get({
                targetAccuracy: 200,
                coordinate: 1,
                withReGeocode: true,
                useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
                onSuccess: function (result) {
                    $("#ddh").text(result.address);
                    user_adress=result.address;
                    user_longitude=result.longitude;
                    user_latitude=result.latitude;
                    dd.device.notification.toast({
                        icon: '', //icon样式，有success和error，默认为空 0.0.2
                        text: "已重新定位", //提示信息
                        duration: 1.5, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                        delay: Number, //延迟显示，单位秒，默认0
                        onSuccess : function(result) {

                        },
                        onFail : function(err) {}
                    })
                }
            });
        });

        //根据type状态，初始化页面内容
        this.initPageView = function(){

            console.log("项目详情",reimbursementInfo);
            console.log(type==-3+"------------------------------"+(type!=type));
            console.log(idType);
            console.log(type!=type);
            if(idType==-3||idType==""||idType==null){
                //申请页面初始化函数
                // initaccidenteclareApplyView();

                console.log("自动定位");
                $("#btn_place").click();

            }else{
                getReimbursementInfo();
            }
        };

        //申请页面初始化函数
        function initaccidenteclareApplyView() {
            $("#reimState").text("申请");
            $(".reimbursementTip").text("填写申报信息后点击提交，提交给车管人员处理");


            //填写用户信息
            publicObj.getUserInfo(null, function (_userInfo) {
                userInfo = _userInfo;
                $("#sjName").text(_userInfo.name);
            });

            $(".type-3").show(0, function () {
                $(".add").css("display", "inline-block");
            });

        }

//          $("#ccsj").click(function(_event){
//              var $this = $(this);
//              publicObj.chooseInterval(function(_result){
//                  var startDate = new Date();
//                  var endDate = new Date();
//                  startDate.setTime(_result.start);
//                  endDate.setTime(_result.end);
//                  $this.val(startDate.Format("MM月dd日")+"-"+endDate.Format("MM月dd日"));
//              });
//          });

			//设置上传事故照片按钮点击事件
            // $(".invoice2 .add").click(function(_event){
             //    publicObj.uploadImage(function(_imgArray){
             //        for(var i in _imgArray){
             //            var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
             //            $thisImg.click(function(_event){
             //                var thisBtn = $(this);
             //                publicObj.actionSheet({
             //                    title:"请选择图片操作",
             //                    otherButtons:["查看大图","删除图片"],
             //                    callback:function(_result){
             //                        console.log(_result);
             //                        switch(_result.buttonIndex){
             //                            case 0:
             //                                publicObj.previewImage(thisBtn.find("img").attr("src"));
             //                                break;
             //                            case 1:
             //                                thisBtn.remove();
             //                                break;
             //                        }
             //                    }
             //                });
             //            });
             //            $(".invoice2 .photoBox").prepend($thisImg);
             //        }
             //    });
            // });

            //设置上传事故照片按钮点击事件
            // $(".invoice .add").click(function(_event){
            //     publicObj.uploadImage(function(_imgArray){
            //         for(var i in _imgArray){
            //             var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
            //             $thisImg.click(function(_event){
            //                 var thisBtn = $(this);
            //                 publicObj.actionSheet({
            //                     title:"请选择图片操作",
            //                     otherButtons:["查看大图","删除图片"],
            //                     callback:function(_result){
            //                         console.log(_result);
            //                         switch(_result.buttonIndex){
            //                             case 0:
            //                                 publicObj.previewImage(thisBtn.find("img").attr("src"));
            //                                 break;
            //                             case 1:
            //                                 thisBtn.remove();
            //                                 break;
            //                         }
            //                     }
            //                 });
            //             });
            //             $(".invoice .photoBox").prepend($thisImg);
            //         }
            //     });
            // });
            var clickAble = true;


            //	设置提交按钮点击事件
            // $(".submitBtn").click(function(_event){
            //     return;
            //     var isFall = true;
            //     if($("#ccsj").val().length<=0){
            //         isFall = false;
            //     }
            //
            //     if(!clickAble){
            //         return;
            //     }
            //
            //  //   if((!newCar&&isFall&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress)||((newCar||$("#je").val()=='1')&&isFall&&$("#customer").val().length>=0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress))
            // if(($("#je").val()=='3'||($("#je").val()!='3'&&$("#customer").val().length>0))&&$("#ccsj").length>0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress){
            //         $.each(userJob, function (i, el) {
            //             if (el.role == "accidentDriver") {
            //                 flowId = el.flowId;
            //                 console.log("flowId is "+flowId);
            //                 return false;
            //             }
            //         });
            //
            //         var imgArray = [];
            //         $(".invoice .photoBox .photo1 img").each(function(_i){
            //             imgArray.push($(this).attr("src"));
            //         });
            //         /*var img2Array = [];
            //         $(".invoice2 .photoBox .photo1 img").each(function(_i){
            //             img2Array.push($(this).attr("src"));
            //         });*/
            //
            //         // {
            //         //     "driverId": 0,
            //         //     "image": "string",
            //         //     "licensePlate": "车牌",
            //         //     "locationDimension": 0,
            //         //     "locationLongitude": 0,
            //         //     "name": "司机名字",
            //         //     "natureAccident": 事故类型（int）,
            //         //     "start": 状态（1）,
            //         //     "startH": 1
            //         // }
            //
            //         clickAble = false;
            //
            //         var thisUrl = "";
            //         var dataStr = "";
            //
            //         switch(parseInt($("#je").val())){
            //             case 1:     //旧车装卸事故
            //                 thisUrl = oldCarSaveUrl;
            //                 dataStr = JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //                     locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //                     start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId});
            //
            //                 break;
            //             case 2:
            //                 thisUrl = newCarCheckReportSaveUrl;
            //                 dataStr = JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //                     locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //                     start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId});
            //
            //                 console.log(dataStr);
            //                 console.log("事故性质是新车检查问题反馈");
            //                 break;
            //             case 3:     //自测交通事故
            //                 thisUrl = selfTestSaveUrl;
            //                 dataStr = JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //                     locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //                     start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId});
            //                 break;
            //             case 4:
            //                 console.log("事故性质是新车装卸事故");
            //                 thisUrl = newCarHandingSaveUrl;
            //
            //                 dataStr = JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //                     locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //                     start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId});
            //
            //                 break;
            //             case 5:
            //                 thisUrl = newCarCheckSaveUrl;
            //                 dataStr = JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //                     locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //                     start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId});
            //                 console.log("事故性质是新车检查事故");
            //                 break;
            //         }
            //         console.log(dataStr);
            //         if(thisUrl.length>0&&dataStr.length>0){
            //             $.ajax(thisUrl,{
            //                 data:dataStr,
            //                 type:"POST",
            //                 contentType:"application/json",
            //                 processData:false,
            //                 success:function(_data) {
            //                     console.log(_data);
            //                     if(_data.code==0){
            //                         publicObj.openDingdingPopup("事故申报成功",null,null,function(){
            //                             publicObj.goBack();
            //                         });
            //                     }
            //                 },
            //                 error:function(_error){
            //                     clickAble = true;
            //                 }
            //             });
            //         }
            //         // $.ajax(updateOrSaveUrl,{
            //         //     data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
            //         //         locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
            //         //         start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId}),
            //         //     type:"post",
            //         //     contentType:"application/json",
            //         //     processData:false,
            //         //     success:function(_data) {
            //         //         console.log(_data);
            //         //         if(_data.code==0){
            //         //             publicObj.openDingdingPopup("事故申报成功",null,null,function(){
            //         //                 publicObj.goBack();
            //         //             });
            //         //         }
            //         //     },
            //         //     error:function(_error){
            //         //         clickAble = true;
            //         //     }
            //         // });
            //     }
            //     else{
            //         publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
            //     }
            // });

            //	根据id获取报销单数据
            function getReimbursementInfo(){
                console.log(idType);
                switch(idType){
                    case 1:     //旧车装卸事故
                        $.get(getOldCarInfoUrl+id,{},function(_data){

                            console.log(_data);

                            reimbursementInfo = _data.info.details;
                            tableInfo = _data.info.affiliated;
                            type = reimbursementInfo.start;
                            thisObj.initJCZXSGPageView();
                        });
                        break;
                    case 2:     //新车检查问题反馈
                        $.get(getNewCarReportInfoUrl+id,{},function(_data){

                            console.log(_data);

                            reimbursementInfo = _data.info.details;
                            tableInfo = _data.info.affiliated;
                            type = reimbursementInfo.start;

                            thisObj.initXCJCWTFKPageView();

                        });

                        break;
                    case 3:     //自车交通事故
                        $.get(getSelfTestInfoUrl+id,{},function(_data){

                            console.log(_data);

                            reimbursementInfo = _data.info.details;
                            tableInfo = _data.info.affiliated;
                            type = reimbursementInfo.start;
                            thisObj.initZCJTSGPageView();
                        });
                        break;
                    case 4:     //新车检查装卸事故
                        $.get(getNewCarHandingInfoUrl+id,{},function(_data){

                            console.log(_data);

                            reimbursementInfo = _data.info.details;
                            tableInfo = _data.info.affiliated;
                            type = reimbursementInfo.start;
                            thisObj.initXCZXSGPageView();
                        });
                        break;
                    case 5:     //新车检查事故
                        $.get(getNewCarCheckInfoUrl+id,{},function(_data){

                            console.log(_data);

                            reimbursementInfo = _data.info.details;
                            tableInfo = _data.info.affiliated;
                            type = reimbursementInfo.start;
                            thisObj.initXCJCSGPageView();
                        });
                        break;
                }
            }

            //旧车装卸事故页面渲染
            this.initJCZXSGPageView = function(){

                var step2Str = "已处理";
                var activeIndex = 0;
                switch(type){
                    case 1:
                        $("#reimState").text("待处理");
                        activeIndex = 0;

                        //判断是否为车管，车管则显示车管处理框
                        var isCg = false;
                        for(var j in userJob){
                            if(userJob[j].role == "accidentManage"){
                                isCg = true;
                            };
                        }

                        if(isCg){
                            $(".jczc").show();
                            $("#cgName").text(userInfo.name);
                        }

                        //车管处理方式点击事件
                        $("#cg_je").change(function(_event){
                            var _$this = $(this);
                            switch(_$this.val()){
                                case "1":
                                    $(".cgclyjBox").hide();
                                    break;
                                case "2":
                                    $(".cgclyjBox").show();
                                    break;
                            }
                        });

                        //车管提交
                        $(".submitCgClBtn").click(function(_event){
                            console.log("选择了提交");
                            if(($("#cg_je").val()=="2"&&$("#cgclyj").val().length>0)||$("#cg_je").val()=="1"){
                                $(".submitCgClBtn").off();
                                var state;
                                switch($("#cg_je").val()){
                                    case "1":
                                        state = 4;
                                        break;
                                    case "2":
                                        state = 2;
                                        break;
                                }
                                var dataStr = JSON.stringify({id:id,start:state,vehicleHandleTime:parseInt(new Date().getTime()/1000),remark:$("#cgclyj").val(),vehicleCompleteId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentManage"})[0].userId,vehicleCompleteName:userInfo.name});
                                $.ajax(postOldCarUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                })
                            }else{
                                publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                            }
                        });

                        break;
                    case 2:
                        $("#reimState").text("任务取消");

                        $(".jczc").show();
                        $("#jczc_cgcl").text("任务取消");
                        activeIndex = 1;
                        step2Str = "已处理（任务取消）";
                        $(".jczc .btnGroup2").remove();

                        $("#cgName").text(reimbursementInfo.vehicleCompleteName);
                        $("#cg_je,#cgclyj").attr("disabled","disabled");
                        $("#cg_je").val(2);

                        $(".ddHide").show();
                        $(".ddtime").hide();
                        $(".cgclyjBox").show();
                        $("#cgclyj").val(reimbursementInfo.remark);

                        $(".time").show();
                        $(".cgDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        var isDD = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDispatch"){
                                isDD = true;
                            };
                        }

                        if(isDD&&reimbursementInfo.dispatchName==null){
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .ddqrBtn").show();
                            $(".ddHide .submit2ddQrBtn").click(function(_event){
                                console.log($("#ddqr").val());
                                    $.ajax(postOldCarUrl,{
                                        data:JSON.stringify({id:id,isDispatch:2,dispatchName:userInfo.name,dispatchTime:parseInt(new Date().getTime()/1000),dispatchId:userJob.filter(function(_item,_index,_array){return _item.role == "accidentDispatch"})[0].userId}),
                                        type:"POST",
                                        contentType:"application/json",
                                        processData:false,
                                        success:function(_data) {
                                            console.log(_data);
                                            if(_data.code==0){
                                                publicObj.openDingdingPopup("调度确认成功",null,null,function(){
                                                    publicObj.goBack();
                                                });
                                            }
                                        },
                                        error:function(_error){
                                            clickAble = true;
                                        }
                                    })
                            });
                        }else if(reimbursementInfo.dispatchName!=null){
                            $("#ddName").text(reimbursementInfo.dispatchName);
                            $(".ddtime").show();
                            $(".ddDetailedTime").text(new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                        }else{
                            $(".ddHide .btnGroup2").remove();
                            $("#ddqr").attr("disabled","true");
                            $("#ddName").text(reimbursementInfo.dispatchName==null?"暂无调度确认":userInfo.name);
                            $(".ddDetailedTime").text(reimbursementInfo.dispatchName==null?" ":new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                            if(reimbursementInfo.dispatchName!=null){
                                console.log("调度已经确认");
                                $("#ddqr").val(1);
                                $(".ddtime").show();
                            }
                        }
                        break;
                    case 4:
                        $("#reimState").text("任务继续");

                        $(".jczc").show();
                        $("#jczc_cgcl").text("任务继续");
                        activeIndex = 1;
                        step2Str = "已处理（任务继续）";
                        $(".jczc .btnGroup2").remove();
                        $("#cgName").text(reimbursementInfo.vehicleCompleteName);
                        $("#cg_je").attr("disabled","disabled");
                        $("#cg_je").val(1);

                        $(".time").show();
                        $(".cgDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        break;
                    case 5:
                        $("#reimState").text("已完成");
                        activeIndex = 2;
                        $(".btn_look").remove();
                        $(".zcjtsg .add").remove();
                        $("#ddName").text(reimbursementInfo.dispatchName);
                        $(".ddHide .btnGroup2").remove();

                        var isSG = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDriver"||userJob[i].role == "accidentObservation"){
                                isSG = true;
                            };
                        }

                        if(isSG){
                            $(".feedbackFormOld").show();

                            var ztssje;
                            ztssje = parseFloat(tableInfo.customerMoney) + parseFloat(tableInfo.ourMoney) + parseFloat(tableInfo.otherMoney) + parseFloat(tableInfo.peopleMoney);

                            $("#ztssjeOld").text(ztssje!=ztssje?"无法计算":ztssje);
                            $("#gsssjeOld").text(tableInfo.companyLostMonkey);
                            $("#kpiOld").text(tableInfo.kpi);
                            $("#jscfjeOld").text(tableInfo.techniciansPunishmentMonkey);
                            $("#jscdjeOld").text(tableInfo.jscdje);
                            $("#bxmpjeOld").text(tableInfo.insuranceDeductibleAmount);

                        }


                        break;
                }
                //根据角色初始化内容
                var isYwyOrCg = false;
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentManage"){
                        isYwyOrCg = true;
                    };
                }
                console.log(isYwyOrCg);
                if(isYwyOrCg){
                    getUserPhone(reimbursementInfo.driverId,initCallPhone);
                }


                publicObj.step({
                    data:[
                        { title: "未处理", description: "" },
                        { title: step2Str, description: "" },
                        { title: "已完成", description: "" },
                    ],
                    elem:"#steps",
                    active:activeIndex,
                });

                //根据业务员或技师添加照片
                var isYwyOrGs = false;
                console.log(userJob);
                for(var i in userJob){
                    if(userJob[i].role == "accidentManage"||userJob[i].role == "accidentDriver"){
                        isYwyOrGs = true;
                    };
                }
                console.log(isYwyOrGs);
                if(isYwyOrGs){
                    $(".btn_look").off();
                    $(".sgqjzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".sgqjzbox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".ssbwzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".ssbwzbox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".btn_look").click(function(_event){

                        var imgArray1 = [];
                        console.log($(".sgqjzbox .photoBox .photo1 img"));
                        $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                            imgArray1.push($(this).attr("src"));
                        });

                        var imgArray2 = [];
                        console.log($(".ssbwzbox .photoBox .photo1 img"));
                        $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                            imgArray2.push($(this).attr("src"));
                        });
                        $.ajax(postOldCarUrl,{
                            data:JSON.stringify({id:id,image:JSON.stringify(imgArray1),damage:JSON.stringify(imgArray2)}),
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("照片修改成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        });
                    });
                }else{
                    $(".btn_look").remove();
                    $(".zcjtsg .add").remove();
                }

                $(".time").show();
                $(".detailedTime").text(new Date(reimbursementInfo.addTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $(".reimbursementType span").text('旧车装卸事故');

                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);

                $(".zcjtsg").show();
                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);

                $(".zcjtsg .zcjtsg").remove();

                //事故全景照
                var jsonObj = JSON.parse(reimbursementInfo.image);

                for(var i in jsonObj){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".sgqjzbox .photoBox").prepend($dom);
                }

                //    受损部位照
                var jsonObj2 = JSON.parse(reimbursementInfo.damage);

                for(var j in jsonObj2){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj2[j]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".ssbwzbox .photoBox").prepend($dom);
                }

            };

            //自车交通事故页面渲染
            this.initZCJTSGPageView = function(){
                var step2Str = "已处理";
                var activeIndex = 0;
                switch(type){
                    case 1:
                        $("#reimState").text("待处理");
                        activeIndex = 0;


                        //判断是否为车管，车管则显示车管处理框
                        var isCg = false;
                        for(var j in userJob){
                            if(userJob[j].role == "accidentManage"){
                                isCg = true;
                            };
                        }

                        if(isCg){
                            $(".jczc").show();
                            $("#cgName").text(userInfo.name);
                        }

                        //车管处理方式点击事件
                        $("#cg_je").change(function(_event){
                            var _$this = $(this);
                            switch(_$this.val()){
                                case "1":
                                    $(".cgclyjBox").hide();
                                    break;
                                case "2":
                                    $(".cgclyjBox").show();
                                    break;
                            }
                        });

                        //车管提交
                        $(".submitCgClBtn").click(function(_event){
                            console.log("选择了提交");
                            if(($("#cg_je").val()=="2"&&$("#cgclyj").val().length>0)||$("#cg_je").val()=="1"){
                                var state;
                                switch($("#cg_je").val()){
                                    case "1":
                                        state = 4;
                                        break;
                                    case "2":
                                        state = 2;
                                        break;
                                }
                                var dataStr = JSON.stringify({id:id,start:state,vehicleHandleTime:parseInt(new Date().getTime()/1000),remark:$("#cgclyj").val(),vehicleCompleteId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentManage"})[0].userId,vehicleCompleteName:userInfo.name});
                                $.ajax(postSelfTestUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {

                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                })
                            }else{
                                publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                            }
                        });

                        break;
                    case 2:
                        $("#reimState").text("任务取消");

                        $(".jczc").show();
                        $("#jczc_cgcl").text("任务取消");
                        activeIndex = 1;
                        step2Str = "已处理（任务取消）";
                        $(".jczc .btnGroup2").remove();

                        $("#cgName").text(reimbursementInfo.vehicleCompleteName);
                        $("#cg_je,#cgclyj").attr("disabled","disabled");
                        $("#cg_je").val(2);

                        $(".ddHide").show();
                        $(".cgclyjBox").show();
                        $("#cgclyj").val(reimbursementInfo.remark);

                        $(".time").show();
                        $(".cgDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        $(".ddtime").hide();

                        var isDD = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDispatch"){
                                isDD = true;
                            };
                        }
                        if(isDD&&reimbursementInfo.dispatchName==null){
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .ddqrBtn").show();
                            $(".ddHide .submit2ddQrBtn").click(function(_event){
                                console.log($("#ddqr").val());
                                    $.ajax(postSelfTestUrl,{
                                        data:JSON.stringify({id:id,isDispatch:2,dispatchTime:parseInt(new Date().getTime()/1000),dispatchName:userInfo.name,dispatchId:userJob.filter(function(_item,_index,_array){return _item.role == "accidentDispatch"})[0].userId}),
                                        type:"POST",
                                        contentType:"application/json",
                                        processData:false,
                                        success:function(_data) {
                                            console.log(_data);
                                            if(_data.code==0){
                                                publicObj.openDingdingPopup("调度确认成功",null,null,function(){
                                                    publicObj.goBack();
                                                });
                                            }
                                        },
                                        error:function(_error){
                                            clickAble = true;
                                        }
                                    })
                            });
                        }else if(reimbursementInfo.dispatchName!=null){
                            $("#ddName").text(reimbursementInfo.dispatchName);
                            $(".ddtime").show();
                            $(".ddDetailedTime").text(new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                        }else{
                            $(".ddHide .btnGroup2").remove();
                            $("#ddqr").attr("disabled","true");
                            $("#ddName").text(reimbursementInfo.dispatchName==null?"暂无调度确认":userInfo.name);

                            $(".ddDetailedTime").text(reimbursementInfo.dispatchName==null?" ":new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                            if(reimbursementInfo.dispatchName!=null){
                                console.log("调度已经确认");
                                $("#ddqr").val(1);
                                $(".ddtime").show();
                            }
                        }


                        break;
                    case 4:
                        $("#reimState").text("任务继续");

                        $(".jczc").show();
                        $("#jczc_cgcl").text("任务继续");
                        activeIndex = 1;
                        step2Str = "已处理（任务继续）";
                        $(".jczc .btnGroup2").remove();
                        $("#cgName").text(reimbursementInfo.vehicleCompleteName);
                        $("#cg_je").attr("disabled","disabled");
                        $("#cg_je").val(1);

                        $(".time").show();
                        $(".cgDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        break;
                    case 5:
                        $("#reimState").text("已完成");
                        activeIndex = 2;
                        $(".btn_look").remove();
                        $(".zcjtsg .add").remove();

                        $("#ddName").text(reimbursementInfo.dispatchName);

                        var isSG = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDriver"||userJob[i].role == "accidentObservation"){
                                isSG = true;
                            };
                        }

                        if(isSG){
                            $(".feedbackFormSelf").show();

                            console.log(tableInfo.place);
                            console.log($("#jjzrpdSelf"));
                            // tableInfo

                            $("#jjzrpdSelf").text(tableInfo.place);
                            console.log();

                            var ztssje;
                            ztssje = parseFloat(tableInfo.companyTechnician) + parseFloat(tableInfo.customerVehiclesDamage) + parseFloat(tableInfo.injured) + parseFloat(tableInfo.customerMoney);
                            // ztssjes == NaN

                            $("#ztssjeSelf").text(ztssje!=ztssje?"无法计算":ztssje);
                            $("#gsssjeSelf").text(tableInfo.gsssje);
                            $("#kpiSelf").text(tableInfo.kpi);
                            $("#jscfjeSelf").text(tableInfo.ourMoney);
                            $("#jspfjeSelf").text(tableInfo.otherMoney);

                        }


                        break;
                }
                //根据角色初始化内容
                var isYwyOrCg = false;
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentManage"){
                        isYwyOrCg = true;
                    };
                }

                if(isYwyOrCg){
                    getUserPhone(reimbursementInfo.driverId,initCallPhone);
                }
                console.log(reimbursementInfo);

                publicObj.step({
                    data:[
                        { title: "未处理", description: "" },
                        { title: step2Str, description: "" },
                        { title: "已完成", description: "" },
                    ],
                    elem:"#steps",
                    active:activeIndex,
                });

                //根据业务员或技师添加照片
                var isYwyOrGs = false;
                console.log(userJob);
                for(var i in userJob){
                    if(userJob[i].role == "accidentManage"||userJob[i].role == "accidentDriver"){
                        isYwyOrGs = true;
                    };
                }
                console.log(isYwyOrGs);
                if(isYwyOrGs){
                    $(".btn_look").off();
                    $(".sgqjzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".sgqjzbox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".ssbwzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".ssbwzbox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".btn_look").click(function(_event){

                        var imgArray1 = [];
                        console.log($(".sgqjzbox .photoBox .photo1 img"));
                        $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                            imgArray1.push($(this).attr("src"));
                        });

                        var imgArray2 = [];
                        console.log($(".ssbwzbox .photoBox .photo1 img"));
                        $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                            imgArray2.push($(this).attr("src"));
                        });
                        $.ajax(postSelfTestUrl,{
                            data:JSON.stringify({id:id,image:JSON.stringify(imgArray1),damage:JSON.stringify(imgArray2)}),
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("照片修改成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        });
                    });
                }else{
                    $(".btn_look").remove();
                    $(".zcjtsg .add").remove();
                }

                $(".time").show();
                $(".detailedTime").text(new Date(reimbursementInfo.addTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $(".reimbursementType span").text('自车交通事故');

                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);

                $(".zcjtsg").show();
                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);

                $(".zcjtsg .zcjtsg").remove();

                //事故全景照
                var jsonObj = JSON.parse(reimbursementInfo.image);

                for(var i in jsonObj){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".sgqjzbox .photoBox").prepend($dom);
                }

            //    受损部位照
                var jsonObj2 = JSON.parse(reimbursementInfo.damage);

                for(var j in jsonObj2){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj2[j]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".ssbwzbox .photoBox").prepend($dom);
                }
            };

            //新车检查事故页面渲染，该内容取消
            this.initXCJCSGPageView = function(){
                $(".xcjcsg").show();
                var step2Str = "已处理";
                var activeIndex = 0;

                switch(type){
                    case 1:
                        activeIndex = 0;
                        $("#reimState").text("未处理");
                        var isYwy = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentSalesman"){
                                isYwy = true;
                            };
                        }
                        if(isYwy){
                            $(".ywy2Hide").show();
                        }else{
                            $(".ywy2Hide").hide();
                        }

                        //业务员姓名填入
                        $("#ywyName").text(userInfo.name);
                        console.log(userJob);
                        // console.log(userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesman"})[0].userId);

                        //业务员提交点击事件
                        $(".submit2YwyBtn").click(function(_event){
                            console.log($("#Salesman_je").val()==null);
                            dd.device.notification.showPreloader({
                                text: "加载中..", //loading显示的字符，空表示不显示文字
                                showIcon: true, //是否显示icon，默认true
                                onSuccess : function(result) {
                                    /*{}*/
                                },
                                onFail : function(err) {}
                            });

                            if($("#Salesman2_je").val()!=null&&$("#Suggest2").val().length>0){
                                $(".submit2YwyBtn").off();
                                var state;
                                switch($("#Salesman2_je").val()){
                                    case "1":
                                        state = 4;
                                        break;
                                    case "2":
                                        state = 9;
                                        break;
                                }
                                var dataStr = JSON.stringify({id:id,start:state,remark:$("#Suggest2").val(),salesmanId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesman"})[0].userId,salesmanName:userInfo.name});
                                $.ajax(postNewCarCheckUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    },
                                    complete: function() {
                                        dd.device.notification.hidePreloader({
                                            onSuccess : function(result) {
                                                /*{}*/
                                            },
                                            onFail : function(err) {}
                                        })
                                    }
                                })
                            }else{
                                publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                            }
                        });
                        break;
                    case 5:
                        activeIndex = 2;
                        $("#reimState").text("已完成");
                        $(".xcjcwtfk .add").remove();
                        $(".btn_look").remove();
                        break;
                    case 4:
                        step2Str = "已处理（任务继续）";
                        activeIndex = 1;
                        $("#reimState").text("任务继续");
                        $("#Salesman2_je>option").removeAttr("selected");
                        $("#Salesman2_je>option:contains('任务继续')").attr("selected",true);
                        $(".ywy2Hide>.btnGroup2").remove();
                        $("#Salesman2_je").attr("disabled","disabled");
                        $("#Salesman2_je").val(1);
                        $("#Suggest2").attr("readonly","readonly");
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#ywyName").text(reimbursementInfo.salesmanName);

                        break;
                    case 9:
                        step2Str = "已处理（任务取消）";
                        activeIndex = 1;
                        $("#reimState").text("任务取消");
                        // $("#Salesman2_je>option:contains('任务取消')").attr("selected",true);
                        $("#Salesman2_je").val(2);
                        $(".ywy2Hide>.btnGroup2").remove();
                        $("#Salesman2_je").attr("disabled","disabled");
                        $("#Suggest2").attr("readonly","readonly");
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#ywyName").text(reimbursementInfo.salesmanName);
                        $(".ddHide").show();
                        console.log(reimbursementInfo);
                        var isDD = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDispatch"){
                                isDD = true;
                            };
                        }
                        if(isDD){
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .submit2ddQrBtn").click(function(_event){
                                console.log($("#ddqr").val());
                                if($("#ddqr").val()=="kong"||$("#ddqr").val()==null){
                                    publicObj.openDingdingPopup("请选择确认后再提交");
                                }else{
                                    $.ajax(postProblemUrl,{
                                        data:JSON.stringify({id:id,isDispatch:2,dispatchName:userInfo.name,dispatchName:userJob.filter(function(_item,_index,_array){return _item.role == "accidentDispatch"})[0].userId}),
                                        type:"POST",
                                        contentType:"application/json",
                                        processData:false,
                                        success:function(_data) {
                                            console.log(_data);
                                            if(_data.code==0){
                                                publicObj.openDingdingPopup("调度确认成功",null,null,function(){
                                                    publicObj.goBack();
                                                });
                                            }
                                        },
                                        error:function(_error){
                                            clickAble = true;
                                        }
                                    })
                                }
                            });
                        }else{
                            $(".ddHide .btnGroup2").remove();
                            $("#ddqr").attr("disabled","true");
                            $("#ddName").text(reimbursementInfo.dispatchName==null?"暂未确认":userInfo.name);

                        }


                        break;
                }

                console.log(reimbursementInfo);

                //根据角色初始化内容
                var isYwyOrCg = false;
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentManage"){
                        isYwyOrCg = true;
                    };
                }

                if(isYwyOrCg){
                    getUserPhone(reimbursementInfo.driverId,initCallPhone);
                }

                publicObj.step({
                    data:[
                        { title: "未处理", description: "" },
                        { title: step2Str, description: "" },
                        { title: "已完成", description: "" },
                    ],
                    elem:"#steps",
                    active:activeIndex,
                });

                //根据业务员或技师添加照片
                var isYwyOrGs = false;
                console.log(userJob);
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentDriver"){
                        isYwyOrGs = true;
                    };
                }
                console.log(isYwyOrGs);
                if(isYwyOrGs){
                    $(".btn_look").off();
                    $(".xcjcsgxccjhBox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".xcjcsgxccjhBox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".zczBox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".zczBox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".ssbwzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".ssbwzbox .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".btn_look").click(function(_event){

                        var imgArray = [];
                        console.log($(".xcjcwtfk .photoBox .photo1 img"));
                        $(".xcjcwtfk .photoBox .photo1 img").each(function(_i){
                            imgArray.push($(this).attr("src"));
                        });
                        $.ajax(postNewCarCheckUrl,{
                            data:JSON.stringify({id:id,image:JSON.stringify(imgArray)}),
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("照片修改成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        });
                    });
                }else{
                    $(".btn_look").remove();
                    $(".xcjcwtfk .add").remove();
                }


                $(".khdw").show();
                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $(".reimbursementType span").text('新车检查事故');
                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);

                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);

                $(".xcjcsg .xcjcsg").remove();

                $(".submitYwyBtn").click(function(_event){
                    console.log($("#Salesman_je").val()==null);
                    if($("#Salesman_je").val()!=null&&$("#Suggest").val().length>0){
                        var state;
                        switch($("#Salesman_je").val()){
                            case "1":
                                state = 6;
                                break;
                            case "2":
                                state = 7;
                                break;
                            case "3":
                                state = 8;
                                break;
                        }
                        var dataStr = JSON.stringify({id:id,start:state,remark:$("#Suggest").val()});
                        $.ajax(postNewCarCheckUrl,{
                            data:dataStr,
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        })
                    }else{
                        publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                    }
                });

                var jsonObj1 = JSON.parse(reimbursementInfo.frame);

                for(var i in jsonObj1){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj1[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".xcjcsgxccjhBox .photoBox").prepend($dom);
                }

                var jsonObj2 = JSON.parse(reimbursementInfo.vehicle);

                for(var j in jsonObj2){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj2[j]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".zczBox .photoBox").prepend($dom);
                }

                var jsonObj3 = JSON.parse(reimbursementInfo.damage);

                for(var k in jsonObj3){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj3[k]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".xcjcsgBox .photoBox").prepend($dom);
                }

            };

            //新车检查装卸事故
            this.initXCZXSGPageView = function(){
                $(".xcjczxsg").show();
                var step2Str = "已处理";
                var activeIndex = 0;
                switch(type){
                    case 1:
                        $("#reimState").text("未处理");
                        var isYwy = false;
                        for(var i in userJob){
                            console.log(userJob[i].role);
                            if(userJob[i].role == "accidentSalesmanNewCarCheck"){
                                isYwy = true;
                            };
                        }
                        if(isYwy){
                            switch(reimbursementInfo.accidentPlace){
                                case "2":
                                case "3":
                                    $(".ywy2Hide").show();
                                    $("#ywyName").text(userInfo.name);

                                    //业务员的处理意见
                                    $("#Salesman2_je").change(function(_event){
                                        var _$this = $(this);
                                        switch(_$this.val()){
                                            case "1":
                                                $(".ywy2Hide .clyjHide").hide();
                                                break;
                                            case "2":
                                                $(".ywy2Hide .clyjHide").show();
                                                break;
                                        }
                                    });
                                    //业务员
                                    $(".ywy2Hide .submit2YwyBtn").click(function(_event){

                                        if(($("#Salesman2_je").val()=="2"&&$("#Suggest2").val().length>0)||$("#Salesman2_je").val()=="1"){
                                            $(".ywy2Hide .submit2YwyBtn").off();
                                            var state;
                                            switch($("#Salesman2_je").val()){
                                                case "1":
                                                    state = 4;
                                                    break;
                                                case "2":
                                                    state = 2;
                                                    break;
                                            }

                                            var dataStr = JSON.stringify({id:id,start:state,vehicleHandleTime:parseInt(new Date().getTime()/1000),remark:$("#Suggest2").val(),salesmanId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesmanNewCarCheck"})[0].userId,salesmanName:userInfo.name});
                                            $.ajax(postNewCarHandingUrl,{
                                                data:dataStr,
                                                type:"POST",
                                                contentType:"application/json",
                                                processData:false,
                                                success:function(_data) {
                                                    console.log(_data);
                                                    if(_data.code==0){
                                                        publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                            publicObj.goBack();
                                                        });
                                                    }
                                                },
                                                error:function(_error){
                                                    clickAble = true;
                                                }
                                            })

                                        }else{
                                            publicObj.openDingdingPopup("请选择处理状态并填写处理意见");
                                        }
                                    });
                                    break;
                                case "1":
                                    $(".ywy3Hide").show();
                                    $("#ywy3Name").text(userInfo.name);
                                    $(".ywy3Hide .clyjHide").show();
                                    //业务员
                                    $(".ywy3Hide .submit2YwyBtn").click(function(_event){
                                        if($("#Suggest3").val().length>0&&($("#ywy3clzt").val()=="3"||$("#ywy3clzt").val()=="4")){
                                            var state;
                                            switch($("#ywy3clzt").val()){
                                                case "3":
                                                    state = 10;
                                                    break;
                                                case "4":
                                                    state = 11;
                                                    break;
                                            }


                                            var dataStr = JSON.stringify({id:id,start:state,vehicleHandleTime:parseInt(new Date().getTime()/1000),remark:$("#Suggest3").val(),salesmanId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesmanNewCarCheck"})[0].userId,salesmanName:userInfo.name});
                                            console.log(dataStr);
                                            $.ajax(postNewCarHandingUrl,{
                                                data:dataStr,
                                                type:"POST",
                                                contentType:"application/json",
                                                processData:false,
                                                success:function(_data) {
                                                    console.log(_data);
                                                    if(_data.code==0){
                                                        publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                            publicObj.goBack();
                                                        });
                                                    }
                                                },
                                                error:function(_error){
                                                    clickAble = true;
                                                }
                                            })

                                        }else{
                                            publicObj.openDingdingPopup("请选择处理状态并填写处理意见");
                                        }
                                    });
                                    break;
                            }
                        }else{
                            $(".ywy2Hide").remove();
                            $(".ywy3Hide").remove();
                        }

                        break;
                    case 2:
                        step2Str = "已处理(任务取消)";
                        activeIndex = 1;

                        $(".ywy2Hide").show();
                        $("#ywyName").text(reimbursementInfo.salesmanName);
                        $("#Salesman2_je").val(2);
                        $("#Salesman2_je").attr("disabled","disabled");
                        $(".ywy2Hide .clyjHide").show();
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#Suggest2").attr("disabled","disabled");
                        $(".ywy2Hide .submit2YwyBtn").remove();

                        $(".ddHide").show();
                        $(".ddtime").hide();


                        var isDD = false;
                        for(var k in userJob){
                            if(userJob[k].role == "accidentDispatchNewCarCheck"){
                                isDD = true;
                            }
                        }

                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        //意见有调度确认过了
                        if(reimbursementInfo.dispatchName){
                            $("#ddName").text(reimbursementInfo.dispatchName);
                            $(".ddtime").show();  //  时间logo显示
                            $(".ddDetailedTime").text(new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));  //  调度处理时间填入
                            $("#ddqr").val(1);
                            $("#ddqr").attr("disabled","disabled");
                            $(".ddHide .submit2ddQrBtn").hide();
                        }else if(isDD){ //没有调度确认，但是查看人是调度
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .ddqrBtn").show();
                            $(".ddHide .submit2ddQrBtn").click(function(_event){

                                dd.device.notification.showPreloader({
                                    text: "加载中..", //loading显示的字符，空表示不显示文字
                                    showIcon: true, //是否显示icon，默认true
                                    onSuccess : function(result) {
                                        /*{}*/
                                    },
                                    onFail : function(err) {}
                                });

                                var dataStr = JSON.stringify({id:id,dispatchName:userInfo.name,dispatchTime:parseInt(new Date().getTime()/1000),isDispatch:2,dispatchId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentDispatchNewCarCheck"})[0].userId});
                                $.ajax(postNewCarHandingUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    },
                                    complete: function() {
                                        dd.device.notification.hidePreloader({
                                            onSuccess : function(result) {
                                                /*{}*/
                                            },
                                            onFail : function(err) {}
                                        })
                                    }
                                })
                            });
                        }else{ //没有调度确认，查看人也不是调度
                            $("#ddName").text("暂无调度确认！");
                            $("#ddqr").attr("disabled","disabled");
                            $(".ddHide .submit2ddQrBtn").hide();
                            $(".ddtime").hide();
                        }

                        break;
                    case 4:
                        step2Str = "已处理(任务继续)";
                        activeIndex = 1;

                        $(".ywy2Hide").show();
                        $("#ywyName").text(reimbursementInfo.salesmanName);
                        $("#Salesman2_je").val(1);
                        $("#Salesman2_je").attr("disabled","disabled");
                        $(".ywy2Hide .submit2YwyBtn").remove();
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#Suggest2").attr("disabled","disabled");
                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        break;
                    case 5:
                        step2Str = "已完成";
                        activeIndex = 2;
                        $(".btn_look").remove();
                        $(".xcjczxsg .add").remove();

                        var isSG = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDriverNewCarCheck"||userJob[i].role == "accidentObservationNewCarCheck"){
                                isSG = true;
                            };
                        }

                        if(isSG){
                            $(".feedbackFormNew").show();

                            var ztssje;
                            ztssje = parseFloat(tableInfo.customerMoney) + parseFloat(tableInfo.otherMoney) + parseFloat(tableInfo.depreciationExpenses);

                            $("#ztssjeNew").text(ztssje!=ztssje?"无法计算":ztssje);
                            $("#gsssjeNew").text(tableInfo.companyLostMonkey);
                            $("#kpiNew").text(tableInfo.kpi);
                            $("#jscfjeNew").text(tableInfo.techniciansPunishmentMonkey);
                            $("#jscdblNew").text(tableInfo.techniciansRatio);
                            $("#jspfjeNew").text(tableInfo.techniciansMonkey);
                            $("#bxmpjeNew").text(tableInfo.insuranceDeductibleAmount);

                        }

                        break;
                    case 10:
                        step2Str = "已处理(事故车拖回)";
                        activeIndex = 1;
                        $(".ywy3Hide").show();
                        $("#ywy3Name").text(reimbursementInfo.salesmanName);
                        $("#ywy3clzt").val(3);
                        $("#ywy3clzt").attr("disabled","disabled");
                        $(".ywy2Hide .submit2YwyBtn").remove();
                        $("#Suggest3").val(reimbursementInfo.remark).attr("disabled","disabled");
                        $(".ywy3Hide .clyjHide").show();
                        $(".ywy3Hide .submit2YwyBtn").remove();

                        $(".ddHide").show();
                        $(".ddtime").hide();

                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        var isDD = false;
                        for(var k in userJob){
                            if(userJob[k].role == "accidentDispatchNewCarCheck"){
                                isDD = true;
                            }
                        }

                        //意见有调度确认过了
                        if(reimbursementInfo.dispatchName){
                            $("#ddName").text(reimbursementInfo.dispatchName);
                            $("#ddqr").val(1);
                            $(".ddtime").show();  //  时间logo显示
                            $(".ddDetailedTime").text(new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));  //  调度处理时间填入

                            $("#ddqr").attr("disabled","disabled");
                            $(".ddHide .submit2ddQrBtn").hide();
                        }else if(isDD){ //没有调度确认，但是查看人是调度
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .ddqrBtn").show();
                            $(".ddHide .submit2ddQrBtn").click(function(_event){
                                var dataStr = JSON.stringify({id:id,isDispatch:2,dispatchName:userInfo.name,dispatchTime:parseInt(new Date().getTime()/1000),dispatchId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentDispatchNewCarCheck"})[0].userId});
                                $.ajax(postNewCarHandingUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                })
                            });
                        }else{ //没有调度确认，查看人也不是调度
                            $("#ddName").text("暂无调度确认！");
                            $("#ddqr").attr("disabled","disabled");
                            $(".ddHide .submit2ddQrBtn").hide();
                            $(".ddtime").hide();
                        }

                        break;
                    case 11:
                        step2Str = "已处理(事故车留存)";
                        activeIndex = 1;
                        $(".ywy3Hide").show();
                        $("#ywy3Name").text(reimbursementInfo.salesmanName);
                        $("#ywy3clzt").val(4);
                        $("#ywy3clzt").attr("disabled","disabled");
                        $(".ywy2Hide .submit2YwyBtn").remove();
                        $("#Suggest3").val(reimbursementInfo.remark).attr("disabled","disabled");
                        $(".ywy3Hide .clyjHide").show();
                        $(".ywy3Hide .submit2YwyBtn").remove();
                        console.log("留存");
                        $(".ddHide").remove();

                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        break;
                }

                publicObj.step({
                    data:[
                        { title: "未处理", description: "" },
                        { title: step2Str, description: "" },
                        { title: "已完成", description: "" },
                    ],
                    elem:"#steps",
                    active:activeIndex,
                });

                //根据业务员和车管显示拨号
                var isYwyOrCg = false;
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesmanNewCarCheck"||userJob[i].role == "accidentManageNewCarCheck"){
                        isYwyOrCg = true;
                    };
                }
                if(isYwyOrCg){
                    getUserPhone(reimbursementInfo.driverId,initCallPhone);
                }
                //根据业务员或技师添加照片
                var isYwyOrGs = false;
                console.log(userJob);
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesmanNewCarCheck"||userJob[i].role == "accidentDriverNewCarCheck"){
                        isYwyOrGs = true;
                    };
                }
                console.log(isYwyOrGs);

                if(isYwyOrGs){
                    $(".submitBtn").off();
                    $(".btn_look").off();
                    $(".xcjcsgxccjhBox .add").off();
                    $(".sgqjzbox .add").off();
                    $(".ssbwzbox .add").off();
                    $(".btn_look").remove();

                    $(".xcjcsgxccjhBox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".xcjcsgxccjhBox .photoBox").prepend($thisImg);

                                var imgArray1 = [];
                                console.log($(".xcjcsgxccjhBox .photoBox .photo1 img"));
                                $(".xcjcsgxccjhBox .photoBox .photo1 img").each(function(_i){
                                    imgArray1.push($(this).attr("src"));
                                });

                                var imgArray2 = [];
                                console.log($(".sgqjzbox .photoBox .photo1 img"));
                                $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray2.push($(this).attr("src"));
                                });

                                var imgArray3 = [];
                                console.log($(".ssbwzbox .photoBox .photo1 img"));
                                $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray3.push($(this).attr("src"));
                                });
                                console.log({id:id,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2),damage:JSON.stringify(imgArray3)});
                                $.ajax(postNewCarHandingUrl,{
                                    data:JSON.stringify({id:id,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2),damage:JSON.stringify(imgArray3)}),
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            dd.device.notification.toast({
                                                icon: '', //icon样式，有success和error，默认为空
                                                text: "照片修改成功", //提示信息
                                                duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                                                delay: Number, //延迟显示，单位秒，默认0
                                                onSuccess : function(result) {
                                                    /*{}*/
                                                },
                                                onFail : function(err) {}
                                            })
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                });
                            }
                        });
                    });
                    $(".sgqjzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".sgqjzbox .photoBox").prepend($thisImg);

                                var imgArray1 = [];
                                console.log($(".xcjcsgxccjhBox .photoBox .photo1 img"));
                                $(".xcjcsgxccjhBox .photoBox .photo1 img").each(function(_i){
                                    imgArray1.push($(this).attr("src"));
                                });

                                var imgArray2 = [];
                                console.log($(".sgqjzbox .photoBox .photo1 img"));
                                $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray2.push($(this).attr("src"));
                                });

                                var imgArray3 = [];
                                console.log($(".ssbwzbox .photoBox .photo1 img"));
                                $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray3.push($(this).attr("src"));
                                });

                                $.ajax(postNewCarHandingUrl,{
                                    data:JSON.stringify({id:id,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2),damage:JSON.stringify(imgArray3)}),
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            console.log("haha");
                                            dd.device.notification.toast({
                                                icon: '', //icon样式，有success和error，默认为空
                                                text: "照片修改成功", //提示信息
                                                duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                                                delay: Number, //延迟显示，单位秒，默认0
                                                onSuccess : function(result) {
                                                    /*{}*/
                                                },
                                                onFail : function(err) {}
                                            })
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                });
                            }
                        });
                    });
                    $(".ssbwzbox .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".ssbwzbox .photoBox").prepend($thisImg);

                                var imgArray1 = [];
                                console.log($(".xcjcsgxccjhBox .photoBox .photo1 img"));
                                $(".xcjcsgxccjhBox .photoBox .photo1 img").each(function(_i){
                                    imgArray1.push($(this).attr("src"));
                                });

                                var imgArray2 = [];
                                console.log($(".sgqjzbox .photoBox .photo1 img"));
                                $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray2.push($(this).attr("src"));
                                });

                                var imgArray3 = [];
                                console.log($(".ssbwzbox .photoBox .photo1 img"));
                                $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                                    imgArray3.push($(this).attr("src"));
                                });

                                $.ajax(postNewCarHandingUrl,{
                                    data:JSON.stringify({id:id,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2),damage:JSON.stringify(imgArray3)}),
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            dd.device.notification.toast({
                                                icon: '', //icon样式，有success和error，默认为空
                                                text: "照片修改成功", //提示信息
                                                duration: 2, //显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
                                                delay: Number, //延迟显示，单位秒，默认0
                                                onSuccess : function(result) {
                                                    /*{}*/
                                                },
                                                onFail : function(err) {}
                                            })
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    }
                                });
                            }
                        });
                    });
                    $(".btn_look").click(function(_event){

                        var imgArray1 = [];
                        console.log($(".xcjcsgxccjhBox .photoBox .photo1 img"));
                        $(".xcjcsgxccjhBox .photoBox .photo1 img").each(function(_i){
                            imgArray1.push($(this).attr("src"));
                        });

                        var imgArray2 = [];
                        console.log($(".sgqjzbox .photoBox .photo1 img"));
                        $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                            imgArray2.push($(this).attr("src"));
                        });

                        var imgArray3 = [];
                        console.log($(".ssbwzbox .photoBox .photo1 img"));
                        $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                            imgArray3.push($(this).attr("src"));
                        });

                        $.ajax(postNewCarHandingUrl,{
                            data:JSON.stringify({id:id,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2),damage:JSON.stringify(imgArray3)}),
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("照片修改成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        });
                    });
                }else{
                    $(".btn_look").remove();
                    $(".xcjczxsg .add").remove();
                }

                $("#sgfsd").attr("disabled","disabled");
                $("#sgfsd").val(reimbursementInfo.accidentPlace);

                $(".time").show();
                $(".detailedTime").text(new Date(reimbursementInfo.addTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                $(".khdw").show();
                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $(".reimbursementType span").text('新车检查装卸事故');
                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);

                $(".xcjczxsg .xcjczxsg").remove();

                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);

                $(".submitYwyBtn").click(function(_event){
                    console.log($("#Salesman_je").val()==null);
                    if($("#Salesman_je").val()!=null&&$("#Suggest").val().length>0){
                        var state;
                        switch($("#Salesman_je").val()){
                            case "1":
                                state = 6;
                                break;
                            case "2":
                                state = 7;
                                break;
                            case "3":
                                state = 8;
                                break;
                        }
                        var dataStr = JSON.stringify({id:id,start:state,remark:$("#Suggest").val()});
                        $.ajax(postNewCarHandingUrl,{
                            data:dataStr,
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        })
                    }else{
                        publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                    }
                });

                console.log(reimbursementInfo);

                var jsonObj1 = JSON.parse(reimbursementInfo.frame);
                for(var i in jsonObj1){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj1[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".xcjcsgxccjhBox .photoBox").prepend($dom);
                }

                var jsonObj2 = JSON.parse(reimbursementInfo.panorama);
                for(var j in jsonObj2){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj2[j]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".sgqjzbox .photoBox").prepend($dom);
                }

                var jsonObj3 = JSON.parse(reimbursementInfo.damage);
                for(var k in jsonObj3){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj3[k]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".ssbwzbox .photoBox").prepend($dom);
                }
            };

            //新车检查问题反馈
            this.initXCJCWTFKPageView = function(){
                $(".ywy2Hide").show();
                console.log(type);
                var step2Str = "已处理";
                var activeIndex = 0;
                switch(type){
                    case 1:
                        activeIndex = 0;
                        $("#reimState").text("未处理");
                        var isYwy = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentSalesman"){
                                isYwy = true;
                            };
                        }
                        if(isYwy){
                            $(".ywy2Hide,.ywy2Hide .clyjHide").show();
                        }else{
                            $(".ywy2Hide").hide();
                        }

                        //业务员姓名填入
                        $("#ywyName").text(userInfo.name);
                        console.log(userJob);
                        // console.log(userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesman"})[0].userId);

                        //业务员提交点击事件
                        $(".submit2YwyBtn").click(function(_event){
                            console.log($("#Salesman_je").val()==null);
                            dd.device.notification.showPreloader({
                                text: "加载中..", //loading显示的字符，空表示不显示文字
                                showIcon: true, //是否显示icon，默认true
                                onSuccess : function(result) {
                                    /*{}*/
                                },
                                onFail : function(err) {}
                            });

                            if($("#Salesman2_je").val()!=null&&$("#Suggest2").val().length>0){
                                $(".submit2YwyBtn").off();
                                var state;
                                switch($("#Salesman2_je").val()){
                                    case "1":
                                        state = 4;
                                        break;
                                    case "2":
                                        state = 9;
                                        break;
                                }
                                var dataStr = JSON.stringify({id:id,start:state,vehicleHandleTime:parseInt(new Date().getTime()/1000),remark:$("#Suggest2").val(),salesmanId:userJob.filter(function(_item,_index,_array){return _item.role=="accidentSalesman"})[0].userId,salesmanName:userInfo.name});
                                $.ajax(postProblemUrl,{
                                    data:dataStr,
                                    type:"POST",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data) {
                                        console.log(_data);
                                        if(_data.code==0){
                                            publicObj.openDingdingPopup("处理方式提交成功",null,null,function(){
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error:function(_error){
                                        clickAble = true;
                                    },
                                    complete: function() {
                                        dd.device.notification.hidePreloader({
                                            onSuccess : function(result) {
                                                /*{}*/
                                            },
                                            onFail : function(err) {}
                                        })
                                    }
                                })
                            }else{
                                publicObj.openDingdingPopup("请填选择处理方式并填写处理意见后提交");
                            }
                        });
                        break;
                    case 5:
                        activeIndex = 2;
                        $("#reimState").text("已完成");
                        $(".xcjcwtfk .add").remove();
                        $(".btn_look").remove();
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#Suggest2").attr("disabled","disabled");
                        // $(".ywy2Hide .clyjHide").show();
                        if(reimbursementInfo.dispatchName){

                            $(".ddHide,.ywy2Hide .clyjHide").show();
                            $("#ddName").text(reimbursementInfo.dispatchName);
                        }else{
                            $(".ddHide").hide();
                        }


                        $(".ywy2Hide .btnGroup2").hide();
                        $("#Salesman2_je").parent().hide();
                        $("#ywyName").text(reimbursementInfo.salesmanName);



                        break;
                    case 4:
                        step2Str = "已处理（任务继续）";
                        activeIndex = 1;
                        $("#reimState").text("任务继续");
                        $("#Salesman2_je>option").removeAttr("selected");
                        $("#Salesman2_je>option:contains('任务继续')").attr("selected",true);
                        $(".ywy2Hide>.btnGroup2").remove();
                        $("#Salesman2_je").attr("disabled","disabled");
                        $("#Salesman2_je").val(1);
                        console.log(reimbursementInfo.remark);
                        $("#Suggest2").attr("readonly","readonly");
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $(".ywy2Hide .clyjHide").show();
                        $("#ywyName").text(reimbursementInfo.salesmanName);
                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                        break;
                    case 9:
                        step2Str = "已处理（任务取消）";
                        activeIndex = 1;
                        $("#reimState").text("任务取消");
                        // $("#Salesman2_je>option:contains('任务取消')").attr("selected",true);
                        $("#Salesman2_je").val(2);
                        $(".ywy2Hide>.btnGroup2").remove();
                        $("#Salesman2_je").attr("disabled","disabled");
                        $("#Suggest2").attr("readonly","readonly");
                        console.log(reimbursementInfo);
                        $("#Suggest2").val(reimbursementInfo.remark);
                        $("#ywyName").text(reimbursementInfo.salesmanName);
                        $(".ddHide").show();
                        $(".ddTime").hide();
                        console.log(reimbursementInfo);
                        $(".ywy2Hide .clyjHide").show();
                        var isDD = false;
                        for(var i in userJob){
                            if(userJob[i].role == "accidentDispatch"){
                                isDD = true;
                            };
                        }
                        if(isDD&&reimbursementInfo.dispatchName==null){
                            $("#ddName").text(userInfo.name);
                            $(".ddHide .ddqrBtn").show();
                            $(".ddHide .submit2ddQrBtn").click(function(_event){
                                console.log($("#ddqr").val());
                                    $.ajax(postProblemUrl,{
                                        data:JSON.stringify({id:id,isDispatch:2,dispatchName:userInfo.name,dispatchTime:parseInt(new Date().getTime()/1000),dispatchId:userJob.filter(function(_item,_index,_array){return _item.role == "accidentDispatch"})[0].userId}),
                                        type:"POST",
                                        contentType:"application/json",
                                        processData:false,
                                        success:function(_data) {
                                            console.log(_data);
                                            if(_data.code==0){
                                                publicObj.openDingdingPopup("调度确认成功",null,null,function(){
                                                    publicObj.goBack();
                                                });
                                            }
                                        },
                                        error:function(_error){
                                            clickAble = true;
                                        }
                                    })
                            });
                        }else if(reimbursementInfo.dispatchName!=null){
                            $("#ddName").text(reimbursementInfo.dispatchName);
                            $(".ddtime").show();
                            $(".ddDetailedTime").text(new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                        }else{
                            $(".ddHide .btnGroup2").remove();
                            $("#ddqr").attr("disabled","true");
                            $("#ddName").text(reimbursementInfo.dispatchName==null?"暂未确认":userInfo.name);
                            $(".ddtime").show();
                            $(".ddDetailedTime").text(reimbursementInfo.dispatchName==null?" ":new Date(reimbursementInfo.dispatchTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                        }

                        $(".ywyDetailedTime").text(new Date(reimbursementInfo.vehicleHandleTime*1000).Format("yyyy年MM月dd日 hh:mm"));
                        break;
                }

                publicObj.step({
                    data:[
                        { title: "未处理", description: "" },
                        { title: step2Str, description: "" },
                        { title: "已完成", description: "" },
                    ],
                    elem:"#steps",
                    active:activeIndex,
                });
                //根据角色初始化内容
                var isYwyOrCg = false;
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentManage"){
                        isYwyOrCg = true;
                    };
                }

                if(isYwyOrCg){
                    getUserPhone(reimbursementInfo.driverId,initCallPhone);
                }

                //根据业务员车管或技师添加照片
                var isYwyOrGs = false;
                console.log(userJob);
                for(var i in userJob){
                    if(userJob[i].role == "accidentSalesman"||userJob[i].role == "accidentDriver"||userJob[i].role=="accidentManage"){
                        isYwyOrGs = true;
                    };
                }
                console.log(isYwyOrGs);
                if(isYwyOrGs&&type!=5){
                    $(".btn_look").off();
                    $(".xcjcwtfk .add").click(function(_event){
                        publicObj.uploadImage(function(_imgArray){
                            for(var i in _imgArray){
                                var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                                $thisImg.click(function(_event){
                                    var thisBtn = $(this);
                                    publicObj.actionSheet({
                                        title:"请选择图片操作",
                                        otherButtons:["查看大图","删除图片"],
                                        callback:function(_result){
                                            console.log(_result);
                                            switch(_result.buttonIndex){
                                                case 0:
                                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                                    break;
                                                case 1:
                                                    thisBtn.remove();
                                                    break;
                                            }
                                        }
                                    });
                                });
                                $(".xcjcwtfk .photoBox").prepend($thisImg);
                            }
                        });
                    });
                    $(".btn_look").click(function(_event){

                        var imgArray = [];
                        console.log($(".xcjcwtfk .photoBox .photo1 img"));
                        $(".xcjcwtfk .photoBox .photo1 img").each(function(_i){
                            imgArray.push($(this).attr("src"));
                        });
                        $.ajax(postProblemUrl,{
                            data:JSON.stringify({id:id,image:JSON.stringify(imgArray)}),
                            type:"POST",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                console.log(_data);
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("照片修改成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){
                                clickAble = true;
                            }
                        });
                    });
                }else{
                    $(".btn_look").remove();
                    $(".xcjcwtfk .add").remove();
                }

                if(reimbursementInfo.isDispatch==2){
                    $(".ddHide .btnGroup2").remove();
                    $("#ddqr").val();
                    $("#ddqr>option").removeAttr("selected");
                    $("#ddqr>option:contains('确认')").attr("selected",true);
                    $("#ddqr").attr("disabled","disabled");
                    $("#ddqr").val("1");
                }else{
                    $("#ddqr").val("未确认");
                }

                $(".time").show();
                $(".detailedTime").text(new Date(reimbursementInfo.addTime*1000).Format("yyyy年MM月dd日 hh:mm"));

                $(".khdw").show();
                $(".xcjcwtfk").show();
                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $(".reimbursementType span").text('新车检查问题反馈');

                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);
                // $(".photoBox>.add").remove();

                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);


                $(".xcjcwtfk .xccjh").remove();

                var jsonObj = JSON.parse(reimbursementInfo.image);

                for(var i in jsonObj){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".xcjcwtfk .photoBox").prepend($dom);
                }
            };

            //   待处理信息函数
            function process4(){
                $("#reimState").text("待处理");
                $(".reimbursementTip").text("事故已经申报，请及时处理");

                //填写用户信息
                publicObj.getUserInfo(null,function(_userInfo){
                    userInfo = _userInfo;
                    $("#dkqrr").text(userInfo.name);
                });

                //初始化申报单信息
                var time = new Date();
                time.setTime(reimbursementInfo.declarationTime*1000)
                $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
                $("#ddh").val(reimbursementInfo.orderNum);
                $("#ccsj").val(reimbursementInfo.plateNumber);
                $("#je").val(reimbursementInfo.remark);
                $("#je").attr("disabled","disabled");
                $("#je>option[value="+reimbursementInfo.remark+"]").attr("selected","selected");

                $("#sjName").text(reimbursementInfo.driverName);
                $(".type1Input").attr("readonly","");

                $("#sjName2").text(userInfo.name);


                var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
                for(var i in imgArray){
                    $(".invoice .photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                }

                $("#dksj").text(new Date().Format("yyyy-MM-dd hh:mm"));
                $("#dksj").parent().click(function(_event){
                    publicObj.datetimepicker(function(_result){
                        $("#dksj").text(_result.value);
                    })
                });

                $(".type4").show();
                $(".colorWarning").removeClass("colorWarning");

                $(".photoBox>.photo1").click(function(_event){
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });

                $(".confirm").click(function(_event){
                    if($("#dealMode").val().length>0&&$("#dealMode").val()=="事故已处理"){
                        $.ajax(updateOrSaveUrl,{
                            data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:6,financeUserId:userInfo.id,receivablesAccount:$("#dksj").text(),receivablesName:$("#dealMode").val(),receivablesTime:$("#dksj").attr("data-date")}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("事故已处理完成",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }else{
                        $.ajax(updateOrSaveUrl,{
                            data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:5,financeUserId:userInfo.id,receivablesAccount:$("#dksj").text(),receivablesName:$("#dealMode").val(),receivablesTime:$("#dksj").attr("data-date")}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("事故处理方式已提交",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }

                });

            }

            //   在处理信息函数
            function process5(){
                $("#reimState").text("正在处理");
                $(".reimbursementTip").text("事故正在处理中，请暂停车辆调度");

                //填写用户信息
                publicObj.getUserInfo(null,function(_userInfo){
                    userInfo = _userInfo;
                    $("#dkqrr").text(userInfo.name);
                });

                //初始化申报单信息
                var time = new Date();
                time.setTime(reimbursementInfo.declarationTime*1000)
                $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

                $("#ddh").val(reimbursementInfo.orderNum);
                $("#ccsj").val(reimbursementInfo.plateNumber);
                $("#je").val(reimbursementInfo.remark);
                $("#je>option[value="+reimbursementInfo.remark+"]").attr("selected","selected");
                $("#je").attr("disabled","disabled");

                $("#sjName").text(reimbursementInfo.driverName);
                $(".type1Input").attr("readonly","");

                $("#sjName2").text(reimbursementInfo.financeName);
                $("#dksj").text(reimbursementInfo.receivablesAccount);
                $("#dksj").parent().click(function(_event){
                    publicObj.datetimepicker(function(_result){
                        $("#dksj").text(_result.value);
                    })
                });

                $("#dealMode").val(reimbursementInfo.receivablesName);
                $("#dealMode>option[value="+reimbursementInfo.receivablesName+"]").attr("selected","selected");

                var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
                for(var i in imgArray){
                    $(".invoice .photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                }

                $(".type5").show();
                $(".colorWarning").removeClass("colorWarning");
                $("#je").attr("disabled",true);

                $(".photoBox>.photo1").click(function(_event){
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });

                $(".confirm").click(function(_event){

                    if($("#dealMode").val().length>0&&$("#dealMode").val()=="事故已处理"){
                        var encodeHtml = encodeURIComponent(publicObj.getAllHtml());
                        $.ajax(updateOrSaveUrl,{
                            data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:6,financeUserId:userInfo.id,receivablesAccount:$("#dksj").text(),receivablesName:$("#dealMode").val(),htmlBody:encodeHtml}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("事故已处理完成",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }else{
                        $.ajax(updateOrSaveUrl,{
                            data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:5,financeUserId:userInfo.id,receivablesAccount:$("#dksj").text(),receivablesName:$("#dealMode").val()}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("事故已处理方式已提交",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }

                });

            }

            //	已处理完事故函数
            function finishView(){
                $("#reimState").text("已处理");
                $(".reimbursementTip").text("事故已经处理完成，请恢复车辆调度");

                //填写用户信息
                publicObj.getUserInfo(null,function(_userInfo){
                    userInfo = _userInfo;
                });

                //初始化申报单信息
                $("#ddh").val(reimbursementInfo.orderNum);
                $("#ccsj").val(reimbursementInfo.plateNumber);
                $("#je").val(reimbursementInfo.remark);
                $("#je>option[value="+reimbursementInfo.remark+"]").attr("selected","selected");
                $("#je,#dealMode").attr("disabled","disabled");


                $("#sjName").text(reimbursementInfo.driverName);
                $(".type1Input").attr("readonly","");

                $("#sjName2").text(reimbursementInfo.financeName);
                $("#dksj").text(reimbursementInfo.receivablesAccount);

                $("#dealMode").val(reimbursementInfo.receivablesName);
                $("#dealMode>option[value="+reimbursementInfo.receivablesName+"]").attr("selected","selected");

                var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
                for(var i in imgArray){
                    $(".invoice .photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                }

                $(".type6").show();

                $(".photoBox>.photo1").click(function(_event){
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });

                $("#dealMode,#je").attr("disabled",true);
            }

    //        状态是未处理
            function initView1(){
                switch(reimbursementInfo.start){
                    case 1:
                        $("#reimState").text("等待处理");
                        break;
                    case 2:
                        $("#reimState").text("需保修");
                        break;
                    case 3:
                        $("#reimState").text("已调度");
                        break;
                    case 4:
                        $("#reimState").text("继续跑");
                        break;
                    case 5:
                        $("#reimState").text("已完成");
                        break;
                }
                console.log(reimbursementInfo.name);
                $("#sjName").text(reimbursementInfo.name);
                $("#je>option").removeAttr("select ");
                $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                $("#je").val(reimbursementInfo.natureAccident);
                $("#je").val(reimbursementInfo.natureAccident);
                switch ($("#je").val()) {
                    case '1':
                        $(".reimbursementType span").text('旧车装卸事故');break;
                    case '2':
                        $(".reimbursementType span").text('新车检查问题反馈');break;
                    case '3':
                        $(".reimbursementType span").text('自车交通事故');break;
                    case '4':
                        $(".reimbursementType span").text('新车装卸事故');break;
                    case '5':
                        $(".reimbursementType span").text('新车检查事故');break;
                    default:
                        $(".reimbursementType span").text('事故申报单');break;
                }
                $(".dis1,.dis2,.dis3,.dis4").show();
                $("#customer").val(reimbursementInfo.customerUnit);
                $("#btn_place").remove();
                $("#ddh").text(reimbursementInfo.place);
                $("#ccsj").val(reimbursementInfo.licensePlate);
                $(".photoBox>.add").remove();


                $(".btn_look").remove();
                $("#je").attr('disabled', true);
                $("#customer").attr('readonly', true);
                $("#ddh").attr('readonly', true);
                $("#ccsj").attr('readonly', true);


                var jsonObj = JSON.parse(reimbursementInfo.image);
                for(var i in jsonObj){

                    var $dom = $('<div class="photo1"><img src="'+jsonObj[i]+'" style="height: 100%"></div>');
                    $dom.click(function(e){
                        var thisBtn = $(this);
                        publicObj.actionSheet({
                            title: "请选择图片操作",
                            otherButtons: ["查看大图"],
                            callback: function (_result) {
                                console.log(_result);
                                switch (_result.buttonIndex) {
                                    case 0:
                                        publicObj.previewImage(thisBtn.find("img").attr("src"));
                                        break;
                                }
                            }
                        });
                    });
                    $(".photoBox").append($dom);
                }

            }

    //        状态是发起改派
            function initView2(){

            }

    //        初始化页面
            function initView(){
                    console.log(reimbursementInfo);
                    switch(reimbursementInfo.start){
                        case 1:
                            $("#reimState").text("等待处理");
                            $(".reimbursementTip").text("申请已提交，请等待审核人确认信息");
                            break;
                        case 2:
                            $("#reimState").text("需保修");
                            break;
                        case 3:
                            $("#reimState").text("已调度");
                            break;
                        case 4:
                            $("#reimState").text("继续跑");
                            break;
                        case 5:
                            $("#reimState").text("已完成");
                            break;
                    }

                    $("#je>option").removeAttr("select ");
                    $("#je>option[value="+reimbursementInfo.natureAccident+"]").attr("select",true);
                    $("#je").val(reimbursementInfo.natureAccident);
                    console.log('222222222');
                    console.log($("#je").val(reimbursementInfo.natureAccident));
                    switch ($("#je").val()) {
                        case '1':
                            $(".reimbursementType span").text('旧车装卸事故');break;
                        case '2':
                            $(".reimbursementType span").text('新车检查问题反馈');break;
                        case '3':
                            $(".reimbursementType span").text('自车交通事故');break;
                        case '4':
                            $(".reimbursementType span").text('新车装卸事故');break;
                        case '5':
                            $(".reimbursementType span").text('新车检查事故');break;
                        default:
                            $(".reimbursementType span").text('事故申报单');break;
                    }
                    $(".dis1,.dis2,.dis3,.dis4").show();
                    $("#customer").val(reimbursementInfo.customerUnit);
                    $("#btn_place").remove();
                    $("#ddh").text(reimbursementInfo.place);
                    $("#ccsj").val(reimbursementInfo.licensePlate);
                    $(".photoBox>.add").remove();


                    $(".btn_look").remove();
                    $("#je").attr('disabled', true);
                    $("#customer").attr('readonly', true);
                    $("#ddh").attr('readonly', true);
                    $("#ccsj").attr('readonly', true);


                        var jsonObj = JSON.parse(reimbursementInfo.image);
                    for(var i in jsonObj){

                        var $dom = $('<div class="photo1"><img src="'+jsonObj[i]+'" style="height: 100%"></div>');
                        $dom.click(function(e){
                           var thisBtn = $(this);
                           publicObj.actionSheet({
                               title: "请选择图片操作",
                               otherButtons: ["查看大图"],
                               callback: function (_result) {
                                   console.log(_result);
                                   switch (_result.buttonIndex) {
                                       case 0:
                                           publicObj.previewImage(thisBtn.find("img").attr("src"));
                                           break;
                                   }
                               }
                           });
                        });
                        $(".photoBox").append($dom);
                    }

            }

    //        初始化新车检查问题反馈事故
        function initXCJCWTFKView(){
            //展示基础布局
            $(".xcjcwtfk").show();

            //修改对应文字
            $(".reimbursementType span").text('新车检查问题反馈');

            //设置点击事件
            //新车车架号照片点击事件
            $(".xccjh").off();
            $(".xccjh").click(function(_event){
                var _$this = $(this);
                if(_$this.attr("data-isChoose")){
                    var thisBtn = $(this);
                    publicObj.actionSheet({
                        title:"请选择图片操作",
                        otherButtons:["查看大图","重新选择"],
                        callback:function(_result){
                            console.log(_result);
                            switch(_result.buttonIndex){
                                case 0:
                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                    break;
                                case 1:
                                    uploadOneImage(function(_result){
                                        console.log(_result);
                                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                                        _$this.attr("data-isChoose","true");

                                    });
                                    break;
                            }
                        }
                    });
                }else{
                    uploadOneImage(function(_result){
                        console.log(_result);
                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                        _$this.attr("data-isChoose","true");

                    });
                }

            });

            //设置添加照片按钮点击事件
            $(".xcjcwtfk .add").off();
            console.log($(".xcjcwtfk .add"));
            $(".xcjcwtfk .add").click(function(_event){
                console.log("点击了照片添加");
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".xcjcwtfk .photoBox").prepend($thisImg);
                    }
                });
            });

            //提交按钮点击事件
            $(".submitBtn").off();
            $(".submitBtn").click(function(_event){
                var isFall = true;
                if($("#ccsj").val().length<=0){
                    isFall = false;
                }

                if(!clickAble){
                    return;
                }

                //   if((!newCar&&isFall&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress)||((newCar||$("#je").val()=='1')&&isFall&&$("#customer").val().length>=0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress))
                if(($("#je").val()=='3'||($("#je").val()!='3'&&$("#customer").val().length>0))&&$("#customer").val().length>0&&$("#ccsj").length>0&&$(".xcjcwtfk .photoBox .xcjcwtfk>img").length>0&&user_adress){
                    $.each(userJob, function (i, el) {
                        if (el.role == "accidentDriver") {
                            flowId = el.flowId;
                            console.log("flowId is "+flowId);
                            return false;
                        }
                    });

                    var imgArray = [];
                    $(".xcjcwtfk .photoBox .photo1 img").each(function(_i){
                        imgArray.push($(this).attr("src"));
                    });

                    clickAble = false;

                    console.log({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
                        locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                        start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000)});
                    $.ajax(newCarCheckReportSaveUrl,{
                        data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray),licensePlate:$("#ccsj").val(),place:user_adress,
                            locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                            start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000)}),
                        type:"POST",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            console.log(_data);
                            if(_data.code==0){
                                publicObj.openDingdingPopup("事故申报成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){
                            clickAble = true;
                        }
                    });
                }
                else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                }
            });

        }

        //初始化自车交通事故
        function initZCJTSGView(){

            //展示基础布局
            $(".zcjtsg").show();

            //修改对应文字
            $(".reimbursementType span").text('自车交通事故');

            //设置点击事件
            //事故全景照，受损部位照点击事件
            $(".sgqjz,.ssbwz").off();
            $(".sgqjz,.ssbwz").click(function(_event){
                var _$this = $(this);
                if(_$this.attr("data-isChoose")){
                    var thisBtn = $(this);
                    publicObj.actionSheet({
                        title:"请选择图片操作",
                        otherButtons:["查看大图","重新选择"],
                        callback:function(_result){
                            console.log(_result);
                            switch(_result.buttonIndex){
                                case 0:
                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                    break;
                                case 1:
                                    uploadOneImage(function(_result){
                                        console.log(_result);
                                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                                        _$this.attr("data-isChoose","true");

                                    });
                                    break;
                            }
                        }
                    });
                }else{
                    uploadOneImage(function(_result){
                        console.log(_result);
                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                        _$this.attr("data-isChoose","true");

                    });
                }

            });

            //事故全景照添加图标
            $(".sgqjzbox .add").off();
            $(".sgqjzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".sgqjzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //受损部位照
            $(".ssbwzbox .add").off();
            $(".ssbwzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".ssbwzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //提交按钮点击事件
            $(".submitBtn").off();
            $(".submitBtn").click(function(_event){
                var isFall = true;
                if($("#ccsj").val().length<=0){
                    isFall = false;
                }

                if(!clickAble){
                    return;
                }

                //   if((!newCar&&isFall&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress)||((newCar||$("#je").val()=='1')&&isFall&&$("#customer").val().length>=0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress))
                console.log($(".sgqjzbox .photoBox .sgqjz>img").length+"-----"+$(".ssbwzbox .photoBox .ssbwz>img").length+"----"+$("#ccsj").val().length);
                if($("#ccsj").length>0&&$(".sgqjzbox .photoBox .sgqjz>img").length>=3&&$(".ssbwzbox .photoBox .ssbwz>img").length>=3&&user_adress){
                    $.each(userJob, function (i, el) {
                        if (el.role == "accidentDriver") {
                            flowId = el.flowId;
                            console.log("flowId is "+flowId);
                            return false;
                        }
                    });

                    var imgArray1 = [];
                    $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                        imgArray1.push($(this).attr("src"));
                    });
                    console.log(imgArray1);

                    var imgArray2 = [];
                    $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                        imgArray2.push($(this).attr("src"));
                    });
                    console.log(imgArray2);

                    clickAble = false;

                    $.ajax(selfTestSaveUrl,{
                        data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray1),damage:JSON.stringify(imgArray2),licensePlate:$("#ccsj").val(),place:user_adress,
                            locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                            start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000)}),
                        type:"POST",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            console.log(_data);
                            if(_data.code==0){
                                publicObj.openDingdingPopup("事故申报成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){
                            clickAble = true;
                        }
                    });
                }
                else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                }
            });

        }

        //初始化旧车装卸事故
        function initJSZXSGView(){

            //展示基础布局
            $(".jczxsg").show();

            //修改对应文字
            $(".reimbursementType span").text('旧车装卸事故');

            //设置点击事件
            //事故全景照、受损部位照照片点击事件
            $(".sgqjz,.ssbwz").off();
            $(".sgqjz,.ssbwz").click(function(_event){
                var _$this = $(this);
                if(_$this.attr("data-isChoose")){
                    var thisBtn = $(this);
                    publicObj.actionSheet({
                        title:"请选择图片操作",
                        otherButtons:["查看大图","重新选择"],
                        callback:function(_result){
                            console.log(_result);
                            switch(_result.buttonIndex){
                                case 0:
                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                    break;
                                case 1:
                                    uploadOneImage(function(_result){
                                        console.log(_result);
                                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                                        _$this.attr("data-isChoose","true");

                                    });
                                    break;
                            }
                        }
                    });
                }else{
                    uploadOneImage(function(_result){
                        console.log(_result);
                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                        _$this.attr("data-isChoose","true");

                    });
                }

            });

            //事故全景照添加图标
            $(".sgqjzbox .add").off();
            $(".sgqjzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".sgqjzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //受损部位照
            $(".ssbwzbox .add").off();
            $(".ssbwzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".ssbwzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //提交按钮点击事件
            $(".submitBtn").off();
            $(".submitBtn").click(function(_event){
                var isFall = true;
                if($("#ccsj").val().length<=0){
                    isFall = false;
                }

                if(!clickAble){
                    return;
                }

                //   if((!newCar&&isFall&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress)||((newCar||$("#je").val()=='1')&&isFall&&$("#customer").val().length>=0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress))
                console.log($(".sgqjzbox .photoBox .sgqjz>img").length+"-----"+$(".ssbwzbox .photoBox .ssbwz>img").length+"----"+$("#ccsj").val().length);
                if($("#customer").val().length>0&&$("#ccsj").val().length>0&&$(".sgqjzbox .photoBox .sgqjz>img").length>=3&&$(".ssbwzbox .photoBox .ssbwz>img").length>=3&&user_adress){
                    $.each(userJob, function (i, el) {
                        if (el.role == "accidentDriver") {
                            flowId = el.flowId;
                            console.log("flowId is "+flowId);
                            return false;
                        }
                    });

                    var imgArray1 = [];
                    $(".sgqjzbox .photoBox .photo1 img").each(function(_i){
                        imgArray1.push($(this).attr("src"));
                    });
                    console.log(imgArray1);

                    var imgArray2 = [];
                    $(".ssbwzbox .photoBox .photo1 img").each(function(_i){
                        imgArray2.push($(this).attr("src"));
                    });
                    console.log(imgArray2);

                    clickAble = false;

                    $.ajax(oldCarSaveUrl,{
                        data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,image:JSON.stringify(imgArray1),damage:JSON.stringify(imgArray2),licensePlate:$("#ccsj").val(),place:user_adress,
                            locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                            start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000)}),
                        type:"POST",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            console.log(_data);
                            if(_data.code==0){
                                publicObj.openDingdingPopup("事故申报成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){
                            clickAble = true;
                        }
                    });
                }
                else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                }
            });
        }

        //新车检查装卸事故
        function initXCJCZXSGView(){
            $(".xcjczxsg").show();

            //修改对应文字
            $(".reimbursementType span").text('新车检查装卸事故');

            //设置点击事件
            //车架照、事故全景照、受损部位照照片点击事件
            $(".xcjcsgxccjhBox .xcjczxsg,.sgqjzbox .xcjczxsg,.xcjcsgBox .xcjczxsg").off();
            $(".xcjcsgxccjhBox .xcjczxsg,.sgqjzbox .xcjczxsg,.xcjcsgBox .xcjczxsg").click(function(_event){
                var _$this = $(this);
                if(_$this.attr("data-isChoose")){
                    var thisBtn = $(this);
                    publicObj.actionSheet({
                        title:"请选择图片操作",
                        otherButtons:["查看大图","重新选择"],
                        callback:function(_result){
                            console.log(_result);
                            switch(_result.buttonIndex){
                                case 0:
                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                    break;
                                case 1:
                                    uploadOneImage(function(_result){
                                        console.log(_result);
                                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                                        _$this.attr("data-isChoose","true");

                                    });
                                    break;
                            }
                        }
                    });
                }else{
                    uploadOneImage(function(_result){
                        console.log(_result);
                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                        _$this.attr("data-isChoose","true");

                    });
                }

            });

            //车架照添加图标
            $(".xcjcsgxccjhBox .add").off();
            $(".xcjcsgxccjhBox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".xcjcsgxccjhBox .photoBox").prepend($thisImg);
                    }
                });
            });

            //全景照
            $(".sgqjzbox .add").off();
            $(".sgqjzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".sgqjzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //受损部位照
            $(".ssbwzbox .add").off();
            $(".ssbwzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".ssbwzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //提交按钮点击事件
            $(".submitBtn").off();
            $(".submitBtn").click(function(_event){
                var isFall = true;
                if($("#ccsj").val().length<=0){
                    isFall = false;
                }

                if(!clickAble){
                    return;
                }
                console.log($("#sgfsd").val());
                if($("#sgfsd").val()!="kong"&&$("#customer").val().length>0&&$("#ccsj").val().length>0&&$(".xcjcsgxccjhBox .photoBox .xcjczxsg>img").length>=1&&$(".sgqjzbox .photoBox .xcjczxsg>img").length>=3&&$(".ssbwzbox .photoBox .xcjczxsg>img").length>=3&&user_adress){
                    $.each(userJob, function (i, el) {
                        if (el.role == "accidentDriverNewCarCheck") {
                            flowId = el.flowId;
                            console.log("flowId is "+flowId);
                            return false;
                        }
                    });

                    var imgArray1 = [];
                    $(".xcjcsgxccjhBox .photoBox .xcjczxsg img").each(function(_i){
                        imgArray1.push($(this).attr("src"));
                    });
                    console.log(imgArray1);

                    var imgArray2 = [];
                    $(".sgqjzbox .photoBox .xcjczxsg img").each(function(_i){
                        imgArray2.push($(this).attr("src"));
                    });
                    console.log(imgArray2);

                    var imgArray3 = [];
                    $(".ssbwzbox .photoBox .xcjczxsg img").each(function(_i){
                        imgArray3.push($(this).attr("src"));
                    });

                    clickAble = false;

                    console.log({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2), damage:JSON.stringify(imgArray3),licensePlate:$("#ccsj").val(),place:user_adress,
                        locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                        start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000),accidentPlace:$("#sgfsd").val()});
                    $.ajax(newCarHandingSaveUrl,{
                        data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,frame:JSON.stringify(imgArray1),panorama:JSON.stringify(imgArray2), damage:JSON.stringify(imgArray3),licensePlate:$("#ccsj").val(),place:user_adress,
                            locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                            start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000),accidentPlace:$("#sgfsd").val()}),
                        type:"POST",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            console.log(_data);
                            if(_data.code==0){
                                publicObj.openDingdingPopup("事故申报成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){
                            clickAble = true;
                        }
                    });
                }
                else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                }
            });

        }

        //初始化新车检查事故
        function initXCJCSGView(){

            //展示基础布局
            $(".xcjcsg").show();

            //修改对应文字
            $(".reimbursementType span").text('新车检查事故');

            //设置点击事件
            //车架照、整车照、受损部位照照片点击事件
            $(".xcjcsgxccjh,.zcz,.ssbwz").off();
            $(".xcjcsgxccjh,.zcz,.ssbwz").click(function(_event){
                var _$this = $(this);
                if(_$this.attr("data-isChoose")){
                    var thisBtn = $(this);
                    publicObj.actionSheet({
                        title:"请选择图片操作",
                        otherButtons:["查看大图","重新选择"],
                        callback:function(_result){
                            console.log(_result);
                            switch(_result.buttonIndex){
                                case 0:
                                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                                    break;
                                case 1:
                                    uploadOneImage(function(_result){
                                        console.log(_result);
                                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                                        _$this.attr("data-isChoose","true");

                                    });
                                    break;
                            }
                        }
                    });
                }else{
                    uploadOneImage(function(_result){
                        console.log(_result);
                        _$this.html("<img src='"+_result[0]+"' style='height: 100%' />");
                        _$this.attr("data-isChoose","true");

                    });
                }

            });

            //整车照添加图标
            $(".zczBox .add").off();
            $(".zczBox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".zczBox .photoBox").prepend($thisImg);
                    }
                });
            });

            //受损部位照
            $(".ssbwzbox .add").off();
            $(".ssbwzbox .add").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        var $thisImg = $("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                        $thisImg.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.actionSheet({
                                title:"请选择图片操作",
                                otherButtons:["查看大图","删除图片"],
                                callback:function(_result){
                                    console.log(_result);
                                    switch(_result.buttonIndex){
                                        case 0:
                                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                                            break;
                                        case 1:
                                            thisBtn.remove();
                                            break;
                                    }
                                }
                            });
                        });
                        $(".ssbwzbox .photoBox").prepend($thisImg);
                    }
                });
            });

            //提交按钮点击事件
            $(".submitBtn").off();
            $(".submitBtn").click(function(_event){
                var isFall = true;
                if($("#ccsj").val().length<=0){
                    isFall = false;
                }

                if(!clickAble){
                    return;
                }

                //   if((!newCar&&isFall&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress)||((newCar||$("#je").val()=='1')&&isFall&&$("#customer").val().length>=0&&$(".invoice .photoBox>*[class=photo1]").length>0&&user_adress))
                console.log($("#customer").val().length>0);
                console.log($("#ccsj").val().length>0);
                console.log($(".zczBox .photoBox .zcz>img").length>=1);
                console.log($(".ssbwzbox .photoBox .xcjcsg>img"));
                console.log($(".xcjcsgxccjhBox .photoBox .xcjcsgxccjh>img").length>=1);
                if($("#customer").val().length>0&&$("#ccsj").val().length>0&&$(".zczBox .photoBox .zcz>img").length>=1&&$(".ssbwzbox .photoBox .xcjcsg>img").length>=3&&$(".xcjcsgxccjhBox .photoBox .xcjcsgxccjh>img").length>=1&&user_adress){
                    $.each(userJob, function (i, el) {
                        if (el.role == "accidentDriver") {
                            flowId = el.flowId;
                            console.log("flowId is "+flowId);
                            return false;
                        }
                    });

                    var imgArray1 = [];
                    $(".xcjcsgxccjhBox .photoBox .photo1 img").each(function(_i){
                        imgArray1.push($(this).attr("src"));
                    });
                    console.log(imgArray1);

                    var imgArray2 = [];
                    $(".zczBox .photoBox .photo1 img").each(function(_i){
                        imgArray2.push($(this).attr("src"));
                    });
                    console.log(imgArray2);

                    var imgArray3 = [];
                    $(".xcjcsgBox .photoBox .photo1 img").each(function(_i){
                        imgArray3.push($(this).attr("src"));
                    });

                    clickAble = false;

                    $.ajax(newCarCheckSaveUrl,{
                        data:JSON.stringify({driverId:JSON.parse(sessionStorage.getItem("user_jobInfo")).structureUserId,frame:JSON.stringify(imgArray1),vehicle:JSON.stringify(imgArray2), damage:JSON.stringify(imgArray3),licensePlate:$("#ccsj").val(),place:user_adress,
                            locationDimension:user_latitude,locationLongitude:user_longitude,name:userInfo.name,natureAccident:parseInt($("#je").val()),
                            start:1,startH:1,customerUnit:$("#customer").val(),flowId:flowId,addTime:parseInt(new Date().getTime()/1000)}),
                        type:"POST",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            console.log(_data);
                            if(_data.code==0){
                                publicObj.openDingdingPopup("事故申报成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){
                            clickAble = true;
                        }
                    });
                }
                else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                }
            });
        }

        function getUserPhone(_id,_callBackFun){
            console.log(userInfo);
            $.ajax(getUserInfoByIdUrl,{
                data:{
                    userId:_id,
                },
                type:"GET",
                contentType:"application/json",
                success:function(_data){
                    console.log(_data);
                    switch(_data.code){
                        case 0:
                            if(typeof _callBackFun == "function"){
                                _callBackFun(_data.data);
                            }
                            break;
                    }
                },
                error:function(_error){

                }
            })
        }

        function initCallPhone(_data){
                $(".bh").show();
                $(".bh").click(function(_event){
                    publicObj.callPhone(_data.mobile);
                });
        };

    };
}

function uploadOneImage(_callBack){
    dd.biz.util.uploadImage({
        compression:false,//(是否压缩，默认为true压缩)
        multiple: false, //是否多选，默认false
        quality: 50, // 图片压缩质量,
        resize: 50, // 图片缩放率
        stickers: {   // 水印信息
        },
        onSuccess : function(result) {
            if(typeof _callBack == "function"){
                _callBack(result);
            }
        },
        onFail : function(err) {}
    })
}
