$(document).ready(function() {
	var getProductListSm = thisURL + "get_productlist.aspx";
	var getProductById = thisURL + "get_productbyid.aspx";
	
	var getSearchProduct = thisURL + "search_product.aspx";
	
	var key = getUrlParam("key");
	
//	$.get(getSearchProduct,{key: key},function(_data) {
//		
//		var _jsonData = JSON.parse(_data);
//		console.log(_jsonData);
//		
//	});
	
	
	
	$.get(getSearchProduct,{key: key},function(_data) {
		
		var _jsonData = JSON.parse(_data);
//		 console.log(_jsonData[0].result)
		if(_jsonData[0].result){
			$(".productBox .tips").text(_jsonData[0].result);
			return;
		} else {
			for(let i in _jsonData) {
				var $productImg = $(`<div id="imgs" class="imgs" data-pro-id="`+_jsonData[i].Pro_ID+`" style="display: inline-block;">
										<dl class="dl_sb">
											<dt><img src="`+_jsonData[i].imgurl+`" border="0" alt="`+_jsonData[i].title+`"></dt></dl>
										<div class="title" style="text-align: center;">`+_jsonData[i].title+`</div>
									</div>`);
				
				$("#text-inner .box .productBox").append($productImg);
				$("#layOutBox .infoBox .title").text(_jsonData[i].title);
				
				$productImg.click(function(_event) {
					var $this = $(this);
					$("#layOutBox").css("display", "block");
					
					var proid = $this.attr("data-pro-id");
					
					$.get(getProductById,{Pro_ID: proid},function(_data){
						
						var _jsonData = JSON.parse(_data)[0];
						var str = decodeURIComponent(_jsonData.detail);
						
						$("#layOutBox .infoBox .infoText").html(str);
	
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
		}
		
		
		
	});
	
	$(".exit").click(function() {
		$this = $(this);
		$("#layOutBox").css("display", "none");
		
	});
	
});
