/*----------Set equal height Common Class ----------------*/
function setEqualHeight_CommonClass(arr) {
    var x = new Array([]);
    $j(arr).each(function (i) {
        $j(this).height('auto');
        x[i] = $j(this).height();
    });
    Max_Value = Array.max(x);
    $j(arr).each(function (i) {
        //if($j(arr[i]).height() != Max_Value)
        // {x[i] = $j(arr[i]).height(Max_Value);}
        $j(this).height(Max_Value);
    });
}
/*---- start equal height -----*/
function setEqualHeight(arr) {
    var x = new Array([]);
    for (i = 0; i < arr.length; i++) {
        x[i] = $j(arr[i]).height('auto');
        x[i] = $j(arr[i]).height();
    }
    Max_Value = Array.max(x);
    for (i = 0; i < arr.length; i++) {
        //if($j(arr[i]).height() != Max_Value)
        //	{x[i] = $j(arr[i]).height(Max_Value);}
        x[i] = $j(arr[i]).height(Max_Value);
    }
}
Array.max = function (array) {
    return Math.max.apply(Math, array);
};

/*----- end equal height -----*/

/* Smart Resize plug in starts */
(function($j,sr){

    var debounce = function (func, threshold, execAsap) {
        var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };
    // smartresize
    $j.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})($j,'smartresize');
/* Smart Resize plug in starts */



/* Character Restriction Starts */
function charRestriction(element, limit) {

    var currText = element.text();

    if (currText.length > limit) {
        var visibleText = $j("<span>" + currText.substr(0, limit - 1) + "</span>");
        var dots = $j("<span class='dots'>... </span>");
        element.empty()
            .append(visibleText)
            .append(dots);
    }
}
/* Character Restriction Ends */


function showV(element) {
    element.css('visibility', 'visible');
}

function hideV(element) {
    element.css('visibility', 'hidden');
}

/*----- Search <start> ------*/
//$j("#searchTextbox").css('display','none');
$j('#SearchButtonContainer').click(function(){
    if ($j("#searchTextboxContainer").hasClass("opened")) {
        if ($j("#searchTextboxContainer #searchTextbox").val() != "Search") {
//          document.getElementById("searchButton").click();
			location.href = "searchProduct.html?key=" + $("#searchTextboxContainer input[type=text]").val();
        } else {
            $j("#searchTextboxContainer").fadeOut("slow");
            $j("#searchTextboxContainer").removeClass("opened");
        }
    } else {
        $j("#searchTextboxContainer").fadeIn("slow");
        $j("#searchTextboxContainer").addClass("opened");
    }
});

$j("#overlay-SearchButtonContainer").click(function(){
    $j(".overlay-search-container").slideToggle();
});

$j('#mobi-SearchButtonContainer').click(function(){
    $j("#mobi-topnavigation-container").slideDown();
    $j(".overlay-search-container").slideDown();
    $j("body").toggleClass("overflow-hidden");
});

/*----- Search <end> ------*/


