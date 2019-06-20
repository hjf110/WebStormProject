var path = "http://115.238.154.91:8083/kjcy";//接口头地址
var pass = "Qyw6tX4f";// 8位随机签名加密码


$(function () {
    // var token=sessionStorage.getItem('token');
    // if(token==null||token==""){
    //     window.location.href ="error_qx.html";
    // }

});




/*校验身份证格式*/
function testId(value) {
    var vcity = {
        11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
        21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
        33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南",
        42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
        51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃",
        63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    };

    // 判断是否为空
    isEmpty = function (card) {
        if (/^\s*$/.test(card) === true) {
            return true;
        }
    }
    //检查号码是否符合规范，包括长度，类型
    isCardNo = function (card) {
        if (isEmpty(card)) {
            return true;
        }
        //这个代码表示身份证可以为空
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
        if (reg.test(card) === false) {
            return false;
        }
        return true;
    };

    //取身份证前两位,校验省份
    checkProvince = function (card) {
        if (isEmpty(card)) {
            return true;
        }
        var province = card.substr(0, 2);
        if (vcity[province] == undefined) {
            return false;
        }
        return true;
    };

    //检查生日是否正确
    checkBirthday = function (card) {
        if (isEmpty(card)) {
            return true;
        }
        var len = card.length;
        //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
        if (len == '15') {
            var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
            var arr_data = card.match(re_fifteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date('19' + year + '/' + month + '/' + day);
            return verifyBirthday('19' + year, month, day, birthday);
        }
        //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
        if (len == '18') {
            var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
            var arr_data = card.match(re_eighteen);
            var year = arr_data[2];
            var month = arr_data[3];
            var day = arr_data[4];
            var birthday = new Date(year + '/' + month + '/' + day);
            return verifyBirthday(year, month, day, birthday);
        }
        return false;
    };

    //校验日期
    verifyBirthday = function (year, month, day, birthday) {
        var now = new Date();
        var now_year = now.getFullYear();
        //年月日是否合理
        if (birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day) {
            //判断年份的范围（3岁到100岁之间)
            var time = now_year - year;
            if (time >= 3 && time <= 100) {
                return true;
            }
            return false;
        }
        return false;
    };

    //校验位的检测
    checkParity = function (card) {
        if (isEmpty(card)) {
            return true;
        }
        //15位转18位
        card = changeFivteenToEighteen(card);
        var len = card.length;
        if (len == '18') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i, valnum;
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[cardTemp % 11];
            if (valnum == card.substr(17, 1)) {
                return true;
            }
            return false;
        }
        return false;
    };

    //15位转18位身份证号
    changeFivteenToEighteen = function (card) {
        if (isEmpty(card)) {
            return true;
        }
        if (card.length == '15') {
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var cardTemp = 0, i;
            card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
            for (i = 0; i < 17; i++) {
                cardTemp += card.substr(i, 1) * arrInt[i];
            }
            card += arrCh[cardTemp % 11];
            return card;
        }
        return card;
    };

    //checkCard = function () {
    var card = value;
    //校验长度，类型
    if (isCardNo(card) === false) {
        //alert('您输入的身份证号码不正确，请重新输入');
        //document.getElementById('card_no').focus;
        return false;
    }
    //检查省份
    if (checkProvince(card) === false) {
        return false;
    }
    //校验生日
    if (checkBirthday(card) === false) {
        return false;
    }
    //检验位的检测
    if (checkParity(card) === false) {
        return false;
    }

    return true;
}

// layui.use('form', function () {
//     var form = layui.form;
//
//     //自定义校验规则
//     form.verify({
//         selectnull: function (value) {
//             if (value == null || value == "") {
//                 return "请选择"
//             }
//         }
//     });
//
// });


//-----------------压缩图片----------------------------
function convertBase64UrlToBlob(urlData) {
    var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], {type: 'image/png'});
}


var compress = function (res, fff) {
    var dataUrl;
    var img = new Image(),
        maxH = 500;
    img.onload = function () {
        var cvs = document.createElement('canvas'),
            ctx = cvs.getContext('2d');
        if (img.height > maxH) {
            img.width *= maxH / img.height;
            img.height = maxH;
        }
        cvs.width = img.width;
        cvs.height = img.height;
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);
        dataUrl = cvs.toDataURL('image/jpeg', 0.6);
        console.log("图片信息-------",dataUrl);
        // 上传略
        fff(convertBase64UrlToBlob(dataUrl));
    }
    img.src = res;
}

//---------------------------------------------
function Add_ajaxSubmit(url, json, tableID) {
    $.ajax({
        type: "POST",
        url: url,
        data: json,
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("KJCY-TOKEN", sessionStorage.getItem('token'));
            //request.setRequestHeader("FORM-TOKEN", fd);
            request.setRequestHeader("Content-Type", "application/json");
        },
        success: function (res) {
            console.log("msg信息------" + res.msg);
            // alert("添加成功");
            if (res.msg == "success") {
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layui.table.reload(tableID, {page: {curr: 1}});
                parent.layer.msg('添加成功');
                parent.layer.close(index);
            }

        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);

        }
    })
}


