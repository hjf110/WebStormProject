function initPageMain() {
    var ureadeclareObj = new Ureadeclare();
    ureadeclareObj.initPageView();
    publicObj.reviewForRole();

    //性别选择样式
    $(".mode i").on("click", function() {
        $this = $(this);
        $(".mode i").removeClass("public-iconRadioSelected").addClass("public-iconRadio");
        $(".mode i").next().css("color", "#8E8E8E");
        $this.removeClass("public-iconRadio").addClass("public-iconRadioSelected");
        $this.next().css("color", "#606060");
    });

    function Ureadeclare(){
        var saveUrl =  SERVER_URL + "ex/urea/insertOrUpdate";	//提交申请单接口
        var spNoPassUrl = SERVER_URL + "/ex/ureaBatch/save";    //审批不通过接口
        var getSPListUrl = SERVER_URL + "ex/ureaBatch/list";         //获取审批列表
        var getReimbursementInfoUrl = SERVER_URL + "ex/urea/info/";		//获取报销单详情接口
        var getExamineListUrl = SERVER_URL + "ex/ureaExpense/list";		//获取审核列表
        var saveExpenseUrl = SERVER_URL + "ex/ureaExpense/save";  //审核不通过接口
        var state = parseInt(publicObj.getUrlParameter("state"));
        var id = publicObj.getUrlParameter("id");
        var userJobInfo = JSON.parse(sessionStorage.getItem("user_jobInfo"));
        var userInfo;
        var flowId='';
        var userJob = JSON.parse(sessionStorage.getItem("user_job"));
        var thisObj = this;
        var reimbursementInfo;

        //根据state状态，初始化页面内容
        this.initPageView = function(){
            switch (state){
                case -3:    //正在申报
                    //申请页面初始化函数
                    stepUreadeclare(0, 120, "#steps")//状态（0,1,2,3）
                    initureadeclareApplyView();
                    break;
                case -2:    //审批未通过
                    spNoPassView();
                    break;
                case -1:    //审核未通过
                    //重新修改页面函数
                    reviewPageView();
                    break;
                case 0:     // 待审批
                    stepUreadeclare(1, 120, "#steps")//状态（0,1,2,3）
                    spPageView();
                    break;
                case 1:     // 待审核
                    //审核页面
                    initureadeclareExamineView();
                    break;
                case 2:     // 待报销
                    stepUreadeclare(1, 120, "#steps")//状态（0,1,2,3）
                    process2();
                    break;
                case 3:     // 待打款
                    stepUreadeclare(3, 120, "#steps")//状态（0,1,2,3）
                    process3();
                    break;
                case 6:     // 已完成
                    stepUreadeclare(5, 120, "#steps")//状态（0,1,2,3）
                    finishView1();
                    break;
                case 7:   // 已审批
                    stepUreadeclare(2, 120, "#steps")//状态（0,1,2,3）
                    spPassView();
                    break;
                case 8:   // 未完成
                    stepUreadeclare(4, 120, "#steps")//状态（0,1,2,3）
                    finishView();
                    break;
                default:
                    if(id){
                        getReimbursementInfo();
                    }
                    break;
            }
        };
        //	完成打款函数状态8,
        function finishView() {
           
            $(".confirm").hide();
            // $(".caiwu").append("<div class='done'>完成</div>")
            $("#reimState").text("已打款");
            $(".reimbursementTip").text("报销单已打款");
            //填写用户信息
            publicObj.getUserInfo(null, function (_userInfo) {
                userInfo = _userInfo;
            });
            var role = 1;
            $.each(userJob, function (i, el) {
                if (el.role == "bridgeDriver" || el.role == "ureaDriver" || el.role == "stayDriver") {
                    role = 1;
                    return false;
                }else {
                    role = 2;
                }
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime * 1000);
            $(".applyBox .detailedTime").text(time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $("#chsl").val(reimbursementInfo.stock);
            $("#yxgm").val(reimbursementInfo.allow);
            $("#yxgm").attr("readonly","readonly");
            $(".allow").show();
            $(".type3").show();
            $(".type1Input").attr("readonly", "");
            $("#sjLocation").text(reimbursementInfo.location);

            $("#dkqrr").text(reimbursementInfo.financeName);
            // $("#skr").val(reimbursementInfo.receivablesName);
            $("#payType").val(reimbursementInfo.receivablesType);
            $("#payType>option").removeAttr("selected");
            $("#payType>option[value='" + reimbursementInfo.receivablesType + "']").attr("selected", "selected");
            $("#skzh").val(reimbursementInfo.receivablesAccount);
            var myDate = new Date();
            myDate.setTime(reimbursementInfo.financeTime * 1000);
            $("#dksj").attr("data-date", reimbursementInfo.financeTime);
            $("#dksj").val(myDate.Format("yyyy-MM-dd"));
            $("#skzh,#dksj").attr("readonly", "");
            $("#payType").attr("disabled", "disabled");

            $(".type6").show();
            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for (var i in imgArray) {
                var $img2 = $("<div class='photo1'><img src='" + imgArray[i] + "' style='height: 100%' /></div>");
                $img2.click(function (_event) {
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });
                $(".invoice .photoBox").append($img2);
            }

            if (role == 1) {
                $(".type2").show(0, function () {
                    $(".uploadPhotoBtn").css("display", "inline-block");
                });
                //判断是否已经寄出发票
                if (reimbursementInfo.reimbursementType != "" && reimbursementInfo.reimbursementType != null && reimbursementInfo.reimbursementType != undefined) {
                    switch (reimbursementInfo.reimbursementType) {
                        case 2:
                            $(".modeB").hide()
                            $(".modeA>i").removeClass("public-iconRadio");
                            $(".modeA>i").addClass("public-iconRadioSelected");
                            $(".modeB>i").removeClass("public-iconRadioSelected");
                            $(".modeB>i").addClass("public-iconRadio");
                            $("#kddh").hide();
                            $(".listBox>.uploadPhotoBtn").hide();
                            break;
                        case 1:
                            $(".modeA").hide()
                            $(".modeB>i").removeClass("public-iconRadio");
                            $(".modeB>i").addClass("public-iconRadioSelected");
                            $(".modeA>i").removeClass("public-iconRadioSelected");
                            $(".modeA>i").addClass("public-iconRadio");
                            $("#kddh").val(reimbursementInfo.courierNumber);
                            $("#kddh").attr("readonly", "");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for (var j in img2Array) {
                                $(".listBox .photoBox").append("<div class='photo1'><img src='" + img2Array[j] + "' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events", "none")
                }
                else {
                    $(".modeA").click(function (_event) {
                        $(".modeA>i").addClass("public-iconRadioSelected");
                        $(".modeA>i").removeClass("public-iconRadio");
                        $(".modeB>i").addClass("public-iconRadio");
                        $(".modeB>i").removeClass("public-iconRadioSelected");
                        $(".listBox.uploadPhoto").hide();
                    });
                    $(".modeB").click(function (_event) {
                        $(".modeB>i").addClass("public-iconRadioSelected");
                        $(".modeB>i").removeClass("public-iconRadio");
                        $(".modeA>i").addClass("public-iconRadio");
                        $(".modeA>i").removeClass("public-iconRadioSelected");
                        $(".listBox.uploadPhoto").show();
                    });

                    //上传单号照片
                    $(".uploadPhotoBtn").click(function (_event) {
                        publicObj.uploadImage(function (_imgArray) {
                            for (var i in _imgArray) {
                                $(".listBox.uploadPhoto .photoBox").append("<div class='photo1'><img src='" + _imgArray[i] + "' style='height: 100%' /></div>");
                            }
                            $(".listBox.uploadPhoto .photoBox>.photo1").click(function (_event) {
                                var thisBtn = $(this);
                                publicObj.actionSheet({
                                    title: "请选择图片操作",
                                    otherButtons: ["查看大图", "删除图片"],
                                    callback: function (_result) {
                                        console.log(_result);
                                        switch (_result.buttonIndex) {
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
                        });
                    });
                    $(".examineBox").hide()//审核
                    //    提交按钮
                    $(".submitBtn").on("click",function (_event) {
                        var $this = $(this);
                        if ($(".modeB>i").hasClass("public-iconRadioSelected")) {
                            if (($("#kddh").val().length <= 0 || $(".listBox.uploadPhoto .photoBox>.photo1").length <= 0)) {
                                publicObj.openDingdingPopup("请填写运单号并拍照后再提交");
                            } else {
                                var imgArray = [];
                                for (var j = 0; j < $(".listBox.uploadPhoto .photoBox>.photo1>img").length; j++) {
                                    imgArray.push($(".listBox.uploadPhoto .photoBox>.photo1>img").eq(j).attr("src"))
                                }
                                $this.off("click");
                                $.ajax(saveUrl, {
                                    data: JSON.stringify({ isSend: 2, id: id, reimbursementType: 1, courierNumber: $("#kddh").val(), courierMark: JSON.stringify(imgArray) }),
                                    type: "post",
                                    contentType: "application/json",
                                    processData: false,
                                    success: function (_data) {
                                        if (_data.code == 0) {
                                            publicObj.openDingdingPopup("报销方式提交成功", null, null, function () {
                                                publicObj.goBack();
                                            });
                                        }
                                    },
                                    error: function (_error) { }
                                });
                            }
                        } else {
                            $this.off("click");
                            $.ajax(saveUrl, {
                                data: JSON.stringify({ id: id, reimbursementType: 2 }),
                                type: "post",
                                contentType: "application/json",
                                processData: false,
                                success: function (_data) {
                                    if (_data.code == 0) {
                                        publicObj.openDingdingPopup("报销方式提交成功", null, null, function () {
                                            publicObj.goBack();
                                        });
                                    }
                                },
                                error: function (_error) { }
                            });
                        }

                    });
                }
                $("#skzh").attr("disabled", 'disabled');
                $("#dksj").attr("disabled", 'disabled');
            }
            else if (role == 2) {
                $(".caiwu").show()
                if (reimbursementInfo.reimbursementType != "" && reimbursementInfo.reimbursementType != null && reimbursementInfo.reimbursementType != undefined) {
                    switch (reimbursementInfo.reimbursementType) {
                        case 2:
                            $(".modeB").hide();
                            $(".modeA>i").removeClass("public-iconRadio");
                            $(".modeA>i").addClass("public-iconRadioSelected");
                            $(".modeB>i").removeClass("public-iconRadioSelected");
                            $(".modeB>i").addClass("public-iconRadio");
                            $("#kddh").hide();
                            $(".listBox>.uploadPhotoBtn").hide();
                            break;
                        case 1:
                            $(".modeA").hide()
                            $(".modeB>i").removeClass("public-iconRadio");
                            $(".modeB>i").addClass("public-iconRadioSelected");
                            $(".modeA>i").removeClass("public-iconRadioSelected");
                            $(".modeA>i").addClass("public-iconRadio");
                            $("#kddh").val(reimbursementInfo.courierNumber);
                            $("#kddh").attr("readonly", "");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for (var j in img2Array) {
                                $(".listBox .photoBox").append("<div class='photo1'><img src='" + img2Array[j] + "' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events", "none");
                    $(".confirm").hide();

                    //寄送发票按钮初始化
                    $(".caiwu2").append("<div class='done'>已收发票并完成</div>").show();
                    $(".done").on("click",function(_event){
                        var $this = $(this);
                        var imgArray = [];
                        for(var j=0;j<$(".cwPic .photoBox>.photo1>img").length;j++){
                            imgArray.push($(".cwPic .photoBox>.photo1>img").eq(j).attr("src"))
                        }
                        var strText = JSON.stringify(imgArray);
                        console.log(strText);
                        $this.off("click");
                        $.ajax(saveUrl,{
                            data:JSON.stringify( {isSend:3,id:id,declarationUserId:reimbursementInfo.declarationUserId,state:6,financeUserId:userJobInfo.structureUserId,financeTime:Math.ceil(new Date().getTime()/1000),receivablesName:"noUser",receivablesType:$("#payType").val(),receivablesAccount:$("#skzh").val(),receivablesTime:Math.ceil(new Date().getTime()/1000),financeMark:strText,confirmUserId:userJobInfo.structureUserId}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("已完成",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    });

                    $(".cwPic").show();
                    $(".cwPic .add").show();
                    $(".cwPic .add").click(function(_event) {
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
                                $(".cwPic .photoBox").prepend($thisImg);
                            }
                        });
                    });


                }
                else {
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    //$(".mode").css("pointer-events","none")
                    $(".mode").hide();
                    $(".bxfs").hide();
                    $(".caiwu").append("<div class='cuidan'>催寄发票</div>")
                }
            }
            // $(".done").click(function (_event) {
            //     $.ajax(saveUrl, {
            //         data: JSON.stringify({ isSend: 3, id: id, declarationUserId: reimbursementInfo.declarationUserId, state: 6, financeUserId: userJobInfo.structureUserId, financeTime: Math.ceil(new Date().getTime() / 1000), receivablesName: "noUser", receivablesType: $("#payType").val(), receivablesAccount: $("#skzh").val(), receivablesTime: Math.ceil(new Date().getTime() / 1000) }),
            //         type: "post",
            //         contentType: "application/json",
            //         processData: false,
            //         success: function (_data) {
            //             if (_data.code == 0) {
            //                 publicObj.openDingdingPopup("已完成", null, null, function () {
            //                     publicObj.goBack();
            //                 });
            //             }
            //         },
            //         error: function (_error) { }
            //     });
            // });
            getExamineList();
            $(".examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">' + reimbursementInfo.batchName + '</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".colorWarning").removeClass("colorWarning");
            $(".cuidan").click(function (_event) {
                $.ajax(SERVER_URL + "ex/urea/noticeDriver", {
                    data: JSON.stringify({ id: id }),
                    type: "post",
                    contentType: "application/json",
                    processData: false,
                    success: function (_data) {
                        if (_data.code == 0) {
                            publicObj.openDingdingPopup("已催单", null, null, function () {
                                publicObj.goBack();
                            });
                        }
                    },
                    error: function (_error) { }
                });
            });

        }
        //申请页面初始化函数
        function initureadeclareApplyView(){
            $("#reimState").text("审批申请");
            $(".reimbursementTip").text("填写申报信息后点击提交，提交给审批人审批");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
                $("#sjName").text(_userInfo.name);
            });

            $(".type-3").show(0,function(){
                $(".add").css("display","inline-block");
                $(".public-icon.position").css("display","inline-block");
            });

            publicObj.getLocationData(function(_position){
                $("#sjLocation").text(_position.address!=null?_position.address:_position.province+_position.city+_position.district+_position.road);
            });

            //定位按钮点击事件
            $(".positionBtn").click(function(){
                publicObj.getLocationData(function(_position){
                    publicObj.openDingdingPopup("重定位成功");
                    $("#sjLocation").text(_position.address!=null?_position.address:_position.province+_position.city+_position.district+_position.road);
                });
            });

            // 设置上传发票照片按钮点击事件
            $(".invoice .add").click(function(_event){
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
                        $(".photoBox").prepend($thisImg);
                    }
                });
            });

            //	设置提交按钮点击事件
            $(".submitBtn").on("click",function(_event){
                var $this = $(this);
                var $array = $("#cph,#ddh,#nssl,#chsl");
                var isFall = true;
                console.log($array);
                for(var i=0;i< $array.length;i++ ){
                    if($array.eq(i).val().length<=0){
                        isFall = false;
                    }
                }
                //判断是否是单独寄发票state：-9
                if (state == -9) {
                }
                else {
                    if(isFall){
                        $.each(userJob, function (i, el) {
                            if (el.role == "ureaDriver") {
                                flowId = el.flowId;
                                return false;
                            }
                        })
                        var data = JSON.stringify({ isSend: 1, declarationUserId: userJobInfo.structureUserId, plateNumber: $("#cph").val(), kilometre: $("#ddh").val(), declarationTime: Math.ceil(new Date().getTime() / 1000), apply: $("#nssl").val(), stock: $("#chsl").val(), flowId: flowId, state: 0,location:$("#sjLocation").text() })
                        console.log(data);
                        $this.off("click");
                        $.ajax(saveUrl,{
                            data: data,
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("报销单审批申请已提交",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }else{
                        publicObj.openDingdingPopup("请填写全部信息后提交");
                    }

                    // if(isFall&&$(".photoBox>*[class=photo1]").length>0){
                    //     var imgArray = [];
                    //     $(".invoice .photoBox .photo1 img").each(function(_i){
                    //         imgArray.push($(this).attr("src"));
                    //     });
                    //     $.ajax(updateOrSaveUrl,{
                    //         data: JSON.stringify({ declarationUserId: userJobInfo.structureUserId, plateNumber: $("#cph").val(), kilometre: $("#ddh").val(), apply: $(".nssl").val(), stock: $(".chsl").val(),state:1}),
                    //         type:"post",
                    //         contentType:"application/json",
                    //         processData:false,
                    //         success:function(_data) {
                    //             if(_data.code==0){
                    //                 publicObj.openDingdingPopup("报销单申请成功",null,null,function(){
                    //                     publicObj.goBack();
                    //                 });
                    //             }
                    //         },
                    //         error:function(_error){}
                    //     });
                    // }else{
                    //     publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                    // }
                }
            });

        };

        //报销单审核页面初始化函数
        function initureadeclareExamineView(){
            $("#reimState").text("待审核");
            $(".reimbursementTip").text("报销单已提交，请及时审核报销信息");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $(".type1Input").attr("readonly","");
            $("#sjLocation").text(reimbursementInfo.location);

            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $(".fpbox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }

            var img2Array = JSON.parse(reimbursementInfo.ureaMark);
            for(var j in img2Array){
                $(".nsbox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>")
            }

            $(".invoice .photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });

            getSpList();
            getExamineList();

            $(".type1").show();
            $(".spBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审批人：</span><span class="companyName">'+reimbursementInfo.batchName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已审批</span></div></div>');


            $(".passBtn").on("click",function(_event){
                var $this = $(this);
                console.log("id："+userInfo.id);
                $this.off("click");
                $.ajax(saveUrl,{
                    data:JSON.stringify( {id:id,state:2,declarationUserId:reimbursementInfo.declarationUserId,checkUserId:userInfo.id}),
                    type:"post",
                    contentType:"application/json",
                    processData:false,
                    success:function(_data2) {
                        if(_data2.code==0){
                            publicObj.openDingdingPopup("审核结果已提交",null,null,function(){
                                publicObj.goBack();
                            })
                        }
                    },
                    error:function(_error){}
                });
            });

            $(".noPassBtn").on("click",function(_event){
                var $this = $(this);
                if($("#noReason").val().length<=0){
                    publicObj.openDingdingPopup("请填写不通过理由")
                }else{
                    $this.off("click");
                    $.ajax(saveExpenseUrl,{
                        type:"post",
                        data:JSON.stringify({ureaId:id,expenseTime:Math.ceil(new Date().getTime()/1000),expenseUserId:userInfo.id,expenseInfo:$("#noReason").val()}),
                        contentType:"application/json",
                        processData:false,
                        success:function(_data){
                            if(_data.code==0){
                                $.ajax(saveUrl,{
                                    data:JSON.stringify( {id:id,state:-1,declarationUserId:reimbursementInfo.declarationUserId}),
                                    type:"post",
                                    contentType:"application/json",
                                    processData:false,
                                    success:function(_data2) {
                                        if(_data2.code==0){
                                            publicObj.openDingdingPopup("审核结果已提交",null,null,function(){
                                                publicObj.goBack();
                                            })
                                        }
                                    },
                                    error:function(_error){}
                                });
                            }
                        },
                        error:function(_data){}
                    });
                }
            });
        }

        //	根据id获取报销单数据
        function getReimbursementInfo(){
            $.get(getReimbursementInfoUrl+id,{},function(_data){
                reimbursementInfo = _data.data;
                state = reimbursementInfo.state;
                thisObj.initPageView();
            });
        }
        
        //审批初始化页面函数
        function spPageView(){
            $("#reimState").text("待审批");
            $(".reimbursementTip").text("审批单已提交，请及时审批");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#ddh").val(reimbursementInfo.kilometre);
            $("#nssl").val(reimbursementInfo.apply);
            // $("#je").val(reimbursementInfo.money);
            $("#chsl").val(reimbursementInfo.stock);
            $(".type1Input").attr("readonly","");
            $("#sjLocation").text(reimbursementInfo.location);
            $(".type0").show();
            getSpList();

            $(".passBtnSP").on("click",function(_event){
                var $this = $(this);
                if ($("#yxgm").val().length <= 0) {
                    publicObj.openDingdingPopup("请填写允许购买的数量")
                } else {
                    console.log("id："+userInfo.id);
                    $this.off("click");
                    $.ajax(saveUrl,{
                        //id:id,state:3,declarationUserId:reimbursementInfo.declarationUserId,checkUserId:userJobInfo.structureUserId
                        data: JSON.stringify({ id: id, state: 7, allow: $("#yxgm").val(), declarationUserId: reimbursementInfo.declarationUserId, batchUserId: userJobInfo.structureUserId}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data2) {
                            if(_data2.code==0){
                                publicObj.openDingdingPopup("审批结果已提交",null,null,function(){
                                    publicObj.goBack();
                                })
                            }
                        },
                        error:function(_error){}
                    });
                }
            });

            $(".noPassBtnSP").on("click",function(_event){
                var $this = $(this);
                publicObj.openDingdingPrompt("请填写不通过理由",null,"不通过",function(_value){
                    if(_value!=null&&_value.length>0){
                        $this.off("click");
                        $.ajax(spNoPassUrl,{
                            type:"post",
                            data: JSON.stringify({ ureaId: id, declarationUserId: reimbursementInfo.declarationUserId, batchUserId: userJobInfo.structureUserId,batchTime:Math.ceil(new Date().getTime()/1000),batchInfo:_value}),
                            contentType:"application/json",
                            processData:false,
                            success:function(_data){
                                if(_data.code==0){
                                    $.ajax(saveUrl,{
                                        data:JSON.stringify({id:id,state:-2,declarationUserId:reimbursementInfo.declarationUserId}),
                                        type:"post",
                                        contentType:"application/json",
                                        processData:false,
                                        success:function(_data2) {
                                            if(_data2.code==0){
                                                publicObj.openDingdingPopup("审批结果已提交",null,null,function(){
                                                    publicObj.goBack();
                                                })
                                            }
                                        },
                                        error:function(_error){}
                                    });
                                }
                            },
                            error:function(_data){}
                        });
                    }else{
                        publicObj.openDingdingPopup("不通过理由不能为空")
                    }
                });

                // if($("#noReasonSP").val().length<=0){
                //     publicObj.openDingdingPopup("请填写不通过理由")
                // }else{
                //     console.log("aaai:"+id);
                //     $.ajax(spNoPassUrl,{
                //         type:"post",
                //         data: JSON.stringify({ ureaId: id, declarationUserId: reimbursementInfo.declarationUserId, batchUserId: userJobInfo.structureUserId,batchTime:Math.ceil(new Date().getTime()/1000),batchInfo:$("#noReasonSP").val()}),
                //         contentType:"application/json",
                //         processData:false,
                //         success:function(_data){
                //             if(_data.code==0){
                //                 $.ajax(saveUrl,{
                //                     data:JSON.stringify({id:id,state:-2,declarationUserId:reimbursementInfo.declarationUserId}),
                //                     type:"post",
                //                     contentType:"application/json",
                //                     processData:false,
                //                     success:function(_data2) {
                //                         if(_data2.code==0){
                //                             publicObj.openDingdingPopup("审批结果已提交",null,null,function(){
                //                                 publicObj.goBack();
                //                             })
                //                         }
                //                     },
                //                     error:function(_error){}
                //                 });
                //             }
                //         },
                //         error:function(_data){}
                //     });
                // }
            });
        }

        //已审批，待拍发票
        function spPassView(){
            $("#reimState").text("已审批");
            $(".reimbursementTip").text("审批已通过，请及时填写尿素信息");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#ddh").val(reimbursementInfo.kilometre);
            $("#nssl").val(reimbursementInfo.apply);
            // $("#je").val(reimbursementInfo.money);
            $("#chsl").val(reimbursementInfo.stock);
            $("#yxgm").val(reimbursementInfo.allow);
            $("#yxgm").attr("readonly","readonly");
            $(".allow").show();
            // $(".type-2").show();
            // $(".type7").hide();
            $(".type1Input").attr("readonly","");
            $(".bxinput").removeAttr("readonly");
            $("#sjLocation").text(reimbursementInfo.location);

            $(".type7").show(0,function(){
                $("#nszp,#fpzp").css("display","inline-block");
            });
            getSpList();
            $(".spBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审批人：</span><span class="companyName">'+reimbursementInfo.batchName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已审批</span></div></div>');

            $("#nszp").click(function(_event){
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
                        $("#nszp").before($thisImg);
                    }
                });
            });

            $("#fpzp").click(function(_event){
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
                        $("#fpzp").before($thisImg);
                    }
                });
            });

            //提交
            $(".submitBtn").on("click",function(){
                var money = $("#je").val();
                var img1Array = $("#nszp").siblings(".photo1");
                var img2Array = $("#fpzp").siblings(".photo1");
                var $this = $(this);
                if(money.length>0&&img1Array.length>0&&img2Array.length>0){
                    console.log("都填写了");
                    console.log(img1Array);
                    console.log(img2Array);

                    var ureaMark = [],invoiceMark = [];
                    img1Array.each(function(_i){
                        ureaMark.push($(this).find("img").attr("src"));
                    });
                    img2Array.each(function(_i){
                        invoiceMark.push($(this).find("img").attr("src"));
                    });

                    $this.off("click");
                    $.ajax(saveUrl,{
                        data:JSON.stringify({id:id,declarationUserId:userInfo.id,orderNum:$("#ddh").val(),plateNumber:$("#cph").val(),remark:$("#nssl").val(),money:money,ureaMark:JSON.stringify(ureaMark),invoiceMark:JSON.stringify(invoiceMark),declarationTime:Math.ceil(new Date().getTime()/1000),state:3}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销单审核申请已提交",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });



                }else{
                    publicObj.openDingdingPopup("请填写报销金额并上传尿素和发票照片后提交");
                }
            });

        }

        //审批未通过重新填写函数
        function spNoPassView(){
            $("#reimState").text("报销单作废");
            $(".reimbursementTip").text("审批未通过");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#ddh").val(reimbursementInfo.kilometre);
            $("#nssl").val(reimbursementInfo.apply);
            // $("#je").val(reimbursementInfo.money);
            $("#chsl").val(reimbursementInfo.stock);
            $("#sjLocation").text(reimbursementInfo.location);
            // $("#yxgm").val(reimbursementInfo.allow)
            // $(".allow").show();
            // $(".type-2").show();
            // $(".type7").hide();

            getSpList();

            $(".submitBtn").on("click",function(_event){
                var $array = $("#cph,#ddh,#nssl");
                var isFall = true;
                var $this = $(this);
                console.log($array);
                for(var i=0;i< $array.length;i++ ){
                    if($array.eq(i).val().length<=0){
                        isFall = false;
                    }
                }

                if(isFall){
                    $this.off("click");
                    $.ajax(saveUrl,{
                        data:JSON.stringify({id:id,declarationUserId:userInfo.id,orderNum:$("#ddh").val(),plateNumber:$("#cph").val(),remark:$("#nssl").val(),money:"",invoiceMark:"",declarationTime:Math.ceil(new Date().getTime()/1000),state:0}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销单审批申请已提交",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });
                }else{
                    publicObj.openDingdingPopup("请填写全部信息后提交");
                }
            });

        }

        //	重新填写页面数据函数
        function reviewPageView(){
            $("#reimState").text("待修改");
            $(".reimbursementTip").text("报销单未通过，请及时修改报销信息");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $(".type1Input").attr("readonly","readonly");
            $(".bxinput").removeAttr("readonly");

            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                var $img1 = $("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                $img1.click(function(_event){
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
                $("#fpzp").parent().prepend($img1);
            }

            var img2Array = JSON.parse(reimbursementInfo.ureaMark);
            for(var j in img2Array){
                var $img2 = $("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                $img2.click(function(_event){
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
                $("#nszp").parent().prepend($img2)
            }

            getSpList();
            getExamineList();

            $(".spBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审批人：</span><span class="companyName">'+reimbursementInfo.batchName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已审批</span></div></div>');

            $(".type-1").show(0,function(){
                $(".add").css("display","inline-block");
            });


            $("#nszp").click(function(_event){
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
                        $("#nszp").before($thisImg);
                    }
                });
            });

            $("#fpzp").click(function(_event){
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
                        $("#fpzp").before($thisImg);
                    }
                });
            });


            //	设置提交按钮点击事件
            $(".submitBtn").on("click",function(_event){
                var money = $("#je").val();
                var img1Array = $("#nszp").siblings(".photo1");
                var img2Array = $("#fpzp").siblings(".photo1");
                var $this = $(this);
                if(money.length>0&&img1Array.length>0&&img2Array.length>0){
                    console.log("都填写了");
                    console.log(img1Array);
                    console.log(img2Array);

                    var ureaMark = [],invoiceMark = [];
                    img1Array.each(function(_i){
                        ureaMark.push($(this).find("img").attr("src"));
                    });
                    img2Array.each(function(_i){
                        invoiceMark.push($(this).find("img").attr("src"));
                    });

                    $this.off("click");
                    $.ajax(saveUrl,{
                        data:JSON.stringify({id:id,declarationUserId:userInfo.id,orderNum:$("#ddh").val(),plateNumber:$("#cph").val(),remark:$("#nssl").val(),money:money,ureaMark:JSON.stringify(ureaMark),invoiceMark:JSON.stringify(invoiceMark),declarationTime:Math.ceil(new Date().getTime()/1000),state:1}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销单审核申请已提交",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });



                }else{
                    publicObj.openDingdingPopup("请填写报销金额并上传尿素和发票照片后提交");
                }
            });

        }

        //寄回发票信息函数
        function process2(){
            $("#reimState").text("待报销");
            $(".reimbursementTip").text("报销单已通过，请及时选择报销方式");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $(".type1Input").attr("readonly","");
            $("#sjLocation").text(reimbursementInfo.location);

            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $(".invoice .photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }
            $(".invoice .photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });
            getExamineList();
            $(".examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".type2").show(0,function(){
                $(".uploadPhotoBtn").css("display","inline-block");
            });

            $(".modeA").click(function(_event){
                $(".modeA>i").addClass("public-iconRadioSelected");
                $(".modeA>i").removeClass("public-iconRadio");
                $(".modeB>i").addClass("public-iconRadio");
                $(".modeB>i").removeClass("public-iconRadioSelected");
                $(".listBox.uploadPhoto").hide();
            });

            $(".modeB").click(function(_event){
                $(".modeB>i").addClass("public-iconRadioSelected");
                $(".modeB>i").removeClass("public-iconRadio");
                $(".modeA>i").addClass("public-iconRadio");
                $(".modeA>i").removeClass("public-iconRadioSelected");
                $(".listBox.uploadPhoto").show();
            });

            //上传单号照片
            $(".uploadPhotoBtn").click(function(_event){
                publicObj.uploadImage(function(_imgArray){
                    for(var i in _imgArray){
                        $(".listBox.uploadPhoto .photoBox").append("<div class='photo1'><img src='"+_imgArray[i]+"' style='height: 100%' /></div>");
                    }
                    $(".listBox.uploadPhoto .photoBox>.photo1").click(function(_event){
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
                });
            });

            //    提交按钮
            $(".submitBtn").on("click",function(_event){
                var $this = $(this);
                if($(".modeB>i").hasClass("public-iconRadioSelected")){
                    if(($("#kddh").val().length<=0||$(".listBox.uploadPhoto .photoBox>.photo1").length<=0)){
                        publicObj.openDingdingPopup("请填写运单号并拍照后再提交");
                    }else{
                        var imgArray = [];
                        for(var j=0;j<$(".listBox.uploadPhoto .photoBox>.photo1>img").length;j++){
                            imgArray.push($(".listBox.uploadPhoto .photoBox>.photo1>img").eq(j).attr("src"))
                        }
                        $this.off("click");
                        $.ajax( saveUrl,{
                            data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:3,reimbursementType:1,courierNumber:$("#kddh").val(),courierMark:JSON.stringify(imgArray)}),
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("报销方式提交成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }
                }else{
                    $this.off("click");
                    $.ajax(saveUrl,{
                        data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:3,reimbursementType:0}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销方式提交成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });
                }

            });
        }

        //   等待打款信息函数
        function process3(){
            $("#reimState").text("待打款");
            $(".reimbursementTip").text("报销单发票已寄出，请及时打款");

            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
                var array = JSON.parse(sessionStorage.getItem("user_job"));
                console.log(array);
                for(var j in array){
                    if(array[j].role.indexOf("Finance")>-1){
                        $("#dkqrr").text(userInfo.name);
                    }
                }
            });

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
            
            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $("#chsl").val(reimbursementInfo.stock);
            $("#yxgm").val(reimbursementInfo.allow);
            $("#sjLocation").text(reimbursementInfo.location);
            $("#yxgm").attr("readonly","readonly");
            $(".allow").show();
            $(".type3").show();
            $(".type1Input").attr("readonly","");
            var role=1;
            $.each(userJob, function (i, el) {
                if (el.role == "bridgeDriver" || el.role == "ureaDriver" || el.role == "stayDriver") {
                    role = 1;
                    return false;
                }
                else {
                    role = 2;
                }
            })
            if(role == 2){
                if (reimbursementInfo.reimbursementType != "" && reimbursementInfo.reimbursementType != null && reimbursementInfo.reimbursementType != undefined) {
                    // $(".bxfs").hide()
                }
                else {
                    console.log(reimbursementInfo.reimbursementType)
                    $(".mode").hide();
                    $(".bxfs").hide();
                    // $(".caiwu").append("<div class='cuidan'>催寄发票</div>")
                }
            }
            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $("#fpzp").parent().append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }

            var img2Array = JSON.parse(reimbursementInfo.ureaMark);
            for(var j in img2Array){
                $("#nszp").parent().append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>")
            }

            // $(".invoice .photoBox>.photo1").click(function(_event){
            //     var thisBtn = $(this);
            //     publicObj.previewImage(thisBtn.find("img").attr("src"));
            // });

            getSpList();
            getExamineList();
            $(".spBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审批人：</span><span class="companyName">'+reimbursementInfo.batchName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已审批</span></div></div>');
            $(".examineBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');
            
           
            $(".colorWarning").removeClass("colorWarning");

            // //判断快递方式是什么
            // switch(reimbursementInfo.reimbursementType){
            //     case 0:
            //         $(".modeA>i").removeClass("public-iconRadio");
            //         $(".modeA>i").addClass("public-iconRadioSelected");
            //         $(".modeB>i").removeClass("public-iconRadioSelected");
            //         $(".modeB>i").addClass("public-iconRadio");
            //         $("#kddh").hide();
            //         $(".listBox>.uploadPhotoBtn").hide();
            //         break;
            //     case 1:
            //         $(".modeB>i").removeClass("public-iconRadio");
            //         $(".modeB>i").addClass("public-iconRadioSelected");
            //         $(".modeA>i").removeClass("public-iconRadioSelected");
            //         $(".modeA>i").addClass("public-iconRadio");
            //         $("#kddh").val(reimbursementInfo.courierNumber);
            //         $("#kddh").attr("readonly","");
            //         var img2Array = JSON.parse(reimbursementInfo.courierMark);
            //         for(var j in img2Array){
            //             $(".listBox .photoBox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
            //         }
            //         break;
            // }

            $(".photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });
            $("#dksj").val(new Date().Format("yyyy-MM-dd"));
            $("#dksj").attr("disabled", 'disabled');
            // $("#dksj").click(function(_event){
            //     var $this = $(this);
            //     publicObj.selectTime(function(_result){
            //         var myDate = new Date();
            //         myDate.setTime(_result.chosen);
            //         $this.val(myDate.Format("yyyy-MM-dd"));
            //         $this.attr("data-date",Math.ceil(_result.chosen/1000));
            //     });
            // });
            $(".examineBox").hide()//审核
            $(".confirm").on("click",function(_event){
                console.log($("#payType").val());
                var $this = $(this);
                if($("#payType").val().length>0&&$("#skzh").val().length>0&&$("#dksj").val().length>0){
                    var encodeHtml = encodeURIComponent(publicObj.getAllHtml());
                    $this.off("click");
                    $.ajax( saveUrl,{
                        //  data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:8,financeUserId:userJobInfo.structureUserId,financeTime:Math.ceil(new Date().getTime()/1000),receivablesName:"noUser",receivablesType:$("#payType").val(),receivablesAccount:$("#skzh").val(),receivablesTime:$("#dksj").attr("data-date")}),
                        data: JSON.stringify({ id: id, declarationUserId: reimbursementInfo.declarationUserId, state: 8, financeUserId: userJobInfo.structureUserId,financeTime:Math.ceil(new Date().getTime()/1000),receivablesName:"noUser",receivablesType:$("#payType").val(),receivablesAccount:$("#skzh").val(),receivablesTime:$("#dksj").attr("data-date")}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销单流转完成",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });
                }else{
                    publicObj.openDingdingPopup("请完善信息后再点击确认打款");
                }
            });
        }

        //	完成打款函数
        function finishView1(){
            $("#reimState").text("已打款");
            $(".reimbursementTip").text("报销单已打款");
            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });


            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000);
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $("#nssl").val(reimbursementInfo.remark);
            $(".type1Input").attr("readonly","");
            $("#yxgm").val(reimbursementInfo.allow);
            $("#yxgm").attr("readonly","readonly");
            $("#chsl").val(reimbursementInfo.stock);
            $(".allow").show();
            $("#dkqrr").text(reimbursementInfo.financeName);
            // $("#skr").val(reimbursementInfo.receivablesName);
            $("#payType").val(reimbursementInfo.receivablesType);
            $("#payType>option").removeAttr("selected");
            $("#payType>option[value='"+reimbursementInfo.receivablesType+"']").attr("selected","selected");
            $("#skzh").val(reimbursementInfo.receivablesAccount);
            var myDate = new Date();
            myDate.setTime(reimbursementInfo.receivablesTime*1000);
            $("#dksj").attr("data-date",reimbursementInfo.receivablesTime);
            $("#dksj").val(myDate.Format("yyyy-MM-dd"));
            $("#skzh,#dksj").attr("readonly","");
            $("#payType").attr("disabled","disabled");
            $("#sjLocation").text(reimbursementInfo.location);


            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $(".fpbox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }

            var img2Array = JSON.parse(reimbursementInfo.ureaMark);
            for(var j in img2Array){
                $(".nsbox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>")
            }
            //初始化确认照片
            var img3Array = JSON.parse(reimbursementInfo.financeMark);
            for(var k in img3Array){
                $(".cwPic .photoBox").append("<div class='photo1'><img src='"+SERVER_URL+img3Array[k]+"' style='height: 100%' /></div>")
            }
            //显示
            $(".cwPic").show();

            $(".photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });



            switch(reimbursementInfo.reimbursementType){
                case 2:
                    $(".modeA>i").removeClass("public-iconRadio");
                    $(".modeA>i").addClass("public-iconRadioSelected");
                    $(".modeB>i").removeClass("public-iconRadioSelected");
                    $(".modeB>i").addClass("public-iconRadio");
                    $("#kddh").hide();
                    $(".listBox>.uploadPhotoBtn").hide();
                    break;
                case 1:
                    $(".modeB>i").removeClass("public-iconRadio");
                    $(".modeB>i").addClass("public-iconRadioSelected");
                    $(".modeA>i").removeClass("public-iconRadioSelected");
                    $(".modeA>i").addClass("public-iconRadio");
                    $("#kddh").val(reimbursementInfo.courierNumber);
                    $("#kddh").attr("readonly","");
                    var img2Array = JSON.parse(reimbursementInfo.courierMark);
                    for(var j in img2Array){
                        var $img3 = $("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                        $img3.click(function(_event){
                            var thisBtn = $(this);
                            publicObj.previewImage(thisBtn.find("img").attr("src"));
                        });
                        $(".listBox .photoBox").append($img3);
                    }

                    break;
            }
          
            $(".bxfs").css("pointer-events","none")
            getSpList();
            getExamineList();
            $(".spBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审批人：</span><span class="companyName">'+reimbursementInfo.batchName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已审批</span></div></div>');
            $(".examineBox .examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".type6").show();
            $(".examineBox").hide()//审核
            $(".colorWarning").removeClass("colorWarning");


        }

        //获取审批列表
        function getSpList(){
            $.get(getSPListUrl,{limit:50,page:1,ureaId:id,order:"ecs"},function(_data){
                console.log(_data);
                for(var i in _data.page.records){
                    var shtime = new Date();
                    shtime.setTime(_data.page.records[i].batchTime*1000);
                    var $div = $('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+_data.page.records[i].name+'</span></div><div class="listBox declarer"><span class="titleSm">审核时间：</span><span class="companyName">'+(shtime.getFullYear()+"/"+(shtime.getMonth()+1)+"/"+shtime.getDate()+" "+shtime.getHours()+":"+shtime.getMinutes()+":"+shtime.getSeconds())+'</span></div><div class="listBox declarer"><span class="titleSm">原因：</span><p class="companyName">'+_data.page.records[i].batchInfo+'</p></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">'+"未过审"+'</span></div></div>');
                    console.log($div);
                    $(".spBox .examineContent").prepend($div);
                }
            })
        }

        //	获取审核列表
        function getExamineList(){
            $.get(getExamineListUrl,{limit:50,page:1,ureaId:id,order:"ecs"},function(_data){
                for(var i in _data.page.records){
                    var shtime = new Date();
                    shtime.setTime(_data.page.records[i].expenseTime*1000);
                    var $div = $('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+_data.page.records[i].name+'</span></div><div class="listBox declarer"><span class="titleSm">审核时间：</span><span class="companyName">'+(shtime.getFullYear()+"/"+(shtime.getMonth()+1)+"/"+shtime.getDate()+" "+shtime.getHours()+":"+shtime.getMinutes()+":"+shtime.getSeconds())+'</span></div><div class="listBox declarer"><span class="titleSm">原因：</span><p class="companyName">'+_data.page.records[i].expenseInfo+'</p></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">'+"未过审"+'</span></div></div>');
                    $(".examineBox .examineContent").prepend($div);
                }
            });
        }

    }
};


