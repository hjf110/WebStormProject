var list = null;
var vueSelf = null;
var controller = "";
var accidentId = null;
var accidentCheck = 1;
var accidentFinanceProblem = 1;
var defaultState = 1;

var isFaultDriverProblem = false;
var isFaultManageProblem = false;
var isFaultDispatchProblem = false;
var isFaultSalesmanProblem = false;
var isAccidentObservationProblem = false;
var isAccidentFinanceProblem = false;
var userId = userInfo.structureUserId;
var vueObj;

isFaultDriverProblem = userRoleList.indexOf(config.faultDriverProblem) > -1;
isFaultManageProblem = userRoleList.indexOf(config.faultManageProblem) > -1;
isFaultDispatchProblem = userRoleList.indexOf(config.faultDispatchProblem) > -1;
isFaultSalesmanProblem = userRoleList.indexOf(config.faultSalesmanProblem) > -1;
isAccidentObservationProblem = userRoleList.indexOf(config.accidentObservationProblem) > -1;
isAccidentFinanceProblem = userRoleList.indexOf(config.accidentFinanceProblem) > -1;

console.log(isFaultDriverProblem);
console.log(isFaultManageProblem);
console.log(isFaultDispatchProblem);
console.log(isFaultSalesmanProblem);
console.log(isAccidentObservationProblem);
console.log(isAccidentFinanceProblem);

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
    vueObj = new Vue({
        el: '#armorapp',
        data: {
            q: {
                query: null
            },
            formInfo: dedefaultFormInfo(),
            showList: true,
            rowData: null,
            singleNum: 0,
            singleMoney: 0,
            baseInfo: {
                driverName: null,
                orderNum: null,
                plateNumber: null,
                money: null,
                invoiceMark: [],
                courierMark: [],
                receivablesType: null,
                receivablesAccount: null,
                driverName: null,
                checkName: null,
                financeName: null,
                financeMark: [],
                checkTime: null
            },
            reviewHistory: [],
            accidentCheck: accidentCheck,
            accidentFinanceProblem: accidentFinanceProblem,
            nowState: defaultState,
            sheetData: [],
            isFaultDriverProblem: isFaultDriverProblem,
            isFaultManageProblem: isFaultManageProblem,
            isFaultDispatchProblem: isFaultDispatchProblem,
            isFaultSalesmanProblem: isFaultSalesmanProblem,
            isAccidentObservationProblem: isAccidentObservationProblem,
            state: 1,

        },
        mounted: function () {
            vueSelf = this;
        },
        methods: {
            query: function () {
                list.bootstrapTableTemplateQuery(vueSelf.q);
            }
        },
        computed: {}
    })
})();


$(function () {
    var options = {
        // multiple: false,
        recordField: "page",
        param: {"state": defaultState, userId: userId, flowId: flowId},
        url: Api.problem.list,
        loadComplete: function (info) {

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
                label: '编号',
                name: 'number',
                sortable: false,
            },

            {
                label: '司机ID',
                name: 'driverId',
                sortable: false,
                hidden: true
            },
            // {
            //     label: '订单号',
            //     name: 'orderNum',
            //     sortable: false,
            //
            // },
            {
                label: '申报人',
                name: 'name',
                sortable: false,

            },

            {
                label: '车牌号',
                name: 'licensePlate',
                sortable: false,

            },

            {
                label: '事故地点',
                name: 'place',
                sortable: false,
                width: 400,
            },
            {
                label: '客户单位',
                name: 'customerUnit',
                sortable: false,

            },
            {
                label: '事故性质',
                name: 'natureAccident',
                sortable: false,
                formatter: function (value, options, row) {
                    return "新车检查";
                }
            },
            {
                label: '事故状态',
                name: 'start',
                sortable: false,
                formatter: function (value, options, row) {
                    console.log(value);
                    switch (value) {
                        case 1:
                            return '<span class="label label-danger">未处理</span>';
                            break;
                        case 4:
                            return '<span class="label label-info">任务继续</span>';
                            break;
                        case 9:
                            return '<span class="label label-default">任务取消</span>';
                            break;
                        // case 3:
                        //     return '<span class="label label-danger">已调度</span>';
                        //     break;
                        // case 4:
                        //     return '<span class="label label-danger">继续跑</span>';
                        //     break;
                        case 5:
                            return '<span class="label label-success">已完成</span>';
                            break;
                    }
                }

            },
            {
                label: '最近催单时间',
                name: 'reminderTime',
                sortable: false,

            },
            {
                label: '主表状态',
                name: 'start',
                sortable: false,
                hidden: true,
                default: 1
            },

            {
                label: 'flowId',
                name: 'flowId',
                sortable: false,
                hidden: true
            },
            // {
            //     label: '申请时间',
            //     name: 'number',
            //     sortable: false,
            //     formatter: function (value, options, row) {
            //         return Tool.dataHelper.timeStampToDateFormat(value, "yyyy-MM-dd");
            //     }
            // },
        ]
    }
    list = $("#list").bootstrapTableTemplate(options);
})


