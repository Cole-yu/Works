window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;

var points = [];//points存储着字母的所有关键点坐标

(function () {
    // 计算像素点需要的canvas
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = 320;
    var height = 320;
    canvas.width = width;
    canvas.height = height;
    var btn=document.getElementById("btn");
    
    // 如果是输入文字
    btn.addEventListener('click', function () {
            context.fillStyle = 'white';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.font = 'bold 380px arial';
            // 清除画布
            context.clearRect(0, 0, width, height);
            // 绘制文本
            context.fillText("0", width/2, height/2);
            // context.fillText("0", 100, 100);
            // 获得像素点坐标
            getPoints();
            // 动画
            refreshPoints();
    });
    
    //获取字母的关键点坐标(x,y)
    var getPoints = function () {
        // 间隙大小
        var gap = 13;
        var imgData = context.getImageData(0,0,width,height).data;
    
        var pos = [];
        var x = 0, y = 0, index = 0;
        for (var i=0; i<imgData.length; i+=(4*gap)) {//i遍历所有的色系值，gap是两圆点圆心的距离
            if (imgData[i+3] == 255) {//在canvas中，有效的文字区域透明度为1,无效区域为0
                // 塞入此时的坐标
                pos.push({
                    x: x,
                    y: y
                });
                // console.log(pos);
            }
            index = Math.floor(i / 4);  //第index点
            x = index % width;          //取余
            y = Math.floor(index / width);//0
            if (x >= width - gap) {
                i += gap * 4 * width;//在320*320中为1:1,在更大的canvas画布中则需要比例变大
            }
        }

        points = pos;
        console.log(points);
    };

})();


/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * see: https://github.com/zhangxinxu/tween
*/
var Tween = {
    Expo: {
        easeIn: function(t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t, b, c, d) {
            return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        }
    }
};

// 动画效果主方法
// 存储实例
var store = {};
var refreshPoints = function() {
    var canvas = document.querySelector('#plexus');
    var context = canvas.getContext('2d');
    // 画布尺寸

    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;

    var width = canvas.width;
    var height = canvas.height;
    
    // 是否继续不断重绘标志量
    var flag = true;

    // 实例方法，根据实例值绘制圆心
    var Dot = function (coord) {
        // 一开始新建实例的圆心坐标
        this.arcX = width / 2;
        this.arcY = height / 2;
        // 半径大小
        var r = 5.5;
        // 默认透明度
        this.opacity = 1;
        // 初始时间
        this.start = 0;
        // 绘制方法
        this.draw = function () {
            context.beginPath();
            context.arc(this.arcX, this.arcY, r, 0, 2 * Math.PI);
            // 填充绘制的圆
            context.fillStyle = 'rgba(59,166,241,'+ this.opacity +')';
            context.closePath();
            context.fill();
        };
    };
        
    // 绘制坐标移动与绘制
    var draw = function () {//把实例数组中的所有点通过循环遍历绘制出来
        // 位置移动
        for (var index in store) {//index为数组的下标,或对象的key，
            var dot = store[index];
    
            // 目标位置
            var startX = dot.startX;
            var startY = dot.startY;
            
            // 动画结束时间
            var end = 60;

            var distanceX = dot.distanceX;
            var distanceY = dot.distanceY;

            dot.start++;

            var arcX = Tween.Expo.easeOut(dot.start, startX, distanceX, end);
            var arcY = Tween.Expo.easeOut(dot.start, startY, distanceY, end);
            
            // 动画结束，停止继续绘制
            if (dot.start >= end) {
                dot.arcX = distanceX + startX;
                dot.arcY = distanceY + startY;
                flag = false;
            } else {
                dot.arcX = arcX;
                dot.arcY = arcY;
            }
            
            // 根据新圆心坐标绘制圆
            dot.draw();
        }
    };
    
    var init = function () {
        // // 看看点实例够不够，因为不同图形的坐标点个数是不一样的
        // var lengthExist = Object.keys(store).length;//Object.keys(obj)返回对象的所有属性

        // var lengthPoints = points.length;

        // if (lengthExist > lengthPoints) {
        //     // 原来有些点要隐藏
        //     (function () {
        //         for (var index in store) {
        //             var dot = store[index];
        //             console.log("run lengthExist");
        //             // 初始化动画时间
        //             dot.start = 0;
        //             if (index >= lengthPoints) {
        //                 // 多余的实例看不见
        //                 dot.opacity = 0;
        //             }
        //         }   
        //     })();
        // }
        
        // 对即将参与动画的点进行数据初始化
        points.forEach(function (coord, index) {//coord当前的元素，index当前元素的下标
            var dot = store[index];
            if (!dot) {//如果为空,创建实例，向store中添加新增的实例
                dot = new Dot(coord);
                store[index] = dot;
            }
            dot.opacity = 1;
            // 给予dot目标位置
            dot.startX = dot.arcX;
            dot.startY = dot.arcY;
            // 确定好移动距离
            dot.distanceX = coord.x - dot.arcX;//coord为当前圆心的(x.y),dot为默认初始化圆心的(x,y)，所有的当前原点的距离都以中心点(width/2,height/2)为起点进行测量
            dot.distanceY = coord.y - dot.arcY;
            // 初始化动画时间
            dot.start = 0;

            console.log(dot);
        });        
    };
    // 初始化
    init();
    // 绘制画布上所有的圆圈圈
    // 画布渲染
    var render = function () {
        // 清除画布
        context.clearRect(0, 0, width, height);
            
        // 绘制画布上所有的圆圈圈
        draw();

        // // 继续渲染
        if (flag == true) {
            requestAnimationFrame(render);
            console.log("run");
        }
    };

    render();
};
