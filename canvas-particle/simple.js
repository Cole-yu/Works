window.requestAnimationFrame=window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var points=[];

var canvas=document.createElement("canvas");
document.body.appendChild(canvas);
var context=canvas.getContext("2d");

var width_height_num=640;
var width=width_height_num;
var height=width_height_num;

canvas.width=width;
canvas.height=height;

//获取字母的关键点坐标(x,y)
function getPoints(){
	// 间隙大小
	var gap=13;
	var imgData=context.getImageData(0,0,width,height).data;
	var pos=[];
	var x=0,y=0,index=0;
	for(var i=0;i<imgData.length;i+=(4*gap)){//i=40508
		//在canvas中，有效的文字区域透明度为1,无效区域alpha=0,透明无色
		if(imgData[i+3]==255){		//假设:i=8,i+3=11时为255:色系点[8,11]为第3个点的rgba值，8/4=2,计数是从0开始的，[0,1,2,]下标为2的点正是第3个点
			pos.push({
				x:x,
				y:y
			});
		}
		//所有点坐标计数从0开始
		index=Math.floor(i/4);//index=2,第3个点
		x=index%width;//x=2 每行320个点，取余则为x轴坐标，x坐标为第3列
		y=Math.floor(index/width);//y=0，整除则为第y+1行

		//位于307-320的点，需要换行处理
		if(x>=width-gap){//207>=（320-13=307）=>flase
			i+=gap*4*width;
		}
	}
	points=pos;
	console.log(points);
}


window.onload=function(){
	context.fillStyle="red";
	context.font="380px arial";
	context.clearRect(0,0, width,height);
	context.fillText("4",width/4,height/2);
	getPoints();	
	refreshPoints();
}


// 存储需要绘制的圆点实例
var store={};
// 动画效果主方法
function refreshPoints(){
	var canvas=document.querySelector("#plexus");
	var context=canvas.getContext("2d");

	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;

	var width=canvas.width;
	var height=canvas.height;

	function Dot(coord){	//JS创建类方法
		this.arcX=width/2;
		this.arcY=height/2;
		// 半径大小
		var r=5.5;
		// 默认透明度
		this.opacity=1;
		// 初始时间
		this.start=0;
		//每个实例自身绘制方法
		this.draw=function(){			//构造器方法
			context.beginPath();
			context.arc(this.arcX,this.arcY,r,0,2*Math.PI);
			context.fillStyle="rgba(59,166,241,"+this.opacity+")";
			context.closePath();
			context.fill();			
		}
	}
	//通过循环遍历把所有实例绘制出来
	function draw(){
		for( var index in store){
			var dot=store[index];
			// 目标位置
			var startX=dot.startX;
			var startY=dot.startY;

			var distanceX=dot.distanceX;
			var distanceY=dot.distanceY;

			//实例圆心的(x,y)坐标计算
			dot.arcX=distanceX+startX;
			dot.arcY=distanceY+startY;

			dot.draw();	
		}
	}

	function init(){
		points.forEach(function(coord,index){
			var dot=store[index];
			if(!dot){
				dot=new Dot(coord);
				store[index]=dot;
			}
			dot.opacity=1;
			// 给予dot目标位置
			dot.startX=dot.arcX;
			dot.startY=dot.arcY;
			// 确定好移动距离
			//coord为当前圆心的(x.y),dot为默认初始化圆心的(x,y)，所有的当前原点的距离都以中心点(width/2,height/2)为起点进行测量
			dot.distanceX=coord.x-dot.arcX;
			dot.distanceY=coord.y-dot.arcY;
			// console.log(dot);
		});
	}
	// 初始化
	init();
	
	// 绘制画布上所有的圆点
	function render(){
		// 清除画布
		context.clearRect(0,0,width,height);

		draw();// 绘制画布上所有的圆点

		console.log("run");

		// requestAnimationFrame(render);
	}
	//第一次绘制
	render();
}
