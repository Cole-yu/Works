var bodyStyle = document.body.style;
bodyStyle.mozUserSelect = 'none';//禁用页面的鼠标选中拖动的事件，就是不运行执行选中操作(火狐)
bodyStyle.webkitUserSelect = 'none';//禁用页面的鼠标选中拖动的事件，就是不运行执行选中操作(google及安卓)

var img = new Image();
var canvas = document.querySelector('canvas');
// canvas.style.backgroundColor = 'transparent';
// canvas.style.position = 'absolute';
var imgs = ['p_0.jpg', 'p_1.jpg'];
var num = Math.floor(Math.random() * 2);
img.src = imgs[num];

img.addEventListener('load', function(e) {
    var ctx;
    var w = img.width,
        h = img.height;
    var offsetX = canvas.offsetLeft,
        offsetY = canvas.offsetTop;
    var mousedown = false;//状态标记，只有当mousedown为true时才能进行刮刮乐

    function layer(ctx) {
        ctx.fillStyle = 'gray'; //填充一层灰色背景
        ctx.fillRect(0, 0, w, h);
    }

    function eventDown(e) {
        e.preventDefault(); //取消默认的操作
        mousedown = true;
    }

    function eventUp(e) {
        e.preventDefault();
        mousedown = false;
    }

    function eventMove(e) {
        e.preventDefault();
        if (mousedown) {
            if (e.changedTouches) {
                e = e.changedTouches[e.changedTouches.length - 1];
            }
            var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,
                y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;
            with(ctx) { //延伸作用域，相当于作用在ctx上
                beginPath()
                arc(x, y, 10, 0, Math.PI * 2);
                fill();
            }
        }
    }

    canvas.width = w;
    canvas.height = h;
    canvas.style.backgroundImage = 'url(' + img.src + ')';//设置canvas背景图片

    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, w, h);
    layer(ctx);

    ctx.globalCompositeOperation = 'destination-out';//在源图像(刮开区域)外显示目标图像(灰色区域)。只有源图像外的目标图像部分会被显示（处于未刮开状态），源图像是透明的。
    //globalCompositeOperation 属性设置或返回如何将一个源（新的）图像绘制到目标（已有）的图像上
    //源图像 = 您打算放置到画布上的绘图
    //目标图像 = 您已经放置在画布上的绘图

    canvas.addEventListener('touchstart', eventDown);
    canvas.addEventListener('touchend', eventUp);
    canvas.addEventListener('touchmove', eventMove);
    canvas.addEventListener('mousedown', eventDown);
    canvas.addEventListener('mouseup', eventUp);
    canvas.addEventListener('mousemove', eventMove);
});