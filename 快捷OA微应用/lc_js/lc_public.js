/**
 * Created by lc on 2017/9/27.
 */
"use strict";
/*该文件必须的公共的属性、对象*/
//公共的ajax对象
var myAjax;

//公共事件管理对象
var publicEvents;

//选择正确的浏览器数据库对象
var myIndexedDB = window.indexedDB||window.msIndexedDB||window.mozIndexedDB||window.webkitIndexedDB;

//将浏览器版本信息封装在一个模块模式中,当检测到浏览器的呈现引擎之后，就可以将对应属性的设置设置大于0
var client = function() {

    //呈现引擎对象
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        ver: null, //版本信息
    };

    //浏览器对象
    var browser = {
        //浏览器
        ie: 0,
        firefox: 0,
        safari: 0,
        kong: 0,
        opera: 0,
        chrome: 0,

        browserType: null,

        //具体版本号
        ver: null
    };

    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        xll: false,

        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //游戏系统
        wii: false,
        ps: false,
    };

    //检测呈现引擎和浏览器
    var ua = navigator.userAgent; //获取用户代理字符串

    //首先检测是否为Opera浏览器，检测window.opera对象，opera 5及更高版本中都有这个对象
    if (window.opera) {
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
        browser.browserType = "opera";
    } else if (/AppleWebKit\/(\S+)/.test(ua)) { //其次检测是否为Webkit浏览器中的Safari浏览器,检测用户代理字符串中是否包含AppleWebkit字符串，该字符串是Webkit，Safari浏览器独有字符串
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        //确定是Chrome还是Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
            browser.browserType = "chrome";
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
            browser.browserType = "safari";
        } else {
            //近似的确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            };
            browser.safari = browser.ver = safariVersion;
        };

    } else if (/KHTML\/(\S+)/.test(ua) || /Kongueror\/([^;]+)/.test(ua)) { //接下来检测KHTML
        console.log("是KHTML");
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.kong = parseFloat(engine.ver);
        browser.browserType = "kong";
    } else if (/rv:([^\)]+)\) Gecko\/\d{8};/.test(ua)) { //接下来检测Gecko，该浏览器就是Firefox
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        //确定不是firefox
        if (/Firefox\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(engine.ver);
            browser.browserType = "firefox";
        };

    } else if (/MSIE ([^;]+)/.test(ua)) { //最后是判断ie浏览器
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
        browser.browserType = "ie";
    } else if (/rv:([^\)]+)\)/.test(ua)) {
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
        browser.browserType = "ie";
    };

    //检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.xll = (p == "Xll") || (p.indexOf("Linux") == 0);

    //检测windows操作系统
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    case "6.3":
                        system.win = "8.1";
                        break;
                    default:
                        system.win = "XP";
                        break;
                };
            } else if (RegExp["$1"] == "9x") {
                system.win = "ME";
            } else {
                system.win = RegExp["$1"];
            };
        };
    };

    //移动设备
    system.iphone = ua.toLowerCase().indexOf("iphone") > -1;
    system.ipod = ua.toLowerCase().indexOf("ipod") > -1;
    system.ipad = ua.toLowerCase().indexOf("ipad") > -1;
    system.nokiaN = ua.toLowerCase().indexOf("NokiaN") > -1;

    //windows.mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win == "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        };
    };

    //检测ios版本
    if (system.mac && ua.toLowerCase().indexOf("mobile") > -1) {
        if (/cpu (?:iphone )?os (\d+_\d+)/.test(ua.toLowerCase())) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2; //不能真正检测出来，所以只能猜测
        };
    };

    //检测Android版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1)
    };

    //游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine: engine,
        browser: browser,
        system: system,
    };
}();

