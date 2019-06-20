var table;





layui.use(['table', 'laydate'], function () {
    table = layui.table;
    var form = layui.form,
        laydate = layui.laydate;


    var app1 = new Vue({
        el: "#app1",
        data: {
            start: "",
            end: ""
        },
        methods: {

        }
    });




    //日期选择后的糊掉
    laydate.render({
        elem: '#all',
        range: "至"
        , done: function (value, date, endDate) {
            console.log(value); //得到日期生成的值，如：2017-08-18
            console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
            app1.start = date.year + "-" + date.month + "-" + date.date;
            app1.end = endDate.year + "-" + endDate.month + "-" + endDate.date;

            console.log(app1.start);
            console.log(app1.end);
        }
    });

    //日期选择后的糊掉
    // laydate.render({
    //     elem: '#end'
    //     , done: function (value, date, endDate) {
    //         console.log(value); //得到日期生成的值，如：2017-08-18
    //         console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
    //         console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
    //         app1.start = date.year + "-" + date.month + "-" + date.date;
    //         app1.end = endDate.year + "-" + endDate.month + "-" + endDate.date;
    //         console.log(app1.start);
    //     }
    // });


    //渲染数据表格
    table.render({
        elem: '#table_all',
        id: 'table_all',
        url: "tsconfig.json",
        // parseData: function (res) {
        //     console.log(res);
        //     return {
        //         "code": res.code, //解析接口状态
        //         "msg": res.msg, //解析提示文本
        //         "count": res.data.total, //解析数据长度
        //         "data": res.data.list //解析数据列表
        //     };
        // },
        // request: {
        //     pageName: 'page' //页码的参数名称，默认：page
        //     , limitName: 'count' //每页数据量的参数名，默认：limit
        // },
        cols: [[
            {
                type: 'checkbox',
                //fixed : 'left'
            }
            , {
                field: 'id',
                title: '序号',
                //style : 'height:60px;width:60px;line-height:60px!important;',
                //fixed : 'left',
                sort: true
            }
            , {
                field: 'full_name',
                title: '日期'
                //style : 'height:60px;width:60px;line-height:60px!important;',
                // templet: '<div><img src="${pageContext.request.contextPath}{{d.image}}"></div>'
            }
            , {
                field: 'contacts',
                title: '注册量'
                // ,edit: 'text'
            }
            , {
                field: 'phone',
                title: '申请量'
                //,templet : '<div>{{d.ps1Name}}>{{d.ps2Name}}</div>',
            }
            , {
                field: 'create_time_str',
                title: '通过量',
                sort: true
            }
            , {
                field: 'create_time_str',
                title: '通过率',
                sort: true
            }
            , {
                field: 'create_time_str',
                title: '放款量',
                sort: true
            }
            , {
                field: 'create_time_str',
                title: '放款成功率',
                sort: true
            }
            , {
                field: 'create_time_str',
                title: '借款金额',
                sort: true
            }
            , {
                field: 'create_time_str',
                title: '实际放款金额',
                sort: true
            }
            // , {
            //     title: '操作',
            //     fixed: 'right',
            //     //width : 300,
            //     align: 'center',
            //     toolbar: '#barDemo'
            // }
        ]],
        page: true,
        limit: 20,
        limits: [20, 40, 60, 80, 100],
        toolbar: ''
    });


    //监听头工具事件
    table.on('toolbar(transport_unit_library)', function (obj) {
        switch (obj.event) {
            case 'reload':
                var demoReload = $('#demoReload');
                //执行重载
                table.reload('transport_unit_library', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: demoReload.val()
                    }
                });
                break;
            case 'add_library':
                var as = layer.open({
                    id: "add_library",
                    type: 2,
                    title: '添加客户单位库',
                    maxmin: true,
                    shadeClose: false,
                    shade: 0.8,
                    //area: ['1500px', '800px'],
                    //content : path+'/voteback/add.html',
                    content: 'customer_unit_library_add.html', //iframe的url
                    success: function (layero, index) {
                        //传入参数，并赋值给iframe的元素
                    }
                });
                layer.full(as);
                break;
            case 'del_library':
                var checkStatus = table.checkStatus(obj.config.id);
                var data = checkStatus.data;
                var allNews = JSON.stringify(data);
                layer.confirm('真的要删除吗', function (index) {
                    $.ajax({
                        type: "POST",
                        url: '<%=request.getContextPath()%>/voteback/pro/delAllPro',
                        data: {
                            "allNews": allNews
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.res == "yes") {
                                layer.alert("删除成功!");
                                $("#shuaxing").click();
                            } else if (data.res == "no") {
                                layer.alert("删除失败!");
                            } else {
                                layer.alert("请勾选要删除的数据");
                            }
                        },
                        error: function () {
                            alert("删除操作失败");
                        }
                    });
                });

                break;

        }


    });


    //监听工具条
    table.on('tool(transport_unit_library)', function (obj) {
        var data = obj.data;
        if (obj.event === 'detail') {
            //layer.msg('ID：' + data.id + ' 的查看操作');
            layer.open({
                id: "layer_say_hello",
                type: 2,
                title: data.title,
                maxmin: true,
                shadeClose: false,
                shade: 0.8,
                area: ['1000px', '800px'],
                //content : path+'/voteback/add.html',
                content: path + '/info/show/new-' + data.id + '.html?m=1', //iframe的url
                success: function (layero, index) {
                    //传入参数，并赋值给iframe的元素
                    $('#shuaxing').click();
                }
            });

        } else if (obj.event === 'del') {
            layer.confirm('真的要删除吗', function (index) {
                $.ajax({
                    type: "POST",
                    url: '<%=request.getContextPath()%>/voteback/pro/delPro',
                    data: {
                        "id": data.id,
                    },
                    dataType: "json",
                    success: function (data) {


                        if (data.res == "yes") {
                            layer.alert("删除成功!");
                            obj.del();
                            layer.close(index);
                        } else {
                            layer.alert("删除失败!");
                        }
                    },
                    error: function () {
                        alert("删除操作失败");
                    }
                });

            });
        } else if (obj.event === 'edit') {
            //layer.alert('编辑行：<br>' + JSON.stringify(data));
            var as = layer.open({
                id: "ModifityKH",
                type: 2,
                title: data.full_name,
                maxmin: true,
                shadeClose: false,
                shade: 0.8,
                area: ['1500px', '800px'],
                //content : path+'/voteback/add.html',
                content: 'customer_unit_library_Mot.html?id=' + data.id, //iframe的url
                success: function (layero, index) {
                    //传入参数，并赋值给iframe的元素
                }
            });
            layer.full(as);
        }
    });


    var $ = layui.$,
        active = {
            //关键字搜索
            reload: function () {
                var demoReload = $('#demoReload');
                var time = $('#time');
                console.log(demoReload.val());
                //执行重载
                table.reload('transport_unit_library', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: demoReload.val(),
                        dateStr: time.val()
                    }
                });
            },
            timeselect: function () {
                console.log(2222)
                var time = $('#time');
                var demoReload = $('#demoReload');
                console.log(time.val());
                table.reload('table_all', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    },
                    where: {
                        name: demoReload.val(),
                        dateStr: time.val()
                    }
                });
            },
            shuaxing: function () {
                //var demoReload = $('#demoReload');
                //执行重载
                table.reload('transport_unit_library', {
                    page: {
                        curr: 1 //重新从第 1 页开始
                    }
                });
            },
            addSort1: function () {
                //var demoReload = $('#demoReload');
                //弹出添加用户窗口
                var index = layer.open({
                    id: "addNews",
                    type: 2,
                    title: '添加新闻',
                    maxmin: true,
                    shadeClose: false,
                    shade: 0.8,
                    area: ['1500px', '800px'],
                    //content : path+'/voteback/add.html',
                    content: path + '/voteback/add.html', //iframe的url
                    success: function (layero, index) {
                        //传入参数，并赋值给iframe的元素
                    }
                });
                layer.full(index);
            }
        };


    $('.layui-form .layui-btn').on('click', function () {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });

});
