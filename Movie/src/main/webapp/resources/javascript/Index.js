
var visualView = 2;
var visualBull = false;

$(function () {
    //설정위치 이동 $('.ad_pic').hide();
    $("div.eventBxMain").hide();



    var obj = {
        MethodName: "GetWebPageManagement", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent
    };
    JsonCallSync(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, visualViewSelector);

    function visualViewSelector(obj) {
        var visualUtill = obj.responseJSON;
        visualView = Number(visualUtill.Result.MainFirstCode);

        if (visualView < 2) {
            $('.main_key_visual .office, .main_key_visual .trailer').css('left', '+=685');
            $('.main_key_visual .event').css('right', '-=685');
            $('.main_key_visual').show();
            visualBull = true;
        } else {
            $('.main_key_visual').show();
        };
    };

    // Hint ------> 디버깅용 변수, 실서버 적용시 주석 처리
    //_debug = true;
    //_notRedirection = true;

    //var keyVisualSet = new $.fn.keyVisualSet({ target: '.main_key_visual', event: '.event', trailer: '.trailer', speed: 300 });
    //var slideGeneration = new $.fn.slideGeneration({ target: '.banner_box', box: '.banner_thum', item: 'ul', space: 100, animation: 'slide', btn: true, prev: '.btn_prev', next: '.btn_next' });
    // 메인 영화 트레일러, 16.01.07, by gyuhong
    //getMainMovieTrailerItems();
    // 메인 이벤트 베너 추가, 15.12.08, by gyuhong
    getMainEventBenners();
    // 스페셜관 이미지 추가, 15.12.07, by gyuhong
    getSpecials();
    // 메인 상영 영화 목록 추가, 15.12.07, by gyuhong
    setMainRankList();
    // 메인 영화 리스트 슬라이드 아이템 추가, 15.12.08, by gyuhong
    getMainMovieList();
    // 메인 EventBox 표시, 15.12.10, by gyuhong
    getMainEventBox();

    // 메인 페이지용 퀵메뉴
    getMainQuickData();

    // 2016.05.09 웹접근성 관련 공지사항 롤링 임시 중지
    // 공지사항d
    //var noticeSlideUp = new $.fn.noticeSlideUp({ methodName: 'GetFooterNoticeList', target: '.notice_inner', slide: '.notice_area', item: 'li', auto: true, delay: 2000 });
    var noticeSlideUp = new $.fn.noticeSlideUp({ methodName: 'GetFooterNoticeList', target: '.notice_inner', slide: '.notice_area', item: 'li', auto: false });

    //if ($.cookie("MemberInfo") != undefined && $.cookie("MemberInfo") != "") {
    //    // 20161010 - 정보보정 대상자
    //    // 20161231 - 회원정보 보정 프로모션 비노출
    //    //if ($.cookie("INF_CLNG_YN_CHECK") != undefined && $.cookie("INF_CLNG_YN_CHECK") != "Y") {
    //    //    var inf_clng_yn_cookie = $.cookie("IF_CLEANSING_TODAY_CHECK");
    //    //    //alert("inf_clng_yn_cookie=" + inf_clng_yn_cookie);
    //    //    if (inf_clng_yn_cookie == undefined || inf_clng_yn_cookie != "true") {
    //    //        var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/View/Member/InformationCleansing_Popup/popup.html', btns: false, btnParam1: false, btnParam2: false, elem: $(this) });
    //    //    }
    //    //}
    //}

});



