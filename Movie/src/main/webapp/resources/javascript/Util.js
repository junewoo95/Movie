//-----------------------------------------------------------------------------
// 문자형으로 반환한다.
// @return : String
//-----------------------------------------------------------------------------
ToString = function (obj) {
    if (obj == null || obj == undefined)
        return "";
    else
        return obj.toString();
}

//-----------------------------------------------------------------------------
// 문자의 좌, 우 공백 제거
// @return : String
//-----------------------------------------------------------------------------
Trim = function (str) {
    if (ToString(str) == "")
        return str;

    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//-----------------------------------------------------------------------------
// 문자의 좌 공백 제거
// @return : String
//-----------------------------------------------------------------------------
LTrim = function (str) {
    if (ToString(str) == "")
        return str;

    return str.replace(/(^\s*)/, "");
}

//-----------------------------------------------------------------------------
// 문자의 우 공백 제거
// @return : String
//-----------------------------------------------------------------------------
RTrim = function (str) {
    if (ToString(str) == "")
        return str;

    return str.replace(/(\s*$)/, "");
}

//-----------------------------------------------------------------------------
// 지정된길이만큼 문자열 잘라내고, 잘렸을 경우 추가 문자를 붙임(한글처리됨)
// @return : String
//-----------------------------------------------------------------------------
CutString = function (str, len, tail) {
    if (ToString(str) == "")
        return str;

    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len)
            return str.substring(0, i) + tail;
    }

    return str;
}

//-----------------------------------------------------------------------------
// 문자열의 byte 길이 반환
// @return : int
//-----------------------------------------------------------------------------
ByteLength = function (str) {
    if (ToString(str) == "")
        return 0;

    var cnt = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127)
            cnt += 2;
        else
            cnt++;
    }

    return cnt;
}

//-----------------------------------------------------------------------------
// 숫자에 3자리마다 , 를 찍어서 반환
// @return : String
//-----------------------------------------------------------------------------
ToMoney = function (str) {
    str = ToString(str);

    if (str == "")
        return str;

    var num = Trim(str);
    while ((/(-?[0-9]+)([0-9]{3})/).test(num)) {
        num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
    }

    return num;
}

//요금안내표 시니아 장애인 0원->하이픈
ToMoneyZero = function (str) {
    str = ToString(str);

    if (str == "")
        return str;

    var num = Trim(str);
    if (num == '0') {
        num = '-';
    }else{
        while ((/(-?[0-9]+)([0-9]{3})/).test(num)) {
            num = num.replace((/(-?[0-9]+)([0-9]{3})/), "$1,$2");
        }
    }

    return num;
}

//-----------------------------------------------------------------------------
// 숫자의 자리수(cnt)에 맞도록 반환
// @return : String
//-----------------------------------------------------------------------------
Digit = function (str, cnt, digit) {
    var returnValue = "";
    if (str.length < cnt) {
        for (var i = 0; i < cnt - str.length; i++) {
            returnValue += digit;
        }
    }

    return returnValue + str;
}

//-----------------------------------------------------------------------------
// 지정한 소숫점에서 반올림
// @return : int
//-----------------------------------------------------------------------------
RoundPoint = function (str, cipher) {
    var num = Trim(str);
    var cipstr = "";

    for (var i = 0; i < cipher; i++) {
        cipstr += "0";
    }
    cipstr = parseInt("1" + cipstr);

    num = (Math.round(num * cipstr)) / cipstr;

    return num;
}

