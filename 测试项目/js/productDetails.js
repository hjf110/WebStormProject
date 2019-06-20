$(document).ready(function() {
	var getProductListSm = thisURL + "get_productlist.aspx";
	var getProductById = thisURL + "get_productbyid.aspx";
	
	var id = getUrlParameter("id");
	var classid = getUrlParameter("classid");
	var level2name = getUrlParam("level2name");
	var level2id = getUrlParameter("level2id");
	var level3name = getUrlParam("level3name");
	
	$.get(getLevel1Url,{cid: classid},function(_data) {
		
		var _jsonData = JSON.parse(_data);
		console.log(_jsonData);
		
		//定位导航栏
		var $currentPosition = $(`<a href="javascript:void(0);">`+level2name+`&nbsp;&nbsp;&gt;&nbsp;&nbsp;</a>`);
		$(".box span").append($currentPosition);
		$currentPosition.click(function() {
			$("#menu104304 ul#ddmenu2 li[data-id="+level2id+"]").click();
		});
		var $currentPosition2 = $(`<a href="javascript:void(0);">`+level3name+`</a>`);
		$(".box span").append($currentPosition2);
		
		//大标题
		$(".header1 h1.h").text(level3name);
		
	});
	
	
	
	$.get(getProductListSm,{cid: id},function(_data) {
		
		var _jsonData = JSON.parse(_data);
//		console.log(_jsonData);
		
		for(let i in _jsonData) {
			var $productImg = $(`<div id="imgs" class="imgs" data-pro-id="`+_jsonData[i].Pro_ID+`" style="display: inline-block;">
									<dl class="dl_sb">
										<dt><img src="`+_jsonData[i].imgurl+`" border="0" alt="`+_jsonData[i].title+`"></dt></dl>
									<div class="title" style="text-align: center;">`+_jsonData[i].title+`</div>
								</div>`);
			
			$("#text-inner .box .productBox").append($productImg);
			$("#layOutBox .infoBox .title").text(_jsonData[i].title);
//			$imgDetail = $(`<div class="swiper-slide"><img src="`+_jsonData[i].imgurl+`" /></div>`);
//			$(".swiper-wrapper").append($imgDetail);
			
			$productImg.click(function(_event) {
				var $this = $(this);
				$("#layOutBox").css("display", "block");
				
				var proid = $this.attr("data-pro-id");
				
				$.get(getProductById,{Pro_ID: proid},function(_data){
					
					var _jsonData = JSON.parse(_data)[0];
					var str = decodeURIComponent(_jsonData.detail);
					
					$("#layOutBox .infoBox .infoText").html(str);
					
//					console.log(str);
//					console.log(_jsonData.imglist);
					
					//产品图集
					for(let i in _jsonData.imglist) {
						$imgDetail = $(`<div class="swiper-slide"><img src="`+_jsonData.imglist[i].imgurl+`" /></div>`);
						$(".swiper-wrapper").append($imgDetail);
					}
					
					var swiper = new Swiper('.swiper-container', {
					    loop : true,
					    prevButton:'.swiper-button-prev',
						nextButton:'.swiper-button-next'
					});
					
				});
				
			});
			
		}
		
	});
	
	$(".exit").click(function() {
		$this = $(this);
		$("#layOutBox").css("display", "none");
		
	});
	
});