//框架、插件管理对象，该对象唯一，用于控制该网页、网站使用的框架和插件
var myUnit = function() {
    //插件对象
    var plugin = {
        laydate: -1,
        layer: -1,
        swiper: -1,
        mui: {
            picker: -1
        },
        pluginsArray: [],
    };

    //框架对象
    var frame = {
        amazeui: -1,
        layui: -1,
        bootstrap: -1,
        mui: -1,
        framesArray: [],
    };

    return {
        getPlugin: function() {
            return cloneEvery(plugin);
        },
        getJSFrame: function() {
            return cloneEvery(frame);
        },
        setPlugin: function(pluginsArray, finishCallBackFun) {
            if (finishCallBackFun == null || typeof finishCallBackFun != "function") {
                finishCallBackFun = function() {};
            };
            //如果是数组的情况下才进行加载
            if (Array.isArray(pluginsArray)) {
                //循环加载插件文件
                for (var index = 0; index < pluginsArray.length; index++) {
                    var e = pluginsArray[index];
                    var newScript = document.createElement("script");
                    newScript.type = "text/javascript";
                    switch (e.toLowerCase()) {
                        case "laydate":
                            newScript.src = "../lc_plugin/laydate/laydate.js";
                            plugin.laydate = 0;
                            plugin.pluginsArray.push("laydate");
                            newScript.onload = function() {
                                plugin.laydate = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.laydate = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "layer":
                            if (client.system.mac || client.system.android || client.system.ios || client.system.winMobile) {
                                //                              $("body").append("<script type='text/javascript' src='../lc_plugin/layerMobile/layer.js'></script>");
                                newScript.src = "../lc_plugin/layerMobile/layer.js";
                            } else {
                                //                              $("body").append("<script type='text/javascript' src='../lc_plugin/layer/layer.js'></script>");
                                newScript.src = "../lc_plugin/layer/layer.js";
                            };
                            plugin.layer = 0;
                            plugin.pluginsArray.push("layer");
                            newScript.onload = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "layermobile":
                            newScript.src = "../lc_plugin/layerMobile/layer.js";
                            plugin.layer = 0;
                            plugin.pluginsArray.push("layer");
                            newScript.onload = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "layerpc":
                            newScript.src = "../lc_plugin/layer/layer.js";
                            plugin.layer = 0;
                            plugin.pluginsArray.push("layer");
                            newScript.onload = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.layer = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "swipercompatible":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperCompatible/idangerous.swiper.css' \/>");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperCompatible/idangerous.swiper.css' \/>");
                            };
                            newScript.src = "../lc_plugin/swiperCompatible/idangerous.swiper.min.js";
                            plugin.swiper = 0;
                            plugin.pluginsArray.push("swiperCompatible");
                            newScript.onload = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "swipermobile":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperMobile/swiper.min.css' \/>");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperMobile/swiper.min.css' \/>");
                            };
                            newScript.src = "../lc_plugin/swiperMobile/swiper.jquery.min.js";
                            plugin.swiper = 0;
                            plugin.pluginsArray.push("swiperMobile");
                            newScript.onload = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "swiper":
                            if (client.system.mac || client.system.android || client.system.ios || client.system.winMobile) {
                                if ($("head>link").length > 0) {
                                    $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperMobile/swiper.min.css' \/>");
                                } else {
                                    $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperMobile/swiper.min.css' \/>");
                                };
                                newScript.src = "../lc_plugin/swiperMobile/swiper.jquery.min.js";
                            } else {
                                if ($("head>link").length > 0) {
                                    $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperCompatible/idangerous.swiper.css' \/>");
                                } else {
                                    $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_plugin/swiperCompatible/idangerous.swiper.css' \/>");
                                };
                                newScript.src = "../lc_plugin/swiperCompatible/idangerous.swiper.min.js";
                            };
                            plugin.swiper = 0;
                            plugin.pluginsArray.push("swiper");
                            newScript.onload = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.swiper = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "mui.picker":
                            if (myUnit.getJSFrame().mui != 1) {
                                break;
                            };
                            $("head>link[href*=mui]").after("<link rel='stylesheet' type='text/css' href='../lc_frame/Mui/css/mui.picker.min.css' \/>");
                            newScript.src = "../lc_frame/Mui/js/mui.picker.min.js";
                            plugin.mui.picker = 0;
                            plugin.pluginsArray.push("mui.picker");
                            newScript.onload = function() {
                                plugin.mui.picker = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                plugin.mui.picker = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                    };
                    if (newScript.src != null && newScript.src.length > 0) {
                        document.body.appendChild(newScript);
                    };
                    newScript = null;
                    e = null;
                };
                index = null;
            };

            //验证插件是否初始化完成函数
            function isInitFinish() {
                if (plugin.laydate > -1 && plugin.laydate == 0) {
                    return;
                } else if (plugin.layer > -1 && plugin.layer == 0) {
                    return;
                } else if (plugin.swiper > -1 && plugin.swiper == 0) {
                    return;
                } else if (plugin.mui.picker > -1 && plugin.mui.picker == 0) {
                    return;
                } else {
                    return true;
                };
            };
        },
        setJSFrame: function(framesArray, finishCallBackFun) {
            //如果是数组的情况下才进行加载
            if (Array.isArray(framesArray)) {
                //循环加载框架文件
                for (var index = 0; index < framesArray.length; index++) {
                    var e = framesArray[index];
                    var newScript = document.createElement("script");
                    newScript.type = "text/javascript";
                    switch (e.toLowerCase()) {
                        case "mui":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_frame/Mui/css/mui.min.css' \/>");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_frame/Mui/css/mui.min.css' \/>");
                            };
                            newScript.src = "../lc_frame/Mui/js/mui.min.js";
                            frame.mui = 0;
                            frame.framesArray.push("mui");
                            var updataJs = document.createElement("script");
                            updataJs.type = "text/javascript";
                            updataJs.src = "../lc_frame/Mui/js/update.js";
                            document.body.appendChild(newScript);
                            newScript.onload = function() {
                                frame.mui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                frame.mui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };

                            break;
                        case "amazeui":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_frame/Amazeui/assets/css/amazeui.min.css' />");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_frame/Amazeui/assets/css/amazeui.min.css' />");
                            };
                            //                          $("body").append("<script type='text/javascript' src='../lc_frame/Amazeui/assets/js/amazeui.min.js'></script>");
                            newScript.src = "../lc_frame/Amazeui/assets/js/amazeui.min.js";
                            frame.amazeui = 0;
                            frame.framesArray.push("amazeui");
                            newScript.onload = function() {
                                frame.amazeui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                frame.amazeui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "layui":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_frame/Layui/css/layui.css' />");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_frame/Layui/css/layui.css' />");
                            };
                            //                          $("body").append("<script type='text/javascript' src='../lc_frame/Layui/layui.js'></script>");
                            newScript.src = "../lc_frame/Layui/layui.js";
                            frame.layui = 0;
                            frame.framesArray.push("layui");
                            newScript.onload = function() {
                                frame.layui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                frame.layui = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "bootstrapcompatible":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_frame/BootstrapCompatible/css/bootstrap.min.css' />");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_frame/BootstrapCompatible/css/bootstrap.min.css' />");
                            };
                            //                          $("body").append("<script type='text/javascript' src='../lc_frame/BootstrapCompatible/js/bootstrap.min.js'></script>");
                            newScript.src = "../lc_frame/BootstrapCompatible/js/bootstrap.min.js";
                            frame.bootstrap = 0;
                            frame.framesArray.push("BootstrapCompatible");
                            newScript.onload = function() {
                                frame.bootstrap = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                frame.bootstrap = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                        case "bootstrapdist":
                            if ($("head>link").length > 0) {
                                $("head>link:first").before("<link rel='stylesheet' type='text/css' href='../lc_frame/BootstrapDist/css/bootstrap.min.css' />");
                            } else {
                                $("head>meta:last").after("<link rel='stylesheet' type='text/css' href='../lc_frame/BootstrapDist/css/bootstrap.min.css' />");
                            };
                            //                          $("body").append("<script type='text/javascript' src='../lc_frame/BootstrapDist/js/bootstrap.min.js'></script>");
                            newScript.src = "../lc_frame/BootstrapDist/js/bootstrap.min.js";
                            frame.bootstrap = 0;
                            frame.framesArray.push("BootstrapDist");
                            newScript.onload = function() {
                                frame.bootstrap = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            newScript.onreadystatechange = function() {
                                frame.bootstrap = 1;
                                if (isInitFinish()) {
                                    finishCallBackFun()
                                };
                            };
                            break;
                    };
                    if (newScript.src != null && newScript.src.length > 0) {
                        document.body.appendChild(newScript);
                    };
                    newScript = null;
                    e = null;
                };
                index = null;
            };
            //验证框架的js是否加载完成
            function isInitFinish() {
                if (plugin.amazeui > -1 && plugin.amazeui == 0) {
                    return;
                } else if (plugin.layui > -1 && plugin.layui == 0) {
                    return;
                } else if (plugin.bootstrapcompatible > -1 && plugin.bootstrapcompatible == 0) {
                    return;
                } else if (plugin.bootstrapdist > -1 && plugin.bootstrapdist == 0) {
                    return;
                } else {
                    return true;
                };
            };
        },
        CookieUtil:{
            //获取cookie值,_name:获取的cookie的键名
            get:function(_name){
                var cookieName = encodeURIComponent(_name)+"=",
                    cookieStart = document.cookie.indexOf(cookieName),
                    cookieValue = null;
                if(cookieStart>-1){
                    var cookieEnd = document.cookie.indexOf(";",cookieStart);
                    if(cookieEnd==-1){
                        cookieEnd = document.cookie.length;
                    };
                    cookieValue = decodeURIComponent(document.cookie.substring(cookieStart+cookieName.length,cookieEnd))
                };
                return cookieValue;
            },
            //设置cookie，_name:键名,_value:值,_expires:到期时间,_path:路径,_domain:域,_secure:安全标志，表示仅SSL连接才能传输cookie
            set:function(_name,_value,_expires,_path,_domain,_secure){
                var cookieText = encodeURIComponent(_name)+"="+encodeURIComponent(_value);
                if(_expires instanceof Date){
                    cookieText += ";expires="+_expires.toGMTString();
                };
                if(_path){
                    cookieText += ";path="+_path;
                };
                if(_domain){
                    cookieText += ";domain="+_domain;
                };
                if(_secure){
                    cookieText += ";secure=";
                };
                document.cookie = cookieText;
            },
            //删除cookie
            unset:function(_name,_path,_domain,_srcure){
                this.set(_name,"",new Date(0),_path,_domain,_srcure);
            },
        },
    };
}();

