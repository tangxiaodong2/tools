// 封装的函数都基于jQUERY
// 使用前务必先引用jquery.js
//
//
//


// 4-1 检测对象是否有哪个类名

function hasClass(obj,classStr){
    var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
    return (arr.indexOf(classStr)==-1)?false:true;
}

// 4-2添加类名
//
function addClass(obj,classStr){
    if (!this.hasClass(obj,classStr)){
      obj.className += " " + classStr;
    }
}

// 4-3删除类名

function removeClass(obj,classStr){
    if (this.hasClass(obj,classStr)) {
        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}

// 4-4替换类名(“被替换的类名”,”替换的类名”)

function replaceClass(obj,newName,oldName) {
    removeClass(obj,oldName);
    addClass(obj,newName);
}

// 4-5获取兄弟节点

function siblings(obj){
    var a=[];//定义一个数组，用来存o的兄弟元素
    var p=obj.previousSibling;
    while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
        if(p.nodeType===1){
        	a.push(p);
        }
        p=p.previousSibling;//最后把上一个节点赋给p
    }
    a.reverse();//把顺序反转一下 这样元素的顺序就是按先后的了
    var n=obj.nextSibling;//再取o的弟弟
    while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思
        if(n.nodeType===1){
            a.push(n);
        }
        n=n.nextSibling;
    }
    return a;
}

// 4-6设置样式

function css(obj,json){
    for(var attr in json){
        obj.style[attr]=json[attr];
    }
}

// 4-7设置文本内容

function html(obj){
    if(arguments.length==0){
        return this.innerHTML;
    }
    else if(arguments.length==1){
        this.innerHTML=arguments[0];
    }
}

// 4-8显示隐藏

function show(obj){
    obj.style.display="";
}
function hide(obj){
    obj.style.display="none";
}

// 5.其他操作

// 5-1cookie

//cookie
//设置cookie
function setCookie(name,value,iDay){
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+iDay);
    document.cookie=name+'='+value+';expires='+oDate;
}
//获取cookie
function getCookie(name){
    var arr=document.cookie.split('; ');
    for(var i=0;i<arr.length;i++){
        var arr2=arr[i].split('=');
        if(arr2[0]==name)
        {
            return arr2[1];
        }
    }
    return '';
}
//删除cookie
function removeCookie(name){
    setCookie(name,1,-1);
}

// 5-2清除对象中值为空的属性

//filterParams({a:"",b:null,c:"010",d:123})
//Object {c: "010", d: 123}
function filterParams(obj){
    var  _newPar = {};
    for (let key in obj) {
        if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
            _newPar[key] = obj[key];
        }
    }
    return _newPar;
}

// 5-3现金额大写转换函数

//upDigit(168752632)
//"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
//upDigit(1682)
//"人民币壹仟陆佰捌拾贰元整"
//upDigit(-1693)
//"欠人民币壹仟陆佰玖拾叁元整"
function upDigit(n)
{
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}

// 5-4获取，设置url参数

//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
function getUrlPrmt(url) {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
function setUrlPrmt(obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

// 5-5随机返回一个范围的数字

function randomNumber(n1,n2){
    //randomNumber(5,10)
    //返回5-10的随机整数，包括5，10
    if(arguments.length===2){
        return Math.round(n1+Math.random()*(n2-n1));
    }
    //randomNumber(10)
    //返回0-10的随机整数，包括0，10
    else if(arguments.length===1){
        return Math.round(Math.random()*n1)
    }
    //randomNumber()
    //返回0-255的随机整数，包括0，255
    else{
        return Math.round(Math.random()*255)
    }
}

// 5-6随机产生颜色

function randomColor(){
    //randomNumber是上面定义的函数
    //写法1
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';

    //写法2
    return '#'+Math.random().toString(16).substring(2).substr(0,6);

    //写法3
    var color='#';
    for(var i=0;i<6;i++){
        color+='0123456789abcdef'[randomNumber(15)];
    }
    return color;
}

//这种写法，偶尔会有问题。大家得注意哦
//Math.floor(Math.random()*0xffffff).toString(16);


// 5-7Date日期时间部分

//到某一个时间的倒计时
//getEndTime('2017/7/22 16:0:0')
//"剩余时间6天 2小时 28 分钟20 秒"
function getEndTime(endTime){
    var startDate=new Date();  //开始时间，当前时间
    var endDate=new Date(endTime); //结束时间，需传入时间参数
    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
    var d=0,h=0,m=0,s=0;
    if(t>=0){
      d=Math.floor(t/1000/3600/24);
      h=Math.floor(t/1000/60/60%24);
      m=Math.floor(t/1000/60%60);
      s=Math.floor(t/1000%60);
    }
    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
}

// 5-8适配rem

这个适配的方法很多，我就写我自己用的方法。

function getFontSize(){
    var doc=document,win=window;
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
        if(clientWidth>750){clientWidth=750}
        //设置根元素font-size大小
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
    };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    //文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
}
//使用方式很简单，比如效果图上，有张图片。宽高都是100px;
//样式写法就是
img{
    width:1rem;
    height:1rem;
}
//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;

// 6.封装成形

写了这么多的操作，小伙伴应该发现了一问题，全局函数太多了

//这样的话，封装了几个操作，就增加了几个全局函数，污染了全局变量，在开发中应该尽量避免全局变量。不说别的，如果一个项目，几个人开发，很有可能会造成命名的冲突。

function setUrlPrmt(obj){..}
function getUrlPrmt(url){..}
function upsetArr(obj){..}


//所以，建议的封装姿势是
var myJS={
    setUrlPrmt:function(obj){..},
    getUrlPrmt:function(url){..},
    upsetArr:function(arr){..},
}
这样就算别人也写这样的函数,也不会造成冲突。全局变量也只有一个，加上别人也不会很多！
var otherJS={
    setUrlPrmt:function(obj){..},
    getUrlPrmt:function(url){..},
    upsetArr:function(arr){..},
}


//最后，封装的效果是
var myJS={
    //去除字符串空格
    trim:function(obj){..},
    //字母大小写切换
    changeCase:function(obj){..},
    //字符串循环复制
    repeatStr:function(str){..},
    .....
}

//如果是es6的模块化开发，大家也可以
let myJS={
    //去除字符串空格
    trim:function(obj){..},
    //字母大小写切换
    changeCase:function(obj){..},
    //字符串循环复制
    repeatStr:function(str){..},
    .....
}
//暴露模块，里面的方式大家也可以用es6方式实现，代码至少会少一点！
export {myJS}

// 可能有小伙伴会有疑问，这样封装，调用有点麻烦，为什么不直接在原型上面封装，调用方便。比如下面的栗子！

String.prototype.trim=function(type){
    switch (type){
        case 1:return this.replace(/\s+/g,"");
        case 2:return this.replace(/(^\s*)|(\s*$)/g, "");
        case 3:return this.replace(/(^\s*)/g, "");
        case 4:return this.replace(/(\s*$)/g, "");
        default:return this;
    }
}
//'  12345 6 8 96  '.trim(1)
//"123456896"
//比这样trim('  12345 6 8 96  ',1)调用方便。
//但是，这样是不推荐的做法，这样就污染了原生对象String,别人创建的String也会被污染，造成不必要的开销。
//更可怕的是，万一自己命名的跟原生的方法重名了，就被覆盖原来的方法了
//String.prototype.substr=function(){console.log('asdasd')}
//'asdasdwe46546'.substr()
//asdasd
//substr方法有什么作用，大家应该知道，不知道的可以去w3c看下
