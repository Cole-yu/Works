var w = document.body.clientWidth;
var h = document.body.clientHeight;
var canvas = document.createElement('canvas');
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas); //在body的当前最后一个子元素后面添加canvas子节点，使其成为最后子元素
canvas.style.backgroundColor = "#0073B3";	//dom操作

var context = canvas.getContext('2d');
var Rot = 0;			//圆环弧度
var R_init = 0;			//内圆逐渐增大时的半径
var timer = null;		//弧度逐渐增加的函数
var targent_R = Math.round(w / 10);		//屏幕的十分之一长度四舍五入取整=内圆欲期半径

setInterval(function() {
	R_init = R_init + 1;				//内圆不断增大
	if (R_init < targent_R + 1) {		//当内圆当前半径小于内圆欲期半径+1时
		Drawcilrcle(context, R_init);
		if (R_init === targent_R) {		//当内圆当前半径等于内圆欲期半径时
			setTimeout(function() {		//50毫秒延迟后开始执行匿名函数（先初始化，再定义）
				clearInterval(timer);							//清除tiem函数（用于增加圆环弧度）
				timer = setInterval(function() {				//定时增加弧度的函数
					Rot = Rot + 1;
					if (Rot < 180) {									//当弧度小于180度时，
						Drawcilrcle(context, targent_R);				//绘制内圆
						Drawmove(context, targent_R, Rot);				//绘制一半环形进度条
						Drawmove_bottom(context, targent_R, Rot);		//绘制另一半环形进度条
						Drawtext(context, Rot);							//绘制数字进度文字
					} else if (Rot === 180) {							//当弧度达到180度时
						Drawcilrcle(context, targent_R);
						Drawfinsh(context, targent_R, 360);				//绘制完整环形进度条
						Drawtext(context, Rot);
						console.log("ok");//因为Rot大于180后没有分支可以走，没有清除画布，所以最后的图像一直存在屏幕中
						clearInterval(timer);	//停止执行定时器调用函数
					}
				}, 10);
			}, 50);
		}
	}
}, 5);

// 开始逐渐变大的圆及圆环
function Drawcilrcle(cxt, r) {
	cxt.clearRect(0, 0, w, h);		//清除画布
	cxt.beginPath();
	cxt.arc(w / 2, h / 2, r, 0, 2 * Math.PI);
	cxt.fillStyle = "rgba(255,255,255,0.2)";
	cxt.fill();
	cxt.beginPath();
	cxt.arc(w / 2, h / 2, r + 20, 0, 2 * Math.PI);
	cxt.strokeStyle = "rgba(0,0,0,0.2)";
	cxt.lineWidth = 1;
	cxt.stroke();
	cxt.closePath();
}

//绘制逐渐变长的环形进度条一半
function Drawmove_bottom(cxt, r, rot) {
	cxt.save();
	cxt.beginPath();
	cxt.translate(w / 2, h / 2); 				//将画布坐标系原点移至中心
	cxt.rotate(rot / 180 * Math.PI);
	cxt.translate(-(w / 2), -(h / 2)); 			//修正画布坐标系
	cxt.arc(w / 2, h / 2, r + 20, 0, rot / 180 * Math.PI);
	cxt.strokeStyle = "rgba(255,255,255,0.3)";
	cxt.lineWidth = 6;
	cxt.stroke();
	cxt.closePath();
	cxt.restore();
}

//绘制逐渐变长的环形进度条另一半
function Drawmove(cxt, r, rot) {
	cxt.save();
	cxt.beginPath();
	cxt.translate(w / 2, h / 2); 				//将画布坐标系原点移至中心
	cxt.rotate(rot / 180 * Math.PI);
	cxt.translate(-(w / 2), -(h / 2)); 			//修正画布坐标系
	cxt.arc(w / 2, h / 2, r + 20, 180 / 180 * Math.PI, (rot + 180) / 180 * Math.PI);
	cxt.strokeStyle = "rgba(255,255,255,0.3)";
	cxt.lineWidth = 6;
	cxt.stroke();
	cxt.restore();
	cxt.closePath();
}

//绘制载入完成后的完整环形进度条，函数Drawmove_bottom与Drawmove的合体
function Drawfinsh(cxt, r, rot) {
	cxt.save();
	cxt.beginPath();
	cxt.arc(w / 2, h / 2, r + 20, 0, 2 * Math.PI);
	cxt.strokeStyle = "rgba(255,255,255,0.3)";
	cxt.lineWidth = 6;
	cxt.stroke();
	cxt.restore();
	cxt.closePath();
}


//中间的数字载入进度
function Drawtext(cxt, rot) {
	cxt.save();
	cxt.beginPath();
	cxt.textAlign = "center";
	cxt.font = " 20pt  Aira";
	cxt.fillStyle = "rgba(255,255,255,1)";
	cxt.fillText(Math.round(rot / 180 * 100) + "%", w / 2, h / 2+10);
	cxt.restore();
	cxt.closePath();
}