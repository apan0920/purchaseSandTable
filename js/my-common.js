/*
* @Author: pz
* @Date:   2018-03-28 14:15:48
* @Last Modified by:   pz
* @Last Modified time: 2018-04-03 14:42:35
*/
$(function () {
	//设置日期时间控件
	$('.form_date').datetimepicker({
        language: 'zh-CN',//显示中文
        format: 'yyyy-mm-dd',//显示格式
        weekStart: 1,
        todayBtn:  0,//显示/隐藏今日按钮
		autoclose: 1,//选中自动关闭
		todayHighlight: 1,
		startView: 2,
		minView: 2,//设置只显示到天 、1是到小时
		forceParse: 0
    });
    // 加载子界面调试
    // loadChildContent("y-wapper");
    loadChildContent("g-wapper");
    loadChildContent("p-wapper");
  	// 根据窗口变化调整iframe大小
	$(window).resize(function() {
		// windowResize("y-wapper");
	   windowResize("g-wapper");
	   windowResize("p-wapper");
	});

// 以下为调试内容//--------------------------------------------//////////////////////
	// 旋转调试
	// startRotate($("#menuBtnY"));

	// setTimeout(function () {
	// 	stopRotate($("#menuBtnY"));
	// 	startRotate($("#menuBtnG"));
	// },2000);
	//
	//
	// 倒计时调试
	// countdown(60);//60分钟<==>60天
	// 　　$(".y-table > tbody").mCustomScrollbar();
　　
});



// 生产区/销售区 加载子界面
function loadChildContent(objId) {
	// $("#"+objId).load("../html/g-1.html");
	$("#"+objId).attr("src", "../html/side-ifame.html");
	windowResize(objId);
}

// 根据窗口变化调整iframe大小
function windowResize(objId) {
	var ph = $("#"+objId).parent().height();
  	var pw = $("#"+objId).parent().width();
 	$("#"+objId).css({"width":ph-4 ,"height":pw-69,"margin-top":-(pw-69)/2});

  	if (objId == "g-wapper") {
		$("#"+objId).css({"margin-left":-(ph-4+69)/2});
  	} else if (objId == "p-wapper") {
		$("#"+objId).css({"margin-left":-(ph-4-69)/2});
  	}
}

// 返回按钮
$(".back-btn").click(function () {
	var areaBox = $(this).parent().parent();
	var tableBbox = areaBox.find(".table-box");//子界面
	if (tableBbox.css("display") == "block") {// 返回一级菜单
		tableBbox.hide();
		$(this).hide();
		areaBox.find(".first-level-menu").show();
		// 更改按钮文字及样式
		var belongArea = areaBox.find(".first-level-menu").attr("belongArea");//区域名称
		areaBox.find(".type-btn").html(belongArea);
		areaBox.find(".type-btn").removeClass("type-btn-big");
		if (belongArea == "销售区") {
			$(".p-type-btn").css({"margin-left": "-40px"});
		}else if (belongArea == "生产区") {

		}else if (belongArea == "采购区") {
			$(".y-type-btn").css({"margin-left": "-75px"});
		}
	}
});

// 一级菜单按钮
$(".btn-bg-rect").click(function () {
	var areaBox = $(this).parent().parent();
	$(this).parent().hide();
	areaBox.find(".table-box").show();
	areaBox.find(".back-btn").show();
	// 更改按钮文字及样式
	areaBox.find(".type-btn").html($(this).text());
	areaBox.find(".type-btn").addClass("type-btn-big");
	var belongArea = $(this).parent().attr("belongArea");//区域名称
	if (belongArea == "销售区") {
		$(".p-type-btn").css({"margin-left": "-88px"});
	}else if (belongArea == "生产区") {

	}else if (belongArea == "采购区") {
		$(".y-type-btn").css({"margin-left": "-123.5px"});
	}
});

/*转换--旋转动画*/
function startRotate(rotateObj) {
	rotateObj.addClass("sys-menu-child-sel");//高亮显示
	rotateObj.parent().find(".sys-menu-text").addClass("color-g-menu");
	var rotation = function (){
	   rotateObj.rotate({
	      angle:0, 
	      animateTo:360, 
	      callback: rotation,
	      duration:50000,//动画执行持续时间
	      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
	          return c*(t/d)+b;
	      }
	   });
	}
	rotation();//调用车轮旋转
}

/*停止旋转*/
function stopRotate(rotateObj) {
	rotateObj.removeClass("sys-menu-child-sel");//移除高亮显示
	rotateObj.parent().find(".sys-menu-text").removeClass("color-g-menu");
	rotateObj.stopRotate();
}

/*倒计时--参数：分钟(只支持≤60分钟)--每分钟代表1天*/
function countdown(Fen) {
	var miao=60;
	timer=setInterval(
		function(){
			if(Fen==0&&miao==1){//分钟数=0的时候
				clearInterval(timer);
				alert("游戏计时结束");
			}
			if(Fen>=0&&Fen<=10){//分钟数0~10
				miao--;
				if(miao==0){//秒数等于0的时候
					miao=60;
					$(".time-min").html("0"+Fen);
					$(".time-sec").html("00");
				}
				if(miao>0&&miao<10){//秒数0~10的时候
					miao="0"+miao;
					$(".time-min").html("0"+Fen);
					$(".time-sec").html(miao);
				}
				if(miao>=10&&miao!=60){//秒数大于等于10的时候
					if(miao==59){
						Fen--
					}
					$(".time-min").html("0"+Fen);
					$(".time-sec").html(miao);
				}
			}
			if(Fen>10){//分钟数大于10的时候
					miao--;
					if(miao==0){//秒数等于0的时候
						miao=60;
						$(".time-min").html(Fen);
						$(".time-sec").html("00");
					}
					if(miao>0&&miao<10){//秒数0~10的时候
						miao="0"+miao;
						$(".time-min").html(Fen);
						$(".time-sec").html(miao);
					}
					if(miao>=10&&miao!=60){//秒数大于等于10的时候
						if(miao==59){
							Fen--
						}
						$(".time-min").html(Fen);
						$(".time-sec").html(miao);
					}
					// 计算月数
					if (Fen>29) {
						$(".time-month-2").html(parseInt(Fen/30));
					} 
					
				}
				// 计算天数
				var allDays = Fen%30;
				if (allDays < 10) {
					$(".time-day-1").html(0);
					$(".time-day-2").html(allDays);
				}else{
					$(".time-day-1").html(parseInt(allDays/10));
					$(".time-day-2").html(allDays%10);
				}
				
				// 控制显示月亮和太阳
				if (miao>30) {
					$(".sys-day-night").attr("src","../images/icon-w-sun.png");//白天
				} else {
					$(".sys-day-night").attr("src","../images/icon-w-moon.png");//夜晚
				}
		},
		1000
		)
}