/********************************************************
* 메인 페이지용 퀵메뉴 표시
*********************************************************/
getMainQuickData = function () {
    var obj = {
        MethodName: "GetQuickMenu", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language
		, menuDivCode: 1
    };
    JsonCall(CinemaServiceDomain + "/LCWS/Common/MenuData.aspx", obj, responseMainQuickMenuData, false);	// 메인 퀵 메뉴 표시
};
responseMainQuickMenuData = function (obj) {
    try {
        var jsonData;
        var quickMenuItems;

        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        quickMenuItems = jsonData.QuickMenuItems.Items;

        appendMainQuickMenu(quickMenuItems)

    } catch (e) {
        //CheckException(e, "responseMainQuickMenuData", "common");
    }
}
//메인 퀵메뉴를 화면에 추가한다.
appendMainQuickMenu = function (quickMenuItems) {
    var htmlString;
    var sbQuick = new StringBuilder();

    for (var key in quickMenuItems) {
        sbQuick.AppendFormat('<li><a href="{0}"><img src="{2}" alt="{1}"></a></li>', quickMenuItems[key].LinkUrl, quickMenuItems[key].ImageAlt, quickMenuItems[key].ImageFullPath);
    }

    htmlString = sbQuick.ToString();

    $("div.bnShortcuts ul.shortList").append(htmlString);
}

// 영화 트레일러 ------------------------------------------------------
// 영화 트레일러의 vod 플레이, 플레이 버튼클릭시 작동
// params>
//	vodUrl: vod file url
playMovieVod = function (vodUrl) {
    var moviePlayer = new $.fn.setMoviePlayer({
        target: '#wrap',
        url: vodUrl
    });
}
// 영화 트레일러 item list data 요청
//getMainMovieTrailerItems = function () {
//	// channelType, osType, osVersion => 상위 공통 파라미터 참조
//	var obj = { MethodName: "GetMainTrailerBannerItem", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language };
//	GetData("main", obj, appendMainMovieTrailerItems);
//	//JsonCall(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, appendMainMovieTrailerItems)
//}
// 영화 트레일러 item 추가
// params>
//	obj: 영화 트레일러 Item list data, json type
//appendMainMovieTrailerItems = function (obj) {
//	try {
//		var jsonData;
//		var items;
//		var sbMovie;
//		var htmlString;

//		var vodUrl;
//		var linkUrl;
//		var imageUrl;
//		var imageAlt;

//		jsonData = obj.responseJSON;

//		// Data 유효성 검사
//		if (jsonData == undefined) { throw new Error("None Data Error"); }
//		if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
//		if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

//		items = jsonData.MainTrailerBannerItems.Items;


//		for (var key in items) {
//			vodUrl = items[key].MovieMediaFullPath;
//			linkUrl = items[key].LinkUrl;
//			imageUrl = items[key].PCImageFileFullPath;
//			imageAlt = items[key].MovieShortName;

//			sbMovie = new StringBuilder();
//			sbMovie.Append('<li>');
//			if (items[key].MovieID != 0)
//				sbMovie.AppendFormat('<a href="javascript:void(0)" class="movie1" onclick="playMovieVod(\'{0}\');">재생</a>', vodUrl);
//			if (linkUrl != undefined && linkUrl.length > 0) {
//				sbMovie.AppendFormat('<a href="{0}" ><img src="{1}" alt="{2}" /></a></li>'
//					, linkUrl
//					, imageUrl
//					, imageAlt);
//			}
//			else {
//				sbMovie.AppendFormat('<img src="{0}" alt="{1}" /></li>'
//					, imageUrl
//					, imageAlt);
//			}

//			htmlString = sbMovie.ToString();
//			$("div.main_key_visual div.trailer ul").append(htmlString);
//		}

//	} catch (e) {
//		CheckException(e, "appendMainMovieTrailerItems: ");
//	}

//}



