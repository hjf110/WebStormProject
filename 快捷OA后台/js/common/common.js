//jqGrid的配置信息
$.jgrid.defaults.width = 1000;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

//iframe自适应
// $(window).on('resize', function () {
//     var $content = $('.content');
//     $content.height($(this).height() - 120);
//     $content.find('iframe').each(function () {
//         $(this).height($content.height());
//     });
// }).resize();


//登录token
var token = localStorage.getItem("token");
if (token == 'null') {
    parent.location.href = baseURL + 'login.html';
}

//jquery全局配置
$.ajaxSetup({
    dataType: "json",
    cache: false,
    headers: {
        "token": token
    },
    xhrFields: {
        withCredentials: true
    },
    complete: function (xhr) {
        // // token过期，则跳转到登录页面
        // if(xhr.responseJSON.code == undefined){
        //
        // }
        // if (xhr.responseJSON.code == undefined || xhr.responseJSON.code == 401) {
        //     parent.location.href = baseURL + 'login.html';
        // }
    }
});

//jqgrid全局配置
$.extend($.jgrid.defaults, {
    ajaxGridOptions: {
        headers: {
            "token": token
        }
    }
});

//权限判断
function hasPermission(permission) {
    if (window.parent.permissions.indexOf(permission) > -1) {
        return true;
    } else {
        return false;
    }
}


//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if (selectedIDs.length > 1) {
        alert("只能选择一条记录");
        return;
    }
    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    return grid.getGridParam("selarrrow");
}


//重写alert
window.alert = function (msg, callback) {
    var index = parent.layer.alert(msg, function (index) {
        parent.layer.close(index);
        callback(index);
    });
}

//重写confirm式样框
window.inquiry = function (msg, callback) {
    var index =
        parent.layer.confirm(msg, {
                btn: ['确定', '取消']
            },
            function () { //确定事件
                callback(index);
            });
}


window.tips = function (msg) {
    parent.layer.msg(msg);
}

window.reason = function (msg) {

}