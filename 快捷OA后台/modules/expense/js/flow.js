var list = null;
var vueSelf = null;
var controller = "";
var type = tool.urlHelper.getUrlParam("id");

var department = null;
var defaultFormInfo = function () {
    return {
        flowId: null,
        fName: null,
        fRemarks: null,
        flowId: null
    }
};

(function () {
    new Vue({
        el: '#armorapp',
        data: {
            q: {
                query: null
            },
            formInfo: defaultFormInfo(),
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
                vueSelf.$data.formInfo = defaultFormInfo();
                saveFlow();
            },
            del: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                if (!ids) {
                    return false;
                }
                inquiry("警告！删除流程 会删除该流程关联的全部信息,是否继续", function () {
                    parent.layer.closeAll();
                    Tool.ajaxHelper.ajaxSubmit(ids, Api.ex_flow.delete, "POST", function () {
                        list.bootstrapTableTemplateQuery({});
                        tips("操作成功");
                    })
                })
            },
            update: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                if (!ids) {
                    return false;
                }
                Tool.ajaxHelper.ajaxSubmit(ids, Api.ex_flow.info + "/" + ids[0], "GET", function (data) {
                    vueSelf.$data.formInfo = data.info;
                    updateFlow();
                })

            },
            setDepartmentRole: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                if (!ids) {
                    return false;
                }
                saveDepartmentRole(ids[0]);
            }
        }
    })
})();

//添加流程
var saveFlow = function () {
    var options = {
        title: "添加流程",
        le: "#saveOrUpdateFlow",
        size: [Tool.GetWidth(0.4), Tool.GetHeight(0.4)],
        buttonCallback: [function (layerDialog) {
            var uploadData = vueSelf.$data.formInfo;
            uploadData["fType"] = type;
            Tool.ajaxHelper.ajaxSubmit(uploadData, Api.ex_flow.save, "POST", function (info) {
                layer.close(layerDialog.index);
                tips("操作成功");
            });
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    options = $.extend(true, {}, options);
    $.layerDialog(options);
}


//修改流程
var updateFlow = function () {
    var options = {
        title: "修改流程",
        le: "#saveOrUpdateFlow",
        size: [Tool.GetWidth(0.4), Tool.GetHeight(0.4)],
        buttonCallback: [function (layerDialog) {
            var uploadData = vueSelf.$data.formInfo;
            Tool.ajaxHelper.ajaxSubmit(uploadData, Api.ex_flow.update, "POST", function (info) {
                layer.close(layerDialog.index);
                tips("操作成功");
            });
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    options = $.extend(true, {}, options);
    $.layerDialog(options);
}

//初始化角色列表
var initSetRole = function (id) {
    $("#setRole").empty();
    Tool.ajaxHelper.ajaxSubmit({frTypeId: type, fuFlowId: id}, Api.ex_flow_role.list, "POST", function (info) {
        var html = "";
        $.each(info.data, function (i, e) {
            var s_name = e.s_name == undefined ? "请选择" : e.s_name;
            html += '<div class="form-group upload" data-department="' + e.structure_id + '"  data-role="' + e.flow_role_id + '" ><div class="col-sm-2 control-label">' + e.fr_name + '</div><div class="col-sm-10"><input type="text" readonly="readonly" class="form-control control" value="' + s_name + '"/><a class="btn btn-primary btn-sm department"><i class="fa fa-plus"></i>&nbsp;选择部门</a></div></div>';
        })
        $("#setRole").append(html);
        //选择部门
        initDepartment();
    })
}

//部门弹窗
var initDepartment = function () {
    $(".department").click(function () {
        initDepartmentTree();
        department = null;
        var departmentObj = $(this);
        var options = {
            title: "选择部门",
            le: "#department",
            size: [Tool.GetWidth(0.4), Tool.GetHeight(0.6)],
            buttonCallback: [function (layerDialog) {
                if (department == null) {
                    tips("没有选中任何部门");
                    return false;
                }
                var obj = departmentObj.parent().parent();
                obj.find("input").val(department.text);
                obj.attr("data-department", department.href);
                layer.close(layerDialog.index);
            }],
            end: function () {

            }
        }
        options = $.extend(true, {}, options);
        $.layerDialog(options);
    })
}

//初始化部门树形
var initDepartmentTree = function () {
    Tool.ajaxHelper.ajaxSubmit({sCompanyId: 1}, Api.ex_structure.treeList, "GET", function (info) {
        $('#treeview').treeview({
            data: info.data,
            levels: 1000000,
            onNodeSelected: function (event, node) {
                department = node;
            }
        });
    })
};

//保存部门角色信息
var saveDepartmentRole = function (id) {
    initSetRole(id);
    var uploadData = [];
    var options = {
        title: "设置角色",
        le: "#setRole",
        size: [Tool.GetWidth(0.5), Tool.GetHeight(0.7)],
        buttonCallback: [function (layerDialog) {
            $(".upload").each(function (i, e) {
                var department = $(e).attr("data-department");
                var role = $(e).attr("data-role");
                if (department != undefined && department != "undefined") {
                    uploadData.push({fuFlowId: id, fuDepartmentId: department, fuFlowRoleId: role});
                }
            });
            Tool.ajaxHelper.ajaxSubmit(uploadData, Api.ex_flow_user.saveList, "POST", function (info) {
                layer.close(layerDialog.index);
                list.bootstrapTableTemplateQuery({});
                tips("操作成功");
            });
        }],
        end: function () {
            list.bootstrapTableTemplateQuery({});
        }
    }
    options = $.extend(true, {}, options);
    $.layerDialog(options);
}


$(function () {
    initDepartmentTree();
    var options = {
        multiple: false,
        param: {fType: type},
        url: Api.ex_flow.list,
        columnModel: [
            {
                label: 'flowId',
                name: 'flowId',
                index: "flowId",
                width: 45,
                key: true,
                hidden: true
            }
            ,
            {
                label: '流程名称',
                name: 'fName',
                sortable: false,

            },
            {
                label: '备注',
                name: 'fRemarks',
                sortable: false
            },
            {
                label: '创建时间',
                width: 200,
                name: 'fAddTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd hh:mm");
                }
            }
        ]
    }
    list = $("#list").bootstrapTableTemplate(options);
})




