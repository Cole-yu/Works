//获取所有的书面和总页数
var page=document.querySelectorAll(".page");
var pageTotal=page.length;

//设置各个页面的层叠顺序,使得page1显示在最上方
for(var j=0;j<pageTotal;j++){
	page[j].style.zIndex=-j;
}


//向下翻页的逻辑判断
function pageNext(){
	//向下翻页时，判断是否是最后一页
	 if(i<pageTotal){
		zIndex++;
		console.log("下一页",i,zIndex);
		//向下翻页操作
		page[i].style.zIndex=zIndex;
		page[i].classList.add("page-next");
		page[i].classList.remove("page-previous");
		i++;
	 }
	 else{
	 	alert("到底了");
	 }
}


//向上翻页的逻辑判断
function pagePrevious(){
	//向上翻页时，判断是否已经是第一页
	if(i>0){
		i--;
		zIndex++;	
		console.log("上一页",i,zIndex);
		//向上翻页操作
		page[i].style.zIndex=zIndex;
		page[i].classList.add("page-previous");
		page[i].classList.remove("page-next");
	}
	else{
		alert("已经是第一页了");
	}
}


//封装事件监听函数,兼容IE,Chrome,fireFox
function addEvent(targer,type,func,boolern){
	if(targer.addEventListener){
		targer.addEventListener(type,func,boolern);
	}
	else if(targer.attachEvent){
		targer.attachEvent("on"+type,func);
	}
	else{
		targer["on"+type]=func;
	}
}

//初始化页脚及z-index
var zIndex=1;
var i=0;

//监听下一页按钮点击事件，执行翻页操作
var nextIcon=document.querySelector(".next");

//当传递参数值时,必须使用"匿名函数"调用带参数的函数,否则就直接执行函数
//nextIcon.addEventListener("click",next(i,zIndex),true);//直接执行next函数
addEvent(nextIcon,"click",pageNext,true);

//监听上一页按钮点击事件，执行翻页操作
var previousIcon=document.querySelector(".previous");
addEvent(previousIcon,"click",pagePrevious,true);