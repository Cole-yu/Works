var arr = []; //定义一个数组用来接收多选框的值
//初始化让下拉列表不显示
$(function() {
        $('#selectBox').hide();
    })
    //单击下拉列表时显示/隐藏下拉列表
$('#version').click(function() {
        $('#selectBox').toggle();
    })
    //监听checkbox的value值 改变则执行下列操作
$("input").change(function() {
        if ($(this).prop("checked")) {
            arr.push($(this).val()); //将选中的选项添加到数组中
        } else {
            var index = getIndex(arr, $(this).val()) //找到没有选中的选项在数组中的索引
            arr.splice(index, 1); //在数组中删除该选项
        }
    })
    //这个函数用于获取指定值在数组中的索引
function getIndex(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            return i
        }
    }
}
//点击按钮是弹出数组
$('button').click(function() {
    alert(arr)
});

$('.phoneVersion').click(function(){      
    if($(this).is(":checked")){
        $(this).parent().addClass("versionAcitve");
        $(".type").show();
    }
    else{
        $(this).parent().removeClass("versionAcitve");
        $(".type").hide();
    }
});


$('.typeModel').click(function(){      
    if($(this).is(":checked")){
        $(this).parent().addClass("typeActive");
        $(".product").show();
    }
    else{
        $(this).parent().removeClass("typeActive");
        $(".product").hide();
    }
});


$('.product li').click(function(){    
    if($(this).hasClass('productActive')){
        $(this).removeClass("productActive");       
    }
    else{
        $(this).addClass("productActive");        
    }
});