var list = null;
var vueSelf = null;
var controller = "";
var ureaId = null;

var ureaBatch = userRoleList.indexOf(config.ureaBatch) > -1;
var ureaFinance = userRoleList.indexOf(config.ureaFinance) > -1;
//看见已经完成的 记录 isCompleted
var ureaObserver = userRoleList.indexOf(config.ureaObserver) > -1;
var ureaCount = userRoleList.indexOf(config.ureaCount) > -1;


var userId = userInfo.structureUserId;
var defaultState = ureaBatch ? config.notExamine : (ureaFinance ? config.notMakeMoney : ureaObserver ? config.isCompleted : (ureaCount ? config.isCompleted : -10));


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
            singleNum: 0,
            singleMoney: 0,
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
                ureaMark: [],
                receivablesType: null,
                receivablesAccount: null,
                checkName: null,
                financeName: null,
                financeMark: []

            },
            reviewHistory: [],
            ureaBatch: ureaBatch,
            ureaFinance: ureaFinance,
            nowState: defaultState,
            sheetData: [],

        },
        mounted: function () {
            vueSelf = this;
        },
        methods: {
            query: function () {
                if(ureaFinance) {
                    if ($('#startTime').val() != "" && $('#endTime').val() != "") {
                        var startTime = tool.dataHelper.dateFormatToTimeStamp($('#startTime').val());
                        var endTime = tool.dataHelper.dateFormatToTimeStamp($('#endTime').val());
                        vueSelf.q.startTime = startTime;
                        vueSelf.q.endTime = endTime;
                    }
                }
                list.bootstrapTableTemplateQuery(vueSelf.q);
            }
        },
        computed: {
            invoiceMarkArray: function () {
                if (this.baseInfo.invoiceMark != null && this.baseInfo.invoiceMark.length != 0) {
                    return JSON.parse(this.baseInfo.invoiceMark);
                }
                return this.baseInfo.invoiceMark;
            },
            courierMarkArray: function () {
                if (this.baseInfo.courierMark != null && this.baseInfo.courierMark.length != 0) {
                    return JSON.parse(this.baseInfo.courierMark);
                }
                return this.baseInfo.courierMark;
            },
            ureaMarkArray: function () {
                if (this.baseInfo.ureaMark != null && this.baseInfo.ureaMark.length != 0) {
                    return JSON.parse(this.baseInfo.ureaMark);
                }
                return this.baseInfo.ureaMark;
            },
            financeMarkArray: function () {
                if (this.baseInfo.financeMark != null && this.baseInfo.financeMark.length != 0) {
                    var images = JSON.parse(this.baseInfo.financeMark);
                    var info = [];
                    $.each(images, function (i, e) {
                        if (e.indexOf("http") == -1) {
                            info.push(config.baseUrl + e);
                        }
                    })
                    return info;
                }
                return this.baseInfo.financeMark;
            }
        }
    })
})();