//-----------------------------------------------------------------------------
// 특수문자 포함여부
// @return : boolean
//-----------------------------------------------------------------------------
IsSpecialCharacter = function (str) {
    var m_Sp = /[$\!\\@\\\#%\^\&\*\(\)\[\]\+\_\{\}\`\~\=\|\;\:\"\'\,\.\<\>\/\?/ ]/;
    var strLen = str.length;
    var m_char, Isresult
    for (var i = 0; i < strLen; i++) {
        m_char = str.charAt(i);
        if (m_char.search(m_Sp) != -1) {
            Isresult = true;
            break;
        }
        else {
            Isresult = false;
        }
    }

    return Isresult;
}
//-----------------------------------------------------------------------------
// 특수문자 제한함
// @return : 없음
//-----------------------------------------------------------------------------
ForbidSpecialChar = function (obj) {
    var $o = $(obj);
    var re = /[@\#$%^&*<>\()\-=+_'"]/gi;
    var temp = $o.val();
    if (re.test(temp)) { //특수문자가 포함되면 삭제하여 값으로 다시셋팅
        $o.val(temp.replace(re, ""));
    }
}

//-----------------------------------------------------------------------------
// 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
// @return : String
//-----------------------------------------------------------------------------
ExceptSpecialCharacter = function (str) {
    var result = ""

    for (var i = 0; i < str.length; i++) {
        if ((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/).test(str.charAt(i))) {
            result += str.charAt(i).replace((/([\$\(\)\*\+\.\[\]\?\\\^\{\}\|]{1})/), "\\$1");
        }
        else {
            result += str.charAt(i);
        }
    }
    return result;
}

//-----------------------------------------------------------------------------
// 정규식에 쓰이는 특수문자를 찾아서 이스케이프 한다.
// @return : String
//-----------------------------------------------------------------------------
RemoveSpecialCharacter = function (str, pattern) {
    return (pattern == null) ? str : eval("str.replace(/[" + ExceptSpecialCharacter(pattern) + "]/g, \"\")");
}

//-----------------------------------------------------------------------------
// 최소 최대 길이인지 검증
// str.isLength(min [,max])
// @return : boolean
//-----------------------------------------------------------------------------
CheckMinMaxLength = function (str) {
    var min = arguments[1];
    var max = arguments[2] ? arguments[2] : null;
    var success = true;

    if (str.length < min) {
        success = false;
    }
    if (max && str.length > max) {
        success = false;
    }
    return success;
}

//-----------------------------------------------------------------------------
// 최소 최대 바이트인지 검증
// str.isByteLength(min [,max])
// @return : boolean
//-----------------------------------------------------------------------------
CheckMinMaxByteLength = function (str) {
    var min = arguments[1];
    var max = arguments[2] ? arguments[2] : null;
    var success = true;

    if (ByteLength(str) < min) {
        success = false;
    }
    if (max && ByteLength(str) > max) {
        success = false;
    }
    return success;
}

//-----------------------------------------------------------------------------
// 숫자로 구성되어 있는지 학인
// arguments[1] : 허용할 문자셋
// @return : boolean
//-----------------------------------------------------------------------------
CheckNumber = function (str) {
    return (/^[0-9]+$/).test(RemoveSpecialCharacter(str, arguments[1])) ? true : false;
}

//-----------------------------------------------------------------------------
// 영어만 허용 - arguments[1] : 추가 허용할 문자들
// @return : boolean
//-----------------------------------------------------------------------------
CheckEnglish = function (str) {
    return (/^[a-zA-Z]+$/).test(RemoveSpecialCharacter(str, arguments[1])) ? true : false;
}

//-----------------------------------------------------------------------------
// 숫자와 영어만 허용 - arguments[1] : 추가 허용할 문자들
// @return : boolean
//-----------------------------------------------------------------------------
CheckEnglishNumber = function (str) {
    return (/^[0-9a-zA-Z]+$/).test(RemoveSpecialCharacter(str, arguments[1])) ? true : false;
}

//-----------------------------------------------------------------------------
// 아이디 체크 영어와 숫자만 체크 첫글자는 영어로 시작 - arguments[1] : 추가 허용할 문자들
// @return : boolean
//-----------------------------------------------------------------------------
CheckUserID = function (str) {
    return (/^[a-zA-z]{1}[0-9a-zA-Z]+$/).test(RemoveSpecialCharacter(str, arguments[1])) ? true : false;
}

//-----------------------------------------------------------------------------
// 한글 체크 - arguments[1] : 추가 허용할 문자들
// @return : boolean
//-----------------------------------------------------------------------------
CheckKorea = function (str) {
    return (/^[가-힣]+$/).test(RemoveSpecialCharacter(str, arguments[1])) ? true : false;
}

//-----------------------------------------------------------------------------
// 주민번호 체크 - arguments[1] : 주민번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
//-----------------------------------------------------------------------------
CheckJumin = function (str) {
    var arg = arguments[0] ? arguments[0] : "";
    var jumin = eval("str.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");

    if (jumin == null) {
        return false;
    }
    else {
        jumin = jumin.toString().num().toString();
    }
    // 생년월일 체크
    var birthYY = (parseInt(jumin.charAt(6)) == (1 || 2)) ? "19" : "20";
    birthYY += jumin.substr(0, 2);

    var birthMM = jumin.substr(2, 2) - 1;
    var birthDD = jumin.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);

    if (birthDay.getYear() % 100 != jumin.substr(0, 2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
        return false;
    }

    var sum = 0;
    var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
    var last = parseInt(jumin.charAt(12));

    for (var i = 0; i < 12; i++) {
        sum += parseInt(jumin.charAt(i)) * num[i];
    }
    return ((11 - sum % 11) % 10 == last) ? true : false;
}

//-----------------------------------------------------------------------------
// 외국인 등록번호 체크 - arguments[1] : 등록번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
//-----------------------------------------------------------------------------
CheckForeign = function (str) {
    var arg = arguments[1] ? arguments[1] : "";
    var jumin = eval("str.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[5678]{1}[0-9]{1}[02468]{1}[0-9]{2}[6789]{1}[0-9]{1}$/)");

    if (jumin == null) {
        return false;
    }
    else {
        jumin = jumin.toString().num().toString();
    }

    // 생년월일 체크
    var birthYY = (parseInt(jumin.charAt(6)) == (5 || 6)) ? "19" : "20";
    birthYY += jumin.substr(0, 2);
    var birthMM = jumin.substr(2, 2) - 1;
    var birthDD = jumin.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);

    if (birthDay.getYear() % 100 != jumin.substr(0, 2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
        return false;
    }
    if ((parseInt(jumin.charAt(7)) * 10 + parseInt(jumin.charAt(8))) % 2 != 0) {
        return false;
    }

    var sum = 0;
    var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
    var last = parseInt(jumin.charAt(12));

    for (var i = 0; i < 12; i++) {
        sum += parseInt(jumin.charAt(i)) * num[i];
    }
    return (((11 - sum % 11) % 10) + 2 == last) ? true : false;
}

//-----------------------------------------------------------------------------
// 사업자번호 체크 - arguments[1] : 등록번호 구분자
// XXX-XX-XXXXX
// @return : boolean
//-----------------------------------------------------------------------------
CheckBizNumber = function (str) {
    var arg = arguments[1] ? arguments[1] : "";
    var biznum = eval("str.match(/[0-9]{3}" + arg + "[0-9]{2}" + arg + "[0-9]{5}$/)");

    if (biznum == null) {
        return false;
    }
    else {
        biznum = biznum.toString().num().toString();
    }

    var sum = parseInt(biznum.charAt(0));
    var num = [0, 3, 7, 1, 3, 7, 1, 3];

    for (var i = 1; i < 8; i++) sum += (parseInt(biznum.charAt(i)) * num[i]) % 10;
    sum += Math.floor(parseInt(parseInt(biznum.charAt(8))) * 5 / 10);
    sum += (parseInt(biznum.charAt(8)) * 5) % 10 + parseInt(biznum.charAt(9));

    return (sum % 10 == 0) ? true : false;
}

//-----------------------------------------------------------------------------
// 법인 등록번호 체크 - arguments[1] : 등록번호 구분자
// XXXXXX-XXXXXXX
// @return : boolean
//-----------------------------------------------------------------------------
CheckCorpNumber = function (str) {
    var arg = arguments[1] ? arguments[1] : "";
    var corpnum = eval("str.match(/[0-9]{6}" + arg + "[0-9]{7}$/)");

    if (corpnum == null) {
        return false;
    }
    else {
        corpnum = corpnum.toString().num().toString();
    }

    var sum = 0;
    var num = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
    var last = parseInt(corpnum.charAt(12));

    for (var i = 0; i < 12; i++) {
        sum += parseInt(corpnum.charAt(i)) * num[i];
    }
    return ((10 - sum % 10) % 10 == last) ? true : false;
}

//-----------------------------------------------------------------------------
// 이메일의 유효성을 체크
// @return : boolean
//-----------------------------------------------------------------------------
CheckEmail = function (str) {
    return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(str.trim());
}

//-----------------------------------------------------------------------------
// 전화번호 체크 - arguments[1] : 전화번호 구분자
// @return : boolean
//-----------------------------------------------------------------------------
CheckPhone = function (str) {
    var arg = arguments[1] ? arguments[1] : "";
    return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(str)");
}

//-----------------------------------------------------------------------------
// 핸드폰번호 체크 - arguments[1] : 핸드폰 구분자
// @return : boolean
//-----------------------------------------------------------------------------
CheckMobile = function (str) {
    var arg = arguments[1] ? arguments[1] : "";
    return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(str)");
}

//-----------------------------------------------------------------------------
// 모든 문자 변환 - old : 이전문자, str : 변환문자
// @return : string
//-----------------------------------------------------------------------------
ReplaceAllCharacter = function (str, old, newStr) {
    return (str.split(old)).join(newStr);
}

//-----------------------------------------------------------------------------
// HTML 태그 제거
// @return : string
//-----------------------------------------------------------------------------
RemoveHTMLTags = function (str) {
    var pos1 = str.indexOf('<');

    if (pos1 == -1) {
        return str.replace(/&nbsp;/g, "").trim();
    }
    else {
        var pos2 = str.indexOf('>', pos1);
        if (pos2 == -1) return str;
        return (RemoveHTMLTags(str.substr(0, pos1) + str.substr(pos2 + 1))).replace(/&nbsp;/g, "").trim();
    }
}

//-----------------------------------------------------------------------------
// 파일 확장자만 가져오기
// @return : String
//-----------------------------------------------------------------------------
GetFileExtention = function (str) {
    return (str.indexOf(".") < 0) ? "" : str.substring(str.lastIndexOf(".") + 1, str.length);
}

//-----------------------------------------------------------------------------
// URL에서 파라메터 제거한 순수한 url 얻기
// @return : String
//-----------------------------------------------------------------------------    
GetURL = function (str) {
    var arr = str.split("?");
    arr = arr[0].split("#");
    return arr[0];
}

//-----------------------------------------------------------------------------
// URL에서 url 제거한 순수한 파라메터 얻기
// @return : String
//-----------------------------------------------------------------------------    
GetURLQueryString = function (str) {
    var arr = str.split("?");
    arr.splice(0, 1);
    return arr.join("?");
}


RequestParams = function(qs) {
	qs = qs.split("+").join(" ");

	var params = {}, tokens,
		re = /[?&]?([^=]+)=([^&]*)/g;

	while (tokens = re.exec(qs)) {
		params[decodeURIComponent(tokens[1])]
			= decodeURIComponent(tokens[2]);
	}

	return params;
}


BrowserAgent = function(){
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
}

//===================================
/**
 * @Content 이전 페이지로 이동
 *		영화관 존재 하지 않을 경우 모달 팝업에서 호출
 * @param
 * @return
 **/
locationBack = function () {
	history.back(-1);
	return;
}

//-----------------------------------------------------------------------------
// 이미지 파일 여부 확인
// @return : boolen, ture - 이미지 파일,  false - 이미지 파일아님
//-----------------------------------------------------------------------------    
checkImage = function (imagePath) {
	var result;
	try{
		var pointIndex = imagePath.lastIndexOf('.');
		if (pointIndex < 0) throw new Error("NO IMAGE");
		var extension = imagePath.substr(pointIndex).toLowerCase();
		if (extension == '.jpg' ||
			extension == ".png" ||
			extension == ".gif" ||
			extension == ".bmp")
			result = true;
		else
			result = false;

	} catch (e) {
		result = false;
	} finally {
		return result;
	}
	
}

Number.prototype.to2 = function () { return this < 10 ? '0' + this : this; }
Date.prototype.getYMD = function (s) {
    s = s || '-';
    return this.getFullYear() + s
         + (this.getMonth() + 1).to2() + s
         + this.getDate().to2();
}

Date.prototype.getYYMMDD = function () {
    var yy = this.getYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yy + (mm[1] ? mm : '0' + mm[0]) + (dd[1] ? dd : '0' + dd[0]);
}

/*
** 폼
**
** <input type="text" numberonly="true" />  // 숫자만 입력 가능한 텍스트박스
** <input type="text" floatOnly="true" />  // 숫자, dot(.)만 입력 가능한 텍스트박스
** <input type="text" nFloatOnly="true" />  // 숫자, dot(.), 하이픈(-)만 입력 가능한 텍스트박스
** <input type="text" datetimeonly="true" /> // 숫자, 콜론(:), 하이픈(-)만 입력 가능한 텍스트박스
*/
$(function () {
	$(document).on("keyup", "input:text[numberOnly]", function () { $(this).val($(this).val().replace(/[^0-9]/gi, "")); });
	$(document).on("keyup", "input:text[floatOnly]", function () { $(this).val($(this).val().replace(/[^0-9.]/gi, "")); });
	$(document).on("keyup", "input:text[nFloatOnly]", function () { $(this).val($(this).val().replace(/[^0-9.\-]/gi, "")); });
	$(document).on("keyup", "input:text[datetimeOnly]", function () { $(this).val($(this).val().replace(/[^0-9:\-]/gi, "")); });
});

//===================================
/**
 * @Content 정수값을 한글 금액(원단위)으로 변환
 * @param
 *		pWon : 정수(숫자)
 * @return
 *		changeWon : 한글 금액(원단위)
 **/
function setWon(pWon) {
	var won = (pWon + "").replace(/,/g, "");
	//var arrWon  = ["원", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
	var arrWon = ["", "만", "억", "조", "경", "해", "자", "양", "구", "간", "정"];
	var changeWon = "";
	var pattern = /(-?[0-9]+)([0-9]{4})/;
	while (pattern.test(won)) {
		won = won.replace(pattern, "$1,$2");
	}
	var arrCnt = won.split(",").length - 1;
	for (var ii = 0; ii < won.split(",").length; ii++) {
		if (arrWon[arrCnt] == undefined) {
			alert("값의 수가 너무 큽니다.");
			break;
		}
		var tmpwon = 0;
		for (i = 0; i < won.split(",")[ii].length; i++) {
			var num1 = won.split(",")[ii].substring(i, i + 1);
			tmpwon = tmpwon + Number(num1);
		}
		if (tmpwon > 0) {
			changeWon += won.split(",")[ii] + arrWon[arrCnt]; //55억0000만0000원 이런 형태 방지 0000 다 짤라 버린다
		}

		//changeWon += won.split(",")[ii]+arrWon[arrCnt];
		arrCnt--;
	}
	//alert(changeWon);
	return changeWon;
}
