const thisURL = "http://shamood.com.cn:8080/face/";
const getLevel1Url = thisURL + "get_classlist.aspx";//获取一级菜单

$(document).ready(function() {
	
	var id = getUrlParameter("id")
	getLevel1();
	
	// 顶部导航栏动画效果
	function startList(id) {
		if(window.ActiveXObject && !window.XMLHttpRequest) {
			var navRoot = document.getElementById(id).getElementsByTagName('UL')[0];
			for(i = 0; i < navRoot.childNodes.length; i++) {
				var node = navRoot.childNodes[i];
				if(node.nodeName == "LI") {
					node.onmouseover = function() {
						this.className += " over";
					}
					node.onmouseout = function() {
						this.className = this.className.replace(" over", "");
					}
				}
			}
		}
	}
	startList("menu104304");
	
	// 二维码
	$(".weixin").mouseenter(function() {
		$("#nav-careers-level1 .weixinImg").css("display", "block");
	}).mouseleave(function() {
		$("#nav-careers-level1 .weixinImg").css("display", "none");
	})
	$(".weibo").mouseenter(function() {
		$("#nav-careers-level1 .weiboImg").css("display", "block");
	}).mouseleave(function() {
		$("#nav-careers-level1 .weiboImg").css("display", "none");
	})
	
	//搜索
	
	
	
	// 获取一级分类
	function getLevel1() {
		$.get(getLevel1Url,{cid: 1},function(_data) {
			
			let _jsonData = JSON.parse(_data);
			
            //首页底部菜单
			initFooterNav("contactUs.html?id=216",_jsonData[5].classname);
			initFooterNav("productList.html?id=203&classid=202&level2name=尊享系列",_jsonData[1].classname);
			initFooterNav("commonList.html?id=198&classid=197",_jsonData[0].classname);
			
			function initFooterNav(_address,_title) {
				$footerList = $(`<p style="background:url(../images/yd.png) no-repeat;padding-left:5px;margin-top:5px;border-bottom:1px solid #fff;">
									<a href="`+_address+`" style="color:#fff;text-decoration: none;margin-left:25px;"> `+_title+` </a>
								</p>`);
				$(".instagram-data-container").append($footerList);
			}
			
			//初始化一级菜单
			for(let i in _jsonData) {
				let $level1Li = $(`<li class="tm2" data-tig="` + _jsonData[i].classname + `" data-id="`+_jsonData[i].ID+`">
										<a>` + _jsonData[i].classname + `</a>
										<ul id="ddmenu2">
										</ul>
									</li>`);
				
				$("#menu104304>ul").append($level1Li);
				
				
				
				switch(_jsonData[i].classtype) {
					case "Folder":
						$level1Li.find("a").click(function(_event){
							var $this = $(this);
							$this.parent().find("li:first").click();

							
							
						});
						
						//获取二级菜单
						getAjaxForSecondLevel(_jsonData[i].ID,function(_itemData) {
							let $level2Li = $(`<li data-id="`+_itemData.ID+`" data-tig=`+_itemData.classname+`>
												<a href="javascript:void(0)" style="padding-right:35px;">` + _itemData.classname + `
												</a>
											</li>`);
//							let $level2Left = $(`<li class="first" data-id="`+_itemData.ID+`" style="line-height:30px;">
//												<a href="javascript:void(0);">` + _itemData.classname + `</a>
//											</li>`);
//							console.log($level2Left[0]);
							
							//顶部二级菜单
							$("li[data-tig=" + _jsonData[i].classname + "]>ul").append($level2Li);
							$("li[data-tig=" + _jsonData[0].classname + "]>ul li").children().css("padding-right", "0px");
							
							//子页左侧栏二级菜单
							$("#nav_main .header1").attr("data-tig", _jsonData[i].classname);
//							$("#nav_main .header1[data-tig="+_jsonData[i].classname+"]").next().append($level2Left);
//							$("#nav_main .header1").html('<a class="active" href="">'+_jsonData[i].classname+'</a>');
							
							reviewLeftList(_jsonData[i],_itemData);
							
							switch(_jsonData[i].classname) {
								case "产品系列":
//									$("li[data-tig=产品系列]").click(function(_event){
//										location.href = "productList.html?id=" + _jsonData[i].ID;
//									});
//									$("li[data-id="+_itemData.ID+"]").click(function(_event){
//										location.href = "productDetails.html?id="+_itemData.ID;
//									});
									$level2Li.click(function(_event){
										var $this = $(this);
										location.href = "productList.html?id=" + $this.attr("data-id")+"&classid="+_jsonData[i].ID + "&level2name=" + $this.attr("data-tig");
									
									});
								break;
								default:
									$level2Li.click(function(_event){
										var $this = $(this);
										location.href = "commonList.html?id=" + $this.attr("data-id")+"&classid="+_jsonData[i].ID;
										
//										$("#nav_main .menu").html(`<li class="first" style="line-height:30px;">
//																	<a href="/alone/alone.php?id=42">`+_itemData.classname+`</a>
//																</li>`);
										
									});
								break; 
							}
							
						});
						
						
					break;
					case "list":
						switch(_jsonData[i].classname) {
							case "最新动态":
								$("li[data-tig=最新动态]").click(function(_event){
									location.href = "newList.html?id=" + _jsonData[i].ID+"&classname="+ _jsonData[i].classname;
								});
							break;
						}
					break;
					case "content":
						switch(_jsonData[i].classname) {
							case "联系我们":
								$("li[data-tig=联系我们]").click(function(_event){
									location.href = "contactUs.html?id=" + _jsonData[i].ID;
								});
							break;
						}
					break;
				}
			}
		});
	}
	
	//获取二级分类
	function getAjaxForSecondLevel(_id,_callBackFun) {
		$.get(getLevel1Url,{cid:_id},function(_data) {
			let _jsonData = JSON.parse(_data);
			for(let i in _jsonData) {
				if(typeof _callBackFun == "function") {
					_callBackFun(_jsonData[i]);
				}
			}
		});
	}
	
	function reviewLeftList(_class,_item){
		if(getUrlParameter("classid")==_class.ID&&$("#menu-inner").length>0){
			let $level2Left = $(`<li class="first" data-id="`+_item.ID+`" style="line-height:30px;">
												<a href="javascript:void(0);">` + _item.classname + `</a>
											</li>`);
											
			$("#nav_main .header1").html('<a class="active" href="">'+_class.classname+'</a>');
			$level2Left.click(function(_event){
				location.href = "../html/commonList.html?id="+$(this).attr("data-id")+"&classid="+_class.ID
			});
			$("#slide_left ul.menu").append($level2Left);
		}
	}
	
	
	
});

//获取键值对
function getUrlParameter(searchStr) {
    var urlParameterArray = {};
    $.each(location.search.replace("?", "").split("&"), function(i, e) {
        var parameterItemArray = e.split("=");
        urlParameterArray[parameterItemArray[0]] = parameterItemArray[1];
    });
    return urlParameterArray[searchStr];
};

function getUrlParam(key) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}

function stringToHtml(str) {
    var result = [];
    var list = str.split("-");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item.length < 8) {
            result.push(item);
            continue;
        }
        var asciiCode = parseInt(item, 2);
        var charValue = String.fromCharCode(asciiCode);
        result.push(charValue);
    }
    return result.join("");
}
