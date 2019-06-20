var list = null;
var vueSelf = null;
var controller = "";
var accidentId = null;
var accidentCheck =1;
var accidentFinance =1;
var defaultState =1;

var isFaultDriver = false;
var isFaultManage = false;
var isFaultDispatch = false;

var userId = userInfo.structureUserId;
var vueObj;

isFaultDriver = userRoleList.indexOf(config.faultDriver) > -1;
isFaultManage = userRoleList.indexOf(config.faultManage) > -1;
isFaultDispatch = userRoleList.indexOf(config.faultDispatch) > -1;

// var accidentCheck = userRoleList.indexOf(config.faultDriver) > -1;
// var accidentFinance = userRoleList.indexOf(config.accidentFinance) > -1;
//
// //看见已经完成的 记录 isCompleted
// var accidentObserver = userRoleList.indexOf(config.accidentObserver) > -1;
// var accidentCount = userRoleList.indexOf(config.accidentCount) > -1;

// var defaultState = accidentCheck ? config.notApproval : (accidentFinance ? config.notMakeMoney : accidentObserver ? config.isCompleted : (accidentCount ? config.isCompleted : -10));

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
            accidentFinance: accidentFinance,
            nowState: defaultState,
            sheetData: [],
            isFaultDriver:isFaultDriver,
            isFaultManage:isFaultManage,
            isFaultDispatch:isFaultDispatch,
            state:1,

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

        }
    })
})();


