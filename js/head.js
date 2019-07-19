$(".iconkediankai").click(function(){
    $(".coverbar").slideToggle(300);
    $(".headerbar").slideToggle(300);
    $(this).toggleClass("iconel-icon-close")
})

$('.list_dic').on('click', '.list_dic_li', function() {
    var $this = $(this);
    console.log($this);
    $this.next().slideToggle(300);
   // $this.find('i').toggleClass('active');
  })