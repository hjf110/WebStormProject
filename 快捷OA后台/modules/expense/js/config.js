var config = {
    approvalFailed: -2,//审批未通过
    examineFailed: -1,//审核未通过
    notExamine: 0,//待审批（尿素申报专有状态）
    notApproval: 1,//待审核
    notReimbursement: 2,//待报销（等待寄发票，填运单号操作）
    notMakeMoney: 3,//待打款
    notDecision: 4,//待决策（事故申报专有状态）
    notHandle: 5,//在处理（事故申报专有状态）
    isCompleted: 6,//已完成
    examineCompleted: 7,//审批通过
    isMakeMoney: 8,// 未完成

    bridgeDriver: "bridgeDriver",
    bridgeCheck: "bridgeCheck",
    bridgeFinance: "bridgeFinance",
    bridgeObserver: "bridgeObserver",
    bridgeCount: "bridgeCount",

    stayDriver: "stayDriver",
    stayCheck: "stayCheck",
    stayFinance: "stayFinance",
    stayObserver: "stayObserver",
    stayCount: "stayCount",

    ureaDriver: "ureaDriver",
    ureaBatch: "ureaBatch",
    ureaCheck: "ureaCheck",
    ureaFinance: "ureaFinance",
    ureaCount: "ureaCount",
    ureaObserver: "ureaObserver",

    // faultDriver: "accidentDriver",
    faultDriverHoldCar: "accidentDriverHoldCar",
    faultDriverSelfTest: "accidentDriverSelfTest",
    faultDriverNewCarCheck: "accidentDriverNewCarCheck",
    faultDriverProblem: "accidentDriverProblem",

    // faultManage: "accidentManage",
    faultManageHoldCar: "accidentManageHoldCar",
    faultManageSelfTest: "accidentManageSelfTest",
    faultManageNewCarCheck: "accidentManageNewCarCheck",
    faultManageProblem: "accidentManageProblem",

    // faultDispatch: "accidentDispatch",
    faultDispatchHoldCar: "accidentDispatchHoldCar",
    faultDispatchSelfTest: "accidentDispatchSelfTest",
    faultDispatchNewCarCheck: "accidentDispatchNewCarCheck",
    faultDispatchProblem: "accidentDispatchProblem",

    // faultSalesman: "accidentSalesman",
    faultSalesmanHoldCar: "accidentSalesmanHoldCar",
    faultSalesmanSelfTest: "accidentSalesmanSelfTest",
    faultSalesmanNewCarCheck: "accidentSalesmanNewCarCheck",
    faultSalesmanProblem: "accidentSalesmanProblem",

    // accidentObservation: "accidentObservation",
    accidentObservationHoldCar: "accidentObservationHoldCar",
    accidentObservationSelfTest: "accidentObservationSelfTest",
    accidentObservationNewCarCheck: "accidentObservationNewCarCheck",
    accidentObservationProblem: "accidentObservationProblem",

    // accidentFinance:"accidentFinance",
    accidentFinanceHoldCar:"accidentFinanceHoldCar",
    accidentFinanceSelfTest:"accidentFinanceSelfTest",
    accidentFinanceNewCarCheck:"accidentFinanceNewCarCheck",
    accidentFinanceProblem:"accidentFinanceProblem",

    //用户 启用 禁用状态
    notLock: 1,// 启用
    isLock: 2, // 禁用


    appid: "dingoagsyk97imiykov6og",
    //加入系统的角色LIST
    addToSystemUserRole: ["bridgeCheck","bridgeFinance","stayCheck","stayFinance","ureaCheck","ureaFinance","ureaBatch","ureaCount","bridgeCount","stayCount","bridgeObserver","stayObserver","ureaObserver","accidentManage","accidentDispatch","accidentSalesman","accidentObservation","accidentFinance","accidentManageNewCarCheck","accidentDispatchNewCarCheck","accidentSalesmanNewCarCheck","accidentObservationNewCarCheck","accidentManageSelfTest","accidentDispatchSelfTest","accidentSalesmanSelfTest","accidentObservationSelfTest","accidentFinanceSelfTest","accidentManageProblem","accidentDispatchProblem","accidentSalesmanProblem","accidentObservationProblem","accidentFinanceProblem","accidentManageHoldCar","accidentDispatchHoldCar","accidentSalesmanHoldCar","accidentObservationHoldCar","accidentFinanceHoldCar"],

    //授权URL

    baseUrl: "http://oa.4008882662.cn:8080/armor/",
    authorizationUrl: "http://oa.4008882662.cn:8080/armor/authorization.html"
    // authorizationUrl: "http://weika1.jiuhuanhb.com:8080/armor/from.html"
}


window.config = config;

var userInfo = window.top.userInfo;
var roleList = window.top.roleList;
window.flowId = "";
var flowId = window.top.flowId;

var userRoleList = null;
var flowIdArr = null;

if (roleList != null && userInfo != undefined && userInfo != "undefined") {
    userRoleList = roleList.map(function (item) {
        return item.role;
    });
    flowIdArr = roleList.map(function (item) {
        return item.flowId;
    });
    flowId = flowIdArr.join(",");
}
console.log(flowId);
console.log(userInfo);
console.log(roleList);

//判断是否不为空
function isNotEmpty(_str){
    switch(typeof _str){
        case "string":
            return _str.replace(" ","").length>0;
            break;
        case "number":
            return _str==_str;
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