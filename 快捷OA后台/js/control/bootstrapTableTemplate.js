/*
       var options = {
            url: base_url + "customer/list",
            columnModel: [
                {
                    label: '用户ID',
                    name: 'id',
                    index: "id",
                    width: 45,
                    key: true
                },
                {
                    label: '真实姓名',
                    name: 'realName'

                },
                {
                    label: '手机号',
                    name: 'mobile'

                }
            ],
            param: {},
            loadComplete: function (obj) {
                //加载完成执行
            }
        };
        var ta = $("#ta").bootstrapTableTemplate(options);
 */

(function () {
    $.fn.bootstrapTableTemplate = function (options) {
        //合并参数
        options = $.extend({}, $.fn.bootstrapTableTemplate.defaults, options || {});
        var pageId = "pageId" + Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10);
        var tableId = "tableId" + Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10);
        var div = $(this);
        var table = $("<table id='" + tableId + "'></table>");
        var page = $("<div id='" + pageId + "'></div>");
        div.append(table);
        div.append(page);
        var pageIdString = "#" + pageId;
        var beforeSelectRow = function () {
            table.jqGrid('resetSelection');
            return (true);
        }
        table.jqGrid({
            postData: options.param,
            url: options.url,
            datatype: "json",
            colModel: options.columnModel,
            viewrecords: true,
            height: 'auto',
            // height: 1000,
            rowNum: options.rowNum,
            rowList: options.rowList,
            width: 100,
            rownumbers: true,
            rownumWidth: 40,
            autowidth: true,
            multiselect: true,
            multiboxonly: !options.multiple,
            beforeSelectRow: (options.multiple ? null : beforeSelectRow),//js方法
            pager: pageIdString,
            jsonReader: {
                root: options.recordField + ".records",
                page: options.recordField + ".current",
                total: options.recordField + ".pages",
                records: options.recordField + ".total"
            },

            prmNames: {
                page: "page",
                rows: "limit",
                order: "order"
            },
            gridComplete: function () {
                table.closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                if (!options.multiple) {
                    $("#jqgh_" + tableId + "_cb").hide();
                }

            },
            loadComplete: function (info) {
                if (options.loadComplete != null) {
                    options.loadComplete.call(this, info);
                }
            }
        });
        this["page"] = page;
        this["table"] = table;
        this["param"] = options.param;
        return this;
    };

    /*
      $("#button").click(function () {
                ta.bootstrapTableTemplateQuery({name: "KAI"});
            })
       ta 是前面返回的渲染表格返回那个对象
    */
    $.fn.bootstrapTableTemplateQuery = function (param) {
        var table = this.table;
        param = $.extend(true, this.param, param);
        var postData = table.jqGrid('getGridParam', 'postData');
        $.each(postData, function (k, v) {
            delete postData[k];
        });
        var page = table.jqGrid('getGridParam', 'page');
        table.jqGrid('setGridParam', {
            postData: param,
            page: page
        }).trigger("reloadGrid");
    };

    /*

       $("#button").click(function () {
            var aa = ta.bootstrapTableTemplateSelect();
            console.log(aa);
              ta 是前面返回的渲染表格返回那个对象
        })
    *
    * */

    $.fn.bootstrapTableTemplateSelect = function (idField) {
        var table = this.table;
        var rowKey = table.getGridParam("selrow");
        if (!rowKey) {
            tips("没有选择任何内容!");
            return false;
        }
        var data = this.bootstrapTableTemplateRowData();
        var selectId = table.getGridParam("selarrrow");
        var selectData = data.filter(function (item) {
            return selectId.indexOf(item[idField]) > -1;
        });
        return selectData;
    };


    $.fn.bootstrapTableTemplateSelectId = function () {
        var table = this.table;
        var rowKey = table.getGridParam("selrow");
        if (!rowKey) {
            tips("没有选择任何内容!");
            return false;
        }
        var selectId = table.getGridParam("selarrrow");
        return selectId
    };


    $.fn.bootstrapTableTemplateRowData = function () {
        var table = this.table;
        var allCountID = table.jqGrid('getDataIDs');
        var rowData = table.jqGrid('getRowData');
        rowData.push(table.jqGrid('getRowData', allCountID[allCountID.length - 1]));
        return rowData;
    };

    /*表格回填选择框*/
    /*
    *    $("#button").click(function () {
                var aa = ta.bootstrapTableTemplateSetSelect(["3"]);
                console.log(aa);
            })

    * */
    $.fn.bootstrapTableTemplateSetSelect = function (selectId) {
        if (selectId.length > 0) {
            this.table.jqGrid('setSelection', selectId);
        }
    };

    $.fn.bootstrapTableTemplate.defaults = {
        url: null,
        columnModel: null,
        param: {},
        loadComplete: null,
        multiple: true,
        rowList: [15, 20, 25, 30, 35, 40, 45, 50, 1000000],
        recordField: "page",
        rowNum: 15
    };
})(jQuery);
