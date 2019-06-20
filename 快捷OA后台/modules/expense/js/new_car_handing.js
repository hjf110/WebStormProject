var list = null;
var vueSelf = null;
var controller = "";
var accidentId = null;
var accidentCheck = 1;
var accidentFinanceNewCarCheck = 1;
var defaultState = 1;

var isFaultDriverNewCarCheck = false;
var isFaultManageNewCarCheck = false;
var isFaultDispatchNewCarCheck = false;
var isFaultSalesmanNewCarCheck = false;
var isAccidentObservationNewCarCheck = false;
var isAccidentFinanceNewCarCheck = false;
var userId = userInfo.structureUserId;
var vueObj;

isFaultDriverNewCarCheck = userRoleList.indexOf(config.faultDriverNewCarCheck) > -1;
isFaultManageNewCarCheck = userRoleList.indexOf(config.faultManageNewCarCheck) > -1;
isFaultDispatchNewCarCheck = userRoleList.indexOf(config.faultDispatchNewCarCheck) > -1;
isFaultSalesmanNewCarCheck = userRoleList.indexOf(config.faultSalesmanNewCarCheck) > -1;
isAccidentObservationNewCarCheck = userRoleList.indexOf(config.accidentObservationNewCarCheck) > -1;
isAccidentFinanceNewCarCheck = userRoleList.indexOf(config.accidentFinanceNewCarCheck) > -1;


