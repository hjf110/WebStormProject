/*弹窗控件*/

/*
   var options = {
        title: "选择",
        le: "./userA.html",
        size: ["400px", "300px"],
        param: {name: "KAI"},
        buttonCallback: [function () {
            alert("AA");
        }],
        end: function () {
            alert("end");
        }
    }
    $(function () {
            $("#button").click(function () {
                $.layerDialog(options);
            })

        }
    )
* */


(function () {
    $.extend({
        layerDialogIframe: function (options) {
            var defaultsOptions = {
                title: "弹窗",
                le: "null",
                size: [100, 100],
                param: {},
                button: ['确认', '取消'],
                buttonCallback: [
                    function (layerDialog) {
                        console.log(layerDialog);
                        layer.close(layerDialog.index);
                        return true;
                    },
                    function (layerDialog) {
                        return true;
                    }
                ],
                cancel: function (layerDialog) {
                    return true;
                },
                success: function (layerDialog) {
                    return true;
                },
                end: function (layerDialog) {
                    return true;
                }

            };
            var layerDialog = null;
            options = $.extend(true, defaultsOptions, options);
            var layerDialogId = "layerDialog" + Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10);
            options.layerDialogId = layerDialogId;
            var content = options.le;
            var layerOpen = {
                id: layerDialogId,
                title: options.title,
                type: 2,
                maxmin: true,
                content: content,
                shade: [0.01, '#393D49'],
                area: options.size,
                btn: options.button,
                success: function (layero, index) {
                    var iframeWindow = $("#" + layerDialogId).find("iframe").get(0).contentWindow;
                    iframeWindow.layerDialog = options;
                    iframeWindow.layerDialog.layero = layero;
                    iframeWindow.layerDialog.index = index;
                    iframeWindow.InitComplete();
                    layerDialog = iframeWindow.layerDialog;
                    options.success(layerDialog);
                },
                cancel: function () {
                    options.cancel(layerDialog);
                },
                end: function () {
                    options.end(layerDialog);
                }
            };
            $.each(options.buttonCallback, function (i, e) {
                layerOpen["btn" + (++i)] = function () {
                    e(layerDialog);
                };
            })
            layer.open(layerOpen);
            return layerDialog;
        }
    })

    /*
    *
    $.layerDialogInitComplete(function () {
        window.layerDialog["AAAAAAAA"] = "AAAAAAA";
    })
    *
    * */
    $.extend({
        layerDialogInitComplete: function (event) {
            window.InitComplete = event;
        }
    })


    /*
   var options = {
        title: "选择",
        le: "#h1",
        size: ["400px", "300px"],
        param: {name: "KAI"},
        buttonCallback: [function () {
            alert("AA");

        }],
        end: function () {
            alert("end");
        }
    }
    $(function () {
            $("#button").click(function () {
                $.layerDialog(options);
            })

        }
    )

* */

    $.extend({
        layerDialog: function (options) {
            var defaultsOptions = {
                title: "弹窗",
                le: "null",
                size: [100, 100],
                param: {},
                button: ['确认', '取消'],
                buttonCallback: [
                    function (layerDialog) {
                        console.log(layerDialog);
                        layer.close(layerDialog.index);
                        return true;
                    },
                    function (layerDialog) {
                        return true;
                    }
                ],
                cancel: function (layerDialog) {
                    return true;
                },
                success: function (layerDialog) {
                    return true;
                },
                end: function (layerDialog) {
                    return true;
                }

            };
            var layerDialog = null;
            options = $.extend(true, defaultsOptions, options);
            var layerDialogId = "layerDialog" + Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10);
            options.layerDialogId = layerDialogId;
            var content = $(options.le);
            var layerOpen = {
                id: layerDialogId,
                title: options.title,
                type: 1,
                maxmin: true,
                content: content,
                shade: [0.01, '#393D49'],
                area: options.size,
                btn: options.button,
                success: function (layero, index) {
                    var iframeWindow = window;
                    iframeWindow.layerDialog = options;
                    iframeWindow.layerDialog.layero = layero;
                    iframeWindow.layerDialog.index = index;
                    layerDialog = iframeWindow.layerDialog;
                    options.success(layerDialog);
                },
                cancel: function () {
                    options.cancel(layerDialog);
                },
                end: function () {
                    options.end(layerDialog);
                }
            };
            $.each(options.buttonCallback, function (i, e) {
                layerOpen["btn" + (++i)] = function () {
                    e(layerDialog);
                };
            })
            layer.open(layerOpen);
            return layerDialog;
        }
    })


})(jQuery);