//程序加载该文件后立刻执行的函数，会对整个文件进行初始化
! function() {

}();

//文档加载完成之后执行的函数
$(document).ready(function() {
    //初始化自定义的对象及其变量
    initVarFun();

    //初始化绑定事件函数
    onBindEventFun();

    //初始化页面设置
    initViewSetUp();

    //初始化变量函数
    function initVarFun() {
        //初始化ajax对象
        myAjax = new MyAjax();

        //初始化公共事件对象
        publicEvents = function() {
            //滚动事件管理对象
            var scrollEventsObj = new PublicEventsListener();

            //页面大小修改事件管理对象
            var resizeEventsObj = new PublicEventsListener();
            return {
                scrollEvents: scrollEventsObj,
                resizeEvents: resizeEventsObj,
                addHandler: function(_element, _type, _handler) {
                    if (_element.addEventListener) {
                        _element.addEventListener(_type, _handler, false);
                    } else if (_element.attachEvent) {
                        _element.attachEvent("on" + _type, _handler);
                    } else {
                        _element["on" + _type] = _handler;
                    };
                },
                removeHandler: function(_element, _type, _handler) {
                    if (_element.removeEventListener) {
                        _element.removeEventListener(_type, _handler, false);
                    } else if (_element.detachEvent) {
                        _element.detachEvent("on" + _type, _handler);
                    } else {
                        _element["on" + _type] = null;
                    };
                }
            };
        }()

    };

    //初始化事件
    function onBindEventFun() {
        onBindScrollEventFun(); //页面滚动事件
        onBindResizeEventsFun(); //页面大小改变事件
    };

    //    设置页面滚动事件
    function onBindScrollEventFun() {
        $(window).scroll(function() {
            publicEvents.scrollEvents.runFun();
        })
    };

    //    设置页面大小修改时间
    function onBindResizeEventsFun() {
        $(window).resize(function() {
            publicEvents.resizeEvents.runFun();
        })
    };

    //    初始化页面设置
    function initViewSetUp() {
        //判断是否有让ie进入最高渲染模式的meta标签代码，没有就加上去
        if ($("meta[content='IE=edge,chrome=1']").length <= 0) {
            $("meta:last").after('<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">');
        };
        //判断是否有让双核浏览器进入极速模式的meta标签，没有就加上去
        if ($("meta[content='webkit|ie-comp|ie-stand']").length <= 0) {
            $("meta:last").after('<meta name="renderer" content="webkit|ie-comp|ie-stand">');
        };
    };



});

