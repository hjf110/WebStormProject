


var tab_id = 1;
var tabIdArr = [];
var layer;
var element;
var cateIds = [];


$(function () {
    // layui.config({
    //     base: './tools/layuiadmin/' //静态资源所在路径
    // }).extend({
    //     index: 'lib/index' //主入口模块
    // }).use('index');

    //加载弹出层
    layui.use(['form', 'element'],
        function () {
            layer = layui.layer;
            element = layui.element;


            //监听tab切换
            element.on('tab(xbs_tab)', function (data) {
                // console.log(this); //当前Tab标题所在的原始DOM元素
                // console.log(data.index); //得到当前Tab的所在下标
                // console.log(data.elem); //得到当前的Tab大容器
                var tid = $(this).attr("lay-id");
                tabIdArr.push(tid);
                tab_id = tid;
                // console.log("tab的id---",tid);
            });

            layer.tips('页面刷新按钮', '#refresh', {tips: [4, '#42B8F1'], tipsMore: true});
            layer.tips('页面操作按钮', '.cz', {tips: [2, '#42B8F1'], tipsMore: true});


            $(".layui-nav-item").mouseover(function () {
                var that = $(this);
                if (that.attr("hua-show") == "yes") {
                    $(".layui-nav-bar").hide();
                }
            }).mouseout(function () {
                $(".layui-nav-bar").show();
            });

            $("dl dd").mouseover(function () {
                var a = $(this).children("a");
                if ($(this).attr("class") != "layui-this") {
                    a.css("color", "#42B8F1");
                    a.css("background", "#ECF5FF");
                } else {
                    a.css("color", "#ffffff");
                    a.css("background", "#42B8F1");
                }
            }).mouseout(function () {
                var a = $(this).children("a");
                if ($(this).attr("class") != "layui-this") {
                    a.css("color", "black");
                    a.css("background", "#ffffff");
                } else {
                    a.css("color", "#ffffff");
                    a.css("background", "#42B8F1");
                }
            });
            $("dl dd a").on("click", function () {
                $("dl dd a").each(function () {
                    $(this).css("color", "black");
                    $(this).css("background", "#ffffff");
                });
                $(this).css("color", "#ffffff");
                $(this).css("background", "#42B8F1");
            });

            $(".layui-nav-item dl").mouseleave(function () {
                setTimeout(function () {
                    $("dl dd a").each(function () {
                        $(this).css("color", "black");
                        $(this).css("background", "#ffffff");
                    });
                    $("dl dd").each(function () {
                        $(this).attr("class", "");
                    });
                }, 1000);

            })


        });

    //触发事件
    var tab = {
        tabAdd: function (title, url, id) {
            //新增一个Tab项
            //   element.tabAdd('xbs_tab', {
            //       title: title
            //       ,content: ' <div class="layui-body" >\n' +
            //           '            <div class="layadmin-tabsbody-item layui-show">\n' +
            //           '                <!--src="${pageContext.request.contextPath }/voteback/tohome.html" -->\n' +
            //           '                <iframe tab-id="'+id+'"  src="'+url+'" scrolling="yes" frameborder="0" class="layadmin-iframe x-iframe" src="index_home.html"></iframe>\n' +
            //           '            </div>\n' +
            //           '        </div>'
            //       ,id: id
            //   })

            $(".page-content .layui-tab-title li").each(function () {
                if ($(this).attr("data-type") != "yes") {
                    $(this).attr("class", "");
                } else if ($(this).attr("data-type") == "yes") {
                    $(this).attr("class", "home ");
                }
            });


            element.tabAdd('xbs_tab', {
                title: title
                ,
                content: '<iframe id="iframe' + id + '" tab-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>'
                ,
                id: id
            });


            $(".page-content .layui-tab-title li").mouseover(function () {
                console.log("有了");

                if ($(this).attr("class") != "layui-this") {
                    if ($(this).attr("data-type") == "yes") {
                        $(this).attr("class", "home aaa");
                    } else {
                        $(this).attr("class", "aaa");
                    }
                }


            }).mouseout(function () {
                var className = $(this).attr("class");
                if ($(this).attr("class") != "layui-this") {
                    if ($(this).attr("data-type") == "yes") {
                        if ($(this).attr("class") == "home aaa layui-this") {
                            $(this).attr("class", "home aaa layui-this");
                        } else if ($(this).attr("class") == "home  layui-this") {
                            $(this).attr("class", "home aaa layui-this");
                        } else {
                            $(this).attr("class", "home");
                        }
                    } else if ($(this).attr("class") != "aaa layui-this") {
                        $(this).attr("class", "");
                    }
                }
            });
            $(".page-content .layui-tab-title li").on("click", function () {
                $(".page-content .layui-tab-title li").each(function () {
                    if ($(this).attr("data-type") != "yes") {
                        $(this).attr("class", "");
                    } else if ($(this).attr("data-type") == "yes") {
                        $(this).attr("class", "home ");
                    }
                });


            })


        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('xbs_tab', '44'); //删除：“商品管理”
            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function (id) {
            //切换到指定Tab项
            element.tabChange('xbs_tab', id); //切换到：用户管理
            tab_id = id;
        }
    };


    tableCheck = {
        init: function () {
            $(".layui-form-checkbox").click(function (event) {
                if ($(this).hasClass('layui-form-checked')) {
                    $(this).removeClass('layui-form-checked');
                    if ($(this).hasClass('header')) {
                        $(".layui-form-checkbox").removeClass('layui-form-checked');
                    }
                } else {
                    $(this).addClass('layui-form-checked');
                    if ($(this).hasClass('header')) {
                        $(".layui-form-checkbox").addClass('layui-form-checked');
                    }
                }

            });
        },
        getData: function () {
            var obj = $(".layui-form-checked").not('.header');
            var arr = [];
            obj.each(function (index, el) {
                arr.push(obj.eq(index).attr('data-id'));
            });
            return arr;
        }
    }

    //开启表格多选
    tableCheck.init();


    /*
    * 头部右边鼠标移入移出
    * */
    $(".layui-nav .layui-nav-item a").mouseover(function () {
        $(this).css("color", "gray");

    }).mouseout(function () {
        $(this).css("color", "black");
    });
    /*
    * 头部刷新按钮
    * */
    $("#refresh").on("click", function () {
        console.log("tab_id-----", tab_id);
        var re = $(this).children("a");
        document.getElementById("iframe" + tab_id + "").contentWindow.location.reload(true);


        re.attr("class", "layui-anim-rotate");

        setTimeout(function () {
            re.attr("class", " ");
        }, 1000);

    });


    /*
    * 菜单栏最小化
    * */
    var cc = 0;
    var dd = 0;
    var ee = 0;

    $(window).resize(function () {
        var width = $(window).width();//获取浏览器窗口宽度
        //console.log("页面宽度----", width);
        if (width < 768 && ee == 0) {
            $('.left-nav-box').animate({left: '-221px'});
            $('.page-content').animate({left: '0px'});
            $('.right-top-box').animate({left: '0px'});
            // $('#nav .open a').click();
            //$('#nav li a cite').hide();
            $('.page-content-bg').hide();
            //  console.log("页面变化了隐藏-----", cc);
            $('.left_open>.iconfont').html("&#xe86f;");
            cc = 1;
            dd = 1;
            ee = 1;
        } else if (width > 768 && ee == 1) {
            $('#nav li a cite').show();
            $('.left-nav-box').animate({left: '0px'});
            $('.page-content').animate({left: '221px'});
            $('.right-top-box').animate({left: '221px'});
            if ($(window).width() < 768) {
                $('.page-content-bg').show();
            }
            $('.left_open>.iconfont').html("&#xe870;");
            //  console.log("页面变化了显示-----", cc);
            cc = 0;
            dd = 1;
            ee = 0;
        }
    });


    $('.container .left_open').on("click", function (event) {
        if ($(window).width() >= 768) {
            if (cc == 0) {//显示的时候

                // $('.left-nav-box').animate({left: '-221px'}, 100);
                $('.page-content').animate({left: '70px'}, 100);
                $('.right-top-box').animate({left: '70px'}, 100);
                $('#nav .open>a').click();
                $('#nav li a cite').hide();
                $('.page-content-bg').hide();
                $('.left_open>.iconfont').html("&#xe86f;");

                console.log("隐藏-----", cc);
                cc = 1;
                dd = 1;
            } else {
                $('#nav li a cite').show();
                $('.left-nav-box').animate({left: '0px'}, 100);
                $('.page-content').animate({left: '221px'}, 100);
                $('.right-top-box').animate({left: '221px'}, 100);
                if ($(window).width() < 768) {
                    $('.page-content-bg').show();
                }
                $('.left_open>.iconfont').html("&#xe870;");
                console.log("显示-----", cc);
                cc = 0;
                dd = 1;
            }
        } else if ($(window).width() < 768) {
            if ($('.page-content').css("left") == "221px") {
                $('.left-nav-box').animate({left: '-221px'}, 100);
                $('.page-content').animate({left: '0px'}, 100);
                $('.right-top-box').animate({left: '0px'}, 100);
                // $('#nav .open a').click();
                $('#nav li a cite').hide();
                $('.page-content-bg').hide();
                console.log("隐藏-----", cc);
                $('.left_open>.iconfont').html("&#xe86f;");
                cc = 1;
                dd = 1;
            } else {
                $('#nav li a cite').show();
                //$('#nav li a cite').show();
                $('.left-nav-box').animate({left: '0px'}, 100);
                $('.page-content').animate({left: '221px'}, 100);
                $('.right-top-box').animate({left: '221px'}, 100);
                // if ($(window).width() < 768) {
                $('.page-content-bg').show();
                //  }
                //  console.log("显示-----", cc);
                $('.left_open>.iconfont').html("&#xe870;");
                cc = 0;
                dd = 1;
            }
        }
    });

    $('#nav li').on("click", function () {
        if ($(window).width() >= 768) {
            if (cc == 1 && dd == 1) {
                $('#nav li a cite').show();
                $('.left-nav-box').animate({left: '0px'}, 100);
                $('.page-content').animate({left: '221px'}, 100);
                $('.right-top-box').animate({left: '221px'}, 100);

                if ($(window).width() < 768) {
                    $('.page-content-bg').show();
                }
                $('.left_open>.iconfont').html("&#xe870;");
                cc = 0;
                dd = 0;
                console.log("显示222-----", cc);
            }
        }
    });


    // $('.container .left_open i').toggle(
    //     function () {
    //         $('.left-nav-box').animate({left: '-221px'}, 100);
    //         $('.page-content').animate({left: '0px'}, 100);
    //         $('.page-content-bg').hide();
    //     },
    //     function () {
    //         $('.left-nav-box').animate({left: '0px'}, 100);
    //         $('.page-content').animate({left: '221px'}, 100);
    //         if ($(window).width() < 768) {
    //             $('.page-content-bg').show();
    //         }
    //     }
    // );


    $('.page-content-bg').click(function (event) {
        $('#nav li a cite').show();
        $('.left-nav-box').animate({left: '-221px'}, 100);
        $('.page-content').animate({left: '0px'}, 100);
        $('.right-top-box').animate({left: '0px'}, 100);
        // $('#nav .open a').click();
        $('#nav li a cite').hide();
        $('.page-content-bg').hide();
        console.log("隐藏-----", cc);
        $('.left_open>.iconfont').html("&#xe86f;");
        cc = 1;
        dd = 1;
        $(this).hide();
    });

    $('.layui-tab-close').click(function (event) {
        $('.layui-tab-title li').eq(0).find('i').remove();
    });


    $("tbody.x-cate tr[fid!='0']").hide();
    $('.x-show').click(function () {
        if ($(this).attr('status') == 'true') {
            // 栏目多级显示效果
            $("tbody tr[fid=" + cateId + "]").show();
            $(this).html('&#xe625;');
            $(this).attr('status', 'false');
            cateId = $(this).parents('tr').attr('cate-id');
        } else {
            cateIds = [];
            $(this).html('&#xe623;');
            $(this).attr('status', 'true');
            cateId = $(this).parents('tr').attr('cate-id');
            getCateId(cateId);
            for (var i in cateIds) {
                $("tbody tr[cate-id=" + cateIds[i] + "]").hide().find('.x-show').html('&#xe623;').attr('status', 'true');
            }
        }
    });


    //左侧菜单效果
    // $('#content').bind("click",function(event){
    //点击菜单显示效果
    $(document).ready(function () {
        $('.left-nav #nav li .sub-menu li ').click(function () {
            $(this).addClass('menu-current').siblings().removeClass('menu-current');
        })
    });

    $(".sub-menu li").on("click", function () {
        $(".sub-menu li").each(function () {
            $(this).attr("class", "");
        });
        $(this).attr("click", "menu-current");
    });


    $('.left-nav #nav li').click(function (event) {

        if ($(this).children('.sub-menu').length) {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).find('.nav_right').html('&#xe6a7;');
                $(this).children('.sub-menu').stop().slideUp();
                $(this).siblings().children('.sub-menu').slideUp();

            } else {
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('&#xe6a6;');
                $(this).children('.sub-menu').stop().slideDown();
                $(this).siblings().children('.sub-menu').stop().slideUp();
                $(this).siblings().find('.nav_right').html('&#xe6a7;');
                $(this).siblings().removeClass('open');
            }
        } else {
            var url = $(this).children('a').attr('_href');
            var title = $(this).find('cite').html();
            var index = $('.left-nav #nav li').index($(this));

            for (var i = 0; i < $('.x-iframe').length; i++) {
                if ($('.x-iframe').eq(i).attr('tab-id') == index + 1) {
                    tab.tabChange(index + 1);
                    event.stopPropagation();
                    return;
                }
            }
            ;
            tab.tabAdd(title, url, index + 1);
            tab.tabChange(index + 1);
        }
        event.stopPropagation();
    })

});


