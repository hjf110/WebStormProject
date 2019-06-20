var list = null;
var vueSelf = null;
var controller = "";
var accidentId = null;
var accidentCheck = 1;
var accidentFinanceSelfTest = 1;
var defaultState = 1;

var isFaultDriverSelfTest = false;
var isFaultManageSelfTest = false;
var isFaultDispatchSelfTest = false;
var isAccidentObservationSelfTest = false;
var isAccidentFinanceSelfTest = false;
var userId = userInfo.structureUserId;
var vueObj;

isFaultDriverSelfTest = userRoleList.indexOf(config.faultDriverSelfTest) > -1;
isFaultManageSelfTest = userRoleList.indexOf(config.faultManageSelfTest) > -1;
isFaultDispatchSelfTest = userRoleList.indexOf(config.faultDispatchSelfTest) > -1;
isAccidentObservationSelfTest = userRoleList.indexOf(config.accidentObservationSelfTest) > -1;
isAccidentFinanceSelfTest = userRoleList.indexOf(config.accidentFinanceSelfTest) > -1;

console.log(isFaultDriverSelfTest);
console.log(isFaultManageSelfTest);
console.log(isFaultDispatchSelfTest);
console.log(isAccidentFinanceSelfTest);

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
            accidentFinance: accidentFinanceSelfTest,
            nowState: defaultState,
            sheetData: [],
            isFaultDriverSelfTest: isFaultDriverSelfTest,
            isFaultManageSelfTest: isFaultManageSelfTest,
            isFaultDispatchSelfTest: isFaultDispatchSelfTest,
            isAccidentObservationSelfTest:isAccidentObservationSelfTest,
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
        url: Api.self_test.list,
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
            // {
            //     label: '客户单位',
            //     name: 'customerUnit',
            //     sortable: false,
            //
            // },
            {
                label: '事故性质',
                name: 'natureAccident',
                sortable: false,
                formatter: function (value, options, row) {
                    return "自测交通事故";
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
                            return '<span class="label label-danger">任务放弃</span>';
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

            if(parseInt(data[0].start)==2){
                console.log(userInfo);
                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        dispatchName:userInfo.suName,
                        dispatchId:userInfo.structureUserId,
                        dispatchTime:Math.ceil(new Date().getTime()/1000),
                    },
                    Api.self_test.update, "POST", function () {
                        tips("确认成功");
                        list.bootstrapTableTemplateQuery({});
                    });
            }else{
                inquiry("事故状态为任务取消时才需确认",function(){});
            }

            // Tool.ajaxHelper.ajaxSubmit({
            //         id: data[0].id,
            //         isDispatch: 2,
            //     },
            //     Api.self_test.update, "POST", function () {
            //         tips("调度成功");
            //         list.bootstrapTableTemplateQuery({});
            //     }
            // );
            // console.log("调度完成");

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

        $.get(Api.self_test.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log("data--------"+_data);
                    console.log(_data.info.details.natureAccident);
                    switch (_data.info.details.natureAccident) {
                        case 3:
                            console.log("aaa");
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="jtsgForm"class="form"><div id="printManager"><div class="title-lg">自车交通事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"v-model="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""v-bind:value="cph"v-model="cph"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="sgfssj"v-model="sgfssj"></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly v-bind:value="sgfsdd"v-model="sgfsdd"></textarea></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"v-bind:value="zcxs"v-model="zcxs"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"v-bind:value="ryss"v-model="ryss"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"v-bind:value="jjzrpd"v-model="jjzrpd"></textarea></div></div></div></div><div class="partBox damageSituation trRemove"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"v-bind:value="wfclssqk"v-model="wfclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje1"v-model="ssje1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"v-bind:value="dfclssqk"v-model="dfclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje3"v-model="ssje3"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"v-bind:value="ryssqk"v-model="ryssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje4"v-model="ssje4"></div></div></div></div><div class="partBox compensationSituation trRemove"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"v-bind:value="clry"v-model="clry"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""v-bind:value="kpi"v-model="kpi"></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""v-bind:value="jscfje"v-model="jscfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""v-bind:value="jscdpfbl"v-model="jscdpfbl"></div><div class="tdBox-2"><div class="title-sm title-right">技师承担金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""v-bind:value="jspcje"v-model="jspfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""v-bind:value="wfdsje"v-model="wfdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje"v-model="bxpfje"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq"v-model="dzrq"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje"v-model="dzje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""v-bind:value="dfdsje"v-model="dfdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje6"v-model="bxpfje6"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq2"v-model="dzrq2"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje2"v-model="dzje2"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""v-bind:value="qtssdsje"v-model="qtssdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""v-bind:value="bxpfje2"v-model="bxpfje2"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq5"v-model="dzrq5"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje3"v-model="dzje3"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""v-bind:value="ryssje"v-model="ryssje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje3"v-model="bxpfje3"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq4"v-model="dzrq4"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""v-bind:value="dzje4"v-model="dzje4"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方赔付到账日期</div><input type="text"class="form-control width-1"id="oppositeTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dfpfdzrq"v-model="dfpfdzrq"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">对方赔付到账金额</div><input type="text"class="form-control width-1"id="oppositeArrivalAccount"placeholder=""v-bind:value="dfpfdzje"v-model="dfpfdzje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input type="text"id="gsssje"class="form-control width-1"placeholder=""v-bind:value="gsssje"v-model="gsssje"></div><div class="tdBox-2"><div class="title-sm title-right">三方委托赔付</div><select id="sfwtpf"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div><div class="followUpEdit trfollow"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"id="jdms"class="form-control width-1"placeholder=""v-bind:value="jdms"v-model="jdms"></div><button id="followUp"type="button"class="btn btn-primary"v-on:click="followUpBtn">跟进</button><div class="tdBox-2"><input type="text"id="gjsj"class="form-control width-1"placeholder=""v-bind:value="gjsj"v-model="gjsj"style="display:none"></div></div></div></div></div><div class="partBox accidentAnalysis trRemove"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"v-bind:value="sgfx"v-model="sgfx"></textarea></div></div></div></div><div class="partBox processingPersonnel"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">车管姓名</div><input id="cgxm"type="text"class="form-control width-1"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div><div class="tdBox-2"><div class="title-sm title-right">财务姓名</div><input id="cwxm"type="text"class="form-control width-1"placeholder=""v-bind:value="cwxm"v-model="cwxm"readonly></div></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">支付方式</div><select class="form-control width-1"id="payType"v-bind:value="zffs"v-model="zffs"><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"v-bind:value="zfje"v-model="zfje"></div></div><div class="trBox"v-show="zffs==2||zffs==\'2\'"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"v-bind:value="kh"v-model="kh"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"v-bind:value="khh"v-model="khh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"v-bind:value="blry"v-model="blry"><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"v-bind:value="nbryxm"v-model="nbryxm"placeholder="姓名"v-if="blry==2||blry==\'2\'"><button id="idcardImg"type="button"class="btn btn-primary trRemove"v-else-if="blry==1||blry==\'1\'"v-on:click="takeIdPhoto">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"v-bind:value="cwbz"v-model="cwbz"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary trRemove"v-show="isAccidentFinanceSelfTest"v-on:click="takePhotos">拍照</button></div><div class="imgField2"></div></div></div></div><div class="buttonBox trRemove"><button id="completePayment"class="button1 btnBlue"v-show="isAccidentFinanceSelfTest"v-on:click="completePaymentClick">支付完成</button><button id="completeCollection"class="button1 btnBlue"v-on:click="completeCollectionClick"style="display:none;">收款完成</button><button id="printExpenseAccountManager"class="button1 btnBlue"v-on:click="printManagerClick"style="display:none;">打印</button><button id="printExpenseAccountFinance"class="button1 btnBlue"v-on:click="printFinanceClick"v-show="isAccidentFinanceSelfTest">打印</button><button id="saveBtn"class="button1"v-on:click="saveBtn">保存并关闭</button></div></div>',
                                success: function (_layero, _index) {
                                    if(!isAccidentFinanceSelfTest) {

                                        $(".financialPayment input,.financialPayment textarea").attr("readonly", "readonly");
                                        $(".financialPayment select").attr("disabled","disabled");
                                        $("#uploadImg,#idcardImg").css("display", "none");

                                    } else {
                                        $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea").attr("readonly", "readonly");
                                        $(".basicInfo select,.damageSituation select,.compensationSituation select").attr("disabled","disabled");
                                    }

                                    var jtsgVue = new Vue({
                                        el:"#jtsgForm",
                                        data:{
                                            //基础信息
                                            bridgeFinance:true,
                                            jsxm:_data.info.details.name,
                                            cph:_data.info.details.licensePlate,
                                            sgfssj:tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime,"yyyy年MM月dd日 hh:mm"),
                                            sgfsdd:_data.info.details.place,

                                            //填写信息
                                            zcxs:_data.info.affiliated.newOld,        //是否正常行驶
                                            ryss:_data.info.affiliated.taskType,            //是否有人受伤
                                            jjzrpd:_data.info.affiliated.place,      //交警责任判定
                                            wfclssqk:_data.info.affiliated.customerUnit,  //我方车辆受损情况
                                            ssje1:_data.info.affiliated.companyTechnician,               //我方车辆受损情况损伤金额1
                                            dfclssqk:_data.info.affiliated.vehicleModels,        //对方车辆受损情况
                                            ssje2:_data.info.affiliated.customerVehiclesDamage,           //对方车辆受损情况损伤金额2
                                            qtss:_data.info.affiliated.ourVehiclesDamage,                //其他损伤
                                            ssje3:_data.info.affiliated.injured,                   //其他损伤金额
                                            ryssqk:_data.info.affiliated.customerVehicleDamageDescription,          //人员受伤情况
                                            ssje4:_data.info.affiliated.customerMoney,               //人员受伤情况金额
                                            clry:_data.info.affiliated.auditorId,            //处理人员
                                            kpi:_data.info.affiliated.kpi,                 //技师KPI扣分
                                            jscfje:_data.info.affiliated.ourMoney,          //技师处罚金额
                                            jspcje:_data.info.affiliated.jspcje,              //技师赔偿金额
                                            jscdpfbl:_data.info.affiliated.otherInjuries,        //技师承担赔付比例
                                            jspfje:_data.info.affiliated.otherMoney,              //技师赔付金额
                                            wfdsje:_data.info.affiliated.peopleMoney,              //我放定损金额
                                            bxpfje:_data.info.affiliated.techniciansPunishmentMonkey,              //我方定损保险赔付金额
                                            dzrq:_data.info.affiliated.customerVehiclesFixedLoss,            //到账日期
                                            dzje:_data.info.affiliated.actualAmountPaid,        //到账日期到账金额
                                            dfdsje:_data.info.affiliated.insuranceDeductibleAmount,          //对方定损金额
                                            bxpfje6:_data.info.affiliated.depreciationExpenses,              //对方定损保险赔付金额
                                            dzrq2:_data.info.affiliated.insurancePaymentsTime,                    //保险赔付金额到账日期
                                            dzje2:_data.info.affiliated.insurancePaymentsMoney,           //保险赔付金额到账金额
                                            qtssdsje:_data.info.affiliated.companyLostMonkey,        //其他损伤定损金额
                                            bxpfje2:_data.info.affiliated.accidentAnalysisImprovementMeasures,         //其他损伤定损金额保险赔付金额
                                            dzje3:_data.info.affiliated.techniciansRatio,           //其他损伤定损金额到账金额
                                            dzrq5:_data.info.affiliated.techniciansMonkey,               //其他损伤定损金额到账日期
                                            ryssje:_data.info.affiliated.settlementMonkey,              //人员受伤金额
                                            bxpfje3:_data.info.affiliated.peopleInjure,             //人员受伤金额保险赔付金额
                                            dzrq4:_data.info.affiliated.dzrq4,               //人员受伤金额到账日期
                                            dzje4:_data.info.affiliated.dzje4,               //人员手上金额到账金额
                                            sgfx:_data.info.affiliated.accidentAnalysis,            //事故分析
                                            dfpfdzrq:_data.info.affiliated.dfpfdzrq,    // 对方赔付到账日期
                                            dfpfdzje:_data.info.affiliated.dfpfdzje,    // 对方赔付到账金额
                                            gsssje:_data.info.affiliated.gsssje,        //公司损失金额
                                            sfwtpf:_data.info.affiliated.sfwtpf,        //三方委托赔付

                                            cgxm:_data.info.affiliated.vehicleSubName,  //  车管姓名
                                            zffs:_data.info.affiliated.payType,  //  支付方式
                                            zfje:_data.info.affiliated.payment,  //  支付金额
                                            kh: _data.info.affiliated.bankcardid,  //  卡号
                                            khh: _data.info.affiliated.bankname, //  开户行
                                            blry:_data.info.affiliated.acceptingOfficer,  //  办理人员

                                            jdms:"",  //  进度描述
                                            followList: _data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[],

                                            nbryxm:_data.info.affiliated.insider,  //  内部人员姓名
                                            cwxm:_data.info.affiliated.financialname,  //  财务姓名
                                            cwbz:_data.info.affiliated.financialremarks,  //  财务备注
                                            sfzz:_data.info.affiliated.idphoto,  //身份证照
                                            skje:_data.info.affiliated.skje,    // 收款金额
                                            bxdzp:_data.info.affiliated.expensephoto?JSON.parse(_data.info.affiliated.expensephoto):""  //  报销单照片

                                        },
                                        methods:{
                                            printManagerClick:function() {
                                                console.log("车管打印开始");



                                                var jsxm = $("#jsxm").val();//1
                                                var cph = $("#cph").val();//2
                                                var endTime = $("#endTime").val();//3
                                                var sgfsdd = $("#sgfsdd").val();//4
                                                var normalDriving = $("#normalDriving").find("option:selected").text();//5
                                                var personnelInjury = $("#personnelInjury").find("option:selected").text();//6
                                                var responsibilityJudgement = $("#responsibilityJudgement").val();//7
                                                var we = $("#we").val();//8
                                                var weAmountDamage = $("#weAmountDamage").val();//9
                                                var other = $("#other").val();//10
                                                var otherAmountDamage = $("#otherAmountDamage").val();//11
                                                var others = $("#others").val();//12
                                                var othersAmountDamage = $("#othersAmountDamage").val();//13
                                                var personnelInjuries = $("#personnelInjuries").val();//14
                                                var personnelInjuryAmountDamage = $("#personnelInjuryAmountDamage").val();//15
                                                var handle = $("#handle").find("option:selected").text();//16
                                                var kpiDeduction = $("#kpiDeduction").val();//17
                                                var amountPenalty = $("#amountPenalty").val();//18
                                                var proportionCompensation = $("#proportionCompensation").val();//19
                                                var compensationAmountTechnicians = $("#compensationAmountTechnicians").val();//20
                                                var ourFixedLoss = $("#ourFixedLoss").val();//21
                                                var ourInsurance = $("#ourInsurance").val();//22
                                                var ourTime = $("#ourTime").val();//23
                                                var ourArrivalAccount = $("#ourArrivalAccount").val();//24
                                                var otherFixedLoss = $("#otherFixedLoss").val();//25

                                                var otherInsurance = $("#otherInsurance").val();//26
                                                var otherTime = $("#otherTime").val();//27
                                                var otherArrivalAccount = $("#otherArrivalAccount").val();//28
                                                var othersFixedLoss = $("#othersFixedLoss").val();//29
                                                var othersInsurances = $("#othersInsurances").val();//30
                                                var othersTime = $("#othersTime").val();//31
                                                var othersArrivalAccount = $("#othersArrivalAccount").val();//32
                                                var personnelInjuryFixedLoss = $("#personnelInjuryFixedLoss").val();//33
                                                var personnelInjuryInsurance = $("#personnelInjuryInsurance").val();//34
                                                var personnelInjuryTime = $("#personnelInjuryTime").val();//35

                                                var personnelInjuryArrivalAccount = $("#personnelInjuryArrivalAccount").val();//29
                                                var oppositeTime = $("#oppositeTime").val();//30
                                                var oppositeArrivalAccount = $("#oppositeArrivalAccount").val();//31
                                                var gsssje = $("#gsssje").val();//32
                                                var sfwtpf = $("#sfwtpf").find("option:selected").text();//33
                                                var accidentAnalysis = $("#accidentAnalysis").val();//34
                                                var cgxm = $("#cgxm").val();//35


                                                $.cookie("jsxm", jsxm, {path: '/'});
                                                $.cookie("cph", cph, {path: '/'});
                                                $.cookie("endTime", endTime, {path: '/'});
                                                $.cookie("sgfsdd", sgfsdd, {path: '/'});
                                                $.cookie("normalDriving", normalDriving, {path: '/'});
                                                $.cookie("personnelInjury", personnelInjury, {path: '/'});
                                                $.cookie("responsibilityJudgement", responsibilityJudgement, {path: '/'});
                                                $.cookie("we", we, {path: '/'});
                                                $.cookie("weAmountDamage", weAmountDamage, {path: '/'});
                                                $.cookie("other", other, {path: '/'});
                                                $.cookie("otherAmountDamage", otherAmountDamage, {path: '/'});
                                                $.cookie("others", others, {path: '/'});
                                                $.cookie("othersAmountDamage", othersAmountDamage, {path: '/'});
                                                $.cookie("personnelInjuries", personnelInjuries, {path: '/'});
                                                $.cookie("personnelInjuryAmountDamage", personnelInjuryAmountDamage, {path: '/'});
                                                $.cookie("handle", handle, {path: '/'});
                                                $.cookie("kpiDeduction", kpiDeduction, {path: '/'});
                                                $.cookie("amountPenalty", amountPenalty, {path: '/'});
                                                $.cookie("proportionCompensation", proportionCompensation, {path: '/'});
                                                $.cookie("compensationAmountTechnicians", compensationAmountTechnicians, {path: '/'});
                                                $.cookie("ourFixedLoss", ourFixedLoss, {path: '/'});
                                                $.cookie("ourInsurance", ourInsurance, {path: '/'});
                                                $.cookie("ourTime", ourTime, {path: '/'});
                                                $.cookie("ourArrivalAccount", ourArrivalAccount, {path: '/'});
                                                $.cookie("otherFixedLoss", otherFixedLoss, {path: '/'});
                                                $.cookie("otherInsurance", otherInsurance, {path: '/'});
                                                $.cookie("otherTime", otherTime, {path: '/'});
                                                $.cookie("otherArrivalAccount", otherArrivalAccount, {path: '/'});
                                                $.cookie("othersFixedLoss", othersFixedLoss, {path: '/'});
                                                $.cookie("othersInsurances", othersInsurances, {path: '/'});
                                                $.cookie("othersTime", othersTime, {path: '/'});
                                                $.cookie("othersArrivalAccount", othersArrivalAccount, {path: '/'});
                                                $.cookie("personnelInjuryFixedLoss", personnelInjuryFixedLoss, {path: '/'});
                                                $.cookie("personnelInjuryInsurance", personnelInjuryInsurance, {path: '/'});
                                                $.cookie("personnelInjuryTime", personnelInjuryTime, {path: '/'});
                                                $.cookie("personnelInjuryArrivalAccount", personnelInjuryArrivalAccount, {path: '/'});
                                                $.cookie("oppositeTime", oppositeTime, {path: '/'});
                                                $.cookie("oppositeArrivalAccount", oppositeArrivalAccount, {path: '/'});
                                                $.cookie("gsssje", gsssje, {path: '/'});
                                                $.cookie("sfwtpf", sfwtpf, {path: '/'});
                                                $.cookie("accidentAnalysis", accidentAnalysis, {path: '/'});
                                                $.cookie("cgxm", cgxm, {path: '/'});


                                                window.open("self_test_cgdy.html");

                                                // var loading = tool.loading();
                                                // var $printManager = $("#printManager");
                                                // $printManager.addClass("bgText");
                                                // $printManager.find("div.trfollow").hide();
                                                // html2canvas($printManager[0]).then(function(canvas) {
                                                //     canvas.toBlob(function(blob) {
                                                //         saveAs(blob, "车管表单.png");
                                                //     });
                                                //     layer.close(loading);
                                                //     tips("导出成功");
                                                //     $printManager.find("div.trfollow").show();
                                                //     $printManager.removeClass("bgText");
                                                    console.log("打印结束");
                                              //  });
                                            },
                                            printFinanceClick: function() {
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

                                                $.cookie("xmname", "自车交通事故报销单", {path: '/'});
                                                //跳转到一个新的页面
                                                window.open("old_car_accident_cwdy.html");







                                                // var loading = tool.loading();
                                                // var $printFinance = $("#jtsgForm");
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
                                            completeCollectionClick: function() {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.self_test.collectionCompleted, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            completePaymentClick: function() {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.self_test.confirmPayment, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            saveBtn:function(_event){
                                                var _this = this;

                                                console.log(_data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[]);

                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id,
                                                        licensePlate:_this.cph
                                                    },
                                                    Api.self_test.update, "POST", function (_data2) {
                                                        // list.bootstrapTableTemplateQuery({});
                                                    }
                                                );

                                                Tool.ajaxHelper.ajaxSubmit({
                                                    id: _data.info.affiliated.id,
                                                    name: _data.info.details.name,
                                                    licensePlate: _data.info.details.licensePlate,
                                                    placeOccurrence: _data.info.details.place,

                                                    newOld:_this.zcxs,
                                                    taskType:_this.ryss,
                                                    place:_this.jjzrpd,
                                                    customerUnit:_this.wfclssqk,
                                                    companyTechnician:_this.ssje1,
                                                    vehicleModels:_this.dfclssqk,
                                                    customerVehiclesDamage:_this.ssje2,
                                                    ourVehiclesDamage:_this.qtss,
                                                    injured:_this.ssje3,
                                                    customerVehicleDamageDescription:_this.ryssqk,
                                                    customerMoney:_this.ssje4,
                                                    auditorId:_this.clry,
                                                    kpi:_this.kpi,
                                                    ourMoney:_this.jscfje,
                                                    jspcje:_this.jspcje,
                                                    otherInjuries:_this.jscdpfbl,
                                                    otherMoney:_this.jspfje,
                                                    peopleMoney:_this.wfdsje,
                                                    techniciansPunishmentMonkey:_this.bxpfje,
                                                    customerVehiclesFixedLoss:$("#ourTime").val(),
                                                    actualAmountPaid:_this.dzje,
                                                    insuranceDeductibleAmount:_this.dfdsje,
                                                    depreciationExpenses:_this.bxpfje6,
                                                    insurancePaymentsTime:$("#otherTime").val(),
                                                    insurancePaymentsMoney:_this.dzje2,
                                                    companyLostMonkey:_this.qtssdsje,
                                                    accidentAnalysisImprovementMeasures:_this.bxpfje2,
                                                    techniciansRatio:_this.dzje3,
                                                    techniciansMonkey:$("#othersTime").val(),
                                                    settlementMonkey:_this.ryssje,
                                                    peopleInjure:_this.bxpfje3,
                                                    dzrq4:$("#personnelInjuryTime").val(),
                                                    dzje4:_this.dzje4,
                                                    accidentAnalysis:_this.sgfx,
                                                    dfpfdzrq:$("#oppositeTime").val(),    //  对方赔付到账日期
                                                    dfpfdzje:_this.dfpfdzje,    // 对方赔付到账金额
                                                    gsssje:_this.gsssje,
                                                    sfwtpf:_this.sfwtpf,

                                                    vehicleSubName: isFaultManageSelfTest?userInfo.suName:_this.vehicleSubName,  //车管
                                                    financialname:isAccidentFinanceSelfTest?userInfo.suName:_this.financialname,  //  财务姓名
                                                    payType: _this.zffs,  //  支付方式
                                                    payment: _this.zfje,  //  支付金额
                                                    bankcardid: _this.kh,  //  卡号
                                                    bankname: _this.khh, //  开户行
                                                    acceptingOfficer: _this.blry,  //  办理人员

                                                    // progressdescription:_this.jdms,  //  进度描述
                                                    // followtime:_this.gjsj,  //  跟进时间
                                                    jdmsArrayStr:JSON.stringify(_this.followList),

                                                    insider:_this.nbryxm,  //  内部人员姓名
                                                    skje:_this.skje,    // 收款金额
                                                    financialremarks: _this.cwbz, //  财务备注
                                                    idphoto: typeof _this.sfzz == "string"?_this.sfzz:JSON.stringify(_this.sfzz),   //  身份证照片
                                                    expensephoto: JSON.stringify(_this.bxdzp) //  报销单照片
                                                },
                                                Api.self_test_report.update, "POST", function (_data2) {
                                                    layer.closeAll();
                                                    tips("操作成功");
                                                    console.log($("#accidentAnalysis").val());
                                                    list.bootstrapTableTemplateQuery({});
                                                }
                                                );
                                            },
                                            takePhotos: function(_event) {
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
                                                                _this.bxdzp = _e.data;


                                                                console.log(imgObj);
                                                                $(".imgField2").html("");
                                                                $.each(imgObj, function (i, e) {

                                                                    var $item = $(e).attr("src", baseURL+_e.data[i]);
                                                                    $(".imgField2").append($item);
                                                                });
                                                                console.log($(".imgField2>img"));
                                                                $(".imgField2>img").click(function(){
                                                                    console.log("-----");
                                                                    window.open($(this).attr("src"),"_blank");
                                                                });

                                                                layer.close(layerDialog.index);

                                                            }
                                                        );

                                                        // console.log(layerDialog);
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
                                            takeIdPhoto:function(){
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


                                                                console.log(imgObj);
                                                                $(".imgField1").html("");
                                                                $.each(imgObj, function (i, e) {

                                                                    var $item = $(e).attr("src",baseURL+ _e.data[i]);
                                                                    $(".imgField1").append($item);
                                                                });
                                                                $(".imgField1>img").click(function(){
                                                                    window.open($(this).attr("src"),"_blank");
                                                                });

                                                                layer.close(layerDialog.index);

                                                            }
                                                        );

                                                        // console.log(layerDialog);
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
                                            timeClick:function(_event){
                                                console.log(_event.target);
                                            },
                                            followUpBtn:function(_event) {
                                                var _this = this;
                                                if(!this.jdms){
                                                    tips("请输入内容后再跟进");
                                                    return;
                                                }
                                                this.followList.push({jdms:this.jdms,time:parseInt(new Date().getTime()/1000)});
                                                this.jdms = "";
                                                console.log(JSON.stringify(this.followList));
                                                console.log(JSON.parse(JSON.stringify(this.followList)));
                                            }
                                        }
                                    });

                                    //财务收款完成按钮
                                    $(".financialPayment input, .financialPayment textarea, .financialPayment select").on("input", function() {
                                        if(isAccidentFinanceSelfTest&&($("#amountCollected").val() > 0)&&($("#payment").val() == 0)) {
                                            console.log("按钮出现");
                                            $("#completeCollection").css("display", "inline-block");
                                        } else {
                                            console.log("按钮消失");
                                            $("#completeCollection").css("display", "none");
                                        }
                                    });
                                    if(isAccidentFinanceSelfTest&&($("#amountCollected").val() > 0)&&($("#payment").val() == 0)) {
                                        console.log("按钮出现");
                                        $("#completeCollection").css("display", "inline-block");
                                    } else {
                                        console.log("按钮消失");
                                        $("#completeCollection").css("display", "none");
                                    }

                                    //车管全部填写完后，出现打印按钮
                                    $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea,.basicInfo select,.damageSituation select,.compensationSituation select").on("input", function() {
                                        if(isFaultManageSelfTest&&isNotEmpty($("#normalDriving").val())&&isNotEmpty($("#personnelInjury").val())&&isNotEmpty($("#responsibilityJudgement").val())&&isNotEmpty($("#we").val())&&isNotEmpty($("#weAmountDamage").val())&&isNotEmpty($("#other").val())&&isNotEmpty($("#otherAmountDamage").val())&&isNotEmpty($("#others").val())&&isNotEmpty($("#othersAmountDamage").val())&&isNotEmpty($("#personnelInjuries").val())&&isNotEmpty($("#personnelInjuryAmountDamage").val())&&isNotEmpty($("#handle").val())&&isNotEmpty($("#kpiDeduction").val())&&isNotEmpty($("#amountPenalty").val())&&isNotEmpty($("#proportionCompensation").val())&&isNotEmpty($("#compensationAmountTechnicians").val())&&isNotEmpty($("#ourFixedLoss").val())&&isNotEmpty($("#ourInsurance").val())&&isNotEmpty($("#ourTime").val())&&isNotEmpty($("#ourArrivalAccount").val())&&isNotEmpty($("#otherFixedLoss").val())&&isNotEmpty($("#otherInsurance").val())&&isNotEmpty($("#otherTime").val())&&isNotEmpty($("#otherArrivalAccount").val())&&isNotEmpty($("#othersFixedLoss").val())&&isNotEmpty($("#othersInsurances").val())&&isNotEmpty($("#othersTime").val())&&isNotEmpty($("#othersArrivalAccount").val())&&isNotEmpty($("#personnelInjuryInsurance").val())&&isNotEmpty($("#personnelInjuryFixedLoss").val())&&isNotEmpty($("#gsssje").val())&&isNotEmpty($("#sfwtpf").val())&&isNotEmpty($("#accidentAnalysis").val())) {
                                            $("#printExpenseAccountManager").css("display", "inline-block");
                                        } else {
                                            $("#printExpenseAccountManager").css("display", "none");
                                        }
                                    });
                                    if(isFaultManageSelfTest&&isNotEmpty($("#normalDriving").val())&&isNotEmpty($("#personnelInjury").val())&&isNotEmpty($("#responsibilityJudgement").val())&&isNotEmpty($("#we").val())&&isNotEmpty($("#weAmountDamage").val())&&isNotEmpty($("#other").val())&&isNotEmpty($("#otherAmountDamage").val())&&isNotEmpty($("#others").val())&&isNotEmpty($("#othersAmountDamage").val())&&isNotEmpty($("#personnelInjuries").val())&&isNotEmpty($("#personnelInjuryAmountDamage").val())&&isNotEmpty($("#handle").val())&&isNotEmpty($("#kpiDeduction").val())&&isNotEmpty($("#amountPenalty").val())&&isNotEmpty($("#proportionCompensation").val())&&isNotEmpty($("#compensationAmountTechnicians").val())&&isNotEmpty($("#ourFixedLoss").val())&&isNotEmpty($("#ourInsurance").val())&&isNotEmpty($("#ourTime").val())&&isNotEmpty($("#ourArrivalAccount").val())&&isNotEmpty($("#otherFixedLoss").val())&&isNotEmpty($("#otherInsurance").val())&&isNotEmpty($("#otherTime").val())&&isNotEmpty($("#otherArrivalAccount").val())&&isNotEmpty($("#othersFixedLoss").val())&&isNotEmpty($("#othersInsurances").val())&&isNotEmpty($("#othersTime").val())&&isNotEmpty($("#othersArrivalAccount").val())&&isNotEmpty($("#personnelInjuryInsurance").val())&&isNotEmpty($("#personnelInjuryFixedLoss").val())&&isNotEmpty($("#gsssje").val())&&isNotEmpty($("#sfwtpf").val())&&isNotEmpty($("#accidentAnalysis").val())) {
                                        $("#printExpenseAccountManager").css("display", "inline-block");
                                    } else {
                                        $("#printExpenseAccountManager").css("display", "none");
                                    }

                                    var imgArray = _data.info.affiliated.expensephoto?JSON.parse(_data.info.affiliated.expensephoto):null;
                                    if(imgArray&&imgArray!=null){
                                        for(var n = 0; n < imgArray.length; n++){
                                            var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" />').attr("src",baseURL+ imgArray[n]);
                                            $(".imgField2").append($item);
                                        }
                                        $(".imgField2>img").click(function(){
                                            window.open($(this).attr("src"),"_blank");
                                        });
                                    }

                                    var imgArray2 = _data.info.affiliated.idphoto?JSON.parse(_data.info.affiliated.idphoto):null;
                                    if(imgArray2&&imgArray2!=null){
                                        for(var n = 0; n < imgArray2.length; n++){
                                            var $item = $('<img style="width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;" />').attr("src", baseURL+imgArray2[n]);
                                            $(".imgField1").append($item);
                                        }
                                        $(".imgField1>img").click(function(){
                                            window.open($(this).attr("src"),"_blank");
                                        });
                                    }

                                    $('#othersTime,#otherTime,#ourTime,#personnelInjuryTime,#oppositeTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true
                                    }).on("changeDate",function(ev){
                                        switch(ev.currentTarget.id){
                                            case "othersTime":
                                                jtsgVue.dzrq5 = $(ev.currentTarget).val();
                                                break;
                                            case "otherTime":
                                                jtsgVue.dzrq2 = $(ev.currentTarget).val();
                                                break;
                                            case "ourTime":
                                                jtsgVue.dzrq = $(ev.currentTarget).val();
                                                break;
                                            case "personnelInjuryTime":
                                                jtsgVue.dzrq4 = $(ev.currentTarget).val();
                                                break;
                                            case "oppositeTime":
                                                jtsgVue.dfpfdzrq = $(ev.currentTarget).val();
                                                break;
                                        }
                                    });

                                    // $("#jsxm").val(_data.info.details.name);
                                    // $("#cph").val(_data.info.details.licensePlate);
                                    // $("#endTime").val("暂无");
                                    // $("#sgfsdd").val(_data.info.details.place);
                                    // $("#customerUnit").val(_data.info.details.customerUnit);
                                    //
                                    // $("#accidentAnalysis").val(_data.info.affiliated.accidentAnalysis);
                                    // $("#accidentApplicationId").val(_data.info.affiliated.accidentApplicationId);
                                    // $("#amountPenalty").val(_data.info.affiliated.amountPenalty);
                                    // $("#compensationAmountTechnicians").val(_data.info.affiliated.compensationAmountTechnicians);
                                    // $("#handle").val(_data.info.affiliated.handle);
                                    // $("#othersArrivalAccount").val(_data.info.affiliated.othersArrivalAccount);
                                    // $("#kpiDeduction").val(_data.info.affiliated.kpideduction);
                                    // // $("#normalDriving").val(_data.info.affiliated.normalDriving);
                                    // $("#other").val(_data.info.affiliated.other);
                                    // $("#otherAmountDamage").val(_data.info.affiliated.otherAmountDamage);
                                    // $("#otherArrivalAccount").val(_data.info.affiliated.otherArrivalAccount);
                                    // $("#otherFixedLoss").val(_data.info.affiliated.otherFixedLoss);
                                    // $("#otherTime").val(_data.info.affiliated.otherTime);
                                    // $("#othersTime").val(_data.info.affiliated.othersTime);
                                    // $("#otherInsurance").val(_data.info.affiliated.otherInsurance);
                                    // $("#others").val(_data.info.affiliated.others);
                                    // $("#othersFixedLoss").val(_data.info.affiliated.othersFixedLoss);
                                    // $("#othersInsurances").val(_data.info.affiliated.othersInsurances);
                                    // $("#ourArrivalAccount").val(_data.info.affiliated.ourArrivalAccount);
                                    // $("#ourFixedLoss").val(_data.info.affiliated.ourFixedLoss);
                                    // $("#ourInsurance").val(_data.info.affiliated.ourInsurance);
                                    // $("#ourTime").val(_data.info.affiliated.ourTime);
                                    // $("#personnelInjuries").val(_data.info.affiliated.personnelInjuries);
                                    // $("#personnelInjury").val(_data.info.affiliated.personnelInjury);
                                    // $("#personnelInjuryAmountDamage").val(_data.info.affiliated.personnelInjuryAmountDamage);
                                    // $("#personnelInjuryArrivalAccount").val(_data.info.affiliated.personnelInjuryArrivalAccount);
                                    // $("#personnelInjuryFixedLoss").val(_data.info.affiliated.personnelInjuryFixedLoss);
                                    // $("#personnelInjuryTime").val(_data.info.affiliated.personnelInjuryTime);
                                    // $("#placeOccurrence").val(_data.info.affiliated.placeOccurrence);
                                    // $("#proportionCompensation").val(_data.info.affiliated.proportionCompensation);
                                    // $("#we").val(_data.info.affiliated.we);
                                    // $("#time").val(_data.info.affiliated.time);
                                    // $("#weAmountDamage").val(_data.info.affiliated.weAmountDamage);
                                    // $("#responsibilityJudgement").val(_data.info.affiliated.responsibilityJudgement);
                                    // $("#othersAmountDamage").val(_data.info.affiliated.othersAmountDamage);
                                    // $("#personnelInjuryInsurance").val(_data.info.affiliated.personnelInjuryInsurance);
                                    //
                                    //
                                    // $('#othersTime,#otherTime,#ourTime,#personnelInjuryTime').datetimepicker({
                                    //     format: 'yyyy-mm-dd hh:ii',
                                    //     language: "zh-CN",
                                    //     todayButton: true
                                    // });
                                    //
                                    // $("#saveBtn").click(function (e) {
                                    //     console.log($("#we").val());
                                    //
                                    //     Tool.ajaxHelper.ajaxSubmit({
                                    //             id: _data.info.affiliated.id,
                                    //             name: _data.info.details.name,
                                    //             licensePlate: _data.info.details.licensePlate,
                                    //             placeOccurrence: _data.info.details.place,
                                    //
                                    //             accidentAnalysis: $("#accidentAnalysis").val(),
                                    //             accidentApplicationId: $("#accidentApplicationId").val(),
                                    //             amountPenalty: $("#amountPenalty").val(),
                                    //             compensationAmountTechnicians: $("#compensationAmountTechnicians").val(),
                                    //             handle: $("#handle").val(),
                                    //             kpideduction: $("#kpiDeduction").val(),
                                    //             normalDriving: $("#normalDriving").val(),
                                    //             otherAmountDamage: $("#otherAmountDamage").val(),
                                    //             otherArrivalAccount: $("#otherArrivalAccount").val(),
                                    //             otherTime: $("#otherTime").val(),
                                    //             others: $("#others").val(),
                                    //             othersAmountDamage: $("#othersAmountDamage").val(),
                                    //             othersArrivalAccount: $("#othersArrivalAccount").val(),
                                    //             othersFixedLoss: $("#othersFixedLoss").val(),
                                    //             othersInsurances: $("#othersInsurances").val(),
                                    //             othersTime: $("#othersTime").val(),
                                    //             ourArrivalAccount: $("#ourArrivalAccount").val(),
                                    //             ourFixedLoss: $("#ourFixedLoss").val(),
                                    //             ourInsurance: $("#ourInsurance").val(),
                                    //             ourTime: $("#ourTime").val(),
                                    //             personnelInjury: $("#personnelInjury").val(),
                                    //             personnelInjuryAmountDamage: $("#personnelInjuryAmountDamage").val(),
                                    //             personnelInjuryArrivalAccount: $("#personnelInjuryArrivalAccount").val(),
                                    //             personnelInjuryFixedLoss: $("#personnelInjuryFixedLoss").val(),
                                    //             personnelInjuryInsurance: $("#personnelInjuryInsurance").val(),
                                    //             personnelInjuryTime: $("#personnelInjuryTime").val(),
                                    //             proportionCompensation: $("#proportionCompensation").val(),
                                    //             responsibilityJudgement: $("#responsibilityJudgement").val(),
                                    //             we: $("#we").val(),
                                    //             weAmountDamage: $("#weAmountDamage").val(),
                                    //             time: $("#time").val(),
                                    //             personnelInjuries: $("#personnelInjuries").val(),
                                    //             otherFixedLoss: $("#otherFixedLoss").val(),
                                    //             otherInsurance: $("#otherInsurance").val(),
                                    //             other: $("#other").val()
                                    //
                                    //         },
                                    //         Api.self_test_report.update, "POST", function (_data2) {
                                    //             tips("操作成功");
                                    //             console.log($("#accidentAnalysis").val());
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
        $.get(Api.self_test.info + "/" + id, {}, function (_data) {
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
                                closeBtn:1,
                                skin: "layer-box2",
                                content: '<div class="form"><div class="title-lg">自车交通事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">自车牌照</div><input id="zcpz" type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故全景照</div></div><div id="invoce"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">受损部位照</div></div><div id="ssbwz"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $(".main-container").css("overflow","hidden");

                                    $(".layui-layer-close1").click(function(_event){
                                        layer.closeAll();
                                    });

                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime,"yyyy年MM月dd日 hh:mm"));
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    $("#zcpz").val(_data.info.details.licensePlate);
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
                                    //
                                    var jsonObj2 = JSON.parse(_data.info.details.damage);
                                    console.log(jsonObj2.length);
                                    for (var k = 0; k < jsonObj2.length; k++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj2[k] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#ssbwz').viewer();
                                            $('#ssbwz').viewer("update");
                                            // })
                                        });
                                        $("#ssbwz").append($clone);
                                    }


                                },cancel: function(index, layero){
                                    console.log("关闭了");
                                    $(".main-container").css("overflow","auto");
                                    return false;
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
                        vehicleHandleTime:parseInt(new Date().getTime()/1000)
                    },
                    Api.self_test.update, "POST", function () {
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
                    vehicleHandleTime:  parseInt(new Date().getTime()/1000)
                },
                Api.self_test.update, "POST", function () {
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

            $.get(Api.self_test.info + "/" + id, {}, function (_data) {
                switch (_data.code) {
                    case 0:
                        console.log(_data);

                        switch(_data.info.details.natureAccident){
                            case 3:
                                var affiliated = _data.info.affiliated;
                                if(isNotEmpty(affiliated.accidentAnalysis)&&isNotEmpty(affiliated.accidentAnalysisImprovementMeasures)&&isNotEmpty(affiliated.actualAmountPaid)&&isNotEmpty(affiliated.auditorId)&&isNotEmpty(affiliated.companyLostMonkey)&&isNotEmpty(affiliated.companyTechnician)&&isNotEmpty(affiliated.customerMoney)&&isNotEmpty(affiliated.customerUnit)&&isNotEmpty(affiliated.customerVehicleDamageDescription)&&isNotEmpty(affiliated.customerVehiclesDamage)&&isNotEmpty(affiliated.customerVehiclesFixedLoss)&&isNotEmpty(affiliated.depreciationExpenses)&&isNotEmpty(affiliated.dzje4)&&isNotEmpty(affiliated.dzrq4)&&isNotEmpty(affiliated.injured)&&isNotEmpty(affiliated.insuranceDeductibleAmount)&&isNotEmpty(affiliated.insurancePaymentsMoney)&&isNotEmpty(affiliated.insurancePaymentsTime)&&isNotEmpty(affiliated.kpi)&&isNotEmpty(affiliated.newOld)&&isNotEmpty(affiliated.otherInjuries)&&isNotEmpty(affiliated.otherMoney)&&isNotEmpty(affiliated.ourMoney)&&isNotEmpty(affiliated.ourVehiclesDamage)&&isNotEmpty(affiliated.peopleInjure)&&isNotEmpty(affiliated.peopleMoney)&&isNotEmpty(affiliated.place)&&isNotEmpty(affiliated.settlementMonkey)&&isNotEmpty(affiliated.taskType)&&isNotEmpty(affiliated.techniciansMonkey)&&isNotEmpty(affiliated.techniciansPunishmentMonkey)&&isNotEmpty(affiliated.techniciansRatio)&&isNotEmpty(affiliated.vehicleModels)&&isNotEmpty(affiliated.financialname)&&isNotEmpty(affiliated.dfpfdzrq)&&isNotEmpty(affiliated.dfpfdzje)&&isNotEmpty(affiliated.skje)){
                                    tool.ajaxHelper.ajaxSubmit({
                                        id: id,
                                        start: 5,
                                        userId: userId
                                    }, Api.self_test.update, "POST", function (_data) {
                                        switch (_data.code) {
                                            case 0:
                                                tips("操作成功");
                                                list.bootstrapTableTemplateQuery({});
                                                break;
                                        }
                                    });
                                }else if(!isNotEmpty(affiliated.financialname)) {
                                    inquiry("财务填写完后方可确认完成！",function(){
                                        parent.layer.closeAll();
                                    });
                                }else{

                                    inquiry("请全部填写表格数据后再确认完成！",function(){
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

        $.get(Api.self_test.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    switch (_data.info.details.natureAccident) {
                        case 3:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="jtsgForm"class="form"><div class="title-lg">自车交通事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"v-model="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""v-bind:value="cph"v-model="cph"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="sgfssj"v-model="sgfssj"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly v-bind:value="sgfsdd"v-model="sgfsdd"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我司车辆是否能正常行驶</div><select id="normalDriving"class="form-control width-1"v-bind:value="zcxs"v-model="zcxs"><option value="1">是</option><option value="2">否</option></select></div><div class="tdBox-2"><div class="title-sm title-right">是否有人员受伤</div><select id="personnelInjury"class="form-control width-1"v-bind:value="ryss"v-model="ryss"><option value="1">是</option><option value="2">否</option></select></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">交警责任判定</div><textarea class="form-control ver-top width-2"id="responsibilityJudgement"name="deblock_udid"rows="5"v-bind:value="jjzrpd"v-model="jjzrpd"></textarea></div></div></div></div><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="we"name="deblock_udid"rows="5"v-bind:value="wfclssqk"v-model="wfclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="weAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje1"v-model="ssje1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方车辆损伤情况</div><textarea class="form-control ver-top width-1"id="other"name="deblock_udid"rows="5"v-bind:value="dfclssqk"v-model="dfclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="others"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="othersAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje3"v-model="ssje3"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤情况</div><textarea class="form-control ver-top width-1"id="personnelInjuries"name="deblock_udid"rows="5"v-bind:value="ryssqk"v-model="ryssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="personnelInjuryAmountDamage"class="form-control width-1"placeholder=""v-bind:value="ssje4"v-model="ssje4"></div></div></div></div><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select id="handle"class="form-control width-3"v-bind:value="clry"v-model="clry"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpiDeduction"type="text"class="form-control width-3"placeholder=""v-bind:value="kpi"v-model="kpi"></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input id="amountPenalty"type="text"class="form-control width-3"placeholder=""v-bind:value="jscfje"v-model="jscfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="proportionCompensation"class="form-control width-1"placeholder=""v-bind:value="jscdpfbl"v-model="jscdpfbl"></div><div class="tdBox-2"><div class="title-sm title-right">技师承担金额</div><input type="text"id="compensationAmountTechnicians"class="form-control width-1"placeholder=""v-bind:value="jspcje"v-model="jspfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">我方定损金额</div><input type="text"id="ourFixedLoss"class="form-control width-1"placeholder=""v-bind:value="wfdsje"v-model="wfdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="ourInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje"v-model="bxpfje"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="ourTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq"v-model="dzrq"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="ourArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje"v-model="dzje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方定损金额</div><input type="text"id="otherFixedLoss"class="form-control width-1"placeholder=""v-bind:value="dfdsje"v-model="dfdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="otherInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje6"v-model="bxpfje6"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="otherTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq2"v-model="dzrq2"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="otherArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje2"v-model="dzje2"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤定损金额</div><input type="text"id="othersFixedLoss"class="form-control width-1"placeholder=""v-bind:value="qtssdsje"v-model="qtssdsje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="othersInsurances"class="form-control width-1"placeholder=""v-bind:value="bxpfje2"v-model="bxpfje2"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="othersTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq5"v-model="dzrq5"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"id="othersArrivalAccount"class="form-control width-1"placeholder=""v-bind:value="dzje3"v-model="dzje3"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">人员受伤金额</div><input type="text"id="personnelInjuryFixedLoss"class="form-control width-1"placeholder=""v-bind:value="ryssje"v-model="ryssje"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="personnelInjuryInsurance"class="form-control width-1"placeholder=""v-bind:value="bxpfje3"v-model="bxpfje3"></div><div class="tdBox-2"><div class="title-sm title-left">到账日期</div><input type="text"class="form-control width-1"id="personnelInjuryTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dzrq4"v-model="dzrq4"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">到账金额</div><input type="text"class="form-control width-1"id="personnelInjuryArrivalAccount"placeholder=""v-bind:value="dzje4"v-model="dzje4"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">对方赔付到账日期</div><input type="text"class="form-control width-1"id="oppositeTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="dfpfdzrq"v-model="dfpfdzrq"v-on:click="timeClick"></div><div class="tdBox-2"><div class="title-sm title-right">对方赔付到账金额</div><input type="text"class="form-control width-1"id="oppositeArrivalAccount"placeholder=""v-bind:value="dfpfdzje"v-model="dfpfdzje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input type="text"id="gsssje"class="form-control width-1"placeholder=""v-bind:value="gsssje"v-model="gsssje"></div><div class="tdBox-2"><div class="title-sm title-right">三方委托赔付</div><select id="sfwtpf"class="form-control width-1"><option value="1">是</option><option value="2">否</option></select></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysis"name="deblock_udid"rows="5"v-bind:value="sgfx"v-model="sgfx"></textarea></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">车管姓名</div><input id="cgxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div><div class="tdBox-2"><div class="title-sm fontNum4">财务姓名</div><input id="cwxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cwxm"v-model="cwxm"readonly></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">支付方式</div><select class="form-control width-1"id="payType"v-bind:value="zffs"v-model="zffs"readonly><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"v-bind:value="zfje"v-model="zfje"readonly></div></div><div class="trBox"v-show="zffs==2||zffs==\'2\'"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"v-bind:value="kh"v-model="kh"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"v-bind:value="khh"v-model="khh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"v-bind:value="blry"v-model="blry"><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"v-bind:value="nbryxm"v-model="nbryxm"placeholder="姓名"v-if="blry==2||blry==\'2\'"><button id="idcardImg"type="button"class="btn btn-primary"v-else-if="blry==1||blry==\'1\'"v-show="false">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"v-bind:value="cwbz"v-model="cwbz"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary"v-show="isAccidentFinanceSelfTest">拍照</button></div><div class="imgField2"></div></div></div></div></div>',
                                success: function (_layero, _index) {

                                    var jtsgVue = new Vue({
                                        el:"#jtsgForm",
                                        data:{
                                            //基础信息
                                            bridgeFinance:true,
                                            jsxm:_data.info.details.name,
                                            cph:_data.info.details.licensePlate,
                                            sgfssj:tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime,"yyyy年MM月dd日 hh:mm"),
                                            sgfsdd:_data.info.details.place,

                                            //填写信息
                                            zcxs:_data.info.affiliated.newOld,        //是否正常行驶
                                            ryss:_data.info.affiliated.taskType,            //是否有人受伤
                                            jjzrpd:_data.info.affiliated.place,      //交警责任判定
                                            wfclssqk:_data.info.affiliated.customerUnit,  //我方车辆受损情况
                                            ssje1:_data.info.affiliated.companyTechnician,               //我方车辆受损情况损伤金额1
                                            dfclssqk:_data.info.affiliated.vehicleModels,        //对方车辆受损情况
                                            ssje2:_data.info.affiliated.customerVehiclesDamage,           //对方车辆受损情况损伤金额2
                                            qtss:_data.info.affiliated.ourVehiclesDamage,                //其他损伤
                                            ssje3:_data.info.affiliated.injured,                   //其他损伤金额
                                            ryssqk:_data.info.affiliated.customerVehicleDamageDescription,          //人员受伤情况
                                            ssje4:_data.info.affiliated.customerMoney,               //人员受伤情况金额
                                            clry:_data.info.affiliated.auditorId,            //处理人员
                                            kpi:_data.info.affiliated.kpi,                 //技师KPI扣分
                                            jscfje:_data.info.affiliated.ourMoney,          //技师处罚金额
                                            jspcje:_data.info.affiliated.jspcje,              //技师赔偿金额
                                            jscdpfbl:_data.info.affiliated.otherInjuries,        //技师承担赔付比例
                                            jspfje:_data.info.affiliated.otherMoney,              //技师赔付金额
                                            wfdsje:_data.info.affiliated.peopleMoney,              //我放定损金额
                                            bxpfje:_data.info.affiliated.techniciansPunishmentMonkey,              //我方定损保险赔付金额
                                            dzrq:_data.info.affiliated.customerVehiclesFixedLoss,            //到账日期
                                            dzje:_data.info.affiliated.actualAmountPaid,        //到账日期到账金额
                                            dfdsje:_data.info.affiliated.insuranceDeductibleAmount,          //对方定损金额
                                            bxpfje6:_data.info.affiliated.depreciationExpenses,              //对方定损保险赔付金额
                                            dzrq2:_data.info.affiliated.insurancePaymentsTime,                    //保险赔付金额到账日期
                                            dzje2:_data.info.affiliated.insurancePaymentsMoney,           //保险赔付金额到账金额
                                            qtssdsje:_data.info.affiliated.companyLostMonkey,        //其他损伤定损金额
                                            bxpfje2:_data.info.affiliated.accidentAnalysisImprovementMeasures,         //其他损伤定损金额保险赔付金额
                                            dzje3:_data.info.affiliated.techniciansRatio,           //其他损伤定损金额到账金额
                                            dzrq5:_data.info.affiliated.techniciansMonkey,               //其他损伤定损金额到账日期
                                            ryssje:_data.info.affiliated.settlementMonkey,              //人员受伤金额
                                            bxpfje3:_data.info.affiliated.peopleInjure,             //人员受伤金额保险赔付金额
                                            dzrq4:_data.info.affiliated.dzrq4,               //人员受伤金额到账日期
                                            dzje4:_data.info.affiliated.dzje4,               //人员手上金额到账金额
                                            sgfx:_data.info.affiliated.accidentAnalysis,            //事故分析
                                            dfpfdzrq:_data.info.affiliated.dfpfdzrq,    // 对方赔付到账日期
                                            dfpfdzje:_data.info.affiliated.dfpfdzje,    // 对方赔付到账金额
                                            gsssje:_data.info.affiliated.gsssje,        //公司损失金额
                                            sfwtpf:_data.info.affiliated.sfwtpf,        //三方委托赔付

                                            cgxm:_data.info.affiliated.vehicleSubName, //  车管姓名

                                            zffs:_data.info.affiliated.payType,  //  支付方式
                                            zfje:_data.info.affiliated.payment,  //  支付金额
                                            kh: _data.info.affiliated.bankcardid,  //  卡号
                                            khh: _data.info.affiliated.bankname, //  开户行
                                            blry:_data.info.affiliated.acceptingOfficer,  //  办理人员

                                            followList: _data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[],

                                            nbryxm:_data.info.affiliated.insider,  //  内部人员姓名
                                            cwxm:_data.info.affiliated.financialname,  //  财务姓名
                                            cwbz:_data.info.affiliated.financialremarks,  //  财务备注

                                            skje:_data.info.affiliated.skje    // 收款金额

                                        },
                                        methods:{
                                            timeClick:function(_event){
                                                console.log(_event.target);
                                            }
                                        }
                                    });

                                    //报销单照片
                                    var expensephoto = _data.info.affiliated.expensephoto?JSON.parse(_data.info.affiliated.expensephoto):null;
                                    console.log(typeof expensephoto)
                                    if(expensephoto&&expensephoto!=null) {
                                        for(var i = 0; i < expensephoto.length; i++) {
                                            var $imgItem = $("<img style='width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;'>").attr("src",baseURL+ expensephoto[i]);
                                            $(".imgField2").append($imgItem);
                                        }
                                    }


                                    //身份证照片
                                    var idphoto = _data.info.affiliated.idphoto?JSON.parse(_data.info.affiliated.idphoto):null;
                                    if(idphoto&&idphoto!=null) {
                                        for(var i = 0; i < idphoto.length; i++) {
                                            var $imgItem = $("<img style='width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;'>").attr("src", baseURL+idphoto[i]);
                                            $(".imgField1").append($imgItem);
                                        }
                                    }


                                    $("#jtsgForm input,#jtsgForm textarea").attr("readonly","readonly");
                                    $("#jtsgForm select").attr("disabled","disabled");

                                }
                            });
                            break;
                    }

                    break;
            }
        });


    });

    //提醒车管
    $(".remindFaultManage").click(function() {
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

            $.get(Api.self_test.info + "/" + id, {}, function (_data) {
                console.log(_data);

                Tool.ajaxHelper.ajaxSubmit({
                        id: id,
                        reminderTime: tool.dataHelper.timeStampToDateFormat(parseInt(new Date().getTime()/1000),"yyyy年MM月dd日 hh:mm")
                    },
                    Api.self_test.update, "POST", function (_data2) {
                        // console.log(_data.info.details.reminderTime);
                        // list.bootstrapTableTemplateQuery({});
                    }
                );

            });

            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id
                },
                Api.self_test.remindVehicle, "POST", function () {
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