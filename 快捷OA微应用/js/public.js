"use strict";

var DINGDING_URL = "https://oapi.dingtalk.com/";      //获取信息的钉钉地址
//var SERVER_URL = "http://kuaijieoa.qwddefw.club:8080/armor/";      //服务器地址
var SERVER_URL = "http://148.70.208.141:8080/armor/";      //服务器地址sss  原地址：http://oa.4008882662.cn:8080/armor/   47.99.154.112


var publicObj;

$(document).ready(function(){
    publicObj = (function(){
        var userSignInUrl = SERVER_URL + "ex/user/CheckUserType";      //用户角色获取
        var CorpID = "ding94c0f1b64d7e846e35c2f4657eb6378f"; //企业标识di
        var AgentID = "198036373";      //应用id
        var CorpSecret = "SHTNdNrZhpKnv4VtjWQbVeClz5wS8Cqqk_XZgKhX3ufUzdjJsc3fTubbtwZuUx0n";      //秘钥
        var accessToken;
        var code;

        var thisPublicObj = new Public();

        function Public(){
            var getJSApiTicketsUrl = DINGDING_URL + "get_jsapi_ticket";      //获取jsticket
            var getTokenCodeUrl = SERVER_URL + "Login/GetTokenBycode";      //获取code
            var getDDTicketUrl = SERVER_URL + "ex/ding/GetJsApiTicketSign";     //获取jssdk的签名
            var getUserInfoUrl = SERVER_URL + "ex/user/GetUserByCode";       //获取用户数据

            // const getToken
            var accessToken;
            var layerIndex = 0;

            //初始化钉钉
            this.configDD = function(_data,_callBack){
                console.log(_data);
                CorpID =  _data.corpId;
                AgentID = _data.agentId;
                dd.config({
                    agentId: _data.agentId, // 必填，微应用ID
                    corpId: _data.corpId,//必填，企业ID
                    timeStamp: _data.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: _data.nonceStr, // 必填，生成签名的随机串
                    signature: _data.signature, // 必填，签名
                    jsApiList: [ 'runtime.info',
                        'biz.contact.choose',
                        'biz.util.scan',
                        'device.notification.confirm',
                        'device.notification.alert',
                        'device.notification.prompt',
                        'biz.ding.post',
                        'device.geolocation.get',
                        'biz.util.openLink',
                        'biz.util.uploadImage',
                        'biz.calendar.chooseInterval',
                        'biz.telephone.showCallMenu'] // 必填，需要使用的jsapi列表
                });
                if(typeof _callBack == "function"){
                    _callBack();
                }

            };

            //获取accessToken
            this.getAccessToken = function(_code,_callBack){
                if(accessToken){
                    _callBack(accessToken);
                }else{
                    $.get(getTokenCodeUrl,{code:_code},function(_data){
                        if(typeof _callBack == "function"){
                            // alert("getAccessToken:"+JSON.stringify(_data));
                            accessToken = _data.data;
                            _callBack(_data.data);
                        }
                    });
                }

                // accessToken = "KAI";
                // if(typeof _callBack == "function"){
                //     _callBack("KAI");
                // }
            };

            //获取静态的accessToken
            this.getStaticAccessToken = function(){
                return accessToken;
            };

            //获取code
            this.getDingDingCode = function(_callBack){
                dd.runtime.permission.requestAuthCode({
                    corpId: CorpID,
                    onSuccess: function(result) {
                        console.log(result);
                        code = result.code;
                        if(typeof _callBack == "function"){
                            _callBack(result);
                        }
                    },
                    onFail : function(err) {
                        alert("错误");
                    }
                });

            };

            //获取地理位置信息
            this.getUserPosition = function(_callBack){
                dd.device.geolocation.get({
                    targetAccuracy : 200,
                    coordinate : 1,
                    withReGeocode : true,
                    useCache:true, //默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess : function(result) {
                        if(typeof _callBack == "function"){
                            _callBack(result);
                        }
                    },
                    onFail : function(err) {
                        alert("获取位置失败");
                    }
                });

            };

            // 获取jsapi的ticket
            // this.getJSApiTicket = function(){
            //     $.get(getJSApiTicketsUrl,{access_token:accessToken},function(_data){
            //
            //     },"json");
            // }

            //    获取jssdk的签名
            this.getDDTicketSign = function(_callBack){
                $.post(getDDTicketUrl,{url:location.href},function(_data){
                    if(typeof _callBack == "function"){
                        _callBack(_data);
                    }
                });
            }

            //    开启钉钉弹窗
            this.openDingdingPopup = function(_message,_title,_bottomName,_callBack){
                dd.device.notification.alert({
                    message: _message!=null?_message:"",
                    title: _title!=null?_title:"提示",//可传空
                    buttonName: _bottomName!=null?_bottomName:"知道了",
                    onSuccess : function() {
                        /*回调*/
                        if(typeof _callBack == "function"){
                            _callBack();
                        }
                    },
                    onFail : function(err) {}
                });
            };

            // 开启输入框内容
            this.openDingdingPrompt = function(_message,_title,_bottomName,_callBack){
                dd.device.notification.prompt({
                    message: _message!=null?_message:"",
                    title: _title!=null?_title:"提示",
                    defaultText:"",
                    buttonLabels: ['取消', _bottomName!=null?_bottomName:"确定"],
                    onSuccess : function(result) {
                        switch(result.buttonIndex){
                            case 0://取消按钮
                                break;
                            case 1:
                                if(typeof _callBack == "function"){
                                    _callBack(result.value);
                                }
                                break;
                        }

                    },
                    onFail : function(err) {}
                });
            };

            //获取地理位置
            this.getLocationData = function(_callBack){
                dd.device.geolocation.get({
                    targetAccuracy : 100,
                    coordinate : 1,
                    withReGeocode : true,
                    useCache:false, //默认是true，如果需要频繁获取地理位置，请设置false
                    onSuccess : function(result) {
                        var realLocationData = result.location==null?result:result.location;
                        // 高德坐标 result 结构
                        if(typeof _callBack == "function"){
                            _callBack(realLocationData);
                        }
                    },
                    onFail : function(err) {}
                });
            };

            //    调用扫码
            this.openScavenging = function(_message,_callBack){
                dd.biz.util.scan({
                    type: "all" , // type 为 all、qrCode、barCode，默认是all。
                    tips: _message!=null?_message:"请扫码",  //进入扫码页面显示的自定义文案
                    onSuccess: function(data) {
                        //onSuccess将在扫码成功之后回调
                        /* data结构
                          { 'text': String}
                        */
                        if(typeof _callBack == "function"){
                            _callBack(data);
                        }
                    },
                    onFail : function(err) {
                        alert("调用扫一扫出错");
                    }
                })
            };

            //选择日期函数
            this.selectTime = function(_callBack){
                dd.biz.calendar.chooseOneDay({
                    default:new Date().getTime(),
                    onSuccess : function(_result) {
                        if(typeof _callBack == "function"){
                            _callBack(_result);
                        }
                    },
                    onFail : function(err) {}
                })
            };

            //选择日期区间函数
            this.chooseInterval = function(_callBackFun){
                dd.biz.calendar.chooseInterval({
                    defaultStart:new Date().getTime(),
                    defaultEnd:new Date().getTime()+(24*60*60*1000),
                    onSuccess : function(_result) {
                        //onSuccess将在点击确定之后回调
                        /*{
                            start: 1514908800000,
                            end: 1514995200000,
                            timezone:8
                        }
                        */
                        if(typeof _callBackFun == "function"){
                            _callBackFun(_result);
                        }
                    },
                    onFail : function(err) {}
                })
            };

            //    获取用户信息
            this.getUserInfo = function(_code,_callBack,_boolean){
                //如果缓存中有user_info，则用户信息直接从缓存中取
                if(!_boolean&&sessionStorage.getItem("user_info")&&sessionStorage.getItem("user_info").length>0){
                    if(typeof _callBack == "function"){
                        //console.log(JSON.parse(sessionStorage.getItem("user_info")));

                         _callBack(JSON.parse(sessionStorage.getItem("user_info")));
                    }
                }else{
                    $.get(getUserInfoUrl,{code:_code!=null?_code:code},function(_data){
                        console.log(_data);
                        sessionStorage.setItem("user_info",JSON.stringify(_data.data.user));

                        $.get(userSignInUrl,{userId:_data.data.user.userid,},function(_data2){
                            console.log(_data2);
                            if(parseInt(_data2.code)!=0){
                                publicObj.openDingdingPopup(_data2.msg);
                            }else{
                                sessionStorage.setItem("user_job",JSON.stringify(_data2.data.roleList));
                                sessionStorage.setItem("user_jobInfo",JSON.stringify(_data2.data.userInfo));
                                if(typeof _callBack == "function"){
                                    _callBack(_data.roleList);
                                }
                            }
                        });
                    });
                }
            };

            //    弹出加载层
            this.openLoadPopup = function(){
                // console.log(layer);
                // if(layer){
                //     layerIndex = layer.load(1, {
                //         shade: [0.1,'#fff'] //0.1透明度的白色背景
                //     });
                // }
            };

            //    关闭加载层
            this.closeLoadPopup = function(){
                // layer.close(layerIndex);
                // $("body").show();
            };

            //返回上一个页面
            this.goBack = function(){
                dd.biz.navigation.goBack({
                    onSuccess : function(result) {

                    },
                    onFail : function(err) {}
                })
            };

            //时间日期选择器
            this.datetimepicker = function(_callBack) {
                dd.biz.util.datetimepicker({
                    format: 'yyyy-MM-dd HH:mm',
                    value: new Date().Format("yyyy-MM-dd hh:mm"), //默认显示
                    onSuccess : function(_result) {
                        if(typeof _callBack == "function"){
                            _callBack(_result);
                        }
                    },
                    onFail : function(err) {}
                })
            };

            this.getUrlParameter = function(searchStr) {
                var urlParameterArray = {};
                $.each(location.search.replace("?", "").split("&"), function(i, e) {
                    var parameterItemArray = e.split("=");
                    urlParameterArray[parameterItemArray[0]] = parameterItemArray[1];
                });
                return urlParameterArray[searchStr];
            };

            //上传图片
            this.uploadImage = function(_callBack){
                dd.biz.util.uploadImage({
                    compression:false,//(是否压缩，默认为true压缩)
                    multiple: true, //是否多选，默认false
                    max: 5, //最多可选个数
                    quality: 50, // 图片压缩质量,
                    resize: 50, // 图片缩放率
                    stickers: {   // 水印信息
                    },
                    onSuccess : function(result) {
                        if(typeof _callBack == "function"){
                            _callBack(result);
                        }
                        //onSuccess将在图片上传成功之后调用
                        /*
                        [
                          'http://gtms03.alicdn.com/tps/i3/TB1VF6uGFXXXXalaXXXmh5R_VXX-237-236.png'
                        ]
                        */
                    },
                    onFail : function(err) {}
                })
            };

        //    手机电话拨打
            this.callPhone = function(_phoneNum,_isDingPhone){
                if(!_phoneNum){
                    return false;
                }
                dd.biz.telephone.showCallMenu({
                    phoneNumber: _phoneNum, // 期望拨打的电话号码
                    code: '+86', // 国家代号，中国是+86
                    showDingCall: _isDingPhone?true:false, // 是否显示钉钉电话
                    onSuccess : function() {},
                    onFail : function() {}
                })
            };

        //    阅览图片函数
            this.previewImage = function(_imageUrl){
                console.log(_imageUrl);
                dd.biz.util.previewImage({
                    urls: [_imageUrl],//图片地址列表
                    current: _imageUrl,//当前显示的图片链接
                    onSuccess : function(result) {
                        /**/
                    },
                    onFail : function(err) {}
                })
            }

        //    弹窗函数
            this.actionSheet = function(_obj){
                dd.device.notification.actionSheet({
                    title: _obj.title==null?"请选择": _obj.title, //标题
                    cancelButton:  _obj.cancelButton==null?'取消': _obj.cancelButton, //取消按钮文本
                    otherButtons: _obj.otherButtons==null?[]:_obj.otherButtons,
                    onSuccess : function(result) {
                        if(_obj.callback&&typeof _obj.callback == "function"){
                            _obj.callback(result);
                        }
                    },
                    onFail : function(err) {}
                })
            }

        //    根据角色并删除不必要的页面内容
            this.reviewForRole = function(){
                var userJob = JSON.parse(sessionStorage.getItem("user_job"));
                if(!userJob){   //没有的时候
                    console.log(JSON.parse(sessionStorage.getItem("user_info")));
                    $.get(userSignInUrl,{userId:JSON.parse(sessionStorage.getItem("user_info")).userid},function(_data){
                        if(parseInt(_data.code)!=0){
                            // publicObj.openDingdingPopup(_data.msg);
                            publicObj.openDingdingPopup("现有报销单状态您已无法查看",null,null,function(){
                                publicObj.goBack();
                            });
                        }else{
                            console.log(_data.data.job);
                            sessionStorage.setItem("user_job",JSON.stringify(_data.data.job));
                            publicObj.reviewForRole();
                        }

                    });
                }else{      //有的时候
                    console.log(userJob);
                    // console.log(userJob[0].jobKey);
                    // switch(userJob[0].jobKey){
                    // switch (userJob[0].role) {
                    $.each(userJob, function (index, item) {
                     switch (item.role){
                        case "bridgeDriver":
                        case "stayDriver":
                        case "faultDriver":
                        case "ureaDriver":
                            //审核、审批操作框内容删除
                            $(".examineContent>*").remove();

                            //确认打款按钮删除
                            $(".confirm").parent().remove();
                            break;
                        case "bridgeCheck":
                        case "stayCheck":
                        case "ureaCheck":
                            $(".add").remove();
                            $(".bxfs").remove();
                            $(".submitBtn").parent().remove();
                            $(".confirm").parent().remove();
                            $(".je").attr("readonly","readonly");
                            break;
                         case "ureaFinance":
                         case "stayFinance":
                         case "bridgeFinance":
                             $("#nszp,#fpzp").hide();
                             $(".submitBtn").parent().remove();
                             break;
                        case "ureaCount":

                            //审核、审批操作框内容删除
                            $(".examineContent").remove();

                            //确认打款按钮删除
                            $(".confirm,.submitBtn").parent().remove();

                            $("input").attr("readonly","readonly");
                            $("select").attr("disabled","disabled");
                            break;
                        case "faultDispatch":
                            $(".confirm,.submitBtn").parent().remove();
                            break;
                         case"ureaBatch":
                             $("#nszp").remove();
                             $("#fpzp").remove();
                             $(".submitBtn").remove();
                             $(".confirm").remove();
                             $("#je").attr("readonly","readonly");
                             // $(".payBox").remove();
                             break;
                         case "bridgeObserver":
                         case "stayObserver":
                         case "ureaObserver":
                         case "bridgeCount":
                         case "stayCount":
                         case "ureaCount":
                             $(".btnGroup").remove();
                             $(".add").remove();
                             break;
                    }
                })

            }
        }
            //获得整个网页静态html
            this.getAllHtml = function(){
                var $html = $("html").clone();
                $html.find("script").remove();
                $html.find("link").remove();
                $html.find(".confirm").remove();
                $html.find("select").each(function(_i){
                    var $this = $(this);
                    var val = $this.val();
                    $this.after("<span>"+val+"</span>");
                    $this.remove();
                });
                $html.find("input").each(function(_i){
                    var $this = $(this);
                    var val = $this.val();
                    $this.after("<span>"+val+"</span>");
                    $this.remove();
                });
                return $html.html();
            }

            this.step = function(_obj){
                return steps({
                    el: _obj.elem,
                    data: _obj.data,
                    space: _obj.space?_obj.space:null,
                    active: _obj.active?_obj.active:0,
                });
            }

        }

        return thisPublicObj;
    })();

    initProject();

    function initProject(){
        publicObj.openLoadPopup();

        //获取签名
        publicObj.getDDTicketSign(function(_data){
            publicObj.configDD(_data.data,function(){}); //初始化钉钉
            //钉钉js环境初始化完成时调用
            dd.ready(function(){

                console.log("进入到了这里");


                //获取code
                publicObj.getDingDingCode(function(_result){
                    publicObj.getUserInfo(null,function(_userInfo){

                        initPageMain();
                    });


                    // publicObj.getAccessToken(_result.code,function(_data){
                    //     initPageMain();
                    // });

                });

            });

            dd.error(function(_error){

                console.log("初始化出现错误"+JSON.stringify(_error));
                // dd.biz.microApp.openApp({
                //     agentId: "198036373",
                //     onSuccess : function(result) {
                //         dd.biz.navigation.close({
                //             onSuccess : function(result) {},
                //             onFail : function(err) {}
                //         });
                //
                //         dd.biz.util.open({
                //             name:"页面名称1",//页面名称
                //             params:{type:1},//传参
                //             onSuccess : function() {
                //                 console.log("aaa");
                //                 /**/
                //             },
                //             onFail : function(err) {}
                //         });
                //     },
                //     onFail : function(err) {
                //         alert("出现错误");
                //     }
                // })
            });
        });


    }

});

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "y+":this.getFullYear(),
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

//状态条
function step(active, space, elem) {
    var steps2 = steps({
        el: elem,
        data: [
            { title: "申报中", description: "" },
            { title: "待审核", description: "" },
            { title: "待打款", description: "" },
            { title: "已打款", description: "" },
            { title: "已完成", description: "" }
        ],
        space: space,
        active: active
    });
}

//状态条
function stepUreadeclare(active, space, elem) {
    var steps2 = steps({
        el: elem,
        data: [
            { title: "申报中", description: "" },
            { title: "待审批", description: "" },
            { title: "待完善", description: "" },
            { title: "待打款", description: "" },
            { title: "已打款", description: "" },
            { title: "已完成", description: "" }
        ],
        space: space,
        active: active
    });
}
