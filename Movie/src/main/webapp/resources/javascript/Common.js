/****************************************
* 공통 상수 선언
****************************************/
TITLE_ROOT = "롯데시네마";

//시네마몰 메뉴코드
var CLASSIFICATION_SWEET_CODE = "10"  //스위트샵
var CLASSIFICATION_GIFT_CODE = "20"   // 기프트샵

// 페이지 Title을 설정 한다.
setPageTitle = function (pageTitle) {
    //if (pageTitle == undefined) {
    //	if (TITLE_PAGE == undefined) {
    //		pageTitle = "";
    //	} else {
    //		pageTitle = TITLE_PAGE;
    //	}
    //}
    //if (pageTitle != "") {
    //	$("title").append(pageTitle);
    //	$("title").append(" | ");
    //}
    //$("title").append(TITLE_ROOT);
}

//메뉴별 JSON data를 reCall 함수에 전달한다.
//menu: 해당 메뉴의 약어 string
//params: JSON data를 받기위한 parameter object
//reCall: JSON data를 받아 처리하기 위한 javascript function
//return: false - 해당 메뉴가 없을 경우, true - 정상 호출이 처리된 경우
GetData = function (menu, params, reCall, syncType, showLoging, sslBool) {
    var dataUrl;
    try {
        switch (menu.toLowerCase()) {
            case "main":	// 메인
                dataUrl = "/LCWS/Common/MainData.aspx";
                break;
            case "member": //회원
                dataUrl = "/LCWS/Member/Mobile/Login.aspx";
                break;
            case "ticket": //예매
                dataUrl = "/LCWS/Ticketing/TicketingData.aspx";
                break;
            case "payment": //예매결제
                dataUrl = "/LCWS/Ticketing/PaymentData.aspx";
                break;
            case "movie": //영화
                dataUrl = "/LCWS/Movie/MovieData.aspx";
                break;
            case "cinema": //영화관
                dataUrl = "/LCWS/Cinema/CinemaData.aspx";
                break;
            case "special": //스페셜관
                dataUrl = "/LCWS";
                break;
            case "event": //이벤트
                dataUrl = "/LCWS/Event/EventData.aspx";
                break;
                //case "eventetc": //이벤트 이외
                //    dataUrl = "/LCWS/Event/EventEtcData.aspx";
                //    break;
                //case "mall": //시네마몰
                //	dataUrl = "/LCWS/CinemaMall/CinemaMallEtcData.aspx";
                //	break;
            case "cinemamall": //시네마몰
                dataUrl = "/LCWS/CinemaMall/CinemaMallData.aspx";
                break;
            case "cinemamalletc": //시네마몰 이외
                dataUrl = "/LCWS/CinemaMall/CinemaMallEtcData.aspx";
                break;
            case "custom": //고객센타
                dataUrl = "/LCWS/Customer-Service-Center/CustomerServiceCenterEtcData.aspx";
                break;
            case "customerservice": //고객센타 공지사항
                dataUrl = "/LCWS/Customer-Service-Center/CustomerServiceCenterData.aspx";
                break;
            case "mycinema": //마이시네마
                dataUrl = "/LCWS/MyCinema/MyCinemaData.aspx";
                break;
            case "commoncode": //공통코드
                dataUrl = "/LCWS/Common/CommonCodeData.aspx";
                break;
            case "sms": // SMS
                dataUrl = "/LCWS/SMS/SMSData.aspx";
                break;
            default:
                return false;
        }
        var serviceDomain = "";
        //if (sslBool)
        //    serviceDomain = CinemaSSLServiceDomain;
        //else
        serviceDomain = CinemaServiceDomain;

        if (syncType == "sync")
            JsonCallSync(serviceDomain + dataUrl, params, reCall);
        else
            JsonCall(serviceDomain + dataUrl, params, reCall, showLoging);
        return true;
    } catch (e) {
        alert("GetData Error : " + e.message);
        return false;
    }
}

$.fn.Global = function () {
    this.isLoading = false;
    this.validateReservation = false;
    this.loadingNum = 0;
    this.Init();
};
$.fn.Global.prototype = {
    Init: function () {
        var G = this;
    },
    showLoading: function (showYN, validateReservation) {
        var G = this;
        G.validateReservation = (validateReservation != undefined) ? validateReservation : false;

        if (showYN) {
            ++G.loadingNum;
            if (!G.isLoading) {
                G.isLoading = true;
                //if(!G.validateReservation){
                $('body').append('<div class="d_loading" style="position:fixed; top:50%; left:50%; z-index:9999;"><img src="/LCHS/Image/preloader_icon.GIF" alt="데이터 로딩중입니다. 잠시만 기다려 주세요."/></div>');  // 1603313
                //}
                //else {
                //    $('body').append('<div class="d_loading" style="position:fixed; top:50%; left:50%; z-index:100; margin-left: -90px; margin-top: -40px;"><img src="/LCHS/Image/preloader_icon.GIF" alt="결제 진행 중에 브라우져를 닫으시면 결제가 취소 됩니다. 결제가 진행중입니다. 잠시만 기다려주세요. 결제진행 시간은 시스템 환경에 다라 최대 10분가량 소요될 수 있습니다."/></div>');
                //}
            }
        } else {
            --G.loadingNum;
            if (G.isLoading == true && G.loadingNum == 0) {
                if ($('body').find('.d_loading')[0] != undefined) $('.d_loading').remove();
                G.isLoading = false;
            }
        }

    }
};
var global = new $.fn.Global();

JsonCall = function (url, params, reCall, showLoading) {
    params = "paramList=" + JSON.stringify(params);
    if (showLoading == undefined)
        showLoading = true;

    //var request = XMLHttpRequest.create("http://www.lottecinema.co.kr");
    //request.Headers["Accept"] = "application/json";
    //request.Headers["Accept-Encoding"] = "gzip, deflate";

    try {
        if (showLoading)
            global.showLoading(true);
        $.ajax({
            type: "post",
            //async:false,
            url: url + "?nocashe=" + String(Math.random()),
            dataType: "json",
            data: params,
            //headers:{
            //    "Accept-Encoding": "gzip, deflate"
            //},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Encoding", "gzip");
            },
            //header: {"Accept-Encoding":"gzip"},

            fail: function (data) {
                if (showLoading)
                    global.showLoading(false);
            },
            complete: function (data) {
                if (showLoading)
                    global.showLoading(false);
                reCall(data);
            }
        });
    }
    catch (e) {
        alert("JSON Error: " + e.message);
    }
};