// 이벤트 베너 --------------------------------------------------------
// Get data of Event benners
// params>
// return>
getMainEventBenners = function () {
    try {
        // channelType, osType, osVersion => 상위 공통 파라미터 참조
        var obj = { MethodName: "GetMainTopEventItem", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language };
        GetData("main", obj, appendMainEventBenners);
    } catch (e) {
        CheckException(e, "getMainEventBenners: ");
    }
}
// Append html code of Event benner items
// params>
//	obj: json data of event benners
// return>
appendMainEventBenners = function (obj) {
    try {
        var jsonData;
        var items;
        var sbEvent;
        var htmlString;
        var eventID;
        var eventTypeCode;
        var imageUrl;
        var imageAlt

        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        items = jsonData.MainTopEventItems.Items;

        for (var key in items) {

            eventID = items[key].EventID;
            eventTypeCode = items[key].EventTypeCode;
            imageUrl = items[key].ImageFileFullPath;
            imageAlt = items[key].EventName;

            sbEvent = new StringBuilder();

            sbEvent.AppendFormat('<li><a href="javascript:void(0);" onclick="goEventDetail(\'{0}\',\'{1}\')"><img src="{2}" alt="{3}" /></a></li>'
				, eventID
				, eventTypeCode
				, imageUrl
				, imageAlt);
            htmlString = sbEvent.ToString();
            $("div.main_key_visual div.event ul").append(htmlString);
        }

        if (items.length > 0)
            var keyVisualSet = new $.fn.keyVisualSet({ target: '.main_key_visual', event: '.event', trailer: '.trailer', speed: 300, slide: visualBull });

    } catch (e) {
        CheckException(e, "appendMainEventBenners: ");
    }

}




// 스페셜관 베너------------------------------------------------------------
// Get data Special cinemas
// params>
// return>
getSpecials = function () {
    try {
        var params = { MethodName: "GetSepcialBannerInMain", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageId: Language };

        GetData("cinema", params, appendSpecials);
    } catch (e) {
        CheckException(e, "getSpecials");
    }
};
// append special cinema html
// params>
//	obj: Data of special cinemas
// return>
appendSpecials = function (obj) {
    try {
        var jsonData;
        var specialItems;
        var sbSpecials;
        var imageUrl;
        var htmlString;

        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        specialItems = jsonData.Items;

        var itemSeq = 0;
        sbSpecials = new StringBuilder();
        for (var key in specialItems) {
            ++itemSeq;

            sbSpecials.AppendFormat('<li><a href="#" onclick="goToSpecial(\'{0}\')"><img src="{1}{2}" alt="{3}"></a></li>',
				specialItems[key].SpecialScreenDivisionCode,
				specialItems[key].FilePath,
				specialItems[key].IconImageFileName,
				specialItems[key].IconImageAlt);

            //htmlString = sbSpecials.ToString();
            //sbSpecials.Append(htmlString);

            if ((itemSeq % 8 == 0 && itemSeq != 0) || (specialItems.length == itemSeq)) {
                sbSpecials.Insert(0, "<ul>");
                sbSpecials.Append("</ul>");
                htmlString = sbSpecials.ToString();
                $("div.banner_box div.banner_thum").append(htmlString);
                //console.log(sbSpecials.ToString());
                sbSpecials.RemoveAll();
            }
        }
        if (specialItems.length > 0) {
            var slideGeneration10 = new $.fn.slideGeneration({ target: '.banner_box', box: '.banner_thum', item: 'ul', space: 0, animation: 'slide', btn: true, prev: '.btn_prev', next: '.btn_next' });
        }
    } catch (e) {
        CheckException(e, "appendSpecials: ");
    }
}

