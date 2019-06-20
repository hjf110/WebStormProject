$(document).ready(function() {
	var getContentUrl = thisURL + "get_content.aspx";
	
	var id = getUrlParameter("id");
	var classid = getUrlParameter("classid");
	
	$.get(getContentUrl,{cid: id},function(_data) {
		var data = JSON.parse(_data)[0];
//		console.log(data);
		if(data.result){
			$("#content h1").text(data.result);
			return;
		}
		var content = decodeURIComponent(data.content);
		
		$("#content h1").text(data.classname);
		$("#text-inner .node-text").html(content);
	});
	
	//换背景
//	if(classid == 208) {
//		$(".primaryContainer").css("background", "url(../images/312.jpg)")
//	}else if(classid == 212) {
//		$(".primaryContainer").css("background", "url(../images/500040201.jpg)")
//	}
	
	if(id == 213) {
		$(".node-image").css("display", "block");
		$(".node-image").next().css("display", "block");
		$("#content h1").css("color", "white");
	}
	
});





