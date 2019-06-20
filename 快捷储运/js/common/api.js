//接口地址 管理对象
//var path = "http://115.238.154.91:8083/kjcy";//接口头地址
var pass = "Qyw6tX4f";// 8位随机签名加密码
//请求前缀
var baseURL = "http://115.238.154.91:8083/kjcy/";
var baseURL_PDA = "http://115.238.154.91:8084/kjcy-pda/";
var baseURL_FWDT = "http://115.238.154.91:8085/kjcy-servicehall/";
var baseURL_KH = "http://115.238.154.91:8086/kjcy-customer/";
var baseURL_YS = "http://115.238.154.91:8087/kjcy-transport/";

var Api = {
    Image_OnLoad: {//图片上传(服务大厅)
        OnLoad: baseURL_FWDT + "common/upload/image",//图片上传(服务大厅)
    },
    PAD_Login_in: {//pad端(登录)
        Login_in: baseURL + "login/account/in",//pad登录
    },
    PDA_Login_in: {//pda手机端(登录)
        Login_in: baseURL_PDA + "login/account/in",//pda登录
    },
    FWDT_Login_in: {//服务大厅(登录)
        Login_in: baseURL_FWDT + "login/account/in",//服务大厅登录
    }
    , KH_Login_in: {//客户(登录)
        Login_in: baseURL_KH + "login/in",//客户登录
    }
    , YS_Login_in: {//运输单位(登录)
        Login_in: baseURL_YS + "login/in",//运输单位登录
    }
    , PAD_jianche: {
        FindCar: baseURL + "checkcar/getcarlist"//获取所有待检测和检测中的车辆
        , Select_Xiangmu: baseURL + "checkcar/getitem"//获取所有检查项目
        , Check_Photo: baseURL + "checkcar/photo"//单个检测项目拍照上传
        , Submit: baseURL + "checkcar/submit"//总检查结果提交

    },
    PDA_jieche: {//接车
        FindCar_Only: baseURL_PDA + "receivecar/appoint/find",//查询带接车车辆(指派任务)
        FindCar: baseURL_PDA + "receivecar/find",//查询带接车车辆
        FindPark: baseURL_PDA + "receivecar/parkinfo",//查询指定车位信息
        Ok_Car: baseURL_PDA + "receivecar/confirm",//确认接车
        Bind_Car: baseURL_PDA + "receivecar/bind_car",//绑定车辆
        Bind_Park: baseURL_PDA + "receivecar/bind_park"//绑定车位信息
    },
    PDA_jiaoche: {//交车
        FindCar_Only: baseURL_PDA + "deliverycar/appoint/list",//查询交车车辆(指派任务)
        FindCar: baseURL_PDA + "deliverycar/list",//查询交车车辆
        FindParkinfo: baseURL_PDA + "deliverycar/parkinfo",//查询车辆位置信息
        Unbind_park: baseURL_PDA + "deliverycar/unbind",//解除车位绑定
        Ok_jiaoche: baseURL_PDA + "deliverycar/complete",//确认交车完成
    },
    PDA_pdi: {//pdi检测
        FindCar_Only: baseURL_PDA + "pdi/appoint/wait/list",//查询待解绑车位送去PDI检测的车辆(指派任务)
        FindCar: baseURL_PDA + "pdi/wait/list",//查询待解绑车位送去PDI检测的车辆
        FindCar_Ok_PDI_Only: baseURL_PDA + "pdi/appoint/sendback/list",//查询已完成PDI检测待送回车库的车辆
        FindCar_Ok_PDI: baseURL_PDA + "pdi/sendback/list",//查询已完成PDI检测待送回车库的车辆
        FindCar_PDI: baseURL_PDA + "pdi/complete/list",//查询在PDI检测的车辆
        Ok_PDI: baseURL_PDA + "pdi/check/complete",//完成PDI检测接口
        Unbind_Park: baseURL_PDA + "pdi/unbind",//解绑车位
        Bind_Park: baseURL_PDA + "pdi/bind",//绑定车位
        Get_Park_info: baseURL_PDA + "pdi/parkinfo"//查询车辆车位信息
    },
    FWDT_PAD_Car_info: {//服务大厅(车位信息)
        Select_PAD_Car_info: baseURL_FWDT + "padmng/list",//查找pad端的车辆信息
        Look_PAD_Car_info: baseURL_FWDT + "padmng/info",//查看pad端的车辆信息
        // Select_All_Park_info: baseURL_FWDT + "park/list"//查找所有的车位信息
        // ,Select_Customer:baseURL_FWDT+"customer/search"//查询客户数据
        // ,Select_Customer_ById:baseURL_FWDT+"customer/info" //查询客户详细信息
        // ,Select_Customer_Contract_ById:baseURL_FWDT+"customer/contract" //查询客户合同照片
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    },
    FWDT_Park_info: {//服务大厅(车位信息)
        Select_Park_info: baseURL_FWDT + "park/search",//查找未绑定的车位信息
        Select_All_Park_info: baseURL_FWDT + "park/list"//查找所有的车位信息
        // ,Select_Customer:baseURL_FWDT+"customer/search"//查询客户数据
        // ,Select_Customer_ById:baseURL_FWDT+"customer/info" //查询客户详细信息
        // ,Select_Customer_Contract_ById:baseURL_FWDT+"customer/contract" //查询客户合同照片
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    },
    FWDT_People_info: {//服务大厅(人员管理)
        Add_People: baseURL_FWDT + "member/create",//新增用户
        Update_People: baseURL_FWDT + "member/update",//更新用户
        Delect_People: baseURL_FWDT + "member/delete",//删除用户
        People_list: baseURL_FWDT + "member/search",//查询用户列表
        People_Info_Byid: baseURL_FWDT + "member/load"//根据id查询详细信息
        // ,Select_Customer:baseURL_FWDT+"customer/search"//查询客户数据
        // ,Select_Customer_ById:baseURL_FWDT+"customer/info" //查询客户详细信息
        // ,Select_Customer_Contract_ById:baseURL_FWDT+"customer/contract" //查询客户合同照片
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    },
    FWDT_Customer_Dw: {//服务大厅(客户单位)
        Add_Motify_Customer: baseURL_FWDT + "customer/submit"//新增及修改客户单位信息
        , Select_Customer: baseURL_FWDT + "customer/search"//查询客户数据
        , Select_Customer_ById: baseURL_FWDT + "customer/info" //查询客户详细信息
        , Select_Customer_Contract_ById: baseURL_FWDT + "customer/contract" //查询客户合同照片
        , Delect_Customer_Contract_ById: baseURL_FWDT + "customer/contract/delete" //删除指定合同照片
        , Drop_Down_Customer_Info: baseURL_FWDT + "customer/list" //获得客户下拉数据
    },
    FWDT_Transport_Dw: {//服务大厅(运输单位)
        Add_Motify_Transport: baseURL_FWDT + "transport/submit"//新增及修改运输单位信息
        , Select_Transport: baseURL_FWDT + "transport/search"//查询运输单位数据
        , Select_Transport_ById: baseURL_FWDT + "transport/info" //查询运输单位详细信息
        , Select_Transport_Contract_ById: baseURL_FWDT + "transport/contract" //查询运输单位合同照片
        , Delect_Transport_Contract_ById: baseURL_FWDT + "transport/contract/delete" //删除指定合同照片
        , Drop_Down_Transport_Info: baseURL_FWDT + "transport/list" //获得运输单位下拉数据
    },
    FWDT_jieche: {//服务大厅(接车单)
        Add_jieche: baseURL_FWDT + "receivecar/create"//新增接车单
        , Select_jieche: baseURL_FWDT + "receivecar/search"//查询接车单数据
        , Select_jieche_ById: baseURL_FWDT + "receivecar/info"//查询接车单数据
        , Update_jieche_ById: baseURL_FWDT + "receivecar/update" //更新接车单
        , Delect_jieche_ById: baseURL_FWDT + "receivecar/delete" //单个删除接车单
        , Delect_jieche_ByIds: baseURL_FWDT + "receivecar/delete_batch" //批量删除接车单
        , Add_jieche_ByYuYue: baseURL_FWDT + "receivecar/create_by_appointment" //根据预约接车单生成接车单
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    }
    , FWDT_YuYue_jieche: {//服务大厅(预约接车单)
        Add_YuYue_jieche: baseURL_FWDT + "appointment/receivecar/create"//新增及修改运输单位信息
        , Select_YuYue_jieche: baseURL_FWDT + "appointment/receivecar/search"//查询预约接车单数据
        , Select_YuYue_To_jieche: baseURL_FWDT + "appointment/receivecar/find"//查询预约接车单数据(预约单转接车单)
        , Update_YuYue_jieche: baseURL_FWDT + "appointment/receivecar/update" //更新预约接车单数据
        , Look_YuYue_jieche: baseURL_FWDT + "appointment/receivecar/info" //查看预约接车单数据
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    }
    , FWDT_YuYue_bljc: {//服务大厅(办理进场)
        Select_bljc: baseURL_FWDT + "checkin/load"//办理进场页面加载数据接口
        , Save_bljc: baseURL_FWDT + "checkin/create"//保存办理进场信息单
        , Check_bljc: baseURL_FWDT + "checkin/check"//检测是否能办理进场
        , Look_bljc_info: baseURL_FWDT + "checkin/info" //查看办理进场时填写的消息
        , Update_bljc: baseURL_FWDT + "checkin/update" //修改进场信息信息单
        , Submit_bljc: baseURL_FWDT + "checkin/entry" //办理进场
        , Quxiao_bljc: baseURL_FWDT + "checkin/cancle" //取消进场
        , Jujue_bljc: baseURL_FWDT + "checkin/refuse/entry"//拒绝进场
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    }
    , FWDT_PDI_jiance: {//服务大厅(办理进场)
        Select_Not_Do_PDI: baseURL_FWDT + "pdi/undo/list"//查找未进行PDI检测的车辆
        , Select_Has_Do_PDI: baseURL_FWDT + "pdi/hasdo/list"//查找已进行PDI检测的车辆
        , To_Driver: baseURL_FWDT + "pdi/appointdriver"//指定驾驶员
        , Add_PDI_jianche: baseURL_FWDT + "pdi/create"//创建PDI检测
    }
    , FWDT_jiaoche: {//服务大厅(交车模块)
        Select_Can_jiaoche: baseURL_FWDT + "deliverycar/all/cars"//查找可交车的车辆信息
        , Select_jiaoche_jilu: baseURL_FWDT + "deliverycar/search"//查找交车单记录表数据
        , Select_Car_By_kh_id: baseURL_FWDT + "deliverycar/customer/cars"//根据客户id获取客户所有的车辆信息
        , Select_Car_Byid: baseURL_FWDT + "deliverycar/info"//根据id查询交车单信息
        , Add_jiaoche: baseURL_FWDT + "deliverycar/create"//创建交车单
        , Update_jiaoche: baseURL_FWDT + "deliverycar/update"//更新指定交车单
        , Delete_jiaoche: baseURL_FWDT + "deliverycar/delete"//取消刪除交车单
        , YY_Zhuang_jiache: baseURL_FWDT + "deliverycar/create_by_appointment"//预约交车单转为交车单
    }
    , FWDT_YuYue_jiaoche: {//服务大厅(预约交车模块)
        Select_Can_jiaoche: baseURL_FWDT + "deliverycar/all/cars"//查找可交车的车辆信息
        , Select_jiaoche_jilu: baseURL_FWDT + "appointment/deliverycar/search"//查找预约交车单记录表数据
        , Select_Car_By_kh_id: baseURL_FWDT + "appointment/deliverycar/customer/cars"//根据客户id获取客户所有的车辆信息
        , Select_Car_Byid: baseURL_FWDT + "appointment/deliverycar/info"//根据id查询该预约交车单信息
        , Add_jiaoche: baseURL_FWDT + "appointment/deliverycar/create"//新建预约交车单
        , Update_jiaoche: baseURL_FWDT + "appointment/deliverycar/update"//更新指定交车单
        , Delete_jiaoche: baseURL_FWDT + "appointment/deliverycar/delete"//刪除预约交车单
    }
    , FWDT_ZKCL: {//服务大厅(在库车辆接口)
        Select_All_ZKCL: baseURL_FWDT + "/storage/list"//查找所有的在库车辆
        // ,Select_Has_Do_PDI:baseURL_FWDT+"pdi/hasdo/list"//查找已进行PDI检测的车辆
        // ,To_Driver:baseURL_FWDT+"pdi/appointdriver"//指定驾驶员
        // ,Add_PDI_jianche:baseURL_FWDT+"pdi/create"//创建PDI检测
    }
    , KH_ZKCL: {//服务大厅(在库车辆接口)
        Select_All_ZKCL: baseURL_KH + "storage/search"//查找所有的在库车辆
        // ,Select_Has_Do_PDI:baseURL_FWDT+"pdi/hasdo/list"//查找已进行PDI检测的车辆
        // ,To_Driver:baseURL_FWDT+"pdi/appointdriver"//指定驾驶员
        // ,Add_PDI_jianche:baseURL_FWDT+"pdi/create"//创建PDI检测
    }
    , KH_YuYue_jieche: {//客户(预约接车单)
        Add_YuYue_jieche: baseURL_KH + "receivecar/create"//新增及修改运输单位信息
        , Select_YuYue_jieche: baseURL_KH + "receivecar/search"//查询预约接车单数据
        , Update_YuYue_jieche: baseURL_KH + "receivecar/update" //更新预约接车单数据
        , Look_YuYue_jieche: baseURL_KH + "receivecar/info" //查看预约接车单数据
        // ,Delect_Customer_Contract_ById:baseURL_FWDT+"customer/contract/delete" //删除指定合同照片
        // ,Drop_Down_Customer_Info:baseURL_FWDT+"customer/list" //获得客户下拉数据
    }
    , KH_YuYue_jiaoche: {//服务大厅(预约交车模块)
        //Select_Can_jiaoche: baseURL_KH + "appointment/deliverycar/customer/cars"//查找客户可交车的车辆信息
        Select_jiaoche_jilu: baseURL_KH + "appointment/deliverycar/search"//查找预约交车单记录列表
        , Select_Car_By_kh_id: baseURL_KH + "appointment/deliverycar/customer/cars"//根据客户id获取客户所有的车辆信息
        , Select_Car_Byid: baseURL_KH + "appointment/deliverycar/info"//根据id查询该预约交车单信息
        , Add_jiaoche: baseURL_KH + "appointment/deliverycar/create"//新建预约交车单
        , Update_jiaoche: baseURL_KH + "appointment/deliverycar/update"//更新指定交车单
        , Delete_jiaoche: baseURL_KH + "appointment/deliverycar/delete"//刪除预约交车单
    }
    , YS_Car_Manage: {//运输单位(车辆管理模块)
        //Select_Can_jiaoche: baseURL_KH + "appointment/deliverycar/customer/cars"//查找客户可交车的车辆信息
        Upload_image: baseURL_YS + "common/upload/image"//运输单位上传图片
        , Add: baseURL_YS + "tcarmng/add"//新增车辆记录
        , Update: baseURL_YS + "tcarmng/update"//更新车辆记录
        , List: baseURL_YS + "tcarmng/search"//车辆列表记录查询
        , Byid: baseURL_YS + "tcarmng/info"//根据id查询车辆记录
    }


};


window.Api = Api;