// 상영 영화 목록 -----------------------------------------------------
var CURRENT_SEQ;	// 정렬기준
var CURRENT_MOVIE;	// 선택된 상영 영화
var IS_BOOKING_CURRENT_MOVIE; // 예매 가능여부
// 상영 영화 목록 설정
setMainRankList = function (e, flag) {
    if (e != undefined) {
        $(e).parent("li").parent("ul").find("li").removeClass("on");
        $(e).parent("li").addClass("on");
        if (flag != undefined) {
            CURRENT_SEQ = flag;
        }
    } else {
        // 기본값 설정
        CURRENT_MOVIE = undefined
        $('div.office div.officeTop ul.officeTab li:first').addClass("on");
        CURRENT_SEQ = '1';
    }
    getMainRankList();
}
//상영 영화 가져오기
getMainRankList = function () {
    // channelType, osType, osVersion => 상위 공통 파라미터 참조
    var obj = { MethodName: "GetMainPlayMovies", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, movieSeq: CURRENT_SEQ };
    GetData("main", obj, appendMainRankList);
    //JsonCall(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, appendMainRankList)

}
// 상영영화 목록 추가
// Params>
//	 obj: 상영영화 목록 Data, Json type
appendMainRankList = function (obj) {
    var jsonData;
    var items;
    var sbList;
    var htmlString;
    var movieCode;
    var movieTitle;
    var gradeCode;
    var gradeText;
    var isBooking;
    var bookingRate;
    var viewEvaluation;
    var rank = 0;
    try {
        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        items = jsonData.Movies.Items;

        sbList = new StringBuilder();

        for (var key in items) {
            if (++rank > 7) break;

            movieCode = items[key].RepresentationMovieCode;
            if (CURRENT_MOVIE == undefined) { CURRENT_MOVIE = movieCode; }

            //playTime = items[key].PlayTime;
            isBooking = items[key].BookingYN;
            bookingRate = items[key].BookingRate;
            viewEvaluation = items[key].ViewEvaluation;

            if (Language == "KR") {
                movieTitle = items[key].MovieNameKR;
                gradeText = items[key].ViewGradeNameKR
                gradeText = gradeText.substr(0, 2)
            } else {
                movieTitle = items[key].MovieNameUS;
                gradeText = items[key].ViewGradeNameUS;
            }
            gradeText = gradeText.substr(0, 2)
            gradeCode = items[key].ViewGradeCode;
            if (gradeCode == "0") { gradeCode = "all"; }

            //sbList.AppendFormat('<li><a href="javascript:void(0)" onmouseover="currentMovie(this,\'{0}\',\'{4}\')" onclick="goToTiketing(\'{0}\')" class="tit"><em>{3}.</em> <span class="grade_15">{2}</span>{1}</a> '
            sbList.AppendFormat('<li><a href="javascript:void(0)" onmouseover="currentMovie(this)" onclick="goToTiketing(\'{0}\')" class="tit"><em>{3}.</em> <span class="grade_{5}">{2}</span><span class="mvTit">{1}</span></a> '
				, movieCode, movieTitle, gradeText, rank, isBooking, gradeCode);

            switch (CURRENT_SEQ) {
                case "1":
                    sbList.AppendFormat('<span class="memRk">예매율<em>{0}%</em></span></li>', bookingRate.toFixed(1));
                    break;
                case "3":
                    sbList.AppendFormat('<span class="memRk">평점<em>{0}</em></span></li>', viewEvaluation.toFixed(1));
                    break;
            }
        }

        // 2016.05.03 장착법
        if (CURRENT_SEQ == '1') {
            htmlString = '<div class="blind"><h3>예매순</h3></div>';
        }
        else {
            htmlString = '<div class="blind"><h3>평점순</h3></div>';
        }

        htmlString += sbList.ToString();

        $("div.officeCont ol.officeRk").html(htmlString);


        $('.main_key_visual').find('.officeRk').find('li').each(function () {
            var thisText = $(this).find('.mvTit').text();

            if (thisText.length > 10) {
                var reText = thisText.substr(0, 10);
                $(this).find('.mvTit').text(reText + '...');
            };
        });

    } catch (e) {
        CheckException(e, "appendMainRankList: ");
    }

}
// 상영 영화 선택 처리
currentMovie = function (e) {//, movieCode, isBooking) {
    if (e != undefined) {
        $(e).parent("li").parent("ol").find("li").removeClass("active");
        $(e).parent("li").addClass("active");
    }
}




