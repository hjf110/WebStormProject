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
            }
        }
    })
})();
$(function () {
    var options = {
        recordField: "page",
        param: {"state": 6},
        url: baseURL + 'ex/fault/list',
        columnModel: [
            {
                label: 'ID',
                name: 'id',
                index: "id",
                width: 45,
                key: true,
                hidden: true
            }
            ,
            {
                label: '编号',
                name: 'number',
                sortable: false,

            },
            {
                label: '申请时间',
                name: 'declarationTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd hh:mm");
                }

            },
            {
                label: '申报人',
                width: 200,
                name: 'driverName',
                sortable: false,

            },
            {
                label: '操作',
                name: 'operation',
                sortable: false,
                formatter: function (value, options, row) {
                    var html = "";
                    html += '<span class=" label label-sm label-danger small_hand update" data-parameter=' + row.htmlBody + ' >打印</span>';
                    return html;
                }
            },
        ],
        loadComplete: function (obj) {
            $(".update").click(function () {
                var htmlBody = $(this).attr("data-parameter");
                var newstr = decodeURIComponent(htmlBody);
                var oldstr = document.body.innerHTML;
                document.body.innerHTML = newstr;
                window.print();
                document.body.innerHTML = oldstr;
                return false;
            })
        }
    }
    list = $("#list").bootstrapTableTemplate(options);
})
