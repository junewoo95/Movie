/************************************************
* 설          명: 영화 > 영화랭킹 스크립트
* 작    성    자: 박규홍
* 최초 작성 일자: 15.08.24
*	15.09.11 - 스크립트 파일로 분리 및 코드 정리
*	15.10.02 - 문서 표준화
*	15.10.16 - 더보기 버튼 표시 로직 변경, setDisplayMoreButton() 추가
*	15.10.26 - 영화 목록 parameter 변경
*	15.10.18 - appendVisualList(), makeVisualItem() 수정, 
*	15.10.29 - key visual player
*			 - makeVisualItem() 수정
*			 - aspx UI: key visual, 정렬(관람순 -> 가나다순)
*			 - makeMovieItem() 수정: 가나다순 정렬시 얘매율 표시
*			 - 더보기 로직 수정
*			 - 기본 페이지 사이즈 수정: BASE_MOVIE_PAGE_SIZE, MOVIE_PAGE_SIZE 각각 25
*					: closeMovieList 주석
*					: setList() 수정, isFirst 추가
*					: inItControls() 수정, 더보기/닫기 버튼 이벤트 수정
*	15.10.30 - 상영예정작 정렬 기준 삭제
*			 - 광고 목록 item 작성 추가
*	15.11.02 - 영화목록 검색결과 없음 표시 추가
*	15.11.04 - 영화목록 검색결과 없음 표시 오류 수정
************************************************/
/****************************************
* 상수 선언
****************************************/
// 주우락: 사이즈 25에서 임시 100으로 수정
BASE_MOVIE_PAGE_SIZE = 100;		//첫 페이지 영화 정보 표시 갯수
MOVIE_PAGE_SIZE = 100;			//페이지 사이즈 //Hint ------------------> 2차 개발시 적용 예정

/****************************************
* 전역 변수 선언
****************************************/
var NOW_RANK;					//현재랭킹
var NOW_PAGE;					//현재페이지 번호
var DISPLAY_RANK;				//표시랭킹
var MOVIE_FLAG;					//영화목록: Y(현재상영작)/N(상영예정작)
var ORDER_KEY;					//정렬 기준: 1(예매순)/2(관람순)/3(평점순)
var TOTAL_COUNT;					//영화정보 List total count

/****************************************
* 초기화
****************************************/
$(location).ready(function () {
	// Hint ------> 디버깅용 변수, 실서버 적용시 주석 처리
	//_debug = true;
	_notRedirection = true;

	//기본 목록 및 정렬 설정
	MOVIE_FLAG = "Y";
	ORDER_KEY = "1";

	inItControls();						//버튼 및 링크 초기화
	initPlayer();						//플레이어 초기화
	setList(MOVIE_FLAG, ORDER_KEY, true);		//Movie List 표시
});
//버튼 및 링크 초기화
inItControls = function () {
	try {
		//Set List button
	    $("#aNow").click(function () {		//현재상영작 탭, 예매순
	        $('#title_h3').text('현재상영작');
	        $('#title_h4').text('예매순');
	        document.title = '예매순 | 현재상영작 | 박스오피스 | 영화 | 롯데시네마';
			setList("Y", "1");
		});
	    $("#aSoon").click(function () {		//상영예정작 탭, 개봉임박순
	        $('#title_h3').text('상영예정작');
	        $('#title_h4').text('');
	        document.title = '상영예정작 | 박스오피스 | 영화 | 롯데시네마';
			setList("N", "5");
		});

		//Set Events - Order button
		//현재 상영작
	    $("#aTiket").click(function () {	//예매순
	        $('#title_h4').text('예매순');
	        document.title = '예매순 | 현재상영작 | 박스오피스 | 영화 | 롯데시네마';
			setList(MOVIE_FLAG, "1");
		});
		//$("#aView").click(function () {		//관람순 -> 가나다순
		//    setList(MOVIE_FLAG, "2");
		//});
	    $("#aRank").click(function () {		//평점순
	        $('#title_h4').text('평점순');
	        document.title = '평점순 | 현재상영작 | 박스오피스 | 영화 | 롯데시네마';
			setList(MOVIE_FLAG, "3");
		});
		////상영 예정작	// 고도화로 삭제됨
		//$("#aOpen").click(function () {		//개봉 임박순
		//	setList(MOVIE_FLAG, "5");
		//});
		//$("#aERank").click(function () {	//평점순
		//	setList(MOVIE_FLAG, "4");
		//});

		//더보기 버튼 이벤트 설정
		$("#aMore").click(function () {
			++NOW_PAGE;
			getMovieList(MOVIE_PAGE_SIZE);
		});
	} catch (e) {
		//CheckException(e, "inItControls", NOW_MENU_TYPE);					//오류 발생 처리
	}
}