$(function () {
    var options = {
        // multiple: false,
        recordField: "page",
        param: {"state": defaultState, userId: userId},
        url: Api.ex_urea.list,
        loadComplete: function (info) {
            if (info.page.condition.total_num != null && info.page.condition.total_num != undefined) {
                vueSelf.$data.singleNum = info.page.condition.total_num;
                vueSelf.$data.singleMoney = info.page.condition.total_money;
            }
        },
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
                label: '报销金额',
                width: 200,
                name: 'money',
                sortable: false,

            },
            {
                label: '申请购买数量',
                name: 'apply',
                sortable: false,

            },
            {
                label: '允许购买数量',
                name: 'allow',
                sortable: false,

            },
            {
                label: '存货',
                name: 'stock',
                sortable: false,

            },
            {
                label: '公里数',
                name: 'kilometre',
                sortable: false,

            },
            {
                label: '车牌号',
                name: 'plateNumber',
                sortable: false,

            },
            {
                label: '报销方式',
                name: 'reimbursementType',
                sortable: false,
                formatter: function (value, options, row) {
                    return value == null ? '<span class="label label-info">未知</span>' : (value == "1" ? '<span class="label label-success">快递报销</span>' : '<span class="label label-danger">现场报销</span>');
                },
                unformat: function (value, options, row) {
                    return value == "未知" ? 0 : 1;
                }

            },
            {
                label: '快递状态',
                name: 'isSend',
                sortable: false,
                formatter: function (value, options, row) {
                    return value == "1" ? '<span class="label label-success">未寄出</span>' : '<span class="label label-danger">已寄出</span>';
                }

            },
            {
                label: '打款状态',
                width: 200,
                name: 'state',
                sortable: false,
                formatter: function (value, options, row) {
                    return (value == 8 || value == 6) ? '<span class="label label-danger">已打款</span>' : '<span class="label label-success">未打款</span>';
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
                label: '申请时间',
                name: 'declarationTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd");
                }

            },
            {
                label: '打款时间',
                name: 'financeTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd");
                }

            },
            {
                label: '催寄次数',
                name: 'urgeNumber',
                sortable: false,
                formatter: function (value, options, row) {
                    return value == null ? 0 : value;
                }

            },
            {
                label: '最后催寄时间',
                name: 'urgeTime',
                sortable: false,
                formatter: function (value, options, row) {
                    return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd");
                }

            },
            {
                label: 'financeName',
                name: 'financeName',
                sortable: false,
                hidden: true
            }
            ,
            {
                label: 'checkName',
                name: 'checkName',
                sortable: false,
                hidden: true
            }
            ,
            {
                label: 'batchName',
                name: 'batchName',
                sortable: false,
                hidden: true
            }

        ]
    }
    list = $("#list").bootstrapTableTemplate(options);
})


