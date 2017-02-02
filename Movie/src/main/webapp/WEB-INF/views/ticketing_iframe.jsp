<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.sql.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.util.Date" %>

<%-- <jsp:useBean id="now" class="java.util.Date"/>
 --%>
<head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" />
<html lang="ko">

    
    <title>상영시간표 | 예매 | 롯데시네마</title>

<!-- <link rel="stylesheet" type="text/css" href="/LCHS/CSS/reset.css?t=20161207001" /><link rel="stylesheet" type="text/css" href="/LCHS/CSS/common.css?t=20161208" /><link rel="shortcut icon" type="image/x-icon" href="/LCHS/Image/Icon/favicon.ico" /><title>
 -->
 <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/event.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/reset.css" type="text/css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/img" type="text/css" />
</title></head>
<body>
<form method="post" name="frameChange"></form>
    <form method="post" action="movie-schedule" name="form1">
      <input type="text" name="siname" id="siname" style="display:none" value="">
</div>

<script type="text/javascript">
//<![CDATA[
var theForm = document.forms['form1'];
if (!theForm) {
    theForm = document.form1;
}
function __doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
}
//]]>
</script>



<div class="aspNetHidden">

   <input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="34BBBF54" />
   <input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="KdKojeeZ+BT7XLTpTszPZNO5IUFo3wG5lissa0WifNZjVfLcYSnTdvILHQysSVy/yJUWOaggFRvxjRzClEXCaKPsL1sWDGJX6ZzJvcYAToc5qVAQFYCSIUuFlqiKvzKz" />
