<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>用户修改--layui后台管理模板</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="stylesheet" href="${base}/static/layui/css/layui.css" media="all" />
    <style type="text/css">
        .layui-form-item .layui-inline{ width:33.333%; float:left; margin-right:0; }
        @media(max-width:1240px){
            .layui-form-item .layui-inline{ width:100%; float:none; }
        }
        .layui-form-item .role-box {
            position: relative;
        }
        .layui-form-item .role-box .jq-role-inline {
            height: 100%;
            overflow: auto;
        }
        .detail-body{
            margin: 20px 20px 20px 20px;
            min-height: 306px;
            line-height: 26px;
            color: #333;
            word-wrap: break-word;
        }
    </style>
</head>
<body class="childrenBody">
<form class="layui-form" style="width:80%;">
    <input class="layui-hide" name="id" value="${flow.id}"/>
    <input class="layui-hide" name="docno" value="${flow.docno}"/>
    <div class="layui-form-item">
        <label class="layui-form-label">流程名称</label>
        <div class="layui-input-block">
            <input type="text" class="layui-input" name="name" lay-verify="required" value="${flow.name}" placeholder="请输入流程名称">
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">是否启用</label>
        <div class="layui-input-block">
            <input type="checkbox" name="locked" lay-skin="switch"  lay-filter="locked"  lay-text="启用|停用" <#if (flow.locked  == false)>checked=""</#if>>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-input-block">
            <button class="layui-btn" lay-submit="" lay-filter="addFlow">立即提交</button>
            <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            <a class="layui-btn layui-btn-normal" id="addField">添加节点</a>
        </div>
    </div>
</form>

<fieldset class="layui-elem-field layui-field-title" style="margin-top: 30px;">
    <legend>数据表格区域</legend>
</fieldset>
<table class="layui-hide" id="demo" lay-filter="demo"></table>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

<div class="detail-body" id="fieldForm" style="display: none">
    <form class="layui-form" style="width:90%;" id="myform">

        <div class="layui-form-item">
            <label class="layui-form-label">节点类型</label>
            <div class="layui-input-block">
                <select name="nodeType" >
                    <option value="">请选择一个节点类型</option>
                    <option value="1">申请</option>
                    <option value="2">审批</option>
                    <option value="3">执行</option>
                    <option value="4">质监</option>
                    <option value="5">观察</option>
                    <option value="6">财务</option>
                </select>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">节点名称</label>
            <div class="layui-input-block">
                <input type="text" class="layui-input" name="nodeName"  lay-verType="tips" placeholder="请输入节点名称">
                <input name="docno" type="hidden" value="${flow.docno}">
                <input name="oldName" type="hidden" value="">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">节点序号</label>
            <div class="layui-input-block">
                <input type="number" class="layui-input" lay-verType="tips" name="nodeNum"  lay-verify="lengthCheck" placeholder="请输入节点序号">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">提交节点</label>
            <div class="layui-input-block">
                <input type="number" class="layui-input" lay-verType="tips" name="commitNode" lay-verify="lengthCheck" placeholder="请输入提交节点">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">回滚节点</label>
            <div class="layui-input-block">
                <input type="number" class="layui-input" lay-verType="tips" name="backNode" lay-verify="lengthCheck" placeholder="请输入回滚节点">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit="" lay-filter="fieldFilter" id="fieldsubmit">我都填好了</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
        <form>
</div>

<script type="text/javascript" src="${base}/static/layui/layui.js"></script>
<script>
    layui.use(['form','jquery','layer','table'],function(){
        var form  = layui.form,
            layer = layui.layer,
            table = layui.table,
            $     = layui.jquery,
            fieldFormShow,
            fieldFormHtml = $("#fieldForm").html();
        var t = {
            elem: '#demo',
            url:'${base}/ding/flow/showFlows',
            method:'post',
            width: $(parent.parent.window).width()-233,
            page: false,
            limit:200,
            cols: [[
                {field: 'nodeName', title: '节点名称'},
                {field: 'nodeNum', title: '节点序号'},
                {field: 'nodeType', title: '节点类型'},
                {field: 'commitNode', title: '提交节点'},
                {field: 'backNode', title: '回滚节点'},
                {fixed: 'right',title: '操作', align: 'center',toolbar: '#barDemo'}
            ]],
            where:{s_docno:'${flow.docno}'}
        };
        var tableload = layer.msg('数据拼命加载中', {
            icon: 16
            ,shade: 0.01
        });
        setTimeout(function(){
            table.render(t);
            layer.close(tableload);
        },500);

        $("#addField").on('click',function () {
            $("#fieldForm").empty().html(fieldFormHtml);
            //form表单重新渲染
            form.render();
            layui.render("select");
           layer.open({
                type: 1,
                title: '添加流程节点',
                area:['700px', '600px'],
                content: $('#fieldForm')
            });
        });

        form.verify({
            typeCheck:function (value,item) {
                if(null == value || "" === value){
                    return '字段类型不能为空';
                }
            },
            lengthCheck:function (value,item) {
                if(value !== "" && value != null){
                    if(isNaN(value) || value<=0){
                        return '必须输入一个正整数';
                    }
                }else{
                    var v = $("select[name='type']").find("option:selected").data("default");
                    if(v !=null && v !== ""){
                        $("input[name='length']").val(v);
                        return '该类型的字段长度必须大于0';
                    }
                }
            },
            tablename:function (value,item) {
                if(null == value || '' === value){
                    return '表名不能为空';
                }
                if(/[^a-z_]{1,}$/.test(value)){
                    return '表名只能以小写英文开头且只能包含小写英文字母下划线';
                }
                if(/(^\_)|(\__)|(\_+$)/.test(value)){
                    return '字段名首尾不能出现下划线\'_\'';
                }
                if(value.indexOf('sys')>=0){
                    return '表名中不能有sys字符';
                }
            }
        });


        form.on("submit(addFlow)",function(data){
            if(data.field.id == null){
                layer.msg("流程ID不存在",{time:1000});
                return false;
            }
            if(undefined !== data.field.locked && null != data.field.locked){
                data.field.locked = false;
            }else{
                data.field.locked = true;
            }
            var loadIndex = layer.load(2, {
                shade: [0.3, '#333']
            });
            $.post("${base}/ding/flow/edit",data.field,function (res) {
                layer.close(loadIndex);
                if(res.success){
                    parent.layer.msg("流程信息修改成功!",{time:1500},function(){
                        //刷新父页面
                        parent.location.reload();
                    });
                }else{
                    layer.msg(res.message);
                }
            });
            return false;
        });

    });
</script>
</body>
</html>