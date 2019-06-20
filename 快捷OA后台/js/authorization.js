$(function () {
    $("#captcha").attr("src", baseURL + 'captcha.jpg');
    var code = tool.urlHelper.getUrlParam("code");
    //获取角色权限和userId
    tool.ajaxHelper.ajaxSubmit({code: code}, Api.ex_user.getUserRoleByCode, "GET", function (codeData) {
        var userId = codeData.data.userId;
        var roleList = codeData.data.roleList;
        if (tool.arrayHelper.intersect(roleList, config.addToSystemUserRole).length > 0) {
            //人员加入系统
            console.log(userId);
            tool.ajaxHelper.ajaxSubmit({userId: userId}, Api.ex_user.addUserToSystem, "GET", function () {
                //登录用户
                var info = "username=" + userId + "&password=000000&captcha=000000"
                tool.ajaxHelper.ajaxSubmit({}, baseURL + "sys/login?" + info, "POST", function (info) {
                    $("#loading").hide();
                    localStorage.setItem("token", info.token);
                    parent.location.href = 'index.html';
                })
            })
        } else {
            $("#loading").hide();
            alert("对不起 您不是该系统的成员!", function () {
                window.location.href = "login.html";
            })
        }
    })
})