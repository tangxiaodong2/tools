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