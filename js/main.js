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
	$(window).on('keydown mousewheel DOMMouseScroll touchmove', function(e) {
		var event = e || window.event;
		if(event.type === 'keydown' && event.keyCode !== 38 && event.keyCode !== 40) return false;
		var $p = $('.pages').css('height'),
			timer = null;
		clearTimeout(timer);
		//等fullpage滑动结束后再取top的值
		timer = setTimeout(function () {
			var $f = $('.fullpage').css('top');
			count = Math.abs($f.split('px')[0]) / $p.split('px')[0];
			if(count !== 3) $('.description').removeClass('touchon');//去除page4的touchon类
			$('.page'+(count + 1)).addClass('active').siblings().removeClass('active');
			$('[index ="'+(count+1)+'"]').addClass('on').siblings().removeClass('on');
		},600);
	});

	//点击sidebar按钮事件
	$('body').on('click','[index]',function(e) {
		var event = e || window.event,
			_index = $(this).attr('index'),
			$p_height = $('.pages').css('height').split('px')[0],
			timer = null,
			count = _index - 1;//更新count值
		$(this).addClass('on').siblings().removeClass('on');
		clearTimeout(timer);
		//延时添加active类
		timer = setTimeout(function () {
			$('.page'+(_index)).addClass('active').siblings().removeClass('active');
		},500);
		$fullpage.animate({top: (- $p_height *(_index - 1))}, 500);
		//去除page4的touchon类
		if(count !== 3) $('.description').removeClass('touchon');
	});

	//触摸pgitem展开事件，使用touchend触发增加体验性。
	$('.pgtitle').on('touchend', function(e) {
		var event = e || window.event;
		event.preventDefault();
		var _currentdes = $(this.parentNode).find('.description');
		_currentdes.addClass('touchon');
		$('.description').not(_currentdes[0]).removeClass('touchon');
	});
})	