/*封装的对象*/
//lc文件的最原始的对象，所有封装的对象都是继承自该对象——————————————————————————
function LcObject() {};

//自己的LCObject对象，让自己的对象具备inheritPrototype方法；
LcObject.prototype.inheritPrototype = function(subType, superType) {
    var prototype;
    if (parseInt(client.browser.ie) >= 9) {
        prototype = Object.create(superType.prototype); //创建超类的原型的一个副本
    } else {
        prototype = object(superType.prototype);
    };
    prototype.constructor = subType; //为创建的副本添加constructor属性
    subType.prototype = prototype; //将创建的副本赋值给类型的原型
};

//测试对象,不在开发中实际使用，仅用于演示————————————————————————————————
function TestFun() {};

inheritPrototype(TestFun, LcObject); //对testFun进行继承处理
TestFun.prototype.key = "key"; //设置TestFun方法的扩充

//Ajax对象，该对象包含了该项目一些Ajax访问的一些设置和数据
function MyAjax() {
    this.success = null;
    this.error = null;
};
inheritPrototype(MyAjax, LcObject);
MyAjax.prototype.getAjaxDate = function(dataObj, type) {
    var thisObj = this;
    $.ajax({
        type: type == null ? "POST" : type,
        url: dataObj.url,
        data: dataObj.data,
        success: function(e) {
            if (typeof thisObj.success == "function") {
                if (thisObj.success(e)) {
                    dataObj.successFun(e);
                };
            } else {
                dataObj.successFun(e);
            };
        },
        error: function(e) {
            if (typeof dataObj.error == "function") {
                if (dataObj.error(e)) {
                    dataObj.errorFun(e);
                };
            } else {
                dataObj.errorFun(e);
            };
        }
    })
};
MyAjax.prototype.setAjaxFun = function(dataObj) {
    if (typeof dataObj.success == "function") {
        this.success = dataObj.success;
    };

    if (typeof dataObj.error == "function") {
        this.error = dataObj.error;
    };
};
//获取ajax的html,array格式为[{url:_url,data:_data,fun:_fun};],
MyAjax.prototype.getAjaxHtmlFromArray = function(_array, _callFun) {
    var i = 0;
    getHtml(i);

    function getHtml(_index) {
        if (i == _array.length) {
            return;
        } else if (_array[_index] == null) {
            getHtml(++i);
            return;
        } else if (_array[_index].url == null) {
            getHtml(++i);
            return;
        };
        $.ajax({
            type: "get",
            dataType: "html",
            url: _array[_index].url,
            data: _array[_index].data,
            async: true,
            success: function(_data) {
                if (typeof _array[_index].fun == "function") {
                    _array[_index].fun(_data);
                };
                if (++i == _array.length) {
                    if (typeof _callFun == "function") {
                        _callFun();
                    };
                } else {
                    getHtml(i);
                };
            },
            error: function(_error) {}
        });
    };
};

