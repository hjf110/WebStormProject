var list = null;
var vueSelf = null;
var controller = "";
var accidentId = null;
var accidentCheck = 1;
var accidentFinanceHoldCar = 1;
var defaultState = 1;

var isFaultDriverHoldCar = false;
var isFaultManageHoldCar = false;
var isFaultDispatchHoldCar = false;
var isAccidentObservationHoldCar = false;
var isAccidentFinanceHoldCar = false;
var userId = userInfo.structureUserId;

var vueObj;

isFaultDriverHoldCar = userRoleList.indexOf(config.faultDriverHoldCar) > -1;
isFaultManageHoldCar = userRoleList.indexOf(config.faultManageHoldCar) > -1;
isFaultDispatchHoldCar = userRoleList.indexOf(config.faultDispatchHoldCar) > -1;
isAccidentObservationHoldCar = userRoleList.indexOf(config.accidentObservationHoldCar) > -1;
isAccidentFinanceHoldCar = userRoleList.indexOf(config.accidentFinanceHoldCar) > -1;

var allFilled = false;  // 没有全部填写

console.log(config);

console.log(isFaultDriverHoldCar);
console.log(isFaultManageHoldCar);
console.log(isFaultDispatchHoldCar);
console.log(isAccidentObservationHoldCar);
console.log(isAccidentFinanceHoldCar);
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
            accidentFinanceHoldCar: accidentFinanceHoldCar,
            nowState: defaultState,
            sheetData: [],
            isFaultDriverHoldCar: isFaultDriverHoldCar,
            isFaultManageHoldCar: isFaultManageHoldCar,
            isFaultDispatchHoldCar: isFaultDispatchHoldCar,
            isAccidentObservationHoldCar: isAccidentObservationHoldCar,
            isAccidentFinanceHoldCar: isAccidentFinanceHoldCar,
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
        url: Api.old_car_accident.list,
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
            //     sortable: false
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
                    return "旧车装卸事故";
                    // if (value == 1) {
                    //     return "装卸事故";
                    // } else if (value == 2) {
                    //     return "新车检查";
                    // } else if (value == 3) {
                    //     return "交通事故";
                    // } else if (value == 4) {
                    //     return "新车装卸";
                    // }
                }
            },
            {
                label: '事故状态',
                name: 'start',
                sortable: false,
                formatter: function (value, options, row) {
                    switch (value) {
                        case 1:
                            return '<span class="label label-danger">未处理</span>';
                            break;
                        case 2:
                            return '<span class="label label-danger">任务取消</span>';
                            break;
                        // case 3:
                        //     return '<span class="label label-danger">已调度</span>';
                        //     break;
                        case 4:
                            return '<span class="label label-danger">任务继续</span>';
                            break;
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
            }
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

    //已调度
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

            if (parseInt(data[0].start) == 2) {
                console.log(userInfo);
                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        dispatchName: userInfo.suName,
                        dispatchId: userInfo.structureUserId,
                        dispatchTime: Math.ceil(new Date().getTime() / 1000)
                    },
                    Api.old_car_accident.update, "POST", function () {
                        tips("确认成功");
                        list.bootstrapTableTemplateQuery({});
                    });
            } else {
                inquiry("事故状态为任务取消时才需确认", function () {
                });
            }

            // if (data[0].start == '2') {
            //     Tool.ajaxHelper.ajaxSubmit({
            //             id: data[0].id,
            //             start: 3,
            //         },
            //         Api.old_car_accident.update, "POST", function () {
            //             tips("调度成功");
            //             list.bootstrapTableTemplateQuery({});
            //         }
            //     );
            //     console.log("调度完成");
            // }
        })

    });

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

        $.get(Api.old_car_accident.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    console.log(userInfo);
                    switch (_data.info.details.natureAccident) {
                        case 1:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="jcForm"class="form"><div id="printManager"><div class="title-lg">旧车装卸事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">自车牌照</div><input id="cph"type="text"class="form-control width-1"placeholder=""v-bind:value="zcpz"v-model="zcpz"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="sgfssj"></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly v-bind:value="sgfsdd"></textarea></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"readonly v-bind:value="khdw"></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""v-bind:value="ddbh"v-model="ddbh"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"v-bind:value="rwlx"v-model="rwlx"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"v-bind:value="khcllx"v-model="khcllx"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="khclssqk"v-model="khclssqk"></textarea></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="wfclssqk"v-model="wfclssqk"></textarea></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"v-bind:value="sfss"v-model="sfss"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><div class="partBox damageSituation trRemove"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"v-bind:value="khclssms"v-model="khclssms"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""v-bind:value="ssje1"v-model="ssje1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"v-bind:value="wfclssms"v-model="wfclssms"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""v-bind:value="ssje3"v-model="ssje3"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"v-bind:value="ryssqk"v-model="ryssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""v-bind:value="ssje4"v-model="ssje4"></div></div></div></div><div class="partBox compensationSituation trRemove"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"v-bind:value="clry"v-model="clry"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""v-bind:value="kpi"v-model="kpi"></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""v-bind:value="jscfje"v-model="jscfje"></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""v-bind:value="khcldsje"v-model="khcldsje"></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""v-bind:value="sjpfje"v-model="sjpfje"></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""v-bind:value="bxmpje"v-model="bxmpje"></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""v-bind:value="zjfy"v-model="zjfy"></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账日期</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""v-bind:value="bxpfdzje"v-model="bxpfdzje"readonly></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""v-bind:value="bxpfje"v-model="bxpfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担比例</div><input id="jscdbl"type="text"class="form-control width-1"placeholder=""v-bind:value="jscdbl"v-model="jscdbl"></div><div class="tdBox-2"><div class="title-sm title-right">技师承担金额</div><input type="text"id="jscdje"class="form-control width-1"placeholder=""v-bind:value="jscdje"v-model="jscdje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""v-bind:value="gsssje"v-model="gsssje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">与客户沟通经过描述</div><textarea id="ykhgtjgms"name="deblock_udid"rows="5"class="form-control ver-top width-2"v-bind:value="ykhgtjgms"v-model="ykhgtjgms"></textarea></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div><div class="followUpEdit trfollow"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"id="jdms"class="form-control width-1"placeholder=""v-bind:value="jdms"v-model="jdms"></div><button id="followUp"type="button"class="btn btn-primary"v-on:click="followUpBtn">跟进</button><div class="tdBox-2"><input type="text"id="gjsj"class="form-control width-1"placeholder=""v-bind:value="gjsj"v-model="gjsj"style="display:none"></div></div></div></div></div><div class="partBox accidentAnalysis trRemove"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"v-bind:value="sgfx"v-model="sgfx"></textarea></div></div></div></div></div><div class="partBox processingPersonnel"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">车管姓名</div><input id="cgxm"type="text"class="form-control width-1"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div><div class="tdBox-2"><div class="title-sm title-right">财务姓名</div><input id="cwxm"type="text"class="form-control width-1"placeholder=""v-bind:value="cwxm"v-model="cwxm"readonly></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div id="printFinance"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">支付方式</div><select class="form-control width-1"id="payType"v-bind:value="zffs"v-model="zffs"><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"v-bind:value="zfje"v-model="zfje"></div></div><div class="trBox transferInfo"v-show="zffs==2||zffs==\'2\'"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"v-bind:value="kh"v-model="kh"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"v-bind:value="khh"v-model="khh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"v-bind:value="blry"v-model="blry"><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"v-bind:value="nbryxm"v-model="nbryxm"placeholder="姓名"v-if="blry==2||blry==\'2\'"><button id="idcardImg"type="button"class="btn btn-primary trRemove"v-else-if="blry==1||blry==\'1\'"v-on:click="takeIdPhoto">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary trRemove"v-on:click="takePhotos">拍照</button></div></div><div class="trBox"><div class="imgField2"></div></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"v-bind:value="cwbz"v-model="cwbz"></textarea></div></div></div></div><div class="buttonBox trRemove"><button id="confirmPayment"class="button1 btnBlue"v-show="isAccidentFinanceHoldCar"v-on:click="completePaymentClick">支付完成</button><button id="completeCollection"class="button1 btnBlue"v-on:click="completeCollectionClick"style="display:none;">收款完成</button><button id="printExpenseAccountFinance"class="button1 btnBlue"v-on:click="printFinanceClick"v-show="isAccidentFinanceHoldCar">打印</button><button id="printExpenseAccountManager"class="button1 btnBlue"v-on:click="printManagerClick"style="display:none;">打印</button><button id="saveBtn"class="button1"v-on:click="saveBtn">保存并关闭</button></div></div>',
                                success: function (_layero, _index) {

                                    if (!isAccidentFinanceHoldCar) {

                                        $(".financialPayment input,.financialPayment textarea").attr("readonly", "readonly");
                                        $(".financialPayment select").attr("disabled", "disabled");
                                        $("#uploadImg,#idcardImg").css("display", "none");

                                    } else {
                                        $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea").attr("readonly", "readonly");
                                        $(".basicInfo select,.damageSituation select,.compensationSituation select").attr("disabled", "disabled");
                                    }

                                    var jcForm = new Vue({
                                        el: "#jcForm",
                                        data: {
                                            bridgeFinance: true,
                                            jsxm: _data.info.details.name,
                                            zcpz: _data.info.details.licensePlate,
                                            sgfssj: tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"),
                                            sgfsdd: _data.info.details.place,
                                            khdw: _data.info.details.customerUnit,

                                            ddbh: _data.info.affiliated.orderNumber,
                                            rwlx: _data.info.affiliated.taskType,
                                            khcllx: _data.info.affiliated.newOld,
                                            khclssqk: _data.info.affiliated.customerVehiclesDamage,
                                            wfclssqk: _data.info.affiliated.ourVehiclesDamage,
                                            sfss: _data.info.affiliated.injured,
                                            khclssms: _data.info.affiliated.customerVehicleDamageDescription,
                                            ssje1: _data.info.affiliated.customerMoney,
                                            wfclssms: _data.info.affiliated.ourVehicleDamageDescription,
                                            ssje2: _data.info.affiliated.ourMoney,
                                            qtss: _data.info.affiliated.otherInjuries,
                                            ssje3: _data.info.affiliated.otherMoney,
                                            ryssqk: _data.info.affiliated.peopleInjure,
                                            ssje4: _data.info.affiliated.peopleMoney,
                                            clry: _data.info.affiliated.companyTechnician,
                                            kpi: _data.info.affiliated.kpi,
                                            jscfje: _data.info.affiliated.techniciansPunishmentMonkey,
                                            khcldsje: _data.info.affiliated.customerVehiclesFixedLoss,
                                            sjpfje: _data.info.affiliated.actualAmountPaid,
                                            bxmpje: _data.info.affiliated.insuranceDeductibleAmount,
                                            zjfy: _data.info.affiliated.depreciationExpenses,
                                            bxpfdzje: _data.info.affiliated.insurancePaymentsTime,
                                            bxpfje: _data.info.affiliated.insurancePaymentsMoney,
                                            gsssje: _data.info.affiliated.companyLostMonkey,
                                            sgfx: _data.info.affiliated.accidentAnalysisImprovementMeasures,
                                            jscdje: _data.info.affiliated.jscdje,
                                            jscdbl: _data.info.affiliated.jscdbl,
                                            ykhgtjgms: _data.info.affiliated.ykhgtjgms,

                                            cgxm: _data.info.affiliated.vehicleSubName,  //  车管姓名
                                            // ywy:_data.info.details.salesmanName,
                                            zffs: _data.info.affiliated.payType,  //  支付方式
                                            kh: _data.info.affiliated.bankcardid,  //  卡号
                                            khh: _data.info.affiliated.bankname, //  开户行
                                            zfje: _data.info.affiliated.payment,  //  支付金额
                                            blry: _data.info.affiliated.acceptingOfficer,  //  办理人员

                                            jdms: "",  //  进度描述
                                            followList: _data.info.affiliated.jdmsArrayStr ? JSON.parse(_data.info.affiliated.jdmsArrayStr) : [],
                                            skje: _data.info.affiliated.skje,    // 收款金额
                                            nbryxm: _data.info.affiliated.insider,  //  内部人员姓名
                                            cwxm: _data.info.affiliated.financialname,  //  财务姓名
                                            cwbz: _data.info.affiliated.financialremarks,  //  业务员备注

                                            sfzz: _data.info.affiliated.idphoto,  //身份证照
                                            bxdzp: _data.info.affiliated.expensephoto ? JSON.parse(_data.info.affiliated.expensephoto) : ""  //  报销单照片

                                        },
                                        created: function () {

                                        },
                                        methods: {
                                            completePaymentClick: function () {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.old_car_accident.confirmPayment, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            completeCollectionClick: function () {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.old_car_accident.collectionCompleted, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            printFinanceClick: function () {
                                                console.log("财务打印开始");

                                                //获取值
                                                var payType = $("#payType").find("option:selected").text();
                                                var payment = $("#payment").val();
                                                var bankCardId = $("#bankCardId").val();
                                                var bankName = $("#bankName").val();
                                                var acceptingOfficer = $("#acceptingOfficer").find("option:selected").text();
                                                var insider = $("#insider").val();
                                                var amountCollected = $("#amountCollected").val();
                                                var financialRemarks = $("#financialRemarks").val();
                                                var cwxm = $("#cwxm").val();
                                                var cgxm = $("#cgxm").val();
                                                var jsxm = $("#jsxm").val();//1

                                                //将值存入cookie
                                                $.cookie("payType", payType, {path: '/'});
                                                $.cookie("payment", payment, {path: '/'});
                                                $.cookie("bankCardId", bankCardId, {path: '/'});
                                                $.cookie("bankName", bankName, {path: '/'});
                                                $.cookie("acceptingOfficer", acceptingOfficer, {path: '/'});
                                                $.cookie("insider", insider, {path: '/'});
                                                $.cookie("amountCollected", amountCollected, {path: '/'});
                                                $.cookie("financialRemarks", financialRemarks, {path: '/'});
                                                $.cookie("cwxm", cwxm, {path: '/'});
                                                $.cookie("cgxm", cgxm, {path: '/'});
                                                $.cookie("jsxm", jsxm, {path: '/'});



                                                $.cookie("xmname", "旧车装卸事故报销单", {path: '/'});
                                                //跳转到一个新的页面
                                                window.open("old_car_accident_cwdy.html");

                                                // var loading = tool.loading();
                                                // var $printFinance = $("#jcForm");
                                                // console.log($printFinance);
                                                // $printFinance.addClass("bgText");
                                                // $printFinance.find("div.trRemove").hide();
                                                //
                                                // html2canvas($printFinance[0]).then(function(canvas) {
                                                //     canvas.toBlob(function(blob) {
                                                //         saveAs(blob, "财务表单.png");
                                                //     });
                                                //     layer.close(loading);
                                                //     tips("导出成功");
                                                //     $printFinance.find("div.trRemove").show();
                                                //     $printFinance.removeClass("bgText");
                                                console.log("打印结束");
                                                // });
                                            },
                                            printManagerClick: function () {
                                                console.log("车管打印开始");


                                                //获取值
                                               // var payType = $("#payType").find("option:selected").text();
                                                var jsxm = $("#jsxm").val();//1
                                                var cph = $("#cph").val();//2
                                                var endTime = $("#endTime").val();//3
                                                var sgfsdd = $("#sgfsdd").val();//4
                                                var customerUnit = $("#customerUnit").val();//5
                                                var orderNumber = $("#orderNumber").val();//6
                                                var taskType = $("#taskType").find("option:selected").text();//7
                                                var newOld = $("#newOld").find("option:selected").text();//8
                                                var customerVehiclesDamage = $("#customerVehiclesDamage").val();//9
                                                var ourVehiclesDamage = $("#ourVehiclesDamage").val();//10
                                                var injured = $("#injured").find("option:selected").text();//11
                                                var customerVehicleDamageDescription = $("#customerVehicleDamageDescription").val();//12
                                                var customerMoney = $("#customerMoney").val();//13
                                                var ourVehicleDamageDescription = $("#ourVehicleDamageDescription").val();//14
                                                var ourMoney = $("#ourMoney").val();//15
                                                var otherInjuries = $("#otherInjuries").val();//16
                                                var otherMoney = $("#otherMoney").val();//17
                                                var peopleInjure = $("#peopleInjure").val();//18
                                                var peopleMoney = $("#peopleMoney").val();//19
                                                var companyTechnician = $("#companyTechnician").find("option:selected").text();//20
                                                var KPI = $("#KPI").val();//21
                                                var techniciansPunishmentMonkey = $("#techniciansPunishmentMonkey").val();//22
                                                var customerVehiclesFixedLoss = $("#customerVehiclesFixedLoss").val();//23
                                                var actualAmountPaid = $("#actualAmountPaid").val();//24
                                                var insuranceDeductibleAmount = $("#insuranceDeductibleAmount").val();//25

                                                var depreciationExpenses = $("#depreciationExpenses").val();//26
                                                var insurancePaymentsTime = $("#insurancePaymentsTime").val();//27
                                                var insurancePaymentsMoney = $("#insurancePaymentsMoney").val();//28
                                                var jscdbl = $("#jscdbl").val();//29

                                                var jscdje = $("#jscdje").val();//30
                                                var companyLostMonkey = $("#companyLostMonkey").val();//31
                                                var ykhgtjgms = $("#ykhgtjgms").val();//32
                                                var accidentAnalysisImprovementMeasures = $("#accidentAnalysisImprovementMeasures").val();//33
                                                var cgxm = $("#cgxm").val();//34
                                                var cwxm = $("#cwxm").val();//35


                                                $.cookie("jsxm", jsxm, {path: '/'});
                                                $.cookie("cph", cph, {path: '/'});
                                                $.cookie("endTime", endTime, {path: '/'});
                                                $.cookie("sgfsdd", sgfsdd, {path: '/'});
                                                $.cookie("customerUnit", customerUnit, {path: '/'});
                                                $.cookie("orderNumber", orderNumber, {path: '/'});
                                                $.cookie("taskType", taskType, {path: '/'});
                                                $.cookie("newOld", newOld, {path: '/'});
                                                $.cookie("customerVehiclesDamage", customerVehiclesDamage, {path: '/'});
                                                $.cookie("ourVehiclesDamage", ourVehiclesDamage, {path: '/'});
                                                $.cookie("injured", injured, {path: '/'});
                                                $.cookie("customerVehicleDamageDescription", customerVehicleDamageDescription, {path: '/'});
                                                $.cookie("customerMoney", customerMoney, {path: '/'});
                                                $.cookie("ourVehicleDamageDescription", ourVehicleDamageDescription, {path: '/'});
                                                $.cookie("ourMoney", ourMoney, {path: '/'});
                                                $.cookie("otherInjuries", otherInjuries, {path: '/'});
                                                $.cookie("otherMoney", otherMoney, {path: '/'});
                                                $.cookie("peopleInjure", peopleInjure, {path: '/'});
                                                $.cookie("peopleMoney", peopleMoney, {path: '/'});
                                                $.cookie("companyTechnician", companyTechnician, {path: '/'});
                                                $.cookie("KPI", KPI, {path: '/'});
                                                $.cookie("techniciansPunishmentMonkey", techniciansPunishmentMonkey, {path: '/'});
                                                $.cookie("customerVehiclesFixedLoss", customerVehiclesFixedLoss, {path: '/'});
                                                $.cookie("actualAmountPaid", actualAmountPaid, {path: '/'});
                                                $.cookie("insuranceDeductibleAmount", insuranceDeductibleAmount, {path: '/'});
                                                $.cookie("depreciationExpenses", depreciationExpenses, {path: '/'});
                                                $.cookie("insurancePaymentsTime", insurancePaymentsTime, {path: '/'});
                                                $.cookie("insurancePaymentsMoney", insurancePaymentsMoney, {path: '/'});
                                                $.cookie("jscdbl", jscdbl, {path: '/'});
                                                $.cookie("jscdje", jscdje, {path: '/'});
                                                $.cookie("companyLostMonkey", companyLostMonkey, {path: '/'});
                                                $.cookie("ykhgtjgms", ykhgtjgms, {path: '/'});
                                                $.cookie("accidentAnalysisImprovementMeasures", accidentAnalysisImprovementMeasures, {path: '/'});
                                                $.cookie("cgxm", cgxm, {path: '/'});
                                                $.cookie("cwxm", cwxm, {path: '/'});

                                                window.open("old_car_accident_cgdy.html");

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
                                                //});
                                            },
                                            timeClick: function (_event) {
                                                console.log(_event.target);
                                            },
                                            saveBtn: function (_event) {
                                                var _this = this;

                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id,
                                                        licensePlate: _this.zcpz
                                                    },
                                                    Api.old_car_accident.update, "POST", function (_data2) {
                                                        // list.bootstrapTableTemplateQuery({});
                                                    }
                                                );
                                                console.log(_data.info.affiliated.id);
                                                console.log(_data.info.affiliated);
                                                console.log($(".imgField2>img").attr("src"));
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.affiliated.id,
                                                        name: _data.info.details.name,
                                                        licensePlateNumber: _data.info.details.licensePlate,
                                                        place: _data.info.details.place,
                                                        customerUnit: _data.info.details.customerUnit,

                                                        accidentAnalysisImprovementMeasures: _this.sgfx,        //事故分析及改进措施
                                                        // accidentApplicationId: $("#accidentApplicationId").val(),
                                                        actualAmountPaid: _this.sjpfje,     //实际赔付金额
                                                        companyLostMonkey: _this.gsssje,       //公司损失金额
                                                        companyTechnician: _this.clry,       //处理人员
                                                        customerMoney: _this.ssje1,       //损伤金额1
                                                        customerVehicleDamageDescription: _this.khclssms,     //客户车辆损伤描述
                                                        customerVehiclesDamage: _this.khclssqk,     //客户车辆受损情况
                                                        customerVehiclesFixedLoss: _this.khcldsje,       //客户车辆定损金额
                                                        depreciationExpenses: _this.zjfy,     //折旧费用
                                                        injured: _this.sfss,       //是否有人员受伤
                                                        insuranceDeductibleAmount: _this.bxmpje,       //保险免赔金额
                                                        insurancePaymentsMoney: _this.bxpfje,     //保险赔付金额
                                                        insurancePaymentsTime: _this.bxpfdzje,       //保险赔付到账日期
                                                        kpi: _this.kpi,       //技师KPI扣分
                                                        newOld: _this.khcllx,     //客户车辆车型
                                                        orderNumber: _this.ddbh,       //订单编号
                                                        otherInjuries: _this.qtss,       //其他损伤
                                                        otherMoney: _this.ssje3, //损伤金额
                                                        ourMoney: _this.ssje2,     //损伤金额
                                                        ourVehicleDamageDescription: _this.wfclssms,       //我方车辆受损描述
                                                        ourVehiclesDamage: _this.wfclssqk,       //我方车辆受损情况
                                                        peopleInjure: _this.ryssqk,     //人员受伤情况
                                                        peopleMoney: _this.ssje4,       //损伤金额
                                                        taskType: _this.rwlx,     //任务类型
                                                        techniciansPunishmentMonkey: _this.jscfje,   //技师处罚金额
                                                        jscdje: _this.jscdje,        //技师承担金额
                                                        jscdbl: _this.jscdbl,        //技师承担比例
                                                        ykhgtjgms: _this.ykhgtjgms,  //与客户沟通经过描述

                                                        progressdescription: _this.jdms,  //  进度描述
                                                        followtime: _this.gjsj,  //  跟进时间
                                                        jdmsArrayStr: JSON.stringify(_this.followList),

                                                        vehicleSubName: isFaultManageHoldCar ? userInfo.suName : _this.vehicleSubName,  //车管
                                                        financialname: isAccidentFinanceHoldCar ? userInfo.suName : _this.financialname,  //  财务姓名
                                                        insider: _this.nbryxm,  //  内部人员姓名
                                                        payType: _this.zffs,  //  支付方式
                                                        bankcardid: _this.kh,  //  卡号
                                                        bankname: _this.khh, //  开户行
                                                        payment: _this.zfje,  //  支付金额
                                                        acceptingOfficer: _this.blry,  //  办理人员
                                                        financialremarks: _this.cwbz, //  业务员备注
                                                        idphoto: typeof _this.sfzz == "string" ? _this.sfzz : JSON.stringify(_this.sfzz),   //  身份证照片
                                                        expensephoto: JSON.stringify(_this.bxdzp), //  报销单照片
                                                        skje: _this.skje    // 收款金额


                                                        // vehicleModels: $("#vehicleModels").val(),       //
                                                        // time: $("#time").val(),

                                                    },
                                                    Api.old_car_handing_report.update, "POST", function (_data2) {
                                                        console.log(_data.info.affiliated.jdmsArrayStr ? JSON.parse(_data.info.affiliated.jdmsArrayStr) : []);
                                                        layer.closeAll();
                                                        tips("操作成功");
                                                        list.bootstrapTableTemplateQuery({});
                                                    })
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
                                            takePhotos: function (_event) {
                                                var _this = this;

                                                var info = {};
                                                var options = {
                                                    title: "拍照",
                                                    le: "./photo.html",
                                                    size: ["900px", "700px"],
                                                    buttonCallback: [function (layerDialog) {
                                                        console.log("照片上传");
                                                        var financeMark = [];
                                                        var imgObj = layerDialog.financeImage.find("img");
                                                        $.each(imgObj, function (i, e) {
                                                            financeMark.push($(e).attr("src"));
                                                        });
                                                        if (financeMark.length == 0) {
                                                            tips("图片至少一张");
                                                            return false;
                                                        }
                                                        info["image"] = JSON.stringify(financeMark);
                                                        console.log(info);  //base64图片路径
                                                        console.log(imgObj);
                                                        Tool.ajaxHelper.ajaxSubmit(info,
                                                            Api.common.saveImage, "POST", function (_e) {
                                                                console.log("出现照片内容");
                                                                console.log(_e.data);  //  调接口后图片路径
                                                                _this.bxdzp = _e.data;
                                                                $(".imgField2>*").remove();
                                                                console.log(typeof _e.data);
                                                                console.log(_e.data.length);
                                                                for (var j = 0; j < _e.data.length; j++) {
                                                                    console.log(_e.data[j]);
                                                                    var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" src="' + baseURL + _e.data[j] + '"/>');
                                                                    $(".imgField2").append($item);

                                                                }

                                                                console.log($(".imgField2>img"));
                                                                $(".imgField2>img").click(function () {
                                                                    console.log("-----");
                                                                    window.open($(this).attr("src"), "_blank");
                                                                });

                                                            }
                                                        );

                                                        // console.log(layerDialog);
                                                        layer.close(layerDialog.index);
                                                        //  alert(layerDialog.financeImage.html());
                                                        // // alert(layerDialog.financeImage.find("img"));
                                                        // layer.close(layerDialog.index);
                                                    }],
                                                    end: function () {
                                                        // axCam_Ocx.CAM_Close();
                                                        list.bootstrapTableTemplateQuery({});
                                                    }
                                                };
                                                $.layerDialogIframe(options);
                                            },
                                            takeIdPhoto: function () {
                                                var _this = this;

                                                var info = {};
                                                var options = {
                                                    title: "拍照",
                                                    le: "./photo.html",
                                                    size: ["900px", "700px"],
                                                    buttonCallback: [function (layerDialog) {
                                                        console.log("照片上传");
                                                        var financeMark = [];
                                                        var imgObj = layerDialog.financeImage.find("img");
                                                        $.each(imgObj, function (i, e) {
                                                            financeMark.push($(e).attr("src"));
                                                        });
                                                        if (financeMark.length == 0) {
                                                            tips("图片至少一张");
                                                            return false;
                                                        }
                                                        info["image"] = JSON.stringify(financeMark);
                                                        console.log(info);  //base64图片路径

                                                        Tool.ajaxHelper.ajaxSubmit(info,
                                                            Api.common.saveImage, "POST", function (_e) {
                                                                console.log("出现照片内容");
                                                                console.log(_e.data);  //  调接口后图片路径
                                                                _this.sfzz = _e.data;

                                                                $(".imgField1>img").remove();

                                                                for (var j = 0; j < _e.data.length; j++) {
                                                                    console.log(_e.data[j]);
                                                                    var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" src="' + baseURL + _e.data[j] + '"/>');
                                                                    $(".imgField1").append($item);

                                                                }
                                                                $(".imgField1>img").click(function () {
                                                                    window.open($(this).attr("src"), "_blank");
                                                                });

                                                            }
                                                        );

                                                        // console.log(layerDialog);
                                                        layer.close(layerDialog.index);
                                                        //  alert(layerDialog.financeImage.html());
                                                        // // alert(layerDialog.financeImage.find("img"));
                                                        // layer.close(layerDialog.index);


                                                    }],
                                                    end: function () {
                                                        // axCam_Ocx.CAM_Close();
                                                        list.bootstrapTableTemplateQuery({});
                                                    }
                                                };
                                                $.layerDialogIframe(options);
                                            }
                                        }

                                    });

                                    //财务收款完成按钮
                                    $(".financialPayment input, .financialPayment textarea, .financialPayment select").on("input", function () {
                                        if (isAccidentFinanceHoldCar && ($("#amountCollected").val() > 0) && ($("#payment").val() == 0)) {
                                            console.log("按钮出现");
                                            $("#completeCollection").css("display", "inline-block");
                                        } else {
                                            console.log("按钮消失");
                                            $("#completeCollection").css("display", "none");
                                        }
                                    });
                                    if (isAccidentFinanceHoldCar && ($("#amountCollected").val() > 0) && ($("#payment").val() == 0)) {
                                        console.log("按钮出现");
                                        $("#completeCollection").css("display", "inline-block");
                                    } else {
                                        console.log("按钮消失");
                                        $("#completeCollection").css("display", "none");
                                    }
                                    ;

                                    //车管全部填写完后，出现打印按钮
                                    $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea,.basicInfo select,.damageSituation select,.compensationSituation select").on("input", function () {
                                        if (isFaultManageHoldCar && isNotEmpty($("#orderNumber").val()) && isNotEmpty($("#taskType").val()) && isNotEmpty($("#newOld").val()) && isNotEmpty($("#customerVehiclesDamage").val()) && isNotEmpty($("#ourVehiclesDamage").val()) && isNotEmpty($("#injured").val()) && isNotEmpty($("#customerVehicleDamageDescription").val()) && isNotEmpty($("#customerMoney").val()) && isNotEmpty($("#ourVehicleDamageDescription").val()) && isNotEmpty($("#ourMoney").val()) && isNotEmpty($("#otherInjuries").val()) && isNotEmpty($("#otherMoney").val()) && isNotEmpty($("#peopleInjure").val()) && isNotEmpty($("#peopleMoney").val()) && isNotEmpty($("#companyTechnician").val()) && isNotEmpty($("#KPI").val()) && isNotEmpty($("#techniciansPunishmentMonkey").val()) && isNotEmpty($("#customerVehiclesFixedLoss").val()) && isNotEmpty($("#actualAmountPaid").val()) && isNotEmpty($("#insuranceDeductibleAmount").val()) && isNotEmpty($("#depreciationExpenses").val()) && isNotEmpty($("#insurancePaymentsTime").val()) && isNotEmpty($("#insurancePaymentsMoney").val()) && isNotEmpty($("#jscdbl").val()) && isNotEmpty($("#jscdje").val()) && isNotEmpty($("#companyLostMonkey").val()) && isNotEmpty($("#ykhgtjgms").val()) && isNotEmpty($("#accidentAnalysisImprovementMeasures").val())) {
                                            $("#printExpenseAccountManager").css("display", "inline-block");
                                        } else {
                                            $("#printExpenseAccountManager").css("display", "none");
                                        }
                                    });
                                    if (isFaultManageHoldCar && isNotEmpty($("#orderNumber").val()) && isNotEmpty($("#taskType").val()) && isNotEmpty($("#newOld").val()) && isNotEmpty($("#customerVehiclesDamage").val()) && isNotEmpty($("#ourVehiclesDamage").val()) && isNotEmpty($("#injured").val()) && isNotEmpty($("#customerVehicleDamageDescription").val()) && isNotEmpty($("#customerMoney").val()) && isNotEmpty($("#ourVehicleDamageDescription").val()) && isNotEmpty($("#ourMoney").val()) && isNotEmpty($("#otherInjuries").val()) && isNotEmpty($("#otherMoney").val()) && isNotEmpty($("#peopleInjure").val()) && isNotEmpty($("#peopleMoney").val()) && isNotEmpty($("#companyTechnician").val()) && isNotEmpty($("#KPI").val()) && isNotEmpty($("#techniciansPunishmentMonkey").val()) && isNotEmpty($("#customerVehiclesFixedLoss").val()) && isNotEmpty($("#actualAmountPaid").val()) && isNotEmpty($("#insuranceDeductibleAmount").val()) && isNotEmpty($("#depreciationExpenses").val()) && isNotEmpty($("#insurancePaymentsTime").val()) && isNotEmpty($("#insurancePaymentsMoney").val()) && isNotEmpty($("#jscdbl").val()) && isNotEmpty($("#jscdje").val()) && isNotEmpty($("#companyLostMonkey").val()) && isNotEmpty($("#ykhgtjgms").val()) && isNotEmpty($("#accidentAnalysisImprovementMeasures").val())) {
                                        $("#printExpenseAccountManager").css("display", "inline-block");
                                    } else {
                                        $("#printExpenseAccountManager").css("display", "none");
                                    }

                                    //财务打印按钮&&isNotEmpty($("#bankCardId").val())&&isNotEmpty($("#bankName").val())&&isNotEmpty($("#insider").val())
                                    // $(".financialPayment input, .financialPayment textarea, .financialPayment select").on("input", function() {
                                    //     if(isAccidentFinanceHoldCar&&isNotEmpty($("#financialPayment").val())&&isNotEmpty($("#payment").val())&&isNotEmpty($("#acceptingOfficer").val())&&isNotEmpty($("#financialRemarks").val())) {
                                    //         console.log("按钮出现");
                                    //         $("#printExpenseAccountFinance").css("display", "inline-block");
                                    //     } else {
                                    //         console.log("按钮消失");
                                    //         $("#printExpenseAccountFinance").css("display", "none");
                                    //     }
                                    // });

                                    var imgArray = _data.info.affiliated.expensephoto ? JSON.parse(_data.info.affiliated.expensephoto) : null;
                                    if (imgArray && imgArray != null) {
                                        for (var n = 0; n < imgArray.length; n++) {
                                            var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" />').attr("src", baseURL + imgArray[n]);
                                            $(".imgField2").append($item);
                                        }
                                        $(".imgField2>img").click(function () {
                                            window.open($(this).attr("src"), "_blank");
                                        });
                                    }

                                    var imgArray2 = _data.info.affiliated.idphoto ? JSON.parse(_data.info.affiliated.idphoto) : null;
                                    if (imgArray2 && imgArray2 != null) {
                                        for (var n = 0; n < imgArray2.length; n++) {
                                            var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" />').attr("src", baseURL + imgArray2[n]);
                                            $(".imgField1").append($item);
                                        }
                                        $(".imgField1>img").click(function () {
                                            window.open($(this).attr("src"), "_blank");
                                        });
                                    }

                                    $('#insurancePaymentsTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true,
                                    }).on("changeDate", function (ev) {
                                        switch (ev.currentTarget.id) {
                                            case "insurancePaymentsTime":
                                                jcForm.bxpfdzje = $(ev.currentTarget).val();
                                                break;
                                        }
                                    });

                                    // $("#jsxm").val(_data.info.details.name);
                                    // $("#cph").val(_data.info.details.licensePlate);
                                    // $("#endTime").val("暂无");
                                    // $("#sgfsdd").val(_data.info.details.place);
                                    // $("#customerUnit").val(_data.info.details.customerUnit);
                                    //
                                    // $("#accidentAnalysisImprovementMeasures").val(_data.info.affiliated.accidentAnalysisImprovementMeasures);
                                    // $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    // $("#actualAmountPaid").val(_data.info.affiliated.actualAmountPaid);
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
                                    // $("#KPI").val(_data.info.affiliated.kpi);
                                    // $("#licensePlateNumber").val(_data.info.affiliated.licensePlateNumber);
                                    // $("#newOld").val(_data.info.affiliated.newOld);
                                    // $("#orderNumber").val(_data.info.affiliated.orderNumber);
                                    // $("#otherInjuries").val(_data.info.affiliated.otherInjuries);
                                    // $("#otherMoney").val(_data.info.affiliated.otherMoney);
                                    // $("#ourMoney").val(_data.info.affiliated.ourMoney);
                                    // $("#ourVehicleDamageDescription").val(_data.info.affiliated.ourVehicleDamageDescription);
                                    // $("#ourVehiclesDamage").val(_data.info.affiliated.ourVehiclesDamage);
                                    // $("#peopleInjure").val(_data.info.affiliated.peopleInjure);
                                    // $("#peopleMoney").val(_data.info.affiliated.peopleMoney);
                                    // $("#taskType").val(_data.info.affiliated.taskType);
                                    // $("#techniciansPunishmentMonkey").val(_data.info.affiliated.techniciansPunishmentMonkey);
                                    // $("#time").val(_data.info.affiliated.time);
                                    // $("#vehicleModels").val(_data.info.affiliated.vehicleModels);
                                    //
                                    //
                                    // $('#personnelInjuryTime,#ourTime,#otherTime,#othersTime').datetimepicker({
                                    //     format: 'yyyy-mm-dd hh:ii',
                                    //     language: "zh-CN",
                                    //     todayButton: true
                                    // });
                                    //
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
                                    //             companyLostMonkey: $("#companyLostMonkey").val(),
                                    //             companyTechnician: $("#companyTechnician").val(),
                                    //             customerMoney: $("#customerMoney").val(),
                                    //             customerVehicleDamageDescription: $("#customerVehicleDamageDescription").val(),
                                    //             customerVehiclesDamage: $("#customerVehiclesDamage").val(),
                                    //             customerVehiclesFixedLoss: $("#customerVehiclesFixedLoss").val(),
                                    //             depreciationExpenses: $("#depreciationExpenses").val(),
                                    //             injured: $("#injured").val(),
                                    //             insuranceDeductibleAmount: $("#insuranceDeductibleAmount").val(),
                                    //             insurancePaymentsMoney: $("#insurancePaymentsMoney").val(),
                                    //             insurancePaymentsTime: $("#insurancePaymentsTime").val(),
                                    //             kpi: $("#KPI").val(),
                                    //             newOld: $("#newOld").val(),
                                    //             orderNumber: $("#orderNumber").val(),
                                    //             otherInjuries: $("#otherInjuries").val(),
                                    //             otherMoney: $("#otherMoney").val(),
                                    //             ourMoney: $("#ourMoney").val(),
                                    //             ourVehicleDamageDescription: $("#ourVehicleDamageDescription").val(),
                                    //             ourVehiclesDamage: $("#ourVehiclesDamage").val(),
                                    //             peopleInjure: $("#peopleInjure").val(),
                                    //             peopleMoney: $("#peopleMoney").val(),
                                    //             taskType: $("#taskType").val(),
                                    //             techniciansPunishmentMonkey: $("#techniciansPunishmentMonkey").val(),
                                    //             vehicleModels: $("#vehicleModels").val(),
                                    //             time: $("#time").val(),
                                    //
                                    //
                                    //         },
                                    //         Api.old_car_handing_report.update, "POST", function (_data2) {
                                    //             tips("操作成功");
                                    //             list.bootstrapTableTemplateQuery({});
                                    //         }
                                    //     );
                                    //
                                    // });


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
        $.get(Api.old_car_accident.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    switch (_data.info.details.natureAccident) {
                        case 1:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box2",
                                content: '<div class="form"><div class="title-lg">旧车装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">自车牌照</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故全景照</div></div><div id="invoce"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">受损部位照</div></div><div id="ssbwzBox"></div></div></div></div></div>',
                                success: function (_layero, _index) {

                                    console.log(_data);
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"));
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);

                                    var jsonObj = JSON.parse(_data.info.details.image);
                                    console.log(jsonObj);
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

                                    var jsonObj2 = JSON.parse(_data.info.details.damage);
                                    console.log(jsonObj.length);
                                    for (var k = 0; k < jsonObj2.length; k++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj2[k] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#ssbwzBox').viewer();
                                            $('#ssbwzBox').viewer("update");
                                            // })
                                        });
                                        $("#ssbwzBox").append($clone);
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
                                content: '<div class="form"><div class="title-lg">新车检查</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
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
                                content: '<div class="form"><div class="title-lg">交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故照片</div></div><div id="invoce"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val("暂无");
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
                                    $("#endTime").val("暂无");
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
        var options = {
            le: "#reason",
            title: "原因",
            size: ["400px", "400px"],
            buttonCallback: [function (layerDialog) {
                var reasonInfo = $("#reasonInfo").val();
                if (reasonInfo == "") {
                    tips("内容为空");
                    return false;
                }
                Tool.ajaxHelper.ajaxSubmit({
                        id: parseInt(data[0].id),
                        start: 2,
                        nature: getNatureAccidentIndex(data[0].natureAccident),
                        remark: reasonInfo,
                        vehicleCompleteName: userInfo.suName,
                        vehicleHandleTime: parseInt(new Date().getTime() / 1000)
                    },
                    Api.old_car_accident.update, "POST", function () {
                        tips("操作成功");
                        list.bootstrapTableTemplateQuery({});
                    }
                );
                layer.close(layerDialog.index);
            }],
            end: function () {
            }
        }
        options = $.extend(true, {}, options);
        $.layerDialog(options);
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
                    vehicleCompleteName: userInfo.suName,
                    vehicleHandleTime: parseInt(new Date().getTime() / 1000)
                },
                Api.old_car_accident.update, "POST", function () {
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

        // console.log((data[0].start == '3' && data[0].startH != "2"));
        // if (!((data[0].start == '3' && data[0].startH != "2") || data[0].start == '4')) {
        //     tips("选择的状态错误");
        //     return false;
        // }

        var info = {id: data[0].id, start: 5, confirmUserId: userId};
        inquiry("该操作不能撤回是否继续", function () {
            parent.layer.closeAll();

            $.get(Api.old_car_accident.info + "/" + id, {}, function (_data) {
                switch (_data.code) {
                    case 0:
                        console.log(_data);

                        switch (_data.info.details.natureAccident) {
                            case 1:
                                var affiliated = _data.info.affiliated;
                                if (isNotEmpty(affiliated.accidentAnalysisImprovementMeasures) && isNotEmpty(affiliated.actualAmountPaid) && isNotEmpty(affiliated.companyLostMonkey) && isNotEmpty(affiliated.companyTechnician) && isNotEmpty(affiliated.customerMoney) && isNotEmpty(affiliated.customerUnit) && isNotEmpty(affiliated.customerVehicleDamageDescription) && isNotEmpty(affiliated.customerVehiclesDamage) && isNotEmpty(affiliated.customerVehiclesFixedLoss) && isNotEmpty(affiliated.depreciationExpenses) && isNotEmpty(affiliated.injured) && isNotEmpty(affiliated.insuranceDeductibleAmount) && isNotEmpty(affiliated.insurancePaymentsMoney) && isNotEmpty(affiliated.insurancePaymentsTime) && isNotEmpty(affiliated.kpi) && isNotEmpty(affiliated.licensePlateNumber) && isNotEmpty(affiliated.newOld) && isNotEmpty(affiliated.orderNumber) && isNotEmpty(affiliated.otherInjuries) && isNotEmpty(affiliated.otherMoney) && isNotEmpty(affiliated.ourMoney) && isNotEmpty(affiliated.ourVehicleDamageDescription) && isNotEmpty(affiliated.ourVehiclesDamage) && isNotEmpty(affiliated.peopleInjure) && isNotEmpty(affiliated.peopleMoney) && isNotEmpty(affiliated.place) && isNotEmpty(affiliated.taskType) && isNotEmpty(affiliated.techniciansPunishmentMonkey) && isNotEmpty(affiliated.financialname)) {
                                    tool.ajaxHelper.ajaxSubmit({
                                        id: id,
                                        start: 5,
                                        userId: userId
                                    }, Api.old_car_accident.update, "POST", function (_data) {
                                        switch (_data.code) {
                                            case 0:
                                                tips("操作成功");
                                                list.bootstrapTableTemplateQuery({});
                                                break;
                                        }
                                    });
                                } else if (!isNotEmpty(affiliated.financialname)) {
                                    inquiry("财务填写完后方可确认完成！", function () {
                                        parent.layer.closeAll();
                                    });
                                } else {
                                    inquiry("请全部填写表格数据后再确认完成！", function () {
                                        parent.layer.closeAll();
                                    });
                                }
                                break;
                        }

                        // tool.ajaxHelper.ajaxSubmit({
                        //     id: id,
                        //     start: 5,
                        //     userId: userId
                        // }, Api.self_test.update, "POST", function (_data) {
                        //     switch (_data.code) {
                        //         case 0:
                        //             tips("操作成功");
                        //             list.bootstrapTableTemplateQuery({});
                        //             break;
                        //     }
                        // });


                        break;
                }
            });


            // tool.ajaxHelper.ajaxSubmit({
            //     id: id,
            //     start: 5,
            //     userId: userId
            // }, Api.old_car_accident.update, "POST", function (_data) {
            //     switch (_data.code) {
            //         case 0:
            //             tips("操作成功");
            //             list.bootstrapTableTemplateQuery({});
            //             break;
            //     }
            // });
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

        $.get(Api.old_car_accident.info + "/" + id, {}, function (_data) {
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
                                content: '<div class="form"><div class="title-lg">旧车装卸事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"readonly></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">任务类型</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆车型</div><select id="newOld"class="form-control width-1"><option value="1">新车</option><option value="2">旧车</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">客户车辆受损情况</div><textarea class="form-control ver-top width-2"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">我方车辆受损情况</div><textarea class="form-control ver-top width-2"id="ourVehiclesDamage"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">是否有人员受伤</div><select class="form-control width-1"id="injured"><option value="1">是</option><option value="2">否</option></select></div></div></div></div><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤描述</div><textarea class="form-control ver-top width-1"id="customerVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input id="customerMoney"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆受损描述</div><textarea class="form-control ver-top width-1"id="ourVehicleDamageDescription"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="ourMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="peopleInjure"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="peopleMoney"class="form-control width-1"placeholder=""></div></div></div></div><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">处理人员</div><select id="companyTechnician"class="form-control width-3"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm fontNum5">技师KPI扣分</div><input id="KPI"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">技师处罚金额</div><input id="techniciansPunishmentMonkey"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">客户车辆定损金额</div><input id="customerVehiclesFixedLoss"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">实际赔付金额</div><input id="actualAmountPaid"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-3"><div class="title-sm fontNum4">折旧费用</div><input id="depreciationExpenses"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm fontNum5">保险赔付到账日期</div><input type="text"id="insurancePaymentsTime"class="form-control width-3"placeholder=""></div><div class="tdBox-3 fontNum5"><div class="title-sm">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担比例</div><input id="jscdbl"type="text"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师承担金额</div><input type="text"id="jscdje"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">与客户沟通经过描述</div><textarea id="ykhgtjgms"name="deblock_udid"rows="5"class="form-control ver-top width-1"></textarea></div></div><div class="trBox" id="jczxsgVue"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">车管姓名</div><input id="cgxm"type="text"class="form-control width-1"placeholder=""readonly></div><div class="tdBox-2"><div class="title-sm title-right">财务姓名</div><input id="cwxm"type="text"class="form-control width-1"placeholder=""readonly></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">支付方式</div><select class="form-control width-1"id="payType"><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"></div><div class="trBox transferInfo"style="display:none"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"></div></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"placeholder="姓名"style="display:none"><button id="idcardImg"type="button"class="btn btn-primary">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary">拍照</button></div></div><div class="trBox"><div class="imgField2"></div></div></div></div></div>',
                                success: function (_layero, _index) {

                                    var jczxsgVue = new Vue({
                                        el: "#jczxsgVue",
                                        data: {
                                            followList: _data.info.affiliated.jdmsArrayStr ? JSON.parse(_data.info.affiliated.jdmsArrayStr) : [],
                                        }
                                    });

                                    // var followList = _data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[];
                                    // console.log(followList);

                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"));
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


                                    $("#jscdje").val(_data.info.affiliated.jscdje);  //  技师承担比例
                                    $("#jscdbl").val(_data.info.affiliated.jscdbl);  //  技师承担金额
                                    $("#ykhgtjgms").val(_data.info.affiliated.ykhgtjgms);  //  与客户沟通经过描述

                                    $("#cgxm").val(_data.info.affiliated.vehicleSubName);  //  车管姓名

                                    $("#payType").val(_data.info.affiliated.payType);  //  支付方式
                                    $("#bankCardId").val(_data.info.affiliated.bankcardid);  //  卡号
                                    $("#bankName").val(_data.info.affiliated.bankname);  //  开户行
                                    $("#payment").val(_data.info.affiliated.payment);  //  支付金额

                                    $("#acceptingOfficer").val(_data.info.affiliated.acceptingOfficer);  //  办理人员

                                    $("#insider").val(_data.info.affiliated.insider);  //  内部人员姓名
                                    $("#cwxm").val(_data.info.affiliated.financialname);  //  财务姓名
                                    $("#financialRemarks").val(_data.info.affiliated.financialremarks);  //  财务备注
                                    $("#amountCollected").val(_data.info.affiliated.skje);  // 收款金额

                                    $(".form input,.form textarea").attr("readonly", "readonly");
                                    $(".form select").attr("disabled", "disabled");
                                    $("#uploadImg,#idcardImg").css("display", "none");


                                    //报销单照片
                                    var expensephoto = _data.info.affiliated.expensephoto ? JSON.parse(_data.info.affiliated.expensephoto) : null;
                                    console.log(typeof expensephoto)
                                    if (expensephoto && expensephoto != null) {
                                        for (var i = 0; i < expensephoto.length; i++) {
                                            var $imgItem = $("<img style='width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;'>").attr("src", baseURL + expensephoto[i]);
                                            $(".imgField2").append($imgItem);
                                        }
                                    }

                                    //身份证照片
                                    var idphoto = _data.info.affiliated.idphoto ? JSON.parse(_data.info.affiliated.idphoto) : null;
                                    if (idphoto && idphoto != null) {
                                        for (var i = 0; i < idphoto.length; i++) {
                                            var $imgItem = $("<img style='width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;'>").attr("src", baseURL + idphoto[i]);
                                            $(".imgField1").append($imgItem);
                                        }
                                    }

                                    var selectVal = $("#acceptingOfficer").val();
                                    if ((selectVal == 2) || (selectVal == "2")) {
                                        $("#insider").css("display", "block");
                                        // console.log("2");
                                    } else {
                                        // console.log("1");
                                    }

                                    var payTypeVal = $("#payType").val();
                                    console.log(payTypeVal);
                                    if ((payTypeVal == 2) || (payTypeVal == "2")) {
                                        $(".transferInfo").css("display", "block");
                                        // console.log("2");
                                    } else {
                                        // console.log("1");
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
                                content: '<div class="form"><div class="title-lg">新车检查</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名       </div><input id="jsxm" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">        车牌号       </div><input id="cph" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">        事故发生时间       </div><input id="endTime" type="text" class="form-control width-1" readonly="" style="display: inline-block" v-show="bridgeFinance" /></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">        事故发生地点       </div><textarea id="sgfsdd" class="form-control ver-top width-2" name="deblock_udid" rows="5" readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit" type="text" class="form-control width-1" placeholder="" readonly="readonly" /></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><select class="form-control width-1"id="taskType"><option value="1">拖车</option><option value="2">搭电</option><option value="3">换胎</option><option value="4">困境</option><option value="5">吊车</option><option value="6">地库</option></select></div><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--受损情况--><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""></div></div></div></div><!--赔付情况--><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">折扣费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""></div></div></div></div><!--事故分析--><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea  class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"></textarea></div></div></div></div></div>',
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

        console.log(data)
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

            $.get(Api.old_car_accident.info + "/" + id, {}, function (_data) {
                console.log(_data);

                Tool.ajaxHelper.ajaxSubmit({
                        id: id,
                        reminderTime: tool.dataHelper.timeStampToDateFormat(parseInt(new Date().getTime() / 1000), "yyyy年MM月dd日 hh:mm")
                    },
                    Api.old_car_accident.update, "POST", function (_data2) {
                        // console.log(_data.info.details.reminderTime);
                        // list.bootstrapTableTemplateQuery({});
                    }
                );

            });

            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id
                },
                Api.old_car_accident.remindVehicle, "POST", function () {
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