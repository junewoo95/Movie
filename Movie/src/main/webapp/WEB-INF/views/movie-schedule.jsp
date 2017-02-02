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
</head>
<body>
<form method="post" name="frameChange"></form>
    <form method="post" action="movie-schedule" name="form1">
		<input type="text" name="siname" id="siname" style="display:none" value="">


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
<script type="text/javascript">
var today;
var th_name;
var selDo;
	function clickTheater(){
		document.getElementById("locationList").style.display='block';	
		document.getElementById("MovieList").style.display='none';	
		document.getElementById("a").className ="Lang-LBL4001 on";
		document.getElementById("b").className ="Lang-LBL4002";

	}
	function clickMovie(){
		document.getElementById("locationList").style.display='none';	
		document.getElementById("MovieList").style.display='block';
		document.getElementById("a").className ="Lang-LBL4001";
		document.getElementById("b").className ="Lang-LBL4002 on";
		}
	function changeDo(id){
		if(id=="doName1") selDo="강남"
			else if(id=="doName2") selDo="안산"
			else if(id=="doName3") selDo="당진"
			else if(id=="doName4") selDo="해운대"
			else  selDo="익산"
		th_name=selDo;
		for(var i=1;i<=5;i++){
			

			if(id=="doName"+i){
				document.getElementById("doName"+i).className ="area_btn on";
				document.getElementById("doName"+i+"sub").style.display='block';
				document.getElementById("siName"+i+"1").className ="on";
	
					
			var fn = "movie-schedule-iframe?th_name="+th_name+"&ss_date="+today;
					document.frameChange.action = fn;
					document.frameChange.target = "iframe1";
					document.frameChange.submit();

			}
			else{
				document.getElementById("doName"+i).className ="area_btn";
				document.getElementById("doName"+i+"sub").style.display='none';
				document.getElementById("siName"+i+"2").className ="";
				document.getElementById("siName"+i+"3").className ="";
				document.getElementById("siName"+i+"4").className ="";
				document.getElementById("siName"+i+"5").className ="";

			}
		}
	}
	function changeSi(id,th_name1){
		th_name=th_name1;
		 for(var i=1;i<=5;i++){
			for(var j=1;j<=5;j++){
				if(id=="siName"+i+j){
					document.getElementById("siName"+i+j).className ="on";
					//document.getElementById("siName"+i+j+"sub").style.display='block';
					
					var fn = "movie-schedule-iframe?th_name="+th_name+"&ss_date="+today;
					document.frameChange.action = fn;
					document.frameChange.target = "iframe1";
					document.frameChange.submit();
	
				}
				else{
					document.getElementById("siName"+i+j).className ="";
					//document.getElementById("siName"+i+j+"sub").style.display='none';
	
				}
			}
		} 
	}
	
	function changeDay(id){
		today=id;
		var fn = "movie-schedule-iframe?th_name="+th_name+"&ss_date="+today;
		document.frameChange.action = fn;
		document.frameChange.target = "iframe1";
		document.frameChange.submit();
	}
	function iframeAutoResize(h)
	{
	  if(h==null){
		  return false;
	  }
	  
	  (h).height="0px";
	  var iframeHeight=(h).contentWindow.document.body.scrollHeight;
	  (h).height=iframeHeight+15;
	}

	window.onload = function(){
		var date = new Date(); 
		var year = date.getFullYear(); 
		var month = new String(date.getMonth()+1); 
		var day = new String(date.getDate()); 
		
		// 한자리수일 경우 0을 채워준다. 
		if(month.length == 1){ 
		  month = "0" + month; 
		} 
		if(day.length == 1){ 
		  day = "0" + day; 
		} 

		today=year + "-" + month + "-" + day;
		<c:forEach var="list" items="${List1}" begin = '0' end = '0' step='1'>
			th_name = '${list.th_name}';
		</c:forEach>
		
		
		var fn = "movie-schedule-iframe?th_name="+th_name+"&ss_date="+today;
		document.frameChange.action = fn;
		document.frameChange.target = "iframe1";
		document.frameChange.submit();
		
	}
/* 	function changeSi1(siname){
		document.form1.siname.value=siname;
		alert(document.form1.siname.value);
		document.form1.submit();

	} */


</script>


