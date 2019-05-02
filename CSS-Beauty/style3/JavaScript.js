function test() {
    if (document.getElementById("left").offsetHeight > document.getElementById("right").offsetHeight){                
        document.getElementById("right").style.height = document.getElementById("left").offsetHeight + 'px';
    }
    else {
        document.getElementById("left").style.height = document.getElementById("right").offsetHeight + "px";
    }    
}


function btn() {
    alert("ok");
}

document.getElementById("btn").onclick = test;
//document.getElementById("btn").addEventListener("click", test, false);

window.onscroll = function () {
    console.log(window.pageXOffset + " " + window.pageYOffset);
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    var top_div = document.getElementById("top_div");
    if (t >= 300) {
        top_div.style.display = "inline";        
    } else {
        top_div.style.display = "none";
    }
}

document.getElementById("scrollto").addEventListener("click",scrolltto,true);

function scrolltto(){
    window.scrollTo(0,200);
}