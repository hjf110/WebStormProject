$j(document).ready(function(){
 
if($j('.ingredientWrapper.itempage').length){
	/*if(!$j('body').hasClass('ip3-edit') && !$j('body').hasClass('ip3-preview') ){
    
    
	var productItemID = $j('.ingredientWrapper.itempage .resultitem').attr('id');
    var parentURL = $j('.ingredientWrapper.itempage .resultitem').attr('data-parenturl');
    var redirectURL = window.location.protocol+'//'+window.location.host+''+parentURL+'#'+productItemID;
    window.location.replace(redirectURL);
    }*/
}
else if(window.location.hash){

   var productItemHash = window.location.hash;
    productItemHash = productItemHash.replace('#','');
    var productItemOpen = $j('#'+productItemHash);
	if (productItemOpen.length && productItemOpen.hasClass('resultitem')) {
    	//$j(productItemOpen).find('.product-item-title a').trigger('click');

        filterItems();
setResultsCount();
       
        //if($j(productItemOpen).css("display")!="none"){
        //if($j(productItemOpen).index()<25){
        
      /* var scrollOffset;
       scrollOffset = productItemOpen.offset().top - 95;
       setTimeout(function(){
    	$j('html,body').animate({scrollTop:scrollOffset},0);	
       
    },1000);*/
         $j(productItemOpen).find('.product-item-title a').addClass('open');
         setTimeout(function(){
        	$j('.product-item-title a.open').trigger('click');
        },2000);
        
        //}
       
       
    }
    
}

});
