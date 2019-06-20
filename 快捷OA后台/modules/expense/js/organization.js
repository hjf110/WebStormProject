var list = null;

var initDepartmentTree = function () {
    Tool.ajaxHelper.ajaxSubmit({"id": 1}, Api.ex_ding.departmentList, "GET", function (info) {
        $('#treeview').treeview({
            data: info.data,
            levels: 1000000,
            onNodeSelected: function (event, node) {
                sFatherId = node.href;
                list.bootstrapTableTemplateQuery({id: sFatherId});
            }
        });
    })
};

var InitComplete = function () {
    initDepartmentTree();
    var options = {
        rowNum: 10000,
        rowList: [10000],
        param: {"id": "1"},
        url: Api.ex_ding.departmentLUserist,
        columnModel: [
            {
                label: 'ID',
                name: 'userid',
                index: "id",
                width: 45,
                key: true,
                hidden: true
            },
            {
                label: '姓名',
                name: 'name',
                sortable: false,

            },
            {
                label: '标识',
                width: 200,
                name: 'userid',
                sortable: false,
                hidden: true

            }
        ],
        loadComplete: function (obj) {
        }
    }
    list = $("#list_user").bootstrapTableTemplate(options);
    window.layerDialog.list = list;
}

