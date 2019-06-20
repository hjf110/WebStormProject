var list = null;
var vueSelf = null;


var dedefaultFormInfo = function () {
    return {
        id: null,
        dicInName: null,
        mark: null,
        explain: null,
        isUse: 1,
        isBlend: 0
    };
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
                console.log(vueSelf.q);
                list.bootstrapTableTemplateQuery(vueSelf.q);
            },
            saveOrUpdate: function () {
                this.formInfo = dedefaultFormInfo();
                saveOrUpdateInfo({title: "添加条例"});
            },
            del: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                Tool.ajaxHelper.ajaxSubmit(ids, baseURL + "sysDictionaryInfo/delete", "POST", function (data) {
                    list.bootstrapTableTemplateQuery({});
                })
            },
            info: function (id) {
                console.log(id);
                console.log(vueSelf);

            }
        }
    })
})();


var saveOrUpdateInfo = function () {
    var options = {
        le: "#saveOrUpdate",
        size: [Tool.GetWidth(0.6), Tool.GetHeight(0.9)],
        buttonCallback: [function (layerDialog) {
            if (vueSelf.$data.formInfo.id != null) {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "sysDictionaryInfo/update", "POST", function (data) {
                    layer.close(layerDialog.index);
                })
            } else {

                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "sysDictionaryInfo/save", "POST", function (data) {
                    layer.close(layerDialog.index);
                })
            }
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    $.layerDialog(options);
}


$.layerDialogInitComplete(function () {
    var options = {
        url: baseURL + 'sysDictionaryInfo/list',
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
                label: '名称',
                name: 'dicInName',
                sortable: false,

            },
            {
                label: '编码',
                name: 'mark',
                sortable: false,

            },
            {
                label: '说明',
                name: 'explain',
                sortable: false,

            },
            {
                label: '排序',
                name: 'sort'
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
                label: '是否混合',
                name: 'isBlend',
                sortable: false,
                formatter: function (value, options, row) {
                    return value === 0 ?
                        '<span class="label label-danger">不混合</span>' :
                        '<span class="label label-success">混合</span>';
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
            $(".update").click(function () {
                var id = $(this).attr("data-parameter");
                Tool.ajaxHelper.ajaxSubmit({id: id}, baseURL + "sysDictionaryInfo/info/" + id, "POST", function (data) {
                    vueSelf.$data.formInfo = $.extend(true, vueSelf.$data.formInfo, data.info);
                    console.log(vueSelf.$data.formInfo);
                    saveOrUpdateInfo({title: "修改条例"});
                })
                return false;
            })


        }
    };
    list = $("#list").bootstrapTableTemplate(options);
})


