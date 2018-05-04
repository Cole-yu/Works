particle_no = 25;

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var counter = 0;
var particles = [];
var w = 400, h = 200;
canvas.width = w;
canvas.height = h;

//初始化背景
function reset(){
  //canvas背景
  ctx.fillStyle = "#272822";
  ctx.fillRect(0,0,w,h);
  
  //processBar背景
  ctx.fillStyle = "#171814";
  ctx.fillRect(25,80,350,25);
}

function progressbar(){//构造器方法创建类
  this.widths = 0;//进度条长度
  this.hue = 0;//控制颜色
  
  this.draw = function(){//绘制当前进度的函数,进度条颜色渐变
    ctx.fillStyle = 'hsla('+this.hue+', 100%, 40%, 1)';
    ctx.fillRect(25,80,this.widths,25);
    var grad = ctx.createLinearGradient(0,0,0,130);//设置线性渐变
    grad.addColorStop(0,"transparent");
    grad.addColorStop(1,"rgba(0,0,0,0.5)");
    ctx.fillStyle = grad;
    ctx.fillRect(25,80,this.widths,25);
  }
}

//初始化每个离散点的属性
function particle(){
  this.x = 23 + bar.widths;//控制喷发点的x坐标,每个离散点根据时间变化离开时的x坐标
  this.y = 82; //控制喷发点的Y坐标,每个离散点离开时的y坐标
  
  this.vx = 0.8 + Math.random()*1;
  this.v = Math.random()*5;
  this.g = 1 + Math.random()*3;
  this.down = false;//离散点垂直方向的标记,当变为0后,down=true,g(+向上)=>g(变为0)=>g(+向下)
  
  this.draw = function(){
    ctx.fillStyle = 'hsla('+(bar.hue+0.3)+', 100%, 40%, 1)';;
    var size = Math.random()*2;
    ctx.fillRect(this.x, this.y, size, size);
  }
}

bar = new progressbar();

function draw(){
  reset();
  counter++
  
  bar.hue += 0.8;
  
  bar.widths += 2;

  if(bar.widths > 350){//进度条满时重置，循环播放
    if(counter > 215){
      reset();//重置下列参数
      bar.hue = 0;
      bar.widths = 0;
      counter = 0;
      particles = [];
    }
    else{
      bar.hue = 126;
      bar.widths = 351;
      bar.draw();//绘制当前进度条长度
    }
  }
  else{
    bar.draw();//每次载入进度未满时，绘制进度条动画
    for(var i=0;i<particle_no;i+=10){//i用于控制离散点的多少,i越小离散点越密集
      particles.push(new particle());//把离散点添加进数组中
    }
  }
  update();
}

//离散点的运动效果,particles中存储离散点的样式
function update(){
  for(var i=0;i<particles.length;i++){
    var p = particles[i];
    p.x -= p.vx;
    if(p.down == true){
      p.g += 0.1;
      p.y += p.g;
    }
    else{
      if(p.g<0){
        p.down = true;
        p.g += 0.1;
        p.y += p.g;
      }
      else{
        p.y -= p.g;
        p.g -= 0.1;
      }
    }
    p.draw();
  }
}


var id;

//可通过添加判断条件使用cancelAnimationFrame(id)停止动画
function animloop() {//无限循环动画,
  if(true){
    draw();
   id= requestAnimFrame(animloop);    
  }
  else{
    //cancelAnimationFrame(id);
    //todo
  }
  
}

animloop();