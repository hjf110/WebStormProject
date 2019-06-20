var list = null;
var vueSelf = null;
var controller = "";

var dedefaultFormInfo = function () {
    return {
        id: null,
        dicName: null,
        mark: null,
        explain: null,
        column: null,
        isUse: 1
    }
};

(function () {
    new Vue({
        el: '#armorapp',
        data: {
            q: {
                name: null
            },
            formInfo: dedefaultFormInfo(),
            showList: true,
            rowData: null

        },
        mounted: function () {
            vueSelf = this;
        },
        methods: {
            query: function () {
                list.bootstrapTableTemplateQuery(vueSelf.q);
            },
            save: function () {
                this.formInfo = dedefaultFormInfo();
                saveOrUpdateInfo({title: "添加字典"});
            },
            del: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                Tool.ajaxHelper.ajaxSubmit(ids, baseURL + "sysDictionary/delete", "POST", function (data) {
                    list.bootstrapTableTemplateQuery({});
                })
            }
        }
    })
})();


var saveOrUpdateInfo = function (option) {
    var options = {
        le: "#saveOrUpdate",
        size: [Tool.GetWidth(0.5), Tool.GetHeight(0.7)],
        buttonCallback: [function (layerDialog) {
            if (vueSelf.$data.formInfo.id != null) {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "sysDictionary/update", "POST", function (data) {
                    layer.close(layerDialog.index);
                })
            } else {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "sysDictionary/save", "POST", function (data) {
                    layer.close(layerDialog.index);
                })
            }
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }

    options = $.extend(true, option, options);
    $.layerDialog(options);
}

$(function () {
    var options = {
        url: baseURL + 'sysDictionary/list',
        columnModel: [
            {
                label: 'ID',
                name: 'id',
                index: "id",
                width: 45,
                key: true,
                hidden: true
            },
            {
                label: '字典名称',
                name: 'dicName',
                sortable: false,

            },
            {
                label: '字典编码',
                name: 'mark',
                sortable: false,

            },
            {
                label: '库编码',
                name: 'column',
                sortable: false,

            },
            {
                label: '说明',
                name: 'explain',
                sortable: false,

            },
            {
                label: '是否启用',
                name: 'isUse',
                sortable: false,
                formatter: function (value, options, row) {
                    return value === 0 ?
                        '<span class="label label-danger">未启用</span>' :
                        '<span class="label label-success">已启用</span>';
                }
            },
            {
                label: '是否系统',
                name: 'isSys',
                sortable: false,
                formatter: function (value, options, row) {
                    return value === 0 ?
                        '<span class="label label-danger">自定义</span>' :
                        '<span class="label label-success">系统</span>';

                }
            },
            {
                label: '操作',
                name: 'operation',
                sortable: false,
                formatter: function (value, options, row) {
                    // var parameter = JSON.stringify(row);
                    var html = "";
                    html += '<span class="label label-sm label-warning small_hand info" data-parameter=' + row.id + '  >查看详情</span> ';
                    html += '<span class=" label label-sm label-danger small_hand update" data-parameter=' + +row.id + ' >修改</span>';
                    return html;
                }
            },
        ],
        param: {},
        loadComplete: function (obj) {
            $(".info").click(function () {
                var id = $(this).attr("data-parameter");
                info(id);
                return false;
            })

            $(".update").click(function () {
                var id = $(this).attr("data-parameter");
                Tool.ajaxHelper.ajaxSubmit({id: id}, baseURL + "sysDictionary/info/" + id, "POST", function (data) {
                    vueSelf.$data.formInfo = $.extend(true, vueSelf.$data.formInfo, data.info);
                    saveOrUpdateInfo({title: "修改字典"});
                })
                return false;
            })
        }
    };
    list = $("#list").bootstrapTableTemplate(options);
})


var info = function (id) {
    var options = {
        title: "查看详情",
        le: "./dictionary_info.html",
        size: [Tool.GetWidth(0.9), Tool.GetHeight(0.9)],
        buttonCallback: [function () {
            Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "sysDictionary/save", "POST", function (data) {
                console.log(data)
            })
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    $.layerDialogIframe(options);
}