console.log(isFaultDriverNewCarCheck);
console.log(isFaultManageNewCarCheck);
console.log(isFaultDispatchNewCarCheck);
console.log(isFaultSalesmanNewCarCheck);
console.log(isAccidentFinanceNewCarCheck);


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
            accidentFinanceNewCarCheck: accidentFinanceNewCarCheck,
            nowState: defaultState,
            sheetData: [],
            isFaultDriverNewCarCheck: isFaultDriverNewCarCheck,
            isFaultManageNewCarCheck: isFaultManageNewCarCheck,
            isFaultDispatchNewCarCheck: isFaultDispatchNewCarCheck,
            isFaultSalesmanNewCarCheck: isFaultSalesmanNewCarCheck,
            isAccidentObservationNewCarCheck: isAccidentObservationNewCarCheck,
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
        url: Api.new_car_handing.list,
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
                    return "新车装卸";
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
                        case 4:
                            return '<span class="label label-danger">任务继续</span>';
                            break;
                        // case 3:
                        //     return '<span class="label label-danger">已调度</span>';
                        //     break;
                        // case 4:
                        //     return '<span class="label label-danger">继续跑</span>';
                        //     break;
                        case 5:
                            return '<span class="label label-danger">任务完成</span>';
                            ;
                            break;
                        case 10:
                            return '<span class="label label-danger">事故车拖回</span>';
                            break;
                        case 11:
                            return '<span class="label label-danger">事故车留存</span>';
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

            if (parseInt(data[0].start) == 2 || parseInt(data[0].start) == 10) {
                console.log(userInfo);
                Tool.ajaxHelper.ajaxSubmit({
                        id: data[0].id,
                        dispatchName: userInfo.suName,
                        dispatchId: userInfo.structureUserId,
                        dispatchTime: Math.ceil(new Date().getTime() / 1000),
                    },
                    Api.new_car_handing.update, "POST", function () {
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
            //         Api.new_car_handing.update, "POST", function () {
            //             tips("调度成功");
            //             list.bootstrapTableTemplateQuery({});
            //         }
            //     );
            //     console.log("调度完成");
            // }
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
                Api.new_car_handing.update, "POST", function () {
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
                Api.new_car_handing.update, "POST", function () {
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
                Api.new_car_handing.update, "POST", function () {
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

        $.get(Api.new_car_handing.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    switch (_data.info.details.natureAccident) {
                        case 4:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box2",
                                content: '<div id="xcjczxsgFormBox"class="form"><div id="printManager"><div class="title-lg">新车检查装卸事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""v-bind:value="cph"v-model="cph"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="sgfssj"></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly v-bind:value="sgfsdd"></textarea></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="khdw"v-model="khdw"></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""v-bind:value="ddbh"v-model="ddbh"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">车架号</div><input id="cjh"type="text"class="form-control width-1"style="display:inline-block"v-show="bridgeFinance"v-bind:value="cjh"v-model="cjh"></div><div class="tdBox-2"><div class="title-sm title-right">客户车辆品牌</div><input id="khclpp"type="text"class="form-control width-1"placeholder=""v-bind:value="khclpp"v-model="khclpp"></div></div><div class="trBox trRemove"><div class="tdBox-2"><div class="title-sm title-left">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""v-bind:value="xh"v-model="xh"></div><div class="tdBox-2"><div class="title-sm ver-top title-right">客户车辆受损部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""v-bind:value="khclssbw"v-model="khclssbw"></div></div></div></div><div class="partBox damageSituation trRemove"><div class="title-md">业务员处理信息</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">业务员姓名</div><input type="text"id="ywyxm"class="form-control width-1"readonly placeholder=""v-bind:value="ywyxm"v-model="ywyxm"></div><div class="tdBox-2"><div class="title-sm title-right">业务员处理时间</div><input type="text"id="ywyclsj"readonly class="form-control width-1"placeholder=""v-bind:value="ywyclsj"v-model="ywyclsj"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">业务员处理意见</div><textarea class="form-control ver-top width-2"id="ywyclyj"name="deblock_udid"readonly rows="5"v-bind:value="ywyclyj"v-model="ywyclyj"></textarea></div></div></div></div><div class="partBox damageSituation trRemove"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="khclssqk"v-model="khclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""v-bind:value="ssje1"v-model="ssje1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div></div></div><div class="partBox compensationSituation trRemove"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"v-bind:value="clry"v-model="clry"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""v-bind:value="kpi"v-model="kpi"></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""v-bind:value="jscfje"v-model="jscfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""v-bind:value="jscdpfbl"v-model="jscdpfbl"></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""v-bind:value="jspfje"v-model="jspfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""v-bind:value="khclwxfy"v-model="khclwxfy"></div><div class="tdBox-2"><div class="title-sm title-right">折损费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""v-bind:value="zkfy"v-model="zkfy"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""v-bind:value="bxlpje"v-model="bxlpje"></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""v-bind:value="bxmpje"v-model="bxmpje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="bxpfdzrq"v-model="bxpfdzrq"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""v-bind:value="bxpfje"v-model="bxpfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""v-bind:value="gsssje"v-model="gsssje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">与客户沟通经过描述</div><textarea class="form-control ver-top width-2"id="ykhgtjgms"name="deblock_udid"rows="5"v-bind:value="ykhgtjgms"v-model="ykhgtjgms"></textarea></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div><div class="followUpEdit trfollow"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"id="jdms"class="form-control width-1"placeholder=""v-bind:value="jdms"v-model="jdms"></div><button id="followUp"type="button"class="btn btn-primary"v-on:click="followUpBtn">跟进</button><div class="tdBox-2"><input type="text"id="gjsj"class="form-control width-1"placeholder=""v-bind:value="gjsj"v-model="gjsj"style="display:none"></div></div></div></div></div><div class="partBox accidentAnalysis trRemove"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"v-bind:value="sgfxjgjcs"v-model="sgfxjgjcs"></textarea></div></div></div></div></div><div class="partBox processingPersonnel"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">车管姓名</div><input id="cgxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div><div class="tdBox-2"><div class="title-sm fontNum4">财务姓名</div><input id="cwxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cwxm"v-model="cwxm"readonly></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id="">支付方式</div><select class="form-control width-1"id="payType"v-bind:value="zffs"v-model="zffs"><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"v-bind:value="zfje"v-model="zfje"></div></div><div class="trBox"v-show="zffs==2||zffs==\'2\'"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"v-bind:value="kh"v-model="kh"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"v-bind:value="khh"v-model="khh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"v-bind:value="blry"v-model="blry"><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"v-bind:value="nbryxm"v-model="nbryxm"placeholder="姓名"v-if="blry==2||blry==\'2\'"><button id="idcardImg"type="button"class="btn btn-primary trRemove"v-else-if="blry==1||blry==\'1\'"v-on:click="takeIdPhoto">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox trRemove"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"v-bind:value="cwbz"v-model="cwbz"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary trRemove"v-show="isAccidentFinanceNewCarCheck"v-on:click="takePhotos">拍照</button></div><div class="imgField"></div></div><div class="trBox"><div class="imgField2"></div></div></div></div><div class="buttonBox trRemove"><button id="completePayment"class="button1 btnBlue"v-show="isAccidentFinanceNewCarCheck"v-on:click="completePaymentClick">支付完成</button><button id="completeCollection"class="button1 btnBlue"v-on:click="completeCollectionClick"style="display:none;">收款完成</button><button id="printExpenseAccountManager"class="button1 btnBlue"v-on:click="printManagerClick"style="display:none;">打印</button><button id="printExpenseAccountFinance"class="button1 btnBlue"v-on:click="printFinanceClick"v-show="isAccidentFinanceNewCarCheck">打印</button><button id="saveBtn"class="button1"v-on:click="saveBtn">保存并关闭</button></div></div>',
                                success: function (_layero, _index) {
                                    $(".layui-layer-setwin").css("z-index", "9999999999999999");
                                    $(".layui-layer-setwin").click(function (_event) {
                                        layer.closeAll();
                                        $(".layui-layer-setwin").remove();
                                    });

                                    if(!isAccidentFinanceNewCarCheck) {

                                        $(".financialPayment input,.financialPayment textarea").attr("readonly", "readonly");
                                        $(".financialPayment select").attr("disabled","disabled");
                                        $("#uploadImg,#idcardImg").css("display", "none");

                                    } else {
                                        $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea").attr("readonly", "readonly");
                                        $(".basicInfo select,.damageSituation select,.compensationSituation select").attr("disabled","disabled");
                                    }

                                    var xcVue = new Vue({
                                        el: "#xcjczxsgFormBox",
                                        data: {
                                            bridgeFinance: true,
                                            jsxm: _data.info.details.name,
                                            cph: _data.info.details.licensePlate,
                                            sgfssj: tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"),
                                            sgfsdd: _data.info.details.place,
                                            khdw: _data.info.details.customerUnit,

                                            cjh: _data.info.affiliated.frame,
                                            khclpp: _data.info.affiliated.injured,
                                            ywyxm: _data.info.details.salesmanName,
                                            ywyclsj: _data.info.details.vehicleHandleTime ? tool.dataHelper.timeStampToDateFormat(_data.info.details.vehicleHandleTime, "yyyy年MM月dd日 hh:mm") : "暂无处理时间",
                                            ywyclyj: _data.info.details.remark,
                                            ykhgtjgms: _data.info.affiliated.peopleInjure,
                                            bxpfdzrq: _data.info.affiliated.ourVehiclesDamage,

                                            sgfxjgjcs: _data.info.affiliated.accidentAnalysisImprovementMeasures,
                                            gsssje: _data.info.affiliated.companyLostMonkey,
                                            clry: _data.info.affiliated.companyTechnician,
                                            ssje1: _data.info.affiliated.customerMoney,
                                            khclssbw: _data.info.affiliated.customerVehicleDamageDescription,
                                            khclssqk: _data.info.affiliated.customerVehiclesDamage,
                                            khclwxfy: _data.info.affiliated.customerVehiclesFixedLoss,
                                            zkfy: _data.info.affiliated.depreciationExpenses,
                                            bxmpje: _data.info.affiliated.insuranceDeductibleAmount,
                                            bxpfje: _data.info.affiliated.insurancePaymentsMoney,
                                            kpi: _data.info.affiliated.kpi,
                                            ddbh: _data.info.affiliated.orderNumber,
                                            qtss: _data.info.affiliated.otherInjuries,
                                            ssje2: _data.info.affiliated.otherMoney,
                                            jscfje: _data.info.affiliated.techniciansPunishmentMonkey,
                                            xh: _data.info.affiliated.vehicleModels,
                                            jscdpfbl: _data.info.affiliated.techniciansRatio,
                                            jspfje: _data.info.affiliated.techniciansMonkey,
                                            bxlpje: _data.info.affiliated.settlementMonkey,

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
                                        methods: {
                                            completeCollectionClick: function() {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.new_car_handing.collectionCompleted, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            completePaymentClick: function() {
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id
                                                    },
                                                    Api.new_car_handing.confirmPayment, "POST", function () {
                                                        tips("操作成功");
                                                    }
                                                );
                                                console.log("完成");
                                            },
                                            printManagerClick:function() {
                                                console.log("车管打印开始");



                                                //获取值
                                                // var payType = $("#payType").find("option:selected").text();
                                                var jsxm = $("#jsxm").val();//1
                                                var cph = $("#cph").val();//2
                                                var endTime = $("#endTime").val();//3
                                                var sgfsdd = $("#sgfsdd").val();//4
                                                var orderNumber = $("#orderNumber").val();//5
                                                var customerUnit = $("#customerUnit").val();//6

                                                var cjh = $("#cjh").val();//7
                                                var khclpp = $("#khclpp").val();//8
                                                var vehicleModels = $("#vehicleModels").val();//9
                                                var customerVehicleDamageDescription = $("#customerVehicleDamageDescription").val();//10
                                                var ywyxm = $("#ywyxm").val();//11
                                                var ywyclsj = $("#ywyclsj").val();//12
                                                var ywyclyj = $("#ywyclyj").val();//13
                                                var customerVehiclesDamage = $("#customerVehiclesDamage").val();//14
                                                var customerMoney = $("#customerMoney").val();//15
                                                var otherInjuries = $("#otherInjuries").val();//16
                                                var otherMoney = $("#otherMoney").val();//17
                                                var companyTechnician = $("#companyTechnician").find("option:selected").text();//20
                                                var kpi = $("#kpi").val();//21
                                                var techniciansPunishmentMonkey = $("#techniciansPunishmentMonkey").val();//22
                                                var techniciansRatio = $("#techniciansRatio").val();//23
                                                var techniciansMonkey = $("#techniciansMonkey").val();//24
                                                var customerVehiclesFixedLoss = $("#customerVehiclesFixedLoss").val();//25

                                                var depreciationExpenses = $("#depreciationExpenses").val();//26
                                                var settlementMonkey = $("#settlementMonkey").val();//27
                                                var insuranceDeductibleAmount = $("#insuranceDeductibleAmount").val();//28
                                                var insurancePaymentsTime = $("#insurancePaymentsTime").val();//29

                                                var insurancePaymentsMoney = $("#insurancePaymentsMoney").val();//30
                                                var companyLostMonkey = $("#companyLostMonkey").val();//31
                                                var ykhgtjgms = $("#ykhgtjgms").val();//32
                                                var accidentAnalysisImprovementMeasures = $("#accidentAnalysisImprovementMeasures").val();//33
                                                var cgxm = $("#cgxm").val();//34



                                                $.cookie("jsxm", jsxm, {path: '/'});
                                                $.cookie("cph", cph, {path: '/'});
                                                $.cookie("endTime", endTime, {path: '/'});
                                                $.cookie("sgfsdd", sgfsdd, {path: '/'});
                                                $.cookie("customerUnit", customerUnit, {path: '/'});
                                                $.cookie("orderNumber", orderNumber, {path: '/'});
                                                $.cookie("cjh", cjh, {path: '/'});
                                                $.cookie("khclpp", khclpp, {path: '/'});
                                                $.cookie("vehicleModels", vehicleModels, {path: '/'});
                                                $.cookie("customerVehicleDamageDescription", customerVehicleDamageDescription, {path: '/'});
                                                $.cookie("ywyxm", ywyxm, {path: '/'});
                                                $.cookie("ywyclsj", ywyclsj, {path: '/'});
                                                $.cookie("ywyclyj", ywyclyj, {path: '/'});
                                                $.cookie("customerVehiclesDamage", customerVehiclesDamage, {path: '/'});
                                                $.cookie("customerMoney", customerMoney, {path: '/'});
                                                $.cookie("otherInjuries", otherInjuries, {path: '/'});
                                                $.cookie("otherMoney", otherMoney, {path: '/'});
                                                $.cookie("companyTechnician", companyTechnician, {path: '/'});
                                                $.cookie("kpi", kpi, {path: '/'});
                                                $.cookie("techniciansPunishmentMonkey", techniciansPunishmentMonkey, {path: '/'});
                                                $.cookie("techniciansRatio", techniciansRatio, {path: '/'});
                                                $.cookie("techniciansMonkey", techniciansMonkey, {path: '/'});
                                                $.cookie("customerVehiclesFixedLoss", customerVehiclesFixedLoss, {path: '/'});
                                                $.cookie("depreciationExpenses", depreciationExpenses, {path: '/'});
                                                $.cookie("settlementMonkey", settlementMonkey, {path: '/'});
                                                $.cookie("insuranceDeductibleAmount", insuranceDeductibleAmount, {path: '/'});
                                                $.cookie("insurancePaymentsTime", insurancePaymentsTime, {path: '/'});
                                                $.cookie("insurancePaymentsMoney", insurancePaymentsMoney, {path: '/'});
                                                $.cookie("companyLostMonkey", companyLostMonkey, {path: '/'});
                                                $.cookie("ykhgtjgms", ykhgtjgms, {path: '/'});
                                                $.cookie("accidentAnalysisImprovementMeasures", accidentAnalysisImprovementMeasures, {path: '/'});
                                                $.cookie("cgxm", cgxm, {path: '/'});




                                                window.open("new_car_handing_cgdy.html");
























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

                                               // var xmname = $.cookie("xmname");
                                                $.cookie("xmname", "新车检查装卸事故报销单", {path: '/'});
                                                //跳转到一个新的页面
                                                window.open("old_car_accident_cwdy.html");


                                                // var loading = tool.loading();
                                                // var $printFinance = $("#xcjczxsgFormBox");
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
                                              //  });
                                            },
                                            saveBtn: function (_event) {
                                                console.log("aaaxxx");
                                                var _this = this;
                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.details.id,
                                                        licensePlate:_this.cph
                                                    },
                                                    Api.new_car_handing.update, "POST", function (_data2) {
                                                        // list.bootstrapTableTemplateQuery({});
                                                    }
                                                );

                                                Tool.ajaxHelper.ajaxSubmit({
                                                        id: _data.info.affiliated.id,
                                                        name: _data.info.details.name,
                                                        licensePlateNumber: _data.info.details.licensePlate,
                                                        place: _data.info.details.place,
                                                        customerUnit: _data.info.details.customerUnit,

                                                        accidentAnalysisImprovementMeasures: _this.sgfxjgjcs,
                                                        // accidentApplicationId: $("#accidentApplicationId").val(),
                                                        // actualAmountPaid: $("#actualAmountPaid").val(),
                                                        // auditorId: $("#auditorId").val(),
                                                        companyLostMonkey: _this.gsssje,
                                                        companyTechnician: _this.clry,
                                                        customerMoney: _this.ssje1,

                                                        peopleInjure: _this.ykhgtjgms,
                                                        ourVehiclesDamage: $("#insurancePaymentsTime").val(),
                                                        frame: _this.cjh,
                                                        injured: _this.khclpp,
                                                        customerVehicleDamageDescription: _this.khclssbw,
                                                        customerVehiclesDamage: _this.khclssqk,
                                                        customerVehiclesFixedLoss: _this.khclwxfy,
                                                        depreciationExpenses: _this.zkfy,
                                                        insuranceDeductibleAmount: _this.bxmpje,
                                                        insurancePaymentsMoney: _this.bxpfje,
                                                        insurancePaymentsTime: _this.bxpfdzrq,
                                                        kpi: _this.kpi,
                                                        otherMoney: _this.ssje2,
                                                        otherInjuries: _this.qtss,
                                                        orderNumber: _this.ddbh,
                                                        techniciansPunishmentMonkey: _this.jscfje,
                                                        vehicleModels: _this.xh,
                                                        techniciansRatio: _this.jscdpfbl,
                                                        techniciansMonkey: _this.jspfje,
                                                        settlementMonkey: _this.bxlpje,

                                                        vehicleSubName: isFaultManageNewCarCheck?userInfo.suName:_this.vehicleSubName,  //车管
                                                        financialname:isAccidentFinanceNewCarCheck?userInfo.suName:_this.financialname,  //  财务姓名
                                                        payType: _this.zffs,  //  支付方式
                                                        payment: _this.zfje,  //  支付金额
                                                        bankcardid: _this.kh,  //  卡号
                                                        bankname: _this.khh, //  开户行
                                                        acceptingOfficer: _this.blry,  //  办理人员

                                                        progressdescription:_this.jdms,  //  进度描述
                                                        followtime:_this.gjsj,  //  跟进时间
                                                        jdmsArrayStr:JSON.stringify(_this.followList),

                                                        insider:_this.nbryxm,  //  内部人员姓名
                                                        financialremarks: _this.cwbz, //  财务备注
                                                        idphoto: typeof _this.sfzz == "string"?_this.sfzz:JSON.stringify(_this.sfzz),   //  身份证照片
                                                        skje:_this.skje,    // 收款金额
                                                        expensephoto: JSON.stringify(_this.bxdzp) //  报销单照片

                                                    },
                                                    Api.new_car_handing_report.update, "POST", function (_data2) {
                                                        layer.closeAll();
                                                        tips("操作成功");
                                                        console.log($("#accidentAnalysis").val());
                                                        list.bootstrapTableTemplateQuery({});
                                                    }
                                                );
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

                                                                    var $item = $(e).attr("src", baseURL+_e.data[i]);
                                                                    $(".imgField1").append($item);
                                                                });
                                                                $(".imgField1>img").click(function(){
                                                                    window.open($(this).attr("src"),"_blank")
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
                                            }
                                        }
                                    });

                                    //财务收款完成按钮
                                    $(".financialPayment input, .financialPayment textarea, .financialPayment select").on("input", function() {
                                        if(isAccidentFinanceNewCarCheck&&($("#amountCollected").val() > 0)&&($("#payment").val() == 0)) {
                                            console.log("按钮出现");
                                            $("#completeCollection").css("display", "inline-block");
                                        } else {
                                            console.log("按钮消失");
                                            $("#completeCollection").css("display", "none");
                                        }
                                    });
                                    if(isAccidentFinanceNewCarCheck&&($("#amountCollected").val() > 0)&&($("#payment").val() == 0)) {
                                        console.log("按钮出现");
                                        $("#completeCollection").css("display", "inline-block");
                                    } else {
                                        console.log("按钮消失");
                                        $("#completeCollection").css("display", "none");
                                    }

                                    //车管全部填写完后，出现打印按钮
                                    $(".basicInfo input,.basicInfo textarea,.damageSituation input,.damageSituation textarea,.compensationSituation input,.compensationSituation textarea,.accidentAnalysis textarea,.basicInfo select,.damageSituation select,.compensationSituation select").on("input", function() {
                                        if(isFaultManageNewCarCheck&&isNotEmpty($("#orderNumber").val())&&isNotEmpty($("#cjh").val())&&isNotEmpty($("#khclpp").val())&&isNotEmpty($("#vehicleModels").val())&&isNotEmpty($("#customerVehicleDamageDescription").val())&&isNotEmpty($("#ywyxm").val())&&isNotEmpty($("#ywyclsj").val())&&isNotEmpty($("#ywyclyj").val())&&isNotEmpty($("#customerVehiclesDamage").val())&&isNotEmpty($("#customerMoney").val())&&isNotEmpty($("#otherInjuries").val())&&isNotEmpty($("#otherMoney").val())&&isNotEmpty($("#companyTechnician").val())&&isNotEmpty($("#kpi").val())&&isNotEmpty($("#techniciansPunishmentMonkey").val())&&isNotEmpty($("#techniciansRatio").val())&&isNotEmpty($("#techniciansMonkey").val())&&isNotEmpty($("#customerVehiclesFixedLoss").val())&&isNotEmpty($("#depreciationExpenses").val())&&isNotEmpty($("#settlementMonkey").val())&&isNotEmpty($("#insuranceDeductibleAmount").val())&&isNotEmpty($("#insurancePaymentsTime").val())&&isNotEmpty($("#insurancePaymentsMoney").val())&&isNotEmpty($("#companyLostMonkey").val())&&isNotEmpty($("#companyLostMonkey").val())&&isNotEmpty($("#accidentAnalysisImprovementMeasures").val())) {
                                            $("#printExpenseAccountManager").css("display", "inline-block");
                                        } else {
                                            $("#printExpenseAccountManager").css("display", "none");
                                        }
                                    });
                                    if(isFaultManageNewCarCheck&&isNotEmpty($("#orderNumber").val())&&isNotEmpty($("#cjh").val())&&isNotEmpty($("#khclpp").val())&&isNotEmpty($("#vehicleModels").val())&&isNotEmpty($("#customerVehicleDamageDescription").val())&&isNotEmpty($("#ywyxm").val())&&isNotEmpty($("#ywyclsj").val())&&isNotEmpty($("#ywyclyj").val())&&isNotEmpty($("#customerVehiclesDamage").val())&&isNotEmpty($("#customerMoney").val())&&isNotEmpty($("#otherInjuries").val())&&isNotEmpty($("#otherMoney").val())&&isNotEmpty($("#companyTechnician").val())&&isNotEmpty($("#kpi").val())&&isNotEmpty($("#techniciansPunishmentMonkey").val())&&isNotEmpty($("#techniciansRatio").val())&&isNotEmpty($("#techniciansMonkey").val())&&isNotEmpty($("#customerVehiclesFixedLoss").val())&&isNotEmpty($("#depreciationExpenses").val())&&isNotEmpty($("#settlementMonkey").val())&&isNotEmpty($("#insuranceDeductibleAmount").val())&&isNotEmpty($("#insurancePaymentsTime").val())&&isNotEmpty($("#insurancePaymentsMoney").val())&&isNotEmpty($("#companyLostMonkey").val())&&isNotEmpty($("#companyLostMonkey").val())&&isNotEmpty($("#accidentAnalysisImprovementMeasures").val())) {
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

                                    $(".layer-box2 textarea").css("resize", "vertical");




                                    $('#insurancePaymentsTime').datetimepicker({
                                        format: 'yyyy-mm-dd hh:ii',
                                        language: "zh-CN",
                                        todayButton: true
                                    }).on("changeDate",function(ev){
                                        switch(ev.currentTarget.id){
                                            case "insurancePaymentsTime":
                                                xcVue.bxpfdzrq = $(ev.currentTarget).val();
                                                break;
                                        }
                                    });

                                    // $("#jsxm").val(_data.info.details.name);
                                    // $("#cph").val(_data.info.details.licensePlate);
                                    // $("#endTime").val("暂无");
                                    // $("#sgfsdd").val(_data.info.details.place);
                                    // $("#customerUnit").val(_data.info.details.customerUnit);

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
                                    //         Api.old_car_handing_report.update, "POST", function (_data2) {
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
        $.get(Api.new_car_handing.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
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
                                skin: "layer-box2",
                                content: '<div class="form"><div class="title-lg">新车检查装卸事故</div><!--基本信息--><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly=""style="display: inline-block"v-show="bridgeFinance"></div><div class="tdBox-2"><div class="title-sm title-right">事故发生地</div><input id="sgfsd"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly="readonly"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div><div class="tdBox-2"><div class="title-sm title-left">自车牌照</div><input id="zcpz"type="text"class="form-control width-1"placeholder=""readonly="readonly"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">新车检查照片</div></div><div id="invoce"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故全景照</div></div><div id="sgqjz"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">受损部位照</div></div><div id="ssbwz"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $("#jsxm").val(_data.info.details.name);
                                    $("#cph").val(_data.info.details.licensePlate);
                                    $("#endTime").val(tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, 'yyyy-MM-dd hh:mm'));
                                    $("#sgfsdd").val(_data.info.details.place);
                                    $("#customerUnit").val(_data.info.details.customerUnit);
                                    var str = "";
                                    switch (_data.info.details.accidentPlace) {
                                        case '1':
                                            str = "目的地";
                                            break;
                                        case '2':
                                            str = "任务地";
                                            break;
                                        case '3':
                                            str = "途中";
                                            break;
                                    }
                                    $("#sgfsd").val(str);
                                    $("#zcpz").val(_data.info.details.licensePlate);

                                    var jsonObj = JSON.parse(_data.info.details.frame);
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

                                    var jsonObj2 = JSON.parse(_data.info.details.panorama);
                                    for (var k = 0; k < jsonObj2.length; k++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj2[k] + '"></div>');
                                        $clone.click(function () {
                                            // var src = $(this).find("img").attr("src");
                                            // var index = parent.layer.alert('<img src="' + src + '">', {area: [Tool.GetWidth(1), Tool.GetHeight(1)]}, function (index) {
                                            //     parent.layer.close(index);

                                            $('#sgqjz').viewer();
                                            $('#sgqjz').viewer("update");
                                            // })
                                        });
                                        $("#sgqjz").append($clone);
                                    }

                                    var jsonObj3 = JSON.parse(_data.info.details.damage);
                                    console.log(jsonObj.length);
                                    for (var q = 0; q < jsonObj3.length; q++) {
                                        var $clone = $('<div class="thisImgBox"><img src="' + jsonObj3[q] + '"></div>');
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
                Api.new_car_handing.update, "POST", function () {
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
                Api.new_car_handing.update, "POST", function () {
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

            $.get(Api.new_car_handing.info + "/" + id, {}, function (_data) {
                switch (_data.code) {
                    case 0:
                        console.log(_data);

                        switch (_data.info.details.natureAccident) {
                            case 4:
                                var affiliated = _data.info.affiliated;


                                console.log(affiliated.accidentAnalysisImprovementMeasures+"---"+affiliated.actualAmountPaid+"---"+affiliated.companyLostMonkey+"---"+affiliated.companyTechnician+"---"+affiliated.customerMoney+"---"+affiliated.customerUnit+"---"+affiliated.customerVehicleDamageDescription+"---"+affiliated.customerVehiclesDamage+"---"+affiliated.customerVehiclesFixedLoss+"---"+affiliated.depreciationExpenses+"---"+affiliated.frame+"---"+affiliated.injured+"---"+affiliated.insuranceDeductibleAmount+"---"+affiliated.insurancePaymentsMoney+"---"+affiliated.kpi+"---"+affiliated.licensePlateNumber+"---"+affiliated.name+"---"+affiliated.orderNumber+"---"+affiliated.otherInjuries+"---"+affiliated.otherMoney+"---"+affiliated.ourVehiclesDamage+"---"+affiliated.peopleInjure+"---"+affiliated.place+"---"+affiliated.settlementMonkey+"---"+affiliated.techniciansMonkey+"---"+affiliated.techniciansPunishmentMonkey+"---"+affiliated.techniciansRatio+"---"+affiliated.vehicleModels+"---"+affiliated.financialname);
                                if (isNotEmpty(affiliated.accidentAnalysisImprovementMeasures) && isNotEmpty(affiliated.companyLostMonkey) && isNotEmpty(affiliated.companyTechnician) && isNotEmpty(affiliated.customerMoney) && isNotEmpty(affiliated.customerUnit) && isNotEmpty(affiliated.customerVehicleDamageDescription) && isNotEmpty(affiliated.customerVehiclesDamage) && isNotEmpty(affiliated.customerVehiclesFixedLoss) && isNotEmpty(affiliated.depreciationExpenses) && isNotEmpty(affiliated.frame) && isNotEmpty(affiliated.injured) && isNotEmpty(affiliated.insuranceDeductibleAmount) && isNotEmpty(affiliated.insurancePaymentsMoney) && isNotEmpty(affiliated.kpi) && isNotEmpty(affiliated.licensePlateNumber) && isNotEmpty(affiliated.name) && isNotEmpty(affiliated.orderNumber) && isNotEmpty(affiliated.otherInjuries) && isNotEmpty(affiliated.otherMoney) && isNotEmpty(affiliated.ourVehiclesDamage) && isNotEmpty(affiliated.peopleInjure) && isNotEmpty(affiliated.place) && isNotEmpty(affiliated.settlementMonkey) && isNotEmpty(affiliated.techniciansMonkey) && isNotEmpty(affiliated.techniciansPunishmentMonkey) && isNotEmpty(affiliated.techniciansRatio) && isNotEmpty(affiliated.vehicleModels)&&isNotEmpty(affiliated.financialname)) {
                                    tool.ajaxHelper.ajaxSubmit({
                                        id: id,
                                        start: 5,
                                        userId: userId
                                    }, Api.new_car_handing.update, "POST", function (_data) {
                                        switch (_data.code) {
                                            case 0:
                                                tips("操作成功");
                                                list.bootstrapTableTemplateQuery({});
                                                break;
                                        }
                                    });
                                    console.log("haha")

                                }else if(!isNotEmpty(affiliated.financialname)) {
                                    inquiry("财务填写完后方可确认完成！",function(){
                                        layer.closeAll();
                                    });

                                } else {
                                    inquiry("请全部填写表格数据后再确认完成！", function () {
                                        layer.closeAll();
                                    });
                                    // console.log("2")
                                }
                                break;
                        }


                        break;
                }
            });


            // tool.ajaxHelper.ajaxSubmit({
            //     id: id,
            //     start: 5,
            //     userId: userId
            // }, Api.new_car_handing.update, "POST", function (_data) {
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

        $.get(Api.new_car_handing.info + "/" + id, {}, function (_data) {
            switch (_data.code) {
                case 0:
                    console.log(_data);
                    switch (_data.info.details.natureAccident) {
                        case 4:
                            layer.open({
                                type: 1,
                                title: "完善表格",
                                shadeClose: true,
                                skin: "layer-box",
                                content: '<div id="xcjczxsgFormBox"class="form"><div class="title-lg">新车检查装卸事故</div><div class="partBox basicInfo"><div class="title-md">基本情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师姓名</div><input id="jsxm"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="jsxm"></div><div class="tdBox-2"><div class="title-sm title-right">车牌号</div><input id="cph"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="cph"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">事故发生时间</div><input id="endTime"type="text"class="form-control width-1"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="sgfssj"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故发生地点</div><textarea id="sgfsdd"class="form-control ver-top width-2"name="deblock_udid"rows="5"readonly v-bind:value="sgfsdd"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户单位</div><input id="customerUnit"type="text"class="form-control width-1"placeholder=""readonly v-bind:value="khdw"v-model="khdw"></div><div class="tdBox-2"><div class="title-sm title-right">订单编号</div><input type="text"id="orderNumber"class="form-control width-1"placeholder=""v-bind:value="ddbh"v-model="ddbh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">车架号</div><input id="cjh"type="text"class="form-control width-1"style="display:inline-block"v-show="bridgeFinance"v-bind:value="cjh"v-model="cjh"></div><div class="tdBox-2"><div class="title-sm title-left">客户车辆品牌</div><input id="khclpp"type="text"class="form-control width-1"placeholder=""v-bind:value="khclpp"v-model="khclpp"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-right">型号</div><input id="vehicleModels"type="text"class="form-control width-1"placeholder=""v-bind:value="xh"v-model="xh"></div><div class="tdBox-2"><div class="title-sm ver-top title-left">客户车辆损伤部位</div><input id="customerVehicleDamageDescription"type="text"class="form-control width-1"placeholder=""v-bind:value="khclssbw"v-model="khclssbw"></div></div></div></div><div class="partBox damageSituation"><div class="title-md">业务员处理信息</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">业务员姓名</div><input type="text"id="ywyxm"class="form-control width-1"readonly placeholder=""v-bind:value="ywyxm"v-model="ywyxm"></div><div class="tdBox-2"><div class="title-sm title-right">业务员处理时间</div><input type="text"id="ywyclsj"readonly class="form-control width-1"placeholder=""v-bind:value="ywyclsj"v-model="ywyclsj"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">业务员处理意见</div><textarea class="form-control ver-top width-2"id="ywyclyj"name="deblock_udid"readonly rows="5"v-bind:value="ywyclyj"v-model="ywyclyj"></textarea></div></div></div></div><div class="partBox damageSituation"><div class="title-md">受损情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆损伤情况</div><textarea class="form-control ver-top width-1"id="customerVehiclesDamage"name="deblock_udid"rows="5"v-bind:value="khclssqk"v-model="khclssqk"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="customerMoney"class="form-control width-1"placeholder=""v-bind:value="ssje1"v-model="ssje1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">其他损伤</div><textarea class="form-control ver-top width-1"id="otherInjuries"name="deblock_udid"rows="5"v-bind:value="qtss"v-model="qtss"></textarea></div><div class="tdBox-2"><div class="title-sm title-right">损伤金额</div><input type="text"id="otherMoney"class="form-control width-1"placeholder=""v-bind:value="ssje2"v-model="ssje2"></div></div></div></div><div class="partBox compensationSituation"><div class="title-md">赔付情况</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-3"><div class="title-sm">处理人员</div><select class="form-control width-3"id="companyTechnician"v-bind:value="clry"v-model="clry"><option value="1">公司处理</option><option value="2">技师处理</option></select></div><div class="tdBox-3"><div class="title-sm">技师KPI扣分</div><input id="kpi"type="text"class="form-control width-3"placeholder=""v-bind:value="kpi"v-model="kpi"></div><div class="tdBox-3"><div class="title-sm">技师处罚金额</div><input type="text"id="techniciansPunishmentMonkey"class="form-control width-3"placeholder=""v-bind:value="jscfje"v-model="jscfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">技师承担赔付比例</div><input type="text"id="techniciansRatio"class="form-control width-1"placeholder=""v-bind:value="jscdpfbl"v-model="jscdpfbl"></div><div class="tdBox-2"><div class="title-sm title-right">技师赔付金额</div><input type="text"id="techniciansMonkey"class="form-control width-1"placeholder=""v-bind:value="jspfje"v-model="jspfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">客户车辆维修费用</div><input type="text"id="customerVehiclesFixedLoss"class="form-control width-1"placeholder=""v-bind:value="khclwxfy"v-model="khclwxfy"></div><div class="tdBox-2"><div class="title-sm title-right">折损费用</div><input type="text"id="depreciationExpenses"class="form-control width-1"placeholder=""v-bind:value="zkfy"v-model="zkfy"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险理赔金额</div><input type="text"id="settlementMonkey"class="form-control width-1"placeholder=""v-bind:value="bxlpje"v-model="bxlpje"></div><div class="tdBox-2"><div class="title-sm title-right">保险免赔金额</div><input id="insuranceDeductibleAmount"type="text"class="form-control width-1"placeholder=""v-bind:value="bxmpje"v-model="bxmpje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">保险赔付到账日期</div><input type="text"class="form-control width-1"id="insurancePaymentsTime"readonly style="display:inline-block"v-show="bridgeFinance"v-bind:value="bxpfdzrq"v-model="bxpfdzrq"></div><div class="tdBox-2"><div class="title-sm title-right">保险赔付金额</div><input type="text"id="insurancePaymentsMoney"class="form-control width-1"placeholder=""v-bind:value="bxpfje"v-model="bxpfje"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">公司损失金额</div><input id="companyLostMonkey"type="text"class="form-control width-1"placeholder=""v-bind:value="gsssje"v-model="gsssje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">与客户沟通经过描述</div><textarea class="form-control ver-top width-2"id="ykhgtjgms"name="deblock_udid"rows="5"v-bind:value="ykhgtjgms"v-model="ykhgtjgms"></textarea></div></div><div class="trBox"><div class="followUpHistory"v-for="item in followList"><div class="tdBox-2"><div class="title-sm title-left">进度描述</div><input type="text"class="form-control width-1"placeholder=""readonly v-bind:value="item.jdms"></div><div class="tdBox-2"><div class="title-sm title-left">{{tool.dataHelper.timeStampToDateFormat(item.time,"yyyy年MM月dd日 hh:mm")}}</div></div></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">事故分析</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">事故分析及改进措施</div><textarea class="form-control ver-top width-2"id="accidentAnalysisImprovementMeasures"name="deblock_udid"rows="5"v-bind:value="sgfxjgjcs"v-model="sgfxjgjcs"></textarea></div></div></div></div><div class="partBox accidentAnalysis"><div class="title-md">处理人员</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm fontNum4">车管姓名</div><input id="cgxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cgxm"v-model="cgxm"readonly></div><div class="tdBox-2"><div class="title-sm fontNum4">财务姓名</div><input id="cwxm"type="text"class="form-control width-3"placeholder=""v-bind:value="cwxm"v-model="cwxm"readonly></div></div></div></div><div class="partBox financialPayment"><div class="title-md">财务支付</div><div class="line"></div><div class="contentBox"><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left"id=""readonly>支付方式</div><select class="form-control width-1"id="payType"v-bind:value="zffs"v-model="zffs"><option value="1">现金支付</option><option value="2">转账支付</option></select></div><div class="tdBox-2"><div class="title-sm title-right">支付金额</div><input id="payment"type="text"class="form-control width-1"v-bind:value="zfje"v-model="zfje"readonly></div></div><div class="trBox"v-show="zffs==2||zffs==\'2\'"><div class="tdBox-2"><div class="title-sm title-left">卡号</div><input id="bankCardId"type="text"class="form-control width-1"v-bind:value="kh"v-model="kh"></div><div class="tdBox-2"><div class="title-sm title-right">开户行</div><input id="bankName"type="text"class="form-control width-1"v-bind:value="khh"v-model="khh"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">办理人员</div><select id="acceptingOfficer"class="form-control width-1"v-bind:value="blry"v-model="blry"readonly><option value="1">外部人员</option><option value="2">内部人员</option></select></div><div class="tdBox-2"><input id="insider"type="text"class="form-control width-1"v-bind:value="nbryxm"v-model="nbryxm"placeholder="姓名"v-if="blry==2||blry==\'2\'"><button id="idcardImg"type="button"class="btn btn-primary"v-else-if="blry==1||blry==\'1\'"v-show="false">拍摄身份证照</button></div></div><div class="trBox"><div class="imgField1"></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">收款金额</div><input id="amountCollected"type="text"class="form-control width-1"v-bind:value="skje"v-model="skje"></div></div><div class="trBox"><div class="tdBox-1"><div class="title-sm ver-top title-left">备注</div><textarea class="form-control ver-top width-2"id="financialRemarks"name="deblock_udid"rows="5"v-bind:value="cwbz"v-model="cwbz"></textarea></div></div><div class="trBox"><div class="tdBox-2"><div class="title-sm title-left">报销单拍照</div><button id="uploadImg"type="button"class="btn btn-primary"v-show="isAccidentFinanceNewCarCheck">拍照</button></div><div class="imgField2"></div></div></div></div></div>',
                                success: function (_layero, _index) {
                                    $(".layui-layer-setwin").css("z-index", "9999999999999999");
                                    $(".layui-layer-setwin").click(function (_event) {
                                        layer.closeAll();
                                        $(".layui-layer-setwin").remove();
                                    });
                                    new Vue({
                                        el: "#xcjczxsgFormBox",
                                        data: {
                                            bridgeFinance: true,
                                            jsxm: _data.info.details.name,
                                            cph: _data.info.details.licensePlate,
                                            sgfssj: tool.dataHelper.timeStampToDateFormat(_data.info.details.addTime, "yyyy年MM月dd日 hh:mm"),
                                            sgfsdd: _data.info.details.place,
                                            khdw: _data.info.details.customerUnit,

                                            cjh: _data.info.affiliated.frame,
                                            khclpp: _data.info.affiliated.injured,
                                            ywyxm: _data.info.details.salesmanName,
                                            ywyclsj: _data.info.details.vehicleHandleTime ? tool.dataHelper.timeStampToDateFormat(_data.info.details.vehicleHandleTime, "yyyy年MM月dd日 hh:mm") : "暂无处理时间",
                                            ywyclyj: _data.info.details.remark,
                                            ykhgtjgms: _data.info.affiliated.peopleInjure,
                                            bxpfdzrq: _data.info.affiliated.ourVehiclesDamage,

                                            sgfxjgjcs: _data.info.affiliated.accidentAnalysisImprovementMeasures,
                                            gsssje: _data.info.affiliated.companyLostMonkey,
                                            clry: _data.info.affiliated.companyTechnician,
                                            ssje1: _data.info.affiliated.customerMoney,
                                            khclssbw: _data.info.affiliated.customerVehicleDamageDescription,
                                            khclssqk: _data.info.affiliated.customerVehiclesDamage,
                                            khclwxfy: _data.info.affiliated.customerVehiclesFixedLoss,
                                            zkfy: _data.info.affiliated.depreciationExpenses,
                                            bxmpje: _data.info.affiliated.insuranceDeductibleAmount,
                                            bxpfje: _data.info.affiliated.insurancePaymentsMoney,
                                            kpi: _data.info.affiliated.kpi,
                                            ddbh: _data.info.affiliated.orderNumber,
                                            qtss: _data.info.affiliated.otherInjuries,
                                            ssje2: _data.info.affiliated.otherMoney,
                                            jscfje: _data.info.affiliated.techniciansPunishmentMonkey,
                                            xh: _data.info.affiliated.vehicleModels,
                                            jscdpfbl: _data.info.affiliated.techniciansRatio,
                                            jspfje: _data.info.affiliated.techniciansMonkey,
                                            bxlpje: _data.info.affiliated.settlementMonkey,

                                            cgxm: _data.info.affiliated.vehicleSubName,
                                            zffs:_data.info.affiliated.payType,  //  支付方式
                                            zfje:_data.info.affiliated.payment,  //  支付金额
                                            kh: _data.info.affiliated.bankcardid,  //  卡号
                                            khh: _data.info.affiliated.bankname, //  开户行
                                            blry:_data.info.affiliated.acceptingOfficer,  //  办理人员

                                            followList: _data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[],

                                            nbryxm:_data.info.affiliated.insider,  //  内部人员姓名
                                            cwxm:_data.info.affiliated.financialname,  //  财务姓名
                                            skje:_data.info.affiliated.skje,    // 收款金额
                                            cwbz:_data.info.affiliated.financialremarks //  财务备注
                                        },
                                        methods: {}
                                    });

                                    console.log(_data.info.affiliated.jdmsArrayStr?JSON.parse(_data.info.affiliated.jdmsArrayStr):[]);

                                    //报销单照片
                                    var expensephoto = _data.info.affiliated.expensephoto?JSON.parse(_data.info.affiliated.expensephoto):null;
                                    console.log(typeof expensephoto)
                                    if(expensephoto&&expensephoto!=null) {
                                        for(var i = 0; i < expensephoto.length; i++) {
                                            var $imgItem = $("<img style='width: 80px; height: 80px; margin-top: 10px; margin-left: 10px;'>").attr("src", baseURL+expensephoto[i]);
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


                                    $("#xcjczxsgFormBox textarea,#xcjczxsgFormBox input").attr("readonly", "readonly");
                                    $("#xcjczxsgFormBox select").attr("disabled", "disabled");
                                    $(".layer-box2 textarea").css("resize", "vertical");

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

            $.get(Api.new_car_handing.info + "/" + id, {}, function (_data) {
                console.log(_data);

                Tool.ajaxHelper.ajaxSubmit({
                        id: id,
                        reminderTime: tool.dataHelper.timeStampToDateFormat(parseInt(new Date().getTime()/1000),"yyyy年MM月dd日 hh:mm")
                    },
                    Api.new_car_handing.update, "POST", function (_data2) {
                        // console.log(_data.info.details.reminderTime);
                        // list.bootstrapTableTemplateQuery({});
                    }
                );

            });

            Tool.ajaxHelper.ajaxSubmit({
                    id: data[0].id
                },
                Api.new_car_handing.remindVehicle, "POST", function () {
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