//公共事件监听对象，该对象封装了公共事件监听的通用方法
function PublicEventsListener() {
    this.events = [];
};
inheritPrototype(PublicEventsListener, LcObject);
//运行所有注册在运行时方法的函数
PublicEventsListener.prototype.runFun = function(eventNames) {
    if (eventNames != null) {
        if (Array.isArray(eventNames)) {
            for (var index = 0; index < eventNames.length; index++) {
                if (typeof this.events[this.events.indexOf(eventNames[index])] == "function") {
                    this.events[this.events.indexOf(eventNames[index])]();
                };
            };
        } else {
            if (typeof this.events[this.events.indexOf(eventNames)] == "function") {
                this.events[this.events.indexOf(eventNames)]();
            };
        };
        return;
    };
    for (var index = 0; index < this.events.length; index++) {
        if (typeof this.events[index] == "function") {
            this.events[index]();
        };
    };
};
//添加运行时函数
PublicEventsListener.prototype.addRunFun = function(fun) {
    if (typeof fun == "function" && this.events.indexOf(fun) == -1) {
        this.events.push(fun);
    };
};
//删除已经注册的函数
PublicEventsListener.prototype.deleteRunFun = function(fun) {
    if (this.events.indexOf(fun) > -1) {
        this.events.splice(this.events.indexOf(fun), 1);
    };
};


