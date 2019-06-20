var list = null;
var vueSelf = null;
var controller = "";


var dedefaultFormInfo = function () {
    return {
        id: null,
        name: null,
        key: null,
        type: null,
        jobKey: null,
        companyName: null,
        companyKey: null
    }
};

(function () {
    new Vue({
        el: '#armorapp',
        data: {
            q: {
                query: null
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
                saveOrUpdateInfo({title: "添加角色记录"});
            },
            del: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                Tool.ajaxHelper.ajaxSubmit(ids, baseURL + "ex/job/delete", "POST", function (data) {
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
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "ex/job/update", "POST", function (data) {
                    layer.close(layerDialog.index);
                })
            } else {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "ex/job/save", "POST", function (data) {
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
        url: Api.ex_company.list,
        columnModel: [
            {
                label: 'companyId',
                name: 'companyId',
                index: "companyId",
                width: 45,
                key: true,
                hidden: true
            },
            {
                label: '公司名称',
                name: 'cName',
                sortable: false,

            },
            {
                label: '备注',
                width: 200,
                name: 'cRemarks',
                sortable: false,

            },
            {
                label: '创建时间',
                width: 200,
                name: 'cAddTime',
                sortable: false,

            },
            {
                label: '操作',
                name: 'operation',
                sortable: false,
                formatter: function (value, options, row) {
                    var html = "";
                    html += '<span class=" label label-sm label-danger small_hand info" data-parameter=' + +row.companyId + ' >组织架构</span>';
                    return html;
                }
            },
        ],
        param: {},
        loadComplete: function () {
            $(".info").click(function () {
                var id = $(this).attr("data-parameter");
                location.href = "/armor/modules/expense/structure.html?id=" + id;
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
            Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.formInfo, baseURL + "ex/job/save", "POST", function (data) {
                console.log(data)
            })
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    $.layerDialogIframe(options);
}