JsonCallSync = function (url, params, reCall) {
    params = "paramList=" + JSON.stringify(params);

    try {
        $.ajax({
            type: "post",
            async: true,
            url: url + "?nocashe=" + String(Math.random()),
            dataType: "json",
            data: params,
            //headers: {
            //    "Accept": "application/json",
            //    "Accept-Encoding": "gzip, deflate"
            //},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Encoding", "gzip");
            },

            fail: function (data) {
            },
            complete: function (data) {
                reCall(data);
            }
        });
    }
    catch (e) {
        alert("JSON Error: " + e.message);
    }
};

JsonReturnDataSync = function (url, params) {
    params = "paramList=" + JSON.stringify(params);
    var jsonVal = "";

    try {
        $.ajax({
            type: "post",
            async: true,
            url: url + "?nocashe=" + String(Math.random()),
            dataType: "json",
            data: params,
            //headers: {
            //    "Accept": "application/json",
            //    "Accept-Encoding": "gzip, deflate"
            //},
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Encoding", "gzip");
            },

            fail: function (data) {
            },
            complete: function (data) {
                jsonVal = data;
            }
        });
        return jsonVal;
    }
    catch (e) {
        alert("JSON Error: " + e.message);
    }
};

// ##### 시네마몰 리스트 Url  사용안함  #####
//categoryCode : 시네마몰 메뉴 코드(상품권:01 , 상품:02, 패키지:03)
getCinemaMallListUrl = function (categoryCode) {
    var url = "";
    if (categoryCode == "01") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-gift-card-ticket-list.aspx"
    } else if (categoryCode == "02") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-item-list.aspx"
    } else if (categoryCode == "03") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-package-list.aspx"
    }

    return url
}

function goEventDetail(eventid, eventtypecode) {
    // 101:정보전달형(공지)
    // 102:예매형
    // 103:구매형
    // 104:설문형
    // 105:퀴즈형
    // 106:댓글형
    // 107:무대인사
    // 108:시사회
    // 109:갤러리등록형
    // 110:단순 선착순형
    // 111:버튼형
    // 112:스탬프형
    // 113:출석형
    // 114:영수증응모형
    // 115:정보전달형(할인)
    var url;

    if (eventtypecode == "101") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/infomation-delivery-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "102") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/booking-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "103") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/buy-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "104") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/survey-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "105") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/quize-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "106") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/comment-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "107") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/stage-greeting-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "108") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/preview-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "109") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/gallery-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "111" && eventid == "101110000816007") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/' + eventtypecode + '/' + eventid + '.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "111") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/button-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "112") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/stamp-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "113") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/attendance-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "114") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/receipt-enter-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "115") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/infomation-delivery-event.aspx?EventID=' + eventid;
    }
    else if (eventtypecode == "116") {
        url = CinemaServerDomain + '/LCHS/Contents/Event/early-bird-event.aspx?EventID=' + eventid;
    }
    else {
        url = CinemaServerDomain + '/LCHS/Contents/Event/' + eventtypecode + '/' + eventid + '.aspx?EventID=' + eventid;
        //return;
    }

    location.href = url;
};

// ##### 시네마몰 상세보기 Url 사용안함  #####
//categoryCode : 시네마몰 메뉴 코드(상품권:01 , 상품:02, 패키지:03)
getCinemaMallDetailUrl = function (categoryCode) {
    var url = "";
    if (categoryCode == "01") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-gift-card-ticket-detail.aspx"
    } else if (categoryCode == "02") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-item-detail.aspx"
    } else if (categoryCode == "03") {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/cinema-mall-package-detail.aspx"
    }
    return url
}

// ##### 시네마몰 상세보기 이동 사용안함  #####
//categoryCode : 시네마몰 메뉴 코드(상품권:01 , 상품:02, 패키지:03)
//itemCode : 상품코드
//itemSubCode : 상품종류
//addParam : 추가 Parameter (ex : '&A=1&B=1')
goCinemaMallDetail = function (categoryCode, itemCode, itemSubCode, addParam) {
    var param = "?psItemCode=" + itemCode + "&psItemSubCode=" + itemSubCode
    window.location.href = getCinemaMallDetailUrl(categoryCode) + "" + param + "" + addParam;

}

// ##### 시네마몰 리스트 이동 사용안함  #####
//categoryCode : 시네마몰 메뉴 코드(상품권:01 , 상품:02, 패키지:03)
//itemCode : 상품코드
//itemSubCode : 상품종류
//addParam : 추가 Parameter (ex : '&A=1&B=1')
goCinemaMallList = function (categoryCode, param) {
    window.location.href = getCinemaMallListUrl(categoryCode) + "?" + param;

}

/****************************************
* 시네마몰 상세 경로
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* ****************************************/
getLotteCinemaMallDetailUrl = function (classifictionCode) {
    var url = "";
    if (classifictionCode == CLASSIFICATION_SWEET_CODE) {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/sweet-shop-detail.aspx"
    } else if (classifictionCode == CLASSIFICATION_GIFT_CODE) {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/gift-shop-detail.aspx"
    }
    return url
}

/****************************************
* 시네마몰 리스트 경로
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* ****************************************/
getLotteCinemaMallListUrl = function (classifictionCode) {
    var url = "";
    if (classifictionCode == CLASSIFICATION_SWEET_CODE) {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/sweet-shop.aspx"
    } else if (classifictionCode == CLASSIFICATION_GIFT_CODE) {
        url = CinemaServerDomain + "/LCHS/Contents/Cinema-Mall/gift-shop.aspx"
    }
    return url
}

