$(document).ready(function() {
	
	var getContentUrl = thisURL + "get_content.aspx";
	var id = getUrlParameter("id");
	
	$.get(getContentUrl,{cid: id},function(_data) {
		
		
		var _jsonData = JSON.parse(_data)[0];
//		console.log(_jsonData);
		
		var content = decodeURIComponent(_jsonData.content);
		$("#page-title h1.h").text(_jsonData.classname);
		$("#nav_main .header1 a").text(_jsonData.classname);
		$("#text-inner .node-content").html(content);
	})
	
})