// 영화 리스트 슬라이드 -----------------------------------------------
// 영화 리스트 Data 요청
getMainMovieList = function () {
    var division = 1;
    var artYN = 0;
    var festivalID = 0;
    // channelType, osType, osVersion => 상위 공통 파라미터 참조
    // division(영화구분: 1(영화랭킹), 2(아르떼), 3(영화제)
    // orderType:영화 정렬 순서(1:예매율순,2:관람율순,3:평점순,4:기대평점순,5:개봉임박순, movieType:일반영화(1), 아르테(2), 영화제(3)), 
    // festibalType(15퀴어영화제(1), 15관악청춘영화제(2), 영화제일 경우만 추가 파라미터)
    // moviePlayYN: 현재상영작(Y), 상영예정작(N)
    // blockSize: 한 페이지에 나와야 하는 개수, pageNo: 페이지 번호, artYN: 0일반 1예술영화
    var obj = {
        MethodName: "GetMainMovies", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language
    };

    GetData("movie", obj, appendMainMovieList);
    //JsonCall(CinemaServiceDomain + "/LCWS/Movie/MovieData.aspx", obj, appendMainMovieList)

}
// 영화 리스트 추가
// Params>
//	obj: 영화 리스트 Data, Json type
appendMainMovieList = function (obj) {
    try {
        var jsonData;
        var items;
        var sbList;
        var htmlString;
        var moiveSeq = 0;
        var itemSeq = 0;
        var movieCode;
        var movieTitle;
        var imageUrl;

        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        items = jsonData.Movies.Items;

        sbList = new StringBuilder();

        for (var key in items) {
            ++itemSeq;

            movieCode = items[key].RepresentationMovieCode;
            movieTitle = items[key].MovieNameKR;
            imageUrl = items[key].PosterURL;

            if (movieCode != "AD") {
                htmlString = makeMainMovieItemForMove(++moiveSeq, movieCode, imageUrl, movieTitle);
            } else {
                htmlString = makeMainMovieItemForAD(imageUrl, "", "javascript:void(0)");
            }

            sbList.Append(htmlString);

            if ((itemSeq % 5.0 == 0 && itemSeq > 0) || (items.length == itemSeq)) {
                sbList.Insert(0, "<ul>");
                sbList.Append("</ul>");
                htmlString = sbList.ToString();
                $("div.slidePoster div.slide").append(htmlString);
                sbList.RemoveAll();
            }
        }
        var slideGeneration1 = new $.fn.slideGeneration({ target: '.slidePoster', box: '.slide', item: 'ul', space: 100, animation: 'slide', btn: true, prev: '.prev', next: '.next', });

        $('.slidePoster li').mouseenter(function () {
            //console.log($(this).index());
            $(this).addClass('hover');
        }).mouseleave(function () {
            $(this).removeClass('hover');
        });

        $('.slidePoster li > a').focusin(function () {
            $(this).parent().addClass('hover').siblings().removeClass('hover');
        });
    } catch (e) {
        CheckException(e, "appendMainMovieList: ");

    }

}
// 영화 리스트용 영화 item code를 작성후 결과를 반환한다.
// params>
//	seqNo: 순차번호
//	movieCode: 영화대표코드
//	posterUrl: 포스터 이미지 경로
//	posterAlt: 포스터 이미지 설명
// return>
makeMainMovieItemForMove = function (seqNo, movieCode, posterUrl, posterAlt) {
    var result;
    try {
        var sbItem = new StringBuilder();

        sbItem.Append('<li>');
        sbItem.AppendFormat('<a href="javascript:void(0);"><img src="{0}" alt="{1}" /></a>', posterUrl, posterAlt);
        sbItem.Append('<div class="layer_hover">');
        // 영화코드 누락 여부 확인, 
        if (movieCode != undefined && movieCode != "") {
            sbItem.AppendFormat('<a href="javascript:void(0);" onclick="goToTiketing(\'{0}\')" class="btn_reserve">예매하기</a>', movieCode);
            sbItem.AppendFormat('<a href="javascript:void(0);" onclick="goToMovie(\'{0}\')" class="btn_View">상세보기</a>', movieCode);
        }
        sbItem.Append('</div>');
        sbItem.Append('</li>');

        result = sbItem.ToString();
    } catch (e) {
        result = "";
        CheckException(e, "makeMainMovieItemForMove: ");
    } finally {
        return result;
    }
}
// 영화 리스트용 광고 item code를 작성후 결과를 반환한다.
// params>
//	imageUrl: 광고 이미지 경로
//	imageAlt: 광고 이미지 설명
//	linkUrl: 연결 Url
// return>
makeMainMovieItemForAD = function (imageUrl, imageAlt, linkUrl) {
    var result;
    try {
        var sbItem = new StringBuilder();
        sbItem.Append('<li>');
        // 2016.02.03 홍상길 광고 관련 코드 수정
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 광고를 Script로 처리하기 어렵기 때문에 Script 처리된 html 테그를 가져온다.
        sbItem.Append($('#AD_PC_02').html());
        //sbItem.AppendFormat('<a href="{0}">', linkUrl);
        //sbItem.AppendFormat('<img src="{0}" alt="{1}" /></a>', imageUrl, imageAlt);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////
        sbItem.Append('</li>');

        result = sbItem.ToString();
    } catch (e) {
        result = "";
        CheckException(e, "makeMainMovieItemForAD: ");
    } finally {
        return result;
    }
}