/****************************************
* 시네마몰 리스트
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* detailDivisionCode : 지역코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* cinemaID : 영화관 코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* displayItemID : 상품코드
* type : 3 :return url, 2:window.open(), 
* ****************************************/
goLotteCinemaMallList = function (classifictionCode, cinemaID, displayItemID, type) {
    var url = "";
    var param = ""
    if (classifictionCode == CLASSIFICATION_SWEET_CODE) {
        param = "?cinemaID=" + cinemaID + "&displayItemID=" + displayItemID
    } else {
        param = "?displayItemID=" + displayItemID
    }
    url = getLotteCinemaMallListUrl(classifictionCode) + param
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

/****************************************
* 시네마몰 상세페이지
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* displayMiddleClassificationCode : 중분류코드
* cinemaID : 영화관 코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* displayItemID : 상품코드
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goLotteCinemaMallDetail = function (classifictionCode, displayMiddleClassificationCode, cinemaID, displayItemID, type) {
    var url = "";
    var param = "";
    if (classifictionCode == CLASSIFICATION_SWEET_CODE) {
        param = "?cinemaID=" + cinemaID + "&displayItemID=" + displayItemID + "&displayMiddleClassification=" + displayMiddleClassificationCode
    } else {
        param = "?displayItemID=" + displayItemID + "&displayMiddleClassification=" + displayMiddleClassificationCode
    }
    url = getLotteCinemaMallDetailUrl(classifictionCode) + param
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

/****************************************
* 쿠키 등록
* eventID : 이벤트 아이디
****************************************/
addCookieEventID = function (eventID) {
    if (eventID != null && eventID != "") {
        $.cookie('eventID', eventID, { path: '/', domain: '.lottecinema.co.kr' });
    }
}

/****************************************
* 쿠키 등록
* movieCode : 영화코드
****************************************/
addCookieMovieCode = function (movieCode) {
    if (movieCode != "") {
        var arr = new Array()
        arr[0] = movieCode

        $.fn.cookieChanges('add', 'ticketingState.ticketing.movieCodes', arr);
    }
}

/****************************************
* 쿠키 등록
* areaCodes : 영화관 지역코드
****************************************/
addCookieAreaCodes = function (areaCode) {
    if (areaCode != "") {
        var arr = new Array()
        arr[0] = areaCode
        $.fn.cookieChanges('add', 'ticketingState.ticketing.areaCodes', arr);
    }
}

/****************************************
* 쿠키 등록
* cinemaCodes :영화관 코드
****************************************/
addCookieCinemaCodes = function (cinemaCode) {
    if (cinemaCode != "") {
        var arr = new Array()
        arr[0] = cinemaCode
        $.fn.cookieChanges('add', 'ticketingState.ticketing.cinemaCodes', arr);
    }
}

/****************************************
* 쿠키 등록
* screentype :일반관, 스페셜
****************************************/
addCookieScreentype = function (screentype) {
    if (screentype != "") {
        var arr = new Array()
        arr[0] = screentype
        $.fn.cookieChanges('add', 'ticketingState.ticketing.screentype', arr);
    }
}

/****************************************
* 예매 이동
* eventID : 이벤트 아이디
* areaCodes : 영화관 지역코드
* cinemaCodes :영화관 코드
* screentype :일반관, 스페셜
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goEventToTicketIng = function (eventID, movieCode, areaCode, cinemaCode, screentype, type) {
    $.fn.cookieReset()
    addCookieEventID(eventID)
    addCookieMovieCode(movieCode)
    addCookieAreaCodes(areaCode)
    addCookieCinemaCodes(cinemaCode)
    addCookieScreentype(screentype)
    var url = CinemaServerDomain + "/LCHS/Contents/ticketing/ticketing.aspx"
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

/****************************************
* 이벤트에서 시네마몰로 이동
* eventID : 이벤트 아이디
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* detailDivisionCode : 지역코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* cinemaID : 영화관 코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* displayItemID : 상품코드
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goEventToCinemaMallList = function (classifictionCode, cinemaID, displayItemID, eventID, type) {
    $.fn.cookieReset()
    addCookieEventID(eventID)
    goLotteCinemaMallList(classifictionCode, cinemaID, displayItemID, type)
    //goUrl(url, type);
}

/****************************************
* 이벤트에서 시네마몰로 상세 이동
* eventID : 이벤트 아이디
* classifictionCode : 시네마몰 메뉴 코드(스위트:CLASSIFICATION_SWEET_CODE , 기프트:CLASSIFICATION_GIFT_CODE)
* displayMiddleClassificationCode : 중분류 코드
* cinemaID : 영화관 코드 (스위트 상품코드가 있을경우 필수) - 기프트 상품에서는 사용안함
* displayItemID : 상품코드
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goEventToCinemaMallDetail = function (classifictionCode, displayMiddleClassificationCode, cinemaID, displayItemID, eventID, type) {
    $.fn.cookieReset()
    addCookieEventID(eventID)
    goLotteCinemaMallDetail(classifictionCode, displayMiddleClassificationCode, cinemaID, displayItemID, type)
    //goUrl(url, type);
}

//스페셜영화관으로 이동
//params>
//		code:	스페셜관 코드
//return>
goToSpecial = function (code) {
    var url = "/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=";
    url += code;
    $(location).attr("href", url);
}

/****************************************
* 영화관 상세페이지 이동
* cinemaMallMenuCode : 관별 대분류 코드(전체:1, 스페셜관:2)
* detailDivisionCode : 대분류 별 중분류 코드(전체일 경우: 지역, 스페셜관일 경우: 스페셜 타입 코드)
* cinemaID : 영화관 코드
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goLotteCinemaDetail = function (divisionCode, detailDivisionCode, cinemaID, type) {
    var param = "?divisionCode=" + divisionCode + "&detailDivisionCode=" + detailDivisionCode + "&cinemaID=" + cinemaID
    url = CinemaServerDomain + "/LCHS/Contents/Cinema/Cinema-Detail.aspx" + param
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

/****************************************
* 마이 시네마 특정 페이지 이동
* tab1st : 탭 메뉴
* tab2nd : 서브 탭 메뉴
****************************************/
goLotteMyCinema = function (tab1st, tab2nd, type) {
    //var param = "?tab1st=" + tab1st + "&tab2nd=" + tab2nd;
    // hisroty.back 활용 대비 변경으로 인해 수정
    var param = "#" + tab1st + tab2nd;
    url = CinemaServerDomain + "/LCHS/Contents/My-Cinema/My-Cinema.aspx" + param;
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

/****************************************
* 타입에 따라 링크 이동 방법이 바뀐다.
* url : 링크 주소
* type : 3 :return url, 2:window.open(), 그외:windows.location
****************************************/
goUrl = function (url, type) {
    // type 기본값 설정
    type = (type == undefined) ? '1' : type;
    if (type == "") {
        type = "1"; //1:링크
    }
    if (type == "3") {
        return url;
    } else if (type == "2") {
        if (url == "") {
            alert(' 개발 중');
        } else {
            window.open(url, '_blank');//새창링크
        }
    } else {
        if (url == "") {
            alert(' 개발 중');
        } else {
            location.href = url;//링크
        }
    }
}

/* 레이어 팝업 */

$(window).load(function () {

    // pop_wrap 클래스 사용 금지 modal 클래스입니다

    //var docHeight = $(document).outerHeight(true);
    //$('.pop_wrap').css({ "height": docHeight });

    //$('a.pop_open').on('click', function (event) {
    //    event.preventDefault();
    //    var popWrap = $($(this).attr('href'));

    //    $('.pop_wrap').hide();
    //    popWrap.show().height($(document).height());
    //    $(window).resize(function () {
    //        popWrap.height($(document).height());
    //    })
    //});

    //$('a.pop_close').on('click', function (event) {
    //    event.preventDefault();
    //    $('.pop_wrap').hide();
    //});
});

/**************************************
* 예외 처리 
* 작성자: 박규홍
**************************************/
var _debug;					//디버깅 모드 설정용, 각 페이지에서 true로 설정하면, 오류를 alert 창으로 표시한다.
var _notRedirection;		//페이지 이동 금지 설정용, 각 페이지에서 true로 설정하면, 페이지 이동하지 않는다.
//오류발생시 처리
//params>
//		e: Exception 객체
//		headerText: 오류 구분용 Header Text
//		menu: 메뉴 구분자, 페이지 이동 등의 메뉴별 오류 처리용 구분자, null || "" 일 때 이동하지 않는다.
//return>
CheckException = function (e, headerText, menu) {
    //디버깅 모드 이면 메시지 창으로 오류 표시
    if (_debug) {
        var sb = new StringBuilder();
        sb.AppendFormat("* Error [ {0} ]\n\n* Message:  {1}\n\n* Stack:\n{2}", headerText, e.message, e.stack);
        alert(sb.ToString());
    } else {
        //디버딩 모드가 아닐 때 오류 공통 처리
    }

    //화면 이동 금지 상태 이면 return
    if (_notRedirection) {
        return;
    } else {
        //메뉴별 화면 이동 처리
        switch (menu) {
            case "cinema":
                break;
            case "cinema-mall":
                break;
            case "common":
                break;
            case "event":
                break;
            case "member":
                break;
            case "movie":
                $(location).attr("href", CinemaServerDomain + "/LCHS/Contents/Movie/Movie-List.aspx");	//영화 페이지로 이동
                break;
            case "my-cinema":
                break;
            case "special-cinema":
                break;
            case "tiketing":
                break;
        }
    }

}

//(function () {
//    Global.showLoading = function (bool, validateReservation) {
//        var flag = (validateReservation != undefined) ? validateReservation : false;
//        if (bool) {
//            Global.isLoading = true;
//            if (!flag) {
//                $('body').append('<div class="d_loading" style="position:fixed; top:50%; left:50%; z-index:100;"><img src="/LHS/LHFS/Image/Web/Ticket/loading.gif" alt="데이터 로딩중입니다. 잠시만 기다려 주세요."/></div>');
//            }
//            else {
//                $('body').append('<div class="d_loading" style="position:fixed; top:50%; left:50%; z-index:100; margin-left: -90px; margin-top: -40px;"><img src="/LHS/LHFS/Image/Web/Ticket/loading02.gif" alt="결제 진행 중에 브라우져를 닫으시면 결제가 취소 됩니다. 결제가 진중입니다. 잠시만 기다려주세요. 결제진행 시간은 시스템 환경에 다라 최대 10분가량 소요될 수 있습니다."/></div>');
//            }

//        } else {
//            if ($('body').find('.d_loading')[0] != undefined) $('.d_loading').remove();
//            Global.isLoading = false;
//        }
//    }
//})();

// 파라미터 받아오기
// 사용법 : var param = getParameters();
function getParameters() {
    var searchString = window.location.search.substring(1),
      params = searchString.split("&"),
      hash = {};

    if (searchString == "") return {};
    for (var i = 0; i < params.length; i++) {
        var val = params[i].split("=");
        hash[unescape(val[0])] = unescape(val[1]);
    }

    return hash;
}

//영화상세로 이동
//params>
//		code: 영화코드
//return>
goToMovie = function (code) {
    $(location).attr("href", "/LCHS/Contents/Movie/Movie-Detail-View.aspx?movie=" + code);
}

//예매로 이동
//params>
//		code: 영화코드
//return>
goToTiketing = function (code) {
    $.fn.cookieReset();
    var movieArray = cookieJson.ticketingState.ticketing.movieCodes;
    movieArray.unshift(code);
    $.fn.cookieChanges('add', 'cookieJson.ticketingState.ticketing.movieCodes', movieArray);
    $(location).attr("href", "/LCHS/Contents/ticketing/ticketing.aspx");
}

/// <summary>
/// 이벤트 상세 조회
/// </summary>
/// <param name="eventid">이벤트 ID</param>
/// <param name="eventtypecode">이벤트 유형</param>
/// <param name="devtmplyn">개발 템플릿 여부</param>
/// <param name="type">3 :return url, 2:window.open(), 그외:windows.location</param>
function goEventDtailsMove(eventid, eventtypecode, devtmplyn, type) {
    var url;

    if (devtmplyn == "0") {
        if (eventtypecode == "101") {
            url = EventServerDomain + '/LCHS/Contents/Event/infomation-delivery-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "102") {
            url = EventServerDomain + '/LCHS/Contents/Event/booking-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "103") {
            url = EventServerDomain + '/LCHS/Contents/Event/buy-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "104") {
            url = EventServerDomain + '/LCHS/Contents/Event/survey-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "105") {
            url = EventServerDomain + '/LCHS/Contents/Event/quize-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "106") {
            url = EventServerDomain + '/LCHS/Contents/Event/comment-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "107") {
            url = EventServerDomain + '/LCHS/Contents/Event/stage-greeting-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "108") {
            url = EventServerDomain + '/LCHS/Contents/Event/preview-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "109") {
            url = EventServerDomain + '/LCHS/Contents/Event/gallery-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "111") {
            url = EventServerDomain + '/LCHS/Contents/Event/button-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "112") {
            url = EventServerDomain + '/LCHS/Contents/Event/stamp-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "113") {
            url = EventServerDomain + '/LCHS/Contents/Event/attendance-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "114") {
            url = EventServerDomain + '/LCHS/Contents/Event/receipt-enter-event.aspx?EventID=' + eventid;
        }
        else if (eventtypecode == "115") {
            url = EventServerDomain + '/LCHS/Contents/Event/infomation-delivery-event.aspx?EventID=' + eventid;
        }
        else {
            alert('진행하지 않는 이벤트 입니다.');
            return;
        }
    }
    else if (devtmplyn == "1") {
        url = EventServerDomain + '/LCHS/Contents/Event/' + eventtypecode + '/' + eventid + '.aspx?EventID=' + eventid;
    }

    type = (type == undefined) ? '1' : type;
    goUrl(url, type);
}

//이벤트 리스트 페이지 가기 -- 진짜 절대 지우지 말것
function goToEventList(eventClassificationCode) {
    /// <summary>
    /// 이벤트 리스트 페이지
    /// </summary>
    /// <param name="eventClassificationCode">이벤트 분류 코드</param>
    var url;
    //'L.셀렉션'
    if (eventClassificationCode == '10') {
        url = EventServerDomain + '/LCHS/Contents/Event/l-selection-list.aspx';
    }
        //'영화&예매'
    else if (eventClassificationCode == '20') {
        url = EventServerDomain + '/LCHS/Contents/Event/movie-booking-list.aspx';
    }
        //'우리동네 영화관'
    else if (eventClassificationCode == '30') {
        url = EventServerDomain + '/LCHS/Contents/Event/our-town-cinema-list.aspx';
    }
        //'무대인사&시사회'
    else if (eventClassificationCode == '40') {
        url = EventServerDomain + '/LCHS/Contents/Event/preview-stage-greeting-list.aspx';
    }
        //'제휴&할인'
    else if (eventClassificationCode == '50') {
        url = EventServerDomain + '/LCHS/Contents/Event/alliance-discount-list.aspx';
    }

    location.href = url;
};

// 고객센터 메뉴 이동
customerCenterMenu = function (menuID, type) {
    //var menuID;
    var url;
    switch (menuID) {
        case 0:// FAQ
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/FAQ/faq-list.aspx';
            break;
        case 1:// 공지사항
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Notice/notice-list.aspx';
            break;
        case 2:// 1:1 문의
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/One-To-One-Inquriry/one-to-one-inquriry-registration.aspx';
            //if (!checkLogin()) {
            //    //	alert("로그인이 필요합니다.");
            //    goToLogin(url);
            //    return;
            //}
            break;
        case 3:// 단체관람/대관문의   
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Multiple-Viewing-Inquiry/multiple-viewing-inquiry-registration.aspx';
            break;
        case 4:// 분실문안내
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Lost-Article-Guide/lost-article-guide-list.aspx';
            break;
        case 5:// 이용안내 - 홈페이지 예매
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Guide/ticket-guide-homepage.aspx';
            break;
        case 6:// 분실문접수
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Lost-Article-Registration/lost-article-registration.aspx';
            //if (!checkLogin()) {
            //	//	alert("로그인이 필요합니다.");
            //	goToLogin(url);
            //	return;
            //}
            break;
        case 7:// 이용안내 - 홈페이지모바일앱
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Guide/ticket-guide-mobileapp.aspx';
            break;
        case 8:// 이용안내 - 홈페이지모바일웹
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Guide/ticket-guide-mobileweb.aspx';
            break;
        case 9:// 이용안내 - 홈페이지현장예매
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Guide/ticket-guide-scene.aspx';
            break;
        case 10:// 이용안내 - 홈페이지온라인구매
            url = CinemaServerDomain + '/LCHS/Contents/Customer-Service-Center/Guide/ticket-guide-online.aspx';
            break;
        case 11:// 예매바로가기_20160408 임덕재
            url = CinemaServerDomain + '/LCHS/Contents/Ticketing/ticketing.aspx';
            break;
    }
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);

    //location.href = url;
}

// 맴버쉽 메뉴 이동
goToMembershipMenu = function (tab1, tab2, type) {
    var url;
    switch (tab1) {
        // VIP회원
        case 0:
            switch (tab2) {
                case 0:		// 쿠폰북
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/vip-member-vip-coupon.aspx';
                    break;
                case 1:		// VIP 혜택
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/vip-member-vip-benefit.aspx';
                    break;
                case 2:		// VIP 전용이벤트
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/vip-member-vip-event-list.aspx';
                    break;
                case 3:		// FAQ
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/vip-member-faq.aspx';
                    break;
            }
            break;

            // 엘포인트
        case 1:
            switch (tab2) {
                case 0:		// 엘포인트
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/l-point.aspx';
                    break;
            }
            break;

            // 틴틴클럽
        case 2:
            switch (tab2) {
                case 0:		// 가입방법
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/tintin-club-join-method.aspx';
                    break;
                case 1:		// 가입혜택
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/tintin-club-join-benefit.aspx';
                    break;
                case 2:		// 전용이벤트
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/tintin-club-event-list.aspx';
                    break;
            }
            break;

            // 시네마포인트
        case 3:
            switch (tab2) {
                case 0:		// 시네마포인트
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/cinema-point.aspx';
                    break;
            }
            break;

        // 브라보클럽 161121
        case 4:
            switch (tab2) {
                case 0:		// 가입방법
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/bravo-club-join-method.aspx';
                    break;
                case 1:		// 가입혜택
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/bravo-club-join-benefit.aspx';
                    break;
                case 2:		// 전용이벤트
                    url = CinemaServerDomain + '/LCHS/Contents/Membership/bravo-club-event-list.aspx';
                    break;
            }
            break;

    }
    type = (type == undefined) ? '1' : type;
    goUrl(url, type);

}

goToCompanyMenu = function (menuID) {
    var menu = {
        "CompanyMenu": [
            { "MenuCode": "01", "MenuName": "회사소개", "LinkUrl": "/LCCS/Contents/Company-Introduction/company-summary.aspx" },
            { "MenuCode": "0101", "MenuName": "회사개요", "LinkUrl": "/LCCS/Contents/Company-Introduction/company-summary.aspx" },
            { "MenuCode": "0103", "MenuName": "인사말", "LinkUrl": "/LCCS/Contents/Company-Introduction/greeting-words.aspx" },
            { "MenuCode": "0104", "MenuName": "연혁", "LinkUrl": "/LCCS/Contents/Company-Introduction/company-history.aspx" },
            { "MenuCode": "0105", "MenuName": "수상실적", "LinkUrl": "/LCCS/Contents/Company-Introduction/award-achievement.aspx" },
            { "MenuCode": "0106", "MenuName": "찾아오시는길", "LinkUrl": "/LCCS/Contents/Company-Introduction/comeToRoad.aspx" },
            { "MenuCode": "02", "MenuName": "사업분야", "LinkUrl": "/LCCS/Contents/business/lottecinemaintroduce.aspx" },
            { "MenuCode": "0201", "MenuName": "롯데시네마", "LinkUrl": "/LCCS/Contents/business/lottecinemaintroduce.aspx" },
            { "MenuCode": "0202", "MenuName": "롯데엔터테인먼트", "LinkUrl": "/LCCS/Contents/business/lotteentertainment.aspx" },
            { "MenuCode": "03", "MenuName": "사회공헌", "LinkUrl": "/LCCS/Contents/social/cleancinema.aspx" },
            { "MenuCode": "0302", "MenuName": "클린 시네마", "LinkUrl": "/LCCS/Contents/social/cleancinema.aspx" },
            { "MenuCode": "0303", "MenuName": "세이프 시네마", "LinkUrl": "/LCCS/Contents/social/safecinema.aspx" },
            { "MenuCode": "0304", "MenuName": "나눔 시네마", "LinkUrl": "/LCCS/Contents/social/nanumcinema.aspx" },
            { "MenuCode": "0301", "MenuName": "패밀리 시네마", "LinkUrl": "/LCCS/Contents/social/familycinema.aspx" },
            { "MenuCode": "04", "MenuName": "홍보센터", "LinkUrl": "/LCCS/Contents/promote/pressdatalist.aspx" },
            { "MenuCode": "05", "MenuName": "제휴/광고문의", "LinkUrl": "/LCCS/Contents/ad/advertinquiry.aspx" },
            { "MenuCode": "06", "MenuName": "인재채용", "LinkUrl": "/LCCS/Contents/employ/individuals.aspx" },
            { "MenuCode": "0601", "MenuName": "채용안내", "LinkUrl": "/LCCS/Contents/employ/individuals.aspx" },
            { "MenuCode": "0602", "MenuName": "채용공고", "LinkUrl": "/LCCS/Contents/employ/regularjobrecruitlist.aspx" },
            { "MenuCode": "0603", "MenuName": "합격자발표", "LinkUrl": "/LCCS/Contents/employ/recruitresultlist.aspx" },
            { "MenuCode": "07", "MenuName": "윤리경영", "LinkUrl": "/LCCS/Contents/ethical/ethicsintroduce.aspx" },
            { "MenuCode": "0701", "MenuName": "윤리사무국 소개", "LinkUrl": "/LCCS/Contents/ethical/ethicsintroduce.aspx" },
            { "MenuCode": "0702", "MenuName": "롯데 윤리경영", "LinkUrl": "/LCCS/Contents/ethical/lotteethicscharter.aspx" },
            { "MenuCode": "0703", "MenuName": "윤리경영 위반사례 신고", "LinkUrl": "/LCCS/Contents/ethical/ethicsregist.aspx" }
        ]
    };

    var url;
    var menus = menu.CompanyMenu
    for (var key in menus) {
        if (menus[key].MenuCode == menuID) {
            url = menus[key].LinkUrl;
            break;
        }
    }
    if (url != undefined) {
        url = CompanyServerDomain + url;
        window.open(url, "_blank");
    }
}
//로그인 여부 체크
//params>
//return> true: 로그인 상태, false: 로그아웃 상태
checkLogin = function () {
    var result;
    if (memberInfo == "") { result = false; } else { result = true; }
    return result;
}

//로그인 여부(로그인 구분 체크) 
//params>
//return> result: 1:정회원, 3:비회원, 공백:로그인 정보 없음
checkLoginGubun = function () {
    var result = "";
    if (memberInfo == undefined || memberInfo == "") {
        result = "9";// 로그인 아님
        //***********************************************************************************************************
        //2016. 01. 10. by johnharu
        // 회원 여부를 판단하는 필드로 MemberGubun 대신 LotteCinemaMemberGubun 으로 수정
        // LotteCinemaMemberGubun 값의 유형
        // 1 : 정회원
        // 2 : 간편회원(준회원)
        // 3 : 비회원
        //***********************************************************************************************************
    } else if (memberInfo.LotteCinemaMemberGubun == undefined || memberInfo.LotteCinemaMemberGubun == "") {
        result = "";
    } else {
        result = memberInfo.LotteCinemaMemberGubun;//1:정회원,2 : 간편회원(준회원),3:비회원
    }
    return result;
}

//휴대폰 번호 Array 형식으로 변환
getMemberInfoHandPhoneArray = function (phoneNum) {
    var hpArray = [];

    if (phoneNum == undefined || phoneNum == '')
        return hpArray;

    var hpLen = phoneNum.length;
    var hp1 = '';
    var hp2 = '';
    var hp3 = '';

    if (hpLen == 13) {// 13자리 번호 일때 : 010-2222-3333
        hp1 = phoneNum.substring(0, 3);
        hp2 = phoneNum.substring(4, 8);
        hp3 = phoneNum.substring(9);
    } else if (hpLen == 12) {// 12자리 번호 일때 : 010-222-3333
        hp1 = phoneNum.substring(0, 3);
        hp2 = phoneNum.substring(4, 7);
        hp3 = phoneNum.substring(8);
    } else if (hpLen == 11) {// 11자리 번호 일때 : 01022223333
        hp1 = phoneNum.substring(0, 3);
        hp2 = phoneNum.substring(3, 7);
        hp3 = phoneNum.substring(7);
    } else if (hpLen == 10) {// 10자리 번호 일때 : 0102223333
        hp1 = phoneNum.substring(0, 3);
        hp2 = phoneNum.substring(3, 6);
        hp3 = phoneNum.substring(6);
    } else {
        hp1 = phoneNum.substring(0, 3);
        hp2 = phoneNum.substring(3, 7);
        hp3 = phoneNum.substring(7);
    }

    hpArray.push(hp1);
    hpArray.push(hp2);
    hpArray.push(hp3);

    return hpArray;
}

//로그인 회원의 리뷰 삭제 validation 및 삭제 요청
//params>
//		reviewID: 리뷰 ID
//return>
removeReview = function (reviewID) {
    if (!checkLogin) return false;

    var deleteOK = confirm("리뷰를 삭제 하시겠습니까?\n삭제 후에는 복구가 불가능합니다.");
    //var modal1 = new $.fn.modalPopGeneration({
    //	type: 'message',
    //	code: "COM1029",
    //	btns: true,
    //	btnParam1: true,
    //	btnParam2: true,
    //	elem: $(this)
    //});

    if (deleteOK) {
        //alert("고객님의 리뷰 삭제가 완료되었습니다.");					//Hint------------------> 삭제 요청 처리 개발 필요.
        var modal1 = new $.fn.modalPopGeneration({
            type: 'message',
            code: "COM1030",
            btns: true,
            btnParam1: false,
            btnParam2: true,
            elem: $(this)
        });
        return true;
    }
}

/// Footer 각 링크

// 개인정보취급방침 버튼
$("#liIndividualPolicy").click(function () {
    var url;
    url = CinemaServerDomain + '/LCHS/Contents/Etc/individual-infomation-handling-policy.aspx';
    location.href = url;
});

// 이메일무단수집거부
$("#liEmailRefusal").click(function () {
    var url;
    url = CinemaServerDomain + '/LCHS/Contents/Etc/email-collection-refusal.aspx';
    location.href = url;
});


// 회원약관
$("#liMemberClause").click(function () {
    var url;
    url = CinemaServerDomain + '/LCHS/Contents/Etc/member-clause.aspx';
    location.href = url;
});

// 영상정보처리기기 운영 관리방침
$("#liElectronic").click(function () {
    var url;
    url = CinemaServerDomain + '/LCHS/Contents/Etc/electronic-management-policy.aspx';
    location.href = url;
});

// 프로그램 배정기준
$("#liAssign").click(function () {
    var url;
    url = CinemaServerDomain + '/LCHS/Contents/Etc/assign-standard.aspx';
    location.href = url;
});

// 지정 메시지 코드의 confirm modal을 표시한다.
// params>
//		targetString: 창 닫은 후 포커스 대상을 나타네는 문자열
//		messageCode: 표시할 메시지 코드
//		callBackFucntion: 확인 버튼 클릭시 수행할 함수
// return>
showConfirmModal = function (targetString, messageCode, callBackFucntion) {
    var modalConfirm = new $.fn.modalPopGeneration({
        type: 'confirm',
        code: messageCode,
        btns: true,
        btnParam1: true,
        btnParam2: true,
        elem: $(targetString),
        execution: callBackFucntion
    });
}

//로그인 되지 않음 메시지를 보여주고, 확인 버튼 클릭시 메인화면으로 이동
//params>
//return>
showLoginError = function () {
    var modalConfirm = new $.fn.modalPopGeneration({
        type: 'confirm',
        code: 'COM0503',
        btns: true,
        btnParam1: false,
        btnParam2: true,
        elem: $(this),
        execution: goToMain
    });
}

//로그인 화면으로 이동 한다.
//params>
//return>
goToLogin = function (urlReferrer) {
    var params = "";
    urlReferrer = ToString(urlReferrer);
    if (urlReferrer != "" && urlReferrer != undefined) {
        params = "?hidUrlReferrer=" + urlReferrer;
    }
    //$(location).attr("href", "/LCHS/Contents/Member/Login.aspx" + params);
    url = CinemaServerDomain + "/LCHS/Contents/Member/login.aspx" + params;
    goUrl(url, '1');
}

//메인 화면으로 이동 한다.
//params>
//return>
goToMain = function () {
    $(location).attr("href", "/LCHS/index.aspx");
}

//팝업창을 띠운다
//sUrl - 띠울 URL
//sFrame - 띠울이름
//sFeature - 창 속성
openDialog = function (sUrl, sFrame, sFeature) {
    var op = window.open(sUrl, sFrame, sFeature);
    return op;
}

var ctrlDown = false;
//숫자만 입력 Input Key Event
//params>
//return>
//$("#userName").attr("onkeydown", "onlyNumberInputEvent(event);");
onlyNumberInputEvent = function (event) {
    try {
        var ctrlKey = 17, vKey = 86, cKey = 67;
        var key = event.which || event.keyCode;
        // backspace:8
        // tab:9
        // delete:46
        if (key == 8 || key == 9 || key == 46) {
            // 키 통과
        } else {
            if (ctrlDown && (key == 86 || key == 67)) {

            }
            else if (key >= 48 && key <= 57) {
                // 숫자 확인
            }
            else if (key >= 96 && key <= 105) {
                // 숫자 확인
            } else {
                //이벤트 해제
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            }
        }
    } catch (e) {
    }
}

$(function () {
    $.fn.ClientInfo = function () {
        this.channelType = "HO";
        this.browserAgent = "";
        this.browserVersion = "";
        this.Init();
    };
    $.fn.ClientInfo.prototype = {
        Init: function () {
            this.browserAgent = this.BrowserAgent();
            this.browserVersion = navigator.userAgent;
        },
        BrowserAgent: function () {
            var _ua = navigator.userAgent;
            var result = "";

            //IE 11,10,9,8
            var trident = _ua.match(/Trident\/(\d.\d)/i);
            if (trident != null) {
                if (trident[1] == "7.0") return result = "IE" + 11;
                if (trident[1] == "6.0") return result = "IE" + 10;
                if (trident[1] == "5.0") return result = "IE" + 9;
                if (trident[1] == "4.0") return result = "IE" + 8;
            }

            //IE 7...
            if (navigator.appName == 'Microsoft Internet Explorer') return result = "IE" + 7;

            /*
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if(re.exec(_ua) != null) result = parseFloat(RegExp.$1);
            if( result == 7 ) return result = "IE" + 7; 
            */

            //other
            var agt = _ua.toLowerCase();
            if (agt.indexOf("chrome") != -1) return result = 'Chrome';
            if (agt.indexOf("opera") != -1) return result = 'Opera';
            if (agt.indexOf("staroffice") != -1) return result = 'Star Office';
            if (agt.indexOf("webtv") != -1) return result = 'WebTV';
            if (agt.indexOf("beonex") != -1) return result = 'Beonex';
            if (agt.indexOf("chimera") != -1) return result = 'Chimera';
            if (agt.indexOf("netpositive") != -1) return result = 'NetPositive';
            if (agt.indexOf("phoenix") != -1) return result = 'Phoenix';
            if (agt.indexOf("firefox") != -1) return result = 'Firefox';
            if (agt.indexOf("safari") != -1) return result = 'Safari';
            if (agt.indexOf("skipstone") != -1) return result = 'SkipStone';
            if (agt.indexOf("netscape") != -1) return result = 'Netscape';
            if (agt.indexOf("mozilla/5.0") != -1) return result = 'Mozilla';

            return result;
        },
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        isiPad: function () {
            return navigator.userAgent.match(/iPad/i);
        },
        isiPhone: function () {
            return navigator.userAgent.match(/iPhone|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        },
        Chrome: function () {
            return navigator.userAgent.match(/Chrome/i);
        },
    };
});


/****************************************
* 시네몰 상품 담기 그룹코드 생성
* return
* productUID : 상품담기 그룹코드(장바구니 그룹코드)
*/
getBucketProductUID = function () {
    // $.cookie("bucketID","")
    var bucketID = $.cookie("bucketID");
    var rtnVal = ""
    //alert("현재 쿠기==>>" + bucketID);

    if (bucketID == "" || bucketID == null) {
        var obj = {
            MethodName: "GetKey",
            channelType: "HO",
            osType: BrowserAgent(),
            osVersion: navigator.userAgent
        };
        rtnVal = JsonReturnDataSync(CinemaServiceDomain + '/LCWS/Common/GuidKeyGenerator.aspx', obj);
        bucketID = rtnVal.responseText
        //$.cookie("bucketID", bucketID)
        $.cookie("bucketID", bucketID, { path: '/' });
        //alert("생성된 값 - bucketID==>>" + bucketID);
    }

    return bucketID
}

/****************************************
* 시네몰 담은 상품 삭제
*****************************************/
delBucketProduct = function () {
    var bucketID = getBucketProductUID()
    var rtnVal = ""
    //alert("지우기 전 - cookie==>>" + bucketID);

    if (bucketID != undefined && bucketID != null && bucketID != '') {
        var obj = {
            MethodName: "DeleteCinemaMallBucketItem"
            , channelType: "HO"
            , osType: BrowserAgent()
            , osVersion: navigator.userAgent
            //, multiLanguageID: Language
            // 20160219 김태완 - 스위트샵,기프트샵 Language 고정
            , multiLanguageID: "KR"
			, bucketID: bucketID
        };
        rtnVal = JsonReturnDataSync(CinemaServiceDomain + "/LCWS/CinemaMall/CinemaMallData.aspx", obj)
        //JsonCall(CinemaServiceDomain + "/CinemaMall/CinemaMallData.aspx", obj, returnJsonDataNone)
        resetBucketCookie()
        //alert("지우기 완료==>>" + rtnVal);
    }

}

resetBucketCookie = function () {
    //$.cookie("bucketID", "")
    $.cookie("bucketID", "", { path: '/' });
}

/****************************************
* 시네몰 담은 상품 삭제 - 로그아웃
*****************************************/
delBucketProductLogOut = function () {
    var bucketID = $.cookie("bucketID")
    //alert("delete bucketID==>>" + bucketID)
    var rtnVal = ""
    if (bucketID != undefined && bucketID != null && bucketID != '') {
        var obj = {
            MethodName: "DeleteCinemaMallBucketItem"
			, channelType: "HO"
			, osType: BrowserAgent()
			, osVersion: navigator.userAgent
            //, multiLanguageID: Language
            // 20160219 김태완 - 스위트샵,기프트샵 Language 고정
        	, multiLanguageID: "KR"
			, bucketID: bucketID
        };
        rtnVal = JsonReturnDataSync(CinemaServiceDomain + "/LCWS/CinemaMall/CinemaMallData.aspx", obj)
        //JsonCall(CinemaServiceDomain + "/CinemaMall/CinemaMallData.aspx", obj, returnJsonDataNone)
        resetBucketCookie()
    }

}

//시네몰 담은 상품 삭제 결과 function(common.js 에서 function를 호출하기때문에 의미없는 function 생성)
//returnJsonDataNone = function (data) {

//}

/****************************************
* 시네몰 담은 상품 등록 Params
*****************************************/
getSetBucketProductParamsObj = function (bucketJSONData) {
    var bucketID = getBucketProductUID()
    var obj = {
        MethodName: "SetCinemaMallBucketItem"
        , channelType: "HO"
        , osType: BrowserAgent()
        , osVersion: navigator.userAgent
        //, multiLanguageID: Language
        // 20160219 김태완 - 스위트샵,기프트샵 Language 고정
       	, multiLanguageID: "KR"
        , bucketJSONData: JSON.stringify(bucketJSONData)
        , bucketID: bucketID
    };

    return obj
}

/****************************************
* 시네몰 담은 상품 가져오기 Param Object
******************************************/
getBucketProductListParamObj = function () {
    var bucketID = getBucketProductUID()
    var obj = {
        MethodName: "GetCinemaMallBucketItem"
        , channelType: "HO"
        , osType: BrowserAgent()
        , osVersion: navigator.userAgent
        //, multiLanguageID: Language
        // 20160219 김태완 - 스위트샵,기프트샵 Language 고정
       	, multiLanguageID: "KR"
        , bucketID: bucketID
    };
    return obj

}

//===================================
/**
 * @Content 다운로드
 * @param
 *		fileFullPath : 파일 패스
 *		fileName : 파일명
 * @return
 **/
goFileDownload = function (fileFullPath, fileName) {
    try {
        var param = "?fileFullPath=" + fileFullPath + "&fileName=" + fileName;
        var url = CinemaServerDomain + "/LCHS/Contents/Common/download.aspx" + param;
        goUrl(url, '1');
    } catch (e) {
        CheckException(e, "goFileDownload", NOW_MENU_TYPE);					//오류 발생 처리
    }
}

getPaymentCinemaID = function () {
    var cinemaId = '';

    var cookie = $.parseJSON($.cookie('ticketingState'));
    try {
        cinemaId = cookie.ticketingState.ticketing.playSequenceCode[0].cinemaCode;
    } catch (e) {
        try {
            cinemaId = cookie.ticketingState.seatSelect.cinemaId;
        } catch (e) {
        }
    }

    return cinemaId;
};

// 20160920 - File log
setFileLog = function (cinemaID, cinemaName, step, stepETC, state) {
    try {
        if (memberInfo == undefined || memberInfo == "") {
        }
        else {
            var stepName = "회차선택";
            switch (step) {
                case 1:
                    stepName = "회차선택";
                    break;
                case 2:
                    stepName = "좌석선택";
                    break;
                case 3:
                    stepName = "결제";
                    break;
                case 4:
                    stepName = "결제완료";
                    break;
            }

            if (stepETC != undefined && stepETC != "" && stepETC.length > 0) {
                stepName += "(" + stepETC + ")";
            }

            var stateName = "";
            switch (state) {
                case 1:
                    stateName = "선택";
                    break;
                case 2:
                    stateName = "해제";
                    break;
            }

            var logMsg = "[" + stepName + "] " + cinemaName + "(" + cinemaID + ") " + stateName;

            var obj = { MethodName: "FileLoggerTicketing", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: "KR", memberNoOn: memberInfo.MemberNoOn, memberCode: memberInfo.MemberCode, logMessage: logMsg };
            JsonCall(CinemaServiceDomain + '/LCWS/Log/Log4NetFileLogger.aspx', obj, setFileLogResult);
        }
    } catch (e) { }
}

setFileLogResult = function (obj) { };