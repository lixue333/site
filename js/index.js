 /*头图轮播*/
 var bannerText = ["谱时图片直播", "2019GMIC智能影像峰会", "2018天猫双11狂欢夜", "WBA世界拳王争霸赛", "LVMH路威酷轩年度盛典"]
 import Swiper from 'swiper'
 var swiper = new Swiper('.swiper-container', {
     autoplay: true,
     pagination: {
         el: '.swiper-pagination',
         clickable: true,
         paginationClickable: true,
         renderBullet: true,
         pagination: '.swiper-pagination',
         renderBullet: function (index, className) {
             return '<div class="' + className + '" ><div class="swiper-small" style="background-image:url(./img/pc/index/banner' + (index + 1) + '.png);" ><p>' + bannerText[index] + '</p></div></div>';
         },
     },
 });


 /*新闻hover*/
 $(".news ul li ").hover(function () {
     var index = $(this).index();
     $(".news li").eq(index).find('.coverbg').fadeIn();
 }, function () {
     var index = $(this).index();
     $(".news li").eq(index).find('.coverbg').fadeOut();
 });


 /*案例轮播*/
 var caseIndex = 0

 $('.list li').click(function () {
     caseIndex = $(this).index()
     swiper = new swiperCase()
 })
 function swiperCase() {
     this.width = $('.carousel_wrap .banner li').width()
     this.swiperContainer = $('.carousel_wrap .banner').eq(caseIndex)
     this.sliderLength = this.swiperContainer.find('li').length
     this.swiperPage = $('.list li')
     this.index = 0
     this.autoTime = null;
     var _this = this
     this.switch()
     this.auto()
     $('.box .left').click(function () {
         _this.left()
     })
     $('.box .right').click(function () {
         _this.right()
     })
     $('.box').mouseover(function () {
         clearInterval(_this.autoTime)
     })
     $('.box').mouseout(function () {
         _this.auto()
     })

 }
 swiperCase.prototype.left = function () {
     if (this.index == 0) {
         caseIndex--
         if (caseIndex < 0) {
             this.caseIndex = this.swiperPage.length - 1
         }
         this.switch()
     }
     if (this.index > 0) {
         this.index--
         this.swiperContainer.css('transform', 'translate3d(' + -this.index * this.width + 'px, 0, 0)')
     }
 }
 swiperCase.prototype.right = function () {
     if (this.index == this.sliderLength - 1) {
         this.index = 0
         caseIndex++
         if (caseIndex > this.swiperPage.length - 1) {
             caseIndex = 0
         }
         this.switch()
     }
     if (this.index < this.sliderLength - 1) {
         this.index++
         this.swiperContainer.css('transform', 'translate3d(' + -this.index * this.width + 'px, 0, 0)')
     }
 }
 swiperCase.prototype.switch = function () {
     this.swiperContainer = $('.carousel_wrap .banner').eq(caseIndex)
     this.swiperPage.eq(caseIndex).addClass('active').siblings().removeClass('active')
     $('.carousel_wrap .banner').eq(caseIndex).show().siblings().hide()
 }
 swiperCase.prototype.auto = function () {
     var _this = this
     this.autoTime = setInterval(function () {
         _this.right()
     }, 3000)
 }

 var swiper = new swiperCase()

 $('.favorable .getCode').click(function () {

     if ($(this).text() == '获取验证码') {
         console.log($(this).text())
         getcode('#indexform')
     }
 })
 $(".dialog .getCode").click(function () {

     if ($(this).text() == '获取验证码') {
         console.log($(this).text())
         getcode('#indexdialog')
     }
 })
 $('.appointmentBtn').click(function () {
     validform('#indexform')
 })
 $(".close_img").click(function () {
     $(".appointment_succee").fadeOut(300);
     $(".make_appointment").fadeIn(300);
 })
