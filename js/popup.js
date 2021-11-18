var isTest = false;
var jso = new Json();
//var api = "http://api.lssdjt.com/?appkey=chrome.browser.plus&Secret=25586a39eb";

function main() {
    var ThisDate = formatDate(new Date(), "M.d");
	
    
    
	/*
    chrome.browserAction.setBadgeText({
        text: ""
    });
	*/
    $(".Loading").show(500);
    var autoAjax = false;
    var lsjt = localStorage.getItem("lssdjt");
    var isQuery = false;
    var query = localStorage.getItem("query_lssdjt");
    if (lsjt == null) {
        autoAjax = true;
        if (isTest) {
            $("#isTestInfo").append("<li>1.读取缓存 lsjt=null （autoAjax=true）</li>")
        }
    } else {
        lsjt = JSON.parse(lsjt);
        if (isTest) {
            $("#isTestInfo").append("<li>2.读取缓存，日期jso.get(lsjt,day): " + jso.get(lsjt, "day") + "</li>")
        };
        if (ThisDate != jso.get(lsjt, "day")) {
            autoAjax = true;
            if (isTest) {
                $("#isTestInfo").append("<li>3.日期与今日：" + ThisDate + "不同 （autoAjax=true）</li>")
            }
        } else {
            if (isTest) {
                $("#isTestInfo").append("<li>4.日期与今日：" + ThisDate + "相同（autoAjax=false）</li>")
            };
            $(".Loading").hide(500);
            Preview(lsjt)
        }
    }; if (autoAjax) {

        $.ajax({
			
			//crossDomain: true,
            type: "get",
            dataType: 'json',
            url: ServerAddress,
			beforeSend: function(obj) {
				
                if (isTest) {
                    $("#isTestInfo").append("<li>5.正在加载数据：" + ServerAddress + ThisDate + "（typeof(obj):" + typeof(obj) + "）</li>")
                };
                $(".Loading").show(500)
            },
            success: function(obj) {
                localStorage.setItem("lssdjt", JSON.stringify(obj));
                $(".Loading").hide(500);
                Preview(obj);
                if (isTest) {
                    $("#isTestInfo").append("<li>6成功加载数据JSON.stringify(obj):" + JSON.stringify(obj) + "（typeof(obj):" + typeof(obj) + "）</li>")
                }
            }
        })
		
    };

    if (isTest) {
        $("#isTestInfo").append("<hr>")
    };
    
}


function Preview(arr) {
	
    var title = arr.day;
    var items = arr.content;
    $("#month_day").html(title.replace(".", "月") + "日");

    
    var html = "";
    for (var i = 0; i < items.length; i++) {
        //var id = items[i].i;
        var title = items[i].title;
        var url = items[i].link;
        //var postdate = items[i].d;
        //var img = items[i].j;
        var hit = items[i].desc;
        var good = items[i].recommend;
        html += "<li>";
        //if (img != "") html += "<a href='" + url + "' target='_blank' class='img'><img src='http://img.lssdjt.com/" + img + "' alt='" + title + "' /></a>";
        html += "<a href='" + url + "' target='_blank' class='title'>"+ (good ? "<span class='tt'>推荐</span>" : "") +"</a>"+ title;
        html += "<div class='info'>";
        html += "<span class='count'>" + hit + "<a href='" + url + "' target='_blank' class='title'>更多...</a></span>";
        //html += "<span class='postdate'>" + postdate + "</span>";
        html += "</div>";
        html += "</li>"
    }
    $("#news").html(html)
}

document.addEventListener('DOMContentLoaded', main);