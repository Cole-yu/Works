// function draw() {  
//     var ctx = document.getElementById('canvas').getContext('2d');
//     var img = new Image();
//     img.onload = function(){
//       ctx.drawImage(img,0,0);
//       ctx.beginPath();
//       ctx.moveTo(30,96);
//       ctx.lineTo(70,66);
//       ctx.lineTo(103,76);
//       ctx.lineTo(170,15);
//       ctx.stroke();
//     }
//     img.src = './images/backdrop.png';
// }
// var start=document.getElementById("start");
// // start.addEventListener("click",draw,true);


//--------------时钟动画---------------------------------------------------------
var start=document.getElementById("start");
start.addEventListener("click",clock,true);
function clock(){
  var now = new Date();
  var ctx = document.getElementById('canvas').getContext('2d');
  ctx.save();
  ctx.clearRect(0,0,150,150);       //清除原有的时针、分针、秒针
  ctx.translate(75,75);
  ctx.scale(0.4,0.4);               //缩放画布，则动画也会整体变小
  ctx.rotate(-Math.PI/2);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";

  // 画每小时刻度
  ctx.save();
  for (var i=0;i<12;i++){
    ctx.beginPath();
    ctx.rotate(Math.PI/6);
    ctx.moveTo(100,0);
    ctx.lineTo(120,0);
    ctx.stroke();
  }
  ctx.restore();

  // 画分，秒刻度
  ctx.save();
  ctx.lineWidth = 5;
  for (i=0;i<60;i++){
    if (i%5!=0) {
      ctx.beginPath();
      ctx.moveTo(117,0);
      ctx.lineTo(120,0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI/30);
  }
  ctx.restore();
 
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr  = now.getHours();

  hr = hr>=12 ? hr-12 : hr; //24小时制，超过12小时，则减去12

  ctx.fillStyle = "black";

  // 绘制时针
  ctx.save();

  //每小时转30度，每60分钟转30度，每3600转30度，时针旋转角度=（30*hr)+（min/2）+(sec/120)
  ctx.rotate( hr*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec )
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20,0);    //时针尾巴有20px的突出区域
  ctx.lineTo(80,0);     
  ctx.stroke();
  ctx.restore();

  // 绘制分针
  ctx.save();         
  //每分钟旋转6度，每60秒旋转6度，分针选择角度=6*min+(sec/10)
  ctx.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec )
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28,0);
  ctx.lineTo(112,0);
  ctx.stroke();
  ctx.restore();
 
  // 绘制秒针
  ctx.save();
  //每秒钟旋转6度
  ctx.rotate(sec * Math.PI/30);

  ctx.strokeStyle = "#D40000";
  ctx.fillStyle = "#D40000";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30,0);
  ctx.lineTo(83,0);
  ctx.stroke();

  //绘制中心原点的实心圆
  ctx.beginPath();
  ctx.arc(0,0,10,0,Math.PI*2,true);
  ctx.fill();

  //绘制秒针末端的空心圆
  ctx.beginPath();
  ctx.arc(95,0,10,0,Math.PI*2,true);
  ctx.stroke();

  //影响秒针末端远的颜色及中心原点,未搞清楚状况
  // ctx.fillStyle = "rgba(0,0,0,0)";
  // ctx.arc(0,0,3,0,Math.PI*2,true);       //(0,0)处绘制一个透明的圆
  // ctx.fill();

  ctx.restore();

  //绘制最外圈蓝色的圆环
  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0,0,142,0,Math.PI*2,true);
  ctx.stroke();

  //恢复未移动画布原点时的初始状态，为下次移动做准备
  ctx.restore();

  window.requestAnimationFrame(clock);
}


// ------------------------------------------------------------------------------



// var start=document.getElementById("start");
// start.addEventListener("click",tt,true);

// function tt(){
//   window.requestAnimationFrame(canvas);
// }

// function canvas(){
//   var canvas=document.getElementById("canvas");
//   var ctx=canvas.getContext("2d");

//   var img=new Image();
//   img.src="./images/ct_html5_canvas_image.png";

//   img.onload=function(){

//   ctx.drawImage(img,0,0);

//   ctx.beginPath();
//   ctx.moveTo(0,0);
//   ctx.lineTo(200,100);
//   ctx.stroke();
//   ctx.restore();

//   ctx.moveTo(150,75);

//   ctx.beginPath();
//   ctx.arc(150,75,20,0,Math.PI*2,);
//   ctx.stroke();
//   ctx.restore();  
//   }
// }

//小球运动动画-----------------------------------------

// var start=document.getElementById("start");
// start.addEventListener("click",load,true);

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var raf;  
var running = false;  //控制小球是否运动

//创建一个小球对象，对象拥有自己的属性及方法
var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: 'blue',
  //产生小球形状的方法
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;    
    ctx.fill();
  }
};


//添加长尾效果
function tail() {
  ctx.fillStyle = 'rgba(255,255,255,0.3)';        
  ctx.fillRect(0,0,canvas.width,canvas.height);   //todo:理解fillRect的效果
}


//产生小球运动效果的方法
function draw() {
  tail();                  //给小球运动添加长尾效果
  //ctx.clearRect(0,0, canvas.width, canvas.height);      //该条语句能清除长尾效果

  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  //小球在垂直方向上的加速度，值越小，速度变化越大
  ball.vy *= .99;   
  ball.vy += .25;

  //确定小球运动的范围
  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  //将告知浏览器你马上要开始动画效果了，后者需要在下次动画前调用相应方法来更新画面
  raf = window.requestAnimationFrame(draw);
}

