/*
*     options.initData = [{name: "name", id: 1, url: "http://106.12.22.69:10121/tx.jpg"}];
* */

(function () {


    $.fn.bootstrapFileInput = function (options) {
        //合并参数
        var div = $(this);
        var target = $('<input  type="file" class="file" />');
        div.append(target);
        var defaultsOptions = {
            multiple: true,
            uploadUrl: "uploadUrl",
            allowedFileExtensions: ['JPG', 'JPEG', 'PNG', 'GIF'],
            uploadExtraData: {},
            deleteUrl: "deleteUrl",
            deleteExtraData: {},
            showPreview: true,
            initData: [],
            initFileNameField: "name",
            initFileIdField: "id",
            initFileUrlField: "url",
            initDataUrl: "initDataUrl",
            initDataParam: {},
            fileuploaded: function (event, data, previewId, index) {
                console.log(data);
            }
        };
        //caption: 'desert.jpg',// 展示的图片名称
        //width: '120px',// 图片高度
        //url: '{:U('localhost/delete')}',// 预展示图片的删除调取路径
        //key: 100,// 可修改 场景2中会用的
        //extra: {id: 100} //调用删除路径所传参数

        options.initData = [{name: "name", id: 1, url: "http://106.12.22.69:10121/tx.jpg"}];
        var initialPreview = [];
        var initialPreviewConfig = [];
        //http://106.12.22.69:10121/tx.jpg
        options = $.extend(true, defaultsOptions, options);
        if (options.multiple) {
            target.attr("multiple", "multiple");
        }


        var fileInputInit = function (target, options) {
            target.fileinput({
                language: 'zh', //设置语言
                uploadUrl: options.uploadUrl, //上传的地址
                allowedFileExtensions: options.allowedFileExtensions,//接收的文件后缀
                uploadExtraData: options.uploadExtraData,
                deleteUrl: options.deleteUrl,// 删除图片时的请求路径
                deleteExtraData: options.deleteExtraData, // 删除图片时的请求参数
                uploadAsync: true, //默认异步上传
                showUpload: true, //是否显示上传按钮
                showRemove: true, //显示移除按钮
                showPreview: options.showPreview, //是否显示预览
                showCaption: false,//是否显示标题
                browseClass: "btn btn-primary", //按钮样式
                dropZoneEnabled: false,//是否显示拖拽区域
                //minImageWidth: 50, //图片的最小宽度
                //minImageHeight: 50,//图片的最小高度
                //maxImageWidth: 1000,//图片的最大宽度
                //maxImageHeight: 1000,//图片的最大高度
                //maxFileSize:0,//单位为kb，如果为0表示不限制文件大小
                //minFileCount: 0,
                maxFileCount: 10, //表示允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount: true,
                overwriteInitial: false,
                initialPreview: options.initialPreview,//这里配置需要初始展示的图片连接数组，字符串类型的，通常是通过后台获取后然后组装成数组直接赋给initialPreview就行了
                initialPreviewConfig: options.initialPreviewConfig,//配置预览中的一些参数
                previewFileIcon: "<i class ='glyphicon glyphicon-king'></i>",
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            })
            target.on("fileuploaded", function (event, data, previewId, index) {
                options.fileuploaded(event, data, previewId, index);
            });

        }

        if (options.initData.length > 0) {
            $.each(options.initData, function (i, e) {
                // {caption: "transport-1.jpg", size: 329892, width: "120px", url: "deletePic", key: 1},
                initialPreviewConfig.push({
                    width: "120px",
                    caption: e[options.initFileNameField],
                    key: e[options.initFileIdField]
                });
                var img = '<img src="' + e[options.initFileUrlField] + '" style="width:auto;height:auto;max-width:100%;max-height:100%;">'
                initialPreview.push(img);
            })

            options.initialPreviewConfig = initialPreviewConfig;
            options.initialPreview = initialPreview;
            fileInputInit(target, options);
        } else {
            $.getJSON(options.initDataUrl, options.initDataParam, function (data) {
                options.initialPreviewConfig = data.initialPreviewConfig;
                options.initialPreview = data.initialPreview;
                fileInputInit(target, options);
            });
        }
    }


})(jQuery);