//文件上传接口
var ImageajaxSubmit = function (base64url,url,type,method,isasync) {
    var data;
    var headers={};
    headers["KJCY-TOKEN"]=sessionStorage.getItem('token');
    var async_is = true;



    if(isasync==false){
        async_is==false;
    }

    var formData = new FormData();
    //formData.append("vinnop",convertBase64UrlToBlob(b64));

    formData.append("image", convertBase64UrlToBlob(base64url), "file_" + Date.parse(new Date()) + ".jpg");


    console.log("url为:",url);
    console.log("值为:",base64url);
    console.log("头信息为",headers);
    jQuery.ajax({
        url: url,
        data: formData,
        type: type,
        headers:headers,
        cache: false,    //上传文件不需缓存
        processData: false, //需设置为false。因为data值是FormData对象，不需要对数据做处理
        contentType: false, //需设置为false。因为是FormData对象，且已经声明了属性enctype="multipart/form-data"
        dataType: 'json',
        //contentType: "application/json;charset=UTF-8",
        //  timeout: 1000000,
        async: async_is, //异步
        // cache: false, //不缓存
        success: function (res) {
            console.log("访问接口成功后返回的参数",res);
            // console.log(11111111111111111111);
            if (res.code == "0") {
                method(res);
            } else {
                alert(res.msg);
                // method(data);
            }
            //method(data);
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            alert("网络错误");
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    });
};





//通用接口
var ajaxSubmit = function (submitData,url,type,method,headType,istoken,isasync) {
    var data;
    var headers={};
    headers["KJCY-TOKEN"]=sessionStorage.getItem('token');
    var async_is = true;
    if (type != "GET") {
        data = JSON.stringify(submitData);
    } else {
        data = submitData;
    }
    if(headType=="json"){
        headers["Content-Type"]="application/json";
    }

    if(istoken==true){
        console.log("token头信息--------",$.cookie("token"));
        headers["KJCY-TOKEN"]=sessionStorage.getItem('token');
    }
    if(isasync==false){
        async_is==false;
    }

   console.log("url为:",url);
   console.log("值为:",data);
   console.log("头信息为",headers);
    jQuery.ajax({
        url: url,
        data: data,
        type: type,
        headers:headers,
        dataType:"json",
        //contentType: "application/json;charset=UTF-8",
       //  timeout: 1000000,
        async: async_is, //异步
        // cache: false, //不缓存
        success: function (res) {
          console.log("",res);
           // console.log(11111111111111111111);
            if (res.code == "0") {
                method(res);
            } else {
                alert(res.msg);
               // method(data);
            }
            //method(data);
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            alert("网络错误");
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    });
};

var postAjaxFile = function (submitData, submitUrl, method) {
    jQuery.ajax({
        url: submitUrl,
        data: submitData, //FormData对象
        type: "POST",
        timeout: 10000,
        processData: false, //是否对data序列化
        contentType: false,
        async: true, //异步
        cache: false, //不缓存
        success: function (data) {
            method(JSON.parse(data));
        },
        error: function () {
            alert("网络错误");
        }
    });
}


//单击行勾选checkbox事件
$(document).on("click", ".layui-table-body table.layui-table tbody tr", function () {
    var index = $(this).attr('data-index');
    var tableBox = $(this).parents('.layui-table-box');
    //存在固定列
    if (tableBox.find(".layui-table-fixed.layui-table-fixed-l").length > 0) {
        tableDiv = tableBox.find(".layui-table-fixed.layui-table-fixed-l");
    } else {
        tableDiv = tableBox.find(".layui-table-body.layui-table-main");
    }
    var checkCell = tableDiv.find("tr[data-index=" + index + "]").find("td div.laytable-cell-checkbox div.layui-form-checkbox I");
    if (checkCell.length > 0) {
        checkCell.click();
    }
});

$(document).on("click", "td div.laytable-cell-checkbox div.layui-form-checkbox", function (e) {
    e.stopPropagation();
});
// 454464646464464646464

//去重添加数组
Array.prototype.push_unique = function () {
    for (var i = 0; i < arguments.length; i++) {
        var ele = arguments[i];
        if (this.indexOf(ele) == -1) {
            this.push(ele);
        }
    }
};
//json对象数组去重
function unique(list){
    var arr = [];
    for(var i = 0; i < list.length; i++){
        if(i == 0) arr.push(list[i]);
        b = false;
        if(arr.length > 0 && i > 0){
            for(var j = 0; j < arr.length; j++){
                if(arr[j].typesname == list[i].typesname){
                    b = true;
                    //break;
                }
            }
            if(!b){ arr.push(list[i]);}
        }
    }
    return arr;
};
Array.prototype.removeRepeatAttr=function(){
    var tmp={},b=[],a=this;
    for(var i=0;i<a.length;i++){
        if(!tmp[a[i].car_vinno]){
            tmp[a[i].car_vinno]=!0;
        }else{
            a.splice(i,1);
        }
    };
};
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};