// 더 보기 버튼 표시 설정
//params>
//return>
setDisplayMoreButton = function () {
	var itemCount;
	itemCount = $("#ulMovieList").find("li").length;

	if (TOTAL_COUNT > itemCount) {
		// 표시할 항목이 더 있을 경우
		$("#aMore").show();		//더보기 버튼 표시
	} else if (TOTAL_COUNT <= itemCount) {
		// 전체 항목을 모두 표시한 경우
		$("#aMore").hide();		//더보기 버튼 숨김
	}
}

/****************************************
* 함수 선언
****************************************/
function getNowDateTimeString() {
	var now = new Date();                                                  // 현재시간
	var nowTime = now.getFullYear() + "년" + (now.getMonth() + 1) + "월" + now.getDate() + "일" + now.getHours() + "시" + now.getMinutes() + "분" + now.getSeconds() + "초";
	return nowTime;
}
/****************************************
* KeyVisual 관련 기능
****************************************/
//플레이어 초기화
//params>
//return>
initPlayer = function () {
	//var moviePlayer = new $.fn.setMoviePlayer({
	//    target: '#wrap',
	//    url: '/',
	//    width: '100%',
	//    height: '100%'
	//});
}

//플레이어 무비 플레이
//params>
//		url: 동영상 url
//return>
playMovie = function (url) {
	try {
		//롤링 정지
		$(".rolling_stop").trigger("click");
		//플레이어 표시 및 플레이
		var moviePlayer = new $.fn.setMoviePlayer({
			target: '#wrap',
			url: url
		});
	} catch (e) {
		//CheckException(e, "playMovie", NOW_MENU_TYPE);
	}
};

/****************************************
* 영화 목록 관련 기능
****************************************/
//영화 List를 가져온다.
//params>
//return>
getMovieList = function (pageSize) {
	try {
		//var params = { MethodName: "MovieList", PlayMovieFlag: MOVIE_FLAG, OrderKey: ORDER_KEY, PageNo: NOW_PAGE };
		// channelType, osType, osVersion => 상위 공통 파라미터 참조
		// osVersion: 모바일의 경우 OS 버젼정보, 웹의 경우 브라우져 버젼 정보,
		// festibalType(15퀴어영화제(1), 15관악청춘영화제(2), 영화제일 경우만 추가 파라미터)
		//var params = {
		//	MethodName: "GetMovies", channelType: "HO",
		//	osType: BrowserAgent(), osVersion: navigator.userAgent,
		//	//movieType: "1",					// movieType:일반영화(1), 아르테(2), 영화제(3)), 
		//	artYN: "0",					// movieType:일반영화(0), 아르테(1)
		//	moviePlayYN: MOVIE_FLAG,		// moviePlayYN: 현재 상영작 인지 상영예정작인지(Y:현재 상영작, N:상영예정작), 
		//	orderType: ORDER_KEY,			// orderType:영화 정렬 순서(1:예매율순,2:관람율순,3:평점순,4:기대평점순,5:개봉임박순, 
		//	blockSize: BASE_MOVIE_PAGE_SIZE,		// blockSize: 한 페이지에 나와야 하는 개수, pageNo: 페이지 번호
		//	pageNo: NOW_PAGE
		//};
		var params = {
			MethodName: "GetMovies",
			channelType: "HO",
			osType: BrowserAgent(), osVersion: navigator.userAgent,
			multiLanguageID: Language,  //KR,EN
			division: 1,
			moviePlayYN: MOVIE_FLAG,
			orderType: ORDER_KEY,
			blockSize: pageSize,
			pageNo: NOW_PAGE,
		};

		//GetData(NOW_MENU_TYPE, params, AppendMovieList);
	} catch (e) {
		//CheckException(e, "getMovieList", NOW_MENU_TYPE);					//오류 발생 처리
	}
};