$(function () {
    var options = {
        // multiple: false,
        recordField: "page",
        param: {"state": defaultState, userId: userId},
        url: Api.ex_haccident_application.list,
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
                hidden:true
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
                    if(value==1){
                        return "装卸事故";
                    }else if(value==2){
                        return "新车检查";
                    }else if(value==3){
                        return "交通事故";
                    }else if(value==4){
                        return "新车装卸";
                    }

                }


            },
            {
                label: '事故状态',
                name: 'start',
                sortable: false,
                formatter: function (value, options, row) {
                    switch(value){
                        case 1:
                            return '<span class="label label-danger">未处理</span>';
                            break;
                        case 2:
                            return '<span class="label label-danger">未调度</span>';
                            break;
                        case 3:
                            return '<span class="label label-danger">已调度</span>';
                            break;
                        case 4:
                            return '<span class="label label-danger">继续跑</span>';
                            break;
                        case 5:
                            return '<span class="label label-success">已完成</span>';
                            break;
                    }
                }

            },
            {
                label: '主表状态',
                name: 'start',
                sortable: false,
                hidden:true,
                default:1
            },

            {
                label: 'flowId',
                name: 'flowId',
                sortable: false,
                hidden:true
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


    $('#startTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayStart, 'yyyy-MM-dd hh:ss'));
    /*$('#endTime').val(tool.dataHelper.timeStampToDateFormat(tool.timeHelper.todayEnd, 'yyyy-MM-dd hh:ss'));*/
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

    //已调度
    $(".ydd").click(function(e){
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
            if(data[0].start=='2'){
            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id,
                    start: 3,
                },
                Api.ex_haccident_application.update, "POST", function () {
                    tips("调度成功");
                    list.bootstrapTableTemplateQuery({});
                }
            );
            console.log("调度完成");
            }
        })

    });

    //待完善，完成表格
    $(".dws").click(function(){
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = parseInt(data[0].id);

        $.get(Api.ex_haccident_application.info+"/"+id,{},function(_data){
            switch(_data.code){
                case 0:
                    console.log(_data);
                    switch(_data.info.details.natureAccident){
                        case 1:layer.open({
                            type: 1,
                            title:"完善表格",
                            shadeClose: true,
                            skin:"layer-box",
                            content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney" class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账金额</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-3"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                            success:function(_layero, _index){
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




                                $('#personnelInjuryTime,#ourTime,#otherTime,#othersTime').datetimepicker({
                                    format: 'yyyy-mm-dd hh:ii',
                                    language: "zh-CN",
                                    todayButton: true
                                });

                                $("#saveBtn").click(function(e){
                                    Tool.ajaxHelper.ajaxSubmit({
                                            id: _data.info.affiliated.id,
                                            name:_data.info.details.name,
                                            licensePlateNumber:_data.info.details.licensePlate,
                                            place:_data.info.details.place,
                                            customerUnit:_data.info.details.customerUnit,

                                            accidentAnalysisImprovementMeasures:$("#accidentAnalysisImprovementMeasures").val(),
                                            accidentApplicationId:$("#accidentApplicationId").val(),
                                            actualAmountPaid:$("#actualAmountPaid").val(),
                                            companyLostMonkey:$("#companyLostMonkey").val(),
                                            companyTechnician:$("#companyTechnician").val(),
                                            customerMoney:$("#customerMoney").val(),
                                            customerVehicleDamageDescription:$("#customerVehicleDamageDescription").val(),
                                            customerVehiclesDamage:$("#customerVehiclesDamage").val(),
                                            customerVehiclesFixedLoss:$("#customerVehiclesFixedLoss").val(),
                                            depreciationExpenses:$("#depreciationExpenses").val(),
                                            injured:$("#injured").val(),
                                            insuranceDeductibleAmount:$("#insuranceDeductibleAmount").val(),
                                            insurancePaymentsMoney:$("#insurancePaymentsMoney").val(),
                                            insurancePaymentsTime:$("#insurancePaymentsTime").val(),
                                            kpi:$("#KPI").val(),
                                            newOld:$("#newOld").val(),
                                            orderNumber:$("#orderNumber").val(),
                                            otherInjuries:$("#otherInjuries").val(),
                                            otherMoney:$("#otherMoney").val(),
                                            ourMoney:$("#ourMoney").val(),
                                            ourVehicleDamageDescription:$("#ourVehicleDamageDescription").val(),
                                            ourVehiclesDamage:$("#ourVehiclesDamage").val(),
                                            peopleInjure:$("#peopleInjure").val(),
                                            peopleMoney:$("#peopleMoney").val(),
                                            taskType:$("#taskType").val(),
                                            techniciansPunishmentMonkey:$("#techniciansPunishmentMonkey").val(),
                                            vehicleModels:$("#vehicleModels").val(),
                                            time:$("#time").val(),


                                        },
                                        Api.h_handling_accidents.Handing, "POST", function (_data2) {
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
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车检查</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                                success:function(_layero, _index){
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
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription   );
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

                                    $("#saveBtn").click(function(e){
                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                name:_data.info.details.name,
                                                licensePlateNumber:_data.info.details.licensePlate,
                                                place:_data.info.details.place,
                                                customerUnit:_data.info.details.customerUnit,

                                                accidentAnalysisImprovementMeasures:$("#accidentAnalysisImprovementMeasures").val(),
                                                accidentApplicationId:$("#accidentApplicationId").val(),
                                                actualAmountPaid:$("#actualAmountPaid").val(),
                                                auditorId:$("#auditorId").val(),
                                                companyLostMonkey:$("#companyLostMonkey").val(),
                                                companyTechnician:$("#companyTechnician").val(),
                                                customerMoney:$("#customerMoney").val(),

                                                customerVehicleDamageDescription:$("#customerVehicleDamageDescription").val(),
                                                customerVehiclesDamage:$("#customerVehiclesDamage").val(),
                                                customerVehiclesFixedLoss:$("#customerVehiclesFixedLoss").val(),
                                                depreciationExpenses:$("#depreciationExpenses").val(),
                                                insuranceDeductibleAmount:$("#insuranceDeductibleAmount").val(),
                                                insurancePaymentsMoney:$("#insurancePaymentsMoney").val(),
                                                insurancePaymentsTime:$("#insurancePaymentsTime").val(),
                                                kpi:$("#kpi").val(),
                                                ourMoney:$("#ourMoney").val(),
                                                otherMoney:$("#otherMoney").val(),
                                                otherInjuries:$("#otherInjuries").val(),
                                                InsuranceDeductibleAmount:$("#InsuranceDeductibleAmount").val(),
                                                orderNumber:$("#orderNumber").val(),
                                                otherInjuries:$("#otherInjuries").val(),
                                                otherMoney:$("#otherMoney").val(),
                                                ourVehicleDamageDescription:$("#ourVehicleDamageDescription").val(),
                                                ourVehiclesDamage:$("#ourVehiclesDamage").val(),
                                                peopleInjure:$("#peopleInjure").val(),
                                                peopleMoney:$("#peopleMoney").val(),
                                                taskType:$("#taskType").val(),
                                                techniciansPunishmentMonkey:$("#techniciansPunishmentMonkey").val(),
                                                vehicleModels:$("#vehicleModels").val(),
                                                techniciansRatio:$("#techniciansRatio").val(),
                                                techniciansMonkey:$("#techniciansMonkey").val(),
                                                settlementMonkey:$("#settlementMonkey").val(),



                                            },
                                            Api.h_handling_accidents.NewCarCheck, "POST", function (_data2) {
                                                tips("操作成功");
                                                console.log($("#accidentAnalysis").val());
                                                list.bootstrapTableTemplateQuery({});
                                            }
                                        );

                                    });

                                    $("#submitBtn").click(function(e) {
                                        //询问框
                                        layer.confirm('表格提交后将不可修改，是否确认提交？', {
                                            btn: ['确定', '取消'] //按钮
                                        }, function () {
                                            $("#saveBtn").click();
                                            $.post(Api.ex_haccident_application.updatestate, {
                                                id: id,
                                                startH: 2,
                                            }, function (_data) {
                                                switch (_data.code) {
                                                    case 0:
                                                        tips("提交成功");
                                                        break;
                                                }
                                            });
                                        }, function () {
                                        });
                                    })
                                }
                            });
                            break;
                        case 3:
                            layer.open({
                            type: 1,
                            title:"完善表格",
                            shadeClose: true,
                            skin:"layer-box",
                            content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"></textarea></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                            success:function(_layero, _index){
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

                                $("#saveBtn").click(function(e){
                                    console.log($("#we").val());

                                    Tool.ajaxHelper.ajaxSubmit({
                                            id: _data.info.affiliated.id,
                                            name:_data.info.details.name,
                                            licensePlate:_data.info.details.licensePlate,
                                            placeOccurrence:_data.info.details.place,

                                            accidentAnalysis:$("#accidentAnalysis").val(),
                                            accidentApplicationId:$("#accidentApplicationId").val(),
                                            amountPenalty:$("#amountPenalty").val(),
                                            compensationAmountTechnicians:$("#compensationAmountTechnicians").val(),
                                            handle:$("#handle").val(),
                                            kpideduction:$("#kpiDeduction").val(),
                                            normalDriving:$("#normalDriving").val(),
                                            otherAmountDamage:$("#otherAmountDamage").val(),
                                            otherArrivalAccount:$("#otherArrivalAccount").val(),
                                            otherTime:$("#otherTime").val(),
                                            others:$("#others").val(),
                                            othersAmountDamage:$("#othersAmountDamage").val(),
                                            othersArrivalAccount:$("#othersArrivalAccount").val(),
                                            othersFixedLoss:$("#othersFixedLoss").val(),
                                            othersInsurances:$("#othersInsurances").val(),
                                            othersTime:$("#othersTime").val(),
                                            ourArrivalAccount:$("#ourArrivalAccount").val(),
                                            ourFixedLoss:$("#ourFixedLoss").val(),
                                            ourInsurance:$("#ourInsurance").val(),
                                            ourTime:$("#ourTime").val(),
                                            personnelInjury:$("#personnelInjury").val(),
                                            personnelInjuryAmountDamage:$("#personnelInjuryAmountDamage").val(),
                                            personnelInjuryArrivalAccount:$("#personnelInjuryArrivalAccount").val(),
                                            personnelInjuryFixedLoss:$("#personnelInjuryFixedLoss").val(),
                                            personnelInjuryInsurance:$("#personnelInjuryInsurance").val(),
                                            personnelInjuryTime:$("#personnelInjuryTime").val(),
                                            proportionCompensation:$("#proportionCompensation").val(),
                                            responsibilityJudgement:$("#responsibilityJudgement").val(),
                                            we:$("#we").val(),
                                            weAmountDamage:$("#weAmountDamage").val(),
                                            time:$("#time").val(),
                                            personnelInjuries:$("#personnelInjuries").val(),
                                            otherFixedLoss:$("#otherFixedLoss").val(),
                                            otherInsurance:$("#otherInsurance").val(),
                                            other:$("#other").val()

                                        },
                                        Api.h_handling_accidents.traffic, "POST", function (_data2) {
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
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div><div class="buttonBox"><button id="saveBtn"class="button1">保存</button></div>',
                                success:function(_layero, _index){
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
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription   );
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

                                    $("#saveBtn").click(function(e){
                                        Tool.ajaxHelper.ajaxSubmit({
                                                id: _data.info.affiliated.id,
                                                name:_data.info.details.name,
                                                licensePlateNumber:_data.info.details.licensePlate,
                                                place:_data.info.details.place,
                                                customerUnit:_data.info.details.customerUnit,

                                                accidentAnalysisImprovementMeasures:$("#accidentAnalysisImprovementMeasures").val(),
                                                accidentApplicationId:$("#accidentApplicationId").val(),
                                                actualAmountPaid:$("#actualAmountPaid").val(),
                                                auditorId:$("#auditorId").val(),
                                                companyLostMonkey:$("#companyLostMonkey").val(),
                                                companyTechnician:$("#companyTechnician").val(),
                                                customerMoney:$("#customerMoney").val(),

                                                customerVehicleDamageDescription:$("#customerVehicleDamageDescription").val(),
                                                customerVehiclesDamage:$("#customerVehiclesDamage").val(),
                                                customerVehiclesFixedLoss:$("#customerVehiclesFixedLoss").val(),
                                                depreciationExpenses:$("#depreciationExpenses").val(),
                                                insuranceDeductibleAmount:$("#insuranceDeductibleAmount").val(),
                                                insurancePaymentsMoney:$("#insurancePaymentsMoney").val(),
                                                insurancePaymentsTime:$("#insurancePaymentsTime").val(),
                                                kpi:$("#kpi").val(),
                                                ourMoney:$("#ourMoney").val(),
                                                otherMoney:$("#otherMoney").val(),
                                                otherInjuries:$("#otherInjuries").val(),
                                                InsuranceDeductibleAmount:$("#InsuranceDeductibleAmount").val(),
                                                orderNumber:$("#orderNumber").val(),
                                                otherInjuries:$("#otherInjuries").val(),
                                                otherMoney:$("#otherMoney").val(),
                                                ourVehicleDamageDescription:$("#ourVehicleDamageDescription").val(),
                                                ourVehiclesDamage:$("#ourVehiclesDamage").val(),
                                                peopleInjure:$("#peopleInjure").val(),
                                                peopleMoney:$("#peopleMoney").val(),
                                                taskType:$("#taskType").val(),
                                                techniciansPunishmentMonkey:$("#techniciansPunishmentMonkey").val(),
                                                vehicleModels:$("#vehicleModels").val(),
                                                techniciansRatio:$("#techniciansRatio").val(),
                                                techniciansMonkey:$("#techniciansMonkey").val(),
                                                settlementMonkey:$("#settlementMonkey").val(),



                                            },
                                            Api.h_handling_accidents.NewCarHanding, "POST", function (_data2) {
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
    $(".lookInfo").click(function(){
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }
        var id = parseInt(data[0].id);
        $.get(Api.ex_haccident_application.info+"/"+id,{},function(_data){
            switch(_data.code){
                case 0:
                    switch(_data.info.details.natureAccident){
                        case 1:layer.open({
                            type: 1,
                            title:"完善表格",
                            shadeClose: true,
                            skin:"layer-box",
                            content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                            success:function(_layero, _index){
                                $("#jsxm").val(_data.info.details.name);
                                $("#cph").val(_data.info.details.licensePlate);
                                $("#endTime").val("暂无");
                                $("#sgfsdd").val(_data.info.details.place);
                                $("#customerUnit").val(_data.info.details.customerUnit);

                                var jsonObj = JSON.parse(_data.info.details.image);
                                console.log(jsonObj.length);
                                for(var j = 0;j<jsonObj.length;j++){
                                    var $clone = $('<div class="thisImgBox"><img src="'+jsonObj[j]+'"></div>');
                                    $clone.click(function(){
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
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车检查</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success:function(_layero, _index){
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for(var j = 0;j<jsonObj.length;j++){
                                        var $clone = $('<div class="thisImgBox"><img src="'+jsonObj[j]+'"></div>');
                                        $clone.click(function(){
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
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success:function(_layero, _index){
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for(var j = 0;j<jsonObj.length;j++){
                                        var $clone = $('<div class="thisImgBox"><img src="'+jsonObj[j]+'"></div>');
                                        $clone.click(function(){
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
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success:function(_layero, _index){
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj.length);
                                    for(var j = 0;j<jsonObj.length;j++){
                                        var $clone = $('<div class="thisImgBox"><img src="'+jsonObj[j]+'"></div>');
                                        $clone.click(function(){
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
            console.log(typeof parseInt(data[0].id));
            console.log(parseInt(data[0].natureAccident));
            console.log(data);
            Tool.ajaxHelper.ajaxSubmit({
                    id: parseInt(data[0].id),
                    state:2,
                    nature: getNatureAccidentIndex(data[0].natureAccident)
                },
                Api.ex_haccident_application.updatestate, "GET", function () {
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
                    startH:2,
                    userId:userId
                },
                Api.ex_haccident_application.update, "POST", function () {
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

        console.log((data[0].start =='3'&&data[0].startH!="2"));
        if(!((data[0].start =='3'&&data[0].startH!="2")||data[0].start =='4')){
            tips("选择的状态错误");
            return false;
        }

        var info = {id: data[0].id, start: 5, confirmUserId: userId};
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();
            tool.ajaxHelper.ajaxSubmit({
                id: id,
                start: 5,
                userId: userId
            }, Api.ex_haccident_application.update, "POST", function (_data) {
                switch (_data.code) {
                    case 0:
                        tips("操作成功");
                        list.bootstrapTableTemplateQuery({});
                        break;
                }
            });
        })

    });

    //查看表单详情
    $(".lookForm").click(function(){
        var data = list.bootstrapTableTemplateSelect("id");
        if (!data) {
            return false;
        }
        if (data.length > 1) {
            tips("请单选");
            return false;
        }

        var id = parseInt(data[0].id);

        $.get(Api.ex_haccident_application.info+"/"+id,{},function(_data){
            switch(_data.code){
                case 0:
                    console.log(_data);
                    switch(_data.info.details.natureAccident){
                        case 1:layer.open({
                            type: 1,
                            title:"完善表格",
                            shadeClose: true,
                            skin:"layer-box",
                            content: '<div class="form"><div class="title-lg">装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney" class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账金额</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-3"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                            success:function(_layero, _index){
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

                                $(".form input,.form textarea,.form select").attr("readonly","readonly");

                            }
                        });
                            break;
                        case 2:
                            layer.open({
                                type: 1,
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车检查</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success:function(_layero, _index){
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
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription   );
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    $("#techniciansRatio").val(_data.info.affiliated.techniciansRatio);
                                    $("#techniciansMonkey").val(_data.info.affiliated.techniciansMonkey);
                                    $("#settlementMonkey").val(_data.info.affiliated.settlementMonkey);
                                    $(".form input,.form textarea,.form select").attr("readonly","readonly");
                                }
                            });
                            break;
                        case 3:
                            layer.open({
                                type: 1,
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"/></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"></textarea></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success:function(_layero, _index){
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
                                    $(".form input,.form textarea,.form select").attr("readonly","readonly");
                                }
                            });
                            break;
                        case 4:
                            layer.open({
                                type: 1,
                                title:"完善表格",
                                shadeClose: true,
                                skin:"layer-box",
                                content: '<div class="form"><div class="title-lg">新车装卸</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
                                success:function(_layero, _index){
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
                                    $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription   );
                                    $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    $("#taskType").val(_data.info.affiliated.taskType);
                                    $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    $("#techniciansRatio").val(_data.info.affiliated.techniciansRatio);
                                    $("#techniciansMonkey").val(_data.info.affiliated.techniciansMonkey);
                                    $("#settlementMonkey").val(_data.info.affiliated.settlementMonkey);

                                    $(".form input,.form textarea,.form select").attr("readonly","readonly");

                                }
                            });
                            break;
                    }

                    break;
            }
        });


    });

});


function getNatureAccidentIndex(_text){
    var index;
    switch(_text){
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