</div>


                    <div class="time_aType">
                        <div class="time_noData">
                            <span class="noData Lang-LBL4009" style="display: none;">상영시간이 조회되지 않았습니다. 영화관을 선택해 주세요.</span>
                        </div>   
                        
                         <h4 class="time_tit">${theater_name}</h4>
                        
                         <div style="display: block;" id=siNamesub>
                            <c:forEach var="movieList" items="${movieList}"> 
                           <dl class="time_line movie"><dt><span class="grade_${movieList.MV_GRADE}">${movieList.MV_GRADE}</span>${movieList.MV_NAME}</dt>  
                         <c:set var="name" value="${movieList.MV_NAME}" />
            
                          <dd>  <u1 class="time_mLisst"> 
                                 <li class="screen">
                                    <ul calss=cineD1">
                                    <li></li>
                                    </ul>
                                    <ul class="theater_time list" screendiv="300">
                                    <c:forEach var="movieListTime" items="${movieListTime}">    
                         <c:set var="name1" value="${movieListTime.MV_NAME}"/>
              
                           <c:choose>
                         <c:when test="${name == name1}">
                                       <li><a href="javascript:void(0);" class="time_active">
                                          <span class="cineD2">  
                                               <em>${movieListTime.ST_NAME}</em>   </span>
                                          <c:choose>
                                               <c:when test="${movieListTime.SS_STARTTIME le '10:00' }">
                                               	<!-- <span class="cineD2">       <em>2관</em>   </span> -->
                                                   <span class="clock"><em class="seat iri">조조</em>${movieListTime.SS_STARTTIME}<span> ~ ${movieListTime.SS_ENDTIME}</span></span>
                                                   <span class="ppNum"><em class="color_brown" title="좌석 확인"> ${movieListTime.STYPE_NUM-10}</em>석 / ${movieListTime.STYPE_NUM}석</span></a></li>
                                               </c:when>
                                               <c:when test="${movieListTime.SS_STARTTIME ge '23:00' }">
                                               <!-- <span class="cineD2">       <em>2관</em>   </span> -->
                                                   <span class="clock"><em class="seat ini">심야</em>${movieListTime.SS_STARTTIME}<span> ~ ${movieListTime.SS_ENDTIME}</span></span>
                                                   <span class="ppNum"><em class="color_brown" title="좌석 확인"> ${movieListTime.STYPE_NUM-10}</em>석 / ${movieListTime.STYPE_NUM}석</span></a></li>
                                               </c:when>
                                               <c:otherwise>
                                               <!-- <span class="cineD2">       <em>2관</em>   </span> -->
                                                <span class="clock">${movieListTime.SS_STARTTIME}<span> ~ ${movieListTime.SS_ENDTIME}</span></span>
                                                   <span class="ppNum"><em class="color_brown" title="좌석 확인"> ${movieListTime.STYPE_NUM-10}</em>석 / ${movieListTime.STYPE_NUM}석</span></a></li>
                                               </c:otherwise>
                                               </c:choose>
                                            </c:when>
                                            
                         </c:choose>
                         
                           </c:forEach>
                                    </ul>
                                    </li>
                                    </u1>
                                    </dd> 
                         
                         
                           </dl>
                           </c:forEach>
                                               
                                         
                    </div>
                </div>

               <!--  <div class="time_inner listViewMovie">
                    <h3 class="sub_tit02"><em class="Lang-LBL4007">상영시간</em> <span class="sub_etc Lang-LBL4008">예고편 상영 등으로 시작이 10여분 정도 차이 날 수 있습니다. </span></h3>
                    <ul class="tab_st09" style="display: block;">
                    </ul>

                    2016.05.10 웹접근성
                    <h4 class="blind" id="title_h4_2"></h4>

                    <div class="time_line">
                        <div class="time_noData">
                            <span class="noData Lang-LBL4010" style="display: none;">상영시간이 조회되지 않았습니다. 영화를 선택해 주세요.</span>
                        </div>
                    </div>
                </div> -->
            </div>
      
                             
                    

            <!-- // time_wrap -->

 


            <!-- Content -->

            <!-- footer -->
            
                

                <!--// notice_wrap -->
               
                <!-- 20151008추가 -->
                
                <!-- //20151008추가 -->

            
            <!-- //footer -->


        <div class="layerMain" style="display: none;">
            
        </div>

        <div class="layerMain_ver2" style="display: none;">
            
        </div>


        <!--// wrap -->
        
        
    </form>
    <script src="/LCHS/Script/Common/jquery-1.11.3.min.js"></script>
    <script src="/LCHS/Script/Common/jquery-ui.min.js"></script>
    <script src="/LCHS/Script/Common/jquery.jplayer.min.js"></script>
    <script src="/LCHS/Script/Common/jquery.cookie.js"></script>
    <script src="/LCHS/Script/Library/json2.js"></script>
    <script src="/LCHS/Script/Common/StringBuilder.js"></script>
    <script src="/LCHS/Script/Common/Util.js"></script>

    <script type="text/javascript">
        // 캐시 설정 변수
        CACHEDATE = '20170113162753';
    </script>

    <script src="/LCHS/Script/Common/ticketReservationCookie.js"></script>
    <script src="/LCHS/Script/Common/Common.js?v=20170110"></script>
    <script src="/LCHS/Script/Common/design-1.0.min.js"></script>
    <script src="/LCHS/Script/Common/Model.js?v=20170110"></script>

    <!-- Wise log -->
    <script src="/LCHS/Script/Common/wlo.js?v=201605231600" type="text/javascript"></script>
    
    <!-- 20161006 Facebook Pixel 적용 -->
    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            }; if (!f._fbq) f._fbq = n;
            n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s)
        }(window,
        document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1035588193221412'); // Insert your pixel ID here.
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=1035588193221412&ev=PageView&noscript=1"
    /></noscript>
    <!-- DO NOT MODIFY -->
    <!-- End Facebook Pixel Code -->


    <script type="text/javascript">
        var memberInfo;
        var CinemaServerDomain = "http://www.lottecinema.co.kr";
        var EventServerDomain = "http://event.lottecinema.co.kr";
        var CinemaServiceDomain = "";
        var CompanyServerDomain = "";
        var Language = "KR";
        var IsADQuickShow = "False";
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // 2016. 02. 12. by johnharu
        // Web.config 파일의 <add key="ISUSELPOINTLOGIN" value="1"/> 값을 읽어옴
        // 1 : L.POINT 로그인 사용
        // 2 : L.POINT 로그인 사용하지 않음
        // LCHS의 Web.config를 설정한 후, LHS의 동일한 항목을 1로 설정해 줘야 L.POINT 로그인 가능
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var IsUseLPOINTLogin = "1";

        var MoviePosterImageURL = "http://caching.lottecinema.co.kr/LHS/Media/images"
        var _curFullWebUrl = window.location.toString().toLowerCase()  //현제 페이지 웹경로(도메인포함)
        var _referrerUrl = document.referrer.toString().toLowerCase()  //유입경로
        // Hint ------> 디버깅용 변수, 실서버 적용시 주석 처리
        //_debug = true;
        //_notRedirection = true;

        $(document).ready(function () {
            // 로고 적용
            //getLogo();

            // IE 인 경우 window.location.origin 값이 없어 오류가 발생됨. 아래 코드 추가 필요
            if (!window.location.origin) {
                window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '');
            }

            if ($.cookie("MemberInfo") != undefined && $.cookie("MemberInfo") != "") {

                memberInfo = JSON.parse(decodeURI($.cookie("MemberInfo")));
                $('.loginInfo').find('.lF_login').html("<span>" + memberInfo.MemberName + "님 반갑습니다.</span>");
                //$('.loginInfo').find('.lF_login').html("<span>" + memberInfo.MemberName + "</span> <em>" + memberInfo.MemberClassName + "</em>");

                // 임시 로그인 팝업 숨기기
                $("#liLoginPopup").hide();
                $(".loginInfo").show();
            }
            else {
                memberInfo = "";
                $(".loginInfo").hide();
            }

            // 좌석 부킹 해제 공통
            if (_curFullWebUrl.indexOf("/contents/ticketing/order-settlement.aspx") == -1
                && _curFullWebUrl.indexOf("/contents/ticketing/order-settlement-point.aspx") == -1
                && _curFullWebUrl.indexOf("/contents/ticketing/order-result.aspx") == -1) {
                chcekReleaseBooking();
            }

            // 예매 외 메뉴를 위해서 이곳에서 처리
            //$("#topMyCinema").text($.fn.messageChanger("LBL9001", "< %= PageLanguage%>").Title);

            if (_curFullWebUrl.indexOf("/contents/ticketing/") == -1 && _curFullWebUrl.indexOf("/contents/cinema-mall/") == -1) {
                if ($.fn.cookieReset != undefined) {
                    $.fn.cookieReset() //예매 쿠키 리셋
                }
                $.cookie('eventID', "", { path: '/', domain: '.lottecinema.co.kr' });   //이벤트 코드 리셋

            } else {
                //접속 페이지가 예매와 시네마몰 일경우
                if ((_curFullWebUrl.indexOf("/contents/cinema-mall/") != -1)) {
                    if ($.fn.cookieReset != undefined) {
                        $.fn.cookieReset()
                    }
                    if ((_referrerUrl.indexOf("/contents/event/") == -1) && (_referrerUrl.indexOf("/contents/cinema-mall/") == -1)) {
                        $.cookie('eventID', "", { path: '/', domain: '.lottecinema.co.kr' });   //이벤트 코드 리셋
                    }
                }
            }

            //// 언어 설정
            $("#LanguageSetting").on("click", function () {
                if (Language == "KR") {
                    $.cookie("Language", "EN", { path: '/' });
                    $("#LanguageSetting").removeClass("btn_korea");
                    $("#LanguageSetting").addClass("btn_english");
                    $("#LanguageSetting").text("ENGLISH");
                }
                else {
                    $.cookie("Language", "KR", { path: '/' });
                    $("#LanguageSetting").removeClass("btn_english");
                    $("#LanguageSetting").addClass("btn_korea");
                    $("#LanguageSetting").text("KOREA");
                }
                window.location.href = "/LCHS/Contents/ticketing/ticketing.aspx";
            })
            // 언어 스타일 적용
            if (Language == "KR") {
                $("#LanguageSetting").removeClass("btn_korea");
                $("#LanguageSetting").addClass("btn_english");
                $("#LanguageSetting").text("ENGLISH");
            }
            else {
                $("#LanguageSetting").removeClass("btn_english");
                $("#LanguageSetting").addClass("btn_korea");
                $("#LanguageSetting").text("KOREA");
            }

            // 회원 정보
            $('.loginInfo a.lF_login').click(function () {
                var target = $(this).parent("div");
                if (target.hasClass("on")) {
                    target.removeClass("on");
                } else {
                    getLoginMemberInfoPannel();
                    //target.addClass("on");
                }
            });

            // 좌측 플로팅 광고 닫기 버튼
            $('.ad_pic .btn_appicClose').on('click', function (e) {
                $('.ad_pic').hide();
            });

            //사이트별 쿠키 리렛
            var pageFileName = getFilename(_curFullWebUrl)
            if (_curFullWebUrl.indexOf("/contents/cinema-mall/") == -1) {
                delBucketProduct() //시네몰(예매,시네마몰) 상품 삭제(장바구니)
            }
                // 20160214 김태완 - 추가
            else if (memberInfo == "" || memberInfo == undefined) { //로그인 이전 회원은 장바구니 비운다.
                delBucketProduct() //시네몰(예매,시네마몰) 상품 삭제(장바구니)
            }

            // 분실물 센터 더보기
            $("#aNoticeMore").click(function () {
                customerCenterMenu(1, '1');
            });

            // Wise log
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            _n_sid = "lottecinema";
            // 분석대상 사이트 도메인명이나 CP사명을 입력하세요.
            // mobile web에 삽입할 경우 m.lottecinema 등으로 sid 값 구분
            //_n_sid 값 별로 로그파일이 별도로 생성이 됩니다.
            _n_uid_cookie = "USER_ID";
            //사이트 내에서 사용하시는 회원ID 쿠키명을 입력하시면 됩니다. 
            //없다면 아래 2.회원쿠키 항목을 참조하여 생성한 값을 넣어주시면 됩니다.
            //회원제 사이트가 아니라면 삭제하셔도 됩니다.
            n_logging();
            //////////////////////////////////////////////////////////////////////////////////////////////////////


            // 20161006 - Facebook Pixel
            try {
                setTimeout(function () {
                    fbq('track', 'ViewContent');
                }, 0);
            } catch (e) { }


            // 161101 - 할인가이드 팝업 주석
            if ($('.depth').find('[title="할인가이드"]') != undefined)$('.depth').find('[title="할인가이드"]').attr('href', 'javascript:ShowPopupDiscountView();');
            if ($('.depth').find('[title="Discount Guide"]') != undefined)$('.depth').find('[title="Discount Guide"]').attr('href', 'javascript:ShowPopupDiscountView();');

        });
        function ShowPopupDiscountView() {
            if (_curFullWebUrl.indexOf("discount-guide.aspx") > -1) {
                window.location.href = '/LCHS/Contents/ticketing/discount-guide.aspx';
            } else {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/view/ticketing/pop_DiscountGuide.html?v=20161013', btns: false, btnParam1: false, btnParam2: true, closed: '.pop_btn_close', elem: $(this) });
            }
            
        }
        /************************************************************************************************* 
        * 좌석 부킹 확인 후 해제
        ************************************************************************************************/
        chcekReleaseBooking = function () {
            if ($.cookie("MemberInfo") == undefined || $.cookie("MemberInfo") == "")
                return;

            if ($.cookie('ticketingState') == undefined || $.cookie('ticketingState') == '')
                return;

            var cookieJson = $.parseJSON($.cookie('ticketingState'));

            if (cookieJson != undefined
                && cookieJson != null
                && cookieJson != 'undefined'
                && cookieJson != ''
                && cookieJson.ticketingState.seatSelect.transNo != ''
                && (cookieJson.ticketingState.BookingStatus != undefined && cookieJson.ticketingState.BookingStatus != '4')
                && (cookieJson.ticketingState.BookingStatus != undefined && cookieJson.ticketingState.BookingStatus != '5')) {

                try {
                    var params = {
                        MethodName: "ReleaseBooking",
                        channelType: "HO",
                        osType: BrowserAgent(),
                        osVersion: navigator.userAgent,
                        multiLanguageID: Language,
                        playDate: cookieJson.ticketingState.ticketing.playDate,
                        playSequence: cookieJson.ticketingState.ticketing.playSequenceCode[0].playSequence,
                        screenId: cookieJson.ticketingState.ticketing.playSequenceCode[0].screenCode,
                        transNo: cookieJson.ticketingState.seatSelect.transNo,
                        memberOnNo: memberInfo.MemberNoOn
                    };

                    GetData("ticket", params, $.proxy(function (obj) {
                        $.fn.cookieChanges('del', 'ticketingState.seatSelect.transNo', '');
                    }, this), "");
                } catch (e) {
                    //CheckException(e, "chcekReleaseBooking", NOW_MENU_TYPE);
                };
            }
        }

        // MY 영화관 설정하기 클릭 이벤트
        showSetMyCinema = function () {
            var popSet = new $.fn.modalPopGeneration({
                type: 'load', url: CinemaServerDomain + '/LCHS/View/favorite-cinema-setting.html', btns: false, btnParam1: false, btnParam2: true
            });
        }

        // 회원정보 조회
        getLoginMemberInfoPannel = function () {
            if (memberInfo.MemberNoOn == '0' || memberInfo.CustomerNo == undefined || memberInfo.CustomerNo == '')
                return;

            var obj = {
                MethodName: "GetMyCinemaMemberInfo", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageId: Language
                  , memberNoOn: memberInfo.MemberNoOn, customerNo: memberInfo.CustomerNo
            };

            GetData("mycinema", obj, appendLoginMemberInfoPannel, "", false);
        }
        // 회원정보 표시
        appendLoginMemberInfoPannel = function (obj) {
            try {
                var jsonData;
                var myCinemaMemberInfo;   // 회원 정보
                var myCouponInfo;      // 쿠폰 정보
                var htmlString;         // html

                var name;            // 회원 성명
                var gradeName;         // 회원등급

                var couponCount = 0;   // 쿠폰 개수

                jsonData = obj.responseJSON;

                // Data 유효성 검사
                if (jsonData == undefined) { throw new Error("None Data Error"); }
                if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
                if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

                //console.log(jsonData);
                myCinemaMemberInfo = jsonData.MyCinemaMemberInfo;

                // 회원정보가 없으면(비회원) 표시하지 않음.
                if (myCinemaMemberInfo == null || myCinemaMemberInfo == undefined) return false;

                name = myCinemaMemberInfo.MemberName;
                gradeName = myCinemaMemberInfo.MemberGradeName;

                myCouponInfo = jsonData.MyCouponInfo;

                couponCount = jsonData.MyCouponInfo.TotalCount == undefined ? parseInt(jsonData.MyCouponInfo.ExC) + parseInt(jsonData.MyCouponInfo.DcC) + parseInt(jsonData.MyCouponInfo.Vip) : jsonData.MyCouponInfo.TotalCount;
                
                $('.loginInfo').find('.lF_login').html("<span>" + name + "님 반갑습니다.</span>");

                var htmlString;
                var sbMemberPannel = new StringBuilder();

                // 등급
                // 20161101 - 연령별 등급 추가
                var tempGradeName = myCinemaMemberInfo.MemberGradeName;
                if (myCinemaMemberInfo.MemberNewGradeName != undefined && myCinemaMemberInfo.MemberNewGradeName.length > 0) {
                    tempGradeName = tempGradeName + " / " + myCinemaMemberInfo.MemberNewGradeName;
                }

                sbMemberPannel.AppendFormat('<p class="login_view"><em><span>{0}</span></em>', tempGradeName);
                // 20161101 - 주석
                //sbMemberPannel.Append(' <a href="/LCHS/Contents/Membership/vip-member-vip-benefit.aspx">등급별 혜택 <span>더보기</span></a>');
                sbMemberPannel.Append('</p>');
                sbMemberPannel.Append('<div class="lF_point">');
                sbMemberPannel.Append('<div class="lF_left">');
                sbMemberPannel.Append('<a href="javascript:getLpoint();">포인트 확인하기</a>');
                sbMemberPannel.Append('</div>');
                sbMemberPannel.Append('<ul class="IF_list">');
                sbMemberPannel.AppendFormat('<li><strong>사용 가능한 쿠폰</strong> <em><a href="javascript:void(0);" onclick="goMyCinemaTab(1, 0);">{0}</a></em></li>', couponCount);  // 1603302
                sbMemberPannel.Append('</ul>');
                sbMemberPannel.Append('</div>');
                sbMemberPannel.Append('<dl class="lF_myCinema">');
                sbMemberPannel.Append('<dt>MY 영화관<a href="javascript:void(0);" onclick="showSetMyCinema();" class="set" title="레이어 열림">설정</a></dt>');

                // 2016.04.25  MY 영화관관련 로직 수정
                ////////////////////////////////////////////////////////////////////////////////////
                if (myCinemaMemberInfo.FavoriteCinemaName1 != "") {  // 1603294
                    sbMemberPannel.AppendFormat('<dd><a href="javascript:void(0);" onclick="goLotteCinemaDetail(\'1\',\'' + myCinemaMemberInfo.CinemaAreaCd1 + '\',\'' + myCinemaMemberInfo.FavoriteCinemaID1 + '\');">{0}</a></dd>', myCinemaMemberInfo.FavoriteCinemaName1);
                } else {
                    sbMemberPannel.Append('<dd><a href="javascript:void(0);" onclick="showSetMyCinema();" class="set" title="레이어 열림">+</a></dd>');
                }

                if (myCinemaMemberInfo.FavoriteCinemaName2 != "") {
                    sbMemberPannel.AppendFormat('<dd><a href="javascript:void(0);" onclick="goLotteCinemaDetail(\'1\',\'' + myCinemaMemberInfo.CinemaAreaCd2 + '\',\'' + myCinemaMemberInfo.FavoriteCinemaID2 + '\');">{0}</a></dd>', myCinemaMemberInfo.FavoriteCinemaName2);
                } else {
                    sbMemberPannel.Append('<dd><a href="javascript:void(0);" onclick="showSetMyCinema();" class="set" title="레이어 열림">+</a></dd>');
                }

                if (myCinemaMemberInfo.FavoriteCinemaName3 != "") {
                    sbMemberPannel.AppendFormat('<dd><a href="javascript:void(0);" onclick="goLotteCinemaDetail(\'1\',\'' + myCinemaMemberInfo.CinemaAreaCd3 + '\',\'' + myCinemaMemberInfo.FavoriteCinemaID3 + '\');">{0}</a></dd>', myCinemaMemberInfo.FavoriteCinemaName3);
                } else {
                    sbMemberPannel.Append('<dd><a href="javascript:void(0);" onclick="showSetMyCinema();" class="set" title="레이어 열림">+</a></dd>');
                }
                ////////////////////////////////////////////////////////////////////////////////////

                sbMemberPannel.Append('</dl>');

                htmlString = sbMemberPannel.ToString();
                //logingIF_in
                $('div.loginInfo div.logingIF_in').html(htmlString);
                $('div.loginInfo').addClass("on");
            } catch (e) {
                CheckException(e, "appendLoginMemberInfoPannel: ");
            }
        }

        // L.Point 조회 요청
        getLpoint = function (caller) {
            try {
                var obj = {
                    MethodName: "GetMyCinemaMemberInfoByLPoint",
                    channelType: "MW",
                    osType: BrowserAgent(),
                    osVersion: navigator.userAgent,
                    multiLanguageId: Language,
                    memberNoOn: memberInfo.MemberNoOn,
                    customerNo: memberInfo.CustomerNo,
                };

                caller == undefined ? caller = 'TOP' : caller = 'MYCINEMA';  // 1603283
                if (caller === 'TOP') {
                    GetData("mycinema", obj, responseLpoint, "", false);
                } else {
                    GetData("mycinema", obj, responseLpointFromMYCINEMA, "", false);
                }

            } catch (e) {
                CheckException(e, "responseLpoint: ");
            }
        }

        // L.Point 요청 결과 처리 (마이시네마)
        responseLpointFromMYCINEMA = function (obj) {
            try {
                var jsonData;

                jsonData = obj.responseJSON;

                // Data 유효성 검사
                if (jsonData == undefined) { throw new Error("None Data Error"); }
                if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
                if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

                if (jsonData.IsOK != "true") {                        //Data에 오류가 있으면
                    //throw new Error(result.ResultMessage);               //Error를 발생하고, Data 요청 결과 massage 를 전달한다.
                    alert(jsonData.ResultMessage);
                }
                else {
                    if (jsonData.MyCinemaMemberInfo != undefined) {
                        $('#strAccountLPoint').html(ToMoney(jsonData.MyCinemaMemberInfo.LPOINT) + '<span class="icon_p">P</span>');
                    }
                }
            } catch (e) {
                CheckException(e, "responseLpoint: ");
            }
        }

        // L.Point 요청 결과 처리
        responseLpoint = function (obj) {
            try {
                var jsonData;

                jsonData = obj.responseJSON;

                // Data 유효성 검사
                if (jsonData == undefined) { throw new Error("None Data Error"); }
                if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
                if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

                var htmlString;
                var cinemaPoint = jsonData.MyCinemaMemberInfo.LPOINT;
                if (cinemaPoint == undefined) {
                    cinemaPoint = 0;
                } else {
                    cinemaPoint = ToMoney(cinemaPoint);
                }
                var sbMemberPannel = new StringBuilder();

                sbMemberPannel.Append('<strong class="lF_tit">나의 L.POINT</strong>');
                sbMemberPannel.AppendFormat('<span class="lF_sum">{0} <span>p</span></span>', cinemaPoint);

                htmlString = sbMemberPannel.ToString();

                $('div.lF_left').html(htmlString);
            } catch (e) {
                CheckException(e, "responseLpoint: ");
            }
        }

        // 시네마몰-상품 클릭시 영화관 선택 팝업 호출
        function goCinemaMall() {
            var popSet = new $.fn.modalPopGeneration({ type: 'load', url: CinemaServerDomain + '/LCHS/View/cinema-select.html', btns: false, btnParam1: false, btnParam2: true, confir: ".default" });
        }

        // 마이시네마 링크
        function goMyCinema() {
            var url = CinemaServerDomain + "/LCHS/Contents/My-Cinema/My-Cinema.aspx";
            location.href = url;
        }

        // 마이시네마 링크
        function goMyCinemaTab(tab1, tab2) {
            if (tab1 == undefined || tab1 == "") { tab1 = 0; }
            if (tab2 == undefined || tab2 == "") { tab2 = 0; }
            var tab = tab1.toString() + tab2.toString();

            if (location.href.indexOf("My-Cinema.aspx") < 0) {  // 1603284
                var url = CinemaServerDomain + "/LCHS/Contents/My-Cinema/My-Cinema.aspx#" + tab;
                location.href = url;
            } else {
                changeTab(tab1, tab2);
            }
        }

        // 고객선터 링크
        function goCustomerCenterMenu() {
            var url = CinemaServerDomain + "/LCHS/Contents/Customer-Service-Center/FAQ/faq-list.aspx";
            //var url = CinemaServerDomain + "/LCHS/View/My-Cinema/ticketing-order-list.html";
            location.href = url;
        }



        // 레이어 팝업 - 로그인
        openLoginPopup = function (target) {
            if (target == undefined) {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/View/Member/login-popup.html?v=20160727', btns: false, btnParam1: false, btnParam2: true });
                $(popSet.popWrap).attr('tabindex', '0').show().focus();
            } else {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/View/Member/login-popup.html?v=20160727', btns: false, btnParam1: false, btnParam2: true, elem: $(target) });
                $(popSet.popWrap).attr('tabindex', '0').show().focus();
            }
        }

        openLoginPopupWithParam = function (target, returnUrl, parameter) {
            if (target == undefined) {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/View/Member/login-popup.html?v=20160727', btns: false, btnParam1: false, btnParam2: true, ReturnUrl: returnUrl, Parameter: parameter });
            } else {
                var popSet = new $.fn.modalPopGeneration({ type: 'load', url: '/LCHS/View/Member/login-popup.html?v=20160727', btns: false, btnParam1: false, btnParam2: true, elem: $(target), ReturnUrl: returnUrl, Parameter: parameter });
            }
        }

        // 로그인 실패
        checkLoginFailedLayerPopup = function () {
            try {
                if ($("#hidLoginFailedLayerPopup").val() == "1") {
                    //alert("아이디 또는 비밀번호가 맞지 않습니다.");
                    var popSet = new $.fn.modalPopGeneration({ type: 'message', code: 'COM1011', lang: 'KR', btns: true, btnParam1: false, btnParam2: true });
                    return false;
                }
            } catch (e) {
                //alert(e.message);
                CheckException(e, "checkLoginFailedLayerPopup", "member");               //오류 발생 처리
            }
            return true;
        }

        // window의 모든 리소스를 취할때 실행
        $(window).load(function () {
            // 로그인 실패
            checkLoginFailedLayerPopup();

        });

        var winReport;
        function goReport() {
            if ($.cookie("EmployeeCode") == undefined || $.cookie("EmployeeCode") == "") {
                alert("접근 권한이 없습니다.");
            }
            else {
                winReport = window.open("/LCWSREPORT/register.aspx?pageID=", "winReport", "scrollbars=yes,toolbar=no,resizable=yes,width=1100,height=1000,location=no");
            }
        }

        function goList() {
            //if ($.cookie("EmployeeCode") == undefined || $.cookie("EmployeeCode") == "" || ($.cookie("EmployeeType") != "C" && $.cookie("EmployeeType") != "I" && $.cookie("EmployeeType") != "F")) {
            //    alert("접근 권한이 없습니다.");
            //}
            //else {
            winReport = window.open("/LCWSREPORT/list.aspx", "reportList", "scrollbars=yes,toolbar=no,resizable=yes,width=1100,height=900,location=no");
            //}
        }

        

        getFilename = function (fullName) {
            var val = fullName.toString()
            var tmp = val.split("/")

            var tmp2 = tmp[tmp.length - 1].split(".aspx")
            var fileName = tmp2[0] + ".aspx"
            return fileName;

        }

        // 로고 이미지 Data 요청
        //getLogo = function () {
        //    var obj = { MethodName: "GetMainLogoItem", channelType: "HO", osType: BrowserAgent(), osVersion: navigator.userAgent, multiLanguageID: Language };
        //    JsonCall(CinemaServiceDomain + "/LCWS/Common/MainData.aspx", obj, appendLogo)
        //}
        // 로고 이미지 표출
        //appendLogo = function (obj) {
        //    var imageUrl = "/LCHS/Image/logo_main.gif";
        //    try {
        //        var jsonData;
        //        var items;

        //        jsonData = obj.responseJSON;

        //        // Data 유효성 검사
        //        if (jsonData == undefined) { throw new Error("None Data Error"); }
        //        if (jsonData.IsOK == undefined) { throw new Error("JSon Struct Error"); }
        //        if (jsonData.IsOK != "true") { throw new Error("\n - JSON retrun message: \n    " + jsonData.ResultMessage); }

        //        if (jsonData.MainLogoItems.ItemCount > 0) {
        //            items = jsonData.MainLogoItems.Items;