//영화목록 코드를 추가한다.
//params>
//		obj: 영화목록 Data
//return>
AppendMovieList = function (obj) {
	try {
		var moviesDataSet;			//영화정보 객체

		moviesDataSet = obj.responseJSON;

		// Data 유효성 검사
		if (moviesDataSet == undefined) { throw new Error("None Data Error"); }
		if (moviesDataSet.IsOK == undefined) { throw new Error("Json Struct Error"); }
		if (moviesDataSet.IsOK != "true") { throw new Error(moviesDataSet.ResultMessage); }


		var movies;			//영화정보 객체
		var movieInfos;		//영화정보 List
		var specialInfos;	//스페셜관 Data List
		var htmlString;
		//var htmlSpecialIcons;	//영화 관련 스페셜 아이콘 html string

		// 첫 페이지 일 때 목록 초기화
		if (NOW_PAGE == 1) { $("#ulMovieList").html(""); }

		movies = moviesDataSet.Movies
		movieInfos = movies.Items;
		//specialInfos = movies.SpecialInfos;

		TOTAL_COUNT = movies.ItemCount;

		//영화정보 Item 추가
		if (TOTAL_COUNT == 0) {
			$(".tab_content .srchResult_none").show();	// 검색 결과 없음 표시
		} else {
			for (var key in movieInfos) {
				if (movieInfos[key].RepresentationMovieCode == "AD") {
					// 광고 Item Html 작성 요청
					htmlString = makeAdItem(movieInfos[key]);
				}
				else {
					//영화 정보 Item html 작성 요청
					htmlString = makeMovieItem(movieInfos[key], ++NOW_RANK);
				}
				//영화 정보 item 추가
				$("#ulMovieList").append(htmlString);

			}
			$('.curr_list li').on('mouseenter', function () {
				$(this).addClass('hover');
			}).on('mouseleave', function () {
				$(this).removeClass('hover');
			});

			$('.curr_list .img a').on('focusin', function () {
				$(this).parent().parent().parent().addClass('hover');
			});
			$('.curr_list .list_text a').on('focusin', function () {
				$(this).parent().parent().parent().removeClass('hover');
			});
		}
		//더보기 버튼 표시 설정
		setDisplayMoreButton();
	} catch (e) {
		//CheckException(e, "AppendMovieList", NOW_MENU_TYPE);
	}
}