var $window = $j(window);
var $slidesArray = $j('#slide1,#slide2,#slide3,#slide4,#slide5');
var hoverBoxOpen = false;
$j(document).ready(function () {

    /*-------Download Center<start>--------*/
    // $(function() {
    // $j( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    // $j( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    // });
    $j('.tabs-content #download-center-tabs').hide();
    $j('.tabs-content .download-center-tabs').eq(0).addClass('show');
    $j('.tabs-list li').eq(0).addClass('current');
    /*$j('.tabs-list li').click(function(){
        var index = $j(this).index();
        $j('.tabs-list li').removeClass('current');
        $j(this).addClass('current');

        $j('.tabs-content .download-center-tabs').fadeOut(50, function() {
        $j('.tabs-content .download-center-tabs').removeClass('show');
         });

          $j('.tabs-content .download-center-tabs').eq(index).fadeIn(1000, function() {

       $j('.tabs-content .download-center-tabs').eq(index).addClass('show');


         });

    });*/




    /* ------------------ Snapdown Starts ------------ */
    $j('.download-snapdown-title.first').addClass('active');
    $j('.download-snapdown-title').click(function(){
        $j(this).toggleClass('active');
        $j(this).next().slideToggle();
        $j('.download-snapdown-title').not(this).next().slideUp();
        $j('.download-snapdown-title').not(this).removeClass('active');

    });
    /* ------------------ Snapdown Ends ------------ */

    /*-------Download Center<end>--------*/


    $j('.locations .filter-list').click(function(){
        $j(this).toggleClass('active');
        $j(this).next('ul').slideToggle();
    });


    /* Character Restriction For the element Starts */
    $j(".company-wrapper .company-link-box-list .company-link-box-item").each(function(){
        charRestriction($j(this).find(".box-link-content p"),130);
    });
    /* Character Restriction For the element Ends */

    /* ------------------ Search - Following function is used for <enter> issue in IE ------------ */
    $j("#searchTextboxContainer input").keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("searchButton").click();
            return false;
        }
    });

    $j("#searchTextBoxContainerRP input").keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("SearchbuttonRP").click();
            return false;
        }
    });

    $j("#overlaysearchTextbox").keypress(function (e) {
        if (e.keyCode == 13) {
            document.getElementById("SearchbuttonRP").click();
            return false;
        }
    });

    /* ------------------ <END> Following function is used for <enter> issue in IE ------------ */

    /*---------Include Respond.js in IE8 and below starts----------*/
    if($j('body').is('.ie8, .ie7, .ie6')){
        $j.getScript("/javascripts/respond.js",function(){/*alert('respond,js loaded');*/});
    }
    /*---------Include Respond.js in IE8 and below ends----------*/



    /* ------------------ File extension to UPPERCASE in title attribute ------------------ */
    $j("a.media-link").each(function () {
        var tmpTxt = $j(this).attr("title").split(",");
        if (tmpTxt.length > 1) {
            tmpTxt[0] = tmpTxt[0].toUpperCase();
        }
        $j(this).attr("title", tmpTxt.join());
    });

    $j("a.media-link>img").each(function () {
        var tmpTxt = $j(this).attr("alt").split(",");
        if (tmpTxt.length > 1) {
            tmpTxt[1] = tmpTxt[1].toUpperCase();
        }
        $j(this).attr("alt", tmpTxt.join());
    });
    /* ------------------ <END> File extension to UPPERCASE in title attribute ------------ */

    /*-------Wrap tables except inv-responsive tables with horizontal scrollable wrapper Starts--*/
    //$j('#contentwrapper table').not('.inv-responsive').wrap('<div class="scroll-table-container"></div>');

    $j('#contentwrapper table').not('.inv-responsive, .no-wrap').wrap('<div class="scroll-table-container"></div>');
    /*-------Wrap tables except inv-responsive tables with horizontal scrollable wrapper Ends--*/

    /*--------------------Snapdowns--------------------------------*/

    $j('.snapdown-title').click(function(e){
        e.preventDefault();
        if($j(this).parent().hasClass('active')){
            $j(this).parent().removeClass('active');
            $j(this).next('.snapdown-content').slideUp();
            $j(this).parent().removeClass('active');
        }
        else{
            $j('.snapdownItem').removeClass('active');
            $j('.snapdown-content').slideUp();
            $j(this).parent().addClass('active');
            $j(this).next('.snapdown-content').slideDown("slow",function(){
                if($j(window).width() < 769){
                    $j.scrollTo($j(this).parent().offset().top - $j(".mobi-headerwrapper").innerHeight(), 500);
                }else{
                    $j.scrollTo($j(this).parent().offset().top - $j("#headerwrapper").innerHeight(), 500);
                }


            });

        }

    });

    $j(".mobi-nav-icon").click(function(){
        $j("#mobi-topnavigation-container").slideToggle();
        $j("body").toggleClass("overflow-hidden");
    });

    $j(".mobi-close").click(function(){
        $j("#mobi-topnavigation-container").slideToggle();
        $j("body").toggleClass("overflow-hidden");
    });

    if($j(window).width() > 991){

        if ($j(document).scrollTop() > 81) {
            $j("#headerwrapper").addClass("fix-position");

        } else {
            $j("#headerwrapper").removeClass("fix-position");

        }

        /* Header Starts */
        $j(window).scroll(function(){
            if ($j(document).scrollTop() > 81) {
                if(!$j("#headerwrapper").hasClass("fix-position")){
                    $j("#headerwrapper").addClass("fix-position");
                }
            } else {
                $j("#headerwrapper").removeClass("fix-position");
            }
        });
        /* Header Ends */

    }


