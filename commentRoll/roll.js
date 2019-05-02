$(function() {
	var $this = $("#news");
	var scrollTimer;
	$this.hover(function() {		//hover(mouseenter,mouseleave),移入和移开时两个函数
		clearInterval(scrollTimer);
	}, function() {
		scrollTimer = setInterval(function(){
			scrollNews($this);
		}, 500);
	}).trigger("mouseleave");	//$this.trigger("mouseleave"),在dom树渲染完成后触发$this对象的mouseleave事件,

	function scrollNews(obj) {
		var $self = obj.find("ul");//在目标中需要ul标签
		var lineHeight = $self.find("li:first").height();//获取作为第一子元素的li标签的高度
		$self.animate({
			"marginTop": -lineHeight + "px"
		}, 600, function() {
			$self.css({
				marginTop: 0
			}).find("li:first").appendTo($self);	//相当于剪切操作
		})
	}
})