// 광고 item html code 작성 결과를 반환한다.
// params>
//		adInfo: 광고 정보
// return>
makeAdItem = function (adInfo) {
	var result;
	try {
		var sb = new StringBuilder();
		sb.Append('<li>');
		sb.Append('<div class="ad">');

		// 2016.02.03 홍상길 광고 관련 코드 수정
		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 광고를 Script로 처리하기 어렵기 때문에 Script 처리된 html 테그를 가져온다.
		sb.Append($('#AD_PC_05').html());
		//sb.AppendFormat('<img src="{0}" alt="{1}" />', adInfo.PosterURL, adInfo.MovieNameKR);
		/////////////////////////////////////////////////////////////////////////////////////////////////////////

		sb.Append('</div><!-- [D] 접근성 관련 : 깜박임이 포함된 광고는 광과민성 발작을 일으킬수 있습니다. -->');
		sb.Append('</li>');

		// 주우락: result에 담기 추가
		result = sb.ToString();
	} catch (e) {
		result = "";
		//CheckException(e, "makeAdItem", NOW_MENU_TYPE);
	} finally {
		return result;
	}

}
//영화 아이템 생성
//params>
//		movie: 개별 영화 정보 개체
//		rank: 순위
//return> 개별 영화 Html code
makeMovieItem = function (movie, rank) {
	var result;
	try {
		var movieInfoUrl = "";
		var movieTitle;
		var tiketingUrl = "";
		var gradeCSS;			//관람 등급 CSS Class
		var releaseDateDisplay;
		var sb = new StringBuilder();

		if (movie.MovieDivisionCode == "F") {
		    sb.Append('<li>');
		    sb.Append('<div class="curr_box">');
		    sb.Append('<span class="img">');
		    sb.AppendFormat('<a href="javascript:void(0);"><img src="{0}" alt="{1}"></a>', movie.PosterURL, movie.MovieFestivalName);
		    sb.Append('</span>');
		    sb.Append('</div>');
		    sb.Append('<div class="layer_hover">');
		    if (movie.BookingYN == "Y") {	//현재 상영작
		        sb.AppendFormat('<a href="javascript:void(0);" onclick="goToTiketing(\'{0}\');" class="btn_reserve">예매하기</a>', movie.MovieFestivalID);
		    }
		    sb.Append('<a href="/LCHS/Contents/Movie/movie-festival-list.aspx?flag=festival" class="btn_View">상세보기</a>', movie.MovieFestivalID);
		    sb.Append('</div>');
		    sb.Append('<dl class="list_text">');
		    sb.AppendFormat('<dt><a href="/LCHS/Contents/Movie/movie-festival-list.aspx?flag=festival"><span class="grade_film">영화제명</span>{0}</a></dt>', movie.MovieFestivalName);

		    if (movie.MovieFestivalOpenDate != null && movie.MovieFestivalOpenDate != "") {
		        sb.AppendFormat('<dd>기간 {0}~{1}</dd>', movie.MovieFestivalOpenDate.substr(0, 10).replace(/-/g, '.'), movie.MovieFestivalFinalDate.substr(0, 10).replace(/-/g, '.'));
		    }
		    else {
		        sb.Append('<dd>기간 ~</dd>');
		    }

		    //sb.Append('<dd>기간 2016.04.15~2016.04.26</dd>');
		    sb.Append('</dl>');
		    sb.Append('</li>');
		}
		else {
		    movieTitle = movie.MovieNameKR;	// Hint ------------> 다국어 처리 대비

		    if (movie.ViewGradeCode == 0) {
		        gradeCSS = "all";
		    } else {
		        gradeCSS = movie.ViewGradeCode.toString().toLowerCase();
		    }


		    sb.Append('<li>');

		    sb.Append('<div class="curr_box">');

		    if (MOVIE_FLAG == "Y") {//현재 상영작
		        //소팅기준 랭킹
		        if (rank <= DISPLAY_RANK) sb.AppendFormat("<span class='num'>{0}</span>", rank);
		    } else {				//상영 예정작
		        if (movie.ReleaseDate != null) {
		            //D-day
		            sb.AppendFormat("<span class='day_deadline'>D-{0}</span>", movie.DDay);

		            releaseDateDisplay = movie.ReleaseDate.substr(0, 10).replace(/-/g, ".").substr(2);
		        }
		    }

		    //스페셜 상영관 아이콘
		    //specials = makeSpecialIcons(movie.SpecialScreenDivisionCode);
		    //sb.Append(specials);


		    sb.Append('<span class="img">');
		    sb.AppendFormat('<a href="javascript:void(0);"><img src="{0}" alt="{1}" /></a>', movie.PosterURL, movieTitle);
		    sb.Append('</span>');

		    sb.Append('</div>');

		    sb.Append('<div class="layer_hover">');
		    //예매하기 버튼 표시
		    if (movie.BookingYN == "Y") {
		        sb.AppendFormat('<a href="javascript:void(0)" onclick="goToTiketing(\'{0}\');" class="btn_reserve">예매하기</a>', movie.RepresentationMovieCode);
		    }
		    sb.AppendFormat('<a href="javascript:void(0)" onclick="goToMovie(\'{0}\');" class="btn_View">상세보기</a>', movie.RepresentationMovieCode);
		    sb.Append('</div>');

		    sb.Append('<dl class="list_text"><!-- 1012 고도화 작업에 따른 태그 변경 -->');
		    //영화 제목 - 영화 대표 코드, 등급 스타일 표시용, 관람 등급 한글, 영화 제목 한글
		    sb.AppendFormat('<dt><a href="javascript:void(0);" onclick="goToMovie(\'{0}\');"><span class="grade_{1}">{2}</span>{3}</a></dt>', movie.RepresentationMovieCode, gradeCSS, movie.ViewGradeNameKR.substr(0, 2), movieTitle);
		    sb.Append('<dd>');


		    if (MOVIE_FLAG == "Y") {	//현재 상영작
		        sb.AppendFormat('<span class="rate">예매율 {0}%</span>', movie.BookingRate.toFixed(1));
		        sb.AppendFormat('<span class="list_score">관람평점 {0}</span>', movie.ViewEvaluation.toFixed(1));
		    } else {					//상영 예정작
		        sb.AppendFormat('<span class="rate">{0} 개봉</span>', releaseDateDisplay);
		    }

		    sb.Append('</dd>');
		    sb.Append('</dl>');
		    sb.Append('</li>');
		}
		/////////////////////////////////
		result = sb.ToString();

	} catch (e) {
		result = "";
		//CheckException(e, "makeMovieItem", NOW_MENU_TYPE);
	} finally {
		return result;
	}
}

