function eggAnimation(e) {	//此e非彼event,是形式参数,可以用其他字符代替foo
	console.log(e);
	exe++;
	hammer.classList.add("hammer-beat" + e);
	setTimeout(function() {	      //播放蛋碎点的gif
		var t = $(".egg" + e)[0];
		t.src = "images/egg-chip.gif";
	}, 500);
	setTimeout(function() {			//隐藏掉破碎弹的gif，显示礼物及三个蛋壳碎片
		$(".gongxi" + e)[0].classList.remove("hidden");
		$(".egg-chip-wrap")[e - 1].classList.remove("hidden");
		$(".egg" + e)[0].classList.add("hidden");
	}, 2000);
	setTimeout(function() {
		$(".mask")[0].classList.remove("hidden");
		$("#award").text(text);
		$(".zhongjiang")[0].classList.add("mask-show" + e);
	}, 3000);
}

// setTimeout()的原理：遇到setTimeout就把普通定时器加入到执行队形，以时间原点为标准，而不是上个setTimeout函数执行完以后再开始计时
// setTimeout(
// 	function(){
// 		console.log("ok");
// },1000);
// setTimeout(
// 	function(){
// 		console.log("error");
// },10);
// console.log("first");
//结果先输出first,再输出error,最后输出ok

function whichEgg() {
	egg1_right > pageX && pageY > egg1_top ? eggAnimation(1) : egg2_right > pageX && pageX > egg2_left && pageY > egg2_top ? eggAnimation(2) : pageX > egg3_left && pageY > egg1_top && eggAnimation(3)
}

$(function() {			//评论滚动代码
	var t = $("#activity ul");
	var g = 0;
	function e(){
		t.animate({
			top: g - 0.4 + "rem"
		}, 1000, "linear", function() {
			t.css({
				top: "0rem"
			}).find("li:first").appendTo(t); 
			e();
		});
	}	
	e();
}); 

//弹窗关闭后，重新加载页面，为下次砸蛋做准备，而不是隐藏弹窗
$(".close").click(function() {
	window.location.href = window.location.href;
});

var x_start,
 	y_start, 
 	x,
  	y,
   	pageX, 
   	pageY, 
	egg1 = $(".egg1")[0],
	egg2 = $(".egg2")[0],
	egg3 = $(".egg3")[0],
	hammer = $(".hammer")[0],
	egg1_right = egg1.offsetLeft + 0.9 * egg1.offsetWidth,
	egg1_top = egg1.offsetTop - 0.5 * hammer.offsetWidth,
	egg2_left = egg2.offsetLeft + 0.1 * egg2.offsetWidth,
	egg2_right = egg2.offsetLeft + 0.9 * egg2.offsetWidth,
	egg2_top = egg2.offsetTop,
	egg3_left = egg3.offsetLeft + 0.1 * egg3.offsetWidth,
	hammer_left = 0,
	hammer_top = 0;
var exe = 0;

//哪个蛋被点击，锤子就移动到哪个蛋的上方，通过给锤子添加带有移动动画的类来实现效果，PC端和移动端均可响应
egg1.onclick = function() {
	$(".hammer").animate({		//移动锤子
		left: "1.1rem",
		top: "2.86rem"
	}, 500, "linear", function() {	//jquery动画完成后执行，给蛋添加CSS动画（锤蛋效果）
		eggAnimation(1);
	})
};
egg2.onclick = function() {
	$(".hammer").animate({
		left: "2.8rem",
		top: "3rem"
	}, 500, "linear", function() {
		eggAnimation(2);
	})
}; 
egg3.onclick = function() {
	$(".hammer").animate({
		left: "4.8rem",
		top: "2.86rem"
	}, 500, "linear", function() {
		eggAnimation(3);
	})
};

var text, flag;
flag = Math.ceil(9 * Math.random()); 
text = flag >= 1 && 3 >= flag ? "一等奖 短线潜力金股" : flag >= 4 && 6 >= flag ? "二等奖 短线秘籍《短炒逻辑》" : "一等奖 短线潜力金股";


//以下为移动端的监听事件
hammer.addEventListener("touchstart", function(e) {
	console.log(e);
	e.preventDefault();
	x_start = e.touches[0].pageX;
	y_start = e.touches[0].pageY;
});

hammer.addEventListener("touchmove", function(e) {
	pageX = e.touches[0].pageX;
	pageY = e.touches[0].pageY;
	x = pageX - x_start;
	y = pageY - y_start;
	hammer.style.transform = "translate(" + x + "px," + y + "px)";
	0 == exe && whichEgg();
});

hammer.addEventListener("touchend", function(e) {
	var t = hammer.offsetTop,
		g = egg2.offsetTop + egg2.offsetHeight;
	(t > pageY || pageY > g) && (hammer.style.transform = "");
});