function getCateId(cateId) {

    $("tbody tr[fid=" + cateId + "]").each(function (index, el) {
        id = $(el).attr('cate-id');
        cateIds.push(id);
        getCateId(id);
    });
}

/*
* 参数说明res
* 1:关闭当前标签页
* 2:关闭其他标签页
* 3:关闭全部标签页
* */


function closetab(res) {
    console.log(res);
    switch (res) {
        case 1:
            if (tab_id != 1) element.tabDelete('xbs_tab', tab_id);
            break;
        case 2:
            $.each(tabIdArr, function (idx, obj) {
                if (obj != tab_id) {
                    if (obj != 1) element.tabDelete('xbs_tab', obj);
                }
            });
            tabIdArr = [];
            tabIdArr.push(tab_id);
            break;
        case 3:
            $.each(tabIdArr, function (idx, obj) {
                if (obj != 1) element.tabDelete('xbs_tab', obj);
            });
            tabIdArr = [];
            break;

    }
}


/*弹出层*/

/*
    参数解释：
    title   标题
    url     请求的url
    id      需要操作的数据id
    w       弹出层宽度（缺省调默认值）
    h       弹出层高度（缺省调默认值）
*/
function x_admin_show(title, url, w, h) {
    if (title == null || title == '') {
        title = false;
    }
    ;
    if (url == null || url == '') {
        url = "404.html";
    }
    ;
    if (w == null || w == '') {
        w = ($(window).width() * 0.9);
    }
    ;
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    }
    ;
    layer.open({
        type: 2,
        area: [w + 'px', h + 'px'],
        fix: false, //不固定
        maxmin: true,
        shadeClose: true,
        shade: 0.4,
        title: title,
        content: url
    });
}

/*关闭弹出框口*/
function x_admin_close() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}


