var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var canvas = document.getElementById("canvas");
canvas.style.backgroundColor="#000";
canvas.width = bodyWidth;
canvas.height = bodyHeight;
var ctx = canvas.getContext('2d');
var r = 0,
    len = bodyHeight / 4,
    i = 0;
var  deg,r_x,r_y;
var def=0;
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //点的颜色

//生成一个圆形区域
function drawcircle() {
    ctx.clearRect(0, 0, bodyWidth, bodyHeight);
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(bodyWidth / 2, bodyHeight / 2, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

//随机生成半径的长度，根据半径计算随机点偏移的x和y的距离
function ran_radius(){
	r=Math.random()*bodyHeight/4;	
	deg=Math.random()*360;			//随机偏转的角度值
	r_x=Math.cos(deg*Math.PI/180)*r; //x轴偏移
	r_y=Math.sin(deg*Math.PI/180)*r; //y轴偏移
	// console.log(r,deg,r_x,r_y);		
}

//在圆形区域内生成一个随机分布的点
function randomPointer() {
    ctx.save();
    var cor=Math.floor(Math.random()*colors.length);	//随机颜色    
    ctx.fillStyle =colors[cor];
    // console.log(cor);
    ran_radius();
    ctx.beginPath();
    ctx.arc(bodyWidth / 2+r_x, bodyHeight / 2 +r_y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}


function scan() {
    // ctx.clearRect(0,0,bodyWidth,bodyHeight);
    ctx.save();
    ctx.strokeStyle="white";
    ctx.beginPath();
    // ctx.moveTo(bodyWidth/2,bodyHeight/2);
    // ctx.arc(bodyWidth/2,bodyHeight/2,len,0,Math.PI/6);//只会形成一道圆弧，需要通过moveTo及lineTo形成圆心到圆弧的闭合路径
    // ctx.lineTo(bodyWidth/2,bodyHeight/2);
    ctx.moveTo(0,0);
    ctx.arc(0,0,len,0,Math.PI/6);
    ctx.lineTo(0,0);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}


//开始动画入口
function loading() {
    var t = setInterval(function() {
        if (r < len) {	
            r = r + 1;
            drawcircle();//生成不断变大的圆形区域
        }
    }, 10);

    setTimeout(function() {
        clearInterval(t);	
        var y=setInterval(function() {
            if (i < 100) {		//生成指定数量的随机分布点
                randomPointer();	
                i++;
            }
            else{
                clearInterval(y);    
            }            
        }, 10);
        var sc=setInterval(function(){
            if (def<Math.PI*2) {
                def=def+Math.PI/180;            
                ctx.save();
                // ctx.clearRect(0,0,bodyWidth,bodyHeight);
                ctx.translate(bodyWidth/2,bodyHeight/2);
                ctx.rotate(def);
                scan();                
                ctx.restore();//恢复(0,0)圆心点
            }
            else{
                def=0;
            }
        },10);//3.6秒一个周期

    }, 3000);
}

//执行动画入口
loading();

//todo:重新整理逻辑，调整代码顺序和结构---------------未完成
//第一次生成的随机点要保存进数组(每个点的弧度及颜色为一对，一共100对)，每次清除画面，重新生成数组中保存的点，扇形区域进行不断的旋转角度
//增加，同时要判断数组数组中的随机点弧度是否在旋转扇形区域内，是就绘制出来，否则跳过，形成雷达扫描的动画效果