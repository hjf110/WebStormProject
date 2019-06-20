function initPageMain() {
	var pontageObj = new Pontage();
    pontageObj.initPageView();
    sessionStorage.getItem("user_job");
    publicObj.reviewForRole();

	//性别选择样式
	$(".mode i").on("click", function() {
		$this = $(this);
		$(".mode i").removeClass("public-iconRadioSelected").addClass("public-iconRadio");
		$(".mode i").next().css("color", "#8E8E8E");
		$this.removeClass("public-iconRadio").addClass("public-iconRadioSelected");
		$this.next().css("color", "#606060");
	});

	function Pontage(){
		var updateOrSaveUrl = SERVER_URL + "ex/bridge/updateOrSave";	//提交申请单接口
		var getReimbursementInfoUrl = SERVER_URL + "ex/bridge/info/";		//获取报销单详情接口
		var getExamineListUrl = SERVER_URL + "ex/bridgeExpense/list";		//获取审核列表
		var saveExpenseUrl = SERVER_URL + "ex/bridgeExpense/save";
        var state = parseInt(publicObj.getUrlParameter("state"));
        var id = publicObj.getUrlParameter("id");
        var userInfo;
        var userJob = JSON.parse(sessionStorage.getItem("user_job"));
        var userJobInfo = JSON.parse(sessionStorage.getItem("user_jobInfo"));
        var flowId= parseInt(publicObj.getUrlParameter("flowId"));
        var thisObj = this;
        var reimbursementInfo;

        //根据state状态，初始化页面内容
        this.initPageView = function(){
        	switch(state){
				case -3:
					//申请页面初始化函数
                    step(0, 120, "#steps")//状态（0,1,2,3）
					initPontageApplyView();
					break;
                case -9:
                    //初始化函数
                    //initPontageApplyView();
                    break;
				case -2:
					break;
				case -1:
					//重新修改页面函数
                    step(0, 120, "#steps")//状态（0,1,2,3）
					reviewPageView();
					break;
				case 0:
					break;
				case 1:
					//审核页面
                    step(1, 120, "#steps")//状态（0,1,2,3）
					initPontageExamineView();
					break;
				case 2:
                    process2();
					break;
				case 3:
                    //寄发票
                    step(2, 120, "#steps")//状态（0,1,2,3）
                    process3();
					break;
				case 6:
                    step(4, 120, "#steps")//状态（0,1,2,3）
                    finishView1();
					break;
                case 8:
                    //寄发票
                    step(3, 120, "#steps")//状态（0,1,2,3）
                    finishView();
                    break;
				default:
					if(id){
                        getReimbursementInfo();
                    }
					break;
			}
		};

        //申请页面初始化函数
		function initPontageApplyView(){
		    // $(".invoice").hide();
			$("#reimState").text("申请");
			$(".reimbursementTip").text("填写申报信息后点击提交，提交给审核人审核");

			//填写用户信息
			publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
				$("#sjName").text(_userInfo.name);
			});

			$(".type-3").show(0,function(){
                $(".add").css("display","inline-block");
            });

			//设置上传发票照片按钮点击事件
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
				var $array = $("input.type1Input");
				var isFall = true;
				var $this = $(this);
				for(var i=0;i< $array.length;i++ ){
                    if($array.eq(i).val().length<=0){
                        isFall = false;
					}
				}
				//判断是否是单独寄发票state：-9
                if(state==-9){
                }
                else{
                    if(isFall&&$(".photoBox>*[class=photo1]").length>0){
                        var imgArray = [];
                        $(".invoice .photoBox .photo1 img").each(function(_i){
                            imgArray.push($(this).attr("src"));
                        });
                        $.each(userJob,function (i,el) {
                            if(el.role=="bridgeDriver"){
                                flowId=el.flowId;
                                return false;
                            }
                        })
                        var data = JSON.stringify( {isSend:1,declarationUserId:userJobInfo.structureUserId,orderNum:$("#ddh").val(),plateNumber:$("#cph").val(),money:$("#je").val(),invoiceMark:JSON.stringify(imgArray), declarationTime:Math.ceil(new Date().getTime()/1000),state:1,flowId:flowId})
                        // console.log(data,userInfo);
                        $this.off("click");
                        $.ajax(updateOrSaveUrl,{
                            data:data,
                            type:"post",
                            contentType:"application/json",
                            processData:false,
                            success:function(_data) {
                                if(_data.code==0){
                                    publicObj.openDingdingPopup("报销单申请成功",null,null,function(){
                                        publicObj.goBack();
                                    });
                                }
                            },
                            error:function(_error){}
                        });
                    }else{
                        publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
                    }
                }
			});

		};

		//报销单审核页面初始化函数
		function initPontageExamineView(){
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
			$(".type1Input").attr("readonly","");

			var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $(".photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }
            $(".invoice .photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });

            getExamineList();

            $(".type1").show();

			$(".passBtn").on("click",function(_event){
			    var $this = $(this);
                $this.off("click");
                $.ajax(updateOrSaveUrl,{
                    data:JSON.stringify( {id:id,state:3,declarationUserId:reimbursementInfo.declarationUserId,checkUserId:userJobInfo.structureUserId}),
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
                $this.off("click");
                publicObj.openDingdingPrompt("请填写不通过理由",null,"不通过",function(_value){
                    if(_value!=null&&_value.length>0){
                        $.ajax(saveExpenseUrl,{
                            type:"post",
                            data:JSON.stringify({bridgeId:id,addTime:Math.ceil(new Date().getTime()/1000),expenseUserId:userJobInfo.structureUserId,expenseInfo:_value}),
                            contentType:"application/json",
                            processData:false,
                            success:function(_data){
                                if(_data.code==0){
                                    $.ajax(updateOrSaveUrl,{
                                        data:JSON.stringify( {id:id,state:-1,declarationUserId:reimbursementInfo.declarationUserId,checkUserId:userJobInfo.structureUserId}),
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
                    }else{
                        publicObj.openDingdingPopup("不通过理由不能为空")
                    }
                });

                // if($("#noReason").val().length<=0){
            		// publicObj.openDingdingPopup("请填写不通过理由")
				// }else{
				// 	$.ajax(saveExpenseUrl,{
				// 		type:"post",
				// 		data:JSON.stringify({bridgeId:id,addTime:Math.ceil(new Date().getTime()/1000),expenseUserId:userJobInfo.structureUserId,expenseInfo:$("#noReason").val()}),
                 //        contentType:"application/json",
                 //        processData:false,
				// 		success:function(_data){
				// 			if(_data.code==0){
                 //                $.ajax(updateOrSaveUrl,{
                 //                    data:JSON.stringify( {id:id,state:-1,declarationUserId:reimbursementInfo.declarationUserId,checkUserId:userJobInfo.structureUserId}),
                 //                    type:"post",
                 //                    contentType:"application/json",
                 //                    processData:false,
                 //                    success:function(_data2) {
                 //                        if(_data2.code==0){
                 //                            publicObj.openDingdingPopup("审核结果已提交",null,null,function(){
                 //                                publicObj.goBack();
                 //                            })
                 //                        }
                 //                    },
                 //                    error:function(_error){}
                 //                });
				// 			}
				// 		},
				// 		error:function(_data){}
                 //    });
				// }
            });
		}

	//	根据id获取报销单数据
		function getReimbursementInfo(){
			$.get(getReimbursementInfoUrl+id,{},function(_data){
                reimbursementInfo = _data.data;
                 state= reimbursementInfo.state;
                thisObj.initPageView();
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

            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                var $thisImg1 = $("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                $thisImg1.click(function(_event){
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
                $(".photoBox").prepend($thisImg1);
            }

            getExamineList();

            $(".type-1").show(0,function(){
                $(".add").css("display","inline-block");
            });

            //设置上传发票照片按钮点击事件
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
                var $array = $("input.type1Input");
                var isFall = true;
                for(var i=0;i< $array.length;i++ ){
                    if($array.eq(i).val().length<=0){
                        isFall = false;
                    }
                }
                if(isFall&&$(".photoBox>*[class=photo1]").length>0){
                    var imgArray = [];
                    $(".invoice .photoBox .photo1 img").each(function(_i){
                        imgArray.push($(this).attr("src"));
                    });
                    $this.off("click");
                    $.ajax(updateOrSaveUrl,{
                        data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,orderNum:$("#ddh").val(),plateNumber:$("#cph").val(),money:$("#je").val(),invoiceMark:JSON.stringify(imgArray),declarationTime:Math.ceil(new Date().getTime()/1000),state:1}),
                        type:"post",
                        contentType:"application/json",
                        processData:false,
                        success:function(_data) {
                            if(_data.code==0){
                                publicObj.openDingdingPopup("报销单修改成功",null,null,function(){
                                    publicObj.goBack();
                                });
                            }
                        },
                        error:function(_error){}
                    });
                }else{
                    publicObj.openDingdingPopup("请填写全部信息并上传照片后提交");
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
            console.log(userInfo);
            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $(".type1Input").attr("readonly","");

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
                        $.ajax(updateOrSaveUrl,{
                            data:JSON.stringify( {id:id,company:userJob[0].companyKey,declarationUserId:reimbursementInfo.declarationUserId,state:3,reimbursementType:1,courierNumber:$("#kddh").val(),courierMark:JSON.stringify(imgArray)}),
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
                    $.ajax(updateOrSaveUrl,{
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
            $(".reimbursementTip").text("报销单发票已审核，请及时打款");

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
            var role=1;
            $.each(userJob,function (i,el) {
                if(el.role=="bridgeDriver"||el.role=="ureaDriver"||el.role=="stayDriver"){
                    role=1;
                    return false;
                }
                else{
                    role=2;
                }
            })
            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000)
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $(".type1Input").attr("readonly","");

            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                $(".invoice .photoBox").append("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
            }

            getExamineList();
            $(".examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".type3").show();
            $(".colorWarning").removeClass("colorWarning");
            //判断角色1是司机，2是财务
            if(role==1){
                $(".type2").show(0,function(){
                    $(".uploadPhotoBtn").css("display","inline-block");
                });
                //判断是否已经寄出发票
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                $(".listBox .photoBox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none")
                }
                else{
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
                                $.ajax(updateOrSaveUrl,{
                                    data:JSON.stringify( {isSend:2,id:id,reimbursementType:1,courierNumber:$("#kddh").val(),courierMark:JSON.stringify(imgArray)}),
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
                            $.ajax(updateOrSaveUrl,{
                                data:JSON.stringify( {id:id,reimbursementType:2}),
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
                $("#skzh").attr("disabled",'disabled');
                $("#dksj").attr("disabled",'disabled');
            }
            else if(role==2){
                $("#dksj").val(new Date().Format("yyyy-MM-dd"));
                $("#dksj").attr("disabled",'disabled');
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                $(".listBox .photoBox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none")
                }
                else{
                    $(".mode").hide();
                    $(".bxfs").hide();
                    $(".caiwu").append("<div class='cuidan'>催寄发票</div>")
                }
            }

            $(".photoBox>.photo1").click(function(_event){
                var thisBtn = $(this);
                publicObj.previewImage(thisBtn.find("img").attr("src"));
            });

            $(".confirm").on("click",function(_event){
                console.log($("#payType").val());
                var $this = $(this);
            	if($("#payType").val().length>0&&$("#skzh").val().length>0&&$("#dksj").val().length>0){
                    var encodeHtml = encodeURIComponent(publicObj.getAllHtml());
                    $this.off("click");
                    $.ajax(updateOrSaveUrl,{
                        data:JSON.stringify( {id:id,declarationUserId:reimbursementInfo.declarationUserId,state:8,financeUserId:userJobInfo.structureUserId,financeTime:Math.ceil(new Date().getTime()/1000),receivablesName:"noUser",receivablesType:$("#payType").val(),receivablesAccount:$("#skzh").val(),receivablesTime:$("#dksj").attr("data-date"),htmlBody:encodeHtml}),
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
            $(".cuidan").click(function(_event){
                $.ajax(SERVER_URL + "ex/bridge/noticeDriver",{
                    data:JSON.stringify( {id:id}),
                    type:"post",
                    contentType:"application/json",
                    processData:false,
                    success:function(_data) {
                        if(_data.code==0){
                            publicObj.openDingdingPopup("已催单",null,null,function(){
                                publicObj.goBack();
                            });
                        }
                    },
                    error:function(_error){}
                });
            });
		}

	//	完成打款函数状态8,
		function finishView(){
		    $(".confirm").hide();
            // $(".caiwu").append("<div class='done'>完成</div>")
            $("#reimState").text("已打款");
            $(".reimbursementTip").text("报销单已打款");
			//填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });
            var role=1;
            $.each(userJob,function (i,el) {
                if(el.role=="bridgeDriver"||el.role=="ureaDriver"||el.role=="stayDriver"){
                    role=1;
                    return false;
                }
                else{
                    role=2;
                }
            })

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000);
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $(".type1Input").attr("readonly","");

            $("#dkqrr").text(reimbursementInfo.financeName);
            // $("#skr").val(reimbursementInfo.receivablesName);
            $("#payType").val(reimbursementInfo.receivablesType);
            $("#payType>option").removeAttr("selected");
            $("#payType>option[value='"+reimbursementInfo.receivablesType+"']").attr("selected","selected");
            $("#skzh").val(reimbursementInfo.receivablesAccount);
            var myDate = new Date();
            myDate.setTime(reimbursementInfo.financeTime*1000);
            $("#dksj").attr("data-date",reimbursementInfo.financeTime);
            $("#dksj").val(myDate.Format("yyyy-MM-dd"));
            $("#skzh,#dksj").attr("readonly","");
            $("#payType").attr("disabled","disabled");

            $(".type6").show();
            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                var $img2 = $("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                $img2.click(function(_event){
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });
                $(".invoice .photoBox").append($img2);
            }

            if(role==1){
                $(".type2").show(0,function(){
                    $(".uploadPhotoBtn").css("display","inline-block");
                });
                //判断是否已经寄出发票
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                $(".listBox .photoBox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none")
                }
                else{
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
                                $.ajax(updateOrSaveUrl,{
                                    data:JSON.stringify( {isSend:2,id:id,reimbursementType:1,courierNumber:$("#kddh").val(),courierMark:JSON.stringify(imgArray)}),
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
                            $.ajax(updateOrSaveUrl,{
                                data:JSON.stringify( {id:id,reimbursementType:2}),
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
                $("#skzh").attr("disabled",'disabled');
                $("#dksj").attr("disabled",'disabled');
            }
            else if(role==2){
                $(".caiwu").show()
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                $(".listBox .photoBox").append("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none");
                    $(".confirm").hide();
                    //寄送发票按钮初始化
                    $(".caiwu2").append("<div class='down'>已收发票并完成</div>").show();
                    $(".down").on("click",function(_event){
                        var $this = $(this);
                        var imgArray = [];
                        for(var j=0;j<$(".cwPic .photoBox>.photo1>img").length;j++){
                            imgArray.push($(".cwPic .photoBox>.photo1>img").eq(j).attr("src"))
                        }
                        var strText = JSON.stringify(imgArray);
                        console.log(strText);
                        $this.off("click");
                        $.ajax(updateOrSaveUrl,{
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
                else{
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    //$(".mode").css("pointer-events","none")
                    $(".mode").hide();
                    $(".bxfs").hide();
                    $(".caiwu").append("<div class='cuidan'>催寄发票</div>")
                }
            }
            // $(".done").click(function(_event){
            //     $.ajax(updateOrSaveUrl,{
            //         data:JSON.stringify( {isSend:3,id:id,declarationUserId:reimbursementInfo.declarationUserId,state:6,financeUserId:userJobInfo.structureUserId,financeTime:Math.ceil(new Date().getTime()/1000),receivablesName:"noUser",receivablesType:$("#payType").val(),receivablesAccount:$("#skzh").val(),receivablesTime:Math.ceil(new Date().getTime()/1000)}),
            //         type:"post",
            //         contentType:"application/json",
            //         processData:false,
            //         success:function(_data) {
            //             if(_data.code==0){
            //                 publicObj.openDingdingPopup("已完成",null,null,function(){
            //                     publicObj.goBack();
            //                 });
            //             }
            //         },
            //         error:function(_error){}
            //     });
            // });
            getExamineList();
            $(".examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".colorWarning").removeClass("colorWarning");
            $(".cuidan").click(function(_event){
                $.ajax(SERVER_URL + "ex/bridge/noticeDriver",{
                    data:JSON.stringify( {id:id}),
                    type:"post",
                    contentType:"application/json",
                    processData:false,
                    success:function(_data) {
                        if(_data.code==0){
                            publicObj.openDingdingPopup("已催单",null,null,function(){
                                publicObj.goBack();
                            });
                        }
                    },
                    error:function(_error){}
                });
            });

        }
        //状态6
        function finishView1(){
            $(".confirm").hide();
            $(".submitBtn").hide();
            $(".uploadPhotoBtn").hide();
            $("#reimState").text("已完成");
            $(".reimbursementTip").text("报销单已打款");
            //填写用户信息
            publicObj.getUserInfo(null,function(_userInfo){
                userInfo = _userInfo;
            });
            var role=1;
            $.each(userJob,function (i,el) {
                if(el.role=="bridgeDriver"||el.role=="ureaDriver"||el.role=="stayDriver"){
                    role=1;
                    return false;
                }
                else{
                    role=2;
                }
            })

            //初始化申报单信息
            var time = new Date();
            time.setTime(reimbursementInfo.declarationTime*1000);
            $(".applyBox .detailedTime").text(time.getFullYear()+"/"+(time.getMonth()+1)+"/"+time.getDate()+" "+time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());

            console.log(reimbursementInfo);
            $("#ddh").val(reimbursementInfo.orderNum);
            $("#cph").val(reimbursementInfo.plateNumber);
            $("#je").val(reimbursementInfo.money);
            $("#sjName").text(reimbursementInfo.driverName);
            $(".type1Input").attr("readonly","");

            $("#dkqrr").text(reimbursementInfo.financeName);
            // $("#skr").val(reimbursementInfo.receivablesName);
            $("#payType").val(reimbursementInfo.receivablesType);
            $("#payType>option").removeAttr("selected");
            $("#payType>option[value='"+reimbursementInfo.receivablesType+"']").attr("selected","selected");
            $("#skzh").val(reimbursementInfo.receivablesAccount);
            var myDate = new Date();
            myDate.setTime(reimbursementInfo.financeTime*1000);
            $("#dksj").attr("data-date",reimbursementInfo.financeTime);
            $("#dksj").val(myDate.Format("yyyy-MM-dd"));
            $("#skzh,#dksj").attr("readonly","");
            $("#payType").attr("disabled","disabled");

            $(".type6").show();
            var imgArray = JSON.parse(reimbursementInfo.invoiceMark);
            for(var i in imgArray){
                var $img2 = $("<div class='photo1'><img src='"+imgArray[i]+"' style='height: 100%' /></div>");
                $img2.click(function(_event){
                    var thisBtn = $(this);
                    publicObj.previewImage(thisBtn.find("img").attr("src"));
                });
                $(".invoice .photoBox").append($img2);
            }

            if(role==1){
                $(".type2").show(0,function(){
                    $(".uploadPhotoBtn").css("display","inline-block");
                });
                //判断是否已经寄出发票
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                var $item1 = $("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                                $item1.click(function(_event){
                                    publicObj.previewImage($item1.find("img").attr("src"));
                                });
                                $(".listBox .photoBox").append($item1);
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none")
                }
                else{
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
                                $.ajax(updateOrSaveUrl,{
                                    data:JSON.stringify( {id:id,reimbursementType:1,courierNumber:$("#kddh").val(),courierMark:JSON.stringify(imgArray)}),
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
                            $.ajax(updateOrSaveUrl,{
                                data:JSON.stringify( {id:id,reimbursementType:2}),
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
                $("#skzh").attr("disabled",'disabled');
                $("#dksj").attr("disabled",'disabled');
            }
            else if(role==2){
                if(reimbursementInfo.reimbursementType!=""&&reimbursementInfo.reimbursementType!=null&&reimbursementInfo.reimbursementType!=undefined){
                    switch(reimbursementInfo.reimbursementType){
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
                            $("#kddh").attr("readonly","");
                            var img2Array = JSON.parse(reimbursementInfo.courierMark);
                            for(var j in img2Array){
                                var item2 = $("<div class='photo1'><img src='"+img2Array[j]+"' style='height: 100%' /></div>");
                                item2.click(function(_event){
                                    publicObj.previewImage(item2.find("img").attr("src"));
                                });
                                $(".listBox .photoBox").append(item2);
                            }
                            break;
                    }
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    $(".mode").css("pointer-events","none")
                    $(".confirm").hide()
                }
                else{
                    $(".uploadPhotoBtn").hide();
                    $(".submitBtn").hide();
                    //$(".mode").css("pointer-events","none")
                    $(".mode").hide();
                    $(".bxfs").hide();
                    $(".caiwu").append("<div class='cuidan'>催寄发票</div>")
                }
            }
            getExamineList();
            $(".examineContent").append('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+reimbursementInfo.checkName+'</span></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">已过审</span></div></div>');

            $(".colorWarning").removeClass("colorWarning");

            //显示已收发票照片
            $(".cwPic").show();
            var img3Array = JSON.parse(reimbursementInfo.financeMark);
            for(var k in img3Array){
                var $item3 = $("<div class='photo1'><img src='"+ SERVER_URL+ img3Array[k]+"' style='height: 100%' /></div>");
                $item3.click(function(_event){
                    var $this = $(this);
                    publicObj.previewImage($this.find("img").attr("src"));
                });
                $(".cwPic .photoBox").append($item3);
            }

        }
	//	获取审核列表
		function getExamineList(){
			$.get(getExamineListUrl,{limit:50,page:1,bridgeId:id,order:"ecs"},function(_data){
				for(var i in _data.data.records){
					var shtime = new Date();
                    shtime.setTime(_data.data.records[i].addTime*1000);
					var $div = $('<div style="border-bottom: 1px solid #eeeeee;margin: 10px 0;position: relative;"><div class="listBox company" style="display: none"><span class="titleSm">审核单位：</span><span class="companyName">A公司</span></div><div class="listBox declarer"><span class="titleSm">审核人：</span><span class="companyName">'+_data.data.records[i].name+'</span></div><div class="listBox declarer"><span class="titleSm">审核时间：</span><span class="companyName">'+(shtime.getFullYear()+"/"+(shtime.getMonth()+1)+"/"+shtime.getDate()+" "+shtime.getHours()+":"+shtime.getMinutes()+":"+shtime.getSeconds())+'</span></div><div class="listBox declarer"><span class="titleSm">原因：</span><p class="companyName">'+_data.data.records[i].expenseInfo+'</p></div><div class="examineStateBox"><i class="public-icon public-iconBlue"></i><span class="examineState">'+(_data.data.records[i].expenseInfo.length>0?"未过审":"已过审")+'</span></div></div>');
					$(".examineContent").prepend($div);
				}
			});
		}

	}

};