// Event Box ----------------------------------------------------------
// Event box Data 요청
getMainEventBox = function () {
    var obj = { MethodName: "GetMainEventGroupItem", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language };
    //JsonCall(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, ReturnJsonData)
    GetData("main", obj, responseMainEventBox);

}
// Event box Data 기본 Data 설정 및 요청 결과 적용
// Params>
// obj: Data 요청 결과, Json type
responseMainEventBox = function (obj) {
    try {
        var jsonData;
        var items;
        var sbEventBox;
        //var event1OnClick = ""; var event1ImageUrl = "/LCHS/Image/Main/noimage_01.png"; var event1ImageAlt = "No Image";
        //var event2OnClick = ""; var event2ImageUrl = "/LCHS/Image/Main/noimage_02.png"; var event2ImageAlt = "No Image";
        //var event3OnClick = ""; var event3ImageUrl = "/LCHS/Image/Main/noimage_02.png"; var event3ImageAlt = "No Image";
        //var event4OnClick = ""; var event4ImageUrl = "/LCHS/Image/Main/noimage_07.png"; var event4ImageAlt = "No Image";
        //var event5OnClick = ""; var event5ImageUrl = "/LCHS/Image/Main/noimage_05.png"; var event5ImageAlt = "No Image";
        //var event6OnClick = ""; var event6ImageUrl = "/LCHS/Image/Main/noimage_03.png"; var event6ImageAlt = "No Image";
        //var event7OnClick = ""; var event7ImageUrl = "/LCHS/Image/Main/noimage_04.png"; var event7ImageAlt = "No Image";
        var event1OnClick = ""; var event1ImageUrl = "/LCHS/Image/Main/noimage_01.png"; var event1ImageAlt = "No Image";
        var event2OnClick = ""; var event2ImageUrl = "/LCHS/Image/Main/noimage_02.png"; var event2ImageAlt = "No Image";
        var event3OnClick = ""; var event3ImageUrl = "/LCHS/Image/Main/noimage_03.png"; var event3ImageAlt = "No Image";
        var event4OnClick = ""; var event4ImageUrl = "/LCHS/Image/Main/noimage_02.png"; var event4ImageAlt = "No Image";
        var event5OnClick = ""; var event5ImageUrl = "/LCHS/Image/Main/noimage_07.png"; var event5ImageAlt = "No Image";
        var event6OnClick = ""; var event6ImageUrl = "/LCHS/Image/Main/noimage_04.png"; var event6ImageAlt = "No Image";
        var event7OnClick = ""; var event7ImageUrl = "/LCHS/Image/Main/noimage_05.png"; var event7ImageAlt = "No Image";

        //event1ImageUrl = "/LCHS/Image/Main/@mainEvt01.jpg";
        //event2ImageUrl = "/LCHS/Image/Main/@mainEvt02.jpg";
        //event3ImageUrl = "/LCHS/Image/Main/@mainEvt03.jpg";
        //event4ImageUrl = "/LCHS/Image/Main/@mainEvt04.jpg";
        //event5ImageUrl = "/LCHS/Image/Main/@mainEvt05.jpg";
        //event6ImageUrl = "/LCHS/Image/Main/@mainEvt06.jpg";
        //event7ImageUrl = "/LCHS/Image/Main/@mainEvt07.jpg";

        jsonData = obj.responseJSON;

        // Data 유효성 검사
        if (jsonData == undefined) { throw new Error("None Data Error"); }
        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        items = jsonData.MainEventGroupItems.Items;
        for (var key in items) {
            switch (items[key].TemplateCode) {
                case "30":
                    event1OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event1ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event1ImageAlt = items[key].EventName;
                    event1ImageAlt = items[key].ImageFileAlt;
                    break;
                case "40":
                    event2OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event2ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event2ImageAlt = items[key].EventName;
                    event2ImageAlt = items[key].ImageFileAlt;
                    break;
                case "50":
                    event3OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event3ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event3ImageAlt = items[key].EventName;
                    event3ImageAlt = items[key].ImageFileAlt;
                    break;
                case "60":
                    event4OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event4ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event4ImageAlt = items[key].EventName;
                    event4ImageAlt = items[key].ImageFileAlt;
                    break;
                case "70":
                    event5OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event5ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event5ImageAlt = items[key].EventName;
                    event5ImageAlt = items[key].ImageFileAlt;
                    break;
                case "80":
                    event6OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event6ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event6ImageAlt = items[key].EventName;
                    event6ImageAlt = items[key].ImageFileAlt;
                    break;
                case "90":
                    event7OnClick = makeOnClickEventScript(items[key].EventID, items[key].EventTypeCode, items[key].DevTemplateYN);
                    if (checkImage(items[key].ImageFileFullPath))
                        event7ImageUrl = items[key].ImageFileFullPath;
                    // 20161012 - ALT 적용
                    //event7ImageAlt = items[key].EventName;
                    event7ImageAlt = items[key].ImageFileAlt;
                    break;
            }
        }
    } catch (e) {
        CheckException(e, "responseMainEventBox: ");
    } finally {
        setMainEventBox(event1OnClick, event1ImageUrl, event1ImageAlt
						, event2OnClick, event2ImageUrl, event2ImageAlt
						, event3OnClick, event3ImageUrl, event3ImageAlt
						, event4OnClick, event4ImageUrl, event4ImageAlt
						, event5OnClick, event5ImageUrl, event5ImageAlt
						, event6OnClick, event6ImageUrl, event6ImageAlt
						, event7OnClick, event7ImageUrl, event7ImageAlt);
    }

}
// Event box 이미지 Click시 처리 설정
// Params>
//	eventID: 이벤트 ID
//	eventTypeCode: 이벤트 템플릿 타입 코드
//	devTemplateYN: Dev 템플릿 여부
makeOnClickEventScript = function (eventID, eventTypeCode, devTemplateYN) {
    var result;
    try {
        var sbScript = new StringBuilder();

        sbScript.AppendFormat(' onclick="goEventDtailsMove(\'{0}\',\'{1}\', \'{2}\', \'1\')"', eventID, eventTypeCode, devTemplateYN);

        result = sbScript.ToString();
    } catch (e) {
        result = "";
    } finally {
        return result;
    }
}
// Event box html 작성 및 적용
//	event1OnClick: 1번째 이미지 클릭 이벤트, event1ImageUrl: 1번째 이미지 Url, event1ImageAlt: 1번째 이미지 Alt Text,
//	event2OnClick, 2번째 이미지 클릭 이벤트, event2ImageUrl: 2번째 이미지 Url, event2ImageAlt: 2번째 이미지 Alt Text,
//	event3OnClick, 3번째 이미지 클릭 이벤트, event3ImageUrl: 3번째 이미지 Url, event3ImageAlt: 3번째 이미지 Alt Text,
//	event4OnClick, 4번째 이미지 클릭 이벤트, event4ImageUrl: 4번째 이미지 Url, event4ImageAlt: 4번째 이미지 Alt Text,
//	event5OnClick, 5번째 이미지 클릭 이벤트, event5ImageUrl: 5번째 이미지 Url, event5ImageAlt: 5번째 이미지 Alt Text,
//	event6OnClick, 6번째 이미지 클릭 이벤트, event6ImageUrl: 6번째 이미지 Url, event6ImageAlt: 6번째 이미지 Alt Text,
//	event7OnClick, 7번째 이미지 클릭 이벤트, event7ImageUrl: 7번째 이미지 Url, event7ImageAlt: 7번째 이미지 Alt Text
setMainEventBox = function (event1OnClick, event1ImageUrl, event1ImageAlt
							, event2OnClick, event2ImageUrl, event2ImageAlt
							, event3OnClick, event3ImageUrl, event3ImageAlt
							, event4OnClick, event4ImageUrl, event4ImageAlt
							, event5OnClick, event5ImageUrl, event5ImageAlt
							, event6OnClick, event6ImageUrl, event6ImageAlt
							, event7OnClick, event7ImageUrl, event7ImageAlt) {
    var htmlString;
    var sbEventBox = new StringBuilder();

    //sbEventBox.Append('<div class="flbx">');
    //sbEventBox.Append('<ul class="fl">');
    //sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event1OnClick, event1ImageUrl, event1ImageAlt);
    //sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event2OnClick, event2ImageUrl, event2ImageAlt);
    //sbEventBox.Append('</ul>');
    //sbEventBox.Append('<ul class="fr">');
    //sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event3OnClick, event3ImageUrl, event3ImageAlt);
    //sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event4OnClick, event4ImageUrl, event4ImageAlt);
    //sbEventBox.Append('</ul>');
    //sbEventBox.AppendFormat('<a href="javascript:void(0);" class="pbBnT"{0}><img src="{1}" alt="{2}" /></a>', event5OnClick, event5ImageUrl, event5ImageAlt);
    //sbEventBox.Append('</div>');
    //sbEventBox.Append('<ul class="fr">');
    //sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event6OnClick, event6ImageUrl, event6ImageAlt);
    //sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event7OnClick, event7ImageUrl, event7ImageAlt);
    //sbEventBox.Append('</ul>');

    sbEventBox.Append('<div class="flbx">');
    sbEventBox.Append('<ul class="fl">');
    sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event1OnClick, event1ImageUrl, event1ImageAlt);
    sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event4OnClick, event4ImageUrl, event4ImageAlt);
    sbEventBox.Append('</ul>');
    sbEventBox.Append('<ul class="fr">');
    sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event2OnClick, event2ImageUrl, event2ImageAlt);
    sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event5OnClick, event5ImageUrl, event5ImageAlt);
    sbEventBox.Append('</ul>');
    sbEventBox.AppendFormat('<a href="javascript:void(0);" class="pbBnT"{0}><img src="{1}" alt="{2}" /></a>', event7OnClick, event7ImageUrl, event7ImageAlt);
    sbEventBox.Append('</div>');
    sbEventBox.Append('<ul class="fr">');
    sbEventBox.AppendFormat('<li class="pbBn"><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event3OnClick, event3ImageUrl, event3ImageAlt);
    sbEventBox.AppendFormat('<li><a href="javascript:void(0);"{0}><img src="{1}" alt="{2}" /></a></li>', event6OnClick, event6ImageUrl, event6ImageAlt);
    sbEventBox.Append('</ul>');

    htmlString = sbEventBox.ToString();

    $("div.eventBxMain div.eventBxMain_in").html(htmlString);
    $("div.eventBxMain").show();
}