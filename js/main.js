//直接同步加载
var $fullpage = $('.fullpage');
$fullpage.fullpage({
		pageClass : "pages",
		maxPage : 5,
		speed : 500
});	
//HTML加载完后再执行
$(function () {
	var count = 0;
	//绑定滚轮，键盘，触摸事件，添加pages的active样式和sidebar的on样式
	$(window).on('keydown mousewheel DOMMouseScroll touchmove', function(event) {
		var $p = $('.pages').css('height');
		var timer = null;
		clearTimeout(timer);
		//等fullpage滑动结束后再取top的值
		timer = setTimeout(function () {
			var $f = $('.fullpage').css('top');
			count = Math.abs($f.split('px')[0]) / $p.split('px')[0];
			$('.page'+(count + 1)).addClass('active').siblings().removeClass('active');
			$('[index ="'+(count+1)+'"]').addClass('on').siblings().removeClass('on');
		},600);
	});

	//点击sidebar按钮事件
	$('[index]').on('click touchstart', function(event) {
		event.preventDefault();
		var _index = $(this).attr('index');
		var $p_height = $('.pages').css('height').split('px')[0];
		$(this).addClass('on').siblings().removeClass('on');
		var timer = null;
		clearTimeout(timer);
		//延时触发添加active类的行为
		timer = setTimeout(function () {
			$('.page'+(_index)).addClass('active').siblings().removeClass('active');
		},500);
		$fullpage.animate({top: (- $p_height *(_index - 1))}, 500);
	});
})