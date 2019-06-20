//接口地址 管理对象
//请求前缀
var baseURL = "/";

var Api = {
    customer_manage: {
        GetUserList: "/GetUserList",

    },
    common: {
        saveImage: baseURL + "ex/Common/saveImage"
    },
    ex_company: {
        list: baseURL + "ex/company/list"
    },
    ex_structure: {
        treeList: baseURL + "ex/structure/treeList",
        save: baseURL + "ex/structure/save",
        update: baseURL + "ex/structure/update",
        info: baseURL + "ex/structure/info",
        delete: baseURL + "ex/structure/delete"
    },

    ex_structure_user: {
        list: baseURL + "ex/structureUser/list",
        save: baseURL + "ex/structureUser/save",
        update: baseURL + "ex/structureUser/update",
        info: baseURL + "ex/structureUser/info",
        delete: baseURL + "ex/structureUser/delete",
        saveList: baseURL + "ex/structureUser/saveList",
        notLockUser: baseURL + "ex/structureUser/notLockUser",
        lockUser: baseURL + "ex/structureUser/lockUser",
    },
    ex_ding: {
        departmentList: baseURL + 'ex/ding/GetDepartmentList',
        departmentLUserist: baseURL + 'ex/ding/GetDepartmentLUserist',

    },
    ex_flow: {
        list: baseURL + "ex/flow/list",
        save: baseURL + "ex/flow/save",
        update: baseURL + "ex/flow/update",
        info: baseURL + "ex/flow/info",
        delete: baseURL + "ex/flow/delete",
    },

    ex_flow_role: {
        list: baseURL + "ex/flowRole/list",

    },
    ex_flow_user: {
        saveList: baseURL + "ex/flowUser/saveList",
    },
    ex_bridge: {
        list: baseURL + "ex/bridge/list",
        save: baseURL + "ex/bridge/save",
        updateOrSave: baseURL + "ex/bridge/updateOrSave",
        info: baseURL + "ex/bridge/info",
        delete: baseURL + "ex/bridge/delete",
        noticeDriver: baseURL + "ex/bridge/noticeDriver",
        expenseExport: baseURL + "ex/bridge/expenseExport",

        reset: baseURL + "ex/bridge/reset",
    },
    ex_bridge_expense: {
        list: baseURL + "ex/bridgeExpense/list",
        save: baseURL + "ex/bridgeExpense/save",
        update: baseURL + "ex/bridgeExpense/update",
        info: baseURL + "ex/bridgeExpense/info",
        delete: baseURL + "ex/bridgeExpense/delete",
    },
    ex_stay: {
        list: baseURL + "ex/stay/list",
        save: baseURL + "ex/stay/save",
        updateOrSave: baseURL + "ex/stay/updateOrSave",
        info: baseURL + "ex/stay/info",
        delete: baseURL + "ex/stay/delete",
        noticeDriver: baseURL + "ex/stay/noticeDriver",
        expenseExport: baseURL + "ex/stay/expenseExport",
        reset: baseURL + "ex/stay/reset",
    },
    ex_stay_expense: {
        list: baseURL + "ex/stayExpense/list",
        save: baseURL + "ex/stayExpense/save",
        update: baseURL + "ex/stayExpense/update",
        info: baseURL + "ex/stayExpense/info",
        delete: baseURL + "ex/stayExpense/delete",
    },
    ex_user: {
        checkUserType: baseURL + "ex/user/CheckUserType",
        getUserRoleByCode: baseURL + "ex/user/GetUserRoleByCode",
        addUserToSystem: baseURL + "ex/user/AddUserToSystem",
    },
    ex_urea: {
        list: baseURL + "ex/urea/list",
        save: baseURL + "ex/urea/save",
        updateOrSave: baseURL + "ex/urea/insertOrUpdate",
        info: baseURL + "ex/urea/info",
        delete: baseURL + "ex/urea/delete",
        noticeDriver: baseURL + "ex/urea/noticeDriver",
        expenseExport: baseURL + "ex/urea/expenseExport",
        reset: baseURL + "ex/urea/reset",
    },
    ex_urea_expense: {
        list: baseURL + "ex/ureaExpense/list",
        save: baseURL + "ex/ureaExpense/save",
        update: baseURL + "ex/ureaExpense/update",
        info: baseURL + "ex/ureaExpense/info",
        delete: baseURL + "ex/ureaExpense/delete",
    },
    ex_haccident_application: {
        delete: baseURL + "ex/hAccidentApplication/delete",
        save: baseURL + "ex/hAccidentApplication/save",
        update: baseURL + "ex/hAccidentApplication/update",
        info: baseURL + "ex/hAccidentApplication/info",
        list: baseURL + "ex/hAccidentApplication/list",
        updatesecurity: baseURL + "ex/hAccidentApplication/updatesecurity",
        updatestate: baseURL + "ex/hAccidentApplication/updatestate",

    },
    old_car_accident: {
        confirmPayment: baseURL + "ex/HoldCar/confirmPayment",
        delete: baseURL + "ex/HoldCar/delete",
        save: baseURL + "ex/HoldCar/save",
        update: baseURL + "ex/HoldCar/update",
        info: baseURL + "ex/HoldCar/info",
        list: baseURL + "ex/HoldCar/list",
        updateSecurity: baseURL + "ex/HoldCar/updateSecurity",
        updateState: baseURL + "ex/HoldCar/updateState",
        remindVehicle: baseURL + "ex/HoldCar/remindVehicle"  //  提醒车管
    },
    new_car_check: {
        delete: baseURL + "ex/hNewCarCheck/delete",
        save: baseURL + "ex/hNewCarCheck/save",
        update: baseURL + "ex/hNewCarCheck/update",
        info: baseURL + "ex/hNewCarCheck/info",
        list: baseURL + "ex/hNewCarCheck/list",
        updateSecurity: baseURL + "ex/hNewCarCheck/updateSecurity",
        updateState: baseURL + "ex/hNewCarCheck/updateState",
    },
    new_car_check_report: {
        delete: baseURL + "ex/hNewCarCheckReport/delete",
        save: baseURL + "ex/hNewCarCheckReport/save",
        update: baseURL + "ex/hNewCarCheckReport/update",
        info: baseURL + "ex/hNewCarCheckReport/info",
        list: baseURL + "ex/hNewCarCheckReport/list",
        updateSecurity: baseURL + "ex/hNewCarCheckReport/updateSecurity",
        updateState: baseURL + "ex/hNewCarCheckReport/updateState"
    },
    new_car_handing: {
        delete: baseURL + "ex/hNewCarHanding/delete",
        save: baseURL + "ex/hNewCarHanding/save",
        update: baseURL + "ex/hNewCarHanding/update",
        info: baseURL + "ex/hNewCarHanding/info",
        list: baseURL + "ex/hNewCarHanding/list",
        updateSecurity: baseURL + "ex/hNewCarHanding/updateSecurity",
        updateState: baseURL + "ex/hNewCarHanding/updateState",
        remindVehicle: baseURL + "ex/hNewCarHanding/remindVehicle" , //  提醒车管
        confirmPayment:baseURL + "ex/hNewCarHanding/confirmPayment"
    },
    new_car_handing_report: {
        delete: baseURL + "ex/hNewCarHandingReport/delete",
        save: baseURL + "ex/hNewCarHandingReport/save",
        update: baseURL + "ex/hNewCarHandingReport/update",
        info: baseURL + "ex/hNewCarHandingReport/info",
        list: baseURL + "ex/hNewCarHandingReport/list",
        updateSecurity: baseURL + "ex/hNewCarHandingReport/updateSecurity",
        updateState: baseURL + "ex/hNewCarHandingReport/updateState"
    },
    problem: {
        delete: baseURL + "ex/hProblem/delete",
        save: baseURL + "ex/hProblem/save",
        update: baseURL + "ex/hProblem/update",
        info: baseURL + "ex/hProblem/info",
        list: baseURL + "ex/hProblem/list",
        updateSecurity: baseURL + "ex/hProblem/updateSecurity",
        updateState: baseURL + "ex/hProblem/updateState",
        remindVehicle: baseURL + "ex/hProblem/remindVehicle"  //  提醒车管
    },
    problem_report: {
        delete: baseURL + "ex/hProblemReport/delete",
        save: baseURL + "ex/hProblemReport/save",
        update: baseURL + "ex/hProblemReport/update",
        info: baseURL + "ex/hProblemReport/info",
        list: baseURL + "ex/hProblemReport/list",
        updateSecurity: baseURL + "ex/hProblemReport/updateSecurity",
        updateState: baseURL + "ex/hProblemReport/updateState",
    },
    old_car_handing_report: {
        delete: baseURL + "ex/hOldCarHandingReport/delete",
        save: baseURL + "ex/hOldCarHandingReport/save",
        update: baseURL + "ex/hOldCarHandingReport/update",
        info: baseURL + "ex/hOldCarHandingReport/info",
        list: baseURL + "ex/hOldCarHandingReport/list",
        updateSecurity: baseURL + "ex/hOldCarHandingReport/updateSecurity",
        updateState: baseURL + "ex/hOldCarHandingReport/updateState",
    },
    self_test: {
        delete: baseURL + "ex/HSelfTest/delete",
        save: baseURL + "ex/HSelfTest/save",
        update: baseURL + "ex/HSelfTest/update",
        info: baseURL + "ex/HSelfTest/info",
        list: baseURL + "ex/HSelfTest/list",
        updateSecurity: baseURL + "ex/HSelfTest/updateSecurity",
        updateState: baseURL + "ex/HSelfTest/updateState",
        remindVehicle: baseURL + "ex/HSelfTest/remindVehicle",  //  提醒车管
        collectionCompleted: baseURL + "ex/HSelfTest/collectionCompleted",
        confirmPayment: baseURL + "ex/HSelfTest/confirmPayment"
    },
    self_test_report: {
        delete: baseURL + "ex/hSelfTestReport/delete",
        save: baseURL + "ex/hSelfTestReport/save",
        update: baseURL + "ex/hSelfTestReport/update",
        info: baseURL + "ex/hSelfTestReport/info",
        list: baseURL + "ex/hSelfTestReport/list",
        updateSecurity: baseURL + "ex/hSelfTestReport/updateSecurity",
        updateState: baseURL + "ex/hSelfTestReport/updateState",
    },
    h_handling_accidents: {
        accidents: baseURL + "ex/hHandlingAccidents/update",
        traffic: baseURL + "ex/hTrafficAccident/update",
        traffic_info: baseURL + "ex/hTrafficAccident/info",
        NewCarCheck: baseURL + "ex/hNewCarAccident/update",
        NewCarHanding: baseURL + "ex/hNewCarHanding/update",
        Handing: baseURL + "ex/hHandlingAccidents/update"
    }

}


window.Api = Api;