//스페셜관 아이콘 em 코드를 작성한다.
//params>
//		specialCodes: 스페셜관 코드 배열
//return> True -스페셜관 아이콘 em HTML Code, False - ""
makeSpecialIcons = function (specialCodes) {

	var result = "";
	try {
		var htmlString;
		var sb = new StringBuilder();

		//스페셜코드 수 만큼 아이콘을 추가한다.
		while (specialCodes.length > 0) {
			htmlString = makeSpecialIconLink(specialCodes.shift());
			sb.Append(htmlString);
		}
		//스페셜관 아이콘이 있으면 결과 추가
		if (sb.GetLength() > 0) {
			sb.Insert(0, "<em class='btn_special'>");
			sb.Append("</em>")
			result = sb.ToString();
		}
	} catch (e) {
		result = "";
		//CheckException(e, "makeSpecialIcons", NOW_MENU_TYPE);
	} finally {
		return result;
	}

}

//스페셜관 아이콘 Html 생성 후 반환
//params>
//		code: 스페셜 코드
//return> 스페셜관 아이콘 HTML Code
//makeSpecialIconLink = function (code) {
//	var result;
//	try {
//		var special = SPECIALS.getSpecialImage(code);
//		if (special == null) {
//			return "";
//		} else {
//			var sb = new StringBuilder();
//			//sb.AppendFormat("<a href='JavaScript:goToSpecial(\"{0}\");'><img src='{1}' alt='{2}' /></a>"
//			sb.AppendFormat("<span><img src='{1}' alt='{2}' /></span>"
//				, code
//				, special.Icon
//				, special.Alert);
//
//			result = sb.ToString();
//		}
//	} catch (e) {
//		result = "";
//		CheckException(e, "makeSpecialIconLink: ", NOW_MENU_TYPE);
//	} finally {
//		return result;
//	}
//}

//List 작성
//params>
//		flag: List 종류
//		key: List order key
//		isFirst: 처음 조회 여부, true - 처음, false - 2번째 이후
//return>
setList = function (flag, key, isFirst) {
	try {
		MOVIE_FLAG = flag;
		ORDER_KEY = key;
		NOW_RANK = 0;
		NOW_PAGE = 1;
		DISPLAY_RANK = 10;

		removeListItem("#ulMovieList", 0);

		//clear css class
		$("#aNow").removeAttr("class");
		$("#aSoon").removeAttr("class");
		$("#aTiket").removeAttr("class");
		$("#aView").removeAttr("class");
		$("#aRank").removeAttr("class");
		$("#aOpen").removeAttr("class");
		$("#aERank").removeAttr("class");
		$("#ulNowOrder").hide();
		//$("#ulSoonOrder").hide(); // 고도화 삭제

		//Set Css Class
		if (MOVIE_FLAG == "N") {
			$("#aSoon").attr("class", "on");
			//$("#ulSoonOrder").show(); //고도화 삭제

			//if (ORDER_KEY == "4")
			//	$("#aERank").attr("class", "on");
			//else
			//	$("#aOpen").attr("class", "on");
		}
		else {
			$("#aNow").attr("class", "on");
			$("#ulNowOrder").show();

			if (ORDER_KEY == "2")
				$("#aView").attr("class", "on");
			else if (ORDER_KEY == "3")
				$("#aRank").attr("class", "on");
			else
				$("#aTiket").attr("class", "on");
		}
		if (isFirst) {
			getMovieList(BASE_MOVIE_PAGE_SIZE);
		} else {
			getMovieList(MOVIE_PAGE_SIZE);
		}
	} catch (e) {
		result = "";
		//CheckException(e, "setList: ", NOW_MENU_TYPE);
	}
}

////닫기 버튼 처리
////params>
////return>
//closeMovieList = function () {
//	removeListItem("#ulMovieList", BASE_MOVIE_PAGE_SIZE);
//}