$(document).ready(function() {
	var getProductListUrl = thisURL + "get_productlist.aspx";
	
	var id = getUrlParameter("id");
	var classid = getUrlParameter("classid");
	var level2name = getUrlParam("level2name");
	
	
	// 获取产品系列二级菜单
	$.get(getLevel1Url,{cid: classid},function(_data) {
		
		var _jsonData = JSON.parse(_data);
		console.log(_jsonData);
		
	
		// 大标题
		$(".header1 h1.h").text(level2name);
		
		for(let i in _jsonData){//data-class = "taste  smell  sustain"
			
			// 三大类系列
			var $topNav = $(`<div class="hover-effect-box" data-id="`+_jsonData[i].ID+`" style="width:290px;margin-left:20px;">
									<div class="home-section1-box pull-left full-width" data-class="type`+i+`">
										<a onclick="switchbox(`+i+`);" href="javascript:void(0);">
											<img alt="" class="img`+i+`" height="250" src="../images/tp`+i+`.png?h=250&amp;la=en&amp;w=180" width="313"></a>
										<div class="box-content-container" style="width:130px;height:80px;color:#fff;">

											<div class="box-title" style="font-family:Georgia bold, Sans-Serif;color:#fff;font-size:18px;text-shadow: 0 3px 3px #000;width:110px;height:80px; background:transparent;border:0px solid transparent;">
												`+_jsonData[i].classname+`</div>
											<div class="home-section1-box-description">
												<p></p>
											</div>
										</div>
									</div>

									<div class="expand-arrow" visibility="hidden">
										&nbsp;</div>
								</div>`);
				
			$("#text-inner .large-hover-effect-box-conainer").append($topNav);
//			$(".hover-effect-box[data-id='"+_jsonData[i].ID+"']").find(".expand-arrow").attr("visibility", "visible");
			
			$topNav.click(function(_event){				
				$("#menu104304 ul#ddmenu2 li[data-id="+_jsonData[i].ID+"]").click();				
//				alert($(this).find(".expand-arrow").attr("visibility"))				
			}); 		
			
			// 三大系列小系列内容盒子
			var $contentList = $(`<div class="row home-section1-box-expand type`+i+`" style="display: block;">	
								<div class="col-xs-12">
									<div class="expand-image col-md-4 col-sm-4" style="width:900px;margin-left:50px;">
									</div>
								</div>
							</div>`)
			$("#text-inner .hover-click-box-container").html($contentList);
		}
		
		//三大系列小系列内容
		$.get(getLevel1Url,{cid: id},function(_data) {
			
			$(".hover-effect-box[data-id="+id+"]").find(".expand-arrow").css("visibility", "visible")
			
			var _jsonData = JSON.parse(_data);
			console.log(_jsonData[0]);
			var $productListSm
			
			for(let i in _jsonData) {
				$productListSm = $(`<dl class="dl_sb" data-id="`+_jsonData[i].ID+`" data-tig="`+_jsonData[i].classname+`" style="width:400px;height:320px;padding:5px 0px;">
										<dt style="width:384px;height:260px;">
	                                <a href="javascript:void(0);"> <img alt="" border="0" src="`+_jsonData[i].imgurl+`" style="width:400px;height:260px;border:solid 1px #ccc"></a></dt>
										<dd style="width:384px;margin:15px 15px 0 0;line-height:30px;height;30px;">
											<a href="javascript:void(0);" style="font-size:18px;line-height:30px;height;30px;text-align:center;">`+_jsonData[i].classname+`</a>
										</dd>
									</dl>`)
				
				$(".home-section1-box-expand .expand-image").append($productListSm);
				
//				if(i/2 != 0) {
//					$productListSm.find("dd").css("margin-right", "70px");
//				}
				$("dl:even").css("margin-right", "70px");
				
				$productListSm.click(function(_event) {
					$this = $(this);
					location.href =  "productDetails.html?id=" + $this.attr("data-id")+"&classid="+classid+"&level2name="+level2name+"&level2id="+id+"&level3name="+$this.attr("data-tig");
				});
				
			}
			
			
			
		});
	});	

	// 定位导航栏
	var $currentPosition = $(`<a href="javascript:void(0);">`+level2name+`</a>`);
	$(".plc span").append($currentPosition);
	$currentPosition.click(function() {
		$("#menu104304 ul#ddmenu2 li[data-id="+id+"]").click();
	});
	
		
	// 变换背景
	 switchbox(id)
	 
//	var a=$(".hover-effect-box[data-id='203']").height()
//	alert(a+"")
	

});

function switchbox(a) {
	a= parseInt(a)-203;
	
	a == 0 ? $(".slide.slide3 .arrowcontainer").show() : $(".slide.slide3 .arrowcontainer").hide();
		$(".slide.slide3").removeClass("s0").removeClass("s1").removeClass("s2");
		$(".slide.slide3").addClass("s" + a);
		$(".slide.slide3 .img" + a).addClass("selected");
		$(".slide.slide3 .content").hide();
		$(".slide.slide3 .content.content" + a).show();
		$(".slide.slide3 .bgimg").remove();
}
