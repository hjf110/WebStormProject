//PDF控制对象,_workSrc为pdf.worker.js的相对路径,_id为canvas的id,_pdfUrl为pdf的路径文件
function PDFTool(_pdfUrl,_id,_workSrc){
	var thisPdf;
	var thisObj = this;
	var pageIndex = 1;
	var pageNum;
	PDFJS.workerSrc = _workSrc==null?'pdf.worker.js':_workSrc;//加载核心库
	
	var bgDiv,topBarBox,topInput,topSpan,topGoBtn,topNextBtn,topPrevBtn,topSmallerBtn,topBiggerBtn,pdfCanvas,closeBtn;
	
	this.showPDF = function(){
		if(!_id){
			bgDiv = document.createElement("div");
			bgDiv.className += "shadeBox";
			
			topBarBox = document.createElement("div");
			topBarBox.className += "topBar";
			
			topInput = document.createElement("input");
			topInput.className += "topInput";
			topInput.setAttribute("onkeyup",'this.value=this.value.replace(/[^0-9-]+/,"");')
			topInput.id = "topInput";
			
			topSpan = document.createElement("span");
			topSpan.className += "topSpan";
			topSpan.id = "topSpan";
			
			topGoBtn = document.createElement("button");
			topGoBtn.className += " topBtn";
			topGoBtn.className += " go";
			topGoBtn.innerHTML = "go";
			topGoBtn.id = "topGoBtn";
			
			topNextBtn = document.createElement("button");
			topNextBtn.className += " topBtn";
			topNextBtn.className += " next";
			topNextBtn.id = "topNextBtn";
			
			topPrevBtn = document.createElement("button");
			topPrevBtn.className += " topBtn";
			topPrevBtn.className += " prev";
			topPrevBtn.id = "topPrevBtn";
			
			topSmallerBtn = document.createElement("button");
			topSmallerBtn.className += " topBtn";
			topSmallerBtn.className += " smaller";
			topSmallerBtn.id = "topSmallerBtn";
			
			topBiggerBtn = document.createElement("button");
			topBiggerBtn.className += " topBtn";
			topBiggerBtn.className += " bigger";
			topBiggerBtn.id = "topBiggerBtn";
			
			closeBtn = document.createElement("button");
			closeBtn.className += " topBtn";
			closeBtn.className += " close";
			closeBtn.id = "closeBtn";
			
			topBarBox.appendChild(topSmallerBtn);
			topBarBox.appendChild(topPrevBtn);
			topBarBox.appendChild(topInput);
			topBarBox.appendChild(topSpan);
			topBarBox.appendChild(topGoBtn);
			topBarBox.appendChild(topNextBtn);
			topBarBox.appendChild(topBiggerBtn);
			topBarBox.appendChild(closeBtn);
			
			var canvasBox = document.createElement("div");
			canvasBox.className += "canvasBox";
			
			bgDiv.appendChild(topBarBox);
			bgDiv.appendChild(canvasBox);
			
			pdfCanvas = document.createElement("canvas");
			pdfCanvas.id = "the-canvas";
			pdfCanvas.style.height = "99%";
			
			canvasBox.appendChild(pdfCanvas);
			document.body.appendChild(bgDiv);
		}
		PDFJS.getDocument(_pdfUrl).then(function getPdfHelloWorld(_pdf) {
			thisPdf = _pdf;
			pageNum = _pdf.pdfInfo.numPages;
			
			if(!_id){
				document.getElementById("topSpan").innerHTML = "/"+pageNum+"页";
				setOnPDFClickListener();
			}
			
			thisObj.showPageIndexView(pageIndex);
		});
		return thisObj;
	}
	
	//根据根据页数跳转到相应页面，_pageIndex为页数
	this.showPageIndexView = function(_pageIndex){
		try{
			_pageIndex = parseInt(_pageIndex);
		}catch(_e){
			return;
		}
		
		if(_pageIndex>0&&_pageIndex<=pageNum){
			thisPdf.getPage(_pageIndex).then(getPDFPage);
			pageIndex = _pageIndex;
			if(!_id){
				document.getElementById("topInput").value = pageIndex;
			}
			return thisObj;
		}else{
			return false;
		}
		
	}
	
	//获取到当前页数
	this.getPageIndex = function(){
		return pageIndex;
	}
	
	//跳转到下一页
	this.nextPageView = function(){
		if(pageIndex+1<=pageNum){
			thisObj.showPageIndexView(++pageIndex);
			return thisObj;
		}else{
			return false;
		}
	}
	
	//跳转到上一页
	this.prevPageView = function(){
		if(pageIndex-1>0){
			thisObj.showPageIndexView(--pageIndex);
			return thisObj;
		}else{
			return false;
		}
	}
	
	
	function getPDFPage(_page) {
		var scale = 1.5;
		var viewport = _page.getViewport(scale);

		//
		// Prepare canvas using PDF page dimensions
		//
		var canvas = document.getElementById(_id!=null?_id:'the-canvas');
		var context = canvas.getContext('2d');
		canvas.height = viewport.height;
		canvas.width = viewport.width;

		//
		// Render PDF page into canvas context
		//
		var renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		_page.render(renderContext);
	};
	
	//设置点击事件
	function setOnPDFClickListener(){
		topBiggerBtn.addEventListener("click",function(_event){
			var num = parseInt(pdfCanvas.style.height.replace("%","")) + 20;
			if(num<180){
				pdfCanvas.style.height = num + "%";
			}
			
		});
		
		topSmallerBtn.addEventListener("click",function(_event){
			var num = parseInt(pdfCanvas.style.height.replace("%","")) - 20;
			if(num>40){
				pdfCanvas.style.height = parseInt(pdfCanvas.style.height.replace("%","")) - 20 + "%";
			}
		});
		
		topNextBtn.addEventListener("click",function(_event){
			thisObj.nextPageView();
			
		});
		
		topPrevBtn.addEventListener("click",function(_event){
			thisObj.prevPageView();
		});
		
		topGoBtn.addEventListener("click",function(_event){
			if(topInput.value!=null&&topInput.value.length>0){
				thisObj.showPageIndexView(topInput.value);
			}
		});
		
		closeBtn.addEventListener("click",function(_event){
			bgDiv.parentNode.removeChild(bgDiv);
		});
	}
	
}
		