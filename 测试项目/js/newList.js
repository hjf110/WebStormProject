$(document).ready(function() {
	var getNewListUrl = thisURL + "get_newslist.aspx";//新闻列表接口
	
	var id = getUrlParameter("id");
	var classname = getUrlParam("classname");
//	console.log(classname)

	$.get(getNewListUrl,{cid: id},function(_data) {
		let _jsonData = JSON.parse(_data);
		
//		for(let i in _jsonData) {
//			let $newList = $(`<div class='node-text actu-text-inner clear-block' data-id=`+_jsonData[i].N_ID+` style="font-size:16px;">
//								<div class='actu-date'>
//									<span class="line-1" style="font-size:22px;">`+_jsonData[i].pubtime.substr(8,2)+`</span><span class="line-2">
//									<span class="day"></span><span class="th"></span></span>
//									<span class="line-3">`+_jsonData[i].pubtime.substr(0,7)+`</span></div>
//								<div class="actu-title" style="color:#000!important;">
//									<h2 style="color:#000;"><a style="color:#000!important;">`+_jsonData[i].title+`</a></h2>
//								</div>
//	
//								<p style="margin-top:20px;">
//									Learn more about third stop of our "Grand Tour" campaign
//								</p><br>
//							</div>
//							<br />`);
//			$(".actu-text").append($newList);
//			
//			$newList.click(function(_event) {
//				$this = $(this);
//				location.href = "newDetails.html?id=" + $this.attr("data-id")+"&classname="+classname;
//			});
//		}
		$("#page-title h1.h").text(classname);
		$("#nav_main .header1").html(`<a href="newList.html?id=`+id+`&classname=`+classname+`" class="active">`+classname+`
									</a>`)
		
		initPageView(_jsonData,4,function(_array){
			for(let i in _array) {
				let $newList = $(`<div class='node-text actu-text-inner clear-block' data-id=`+_array[i].N_ID+` style="font-size:16px;">
								<div class='actu-date'>
									<span class="line-1" style="font-size:22px;">`+_array[i].pubtime.substr(8,2)+`</span><span class="line-2">
									<span class="day"></span><span class="th"></span></span>
									<span class="line-3">`+_array[i].pubtime.substr(0,7)+`</span></div>
								<div class="actu-title" style="color:#000!important;">
									<h2 style="color:#000;"><a style="color:#000!important;">`+_array[i].title+`</a></h2>
								</div>
	
								<p style="margin-top:20px;">
									Learn more about third stop of our "Grand Tour" campaign
								</p><br>
							</div>
							<br />`);
			$(".actu-text").append($newList);
			
			$newList.click(function(_event) {
				$this = $(this);
				location.href = "newDetails.html?id=" + $this.attr("data-id")+"&classname="+classname;
			});
		}
		});
		
		
	});

	function getParameter(name) { 
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r!=null) return unescape(r[2]); return null;
	}
	
	//初始化分页函数,_array:数据的数组，_pageNum:每页几条,_callBackFun:是一个回调函数，用户来初始化页面
	function initPageView(_array,_pageNum,_callBackFun){
		//init
		
		var totalRecords = _array.length;//总数据条数
		var totalPage = Math.ceil(_array.length/_pageNum);//总页码
//		console.log(totalPage)
		var pageNo = getParameter('pno');
		if(pageNo){
			pageNo = pageNo>totalPage?totalPage:(pageNo<1?1:pageNo)
		}else{
			pageNo = 1;
		}
		
		
		//生成分页
		//有些参数是可选的，比如lang，若不传有默认值
		kkpager.generPageHtml({
			pno : pageNo,
			//总页码
			total : totalPage,
			//总数据条数
			totalRecords : totalRecords,
			//链接前部
			hrefFormer : 'newList',
			//链接尾部
			hrefLatter : '.html',
			getLink : function(n){
				return this.hrefFormer + this.hrefLatter + "?id="+id+"&classname="+classname+"&pno="+n;
			}
			/*
			,lang				: {
				firstPageText			: '首页',
				firstPageTipText		: '首页',
				lastPageText			: '尾页',
				lastPageTipText			: '尾页',
				prePageText				: '上一页',
				prePageTipText			: '上一页',
				nextPageText			: '下一页',
				nextPageTipText			: '下一页',
				totalPageBeforeText		: '共',
				totalPageAfterText		: '页',
				currPageBeforeText		: '当前第',
				currPageAfterText		: '页',
				totalInfoSplitStr		: '/',
				totalRecordsBeforeText	: '共',
				totalRecordsAfterText	: '条数据',
				gopageBeforeText		: '&nbsp;转到',
				gopageButtonOkText		: '确定',
				gopageAfterText			: '页',
				buttonTipBeforeText		: '第',
				buttonTipAfterText		: '页'
			}*/
			
			//,
			//mode : 'click',//默认值是link，可选link或者click
			//click : function(n){
			//	this.selectPage(n);
			//  return false;
			//}
		});
		if(typeof _callBackFun == "function"){
			
			_callBackFun(_array.slice((pageNo-1)*_pageNum,(pageNo-1)*_pageNum+_pageNum));
		}
	}
	
		
});
