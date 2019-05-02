var obj=document.getElementsByClassName("move")[0];
var box=document.getElementsByClassName("box")[0];
var conta=document.getElementsByClassName("container")[0];
var startX,startY,wid,hei,startLeft,startTop;		//鼠标点击的初始(x,y)坐标，div.move的初始偏移距离left,top
var flag=false;			//用于区分是div移动事件，还是window鼠标移动事件，保证只有鼠标按下时div移动才有效果

//在css中设置了move的position属性为absolute,在实际业务中看情况设置
//obj.getBoundingClientRect(),该方法包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。
//console.log(obj.getBoundingClientRect());
function movedown(e){
	flag=true;	
	console.log(typeof(e.clientX));	
	console.log(e.clientX);
	startX=e.clientX;
	startY=e.clientY;
	startLeft=obj.getBoundingClientRect().left;		//获取div的左边框到y轴的距离startLeft
	console.log(startLeft);	
	wid=startX-startLeft;							//点击的位置到div左边框的距离wid
	startTop=obj.getBoundingClientRect().top;		//获取div的上边框到x轴的距离startTop
	console.log(startTop);
	hei=startY-startTop;							//点击的位置到div左边框的距离hei
	console.log(wid,hei);
}
function move(e){
	console.log(obj.offsetWidth,obj.offsetHeight);  //获取对象的实际狂度和高度
	var map_height=e.clientY+obj.offsetHeight-hei;
	var map_width=e.clientX+obj.offsetWidth-wid;

	//当div.move完全移入到div.container中，给div.container加一个边框效果，完全移出或部分移出时移除效果
	if(map_height<conta.offsetHeight&&map_width<conta.offsetWidth){
		conta.classList.add("hov");
	}
	else{
		if(conta.classList.contains("hov")){
			conta.classList.remove("hov");
		}
	}
	if(flag&&map_height<box.offsetHeight&&map_width<box.offsetWidth){
		obj.style.left=e.clientX-wid+"px";
		obj.style.top=e.clientY-hei+"px";
	}
}

function moveup(){
	flag=false;
}

obj.addEventListener("mousedown",movedown);
obj.addEventListener("mousemove",move);
obj.addEventListener("mouseup",moveup);

