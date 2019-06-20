jQuery(function ($) {
    $(document).on('click', '.toolbar a[data-target]', function (e) {
        e.preventDefault();
        var target = $(this).data('target');
        $('.widget-box.visible').removeClass('visible'); //hide others
        $(target).addClass('visible'); //show target
    });
});

//you don't need this, just used for changing background
jQuery(function ($) {
    $('#btn-login-dark').on('click', function (e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-light').on('click', function (e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-blur').on('click', function (e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');

        e.preventDefault();
    });

});

var vm = new Vue({
    el: '#armorapp',
    data: {
        username: '',
        password: '',
        captcha: '',
        error: false,
        errorMsg: '',
        src: baseURL + 'captcha.jpg'
    },
    beforeCreate: function () {
        if (self != top) {
            top.location.href = self.location.href;
        }
    },
    methods: {
        refreshCode: function () {
            this.src = baseURL + "captcha.jpg?t=" + $.now();
        },
        login: function () {
            var data = "username=" + vm.username + "&password=" + vm.password + "&captcha=" + vm.captcha;
            $.ajax({
                type: "POST",
                url: baseURL + "sys/login",
                data: data,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) { //登录成功
                        localStorage.setItem("token", r.token);
                        parent.location.href = 'index.html';
                    } else {
                        vm.error = true;
                        vm.errorMsg = r.msg;
                    }
                }
            });
        }
    }
});

$(function () {
    $(".qRCodeLogin").click(function () {
        window.location.href = "https://oapi.dingtalk.com/connect/qrconnect?appid=" + config.appid + "&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" + config.authorizationUrl;
    })
})