<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="34BBBF54" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="KdKojeeZ+BT7XLTpTszPZNO5IUFo3wG5lissa0WifNZjVfLcYSnTdvILHQysSVy/yJUWOaggFRvxjRzClEXCaKPsL1sWDGJX6ZzJvcYAToc5qVAQFYCSIUuFlqiKvzKz" />
</div>

        <!-- 로그인 실패 flag -->
        <input type="hidden" id="hidLoginFailedLayerPopup" name="hidLoginFailedLayerPopup" value="" />
        <!-- //로그인 실패 flag -->

        <!-- skip nav 20160414 웹접근성 content에서 container로 수정 - 박훈철 -->
        <div id="skipNavi"><a href="#container">본문 바로가기</a></div>
        <!-- //skip nav -->

        <!-- wrap -->
        <div id="wrap">
            <!-- HEADER area -->
            <div class="header">
			    <!-- 페이스북 툴팁 20161102 -->
			    <div class="laypop_evtFB"><a href="https://www.facebook.com/LotteCinema.kr" target="_blank" title="롯데시네마 페이스북 새창열림">롯데시네마 페이스북</a>
				    <div class="laypop_FB" style="display:none;">최신 개봉작 속보, 시사회 초청 이벤트!</div>
			    </div>
			    <!--// 페이스북 툴팁 20161102 -->
                <!-- luncher area -->
                <div class="luncher">
                    <ul>
                        <li>
                            </li>
                        <li>
                            <a id="lbtnLogin" title="로그인" href="javascript:__doPostBack(&#39;ctl00$ctl00$lbtnLogin&#39;,&#39;&#39;)">로그인</a></li>
                        
                        <!-- 20161222 - Util 영역 개선 -->
                        <!--<li><a href="https://member.lpoint.com/door/user/regUser.jsp?sid=CINEMA&returnurl=" target="_blank" title="회원가입">회원가입</a></li>-->
                        <li><a href="/LCHS/Contents/Membership/l-point.aspx" title="회원가입">회원가입</a></li>
                        <!-- 20161222 - Util 영역 개선 -->
                        <!--<li><a href="https://member.lpoint.com/door/user/requestId.jsp?sid=CINEMA&opentype=N&returnurl=" target="_blank" title="아이디찾기">아이디찾기</a></li>
                        <li><a href="https://member.lpoint.com/door/user/requestPasswd.jsp?sid=CINEMA&opentype=N&sch=&returnurl=" target="_blank" title="비밀번호찾기">비밀번호찾기</a></li>-->
                        
                        <li><a href="javascript:goToMembershipMenu(0,0,1);" title="멤버십">멤버십</a></li>
                        <li><a href="javascript:goCustomerCenterMenu('0');" title="고객센터">고객센터</a></li>
                        <li class="lang">
                            <a href="#" id="LanguageSetting"></a>
                        </li>
                    </ul>
                </div>
                <!-- //luncher area -->
                <!-- Logo area -->
                <div class="logo">
                    <!-- 2016.05.03 장착법 -->
                    <h1>
                        <a href="/LCHS/index.aspx">
                            <img src="http://caching.lottecinema.co.kr//Media/WebAdmin/dc03934929594309ba8b3d6a275c5828.gif" id="imgLogo" alt="LOTTE CINEMA" title="LOTTE CINEMA" /></a>
                    </h1>
                </div>
                <!-- //Logo area -->
                <!-- Login Info area -->
                <div class="loginInfo" style="display: none;">
                    <a href="javascript:void(0)" class="lF_login">로그인전</a>
                    <div class="logingIF_in"></div>
                </div>

                <!-- //Login Info area -->
                <!-- GNB area -->
                <div class="gnb">
                    <ul><li class="active"><a href="http://www.lottecinema.co.kr/LCHS/Contents/ticketing/ticketing.aspx" title="예매">예매</a><div class="depth"><ul><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/ticketing/ticketing.aspx" title="예매하기">예매하기</a></li><li  class="active"><a href="http://www.lottecinema.co.kr/LCHS/Contents/ticketing/movie-schedule.aspx" title="상영시간표">상영시간표</a></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/ticketing/discount-guide.aspx" title="할인가이드">할인가이드</a></li></ul></div></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Movie/Movie-List.aspx" title="영화">영화</a><div class="depth"><ul><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Movie/Movie-List.aspx" title="박스오피스">박스오피스</a></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Movie/arte-movie-list.aspx" title="아르떼">아르떼</a></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Movie/movie-festival-list.aspx" title="중국영화상영관/영화제">중국영화상영관/영화제</a></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Movie/Movie-Opera-List.aspx" title="오페라">오페라</a></li></ul></div></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=300" title="영화관">영화관</a><div class="depth"><ul><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=300" title="스페셜관">스페셜관</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=300" title="샤롯데">샤롯데</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=941" title="수퍼플렉스 G">수퍼플렉스 G</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=940" title="수퍼플렉스">수퍼플렉스</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=930" title="수퍼 4D">수퍼 4D</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=910" title="수퍼바이브">수퍼바이브</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=960" title="씨네패밀리">씨네패밀리</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=200" title="씨네커플">씨네커플</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/charlotte-special-cinema.aspx?divisionCode=2&screendivcd=950" title="씨네비즈">씨네비즈</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1013" title="서울">서울</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1013" title="가산디지털">가산디지털</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1018" title="가양">가양</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=9010" title="강동">강동</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1004" title="건대입구">건대입구</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1009" title="김포공항">김포공항</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1003" title="노원">노원</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=3009" title="누리꿈">누리꿈</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1017" title="독산">독산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=9056" title="브로드웨이(신사)">브로드웨이(신사)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1012" title="서울대입구">서울대입구</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1019" title="수락산">수락산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1015" title="신도림">신도림</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1007" title="신림">신림</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1001" title="에비뉴엘(명동)">에비뉴엘(명동)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1002" title="영등포">영등포</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1014" title="용산">용산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1016" title="월드타워">월드타워</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1021" title="은평(롯데몰)">은평(롯데몰)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=9053" title="장안">장안</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1008" title="청량리">청량리</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1010" title="합정">합정</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1005" title="홍대입구">홍대입구</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=1&cinemaID=1011" title="황학">황학</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3015" title="경기/인천">경기/인천</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3015" title="검단">검단</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3030" title="광교아울렛">광교아울렛</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3027" title="광명(광명사거리)">광명(광명사거리)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3025" title="광명아울렛">광명아울렛</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3020" title="광주터미널">광주터미널</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3026" title="구리아울렛">구리아울렛</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3002" title="라페스타">라페스타</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3021" title="마석">마석</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3017" title="병점">병점</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3011" title="부천(신중동역)">부천(신중동역)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9054" title="부천역">부천역</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3003" title="부평">부평</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3008" title="부평역사">부평역사</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3031" title="산본피트인">산본피트인</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9009" title="성남">성남</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9027" title="성남신흥">성남신흥</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3012" title="센트럴락">센트럴락</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3029" title="송탄">송탄</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3024" title="수원">수원</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3016" title="시화">시화</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3004" title="안산">안산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3028" title="안산고잔">안산고잔</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3022" title="안성">안성</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3007" title="안양(안양역)">안양(안양역)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3032" title="안양일번가">안양일번가</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3019" title="양주고읍">양주고읍</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9060" title="오산">오산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9033" title="용인">용인</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3033" title="의정부민락">의정부민락</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3023" title="인덕원">인덕원</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3006" title="인천">인천</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3035" title="인천아시아드">인천아시아드</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3013" title="주엽">주엽</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3010" title="진접">진접</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3014" title="파주아울렛">파주아울렛</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3034" title="파주운정">파주운정</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=3018" title="평촌(범계역)">평촌(범계역)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=2&cinemaID=9061" title="향남">향남</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4002" title="충청/대전">충청/대전</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4002" title="대전(백화점)">대전(백화점)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4006" title="대전둔산(월평동)">대전둔산(월평동)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=9044" title="서산">서산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4004" title="서청주(아울렛)">서청주(아울렛)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4005" title="아산터미널">아산터미널</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4003" title="청주(성안길)">청주(성안길)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=4007" title="청주용암">청주용암</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=3&cinemaID=9058" title="청주충대">청주충대</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6001" title="전라/광주">전라/광주</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6001" title="광주(백화점)">광주(백화점)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=9015" title="군산">군산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=9004" title="목포">목포</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6004" title="수완">수완</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6002" title="전주">전주</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=6006" title="전주평화">전주평화</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=4&cinemaID=9047" title="충장로">충장로</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5008" title="경북/대구">경북/대구</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5008" title="경산">경산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=9050" title="경주">경주</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=9001" title="구미">구미</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5013" title="구미공단">구미공단</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5012" title="대구광장">대구광장</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5005" title="동성로">동성로</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5016" title="상인">상인</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5004" title="성서">성서</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5006" title="율하">율하</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=5007" title="포항">포항</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=5&cinemaID=9057" title="프리미엄칠곡">프리미엄칠곡</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2009" title="경남/부산/울산">경남/부산/울산</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2009" title="광복">광복</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5015" title="김해부원">김해부원</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5011" title="김해아울렛(장유)">김해아울렛(장유)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2007" title="동래">동래</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2010" title="동부산아울렛">동부산아울렛</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5010" title="마산(경남대)">마산(경남대)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=9042" title="마산터미널">마산터미널</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2004" title="부산본점">부산본점</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2005" title="사상">사상</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2008" title="서면(전포동)">서면(전포동)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2006" title="센텀시티">센텀시티</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=9029" title="양산">양산</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=2011" title="오투">오투</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5001" title="울산(백화점)">울산(백화점)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5014" title="울산성남">울산성남</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=9003" title="진주(중안동)">진주(중안동)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5017" title="진주혁신(롯데몰)">진주혁신(롯데몰)</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5009" title="진해">진해</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=5002" title="창원">창원</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=9036" title="통영">통영</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=101&cinemaID=9059" title="해운대">해운대</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=6&cinemaID=7001" title="강원">강원</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=6&cinemaID=7001" title="남원주">남원주</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=6&cinemaID=7002" title="동해">동해</a></li></ul></div></li><li ><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=7&cinemaID=9013" title="제주">제주</a><div class="depth_03"><ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=7&cinemaID=9013" title="서귀포">서귀포</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema/Cinema-Detail.aspx?divisionCode=1&detailDivisionCode=7&cinemaID=6005" title="제주">제주</a></li></ul></div></li></ul></div></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema-Mall/sweet-shop.aspx" title="스위트샵">스위트샵</a></li><li><a href="event-summary-list" title="이벤트">이벤트</a><div class="depth"><ul><li ><a href="http://event.lottecinema.co.kr/LCHS/Contents/Event/l-selection-list.aspx" title="L.셀렉션">L.셀렉션</a></li><li ><a href="http://event.lottecinema.co.kr/LCHS/Contents/Event/movie-booking-list.aspx" title="영화">영화</a></li><li ><a href="http://event.lottecinema.co.kr/LCHS/Contents/Event/preview-stage-greeting-list.aspx" title="무대인사">무대인사</a></li><li ><a href="http://event.lottecinema.co.kr/LCHS/Contents/Event/alliance-discount-List.aspx" title="제휴할인">제휴할인</a></li><li ><a href="http://event.lottecinema.co.kr/LCHS/Contents/Event/our-town-cinema-list.aspx" title="우리동네영화관">우리동네영화관</a></li></ul></div></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Cinema-Mall/gift-shop.aspx" title="기프트샵">기프트샵</a></li></ul>

                </div>
                <!-- //GNB area -->
            </div>
            <!-- HEADER area -->

            <!-- Content -->

            
    
    <div id="container" class="sub">
        <!-- content -->
        <div id="content">
            <!-- cont_ticket -->
            <div class="cont_ticket">
                <div class="cont_ticket_Area">

                    <!-- Calendar-->
                    <div class="calendar">
                       <!--  <a href="javascript:void(0);" class="month-picker-nav prev nodata" title="prev date">이전</a> -->
                        <fieldset class="month-picker-fieldset">
                            <legend>달력 날짜 선택</legend>
                            <div class="calendarArea">    
			            
 			             <c:set var="today" value="<%=new Date()%>"/>
 						<%int i=0; %> 
			             <c:forEach begin="1" end="14" step="1" var="i">
			             <c:set var="day" value="<%=new Date(new Date().getTime() + 60*60*24*1000*i++)%>"/>
			              <fmt:formatDate value="${day}" pattern="E" var="satSun"/> 
			              <c:choose>		 
 						<c:when test="${i eq 1}">
 						   	<input type="radio" name="day" value="<fmt:formatDate value="${day}" pattern="yyyy-MM-dd"/>" id="${i}" checked="checked" onclick="changeDay(this.value)">
 						</c:when>
 						<c:otherwise>
 							   	<input type="radio" name="day" value="<fmt:formatDate value="${day}" pattern="yyyy-MM-dd"/>" id="${i}" onclick="changeDay(this.value)">
 						
 						</c:otherwise>
 						</c:choose>
              			  <c:set var="satSun" value="${satSun}" />
   						 <c:choose>		 
 						<c:when test="${satSun eq '토' }">
								<label for="${i}" class="month-picker-label sat " style="left:${(i-1)*60}px">
  						 </c:when>
  						 <c:when test="${satSun eq '일' }">
								<label for="${i}" class="month-picker-label sun" style="left:${(i-1)*60}px">
  						 </c:when>
  					 <c:otherwise>
  					 	
 						  	<label for="${i}" class="month-picker-label" style="left:${(i-1)*60}px">

  					 </c:otherwise>
					</c:choose> 
								<span><fmt:formatDate value="${day}" pattern="E" /></span>
								<em><fmt:formatDate value="${day}" pattern="dd"/></em> 
								</label> 

 						</c:forEach>
 								<!-- //c choose로 토,일 색 바꾸기 -->
                            </div>

                        <span class="month" style="top:-47px; left:47px;"><em><fmt:formatDate type="date" value="${today}" pattern="M"/></em><span><fmt:formatDate type="date" value="${today}" pattern="yyyy"/> <fmt:formatDate value="${today}" type="date" pattern="MMM"/></span></span></fieldset>
                       
                        
                       <!--  <a href="javascript:void(0);" class="month-picker-nav next" title="Next date">다음</a> -->
                    </div>
                    <!-- //Calendar end -->

                    <ul class="tab_st08">
                    
                        <li><a href="javascript:void(0);"  onclick="clickTheater()" id="a" class="Lang-LBL4001 on">영화관별 상영시간표</a></li>
                     <!--    <li><a href="javascript:void(0);" onclick="clickMovie()" id="b"class="Lang-LBL4002">영화별 상영시간표</a></li> -->
                    </ul>
                </div>
            </div>             

            <!-- //cont_ticket end -->
            <div class="tab_tCont cinema_twrap" id="locationList" style="display:block">
                <h2 class="sub_tit02 Lang-LBL4003">영화관</h2>
               
             
             <ul class="theater_zone">
                       
                 <c:forEach varStatus="a" var="doList" items="${doList}">
                 <c:set var="name" value="${doList.th_do }" />
                  <c:choose>
 					<c:when test="${name eq '서울' }">
 					 	  <li>   <span class="area_zone zone_0${a.index+1 }"><a href="javascript:void(0);" onclick="changeDo(this.id)" id=doName1 class="area_btn on">${doList.th_do}</a></span>   
 					 	  <div class="area_cont on" id=doName1sub style="display: block;"><h3 class="blind">${doList.th_do}</h3>
 					 	         <ul class="area_list d${a.index+1 }">
 					 	          <c:forEach var="List1" varStatus="b" items="${List1}">
 					 	          <c:set var="name" value="${List1.th_name}" />
                  					<c:choose>
 										<c:when test="${name eq '강남' }">		
  					 	         	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name )" name=${List1.th_name} id=siName${a.index+1}${b.index+1}  class="on">${List1.th_name }</a></li>
  					 	         	<%-- <li><a href="javascript:void(0);" onclick="changeSi1(this.id)" id=${List1.th_name } class="on">${List1.th_name }</a></li>
       					   --%>
 								</c:when>
 					 	         <c:otherwise>
 					 	          	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name )" name=${List1.th_name} id=siName${a.index+1}${b.index+1} class="">${List1.th_name }</a></li>					 	       
 					 	         	</c:otherwise>
 					 	         	
 					 	         	</c:choose>
 					 	         	</c:forEach>
 					 	          </ul></div></li>	 	  
 					</c:when>
 					<c:when test="${name eq '경기' }">
 					 	 <li>   <span class="area_zone zone_0${a.index+1 }"><a href="javascript:void(0);" onclick="changeDo(this.id)" id=doName2 class="area_btn">${doList.th_do}</a></span>
 					 	    <div class="area_cont" id=doName2sub style="display: none;">       <h3 class="blind">${doList.th_do}</h3>
 					 	           <ul class="area_list d${a.index+1 }">
 					 	           <c:forEach var="List2" varStatus="b" items="${List2}">
 					 	          <c:set var="name" value="${List2.th_name}" />
                  					<c:choose>
 										<c:when test="${name eq '안산' }">		
 					 	         	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)"  name=${List2.th_name} id=siName${a.index+1}${b.index+1} class="on">${List2.th_name }</a></li>
 					 	         	</c:when>
 					 	         <c:otherwise>
 					 	          	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)"  name=${List2.th_name} id=siName${a.index+1}${b.index+1} class="">${List2.th_name }</a></li>					 	       
 					 	         	</c:otherwise>
 					 	         	
 					 	         	</c:choose>
 					 	         	</c:forEach>
 					 	            </ul></div></li>	 	  
 					</c:when>
 					<c:when test="${name eq '충청/대전' }">
 					 	 <li>   <span class="area_zone zone_0${a.index+1 }"><a href="javascript:void(0);"onclick="changeDo(this.id)" id=doName3 class="area_btn">${doList.th_do}</a></span>
 					 	    <div class="area_cont"id=doName3sub style="display: none;">       <h3 class="blind">${doList.th_do}</h3>
 					 	           <ul class="area_list d${a.index+1 }">
 					 	           <c:forEach var="List3" varStatus="b" items="${List3}">
 					 	          <c:set var="name" value="${List3.th_name}" />
                  					<c:choose>
 										<c:when test="${name eq '당진' }">		
 					 	         	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)" name=${List3.th_name}  id=siName${a.index+1}${b.index+1} class="on">${List3.th_name }</a></li>
 					 	         	</c:when>
 					 	         <c:otherwise>
 					 	          	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)"  name=${List3.th_name} id=siName${a.index+1}${b.index+1} class="">${List3.th_name }</a></li>					 	       
 					 	         	</c:otherwise>
 					 	         	
 					 	         	</c:choose>
 					 	         	</c:forEach>
 					 	            </ul></div></li>	 	  
 					</c:when>
 					<c:when test="${name eq '부산/대구' }">
 					 	 <li>   <span class="area_zone zone_0${a.index+1 }"><a href="javascript:void(0);"onclick="changeDo(this.id)" id=doName4 class="area_btn">${doList.th_do}</a></span>
 					 	    <div class="area_cont"id=doName4sub style="display: none;">       <h3 class="blind">${doList.th_do}</h3>
 					 	           <ul class="area_list d${a.index+1 }">
 					 	           <c:forEach var="List4" varStatus="b" items="${List4}">
 					 	          <c:set var="name" value="${List4.th_name}" />
                  					<c:choose>
 										<c:when test="${name eq '해운대' }">		
 					 	         	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)" name=${List4.th_name}  id=siName${a.index+1}${b.index+1} class="on">${List4.th_name}</a></li>
 					 	         	</c:when>
 					 	         <c:otherwise>
 					 	          	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)" name=${List4.th_name}  id=siName${a.index+1}${b.index+1} class="">${List4.th_name }</a></li>					 	       
 					 	         	</c:otherwise>
 					 	         	
 					 	         	</c:choose>
 					 	         	</c:forEach>
 					 	            </ul></div></li>	 	  
 					</c:when>
 					<c:when test="${name eq '전라/광주' }">
 					 	 <li>   <span class="area_zone zone_0${a.index+1 }"><a href="javascript:void(0);"onclick="changeDo(this.id)" id=doName5 class="area_btn">${doList.th_do}</a></span>
 					 	    <div class="area_cont"id=doName5sub style="display: none;">       <h3 class="blind">${doList.th_do}</h3>
 					 	           <ul class="area_list d${a.index+1 }">
 					 	           <c:forEach var="List5" varStatus="b" items="${List5}">
 					 	          <c:set var="name" value="${List5.th_name}" />
                  					<c:choose>
 										<c:when test="${name eq '익산' }">		
 					 	         	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)" name=${List5.th_name}  id=siName${a.index+1}${b.index+1} class="on">${List5.th_name }</a></li>
 					 	         	</c:when>
 					 	         <c:otherwise>
 					 	          	<li><a href="javascript:void(0);" onclick="changeSi(this.id,this.name)" name=${List5.th_name}  id=siName${a.index+1}${b.index+1} class="">${List5.th_name }</a></li>					 	       
 					 	         	</c:otherwise>
 					 	         	
 					 	         	</c:choose>
 					 	         	</c:forEach>
 					 	            </ul></div></li>	 	  
 					</c:when>
 					</c:choose>
				 </c:forEach> 

                </ul> 
            </div>


            <div class="tab_tCont movie_twrap" id="MovieList" style="display:none">
                <h2 class="sub_tit02 Lang-LBL4004">영화</h2>
                <div class="item_list">
                    <ul>
                        <li><a href="javascript:void(0);" class="on Lang-LBL4005">예매순</a></li>
                        <li><a href="javascript:void(0);" class="Lang-LBL4006">평점순</a></li>
                    </ul>
                </div>
                <div class="mslide_boxs">
                    <h3 class="blind" id="title_h3">예매순</h3>
                    <a href="javascript:void(0);" class="btn_prev" style="display: none;">이전</a>
                    <a href="javascript:void(0);" class="btn_next">다음</a>
                    <div class="control_navi">
                        <ul class="indicator">
                        </ul>
                    </div>
                    <div class="m_hidden">
                        <ul class="m_List">
                        </ul>
                    </div>
                </div>
            </div>
            
            
            <!-- time_wrap -->
            <div class="time_wrap">
                <div class="time_inner listViewCinema">
                    <h3 class="sub_tit02"><em class="Lang-LBL4007">상영시간</em> <span class="sub_etc Lang-LBL4008">예고편 상영 등으로 시작이 10여분 정도 차이 날 수 있습니다. </span></h3>
                    
                    <!-- 2016.05.10 웹접근성 -->
                    <h4 class="blind" id="title_h4"></h4>
                    <h5 class="blind" id="title_h5"></h5>
                    
                    <iframe name="iframe1"  width="1000" scrolling="No" onLoad="iframeAutoResize(this);" frameborder="1" height="1">
                    
                     </iframe>
                     
                   
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

        </div>
        <!-- //content -->
    </div>


            <!-- Content -->

            <!-- footer -->
            <div id="footer">
                

                <!--// notice_wrap -->
                <div class="footer_inner">
                    <!-- 20150818 추가 -->
                    <div class="footer_tit">
                        <span class="footer_logo">
                            <img src="/LCHS/Image/logo_footer.gif" alt="LOTTE CINEMA" /></span>
                        
                    </div>
                    <ul class="footer_link">
                        <ul><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/member-clause.aspx" title="회원약관">회원약관</a></li><li class="active"><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/individual-infomation-handling-policy.aspx" title="개인정보처리방침">개인정보처리방침</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/email-collection-refusal.aspx" title="이메일무단수집거부">이메일무단수집거부</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/electronic-management-policy.aspx" title="영상정보처리기기 운영∙관리방침">영상정보처리기기 운영∙관리방침</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Membership/l-point.aspx" title="L.POINT회원안내">L.POINT회원안내</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/assign-standard.aspx" title="배정기준">배정기준</a></li><li><a href="http://www.lottecinema.co.kr/LCHS/Contents/Etc/sitemap.aspx" title="사이트맵">사이트맵</a></li><li><a href="http://www.lottecinema.co.kr/LCCS/Contents/employ/individuals.aspx" title="채용안내">채용안내</a></li><li><a href="http://www.lottecinema.co.kr/LCCS/Contents/ad/advertinquiry.aspx" title="광고/임대문의">광고/임대문의</a></li><li><a href="http://www.lottecinema.co.kr/LCCS/index.aspx" title="기업정보">기업정보</a></li></ul>

                    </ul>
                    <div class="company_info">
                        <!-- 0330 문구수정 -->
                        <address>서울특별시 송파구 올림픽로 269(신천동, 롯데캐슬골드) 4층 롯데시네마</address>
                        <span>고객센터 1544-8855</span>
                        <!-- //0330 문구수정 -->
                        <ul>
                            <li>대표이사 이원준</li>
                            <li>사업자등록번호 215-85-13462</li>
                            <li>통신판매업신고번호 제1557호</li>
                            <li>개인정보관리책임자 상무 이관로</li>
                        </ul>
                    </div>
                    <p class="copy">COPYRIGHT© LOTTE CINEMA ALL RIGHT RESERVED.</p>
                </div>
                <!-- 20151008추가 -->
                <div class="footer_Awrap">
                    <ul class="footer_award">
                        <!-- 0324 추가 -->
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award09.gif" alt="NCSI 2016년 영화관부문1위" /></li>
                        <!-- //0324 추가 -->
                        <!-- 0314 수정 -->
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award01.gif" alt="KCSI 영화관부문 4년 연속 1위(총9회)" /></li>
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award02.gif" alt="KS-SQI 영화관부문 5년 연속 1위(총8회)" /></li>
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award03.gif" alt="올해의 브랜드대상 영화관 부문 10년 연속 1휘" /></li>
                        <!-- //0314 수정 -->
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award04.gif" alt="그린스타 영화관 부문 4년 연속 1위" /></li>
                        <!-- 0310 alt 수정 -->
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award10.gif" alt="대한민국 브랜드 스타 영화관 부문 1위" /></li>
                        <!-- 0407 수정 -->
                        <li>
                            <img src="/LCHS/Image/Btn/footer_award07.gif" alt="가족친화 인증기업 선정" /></li>
                        <li><a title="새창" href="http://wa.or.kr/waMark/status.asp" target="_blank">
                            <img src="/LCHS/Image/Btn/footer_award08.gif" alt="(사)한국장애인단체총연합회 한국웹접근성인증평가원 웹 접근성 우수사이트 인증마크(WA인증마크)"></a></li>
                    </ul>
                </div>
                <!-- //20151008추가 -->

            </div>
            <!-- //footer -->
        </div>

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
                var myCinemaMemberInfo;	// 회원 정보
                var myCouponInfo;		// 쿠폰 정보
                var htmlString;			// html

                var name;				// 회원 성명
                var gradeName;			// 회원등급

                var couponCount = 0;	// 쿠폰 개수

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

                if (jsonData.IsOK != "true") {								//Data에 오류가 있으면
                    //throw new Error(result.ResultMessage);					//Error를 발생하고, Data 요청 결과 massage 를 전달한다.
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
                CheckException(e, "checkLoginFailedLayerPopup", "member");					//오류 발생 처리
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
        //            if (checkImage(items[0].ImageFileFullPath)) {
        //                imageUrl = items[0].ImageFileFullPath;
        //            }
        //        }
        //    } catch (e) {
        //        //imageUrl = "/LCHS/Image/logo_main.gif";
        //        CheckException(e, "appendLogo: ");
        //    } finally {
        //        $("div#divLogo").find("a").text = "<img src=" + imageUrl + " alt='LOTTE CINEMA' title='LOTTE CINEMA' />";
        //    }
        //}

    </script>

    <script type="text/javascript">
        // 페이스북 툴팁
        $(function () {
            var $layerFB = $(".laypop_FB");
            $layerFB.hide();

            $(".laypop_evtFB").hover(
			    function () {
			        $layerFB.show();
			        $(".laypop_evtFB a").attr("title", "");
			    },
			    function () {
			        $layerFB.hide();
			        $(".laypop_evtFB a").attr("title", "롯데시네마 페이스북 새창열림");
			    }
		    );
        });
    </script>

    
    <script type="text/javascript">
        $(document).ready(function () {
            // 언어 변경
            ConvertLanguage();
        });
    </script>
    
    <script src="/LCHS/Script/Common/scheduleReservationData.js?v=20170102" type="text/javascript"></script>

    <script type="text/javascript">
        $(function () {
            var scheduler = new $.fn.scheduleReservation({ target: '.cont_ticket', leng: Language });
        });
    </script>


    <!-- Master 밑에 존재해야 함. -->
    <script src="/LCHS/Script/Common/quickMenu.js"></script>
    <input name="ctl00$ctl00$hdfEmployeeType" type="hidden" id="hdfEmployeeType" />
    <script type="text/javascript">
        setPageTitle();

    </script>
</body>
</html>
