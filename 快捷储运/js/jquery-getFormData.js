/*表单提交码 阻止重复提交表单*/
function getFormCode() {
    var fd;
    var timestamp = (new Date()).valueOf();// 时间戳----
    //生成sign
    var MD5String = "timestamp=" + timestamp + pass;
    var MD5 = $.md5(MD5String);
    MD5 = MD5.toUpperCase();//字母转为大写
    var sign = pass + MD5;// 加密参数----
    var token = $.cookie("token");
    $.ajax({
        type: "GET",
        url: path + "/common/form/submit_token",
        async: false,
        data: {
            "timestamp": timestamp,
            "sign": sign
        },
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("KJCY-TOKEN", token);
        },
        success: function (data) {
            if (data.msg = "success") {
                fd = data.data;
            }
        },
        error: function (XMLHttpResponse, textStatus, errorThrown) {
            console.log("1 异步调用返回失败,XMLHttpResponse.readyState:" + XMLHttpResponse.readyState);
            console.log("2 异步调用返回失败,XMLHttpResponse.status:" + XMLHttpResponse.status);
            console.log("3 异步调用返回失败,textStatus:" + textStatus);
            console.log("4 异步调用返回失败,errorThrown:" + errorThrown);
        }
    })
    if (fd != null && fd != "") {
        return fd;
    }
}
