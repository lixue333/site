$({ property: 0 }).animate({ property: 100 }, {
    duration: 3000,
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
function getcode(id){
    var url = '/pc/code/send';
    var $phone = $(id).find('input[name="phone"]');
    var val = $phone.val();
    if (!(/^1[345789]\d{9}$/.test(val))) {
        console.log('xxx')
        showtips('请输入正确的手机号码')
        return
    }
    $.getJSON(url + '?callback=?', {phone: val}, function(data) {
        // 处理数据的代码...
        if (data.code != 1) {
            clearTimeout(countTimer);
            showtips(res,message)
        }else{
            countdown(60,id)
        }
    })
}
function  validCode(id) {
    var url = '/pc/code/verify';
    var $phone = $(id).find('input[name="phone"]');
    var $code = $(id).find('input[name="code"]');
    var phone = $phone.val();
    var code = $code.val();
    $.getJSON(url + '?callback=?', {phone: phone, verifyCode: code}, function(data) {
        console.log(data);
        if (data.code != 1) {
        clearTimeout(countTimer);
        showtips('验证失败');
        } else {
          
        }
    });
}
function validform(id){
    var $input = $(id).find('input');
    var isvalidate =  true
    console.log($input)
    $input.each(function() {
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
    if(isvalidate){
       odersubmit(id)
    }
   
}

function countdown(timer, id) {
    if (timer > 0) {
        timer = timer - 1;
        $(id).find('.getCode').text(timer + '秒');
        countTimer = setTimeout(function() {
        countdown(timer, id);
        }, 1000);
    } else {
        $(id).find('.getCode').text('获取验证码').removeClass('active');
    }
}

function odersubmit(id){
    var url = '/pc/book/order';
    var data = {
        userName: $.trim($(id+' input[name="name"]').val()),
        phone: $.trim($(id+' input[name="phone"]').val()),
        verifyCode: $.trim($(id+' input[name="code"]').val()),
    }
    $.getJSON(url + '?callback=?', data, function(data) {
        if (data.code == 1) {
           showtips('预约已经发送')
        }
    });
}

function showtips(msg) {
    var _html = '<div class="toast__dark">' + msg+' </div>';
    $('body').append(_html);
    setTimeout(function () {
      $('body').find('.toast__dark').remove();
    },2000)
}