/*
 思路：
 第一步：当页面加载完后，获取所要操作的节对象
 第二步：为document添加一个滚轮滚动事件
 第三步：滚轮滚动切换
  获取当前浏览器可视区域的高度
  var viewHeight = document.body.clientHeight   获取当前设备的屏幕尺寸
  滚轮切换的目的：就是更改bigBox的top值
  top:最大0
  top:最小 viewHeight*-4
  从上到下或从下到上：最多走4次(5个页面) 每一次走viewHeight
  控制的关键点：索引 定一个索引 2
  滚轮↓
  索引+1
  滚轮↑
  索引-1
  bigBox.style.top = -索引*viewHeihgt 
*/
var bigBox = document.getElementById("bigBox"); //获取bigBox节点对象
var lis = document.querySelectorAll(".controls li"); //获取所有的li节点对象
var viewHeight = document.body.clientHeight; //获取当前页面高度，每次滚动时的进度
var flag = true;        //设置开关
var index = 0;          //设置索引

//封装事件,兼容浏览器
function on(obj, eventType, fn) {               //封装兼容各类浏览器的侦听事件IE
  if (obj.addEventListener) {
    obj.addEventListener(eventType, fn);
  } else {
    obj.attachEvent("on" + eventType, fn);      //IE浏览器
  }
}

//鼠标滚动事件处理函数，滚轮事件的属性Detail(fireFox私有)和wheelDelta
function handler(e) {
  var _e = window.event || e;     //兼容IE的事件
  console.log(e);
  if (flag) {
    flag = false;
    if (_e.wheelDelta == 120 || _e.detail == -3) {    //如果鼠标滚轮向上滚动，detail为火狐判断条件
      index--;
      if (index < 0) {
        index = 0;
      }
    } else {                        //向下滚动wheelDelta==-120或者detail==3,鼠标滚轮向下滚动
      index++;
      if (index > lis.length - 1) { //如果索引大于页面数，就是滚到最后一张页面时，再滚动鼠标页面不再滚动
        index = lis.length - 1;
      }
    }
    bigBox.style.top = -index * viewHeight + "px";        //bigBox整体上移index个页面

    for (var i = 0; i < lis.length; i++) {
      lis[i].className = "";         //重置、清空全部li的类
    }

    lis[index].className = "active";  //设置当前li的类名

    setTimeout(function() {           //页面滚动间隔一秒，防止滚动太快
      flag = true; //重新开启开关
    }, 1000);
  }
}

on(document, "mousewheel", handler);        //滚轮滚动事件
on(document, "DOMMouseScroll", handler);    //滚轮滚动事件，适配火狐浏览器

//数字标签点击处理，快速切换屏幕页面事件
for (var i = 0; i < lis.length; i++) {
  lis[i].tag = i;
  lis[i].onclick = function() {
    for (var j = 0; j < lis.length; j++) {
      lis[j].className = "";
    }
    lis[this.tag].className = "active";
    bigBox.style.top = -this.tag * viewHeight + "px";
  }
}