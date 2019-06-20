var list = null;
var vueSelf = null;
var controller = "";
var bridgeId = null;

var bridgeCheck = userRoleList.indexOf(config.bridgeCheck) > -1;
var bridgeFinance = userRoleList.indexOf(config.bridgeFinance) > -1;
var userId = userInfo.structureUserId;

var defaultState = bridgeCheck ? config.notApproval : (bridgeFinance ? config.notMakeMoney : -1);

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
            rowData: null,
            baseInfo: {
                driverName: null,
                orderNum: null,
                plateNumber: null,
                money: null,
                invoiceMark: [],
                courierMark: [],
                financeMark:[]
            },
            reviewHistory: [],
            bridgeCheck: bridgeCheck,
            bridgeFinance: bridgeFinance,
            nowState: defaultState,

        },
        mounted: function () {
            vueSelf = this;
        },
        methods: {
            query: function () {
                list.bootstrapTableTemplateQuery(vueSelf.q);
            }
        },
        computed: {
            invoiceMarkArray: function () {
                if (this.baseInfo.invoiceMark.length != 0) {
                    return JSON.parse(this.baseInfo.invoiceMark);
                }
                return this.baseInfo.invoiceMark;
            },
            courierMarkArray: function () {
                if (this.baseInfo.courierMark.length != 0) {
                    return JSON.parse(this.baseInfo.courierMark);
                }
                return this.baseInfo.courierMark;
            },
            financeMarkArray: function () {
                if (this.baseInfo.financeMark != null && this.baseInfo.financeMark.length != 0) {
                    return JSON.parse(this.baseInfo.financeMark);
                }
                return this.baseInfo.financeMark;
            }
        }
    })
})();


$(function () {
    var options = {
        multiple: false,
        recordField: "data",
        param: {"state": defaultState},
        url: Api.ex_bridge.list,
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
                label: '司机ID',
                name: 'declarationUserId',
                sortable: false,
                hidden: true
            },
            {
                label: '编号',
                name: 'number',
                sortable: false,

            },
            {
                label: '申报人',
                width: 200,
                name: 'driverName',
                sortable: false,

            },
            {
                label: '订单号',
                name: 'orderNum',
                sortable: false,

            },
            {
                label: '车牌号',
                name: 'plateNumber',
                sortable: false,

            },
            {
                label: '报销金额',
                name: 'money',
                sortable: false,

            },
            {
                label: '状态',
                width: 200,
                name: 'state',
                sortable: false,
                formatter: function (value, options, row) {

                    var state = value == "3" ? "未打款" : "未完成";
                    return '<span class=" label label-sm label-danger">' + state + '</span>';
                }

            },
            {
                label: 'state',
                width: 200,
                name: 'state',
                sortable: false,
                hidden: true
            },
            {
                label: '最后通知时间',
                name: 'declarationTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd hh:mm");
                }

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
                label: '操作',
                name: 'operation',
                sortable: false,
                formatter: function (value, options, row) {
                    var html = "";
                    html += '<span class=" label label-sm label-danger small_hand info" data-parameter=' + row.id + ' >查看详情</span>';

                    return html;
                }
            },
        ],
        loadComplete: function (obj) {
            $(".info").click(function () {
                var id = $(this).attr("data-parameter");
                bridgeId = id;
                //渲染数据
                Tool.ajaxHelper.ajaxSubmit({}, Api.ex_bridge.info + "/" + id, "GET", function (info) {
                    vueSelf.$data.baseInfo = info.data;
                    Tool.ajaxHelper.ajaxSubmit({
                        limit: 10000,
                        page: 1,
                        bridgeId: id
                    }, Api.ex_bridge_expense.list, "GET", function (review) {
                        vueSelf.$data.reviewHistory = review.data.records;
                        bridgeInfo();
                    })

                })
                return false;
            })
        }
    }
    list = $("#list").bootstrapTableTemplate(options);
})


var bridgeInfo = function () {
    var options = {
        le: "#bridge",
        title: "报销单详情",
        size: [Tool.GetWidth(0.5), Tool.GetHeight(0.6)],
        buttonCallback: [function (layerDialog) {
            layer.close(layerDialog.index);
        }],
        end: function () {

        }
    }
    options = $.extend(true, {}, options);
    $.layerDialog(options);
}
var accidentInfo = function () {
    var options = {
        le: "#accident",
        title: "确认报修详情",
        size: [Tool.GetWidth(0.5), Tool.GetHeight(0.6)],
        buttonCallback: [function (layerDialog) {
            layer.close(layerDialog.index);
        }],
        end: function () {

        }
    }
    options = $.extend(true, {}, options);
    $.layerDialog(options);
}

$(function () {

    //审核通过
    $(".reviewAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        Tool.ajaxHelper.ajaxSubmit({
                id: data[0].id,
                state: config.notMakeMoney,
                checkUserId: userId
            },
            Api.ex_bridge.updateOrSave, "POST", function (info) {
                tips("操作成功");
                list.bootstrapTableTemplateQuery({});
            }
        )
    })

    //审核不通过
    $(".reviewNotAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        var id = data[0].id;
        var options = {
            le: "#reason",
            title: "不通过原因",
            size: ["400px", "400px"],
            buttonCallback: [function (layerDialog) {
                var reasonInfo = $("#reasonInfo").val();
                if (reasonInfo == "") {
                    tips("内容为空");
                    return false;
                }
                Tool.ajaxHelper.ajaxSubmit({
                        id: id,
                        state: config.examineFailed,
                        checkUserId: userId
                    },
                    Api.ex_bridge.updateOrSave, "POST", function (info) {
                        Tool.ajaxHelper.ajaxSubmit({
                                bridgeId: id,
                                expenseInfo: reasonInfo,
                                expenseUserId: id
                            },
                            Api.ex_bridge_expense.save, "POST", function () {
                                tips("操作成功");
                                list.bootstrapTableTemplateQuery({});
                            }
                        )

                    }
                )
                layer.close(layerDialog.index);
            }],
            end: function () {
            }
        }
        options = $.extend(true, {}, options);
        $.layerDialog(options);
    })

    //确认打款
    $(".makeMoney").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (data[0].state != config.notMakeMoney.toString()) {
            tips("选择的状态错误");
            return false;
        }

        Tool.ajaxHelper.ajaxSubmit({
                id: data[0].id,
                state: config.isMakeMoney,
                financeUserId: userId
            },
            Api.ex_bridge.updateOrSave, "POST", function (info) {
                tips("操作成功");
                list.bootstrapTableTemplateQuery({});
            }
        )
    })

    //确认完成
    $(".complete").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (data[0].state != config.isMakeMoney.toString()) {
            tips("选择的状态错误");
            return false;
        }
        var data = list.bootstrapTableTemplateSelect("id");
        Tool.ajaxHelper.ajaxSubmit({
                id: data[0].id,
                state: config.isCompleted,
                financeUserId: userId
            },
            Api.ex_bridge.updateOrSave, "POST", function (info) {
                tips("操作成功");
                list.bootstrapTableTemplateQuery({});
            }
        )
    })

    //改状态
    $('.stateSelect').on('changed.bs.select', function (e) {
        var state = $('.stateSelect').selectpicker('val');
        list.bootstrapTableTemplateQuery({state: state});
        vueSelf.$data.nowState = state;
    });


    $("#operation").show();
})