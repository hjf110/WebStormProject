// var vueSelf = null;
// (function () {
//     new Vue({
//         el: '#armorapp',
//         data: {
//             financeMark: []
//         },
//         mounted: function () {
//             vueSelf = this;
//         }
//     })
// })();


var CamID = 0;  //此例程默认以第一个摄像头打开
var OpenFormat = 1;      //打开格式：0->YUY；1->MJPG
var VideoWidth = 1024;
var VideoHeight = 768;
var DefaultPathBase = "C:\\tmp\\";
var Index = 1;


//开启摄像头
function StartVideo() {

    // var i = axCam_Ocx.CAM_Open(CamID, OpenFormat, VideoWidth, VideoHeight);
    // if (i == 0) tips("开启设备成功");
    // else tips("开启设备失败");
    tips("开启设备成功");
}

//关闭摄像头
function CloseVideo() {
    // axCam_Ocx.CAM_Close();
    tips("关闭设备成功");
}

//拍照
function Capture() {
    // var load = tool.loading();
    // $("#capture").css("pointer-events", "one");
    // var filePath = DefaultPathBase + tool.stringHelper.randomNumber() + ".jpg";
    // axCam_Ocx.CaptureImage(filePath);
    // var fileBase64 = axCam_Ocx.GetBase64FromFile(filePath);
    // fileBase64 = "data:image/jpeg;base64," + fileBase64;
    // var imgHtml = '<img style="height:80px;width: 80px;margin-top: 10px;margin-left: 10px" src="' + fileBase64 + '"/>'
    // $("#financeMark").append(imgHtml);
    // if (Index == 1) {
    //     $('#financeMark').viewer();
    // }
    // if (Index > 1) {
    //     $('#financeMark').viewer("update");
    // }
    // ++Index;
    // $("#capture").css("pointer-events", "");
    // layer.close(load);
    tips("拍照成功");
    // var res = "拍照成功"
    // console.log(res);
    // parent.$("#cz").val(res);
}

var InitComplete = function () {
    setTimeout(function () {
        StartVideo();
    }, 200)
   // window.layerDialog.financeImage = $("#financeMark");
}