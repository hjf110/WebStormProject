const getNewsUrl = thisURL + "get_top6_news.aspx";//获取首页产品
var getNewByIdUrl = thisURL + "get_newsbyid.aspx";//新闻详情接口
var getBigImgTop3Url = thisURL + "get_bigimgTop3.aspx";//首页大轮播图

$(document).ready(function() {
	
	getNews();
	getBigImgTop3();
	
	function getNews() {
		
		$.get(getNewsUrl,{},function(_data) {
			
			let _jsonData = JSON.parse(_data);
			console.log(_jsonData);
			
			for(let i in _jsonData) {
				
				let $news = $(`<div class="homeNewsList" data-id="`+_jsonData[i].N_ID+`" data-name="`+_jsonData[i].title+`"> <a href="javascript:void(0);" title="`+_jsonData[i].title+`">
					          <div class="news_list_con"> <img src="`+_jsonData[i].imgurl+`" width="100%" class="">
					            <div class="news_zi">
					              <h5>`+_jsonData[i].title+`</h5>
					            </div>
					            <div class="pro_list_bg hidden-xs" style="opacity: 0.0178608;"></div>
					          </div>
					         </a> </div>`);
				$(".news_list .row").append($news);
				
				$news.click(function(_event) {
					$this = $(this);
					location.href = "newDetails.html?id=" + $this.attr("data-id")+"&classname="+"最新动态";
				});
			}
		})
	}
	
	function getBigImgTop3() {
		
		$.get(getBigImgTop3Url,{},function(_data) {
			
			let _jsonData = JSON.parse(_data);
			console.log(_jsonData);
			for(let i in _jsonData) {
				let $swiperImg = $(`<div class="swiper-slide header_main_middle" style="background: url(`+_jsonData[i].imgurl+`) no-repeat;background-size:cover;background-position:center center;width:100%;">
										
									</div>`);
				
				$swiperImg.appendTo($(".swiper-wrapper.header-main-container"));
			}
			
		})
		
	}
	
	$.get(getLevel1Url,{cid: 202},function(_data) {
		
		var _jsonData = JSON.parse(_data);
		console.log(_jsonData);
		
		for(let i in _jsonData) {
			let $product = $(`<div class="pro_list" style="top:0; opacity:1;"> <img src="`+_jsonData[i].imgurl+`" width="100%" onclick="location.href='productList.html?id=`+_jsonData[i].ID+`&classid=202&level2name=`+_jsonData[i].classname+`'">
					          <div class="pro_list_zi">
					            <h5 style="height:70px;text-align:left;">`+_jsonData[i].classname+`<span class="bt_en1"></span></h5>
					            <span></span> <a class="proa3" href="productList.html?id=`+_jsonData[i].ID+`&classid=202&level2name=`+_jsonData[i].classname+`">Learn more</a> </div>
					          <div class="pro_list_bg" onclick="location.href='productList.html?id=`+_jsonData[i].ID+`&classid=202&level2name=`+_jsonData[i].classname+`'" style="display: block;opacity: 0.3;"></div>
					        </div>`);
		
			$product.appendTo($("#slide2 .content_model_info .clp"));
		}
		
		
	});
	
});
