/************************************************
* 설          명: 공통 가이드 > 퀵메뉴
* 작    성    자: 박규홍
* 최초 작성 일자: 15.10.21
************************************************/

//퀵메뉴 초기화
//params>
//return>
initQuickMenu = function () {
    //var nowUrl = $(location).attr("href").toLowerCase();  //현재URL
    //var noneQuickPath = new Array("/lchs/contents/ticketing/ticketing.aspx");	// 퀵 메뉴 표시 제한 페이지
    //var checkIndex;
    //var isMain = (nowUrl.indexOf("/lchs/index.aspx") >= 0 || nowUrl.slice(nowUrl.length - 6, nowUrl.length) == '/lchs/');// 메인 페이지 여부, url을 사용해서 확인한다.
    //try {
    //	// 퀵 메뉴 표시 제한 대상 여부 확인
    //	for (var key in noneQuickPath) {
    //		checkIndex = nowUrl.indexOf(noneQuickPath[key]);
    //		if (checkIndex >= 0) {
    //			throw new Error("NONE DISPLAY PATH");
    //		}
    //	}
		
    //	if (isMain) {
    //		getQuickMenuData(1);	// 메인 퀵 메뉴 표시
    //	} else {
    //		getQuickMenuData(2);	// 사이드 퀵 메뉴 표시
    //	}
    //} catch (e) {
    //	return;
    //}
    if (IsADQuickShow.toLowerCase() == "false")
        getQuickMenuData();
};

// 사이드 퀵 메뉴 슬라이드
quickOnOff = function () {
	var target = $("#quick_ver2");
	if (target.hasClass("on")) {
	    target.removeClass('on').animate({'right':-75},200);
	} else {
	    target.addClass('on').animate({ 'right': 0 }, 200);
	}
}

// 퀵메뉴호출        
getQuickMenuData = function () {
	var obj = {
		MethodName: "GetQuickMenu", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language
		, menuDivCode: 2
	};
	//if (menuDivCode == 1) {
	//    JsonCall(CinemaServiceDomain + "/LCWS/Common/MenuData.aspx", obj, responseMainQuickMenuData);	// 메인 퀵 메뉴 표시
	//} else {
	    JsonCall(CinemaServiceDomain + "/LCWS/Common/MenuData.aspx", obj, responseQuickMenuData, false);		// 사이드 퀵 메뉴 표시
	//}
};
/********************************************************
* 메인 페이지용 퀵메뉴 표시
*********************************************************/
//responseMainQuickMenuData = function (obj) {
//	try {
//		var jsonData;
//		var quickMenuItems;

//		jsonData = obj.responseJSON;

//		// Data 유효성 검사
//		if (jsonData == undefined) { throw new Error("None Data Error"); }
//		if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
//		if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

//		quickMenuItems = jsonData.QuickMenuItems.Items;

//		appendMainQuickMenu(quickMenuItems)

//	} catch (e) {
//	    //CheckException(e, "responseMainQuickMenuData", "common");
//	}
//}

////메인 퀵메뉴를 화면에 추가한다.
//appendMainQuickMenu = function (quickMenuItems) {
//	var htmlString;
//	var sbQuick = new StringBuilder();
    	
//	for (var key in quickMenuItems) {
//		sbQuick.AppendFormat('<li><a href="{0}"><img src="{2}" alt="{1}"></a></li>', quickMenuItems[key].LinkUrl, quickMenuItems[key].ImageAlt, quickMenuItems[key].ImageFullPath);
//	}

//	htmlString = sbQuick.ToString();

//	$("div.bnShortcuts ul.shortList").append(htmlString);
//}

/********************************************************
* 일반 페이지용 사이드 퀵 메뉴 표시
*********************************************************/
responseQuickMenuData = function (obj) {
	try {
		/*var jsonData;
		var quickMenuItems;

		jsonData = obj.responseJSON;

		// Data 유효성 검사
		if (jsonData == undefined) { throw new Error("None Data Error"); }
		if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
		if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

		quickMenuItems = jsonData.QuickMenuItems.Items;
		 */
		appendQuickMenu();

	} catch (e) {
		//CheckException(e, "responseQuickMenuData", "common");
	}
}

//사이드 퀵메뉴를 화면에 추가한다.
appendQuickMenu = function () {
	var htmlString;
	var sbQuick = new StringBuilder();

	sbQuick.Append('<!-- quick menu -->');
	sbQuick.Append('<div class="quick_ver2" id="quick"><!-- [D] 접근성 관련 : 스크립트로 탭키이동시 foucs in, focus out  제어 필요 -->');
	sbQuick.Append('<ul>');
	//sbQuick.Append('<li><a href="javascript:void(0);" onclick="quickOnOff()" title="QUICK MENU"><span><img src="/LCHS/Image/icon/icon_quick01.png" alt="QUICK MENU" /></span>QUICK MENU</a></li>');
	/*for (var key in quickMenuItems) {
	    //sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{3}" alt="{1}" /></span>{2}</a></li>', quickMenuItems[key].LinkUrl, quickMenuItems[key].ImageAlt, quickMenuItems[key].MenuName, quickMenuItems[key].ImageFullPath);
	    sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', quickMenuItems[key].LinkUrl, quickMenuItems[key].ImageAlt, quickMenuItems[key].ImageFullPath);
	}*/
	//sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "빠른예매바로가기", "/resources/img/bg/a021109040b34b989bf01bacf6263973.jpg");
	sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "빠른예매바로가기", "./resources/img/a021109040b34b989bf01bacf6263973.jpg");
	sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "할인가이드바로가기", "./resources/img/804a2bc19b1444e5924d82088dfc5134.jpg");
	sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "예매내역바로가기", "./resources/img/1ec48d357ba44dbeaa0ef261d93e4003.jpg");
	sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "멤버십", "./resources/img/aa6b80b43c4e4398a636db1d13122895.jpg");
	sbQuick.AppendFormat('<li><a href="{0}" title="{1}"><span><img src="{2}" alt="{1}" /></span></a></li>', "/ticketing", "고객센터바로가기", "./resources/img/47141787f65643938247e12b5f5c9d75.jpg");
	
	
	sbQuick.Append('</ul>');
	sbQuick.Append('<a href="javascript:void(0);" class="btn_top" title="TOP" style="display: block;"><span>TOP </span><img src="./resources/img/icon_quick_new07.png" alt="위로 이동"></a>');
	sbQuick.Append('</div>');
	sbQuick.Append('<!--//  quick menu -->');

	htmlString = sbQuick.ToString();

	$("div#container").append(htmlString);

	setTopButton();
}

//위로 버튼 표시 및 기능 설정
//params>
//return>
setTopButton = function () {
	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
		    $('.quick_ver2 .btn_top').fadeIn(500);
		} else {
		    $('.quick_ver2 .btn_top').fadeOut(300);
		}
	});

	$('.quick_ver2 .btn_top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 300);
		return false;
	});
}



//퀵메뉴 적용
$(document).ready(initQuickMenu);