//start点击后的加载操作
function load() {  
  
  //当画布被点击时，小球开始运动
  canvas.addEventListener('click',function(e){
    if (!running) {      
      running = true;     //可以时小球在运行时，mouseMove和moveout无效化
      draw();
    }
  });

  //当鼠标在画布上移动时，小球跟随平移，同时产生长尾效果
  canvas.addEventListener('mousemove', function(e){
    if (!running) {         //只有在未点击过的情况下，小球才能产生移动效果，
      tail();              //给小球平移添加长尾效果
      ball.x = e.clientX;
      ball.y = e.clientY;
      ball.draw();
    }
  });

}

//当点击sotp按钮时，停止小球运动的动画
document.getElementById("stop").addEventListener("click",function(){
  window.cancelAnimationFrame(raf);
  running=false;
},true);

var start1=document.getElementById("start1");
start1.addEventListener("click",txt_draw,true);

function txt_draw() {  
  var txt=document.getElementById("text").getContext("2d");    

  //绘制文字
  txt.font="48px serif";
  txt.direction="rtl";
  txt.textAlign="middle";
  txt.strokeText("hello kitty",50,250);

  // var lineargradient=txt.createLinearGradient(0,100,0,132);
  ////表示该画布的垂直防线height:100-132之间有渐变变色,如果画的矩形的位置不在该高度区间内，100以下为相对位置0的颜色，132以上为相对位置100的颜色
  // lineargradient.addColorStop(0,"#666"); 
  // lineargradient.addColorStop(0.5,"red"); 
  // lineargradient.addColorStop(0.5,"green"); 
  // lineargradient.addColorStop(0.8,"#fff");
  // lineargradient.addColorStop(1,"blue");
  // txt.fillStyle=lineargradient;
  // txt.fillRect(300,50,100,150);
  

  //绘制线性渐变
  var lingrad = txt.createLinearGradient(0,0,0,150);        
  //表示该画布的垂直防线height:0-150之间有渐变变色,如果画的矩形的位置不在该高度区间内，100以下为相对位置0的颜色，150以上为相对位置100处的颜色
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');
  txt.fillStyle = lingrad;
  txt.fillRect(300,00,100,150);
  //绘制外边框
  txt.strokeStyle="#ddd";
  txt.strokeRect(300,0,100,150);


  //绘制径向渐变
  var radialgradient=txt.createRadialGradient(45,45,10,50,50,30);
  radialgradient.addColorStop(0,"green");
  radialgradient.addColorStop(0.5,"red");
  radialgradient.addColorStop(0.9,"blue");
  radialgradient.addColorStop(1,'rgba(255,255,255,0');    //通过设置透明度为0使颜色消失
  // txt.arc(75,75,30,0,2*Math.PI);   
  txt.fillStyle=radialgradient;
  txt.arc(50,50,50,0,2*Math.PI);
  txt.fill();
}



var cir_raf;    //todo:太多全局变量了
document.getElementById("start2").addEventListener("click",gradraw,true);
var gtx = document.getElementById('test').getContext('2d');
function gradraw() {  
  gtx.beginPath(); 
  gtx.arc(50, 50, 30, 0, Math.PI*2, true);
  gtx.arc(50, 50, 15, 0, Math.PI*2, true);
  gtx.fill("evenodd");   //evenodd”为奇偶原则
  // gtx.fill("nonzero");   //非零环绕原则

  var img=new Image();            //在画布中绘制图片
  img.src="./images/flowers.png";
  gtx.drawImage(img,180,10);

  window.requestAnimationFrame(circle);   //执行动画
}
function circle(){
    //gtx.clearRect(0,0,600,300);           // 清除区域内的动画

    //移动canvas的原点,通过绕中心旋转的角度，各环的半径和环上的圆不断增加
    gtx.translate(120,175);    
    for (var i=1;i<6;i++){                //i用来定义圆环的数量
      gtx.save();
      gtx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

      for (var j=0;j<i*6;j++){            
        gtx.rotate(Math.PI*2/(i*6));      //2*PI=360度
        gtx.beginPath();
        gtx.arc(0,i*12.5,5,0,Math.PI*2,true); //单个环上，绘制圆的中心不变，不断的旋转角度，产生相同的圆
        if(j==1){
          gtx.save();
          gtx.fillStyle="black";
          gtx.fill();
          gtx.restore();  
        }
        else{
          gtx.fill();
        }       
      }
      //恢复之间的状态，从栈中推出上一个状态
      gtx.restore();
    }
    gtx.rotate(Math.PI/3);        //旋转60度
    gtx.translate(-120,-175);     //为下次平移做准备，否则动画就超出画布的范围了
    
    cir_raf=window.requestAnimationFrame(circle);     //定义动画的id,用于取消此动画
}

document.getElementById("stop2").addEventListener("click",function(){  
  window.cancelAnimationFrame(cir_raf);
},true);


//鼠标点击添加selected类
function selected(e) {  
  console.log(e);
  //console.log(e.clientX);
  if (this.classList.contains("selected")) {
    this.classList.remove("selected");  
  }
  else{
    this.classList.add("selected");
  }  
}

var btn=document.getElementsByTagName("span");  // var btn=document.querySelectorAll("span");
for (var i = 0,len=btn.length; i<len; i++) {
  btn[i].addEventListener("click",selected,true);
}
// btn.addEventListener("click",function(e){
//   selected(e);
// },true);