//  if($j(window).width() <= 991){
//
//      if ($j(document).scrollTop() > 91) {
//          $j(".mobi-headerwrapper").addClass("fix-position");
//
//      } else {
//          $j(".mobi-headerwrapper").removeClass("fix-position");
//
//      }
//
//
//      $j(window).scroll(function(){
//          if ($j(document).scrollTop() > 91) {
//              if(!$j(".mobi-headerwrapper").hasClass("fix-position")){
//                  $j(".mobi-headerwrapper").addClass("fix-position");
//              }
//          } else {
//              $j(".mobi-headerwrapper").removeClass("fix-position");
//          }
//      });
//
//
//  }
    




    /* Hover Boxes Starts */
    var $slidesArray1 = [];
//$j(".home-section1-box").on("click",function() {

    $j(document).on("click", ".home-section1-box" ,function(e) {

        if($j(e.target).parents(".title-linked").length === 0){
            var toBeShown = $j(this).attr("data-class");//data-class = "taste  smell  sustain"改为 type0,1,2
//          if(!$j('.hover-click-box-container').find("." + toBeShown).is(":visible")){
//              hideV($j(".expand-arrow"));
//              showV($j(this).parent(".hover-effect-box").find(".expand-arrow"));
//              $j('.hover-click-box-container').find('.home-section1-box-expand').hide();
//              $j('.hover-click-box-container').find("." + toBeShown).show();
//
//              $j("#slide2").addClass("no-translation");
//              hoverBoxOpen = true;
//          }
//          else{
//              $j('.hover-click-box-container').find("." + toBeShown).hide();
//              hideV($j(this).parent(".hover-effect-box").find(".expand-arrow"));
//              $j("#slide2").removeClass("no-translation");
//              hoverBoxOpen = false;
//          }

            if($j("body").attr("id") == "ip3-Homepage"){
                if($j(window).width() > 749){
                    $slidesArray1 = $j('#slide1,#slide2,#slide3,#slide4,#slide5');
                    $slidesArray1.each(function(i){
                        if($j(this).attr('data-index') > 2){
                            if($j(window).width() > 768){
                                offsetTops[i] = $j(this).offset().top - ($j("#headerwrapper").height());
                            }
                            else{
                                offsetTops[i] = $j(this).offset().top - ($j(".mobi-headerwrapper").height());
                            }
                        }
                    });
                }else{
                    $slidesArray1 = $j('#slide1,#slide2,#mobi-slide3,#mobi-slide4,#slide5');
                    $slidesArray1.each(function(i){
                        if($j(this).attr('data-index') > 1){
                            offsetTops[i] = $j(this).offset().top;
                        }
                    });
                }

                $j('#MainWrapper').css('min-height',$j('#skrollr-body').outerHeight());

            }
            if($j('.multimedia-item-wrapper').length > 0){

                $j(".multimedia-item-wrapper").each(function(){
                    $j(this).removeClass("active");
                });
                $j(".multimedia-item-wrapper").removeClass("active");
                $j('.multimedia-item-wrapper.first').addClass("active");

                $j(".big-image-container").html($j(this).parents(".hover-effect-box-container").find('.multimedia-item-wrapper.first .image-section .big-image').html());
            }
        }

    });




    /* Hover Boxes Ends */

    /* Side Bar Position Setting Starts */

