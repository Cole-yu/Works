//获取所有的书面和总页数
var page=document.querySelectorAll(".page");
var pageTotal=page.length;
console.log("pagetotal",pageTotal);

//设置各个页面的层叠顺序,使得page1显示在最上方
for(var j=0;j<pageTotal;j++){
	page[pageTotal-j-1].style.zIndex=j+1;
}

setTimeout(function(){
	document.querySelector(".cover").classList.add("page-next");
},1000);


//向下翻页的逻辑判断
function pageNext(e){
	//向下翻页时，判断是否是最后一页
	var cl=e.target;
	 if(il<pageTotal-1){
		zIndex++;
		console.log("下一页",il,zIndex);
		//向下翻页操作
		page[il].style.zIndex=zIndex;
		page[il].classList.add("page-next");
		page[il].classList.remove("page-previous");
		il++;
		document.querySelector(".current-num").innerHTML=il+1;		
	 }
	 else{
	 	if(cl.classList.contains("answer-A")){
			changeColor(cl);
		}
		if(cl.classList.contains("answer-B")){
			changeColor(cl);
		}
		if(cl.classList.contains("answer-C")){
			changeColor(cl);
		}
		if(cl.classList.contains("answer-D")){
			changeColor(cl);
		}
	 	console.log(score);
	 	setTimeout(function(){	
	 		console.log(document.getElementsByClassName("jyopenbox")[0]);
	 		if(score>=6&&score<=11){
	 			document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/1.jpg)"
				$(".jyopenboxbg").show();
	 		}
	 		if(score>=12&&score<=16){
	 			document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/2.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/2.jpg)"
	 		}
	 		if(score>=17&&score<=21){
				document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/3.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/3.jpg)"
	 		}
	 		if(score>=22&&score<=25){
	 			document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/4.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/4.jpg)"
	 		}
	 		if(score>=26&&score<=30){
	 			document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/5.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/5.jpg)"
	 		}
			if(score>=30&&score<=34){
					document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/6.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/6.jpg)"
	 		}
	 		if(score>=34&&score<=38){
	 				document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/7.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/7.jpg)"
	 		}
	 		if(score>=38&&score<=42){
	 				document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(./images/8.jpg)"
				$(".jyopenboxbg").show();
				// document.getElementsByClassName("jyopenbox")[0].style.backgroundImage="url(../images/8.jpg)"
	 		}
	 	}, 100);
	 }
}

// window.location.href="http://win.jinyi999.cn/wap2/tthxg0048/index.html";	


//向上翻页的逻辑判断
function pagePrevious(){
	//向上翻页时，判断是否已经是第一页
	if(il>0){
		il--;
		zIndex++;	
		console.log("上一页",il,zIndex);
		//向上翻页操作
		page[il].style.zIndex=zIndex;
		page[il].classList.add("page-previous");
		page[il].classList.remove("page-next");
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
var zIndex=pageTotal;
var il=0;

document.querySelector(".current-num").innerHTML=il+1;
var score=0;

function changeColor(cl){
	cl.style.background="#1b1b1b";
	cl.style.color="white";
}

//监听下一页按钮点击事件，执行翻页操作
var nextIcon=document.querySelectorAll(".answer");
console.log(nextIcon);
all_num=nextIcon.length;
for(ad=0;ad<all_num;ad++){
	//当传递参数值时,必须使用"匿名函数"调用带参数的函数,否则就直接执行函数
	addEvent(nextIcon[ad],"click",function(e){
		pageNext(e);
		//更改为白底黑字样式
		var cl=e.target;
		if(cl.classList.contains("answer-A")){
			score=score+1;
			changeColor(cl);
		}
		if(cl.classList.contains("answer-B")){
			score=score+3;
			changeColor(cl);
		}
		if(cl.classList.contains("answer-C")){
			score=score+5;
			changeColor(cl);
		}
		if(cl.classList.contains("answer-D")){
			score=score+7;
			changeColor(cl);
		}
		console.log(score);
		console.log("il",il);
	},true);
}



//监听上一页按钮点击事件，执行翻页操作
// var previousIcon=document.querySelector(".previous");
// addEvent(previousIcon,"click",pagePrevious,true);