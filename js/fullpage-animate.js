;(function (window,$) {
	$.fn.fullpage = function (options) {
		//pageClass : 子页面的类名
		//maxPage ： 子页面的总数
		//speed : 滑动速度
		options = $.extend({
			pageClass : "pages",
			maxPage : 5,
			speed : 1000
		},options);

		var _tag = 0,
			$this = $(this);
		//定义触摸移动时的坐标
		var startY,
			moveY;

		//根据当前页面情况获取tag值
		function flashTag() {
			var $p = $('.pages').css('height'),
				$f = $('.fullpage').css('top');
			_tag = Math.abs($f.split('px')[0]) / $p.split('px')[0];
		}

		//向下滑动
		function _next() {
			//边界判断
			flashTag();
			if(_tag !== options.maxPage - 1){
			    if(!$this .is(":animated")){
			        $this .animate({top : "-="+$sections[0].offsetHeight}, options.speed);
			    }
			}
		}
		//向上滑动
		function _prev() {
			//边界判断
			flashTag();
			if(_tag !== 0){         
			     if(!$this .is(":animated")){
			         _tag -= 1;
			         $this .animate({top : "+="+$sections[0].offsetHeight}, options.speed);
			     }
			 }
		}

		//配置关键样式
		$('body').css('overflow', 'hidden');
		$this .css({
			position: 'relative',
			top: '0'
		});
		var $sections = $this.children('.'+options.pageClass);
		$sections.css('width', '100%');
		$sections.css('height', window.innerHeight+'px');

		//绑定resize事件
		$(window).resize(function(event) {
			flashTag();
	        $sections.css('height', window.innerHeight+'px');
	        $this .css('top', '-'+ window.innerHeight * _tag +'px');
   		 });
		//绑定keydowm事件
	    $(window).on(
	    	'keydown' , function(e) {
	    		var event = e || window.event;
		    	 if(event.keyCode == 40) {
		            _next();
		       	 }else if(event.keyCode == 38) {
		           	_prev();
		         }
	   		 });
	    //绑定滚轮事件
	    $(window).on('mousewheel DOMMouseScroll', function(e) {
	    	var event = e || window.event;
	    	//兼容firefox
	    	var delta = event.originalEvent.detail !== 0 ? -event.originalEvent.detail : event.originalEvent.wheelDelta;
	    	if(delta < 0) {
	    		if(_tag !== options.maxPage - 1){
	    		    _next();
	    		}
	    	}else if(delta > 0) {
	    		if(_tag !== 0){         
	    		     _prev();
	    		 }
	    	}
	    });
	    //绑定触屏滑动事件
	    $(window).on('touchstart', function(e) {
	    	var event = e || window.event;
	    	event.preventDefault();
	    	startY = event.originalEvent.changedTouches[0].pageY;
	    });
	    $(window).on('touchmove', function(e) {
	    	var event = e || window.event;
	    	event.preventDefault();
	    	moveY = event.originalEvent.changedTouches[0].pageY;
	    	var Y = moveY - startY;
	    	if(Y > 0){
	    		_prev();
	    	}else if(Y < 0) {
	    		_next();
	    	}
	    });
	}
	return this;
}(window,jQuery))