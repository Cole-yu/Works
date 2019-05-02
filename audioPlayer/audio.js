var myAudio=document.querySelector("#myAudio");
var dur;	//歌曲的总时间165.746939秒
// console.log(myAudio.duration);    //NaN  在未播放前，音频长度无法获取,结果为NaN,以秒为单位
// dur=myAudio.duration=="NaN"?myAudio.duration:"0";//NaN与所有值不相等，包括它自己，使用isNaN判断
// dur=isNaN(myAudio.duration)?"0":myAudio.duration; //0
// console.log(typeof(dur));//string
// console.log(typeof(myAudio.duration));   //number,NaN是一个特殊的number类型

//封装各个浏览器之间的事件监听方法（兼容）
function addEvent(obj,type,fn) {
	if(obj.addEventListener){
		obj.addEventListener(type,fn);		
	}
	else{
		obj.attachEvent(type,fn);
	}
}

var rate;//进度条定时器Id
var time;//时间变化定时器Id
var flag=false;//歌曲播放状态标记，true为正在播放，false为停止状态
var set=document.getElementsByClassName("set")[0];
var icon=set.querySelector("span");		//显示的开关图标

//开始播放/暂停之间切换
addEvent(set,"click",action);

function action(){			//初始化歌曲长度，更新进度条及时间，切换播放和暂停
	dur=myAudio.duration;
	var songLenth=document.getElementsByClassName("len")[0];
	songLenth.innerHTML=format(dur);	//格式化并显示总时间
	var cur;							//当前播放时间长度

	if(!flag){							//开始播放
		flag=true;
		myAudio.play();
		rate=setInterval(progress,10);			//设置进度条长度，每10ms执行一次
		time=setInterval(timeProgress,1000);	//设置时间播放文字，每1000ms执行一次	
		// icon.classList.remove("glyphicon-play");
		// icon.classList.add("glyphicon-pause");			
	}
	else{								//暂停
		flag=false;
		myAudio.pause();
		clearInterval(rate);
		clearInterval(time);
	}	

	icon.classList.toggle("glyphicon-pause");	//改变图标，没有这个类就添加，有就删除
	icon.classList.toggle("glyphicon-play");	//改变图标，没有这个类就添加，有就删除
}

//progress和timeProgress需要分开写，因为两者的时间间隔不一样，timeProgress函数1000ms执行一次

//设置进度条的长度,
function progress(){		
	cur=myAudio.currentTime;
	var len=cur/dur*100;	//0到100之间的值
	document.getElementsByClassName("song-progress")[0].style.width=len+"%";
	// console.log(len);
	if (len==100) {
		icon.classList.remove("glyphicon-pause");	
		icon.classList.add("glyphicon-play");		
		clearInterval(rate);	
	}	
}

//设置文字时间,以秒为单位
function timeProgress(){	
	cur=myAudio.currentTime;	
	if(cur==dur){
		clearInterval(time);
	}
	cur=format(cur);
	var current=document.getElementsByClassName("current")[0];
	current.innerHTML=cur;	
	
}

//格式化时间，把带毫秒数的总时间165.746939格式化为02:46，返回一个00:00格式的数字时间
function format(time){			
	time=Math.round(time);			//小数点四舍五入
	var min=Math.floor(time/60);    //获得分钟数
	var sec=time%60;				//获得秒数
	var min_str="0"+min.toString();	//01，小于10的前面补0.保证2位数
	min=min_str.substr(-2,2);
	// console.log(min);
	var sec_str="0"+sec.toString(); //同上
	sec=sec_str.substr(-2,2);
	// console.log(sec);
	return min+":"+sec; 			//02:05
}


//滑动声音条设置音量
function sound(e){
	console.log(e);
	var vo=voice.getBoundingClientRect().left;
	var wid=voice.offsetWidth;
	console.log(vo,e.clientX,wid);
	var sou=(e.clientX-vo)/wid;		//调整的音量百分比
	myAudio.volume=sou;				//0.0到1.0之间的一个值
	document.getElementsByClassName("voice-progress")[0].style.width=sou*100+"%";
}
var voice=document.getElementsByClassName("voice")[0];
addEvent(voice,"click",sound);


//设置歌曲播放进度，当鼠标点击进度条某个位置时，跳转到当前进度
function songRate(e){
	console.log(e);
	var rat=songLen.getBoundingClientRect().left;
	var wid=songLen.offsetWidth;
	var songPro=(e.clientX-rat)/wid;//调整的播放进度百分比
	dur=myAudio.duration;
	myAudio.currentTime=Math.floor(songPro*dur);

	var songLenth=document.getElementsByClassName("len")[0];
	songLenth.innerHTML=format(dur);	//格式化并显示总时间
	var cur;							//当前播放时间长度
	flag=true;							//设置播放状态为打开
	myAudio.play();
	rate=setInterval(progress,10);			//设置进度条长度，每10ms执行一次
	time=setInterval(timeProgress,1000);	//设置时间播放文字，每1000ms执行一次
	icon.classList.remove("glyphicon-play");	//移除播放图标
	icon.classList.add("glyphicon-pause");		//添加暂停图标
	
}
var songLen=document.getElementsByClassName("song-bar")[0];
addEvent(songLen,"click",songRate);
