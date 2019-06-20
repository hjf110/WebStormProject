$(document).ready(function(){
	
	var getNewByIdUrl = thisURL + "get_newsbyid.aspx";//新闻详情接口
	
	var id = getUrlParameter("id");
	var classname = getUrlParam("classname");
	
	$.get(getNewByIdUrl,{N_ID: id},function(_data) {
		var _jsonData = JSON.parse(_data)[0];
		console.log(_jsonData);
		
		if(_jsonData.result) {
			$("#text-inner .node-text").html(_jsonData.result);
			return;
		}
			
		var detail = decodeURIComponent(_jsonData.detail);
//			console.log(_jsonData.detail)
		let $newsTitle = $(`<div class="actu-header">
								<div class='actu-date'>
									<span class="line-1" style="font-size:22px;">`+_jsonData.pubtime.substr(8,2)+`</span><span class="line-2">
									<span class="day"></span><span class="th"></span></span>
									<span class="line-3">`+_jsonData.pubtime.substr(0,7)+`</span> </div>

								<div class="actu-title">

									<div class="n_info_con" id="printableview">
										<h2 style="color:#000;">
                                    `+_jsonData.title+`</h2>

									</div>

								</div>

								<div class="actu-image">

									<imgsrc="" alt="" title="" class="imagecache imagecache-News imagecache-default imagecache-News_default" width="165" height="110" /> </div>

								<div class='node-text actu-text-inner clear-block'>
								
								</div>

							</div>`);
			
		$("#text-inner .node-content").html($newsTitle);
		$("#text-inner .node-content .node-text").html(detail);
		
		
	
		
	});
	var classid = $("li.tm2[data-tig=最新动态]").attr("data-id");
	console.log(classid);
	
	$("#page-title h1.h").text(classname);
	$("#nav_main .header1").html(`<a href="javascript:void(0);" class="active">`+classname+`
								</a>`).click(function(_event){
									$("li[data-tig="+classname+"]").click();
								});
	
});