//$j(".nav-container").css("right",($j(window).width() - $j("#MainHeader").width())/2);
    $j(".nav-container").height($j(".nav-container ul").height());

    var toggleWidth = "";
    if($j(window).width() >=750 && $j(window).width() <= 991)
    {
        setTimeout(function(){
            toggleWidth = $j(".nav-container").innerWidth() == 57 ? "367px" : "57px";
            $j('.nav-container').animate({ width: toggleWidth },function(){
                $j(".sprites-homebook").toggleClass("open");

            });
        },1500);

        setTimeout(function(){
            toggleWidth = $j(".nav-container").innerWidth() == 57 ? "367px" : "57px";
            $j('.nav-container').animate({ width: toggleWidth },function(){
                $j(".sprites-homebook").toggleClass("open");
            });
        },4000);
    }else if($j(window).width() > 991){
        setTimeout(function(){
            toggleWidth = $j(".nav-container").innerWidth() == 37 ? "363px" : "37px";
            $j('.nav-container').animate({ width: toggleWidth },function(){
                $j(".sprites-homebook").toggleClass("open");
            });
        },1500);

        setTimeout(function(){
            toggleWidth = $j(".nav-container").innerWidth() == 37 ? "363px" : "37px";
            $j('.nav-container').animate({ width: toggleWidth },function(){
                $j(".sprites-homebook").toggleClass("open");
            });
        },4000);
    }

    $j(".sidebar-home .sprites-homebook").click(function(e){
        e.preventDefault();

        if($j(window).width() >=750 && $j(window).width() <= 991)
        {
            toggleWidth = $j(".nav-container").innerWidth() == 57 ? "367px" : "57px";
        }else if($j(window).width() > 991){
            toggleWidth = $j(".nav-container").innerWidth() == 37 ? "363px" : "37px";
        }
        $j('.nav-container').animate({ width: toggleWidth });
        $j(this).toggleClass("open");
    });

    /* Side Bar Position Setting Ends */

    /* Homepage z-index assigning starts */


    var $holder = $j("#skrollr-body");
    var $slides = $holder.find(".skrollable").not(".home-slide-1");

    $slides.each(function(index, element) {
        $j(element).css("z-index", 100 + index);
    });

    /* Homepage z-index assigning ends */
    /* Mobi Show More Starts */
    $j('.mobi-navigation ul li.level1.haschildren').each(function () {
        $j(this).append('<a href="#" class="showmore"> </a>');
    });

    $j('.showmore').on('click', function (e) {
        e.preventDefault();
        if ($j(this).hasClass('selected')) {
            $j(this).parent().find('ul').slideUp();
            $j(this).removeClass('selected');
            $j(this).parent().removeClass('navopen');
            e.stopPropagation();
        } else {
            $j(".showmore").parent().find('ul').slideUp();
            $j(this).parent().find('ul:first').slideDown();
            $j(".showmore").removeClass('selected');
            $j(this).addClass('selected');
            $j(".showmore").parent().removeClass('navopen');
            $j(this).parent().addClass('navopen');
            e.stopPropagation();
        }
    });
    /* Mobi Show More Ends */

    $j(document).on("click touchstart",".down-arrow",function(){
        $j(this).parents(".company-link-box-item").find(".box-main-content").animate({
            scrollTop:$j(this).parents(".company-link-box-item").find(".box-link-content").height()
        },"slow");

        if($j(this).scrollTop() + $j(this).innerHeight() >= $j(this)[0].scrollHeight) {
            $j(this).parents(".company-link-box-item").find(".bottom-shadow-layer").hide();
        }
    });


    $j(".company-link-selection-text").click(function(){
        $j(this).parent().toggleClass("nav-open");
        $j(this).siblings("ul").slideToggle();
    });

    $j(".company-link-selection-text").text($j(".company-link-item-selector ul li:first-child").text().trim());
    $j(".company-link-item-selector ul li:first-child").addClass("hide");
    $j(".company-link-item-selector ul li").click(function(){
        $j(".company-link-item-selector ul li").each(function(){
            if($j(this).hasClass("hide")){
                $j(this).removeClass("hide");
            }
        });
        $j(this).addClass("hide");
        $j(".company-link-selection-text").text($j(this).text().trim());
        $j(this).parent().slideToggle();
        $j(this).parents(".company-link-item-selector").toggleClass("nav-open");
        var tobeFound = $j(this).attr("data-class");
        $j(".company-link-box-item").hide();

        $j(this).parents(".company-link-item-selector").siblings(".company-link-box-list").find(".company-link-box-item").each(function(){

            if($j(this).hasClass(tobeFound))
            {
                $j(this).show();
            }
        });
    });

    $j('.slider-boxes-container .box-main-content').bind('mousewheel DOMMouseScroll touchmove', function (e) {


        if($j(this).parents(".company-link-box-item").find(".bottom-shadow-layer").is(":visible")){
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;

            this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
            e.preventDefault();
        }
        if($j(this).scrollTop() + $j(this).innerHeight() >= $j(this)[0].scrollHeight) {
            $j(this).parents(".company-link-box-item").find(".bottom-shadow-layer").hide();
        }else{
            if(!$j(this).parents(".company-link-box-item").find(".bottom-shadow-layer").is(":visible")){
                $j(this).parents(".company-link-box-item").find(".bottom-shadow-layer").show();
            }
        }

    });

    $j(".mobi-navigation ul li.level1").each(function(){
        if($j(this).hasClass('selected')||$j(this).hasClass('current'))
        {
            $j(this).children('ul').show();
            $j(this).children('.showmore').addClass('selected');
        }

        if($j(this).hasClass("selected haschildren"))
        {
            if($j(this).find(".showmore").hasClass("selected"))
            {
                $j(this).addClass("navopen");
            }
        }
        if($j(this).hasClass("current haschildren"))
        {
            if($j(this).find(".showmore").hasClass("selected"))
            {
                $j(this).addClass("navopen");
            }
        }
    });

    $j(".video-layer-link").click(function(){
        var videoSrc = $j(".section-video iframe").attr('src');
        $j(this).hide();
        $j(".section-video iframe").attr('src', videoSrc + '&autoplay=1');
    });


    /**/
    $j(".video-link").click(function(){
        var videoSrc = $j(this).prev('.iframe-container').find('iframe').attr('src');
        $j(this).hide();
        $j(this).prev('.iframe-container').find('iframe').attr('src', videoSrc + '&autoplay=1');
    });

    /**/




    $j('.multimedia-item-wrapper.first').addClass("active");
    $j(".big-image-container").html($j('.multimedia-item-wrapper.first .image-section .big-image').html());

    $j(".image-section").click(function(){
        $j(".multimedia-item-wrapper").removeClass("active");
        $j(this).parent(".multimedia-item-wrapper").addClass("active");
        $j(".big-image-container").html($j(this).find(".big-image").html());
    });

    $j(window).smartresize(function(){

        if($j(window).width() >= 750 && $j(window).width() <= 991)
        {
            $j(".nav-container").css("width","57px");
        }else if($j(window).width() > 991){
            $j(".nav-container").css("width","37px");
        }
    });

    if($j(window).width() >= 640){
        setEqualHeight_CommonClass(".filter-results .address-item");
    }

    if($j(window).width() >= 750){
        setEqualHeight_CommonClass(".footer-pulled-content-container .footer-pulled-content-box");
    }



    if($j(window).width() >= 991){
        setEqualHeight_CommonClass(".pulled-content-section .section-title");
    }
    /* Sett Equal Height Ends */

    /* Otten-flavors newsletter tabs start here */
    $j('.nl-tab-title .nl-tab').click(function(){
        $j('.nl-tab-data').removeClass('show');
        $j('.nl-tab').removeClass('active');
        $j(this).addClass('active');
        $j('.'+$j(this).attr('id')).addClass('show');
    });
    /* Otten-flavors newsletter tabs end here */
});

$j(window).load(function(){
    /* Set Equal Height Starts */
    setEqualHeight_CommonClass(".company-info-item");
    if($j(window).width() > 768){
        setEqualHeight([".flavor-newsletter-section .left-section",".flavor-newsletter-section .right-section"]);
    }

    /* Set Equal Height Ends */




});





if ($j("body").attr("id") == "ip3-careers-at-airprocar"){


    var iframe = document.getElementById("ExternalWebContentExternalIFrame");
    iframe.onload = function() {
        document.body.scrollTop = 0;
    };


}