$(function () {
    $("#operation").show();

    /*
      $('#startTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayStart, 'yyyy-MM-dd hh:ss'));
      $('#endTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayEnd, 'yyyy-MM-dd hh:ss'));
    $('#startTime').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        language: "zh-CN",
        todayButton: true
    });
    // $('#endTime').datetimepicker({
    //     format: 'yyyy-mm-dd hh:ii',
    //     language: "zh-CN",
    //     todayButton: true
    // });
*/

    //刷新
    $(".refresh").click(function () {
        list.bootstrapTableTemplateQuery({});
    })

    //改状态
    /*状态 1 未处理 2 未调度 3 已调度 4 继续跑 5 已完成*/
    $('.stateSelect').on('changed.bs.select', function (e) {
        var state = $('.stateSelect').selectpicker('val');

        vueObj.state = state;

        list.bootstrapTableTemplateQuery({state: state});
        vueSelf.$data.nowState = state;
    });

    //已调度     public static final Integer wait = 6;          //等待
    //     public static final Integer leave = 7;         //离开
    //     public static final Integer out = 8;           //脱离
    $(".ydd").click(function (e) {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();

            console.log(data);

            if (parseInt(data[0].start) == 9) {
                console.log(userInfo);
                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        dispatchName: userInfo.suName,
                        dispatchId: userInfo.structureUserId,
                        dispatchTime: Math.ceil(new Date().getTime() / 1000),
                    },
                    Api.problem.update, "POST", function () {
                        tips("确认成功");
                        list.bootstrapTableTemplateQuery({});
                    });
            } else {
                inquiry("事故状态为任务取消时才需确认", function () {
                });
            }

            console.log("调度完成");
        })

    });

    $(".wait").click(function (e) {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id,
                    start: 6,
                },
                Api.problem.update, "POST", function () {
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
        })

    });

    $(".leave").click(function (e) {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id,
                    start: 7,
                },
                Api.problem.update, "POST", function () {
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
        })

    });
    $(".out").click(function (e) {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id,
                    start: 8,
                },
                Api.problem.update, "POST", function () {
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
        })

    });
    // wait leave out

    //待完善，完成表格
    $(".dws").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = parseInt(data[0].id);

        $.get(Api.problem.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    switch (_data.info.details.natureAccident) {
                        case 1:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""/></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney" class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账金额</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-3"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存并关闭</button></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(_data.info.details.addTime);
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
                                    $("#companyLostMonkey").val(_data.info.affiliated.companyLostMonkey);
                                    $("#companyTechnician").val(_data.info.affiliated.companyTechnician);
                                    $("#customerMoney").val(_data.info.affiliated.customerMoney);
                                    $("#customerVehicleDamageDescription").val(_data.info.affiliated.customerVehicleDamageDescription);
                                    $("#customerVehiclesDamage").val(_data.info.affiliated.customerVehiclesDamage);
                                    $("#customerVehiclesFixedLoss").val(_data.info.affiliated.customerVehiclesFixedLoss);
                                    $("#depreciationExpenses").val(_data.info.affiliated.depreciationExpenses);
                                    $("#injured").val(_data.info.affiliated.injured);
                                    $("#insuranceDeductibleAmount").val(_data.info.affiliated.insuranceDeductibleAmount);
                                    $("#insurancePaymentsMoney").val(_data.info.affiliated.insurancePaymentsMoney);
                                    $("#insurancePaymentsTime").val(_data.info.affiliated.insurancePaymentsTime);
                                    $("#KPI").val(_data.info.affiliated.kpi);
                                    $("#licensePlateNumber").val(_data.info.affiliated.licensePlateNumber);
                                    $("#newOld").val(_data.info.affiliated.newOld);
                                    $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    $("#ourMoney").val(_data.info.affiliated.ourMoney);
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#time").val(_data.info.affiliated.time);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);


                                    $('#personnelInjuryTime,#ourTime,#otherTime,#othersTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true
                                    });

                                    $("#saveBtn").click(function (e) {

                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                licensePlate: $("cph").val()
                                            },
                                            Api.problem_report.update, "POST", function (_data2) {

                                            }
                                        );

                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                name: _data.info.details.name,
                                                licensePlateNumber: _data.info.details.licensePlate,
                                                place: _data.info.details.place,
                                                customerUnit: _data.info.details.customerUnit,


                                                accidentAnalysisImprovementMeasures: $("#accidentAnalysisImprovementMeasures").val(),
                                                accidentApplicationId: $("#accidentApplicationId").val(),
                                                actualAmountPaid: $("#actualAmountPaid").val(),
                                                companyLostMonkey: $("#companyLostMonkey").val(),
                                                companyTechnician: $("#companyTechnician").val(),
                                                customerMoney: $("#customerMoney").val(),
                                                customerVehicleDamageDescription: $("#customerVehicleDamageDescription").val(),
                                                customerVehiclesDamage: $("#customerVehiclesDamage").val(),
                                                customerVehiclesFixedLoss: $("#customerVehiclesFixedLoss").val(),
                                                depreciationExpenses: $("#depreciationExpenses").val(),
                                                injured: $("#injured").val(),
                                                insuranceDeductibleAmount: $("#insuranceDeductibleAmount").val(),
                                                insurancePaymentsMoney: $("#insurancePaymentsMoney").val(),
                                                insurancePaymentsTime: $("#insurancePaymentsTime").val(),
                                                kpi: $("#KPI").val(),
                                                newOld: $("#newOld").val(),
                                                orderNumber: $("#orderNumber").val(),
                                                otherInjuries: $("#otherInjuries").val(),
                                                otherMoney: $("#otherMoney").val(),
                                                ourMoney: $("#ourMoney").val(),
                                                ourVehicleDamageDescription: $("#ourVehicleDamageDescription").val(),
                                                ourVehiclesDamage: $("#ourVehiclesDamage").val(),
                                                peopleInjure: $("#peopleInjure").val(),
                                                peopleMoney: $("#peopleMoney").val(),
                                                taskType: $("#taskType").val(),
                                                techniciansPunishmentMonkey: $("#techniciansPunishmentMonkey").val(),
                                                vehicleModels: $("#vehicleModels").val(),
                                                time: $("#time").val(),


                                            },
                                            Api.problem_report.update, "POST", function (_data2) {
                                                tips("操作成功");
                                                list.bootstrapTableTemplateQuery({});
                                            }
                                        );

                                    });
                                }
                            });
                            break;
                        case 2:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="xcjcwtfkForm"class="form"><div id="printManager"><div class="title-lg">新车检查问题反馈</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"v-bind:value="cph"v-model="cph"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly v-bind:value="addTime"style="display:inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"v-bind:value="sgfsdd"readonly></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""v-bind:value="khdw"readonly></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""v-bind:value="ddbh"v-model="ddbh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><input id="taskType" type="text"class="form-control width-1"placeholder=""v-bind:value="khclpp"v-model="khclpp"></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""v-bind:value="xh"v-model="xh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆受损部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""v-bind:value="khclssbw"v-model="khclssbw"></div><div class="tdBox-2"><div class="title-sm title-right">车架号</div><input id="frame" type="text"class="form-control width-1"placeholder=""v-bind:value="cjh"v-model="cjh"></div></div></div></div><div class="partBox damageSituation"><div class="title-md">业务员处理信息</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">业务员姓名</div><input id="ywyxm" class="form-control ver-top width-1"name="deblock_udid"rows="5"v-bind:value="ywyxm"readonly></input></div><div class="tdBox-2"><div class="title-sm title-right">业务员处理时间</div><input id="ywyclsj" type="text"class="form-control width-1"placeholder=""v-bind:value="ywyclsj"readonly></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">业务员意见</div><textarea id="ywyyj" class="form-control ver-top width-2"name="deblock_udid"rows="5"v-bind:value="ywyyj"readonly></textarea></div></div></div></div><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="khclssqk"v-model="khclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""v-bind:value="ssje"v-model="ssje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div><div class="followUpEdit trfollow"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"id="jdms"class="form-control width-1"placeholder=""v-bind:value="jdms"v-model="jdms"></div><button id="followUp"type="button"class="btn btn-primary"v-on:click="followUpBtn">跟进</button><div class="tdBox-2"><input type="text"id="gjsj"class="form-control width-1"placeholder=""v-bind:value="gjsj"v-model="gjsj"style="display:none"></div></div></div></div></div></div><div class="partBox processingPersonnel"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">车管姓名</div><input id="cgxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div></div></div></div><div class="buttonBox"><button id="printExpenseAccountManager"class="button1 btnBlue"v-on:click="printManagerClick"style="display:none;">打印</button><button id="saveBtn"class="button1"v-on:click="saveBtn">保存并关闭</button></div></div>',
                                success: function (_layero, _index) {

                                    if (!isAccidentFinanceProblem) {

                                        $(".financialPayment input,.financialPayment textarea").attr("readonly", "readonly");
                                        $(".financialPayment select").attr("disabled", "disabled");
                                        $("#uploadImg,#idcardImg").css("display", "none");

                                    } else {
                                        $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea").attr("readonly", "readonly");
                                        $(".basicInfo select,.damageSituation select,.compensationSituation select").attr("disabled", "disabled");
                                    }


                                    var formNue = new Vue({
                                        el: "#xcjcwtfkForm",
                                        data: {
                                            bridgeFinance: true,
                                            jsxm: _data.info.details.name,
                                            cph: _data.info.details.licensePlate,
                                            addTime: tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"),
                                            sgfsdd: _data.info.details.place,
                                            khdw: _data.info.details.customerUnit,
                                            ddbh: _data.info.affiliated.orderNumber,
                                            khclpp: _data.info.affiliated.taskType,
                                            xh: _data.info.affiliated.vehicleModels,
                                            khclssbw: _data.info.affiliated.customerVehicleDamageDescription,
                                            khclssqk: _data.info.affiliated.customerVehiclesDamage,
                                            ssje: _data.info.affiliated.customerMoney,
                                            qtss: _data.info.affiliated.otherInjuries,
                                            ssje2: _data.info.affiliated.otherMoney,
                                            cjh: _data.info.affiliated.frame,   //车架号
                                            ywyxm: _data.info.details.salesmanName,
                                            ywyclsj: _data.info.details.vehicleHandleTime ? tool.dataHelper.timeStampToDateFormat(_data.info.details.vehicleHandleTime, "yyyy年MM月dd日 hh:mm") : "暂无时间",
                                            ywyyj: _data.info.details.remark,

                                            jdms: "",  //  进度描述
                                            followList: _data.info.affiliated.jdmsArrayStr ? JSON.parse(_data.info.affiliated.jdmsArrayStr) : [],

                                            cgxm: _data.info.affiliated.vehicleSubName  //  车管姓名
                                            // zffs:_data.info.affiliated.payType,  //  支付方式
                                            // zfje:_data.info.affiliated.payment,  //  支付金额
                                            // blry:_data.info.affiliated.acceptingOfficer,  //  办理人员

                                            // nbryxm:_data.info.affiliated.insider,  //  内部人员姓名
                                            // cwxm:_data.info.affiliated.financialname  //  财务姓名
                                        },
                                        methods: {
                                            printManagerClick: function () {
                                                console.log("车管打印开始");



                                                //获取值
                                                // var payType = $("#payType").find("option:selected").text();
                                                var jsxm = $("#jsxm").val();//1
                                                var cph = $("#cph").val();//2
                                                var endTime = $("#endTime").val();//3
                                                var sgfsdd = $("#sgfsdd").val();//4
                                                var orderNumber = $("#orderNumber").val();//5
                                                var customerUnit = $("#customerUnit").val();//6

                                                var frame = $("#frame").val();//7
                                                var taskType = $("#taskType").val();//8
                                                var vehicleModels = $("#vehicleModels").val();//9
                                                var customerVehicleDamageDescription = $("#customerVehicleDamageDescription").val();//10
                                                var ywyxm = $("#ywyxm").val();//11
                                                var ywyclsj = $("#ywyclsj").val();//12
                                                var ywyyj = $("#ywyyj").val();//13
                                                var customerVehiclesDamage = $("#customerVehiclesDamage").val();//14
                                                var customerMoney = $("#customerMoney").val();//15
                                                var otherInjuries = $("#otherInjuries").val();//16
                                                var otherMoney = $("#otherMoney").val();//17

                                                var cgxm = $("#cgxm").val();//34



                                                $.cookie("jsxm", jsxm, {path: '/'});
                                                $.cookie("cph", cph, {path: '/'});
                                                $.cookie("endTime", endTime, {path: '/'});
                                                $.cookie("sgfsdd", sgfsdd, {path: '/'});
                                                $.cookie("customerUnit", customerUnit, {path: '/'});
                                                $.cookie("orderNumber", orderNumber, {path: '/'});
                                                $.cookie("frame", frame, {path: '/'});
                                                $.cookie("taskType", taskType, {path: '/'});
                                                $.cookie("vehicleModels", vehicleModels, {path: '/'});
                                                $.cookie("customerVehicleDamageDescription", customerVehicleDamageDescription, {path: '/'});
                                                $.cookie("ywyxm", ywyxm, {path: '/'});
                                                $.cookie("ywyclsj", ywyclsj, {path: '/'});
                                                $.cookie("ywyyj", ywyyj, {path: '/'});
                                                $.cookie("customerVehiclesDamage", customerVehiclesDamage, {path: '/'});
                                                $.cookie("customerMoney", customerMoney, {path: '/'});
                                                $.cookie("otherInjuries", otherInjuries, {path: '/'});
                                                $.cookie("otherMoney", otherMoney, {path: '/'});

                                                $.cookie("cgxm", cgxm, {path: '/'});

                                                window.open("problem_cgdy.html");



















                                                // var loading = tool.loading();
                                                // var $printManager = $("#printManager");
                                                // $printManager.addClass("bgText");
                                                // $printManager.find("div.trfollow").hide();
                                                // html2canvas($printManager[0]).then(function (canvas) {
                                                //     canvas.toBlob(function (blob) {
                                                //         saveAs(blob, "车管表单.png");
                                                //     });
                                                //     layer.close(loading);
                                                //     tips("导出成功");
                                                //     $printManager.find("div.trfollow").show();
                                                //     $printManager.removeClass("bgText");
                                                    console.log("打印结束");
                                               // });
                                            },
                                            followUpBtn: function (_event) {
                                                var _this = this;
                                                if (!this.jdms) {
                                                    tips("请输入内容后再跟进");
                                                    return;
                                                }
                                                this.followList.push({
                                                    jdms: this.jdms,
                                                    time: parseInt(new Date().getTime() / 1000)
                                                });
                                                this.jdms = "";
                                                console.log(JSON.stringify(this.followList));
                                                console.log(JSON.parse(JSON.stringify(this.followList)));
                                            },
                                            saveBtn: function (_event) {
                                                var _this = this;
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id,
                                                        licensePlate: _this.cph
                                                    },
                                                    Api.problem.update, "POST", function (_data2) {
                                                        // list.bootstrapTableTemplateQuery({});
                                                    }
                                                );
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.affiliated.id,
                                                        name: _data.info.details.name,
                                                        licensePlateNumber: _data.info.details.licensePlate,
                                                        place: _data.info.details.place,
                                                        customerUnit: _data.info.details.customerUnit,
                                                        addTime: _data.info.details.addTime,

                                                        frame: _this.cjh,
                                                        orderNumber: _this.ddbh,
                                                        taskType: _this.khclpp,
                                                        vehicleModels: _this.xh,
                                                        customerVehicleDamageDescription: _this.khclssbw,
                                                        customerVehiclesDamage: _this.khclssqk,
                                                        customerMoney: _this.ssje && _this.ssje.length > 0 ? _this.ssje : " ",
                                                        otherInjuries: _this.qtss,
                                                        otherMoney: _this.ssje2 && _this.ssje2.length > 0 ? _this.ssje2 : " ",

                                                        progressdescription: _this.jdms,  //  进度描述
                                                        followtime: _this.gjsj,  //  跟进时间
                                                        jdmsArrayStr: JSON.stringify(_this.followList),

                                                        vehicleSubName: isFaultManageProblem ? userInfo.suName : _this.vehicleSubName  //车管
                                                        // financialname:isAccidentFinance?userInfo.suName:_this.financialname,  //  财务姓名
                                                        // payType: _this.zffs,  //  支付方式
                                                        // payment: _this.zfje,  //  支付金额
                                                        // acceptingOfficer: _this.blry,  //  办理人员

                                                        // insider:_this.nbryxm  //  内部人员姓名

                                                    },
                                                    Api.problem_report.update, "POST", function (_data2) {
                                                        layer.closeAll();
                                                        tips("操作成功");
                                                        console.log($("#accidentAnalysis").val());
                                                        list.bootstrapTableTemplateQuery({});
                                                    });
                                            }
                                        }
                                    });

                                    //车管全部填写完后，出现打印按钮
                                    $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.accidentAnalysis textarea,.basicInfo select,.damageSituation select").on("input", function () {
                                        if (isFaultManageProblem && isNotEmpty($("#orderNumber").val()) && isNotEmpty($("#taskType").val()) && isNotEmpty($("#vehicleModels").val()) && isNotEmpty($("#customerVehicleDamageDescription").val()) && isNotEmpty($("#frame").val()) && isNotEmpty($("#ywyxm").val()) && isNotEmpty($("#ywyclsj").val()) && isNotEmpty($("#ywyyj").val()) && isNotEmpty($("#customerVehiclesDamage").val()) && isNotEmpty($("#customerMoney").val()) && isNotEmpty($("#otherInjuries").val()) && isNotEmpty($("#otherMoney").val())) {
                                            $("#printExpenseAccountManager").css("display", "inline-block");
                                        } else {
                                            $("#printExpenseAccountManager").css("display", "none");
                                        }
                                    });
                                    if (isFaultManageProblem && isNotEmpty($("#orderNumber").val()) && isNotEmpty($("#taskType").val()) && isNotEmpty($("#vehicleModels").val()) && isNotEmpty($("#customerVehicleDamageDescription").val()) && isNotEmpty($("#frame").val()) && isNotEmpty($("#ywyxm").val()) && isNotEmpty($("#ywyclsj").val()) && isNotEmpty($("#ywyyj").val()) && isNotEmpty($("#customerVehiclesDamage").val()) && isNotEmpty($("#customerMoney").val()) && isNotEmpty($("#otherInjuries").val()) && isNotEmpty($("#otherMoney").val())) {
                                        $("#printExpenseAccountManager").css("display", "inline-block");
                                    } else {
                                        $("#printExpenseAccountManager").css("display", "none");
                                    }

                                    // $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    // $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId1);
                                    // $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
                                    // $("#auditorId").val(_data.info.affiliated.auditorId);
                                    // $("#companyLostMonkey").val(_data.info.affiliated.companyLostMonkey);
                                    // $("#companyTechnician").val(_data.info.affiliated.companyTechnician);
                                    // $("#customerMoney").val(_data.info.affiliated.customerMoney);
                                    // $("#customerVehicleDamageDescription").val(_data.info.affiliated.customerVehicleDamageDescription);
                                    // $("#customerVehiclesDamage").val(_data.info.affiliated.customerVehiclesDamage);
                                    // $("#customerVehiclesFixedLoss").val(_data.info.affiliated.customerVehiclesFixedLoss);
                                    // $("#depreciationExpenses").val(_data.info.affiliated.depreciationExpenses);
                                    // $("#injured").val(_data.info.affiliated.injured);
                                    // $("#insuranceDeductibleAmount").val(_data.info.affiliated.insuranceDeductibleAmount);
                                    // $("#insurancePaymentsMoney").val(_data.info.affiliated.insurancePaymentsMoney);
                                    // $("#insurancePaymentsTime").val(_data.info.affiliated.insurancePaymentsTime);
                                    // $("#kpi").val(_data.info.affiliated.kpi);
                                    // $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    // $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    // $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    // $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    // $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    // $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    // $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    // $("#taskType").val(_data.info.affiliated.taskType);
                                    // $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    // $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    // $("#techniciansRatio").val(_data.info.affiliated.techniciansRatio);
                                    // $("#techniciansMonkey").val(_data.info.affiliated.techniciansMonkey);
                                    // $("#settlementMonkey").val(_data.info.affiliated.settlementMonkey);


                                    // $('#insurancePaymentsTime').datetimepicker({
                                    //     format: 'yyyy-mm-dd hh:ii',
                                    //     language: "zh-CN",
                                    //     todayButton: true
                                    // });

                                    // $("#saveBtn").click(function (e) {
                                    //     Tool.ajaxHelper.ajaxSubmit({
                                    //             id: _data.info.affiliated.id,
                                    //             name: _data.info.details.name,
                                    //             licensePlateNumber: _data.info.details.licensePlate,
                                    //             place: _data.info.details.place,
                                    //             customerUnit: _data.info.details.customerUnit,
                                    //
                                    //             accidentAnalysisImprovementMeasures: $("#accidentAnalysisImprovementMeasures").val(),
                                    //             accidentApplicationId: $("#accidentApplicationId").val(),
                                    //             actualAmountPaid: $("#actualAmountPaid").val(),
                                    //             auditorId: $("#auditorId").val(),
                                    //             companyLostMonkey: $("#companyLostMonkey").val(),
                                    //             companyTechnician: $("#companyTechnician").val(),
                                    //             customerMoney: $("#customerMoney").val(),
                                    //
                                    //             customerVehicleDamageDescription: $("#customerVehicleDamageDescription").val(),
                                    //             customerVehiclesDamage: $("#customerVehiclesDamage").val(),
                                    //             customerVehiclesFixedLoss: $("#customerVehiclesFixedLoss").val(),
                                    //             depreciationExpenses: $("#depreciationExpenses").val(),
                                    //             insuranceDeductibleAmount: $("#insuranceDeductibleAmount").val(),
                                    //             insurancePaymentsMoney: $("#insurancePaymentsMoney").val(),
                                    //             insurancePaymentsTime: $("#insurancePaymentsTime").val(),
                                    //             kpi: $("#kpi").val(),
                                    //             ourMoney: $("#ourMoney").val(),
                                    //             otherMoney: $("#otherMoney").val(),
                                    //             otherInjuries: $("#otherInjuries").val(),
                                    //             InsuranceDeductibleAmount: $("#InsuranceDeductibleAmount").val(),
                                    //             orderNumber: $("#orderNumber").val(),
                                    //             otherInjuries: $("#otherInjuries").val(),
                                    //             otherMoney: $("#otherMoney").val(),
                                    //             ourVehicleDamageDescription: $("#ourVehicleDamageDescription").val(),
                                    //             ourVehiclesDamage: $("#ourVehiclesDamage").val(),
                                    //             peopleInjure: $("#peopleInjure").val(),
                                    //             peopleMoney: $("#peopleMoney").val(),
                                    //             taskType: $("#taskType").val(),
                                    //             techniciansPunishmentMonkey: $("#techniciansPunishmentMonkey").val(),
                                    //             vehicleModels: $("#vehicleModels").val(),
                                    //             techniciansRatio: $("#techniciansRatio").val(),
                                    //             techniciansMonkey: $("#techniciansMonkey").val(),
                                    //             settlementMonkey: $("#settlementMonkey").val(),
                                    //
                                    //
                                    //         },
                                    //         Api.problem_report.update, "POST", function (_data2) {
                                    //             tips("操作成功");
                                    //             console.log($("#accidentAnalysis").val());
                                    //             list.bootstrapTableTemplateQuery({});
                                    //         }
                                    //     );
                                    //
                                    // });
                                    //
                                    // $("#submitBtn").click(function (e) {
                                    //     //询问框
                                    //     layer.confirm('表格提交后将不可修改，是否确认提交？', {
                                    //         btn: ['确定', '取消'] //按钮
                                    //     }, function () {
                                    //         $("#saveBtn").click();
                                    //         $.post(Api.problem.updateState, {
                                    //             id: id,
                                    //             startH: 2,
                                    //         }, function (_data) {
                                    //             switch (_data.code) {
                                    //                 case 0:
                                    //                     tips("提交成功");
                                    //                     break;
                                    //             }
                                    //         });
                                    //     }, function () {
                                    //     });
                                    // })
                                }
                            });
                            break;
                        case 3:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"></textarea></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysis").val(_data.info.affiliated.accidentAnalysis);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    $("#amountPenalty").val(_data.info.affiliated.amountPenalty);
                                    $("#compensationAmountTechnicians").val(_data.info.affiliated.compensationAmountTechnicians);
                                    $("#handle").val(_data.info.affiliated.handle);
                                    $("#othersArrivalAccount").val(_data.info.affiliated.othersArrivalAccount);
                                    $("#kpiDeduction").val(_data.info.affiliated.kpideduction);
                                    $("#normalDriving").val(_data.info.affiliated.normalDriving);
                                    $("#other").val(_data.info.affiliated.other);
                                    $("#otherAmountDamage").val(_data.info.affiliated.otherAmountDamage);
                                    $("#otherArrivalAccount").val(_data.info.affiliated.otherArrivalAccount);
                                    $("#otherFixedLoss").val(_data.info.affiliated.otherFixedLoss);
                                    $("#otherTime").val(_data.info.affiliated.otherTime);
                                    $("#othersTime").val(_data.info.affiliated.othersTime);
                                    $("#otherInsurance").val(_data.info.affiliated.otherInsurance);
                                    $("#others").val(_data.info.affiliated.others);
                                    $("#othersFixedLoss").val(_data.info.affiliated.othersFixedLoss);
                                    $("#othersInsurances").val(_data.info.affiliated.othersInsurances);
                                    $("#ourArrivalAccount").val(_data.info.affiliated.ourArrivalAccount);
                                    $("#ourFixedLoss").val(_data.info.affiliated.ourFixedLoss);
                                    $("#ourInsurance").val(_data.info.affiliated.ourInsurance);
                                    $("#ourTime").val(_data.info.affiliated.ourTime);
                                    $("#personnelInjuries").val(_data.info.affiliated.personnelInjuries);
                                    $("#personnelInjury").val(_data.info.affiliated.personnelInjury);
                                    $("#personnelInjuryAmountDamage").val(_data.info.affiliated.personnelInjuryAmountDamage);
                                    $("#personnelInjuryArrivalAccount").val(_data.info.affiliated.personnelInjuryArrivalAccount);
                                    $("#personnelInjuryFixedLoss").val(_data.info.affiliated.personnelInjuryFixedLoss);
                                    $("#personnelInjuryTime").val(_data.info.affiliated.personnelInjuryTime);
                                    $("#placeOccurrence").val(_data.info.affiliated.placeOccurrence);
                                    $("#proportionCompensation").val(_data.info.affiliated.proportionCompensation);
                                    $("#we").val(_data.info.affiliated.we);
                                    $("#time").val(_data.info.affiliated.time);
                                    $("#weAmountDamage").val(_data.info.affiliated.weAmountDamage);
                                    $("#responsibilityJudgement").val(_data.info.affiliated.responsibilityJudgement);
                                    $("#othersAmountDamage").val(_data.info.affiliated.othersAmountDamage);
                                    $("#personnelInjuryInsurance").val(_data.info.affiliated.personnelInjuryInsurance);


                                    $('#othersTime,#otherTime,#ourTime,#personnelInjuryTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true
                                    });

                                    $("#saveBtn").click(function (e) {
                                        console.log($("#we").val());

                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                name: _data.info.details.name,
                                                licensePlate: _data.info.details.licensePlate,
                                                placeOccurrence: _data.info.details.place,

                                                accidentAnalysis: $("#accidentAnalysis").val(),
                                                accidentApplicationId: $("#accidentApplicationId").val(),
                                                amountPenalty: $("#amountPenalty").val(),
                                                compensationAmountTechnicians: $("#compensationAmountTechnicians").val(),
                                                handle: $("#handle").val(),
                                                kpideduction: $("#kpiDeduction").val(),
                                                normalDriving: $("#normalDriving").val(),
                                                otherAmountDamage: $("#otherAmountDamage").val(),
                                                otherArrivalAccount: $("#otherArrivalAccount").val(),
                                                otherTime: $("#otherTime").val(),
                                                others: $("#others").val(),
                                                othersAmountDamage: $("#othersAmountDamage").val(),
                                                othersArrivalAccount: $("#othersArrivalAccount").val(),
                                                othersFixedLoss: $("#othersFixedLoss").val(),
                                                othersInsurances: $("#othersInsurances").val(),
                                                othersTime: $("#othersTime").val(),
                                                ourArrivalAccount: $("#ourArrivalAccount").val(),
                                                ourFixedLoss: $("#ourFixedLoss").val(),
                                                ourInsurance: $("#ourInsurance").val(),
                                                ourTime: $("#ourTime").val(),
                                                personnelInjury: $("#personnelInjury").val(),
                                                personnelInjuryAmountDamage: $("#personnelInjuryAmountDamage").val(),
                                                personnelInjuryArrivalAccount: $("#personnelInjuryArrivalAccount").val(),
                                                personnelInjuryFixedLoss: $("#personnelInjuryFixedLoss").val(),
                                                personnelInjuryInsurance: $("#personnelInjuryInsurance").val(),
                                                personnelInjuryTime: $("#personnelInjuryTime").val(),
                                                proportionCompensation: $("#proportionCompensation").val(),
                                                responsibilityJudgement: $("#responsibilityJudgement").val(),
                                                we: $("#we").val(),
                                                weAmountDamage: $("#weAmountDamage").val(),
                                                time: $("#time").val(),
                                                personnelInjuries: $("#personnelInjuries").val(),
                                                otherFixedLoss: $("#otherFixedLoss").val(),
                                                otherInsurance: $("#otherInsurance").val(),
                                                other: $("#other").val()

                                            },
                                            Api.problem_report.update, "POST", function (_data2) {
                                                tips("操作成功");
                                                console.log($("#accidentAnalysis").val());
                                                list.bootstrapTableTemplateQuery({});
                                            }
                                        );

                                    });

                                }
                            });
                            break;
                        case 4:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId1);
                                    $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
                                    $("#auditorId").val(_data.info.affiliated.auditorId);
                                    $("#companyLostMonkey").val(_data.info.affiliated.companyLostMonkey);
                                    $("#companyTechnician").val(_data.info.affiliated.companyTechnician);
                                    $("#customerMoney").val(_data.info.affiliated.customerMoney);
                                    $("#customerVehicleDamageDescription").val(_data.info.affiliated.customerVehicleDamageDescription);
                                    $("#customerVehiclesDamage").val(_data.info.affiliated.customerVehiclesDamage);
                                    $("#customerVehiclesFixedLoss").val(_data.info.affiliated.customerVehiclesFixedLoss);
                                    $("#depreciationExpenses").val(_data.info.affiliated.depreciationExpenses);
                                    $("#injured").val(_data.info.affiliated.injured);
                                    $("#insuranceDeductibleAmount").val(_data.info.affiliated.insuranceDeductibleAmount);
                                    $("#insurancePaymentsMoney").val(_data.info.affiliated.insurancePaymentsMoney);
                                    $("#insurancePaymentsTime").val(_data.info.affiliated.insurancePaymentsTime);
                                    $("#kpi").val(_data.info.affiliated.kpi);
                                    $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    $("#techniciansRatio").val(_data.info.affiliated.techniciansRatio);
                                    $("#techniciansMonkey").val(_data.info.affiliated.techniciansMonkey);
                                    $("#settlementMonkey").val(_data.info.affiliated.settlementMonkey);


                                    $('#insurancePaymentsTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true
                                    });

                                    $("#saveBtn").click(function (e) {
                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                name: _data.info.details.name,
                                                licensePlateNumber: _data.info.details.licensePlate,
                                                place: _data.info.details.place,
                                                customerUnit: _data.info.details.customerUnit,

                                                accidentAnalysisImprovementMeasures: $("#accidentAnalysisImprovementMeasures").val(),
                                                accidentApplicationId: $("#accidentApplicationId").val(),
                                                actualAmountPaid: $("#actualAmountPaid").val(),
                                                auditorId: $("#auditorId").val(),
                                                companyLostMonkey: $("#companyLostMonkey").val(),
                                                companyTechnician: $("#companyTechnician").val(),
                                                customerMoney: $("#customerMoney").val(),

                                                customerVehicleDamageDescription: $("#customerVehicleDamageDescription").val(),
                                                customerVehiclesDamage: $("#customerVehiclesDamage").val(),
                                                customerVehiclesFixedLoss: $("#customerVehiclesFixedLoss").val(),
                                                depreciationExpenses: $("#depreciationExpenses").val(),
                                                insuranceDeductibleAmount: $("#insuranceDeductibleAmount").val(),
                                                insurancePaymentsMoney: $("#insurancePaymentsMoney").val(),
                                                insurancePaymentsTime: $("#insurancePaymentsTime").val(),
                                                kpi: $("#kpi").val(),
                                                ourMoney: $("#ourMoney").val(),
                                                otherMoney: $("#otherMoney").val(),
                                                otherInjuries: $("#otherInjuries").val(),
                                                InsuranceDeductibleAmount: $("#InsuranceDeductibleAmount").val(),
                                                orderNumber: $("#orderNumber").val(),
                                                otherInjuries: $("#otherInjuries").val(),
                                                otherMoney: $("#otherMoney").val(),
                                                ourVehicleDamageDescription: $("#ourVehicleDamageDescription").val(),
                                                ourVehiclesDamage: $("#ourVehiclesDamage").val(),
                                                peopleInjure: $("#peopleInjure").val(),
                                                peopleMoney: $("#peopleMoney").val(),
                                                taskType: $("#taskType").val(),
                                                techniciansPunishmentMonkey: $("#techniciansPunishmentMonkey").val(),
                                                vehicleModels: $("#vehicleModels").val(),
                                                techniciansRatio: $("#techniciansRatio").val(),
                                                techniciansMonkey: $("#techniciansMonkey").val(),
                                                settlementMonkey: $("#settlementMonkey").val(),


                                            },
                                            Api.problem_report.update, "POST", function (_data2) {
                                                tips("操作成功");
                                                console.log($("#accidentAnalysis").val());
                                                list.bootstrapTableTemplateQuery({});
                                            }
                                        );

                                    });

                                }
                            });
                            break;
                    }

                    break;
            }
        });

    });

    //查看详情
    $(".lookInfo").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = parseInt(data[0].id);
        $.get(Api.problem.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data.info.details.natureAccident);
                    switch (_data.info.details.natureAccident) {
                        case 1:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(_data.info.details.addTime);
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for (var j = 0; j < jsonObj.length; j++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj[j] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#invoce').viewer();
                                            $('#invoce').viewer("update");
                                            // })
                                        });
                                        $("#invoce").append($clone);
                                    }


                                }
                            });
                            break;
                        case 2:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">新车问题检查反馈</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">新车问题照片：</div></div><div id="invoce"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"));
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for (var j = 0; j < jsonObj.length; j++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj[j] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#invoce').viewer();
                                            $('#invoce').viewer("update");
                                            // })
                                        });
                                        $("#invoce").append($clone);
                                    }

                                }
                            });
                            break;
                        case 3:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">自车交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">自车牌照</div><input type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故全景照</div></div><div id="invoce"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">受损部位照</div></div><div id="ssbwz"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(_data.info.details.addTime);
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for (var j = 0; j < jsonObj.length; j++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj[j] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#invoce').viewer();
                                            $('#invoce').viewer("update");
                                            // })
                                        });
                                        $("#invoce").append($clone);
                                    }


                                }
                            });
                            break;
                        case 4:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.dateFormatToTimeStamp(_data.info.details.addTime, "yyyy年MM月dd日 HH:mm"));
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for (var j = 0; j < jsonObj.length; j++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj[j] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#invoce').viewer();
                                            $('#invoce').viewer("update");
                                            // })
                                        });
                                        $("#invoce").append($clone);
                                    }


                                }
                            });
                            break;
                    }

                    break;
            }
        });

    });

    //确认报修
    $(".reviewAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = data[0].id;
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                    id: parseInt(data[0].id),
                    start: 2,
                    nature: getNatureAccidentIndex(data[0].natureAccident),
                    vehicleCompleteName: userInfo.suName
                },
                Api.problem.update, "POST", function () {
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
            console.log("完成");
        })

    });

    //不保修
    $(".reviewNotAdopt").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id,
                    start: 4,
                    startH: 2,
                    userId: userId,
                    vehicleCompleteName: userInfo.suName
                },
                Api.problem.update, "POST", function () {
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
            console.log("完成");
        })
    });

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

        var id = data[0].id;
        console.log(data[0]);

        // console.log((data[0].start == '3' && data[0].startH != "2"));
        // if (!((data[0].start == '3' && data[0].startH != "2") || data[0].start == '4')) {
        //     tips("选择的状态错误");
        //     return false;
        // }


        var info = {id: data[0].id, start: 5, confirmUserId: userId};
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            $.get(Api.problem.info + "/" + id, {}, function (_data) {
                switch (_data.code) {
                    case 0:
                        console.log(_data.info.details.natureAccident);
                        switch (_data.info.details.natureAccident) {
                            case 1:
                                break;
                            case 2:
                                var affiliated = _data.info.affiliated;


                                if (isNotEmpty(affiliated.orderNumber) && isNotEmpty(affiliated.frame) && isNotEmpty(affiliated.taskType) && isNotEmpty(affiliated.vehicleModels) && isNotEmpty(affiliated.customerVehicleDamageDescription) && isNotEmpty(affiliated.customerVehiclesDamage) && isNotEmpty(affiliated.otherInjuries)) {
                                    tool.ajaxHelper.ajaxSubmit({
                                        id: id,
                                        start: 5,
                                        userId: userId
                                    }, Api.problem.update, "POST", function (_data) {
                                        switch (_data.code) {
                                            case 0:
                                                tips("操作成功");
                                                list.bootstrapTableTemplateQuery({});
                                                break;
                                        }
                                    });
                                } else {

                                    inquiry("请全部填写表格数据后再确认完成！", function () {
                                        parent.layer.closeAll();
                                    });
                                }


                                break;
                            case 3:
                                break;
                            case 4:
                                break;
                        }
                }
            });
        })

    });

    //查看表单详情
    $(".lookForm").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }

        var id = parseInt(data[0].id);

        $.get(Api.problem.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    switch (_data.info.details.natureAccident) {
                        case 1:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney" class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账金额</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-3"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
                                    $("#companyLostMonkey").val(_data.info.affiliated.companyLostMonkey);
                                    $("#companyTechnician").val(_data.info.affiliated.companyTechnician);
                                    $("#customerMoney").val(_data.info.affiliated.customerMoney);
                                    $("#customerVehicleDamageDescription").val(_data.info.affiliated.customerVehicleDamageDescription);
                                    $("#customerVehiclesDamage").val(_data.info.affiliated.customerVehiclesDamage);
                                    $("#customerVehiclesFixedLoss").val(_data.info.affiliated.customerVehiclesFixedLoss);
                                    $("#depreciationExpenses").val(_data.info.affiliated.depreciationExpenses);
                                    $("#injured").val(_data.info.affiliated.injured);
                                    $("#insuranceDeductibleAmount").val(_data.info.affiliated.insuranceDeductibleAmount);
                                    $("#insurancePaymentsMoney").val(_data.info.affiliated.insurancePaymentsMoney);
                                    $("#insurancePaymentsTime").val(_data.info.affiliated.insurancePaymentsTime);
                                    $("#KPI").val(_data.info.affiliated.kpi);
                                    $("#licensePlateNumber").val(_data.info.affiliated.licensePlateNumber);
                                    $("#newOld").val(_data.info.affiliated.newOld);
                                    $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    $("#ourMoney").val(_data.info.affiliated.ourMoney);
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#time").val(_data.info.affiliated.time);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);

                                    $(".form input,.form textarea").attr("readonly", "readonly");
                                    $(".form select").attr("disabled", "disabled");

                                }
                            });
                            break;
                        case 2:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="xcjcwtfkForm"class="form"><div class="title-lg">新车检查问题反馈</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"v-bind:value="cph"placeholder=""readonly></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly v-bind:value="addTime"style="display:inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"v-bind:value="sgfsdd"readonly></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""v-bind:value="khdw"readonly></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"readonly class="form-control width-1"placeholder=""v-bind:value="ddbh"v-model="ddbh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><input type="text"class="form-control width-1"readonly placeholder=""v-bind:value="khclpp"v-model="khclpp"></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"readonly type="text"class="form-control width-1"placeholder=""v-bind:value="xh"v-model="xh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆受损部位</div><input id="customerVehicleDamageDescription"type="text"readonly class="form-control width-1"placeholder=""v-bind:value="khclssbw"v-model="khclssbw"></div><div class="tdBox-2"><div class="title-sm title-left">车架号</div><input type="text"class="form-control width-1"placeholder=""v-bind:value="cjh"readonly v-model="cjh"></div></div></div></div><div class="partBox damageSituation"><div class="title-md">业务员处理信息</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">业务员姓名</div><input class="form-control ver-top width-1"name="deblock_udid"rows="5"v-bind:value="ywyxm"readonly></input></div><div class="tdBox-2"><div class="title-sm title-right">业务员处理时间</div><input type="text"class="form-control width-1"placeholder=""v-bind:value="ywyclsj"readonly></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">业务员意见</div><textarea class="form-control ver-top width-2"name="deblock_udid"rows="5"v-bind:value="ywyyj"readonly></textarea></div></div></div></div><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="khclssqk"v-model="khclssqk"readonly></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"readonly class="form-control width-1"placeholder=""v-bind:value="ssje"v-model="ssje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"readonly name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"readonly placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">车管姓名</div><input id="cgxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    var formNue = new Vue({
                                        el: "#xcjcwtfkForm",
                                        data: {
                                            bridgeFinance: true,
                                            jsxm: _data.info.details.name,
                                            cph: _data.info.details.licensePlate,
                                            addTime: tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"),
                                            sgfsdd: _data.info.details.place,
                                            khdw: _data.info.details.customerUnit,
                                            ddbh: _data.info.affiliated.orderNumber,
                                            khclpp: _data.info.affiliated.taskType,
                                            xh: _data.info.affiliated.vehicleModels,
                                            khclssbw: _data.info.affiliated.customerVehicleDamageDescription,
                                            khclssqk: _data.info.affiliated.customerVehiclesDamage,
                                            ssje: _data.info.affiliated.customerMoney,
                                            qtss: _data.info.affiliated.otherInjuries,
                                            ssje2: _data.info.affiliated.otherMoney,
                                            cjh: _data.info.affiliated.frame,
                                            ywyxm: _data.info.details.salesmanName,
                                            ywyyj: _data.info.details.remark,
                                            ywyclsj: _data.info.details.vehicleHandleTime ? tool.dataHelper.timeStampToDateFormat(_data.info.details.vehicleHandleTime, "yyyy年MM月dd日 hh:mm") : "暂无处理时间",

                                            followList: _data.info.affiliated.jdmsArrayStr ? JSON.parse(_data.info.affiliated.jdmsArrayStr) : [],

                                            cgxm: _data.info.affiliated.vehicleSubName,  //  车管姓名
                                            // zffs:_data.info.affiliated.payType,  //  支付方式
                                            // zfje:_data.info.affiliated.payment,  //  支付金额
                                            // blry:_data.info.affiliated.acceptingOfficer,  //  办理人员
                                            //
                                            // nbryxm:_data.info.affiliated.insider,  //  内部人员姓名
                                            // cwxm:_data.info.affiliated.financialname  //  财务姓名

                                        },
                                        methods: {}
                                    });

                                    $("#xcjcwtfkForm input,#xcjcwtfkForm textarea").attr("readonly", "readonly");
                                    $("#xcjcwtfkForm select").attr("disabled", "disabled");

                                }
                            });
                            break;
                        case 3:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"></textarea></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysis").val(_data.info.affiliated.accidentAnalysis);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    $("#amountPenalty").val(_data.info.affiliated.amountPenalty);
                                    $("#compensationAmountTechnicians").val(_data.info.affiliated.compensationAmountTechnicians);
                                    $("#handle").val(_data.info.affiliated.handle);
                                    $("#othersArrivalAccount").val(_data.info.affiliated.othersArrivalAccount);
                                    $("#kpiDeduction").val(_data.info.affiliated.kpideduction);
                                    $("#normalDriving").val(_data.info.affiliated.normalDriving);
                                    $("#other").val(_data.info.affiliated.other);
                                    $("#otherAmountDamage").val(_data.info.affiliated.otherAmountDamage);
                                    $("#otherArrivalAccount").val(_data.info.affiliated.otherArrivalAccount);
                                    $("#otherFixedLoss").val(_data.info.affiliated.otherFixedLoss);
                                    $("#otherTime").val(_data.info.affiliated.otherTime);
                                    $("#othersTime").val(_data.info.affiliated.othersTime);
                                    $("#otherInsurance").val(_data.info.affiliated.otherInsurance);
                                    $("#others").val(_data.info.affiliated.others);
                                    $("#othersFixedLoss").val(_data.info.affiliated.othersFixedLoss);
                                    $("#othersInsurances").val(_data.info.affiliated.othersInsurances);
                                    $("#ourArrivalAccount").val(_data.info.affiliated.ourArrivalAccount);
                                    $("#ourFixedLoss").val(_data.info.affiliated.ourFixedLoss);
                                    $("#ourInsurance").val(_data.info.affiliated.ourInsurance);
                                    $("#ourTime").val(_data.info.affiliated.ourTime);
                                    $("#personnelInjuries").val(_data.info.affiliated.personnelInjuries);
                                    $("#personnelInjury").val(_data.info.affiliated.personnelInjury);
                                    $("#personnelInjuryAmountDamage").val(_data.info.affiliated.personnelInjuryAmountDamage);
                                    $("#personnelInjuryArrivalAccount").val(_data.info.affiliated.personnelInjuryArrivalAccount);
                                    $("#personnelInjuryFixedLoss").val(_data.info.affiliated.personnelInjuryFixedLoss);
                                    $("#personnelInjuryTime").val(_data.info.affiliated.personnelInjuryTime);
                                    $("#placeOccurrence").val(_data.info.affiliated.placeOccurrence);
                                    $("#proportionCompensation").val(_data.info.affiliated.proportionCompensation);
                                    $("#we").val(_data.info.affiliated.we);
                                    $("#time").val(_data.info.affiliated.time);
                                    $("#weAmountDamage").val(_data.info.affiliated.weAmountDamage);
                                    $("#responsibilityJudgement").val(_data.info.affiliated.responsibilityJudgement);
                                    $("#othersAmountDamage").val(_data.info.affiliated.othersAmountDamage);
                                    $("#personnelInjuryInsurance").val(_data.info.affiliated.personnelInjuryInsurance);
                                    $(".form input,.form textarea,.form select").attr("readonly", "readonly");
                                }
                            });
                            break;
                        case 4:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId1);
                                    $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
                                    $("#auditorId").val(_data.info.affiliated.auditorId);
                                    $("#companyLostMonkey").val(_data.info.affiliated.companyLostMonkey);
                                    $("#companyTechnician").val(_data.info.affiliated.companyTechnician);
                                    $("#customerMoney").val(_data.info.affiliated.customerMoney);
                                    $("#customerVehicleDamageDescription").val(_data.info.affiliated.customerVehicleDamageDescription);
                                    $("#customerVehiclesDamage").val(_data.info.affiliated.customerVehiclesDamage);
                                    $("#customerVehiclesFixedLoss").val(_data.info.affiliated.customerVehiclesFixedLoss);
                                    $("#depreciationExpenses").val(_data.info.affiliated.depreciationExpenses);
                                    $("#injured").val(_data.info.affiliated.injured);
                                    $("#insuranceDeductibleAmount").val(_data.info.affiliated.insuranceDeductibleAmount);
                                    $("#insurancePaymentsMoney").val(_data.info.affiliated.insurancePaymentsMoney);
                                    $("#insurancePaymentsTime").val(_data.info.affiliated.insurancePaymentsTime);
                                    $("#kpi").val(_data.info.affiliated.kpi);
                                    $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    $("#techniciansRatio").val(_data.info.affiliated.techniciansRatio);
                                    $("#techniciansMonkey").val(_data.info.affiliated.techniciansMonkey);
                                    $("#settlementMonkey").val(_data.info.affiliated.settlementMonkey);

                                    $(".form input,.form textarea,.form select").attr("readonly", "readonly");

                                }
                            });
                            break;
                    }

                    break;
            }
        });


    });

    //提醒车管
    $(".remindFaultManage").click(function () {
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }

        var id = parseInt(data[0].id);
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();

            $.get(Api.problem.info + "/" + id, {}, function (_data) {
                console.log(_data);

                Tool.ajaxHelper.ajaxSubmit({
                        id: id,
                        reminderTime: tool.dataHelper.timeStampToDateFormat(parseInt(new Date().getTime() / 1000), "yyyy年MM月dd日 hh:mm")
                    },
                    Api.problem.update, "POST", function (_data2) {
                        // console.log(_data.info.details.reminderTime);
                        // list.bootstrapTableTemplateQuery({});
                    }
                );

            });

            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id
                },
                Api.problem.remindVehicle, "POST", function () {
                    console.log(list.bootstrapTableTemplateSelect("remindTime"));
                    tips("操作成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
            console.log("完成");
        });
    });
});


function getNatureAccidentIndex(_text) {
    var index;
    switch (_text) {
        case "装卸事故":
            index = 1;
            break;
        case "新车检查":
            index = 2;
            break;
        case "交通事故":
            index = 3;
            break;
        case "新车装卸":
            index = 4;
            break;
    }
    return index;
}

//判断是否不为空
function isNotEmpty(_str) {
    switch (typeof _str) {
        case "string":
            return _str.replace(" ", "").length > 0;
            break;
        case "number":
            return _str == _str;
            break;
        case "object":
            return _str != null;
            break;
        case "undefined":
            return false;
            break;
        case "boolean":
            return _str;
            break;

    }
}