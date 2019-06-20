//开始封装下拉单选JS方法
(function () {
    $.fn.bootstrapSelect = function (options, param) {
        //合并参数
        options = $.extend({}, $.fn.bootstrapSelect.defaults, options || {});
        var div = $(this);
        var target = $("<select></select>");
        div.append(target);
        target.addClass("bootstrapSelect")
        if (!target.hasClass("selectpicker")) {
            target.addClass("selectpicker")
        }
        target.attr('data-live-search', "true");
        target.attr('valuefield', options.valueField);
        target.attr('textfield', options.textField);
        target.attr('selectedField', options.selectedField);
        target.attr('selectedValueField', options.selectedValueField);
        target.attr('title', options.placeholder);
        target.empty();
        //如果存在data
        if (options.data.length > 0) {
            init(target, options.data);
        }
        else {
            //开始加载
            if (options.onBeforeLoad != null) {
                options.onBeforeLoad.call(target, options.param);
            }

            if (!options.url) return;
            $.getJSON(options.url, options.param, function (data) {
                init(target, data);
            });
        }

        function init(target, data) {
            $.each(data, function (i, item) {
                var option = $('<option></option>');
                option.attr('value', item[options.valueField]);
                option.text(item[options.textField]);
                if (item[options.selectedField] == options.selectedValueField) {
                    option.attr("selected", "selected")
                }
                target.append(option);
            });
            //渲染OK
            if (options.onLoadSuccess != null) {
                options.onLoadSuccess.call(target);
            }
        }
    };
    $.fn.bootstrapSelect.defaults = {
        url: null,
        param: null,
        data: null,
        valueField: 'value',
        textField: 'text',
        selectedField: "selected",
        selectedValueField: "selected",
        placeholder: '请选择',
        onBeforeLoad: null,
        onLoadSuccess: null
    };
    //初始化
    $(".bootstrapSelect").each(function () {
        var target = $(this);
        target.selectpicker();
    });
})(jQuery);