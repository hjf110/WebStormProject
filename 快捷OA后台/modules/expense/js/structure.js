var list = null;
var vueSelf = null;
var controller = "";

var sFatherId = 0;
var sCompanyId = tool.urlHelper.getUrlParam("id");
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

var dedefaultDepartmentFormInfo = function () {
    return {
        structureId: null,
        sName: null,
        sSort: 1,
        sFatherId: sFatherId,
        sCompanyId: sCompanyId

    };
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
            rowData: null,
            departmentFormInfo: dedefaultDepartmentFormInfo()

        },
        mounted: function () {
            vueSelf = this;
        },
        methods: {
            //禁用
            disable: function () {
                var selectData = list.bootstrapTableTemplateSelect("structureUserId");
                if (!selectData) {
                    return false;
                }
                var updateData = [];
                inquiry("禁用！该部门人员", function () {
                    $.each(selectData, function (i, e) {
                        updateData.push({
                            structureUserId: e.structureUserId,
                            suLock: config.isLock
                        });
                    })
                    parent.layer.closeAll();
                    Tool.ajaxHelper.ajaxSubmit(updateData, Api.ex_structure_user.lockUser, "POST", function (data) {
                        var info = {};
                        if (sFatherId != 0) {
                            info = {suStructureId: sFatherId};
                        }
                        list.bootstrapTableTemplateQuery(info);
                        tips("操作成功");
                    })
                })
            },
            //启用
            enable: function () {
                var selectData = list.bootstrapTableTemplateSelect("structureUserId");
                if (!selectData) {
                    return false;
                }
                var updateData = [];
                inquiry("启用！该部门人员", function () {
                    $.each(selectData, function (i, e) {
                        updateData.push({
                            structureUserId: e.structureUserId,
                            suLock: config.notLock
                        });
                    })
                    parent.layer.closeAll();
                    Tool.ajaxHelper.ajaxSubmit(updateData, Api.ex_structure_user.lockUser, "POST", function (data) {
                        var info = {};
                        if (sFatherId != 0) {
                            info = {suStructureId: sFatherId};
                        }
                        list.bootstrapTableTemplateQuery(info);
                        tips("操作成功");
                    })
                })
            },
            query: function () {
                list.bootstrapTableTemplateQuery(vueSelf.q);
            },
            //删除部门人员
            deleteStructureUser: function () {
                var ids = list.bootstrapTableTemplateSelectId();
                if (!ids) {
                    return false;
                }
                inquiry("警告！删除部门人员 会删除该人员关联的全部信息,是否继续", function () {
                    parent.layer.closeAll();
                    Tool.ajaxHelper.ajaxSubmit(ids, Api.ex_structure_user.delete, "POST", function (data) {
                        var info = {};
                        if (sFatherId != 0) {
                            info = {suStructureId: sFatherId};
                        }
                        list.bootstrapTableTemplateQuery(info);
                        tips("操作成功");
                    })
                })
            },
            //添加部门
            saveDepartment: function () {
                vueSelf.$data.departmentFormInfo = dedefaultDepartmentFormInfo();
                saveDepartment({});
            },
            //修改部门
            updateDepartment: function () {
                if (sFatherId == 0) {
                    tips("没有选中任何部门");
                    return false;
                }
                Tool.ajaxHelper.ajaxSubmit({}, Api.ex_structure.info + "/" + sFatherId, "GET", function (info) {
                    vueSelf.$data.departmentFormInfo = info.data;
                    saveDepartment({});
                })
            },
            //删除部门
            deleteDepartment: function () {
                if (sFatherId == 0) {
                    tips("没有选中任何部门");
                    return false;
                }

                inquiry("警告！删除部门 会删除该部门关联的全部信息,是否继续", function () {
                    parent.layer.closeAll();
                    Tool.ajaxHelper.ajaxSubmit([sFatherId], Api.ex_structure.delete, "POST", function (info) {
                        initDepartmentTree();
                        sFatherId = 0;
                        tips("操作成功");
                    })
                })

            },
            saveDepartmentUser: function () {
                if (sFatherId == 0) {
                    tips("没有选中任何部门");
                    return false;
                }
                saveDepartmentUser({});
            }
        }
    })
})();

