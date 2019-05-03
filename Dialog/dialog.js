(function(global, factory){
    factory.call(global);
})(window, function(){    
    var btn = document.getElementById("btn"),
        back = document.getElementById("black"),
        dia = document.getElementById("dialogBox"),
        clo = dia.getElementsByClassName("close-js")[0];

    btn.onclick = function () {
        showHide(true, back, dia);
    }

    clo.onclick = function () {
        showHide(false, back, dia);
    }

    back.onclick = function () {
        showHide(false, back, dia);
    }
})


function showHide(bool, item1, item2) {                             
    for (var i = 1, len = arguments.length; i < len; i++) {
        if (bool) {
            arguments[i].style.display = "block";
        }
        else {
            arguments[i].style.display = "none";
        }
    }
}
//写了一个公共方法 showHide函数，接收的第一个参数为显隐阀门的布尔值。其它参数为需要进行同时控制的元素。
//这里我们使用到函数自身的arguments对象。arguments里面保存了该函数传递进来的所有参数，这里当作一个数组使用。
//用一个for循环迭代arguments。参数的第一项是布尔值，用来决定显隐关系，所以for循环i的第一个参数为1.依次给其它各项设置style属性。
// 通过这种方法，代码的复用性提高了很多。方便统一修改，引用。