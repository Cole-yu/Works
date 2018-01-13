var buttons = document.querySelectorAll(".radmenu a");

for (var i=0, l=buttons.length; i<l; i++) {
  var button = buttons[i];
  button.onclick = setSelected;
}

function setSelected(e) {    
    if (this.classList.contains("selected")) {     //菜单已经展开，点击选项时需要收起，返回操作
      this.classList.remove("selected");
      if (!this.parentNode.classList.contains("radmenu")) {  //只要不是一级菜单都添加selected的类
        this.parentNode.parentNode.parentNode.querySelector("a").classList.add("selected")//给匹配到的第一个a元素添加选择类
      } else {      //如果是一级菜单，那就显示原来上级菜单
        this.classList.add("show");
      }
    } else {            //菜单未打开时，点击添加选中样式，打开子菜单操作
      this.classList.add("selected");
      if (!this.parentNode.classList.contains("radmenu")) {   //只要不是一级菜单都移除selected的类
        this.parentNode.parentNode.parentNode.querySelector("a").classList.remove("selected")
      } else {      //如果是一级样式都隐藏掉，只显示start主菜单
        this.classList.remove("show");
      }
    }
    return false;
}