//初始化部门树形
var initDepartmentTree = function () {
    Tool.ajaxHelper.ajaxSubmit({sCompanyId: sCompanyId}, Api.ex_structure.treeList, "GET", function (info) {
        $('#treeview').treeview({
            data: info.data,
            levels: 1000000,
            onNodeSelected: function (event, node) {
                sFatherId = node.href;
                list.bootstrapTableTemplateQuery({suStructureId: sFatherId});
            }
        });
    })
};

//保存部门人员
var saveDepartmentUser = function (option) {
    var options = {
        title: "选择人员",
        le: "./organization.html",
        size: ["1000px", "600px"],
        buttonCallback: [function (layerDialog) {
            var selectData = layerDialog.list.bootstrapTableTemplateSelect("userid");
            var updateData = [];
            $.each(selectData, function (i, e) {
                updateData.push({
                    suUserid: e.userid,
                    suName: e.name,
                    suCompanyId: sCompanyId,
                    suStructureId: sFatherId
                });
            })
            Tool.ajaxHelper.ajaxSubmit(updateData, Api.ex_structure_user.saveList, "POST", function () {
                list.bootstrapTableTemplateQuery({suStructureId: sFatherId});
                layer.close(layerDialog.index);
                tips("操作成功");
            })

        }],
        end: function () {
            list.bootstrapTableTemplateQuery({suStructureId: sFatherId});
        }
    }
    options = $.extend(true, option, options);
    $.layerDialogIframe(options);
}

//保存部门
var saveDepartment = function (option) {
    var options = {
        le: "#saveOrUpdateDepartment",
        size: [Tool.GetWidth(0.4), Tool.GetHeight(0.4)],
        buttonCallback: [function (layerDialog) {
            if (vueSelf.$data.departmentFormInfo.structureId != null) {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.departmentFormInfo, Api.ex_structure.update, "POST", function (data) {
                    layer.close(layerDialog.index);
                    tips("操作成功");
                })
            } else {
                Tool.ajaxHelper.ajaxSubmit(vueSelf.$data.departmentFormInfo, Api.ex_structure.save, "POST", function (info) {
                    layer.close(layerDialog.index);
                    tips("操作成功");
                })
            }
        }],
        end: function () {
            initDepartmentTree();
            sFatherId = 0;
        }
    }
    options = $.extend(true, option, options);
    $.layerDialog(options);
}


$(function () {
    initDepartmentTree();
    var options = {
        recordField: "data",
        url: Api.ex_structure_user.list,
        columnModel: [
            {
                label: 'structureUserId',
                name: 'structureUserId',
                index: "structureUserId",
                width: 45,
                key: true,
                hidden: true
            },
            {
                label: '名称',
                name: 'suName',
                sortable: false,

            },
            {
                label: '手机',
                name: 'suMobile',
                sortable: false,
                hidden: true

            },
            {
                label: 'UnionId',
                name: 'suUnionid',
                sortable: false,
                 hidden: true

            },
            {
                label: 'UserId',
                name: 'suUserid',
                sortable: false,
                //hidden: true

            },
            {
                label: '部门名称',
                name: 'departmentName',
                sortable: false,

            },
            {
                label: '是否禁用',
                name: 'suLock',
                sortable: false,
                formatter: function (value, options, row) {
                    return value == "1" ? '<span class="label label-success">启用</span>' : '<span class="label label-danger">禁用</span>';
                }
            }

        ],
        param: {suStructureId: sFatherId, suCompanyId: sCompanyId},
        loadComplete: function () {
        }
    };
    list = $("#list").bootstrapTableTemplate(options);
})

