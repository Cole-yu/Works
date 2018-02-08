//思考：
//第一次生成的随机点要保存进数组(每个点的弧度及颜色为一对，一共100对)，每次清除画面，重新生成数组中保存的点，扇形区域进行不断的旋转角度
//增加，同时要判断数组数组中的随机点弧度是否在旋转扇形区域内，是就绘制出来，否则跳过，形成雷达扫描的动画效果

var bodyWidth = document.body.clientWidth;
var bodyHeight = document.body.clientHeight;
var canvas = document.getElementById("canvas");
canvas.style.backgroundColor="#000";
canvas.width = bodyWidth;
canvas.height = bodyHeight;
var ctx = canvas.getContext('2d');

var r = 0;          //空心圆半径
var len = bodyHeight / 4;      
var deg,r_x,r_y;
var def=0;          
var col_arr=[];     //颜色数组
var deg_arr=[];     //角度数组
var r_arr=[];       //半径数组
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]; //点的颜色
var sc;     //扫描动画计时器对象Id

//执行动画入口
loading();

//开始动画入口
function loading() {    
    var i = 0;
    var t = setInterval(function() {
        if (r < len) {  
            r = r + 1;
            drawcircle(r);          //生成不断变大的圆形区域
        }
    }, 10);

    setTimeout(function() {
        clearInterval(t);           //关闭圆形增大的定时器
        var y=setInterval(function() {
            if (i < 100) {      
                randomPointer();     //生成指定数量的随机分布点 
                i++;
            }
            else{
                clearInterval(y);    //100个随机点生成完以后，关闭定时器
            }            
        }, 10);

        console.log(r_arr);
        console.log(deg_arr);
        console.log(col_arr);
    }, 3000);                   //延迟3秒，用于初始动画，不断变大的圆形
}

document.querySelector(".btn").addEventListener("click",scan_start,true); //事件监听雷达扫描事件   
document.querySelectorAll(".btn")[1].addEventListener("click",scan_stop,true); //事件监听雷达扫描事件

//开始雷达扫描动画
function scan_start() {
    sc=setInterval(function(){
            ctx.clearRect(0,0,bodyWidth,bodyHeight);         
            drawcircle(bodyHeight/4);            
            if (def<Math.PI*2) {
                def=def+Math.PI/180; //方法一：通过不断增加画布旋转的角度，实现扇形区域的旋转；扇形角度区域一直是(0,30度)，此Demo使用该方法
                                     //方法二：画布不旋转，改变扇形区域的生成路径（0+def,30度+def）
            }
            else{
                def=0;
            }
            for(var j=0;j<100;j++){     //每次循环遍历100个随机点
                mPointer(j,def);        //在mPointer中判断是否符合扇形区域条件
            }
            scan(def);          //绘制扇形雷达扫描区域
        },10);                  //间隔10ms，3.6秒完成一次扫描，360*10/1000=3.6s  
}

//停止雷达扫描动画
function scan_stop(){
    clearInterval(sc);      //停止计时器计数，保留着停止前的状态，可继续执行
}


//生成一个圆形区域,r为圆的半径
function drawcircle(r) {
    ctx.clearRect(0, 0, bodyWidth, bodyHeight);
    ctx.save();
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(bodyWidth / 2, bodyHeight / 2, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

//在圆形区域内第一次生成的一个随机分布点，需要记录下它的弧度，颜色，半径
function randomPointer() {
    ctx.save();
    var cor=Math.floor(Math.random()*colors.length);//颜色数组中的随机序号（0-9）    
    col_arr.push(cor);                  //记录下这个随机点的颜色序号，保存进数组中
    ctx.fillStyle =colors[cor];          
    ran_radius();               //随机点的弧度
    ctx.beginPath();
    ctx.arc(bodyWidth / 2+r_x, bodyHeight / 2 +r_y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}
//随机生成半径的长度，根据半径计算随机点偏移的x和y的距离,第一次随机生成的弧度
function ran_radius(){
    r=Math.random()*bodyHeight/4;   //随机半径长度
    r_arr.push(r);                  //保存进半径数组中
    deg=Math.random()*360;          //随机偏转的角度值
    deg_arr.push(deg);              //存储着100个随机点的偏移角度,存储进数组
    r_x=Math.cos(deg*Math.PI/180)*r; //x轴偏移
    r_y=Math.sin(deg*Math.PI/180)*r; //y轴偏移
    // console.log(r,deg,r_x,r_y);      
}


//根据第一次生成的随机点记录下来的数据，在清空画布后，重新绘制出来随机点
function mPointer(i,def) {      //雷达开始扫描：清除画布后重新绘制出随机点位置        
    deg=deg_arr[i];             //保存在数组中的值为度数（0,360），需要转化为弧度
    var hu=deg*Math.PI/180;     //转化为弧度值，因为def是一个弧度值，也可以把def转为度数，统一就行
    if(hu>=def&&(hu<=(Math.PI/6+def))){ //判断是否在扇形区域角度中，将扇形区域内的随机点绘制出来
        ctx.save();
        ctx.fillStyle=colors[col_arr[i]];//从数组中根据保存的数据生成出来的点
        r=r_arr[i];
        r_x=Math.cos(deg*Math.PI/180)*r;
        r_y=Math.sin(deg*Math.PI/180)*r;
        ctx.beginPath();
        ctx.arc(bodyWidth / 2+r_x, bodyHeight / 2 +r_y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();    
        ctx.restore();
    }
}


function scan(def) {       //绘制扇形雷达扫描区域
    // ctx.clearRect(0,0,bodyWidth,bodyHeight);
    ctx.save();
    ctx.strokeStyle="white";
    ctx.translate(bodyWidth/2,bodyHeight/2);  //将画布圆心（0,0）调整到屏幕中间
    ctx.rotate(def);    //旋转画布，不会旋转已存在的图形，只会旋转接下来生成的图像
    ctx.beginPath();

    //进行了圆心重置，因此需要改变下面的初始坐标位置
    // ctx.moveTo(bodyWidth/2,bodyHeight/2);
    // ctx.arc(bodyWidth/2,bodyHeight/2,len,0,Math.PI/6);//只会形成一道圆弧，需要通过moveTo及lineTo形成圆心到圆弧的闭合路径
    // ctx.lineTo(bodyWidth/2,bodyHeight/2);

    ctx.moveTo(0,0);                //扇形圆心坐标
    ctx.arc(0,0,len,0,Math.PI/6);   //圆心到圆弧,圆弧
    ctx.lineTo(0,0);                //圆弧到圆心

    ctx.stroke();
    ctx.closePath();
    ctx.restore();      //恢复圆心偏移等状态
}