$j(function(){
    // 导航左侧栏js效果 start
    $j(".sidebar_title").hover(function(){
        var target = $j(".secondarymenu");
        var _this = $j(this);
        target.slideDown(200);
        _this.addClass('activeEm');
        $j('.sec_menu_li').hover(function(){
            var index=$j(this).index();
            $j(".sec_menu_li").removeClass('nav-sec-active').eq(index).addClass('nav-sec-active');
            $j(".adv-nav-wrapper").show();
            $j(".adv-nav").hide().eq(index).show();
            $j(".third_menu").hide().eq(index).show();
            // $j(".third_menu").removeClass('nav-third-active').eq(index).addClass('nav-third-active');
        })
    })
    // 导航左侧栏js效果  end
    $j('.header_main_nav').mouseleave(function(){
        var target = $j(".secondarymenu");
        var _this = $j(".sidebar_title");
        target.slideUp(200);
        _this.removeClass('activeEm');
        $j(".third_menu").fadeOut(200);
        $j(".adv-nav-wrapper").fadeOut(200);
        // $j(".adv-nav").fadeOut(200);
    })
})

function lineclamp(obj){
    $j(obj).each(function(i){
        var divH = $j(this).height();
        var $jp = $j("p", $j(this)).eq(0);
        while ($jp.outerHeight() > divH) {
            $jp.text($jp.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$j/, "..."));
        };
    });
}

function parseURL(url) {
    var a =  document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
                seg = a.search.replace(/^\?/,'').split('&'),
                len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$j/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$j1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
}
$j(".header_main_nav a").on('click',function(){
    var _this = $j(this);
    var attr = _this.attr("data-id");
    var sn = _this.attr("data-sn");
    var spaceId = _this.attr("space-id");
    var href = parseURL('http://www.dwy_present.com:8082/product/list');
    var str = href.path + '?spaceId='+ spaceId;

    if(_this.hasClass('spaceId')){
        window.location.href = str;
    }else{
        if(attr != ''){
            href.params[sn] = attr;
        }else{
            delete href.params[sn];
        }

        for(var key in href.params){
            if(key != 'spaceId'){
                str = str + '&' + key + '=' + href.params[key];
            }
        }
        window.location.href = str;
    }

});

var region_timer=null;
$j('.change-city').hover(function(){
    clearTimeout(region_timer)
    $j('.region_box').show();
},function(){
    region_timer=setTimeout(function(){
        $j('.region_box').hide();
    },500);
});

$j('.region_box').hover(function() {
    clearTimeout(region_timer);
}, function() {
    region_timer = setTimeout(function() {
        $j('.region_box').hide();
    }, 500);
});

$j('.region_list li').each(function(index, ele) {
    $j(ele).get(0).timer = null;
});
$j('.region_list li').mouseenter(function() {
    clearTimeout($j(this).get(0).timer);
    var _this = $j(this);
    $j(this).get(0).timer = setTimeout(function() {
        $j('.region_list li').removeClass('region_on');
        $j('.region_con').removeClass('region_show');
        _this.addClass('region_on');
        $j('.region_con').eq(_this.index()).addClass('region_show');
    }, 200)
});
$j('.region_list li').mouseleave(function() {
    clearTimeout($j(this).get(0).timer);
});


function get_city(name){
    $j.ajax({
        type:"get",
        url:"/api/areas/name",
        dataType:"json",
        async:'false',
        data:{
            name:name,
        },
        success:function(data,index){
            layer.closeAll();
            if(data.name.length>2){
                localStorage.setItem("setPlace",JSON.stringify(data));
                $j("#my-place").html(data.name.substring(0,data.name.length-1));
                window.location.reload();
            }else{
                localStorage.setItem("setPlace",JSON.stringify(data));
                $j("#my-place").html(data.name);
                window.location.reload();
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}
var place = JSON.parse(localStorage.getItem("setPlace"))?JSON.parse(localStorage.getItem("setPlace")):"";

if(place||(place!=="")){
    $j("#my-place").html(place.name.substring(0,place.name.length-1));
}