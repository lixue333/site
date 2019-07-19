
// //公共css
// import '../css/common/reset.css'
// import '../css/common/head.css'
// import '../css/common/footer.css'

// //pc  css
// import '../css/pc/inedx.css'
// import '../css/pc/about.css'
// import '../css/pc/enterpriseNews.css'
// import '../css/pc/photographer.css'
// import '../css/pc/priorityShoot.css'
// import '../css/pc/projects.css'
// import '../css/pc/question.css'

// //mobile css
// import '../css/h5/index.css'
// import '../css/h5/about.css'
// import '../css/h5/enterpriseNews.css'
// import '../css/h5/photographer.css'
// import '../css/h5/projects.css'
// import '../css/h5/question.css'
// import './swiper.min.css'

// require("expose-loader?$!jquery")


$({ property: 0 }).animate({ property: 100 }, {
    duration: 1800,
    step: function () {
        var percentage = Math.round(this.property);

        $('#progress').css('width', percentage + "%");

        //  if(percentage == 100) {
        // 	 $("#progress").addClass("done");//完成，隐藏进度条
        //  }
    }
});

//预约
var countTimer;
function getcode(id) {
    var url = 'http://wx.plus.1sight.cn/pc/code/send';
    //var $name = $(id).find('input[name="name"]');
    var $phone = $(id).find('input[name="phone"]');
    // var title = $name.val();
    // if (title == "") {
    //     showtips('请填写您的名称')
    //     return
    // }
    var val = $phone.val();
    if (!(/^1[345789]\d{9}$/.test(val))) {
        console.log('xxx')
        showtips('请输入正确的手机号码')
        return
    }
    $.getJSON(url + '?callback=?', { phone: val }, function (data) {
        // 处理数据的代码...
        if (data.code != 1) {
            clearTimeout(countTimer);
            showtips(res, message)
        } else {
            countdown(60, id)
        }
    })
}
function validCode(id) {
    var url = 'http://wx.plus.1sight.cn/pc/code/verify';
    var $phone = $(id).find('input[name="phone"]');
    var $code = $(id).find('input[name="code"]');
    var phone = $phone.val();
    var code = $code.val();
    $.getJSON(url + '?callback=?', { phone: phone, verifyCode: code }, function (data) {
        console.log(data);
        if (data.code != 1) {
            clearTimeout(countTimer);
            showtips('验证失败');
        } else {

        }
    });
}
function validform(id) {
    var $input = $(id).find('input');
    var $name = $(id).find('input[name="name"]');
    var $phone = $(id).find('input[name="phone"]');
    var title = $name.val();
    var num = $phone.val();
    if (title == "") {
        showtips('请填写您的名称')
        return
    }
    if (num == "") {
        showtips('请填写手机号')
        return
    }
    var isvalidate = true
    console.log($input)
    $input.each(function () {
        var elem = $(this);
        var name = elem.attr('name');

        var value = $.trim(elem.val());
        console.log(value)
        if (!value.length && name) {
            isvalidate = false
            showtips(elem.attr('placeholder'))
            return
        }
        if (name == 'phone' && !(/^1[34578]\d{9}$/.test(value))) {
            isvalidate = false
            showtips('请输入正确的手机号码');
            return
        }
    })
    if (isvalidate) {
        odersubmit(id)
    }

}

function countdown(timer, id) {
    if (timer > 0) {
        timer = timer - 1;
        $(id).find('.getCode').text(timer + '秒');
        countTimer = setTimeout(function () {
            countdown(timer, id);
        }, 1000);
    } else {
        $(id).find('.getCode').text('获取验证码').removeClass('active');
    }
}

function odersubmit(id) {
    var url = 'http://wx.plus.1sight.cn/pc/book/order';
    var data = {
        userName: $.trim($(id + ' input[name="name"]').val()),
        phone: $.trim($(id + ' input[name="phone"]').val()),
        verifyCode: $.trim($(id + ' input[name="code"]').val()),
    }
    $.getJSON(url + '?callback=?', data, function (data) {
        if (data.code == 1) {
            //    showtips('预约已经发送');
            $(".appointment_succee").fadeIn(300);
            $(".make_appointment").fadeOut(500);
        }
    });
}

function showtips(msg) {
    var _html = '<div class="toast__dark">' + msg + ' </div>';
    $('body').append(_html);
    setTimeout(function () {
        $('body').find('.toast__dark').remove();
    }, 3000)
}
//预约拍摄弹窗
$(".order").click(function () {
    // alert(1);
    $(".dialog").fadeIn(300);
})
//关闭预约拍摄弹窗
$(".close").click(function () {

    $(".dialog").fadeOut(300);
})



//浏览器当前窗口可视区域宽度 
if ($(window).width() > 769) {
    //吸顶
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 350) {
            $("#top").slideDown(1000);
            $("#top").css("position", "fixed");
        } else {
            $("#top").css("position", "absolute");
        }
    })
}
