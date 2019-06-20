var nFileCount = 0;
var RotateIndex = 0;
var imgArr=new Array();
var folderPath = "C:\\GpyLocationImg";
var autoFolderPath = "C:\\GpyLocationImg";
var	strFile;
//var httpUrl = "http://192.168.4.71/upload.php";//公安内网服务地址  测试需要换
var httpUrl = "http://dyptest.classysoft.net/upload.ph";//公安内网服务地址  测试需要换
var ftpUrl = "ftp://192.168.4.71:21/";//公安内网服务地址  测试需要换
var ftpFilePath = "/data";
var ip = "192.168.1.1";
var port1111 = 21;
var cameraIndex=0;
$(document).ready(function(){
	var backcode = CaptureOcx.InitCamera();
	if(backcode!=null&&backcode!=0){
		setTimeout("StartVideo()",200);
	}
});

function switchCamera() {
        cameraIndex = (cameraIndex+1)%2;
        CaptureOcx.ToggleCamera(cameraIndex);
    }
    
function closecamera(){
	var buf = CaptureOcx.CloseCamera();
	alert(buf);
}
    
function deleteImage(){
	imgArr.pop();
	nFileCount --;
	var buf = CaptureOcx.delFile(strFile);
	alert(buf);
}
    
function getimage64(){
	//设置图像压缩质量
	CaptureOcx.setJpgQuanlity(80);
	var date = new Date();
	var yy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();
	var hh = date.getHours().toString();
	var nn = date.getMinutes().toString();
	var ss = date.getSeconds().toString();
	var mi = date.getMilliseconds().toString();
	var testpath = "D:\\"+ yy + mm + dd + hh + nn + ss + mi + ".jpg";
	//转base64
	var buf = CaptureOcx.GetImageBase64(testpath);
	alert(buf);
}
    
function captureandqrcode(){
	//设置图像压缩质量
	CaptureOcx.setJpgQuanlity(80);
	var date = new Date();
	var yy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();
	var hh = date.getHours().toString();
	var nn = date.getMinutes().toString();
	var ss = date.getSeconds().toString();
	var mi = date.getMilliseconds().toString();
	var testpath = "D:\\"+ yy + mm + dd + hh + nn + ss + mi + ".jpg";
	//拍照
	testpath = CaptureOcx.CaptureImage(testpath);
	//二维码识别
	var buf=CaptureOcx.CaptureImageAndQRCode(testpath,0,0,0);
	alert(buf);
}

function StartVideo(){
	CaptureOcx.OpenCamera(12801,720,RotateIndex,1);//打开视频控件 默认1280*720    旋转0度   自动剪裁
	getResolutionInfo(Reso);
}

//获得分辨率信息
function getResolutionInfo(f){
	var total = CaptureOcx.GetResolutionCount();
	for(var i = 0 ; i < total ; i++ )
	{   
		var width = CaptureOcx.GetResolutionWidth(i);
		var height = CaptureOcx.GetResolutionHeight(i); 
		var resolution = width+"X"+height;
		f.Resolution.options[i].text=resolution;
    }
//    f.Resolution.options[6].selected = true;
}

//设置分辨率
function SetResolution(){
	var obj=document.getElementById("Resolution") ;
	var index=obj.selectedIndex;
	alert(index);
	CaptureOcx.SetResolution(index);
}

//设置剪裁方式
function SetCutType(){
	var type =document.getElementById("CutType").value;
	CaptureOcx.SetCutType(type);
}

//拍摄
function Capture_IMG(){
	CaptureOcx.setJpgQuanlity(100);
	var date = new Date();
	var yy = date.getFullYear().toString();
	var mm = (date.getMonth() + 1).toString();
	var dd = date.getDate().toString();
	var hh = date.getHours().toString();
	var nn = date.getMinutes().toString();
	var ss = date.getSeconds().toString();
	var mi = date.getMilliseconds().toString();
	strFile = "D:\\"+ yy + mm + dd + hh + nn + ss + mi + ".jpg";
	strFile = CaptureOcx.CaptureImage(strFile);
	nFileCount ++;
	imgArr.push(strFile);
	//上传Http
	// var parms = "userfile";
	// var data = CaptureOcx.UploadFileHttp(strFile,httpUrl,parms);
/*	var user = "apptest"
	var password = "testapp"
	var port="0"
	var back = CaptureOcx.UploadFileFtp(strFile,ftpFilePath,ip,user,password,port1111);	
*/
	// alert(data);
}

//连续拍摄
function SeriesCapture_IMG(){
	CaptureOcx.setJPGQuanlity(100);
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var f = fso.CreateFolder(autoFolderPath);
	var back = CaptureOcx.AutoCaptureImage(autoFolderPath,30);	
	alert(back);
	//var fc = new Enumerator(f.files);	;
	var fc = new Enumerator(fso.GetFolder(back).files);	;
	for (; !fc.atEnd(); fc.moveNext()){
		imgArr.push(fc.item());
		var parms = new Object();
		var back = CaptureOcx.UploadFileHttp(fc.item(),httpUrl,parms);
		var data=eval('('+back+')');
		alert(data);
	}
}
function GetDevName(){
	
	  var  devname=CaptureOcx.GetDevName();
	  alert(devname);
}

function setColorMode(color_mode) {        
        CaptureOcx.setImageColorMode(color_mode)
    }

function LeftRotate_IMG(){
	RotateIndex++;
	if (RotateIndex == 4){
		RotateIndex = 0;
	}
	CaptureOcx.setRotate(RotateIndex);
}

function RightRotate_IMG(){
	RotateIndex--;
	if (RotateIndex == 0){
		RotateIndex = 4;
	}
	CaptureOcx.setRotate(RotateIndex);
}

function changeImg(obj,picName){
	obj.src = picName;
}