/*封装的方法*/
//克隆对象的方法
function cloneEvery(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    };

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = cloneEvery(obj[i]);
        };
        return copy;
    };

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneEvery(obj[attr]);
        };
        return copy;
    };

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

//传入一个原型链对象，返回一个原型链是该原型链对象的副本
function object(o) {
    function F() {};
    F.prototype = o;
    return new F();
};

//用于继承时替换子类的prototype属性>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function inheritPrototype(subType, superType) {
    var prototype;
    if (parseInt(client.browser.ie) >= 9) {
        prototype = Object.create(superType.prototype); //创建超类的原型的一个副本
    } else {
        prototype = object(superType.prototype);
    };

    prototype.constructor = subType; //为创建的副本添加constructor属性
    subType.prototype = prototype; //将创建的副本赋值给类型的原型
};

//用于初始化加载js文件的方法>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function initJSEnvironment(jsNameArray) {
    var i = 0;
    loadJs(jsNameArray[i]);

    function loadJs(jsName) {
        if (i >= jsNameArray.length) {
            i = null;
            return;
        };
        $.getScript("..\/lc_js\/" + jsName + ".js", function(data, textStatus, jqxhr) {
            loadJs(jsNameArray[++i]);
        });

    };
};

//用于动态添加js文件的方法
function loadScript(pathStrOrArray) {
    if (Array.isArray(pathStrOrArray)) {
        for (var index = 0; index < pathStrOrArray.length; index++) {
            var newScript = document.createElement("script");
            newScript.type = "text/javascript";
            newScript.src = pathStrOrArray[index];
            document.body.appendChild(newScript);
            newScript = null;
        };
    } else {
        var newScript = document.createElement("script");
        newScript.type = "text/javascript";
        newScript.src = pathStrOrArray;
        document.body.appendChild(newScript);
        newScript = null;
    };
};

//动态加载css文件的方法
function loadStyle(pathStrOrArray) {
    if (Array.isArray(pathStrOrArray)) {
        for (var index = 0; index < pathStrOrArray.length; index++) {
            var newLink = document.createElement("link");
            newLink.rel = "stylesheet";
            newLink.type = "text/css";
            newLink.href = pathStrOrArray[index];
            var head = document.getElementsByTagName("head")[0];
            head.appendChild(newLink);
            newLink = null;
        };
    } else {
        var newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.type = "text/css";
        newLink.href = "../css/aaa.css";
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(newLink);
        newLink = null;
    };
};

//解析URL地址中携带的参数，并将参数的键值以键值对的形式存储在对象中，返回这个包含键值对的对象>>>>>>>>>>>>>>>>>>>>>>>>>>>
function getUrlParameter(searchStr) {
    var urlParameterArray = {};
    $.each(location.search.replace("?", "").split("&"), function(i, e) {
        var parameterItemArray = e.split("=");
        urlParameterArray[parameterItemArray[0]] = parameterItemArray[1];
    });
    return urlParameterArray[searchStr];
};

//切割blob/file数据流的通用函数
function blobSlice(_blob, _startByte, _length) {
    if (_blob.slice) {
        return _blob.slice(_startByte, _length);
    } else if (_blob.webkitSlice) {
        return _blob.webkitSlice(_startByte, _length);
    } else if (_blob.mozSlice) {
        return _blob.mozSlice(_startByte, _length);
    } else {
        return null;
    };
};

//获取图片url路径的函数
function createObjectUrl(_file) {
    if (window.URL) {
        return window.URL.createObjectURL(_file);
    } else if (window.webkitUrl) {
        return window.webkitURL.createObjectURL(_file);
    } else {
        return null;
    };
};

//释放图片Url的通用函数
function revokeObjectUrl(_url) {
    if (window.URL) {
        window.URL.revokeObjectURL(_url);
    } else if (window.webkitURL) {
        window.webkitURL.revokeObjectURL(_url);
    };
};