var ureaInfo = function () {
    initImg();
    var options = {
        le: "#urea",
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

$(function () {
    //审核通过
    $(".reviewAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var options = {
            le: "#allowFormInfo",
            title: "允许购买的数量",
            size: [Tool.GetWidth(0.4), Tool.GetHeight(0.4)],
            buttonCallback: [function (layerDialog) {
                var reasonInfo = $("#allowInfo").val();
                if (reasonInfo == "") {
                    tips("内容为空");
                    return false;
                }

                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        state: config.examineCompleted,
                        batchUserId: userId,
                        allow: reasonInfo,
                        checkTime: tool.timeHelper.nowTimeStamp()
                    },
                    Api.ex_urea.updateOrSave, "POST", function (info) {
                        layer.close(layerDialog.index);
                        tips("操作成功");
                        list.bootstrapTableTemplateQuery({});
                    }
                )
            }],
            end: function () {
            }
        }
        options = $.extend(true, {}, options);
        $.layerDialog(options);


    })

    //审核不通过
    $(".reviewNotAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
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
                        state: config.approvalFailed,
                        batchUserId: userId
                    },
                    Api.ex_urea.updateOrSave, "POST", function (info) {
                        Tool.ajaxHelper.ajaxSubmit({
                                ureaId: id,
                                expenseInfo: reasonInfo,
                                expenseUserId: userId
                            },
                            Api.ex_urea_expense.save, "POST", function () {
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
        //渲染数据
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        if (data[0].state != config.notMakeMoney.toString()) {
            tips("选择的状态错误");
            return false;
        }

        $(".receivablesAccount").val("");
        var options = {
            le: "#makeMoneyFormInfo",
            title: "确认打款",
            size: [Tool.GetWidth(0.4), Tool.GetHeight(0.4)],
            buttonCallback: [function (layerDialog) {
                var receivablesType = $('.receivablesType').selectpicker('val');
                var receivablesAccount = $(".receivablesAccount").val();
                if (receivablesAccount == "") {
                    tips("支付账号不能为空");
                    return false;
                }
                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        state: config.isMakeMoney,
                        financeUserId: userId,
                        financeTime: tool.timeHelper.nowTimeStamp(),
                        receivablesType: receivablesType,
                        receivablesAccount: receivablesAccount
                    },
                    Api.ex_urea.updateOrSave, "POST", function (info) {
                        tips("操作成功");
                        list.bootstrapTableTemplateQuery({});
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

    //确认完成
    $(".complete").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }

        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        if (data[0].state != config.isMakeMoney.toString()) {
            tips("选择的状态错误");
            return false;
        }

        var info = {id: data[0].id, state: config.isCompleted, confirmUserId: userId};
        var options = {
            title: "确认完成",
            le: "./photo.html",
            size: ["900px", "700px"],
            buttonCallback: [function (layerDialog) {
                var financeMark = [];
                var imgObj = layerDialog.financeImage.find("img");
                $.each(imgObj, function (i, e) {
                    financeMark.push($(e).attr("src"));
                })
                if (financeMark.length == 0) {
                    tips("图片至少一张");
                    return false;
                }


                info["financeMark"] = JSON.stringify(financeMark);
                Tool.ajaxHelper.ajaxSubmit(info,
                    Api.ex_urea.updateOrSave, "POST", function (info) {
                        tips("操作成功");
                        list.bootstrapTableTemplateQuery({});
                    }
                )
                layer.close(layerDialog.index);

                //  alert(layerDialog.financeImage.html());
                // // alert(layerDialog.financeImage.find("img"));
                // layer.close(layerDialog.index);

            }],
            end: function () {
                axCam_Ocx.CAM_Close();
                list.bootstrapTableTemplateQuery({});
            }
        }
        $.layerDialogIframe(options);
        // var data = list.bootstrapTableTemplateSelect("id");
        // Tool.ajaxHelper.ajaxSubmit({
        //         id: data[0].id,
        //         state: config.isCompleted,
        //         financeUserId: userId
        //     },
        //     Api.ex_urea.updateOrSave, "POST", function (info) {
        //         tips("操作成功");
        //         list.bootstrapTableTemplateQuery({});
        //     }
        // )
    })

    //改状态
    $('.stateSelect').on('changed.bs.select', function (e) {
        var state = $('.stateSelect').selectpicker('val');
        if (list.param.query != null && list.param.query != undefined) {
            list.param.query = null;
        }
        if (list.param.endTime != null && list.param.endTime != undefined) {
            list.param.endTime = null;
        }
        if (list.param.startTime != null && list.param.startTime != undefined) {
            list.param.startTime = null;
        }
        list.bootstrapTableTemplateQuery({state: state});
        vueSelf.$data.nowState = state;
    });

    //查看详情
    $(".info").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = data[0].id;
        //渲染数据
        Tool.ajaxHelper.ajaxSubmit({}, Api.ex_urea.info + "/" + id, "GET", function (info) {
            vueSelf.$data.baseInfo = info.data;
            Tool.ajaxHelper.ajaxSubmit({
                limit: 10000,
                page: 1,
                ureaId: id
            }, Api.ex_urea_expense.list, "GET", function (review) {
                vueSelf.$data.reviewHistory = review.page.records;
                ureaInfo();
            })

        })
    })

    //催寄发票
    $(".urge").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        var id = data[0].id;
        if (!data) {
            return false;
        }

        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        if (data[0].reimbursementType != 0) {
            tips("报销方式已选择,不能催寄");
            return false;
        }
        //渲染数据
        inquiry("是否 催寄发票", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                id: id
            }, Api.ex_urea.noticeDriver, "POST", function () {
                tips("操作成功");
                list.bootstrapTableTemplateQuery({});
            })
        })
    })

    // $(document).on("click", ".image", function () {
    //     var src = $(this).attr("src");
    //     var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
    //         parent.layer.close(index);
    //     })
    // })

    //<option value="1">进行中</option> <option value="2">历史</option>
    //改 审核状态  <option value="0">未审核</option>
    //                         <option value="3,6,8">已审核</option>
    $('.ureaBatchSelect').on('changed.bs.select', function (e) {

        var record = $('.ureaBatchSelect').selectpicker('val');
        if (list.param.query != null && list.param.query != undefined) {
            list.param.query = null;
        }
        if (list.param.endTime != null && list.param.endTime != undefined) {
            list.param.endTime = null;
        }
        if (list.param.startTime != null && list.param.startTime != undefined) {
            list.param.startTime = null;
        }
        if (record == 2) {
            var upState = config.examineCompleted + "," + config.notMakeMoney + "," + config.isMakeMoney + "," + config.isCompleted;
            list.bootstrapTableTemplateQuery({record: record, state: upState});
            vueSelf.$data.nowState = upState;
        } else {
            list.bootstrapTableTemplateQuery({record: record, state: defaultState});
            vueSelf.$data.nowState = defaultState;
        }

    });

    //下载报销单
    //下载报销单
    $(".download").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        vueSelf.$data.sheetData = data;
        var options = {
            le: "#voucher",
            title: "下载报销单",
            size: ["1600px", "600px"],
            buttonCallback: [function (layerDialog) {
                var loading = tool.loading();
                var voucherHtml = document.getElementById("voucher").innerHTML;
                var cssHtml = '<style type="text/css">html,body{width:100%;height:100%}.voucher{font-size:24px;position:relative;height:518px}.mainContent{padding:0px 100px}.topContent{position:relative;border-bottom:5px#000000 solid}.title-lg{text-align:center;padding:25px 0 0;box-sizing:border-box}.title-sm{display:inline-block}.row{width:100%;border:0px;padding:15px 2px 0px 2px}.col-4{width:30%;display:inline-block;padding-left:20px}.col-2{width:20%;display:inline-block;border:1px#000000 solid}.col-6{width:28%;display:inline-block}table{border-collapse:collapse;width:100%;text-align:center}td{font-size:25px;height:40px;border:1px solid black;display:inline-block;text-align:left}.fontSize30{font-size:30px}.cachetRed{position:absolute;top:30px;right:120px;width:221px;height:87px}.cachetBlack{position:absolute;top:-40px;right:200px;width:240px;height:240px;opacity:0.5}.cachetRed img,.cachetBlack img{width:100%;height:100%}</style>';
                var html = '<html><head><title>报销单</title></head><body style="width:1600px">' + cssHtml + voucherHtml + '</body></html>';
                var htmlBlob = new Blob([html], {
                    type: "text/plain;charset=utf-8"
                });
                window.saveAs(htmlBlob, "报销单.html");
                layer.close(layerDialog.index);
                layer.close(loading);
                tips("导出成功");
            }],
            end: function () {
            }
        }
        options = $.extend(true, {}, options);
        $.layerDialog(options);
    })

    $(".refresh").click(function () {
        list.bootstrapTableTemplateQuery({});
    })
    $("#operation").show();
})

$(function () {
    $('#startTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayStart, 'yyyy-MM-dd hh:ss'));
    $('#endTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayEnd, 'yyyy-MM-dd hh:ss'));

    $('#startTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        language: "zh-CN",
        todayButton: true
    });
    $('#endTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        language: "zh-CN",
        todayButton: true
    });
})

function initImg() {

    $('#invoice').viewer();
    $('#invoice').viewer("update");

    $('#express').viewer();
    $('#express').viewer("update");

    $('#invoiceReceived').viewer();
    $('#invoiceReceived').viewer("update");

    $('#ureaNum').viewer();
    $('#ureaNum').viewer("update");
}

//重置
$(".reset").click(function () {
    var data = list.bootstrapTableTemplateSelect("id");
    if (!data) {
        return false;
    }
    if (data.length > 1) {
        tips("请单选");
        return false;
    }
    var id = data[0].id;
    Tool.ajaxHelper.ajaxSubmit({
        id: id,
    }, Api.ex_urea.reset, "GET", function () {
        tips("操作成功");
        list.bootstrapTableTemplateQuery({});
    })

})