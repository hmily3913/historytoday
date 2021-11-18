function getChromeMainVersion() {
    var chromeVersion = (/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];
    return parseInt(chromeVersion);
}

//格式化日期,
function formatDate(date, format) {
    var paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    }
    //指定格式字符
    var cfg = {
        yyyy: date.getFullYear() //年 : 4位
      , yy: date.getFullYear().toString().substring(2)//年 : 2位
      , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
      , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
      , d: date.getDate()   //日 : 如果1位的时候不补0
      , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
      , hh: date.getHours()  //时
      , mm: paddNum(date.getMinutes() +1)//分
      , ss: date.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
}

function strToObj(json){ 
         return eval("("+json+")"); 
}

function shake(ele,cls,times){
	var i = 0, t = false, o = ele.attr("class")+" ", c = "", times = times||2;
	if(t) return;
	t= setInterval(function(){
		i++;
		c = i%2 ? o+cls : o;
		ele.attr("class",c);
		if(i==2*times){
			clearInterval(t);
			ele.removeClass(cls);
		}
	},200);
} 

/*淡出淡入效果*/
(function($) {
    $.fn.Tofade = function(opt, callback) {
        if (!opt) var opt = {};
        var timer = opt.timer ? parseInt(opt.timer, 10) : 3000; //滚动的时间间隔（毫秒）
        $(this).each(function(i) {
            var _this = this;
            var scrtime;
            var _Play = function() {
                var firstNode = $(_this).find("li"); //获取li对象
                firstNode.eq(0).fadeOut('slow',
                function() { //获取li的第一个,执行fadeOut,并且call - function.
                    $(this).clone().appendTo($(this).parent()).show('slow'); //把每次的li的第一个 克隆，然后添加到父节点 对象。
                    $(this).remove(); //最后  把每次的li的第一个 去掉。
                });
            };
            var _Out = function() {
                scrtime = setInterval(_Play, timer);
            };
            var _Over = function() {
                clearInterval(scrtime)
            };
            $(_this).hover(_Over, _Out).trigger("mouseleave");

        });
    }
})(jQuery);

var ServerAddress="http://140.238.66.255/historytoday.php?format=json";
