
// 일반 메세지 팝업
// var popSet = new $.fn.modalPopGeneration({ type: 'message', code: 'COM001', lang:'KR', btns: true, btnParam1: false, btnParam2: true, elem:$(this) });
// {type: 'message', code: '메세지 코드', lang:'언어', btns:버튼여부(true,false), btnParam1:취소버튼 생성(true,false), btnParam2:확인버튼 생성(true,false), elem:$(this) - 클릭버튼 포커스 롤백}

// 컨폼 메세지 팝업
// var popSet = new $.fn.modalPopGeneration({ type: 'confirm', code: 'COM001', lang:'KR', btns: true, btnParam1: false, btnParam2: true, elem:$(this) });
// {type: 'confirm', code: '메세지 코드', lang:'언어', btns:버튼여부(true,false), btnParam1:취소버튼 생성(true,false), btnParam2:확인버튼 생성(true,false), elem:$(this) - 클릭버튼 포커스 롤백, closed: 취소버튼 클래스, confir: 확인버튼 클래스, execution: execution(실행함수명)}

// html 파싱 팝업
// var popSet = new $.fn.modalPopGeneration({ type: 'load', url:'html 위치 url', btns: true, btnParam1: false, btnParam2: true, elem:$(this) });
// {type: 'load', btns:버튼여부(true,false), btnParam1:취소버튼 생성(true,false), btnParam2:확인버튼 생성(true,false), elem:$(this) - 클릭버튼 포커스 롤백}

// 서버 메세지 팝업
// var popSet = new $.fn.modalPopGeneration({ type: 'server', lang:'KR', btns: true, btnParam1: false, btnParam2: true, elem:$(this) });
// {type: 'confirm', lang:'언어', btns:버튼여부(true,false), btnParam1:취소버튼 생성(true,false), btnParam2:확인버튼 생성(true,false), elem:$(this) - 클릭버튼 포커스 롤백, closed: 취소버튼 클래스, confir: 확인버튼 클래스, execution: execution(실행함수명)}

// elem:$(this) 속성은 필수로 넣어줘야 포커스 이동이 가능해짐
var ReturnUrl = '';
var Parameter = '';

$(function () {
    /************************************************************************************************* 
     *  Modal 팝업
    ************************************************************************************************/
    $.fn.modalPopGeneration = function (option) {
        // 2016.05.03 장착법
        var S = $.extend({ target: 'form', type: 'load', code: 't0101', lang: 'KR', url: CinemaServerDomain + '/LCHS/Contens/Cinema-Mall/cinema-select-popup.aspx', btns: true, btnParam1: false, btnParam2: false, elem: $(this), closed: '.pop_btn_close', confir: '.btnc_confirm', cancel: '.btnc_default', execution: null, execution2: null, executionRemove: null, 'execution_info': '', 'execution2_info': '', serverTitle: '', serverMessage: '', ReturnUrl: '', Parameter: '' }, option);

        this.target = $(S.target);
        this.type = S.type;
        this.title;
        this.cintent;
        this.urlTarget = S.urlTarget;
        this.url = S.url;
        this.elem = S.elem;
        this.closed = S.closed;
        this.confir = S.confir;
        this.cancel = S.cancel;
        this.execution = S.execution;
        this.execution2 = S.execution2;
        // 2016.05.03 장착법
        this.executionRemove = S.executionRemove;
        this.execution_info = S.execution_info;
        this.execution2_info = S.execution2_info;
        this.serverTitle = S.serverTitle;
        this.serverMessage = S.serverMessage;

        ReturnUrl = S.ReturnUrl;
        Parameter = S.Parameter;

        this.height = $(window).height();

        this.code = S.code;
        this.lang = S.lang;

        this.modalTotal = this.target.find('.pop_wrap').length;

        this.target.append('<div class="pop_wrap modal' + this.modalTotal + '" style="position:fixed; z-index:999' + this.modalTotal + '; height:' + this.height + 'px"></div>');

        this.popWrap = this.target.find('.modal' + this.modalTotal);

        if (this.type != 'load') {
            this.popWrap.append('<div class="pop_wrap_inner pop_cbox"></div>');

            this.popContent = this.popWrap.find('.pop_wrap_inner');
        };

        this.btns = S.btns;
        this.btnParam1 = S.btnParam1;
        this.btnParam2 = S.btnParam2;

        this.init();

        // 2016.05.03 장착법
        if (this.type == 'load') {
            $(this.popWrap).attr('tabindex', '0').show().focus();
        }
    };

    $.fn.modalPopGeneration.prototype = {
        init: function () {
            var T = this;

            // Document scroll 금지
            //$('html, body').on('mousewheel.disableScroll DOMMouseScroll.disableScroll touchmove.disableScroll', function (e) {
            //    e.preventDefault();
            //    return;
            //});

            $('html, body').on('keydown.disableScroll', function (e) {

                //var eventKeyArray = [32, 33, 34, 35, 36, 37, 38, 39, 40];
                // 2016.05.11 웹접근성
                var eventKeyArray = [33, 34, 35, 36, 37, 39];//space bar 해제(32), Keyboard Up(40), Down(38) 해제
                for (var i = 0; i < eventKeyArray.length; i++) {
                    if (e.keyCode === eventKeyArray[i]) {
                        e.preventDefault();
                        return;
                    }
                }
            });

            switch (this.type) { // 팝업 생성
                case 'message': // 메세지 팝업 생성
                    T.popContent.append('<div class="pop_header"><strong class="pop_tit"></strong></div>');
                    T.popContent.append('<div class="pop_body"><div class="pop_scroll"><p class="point_txt"></p></div></div>');
                    if (T.btns) {
                        var html = '<div class="btn_box btn_cbox">';
                        if (T.btnParam1) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_default">취소</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_default">Cancel</a>';
                            };
                        };
                        if (T.btnParam2) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">확인</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">Check</a>';
                            };
                        };
                        html += '</div>';
                        T.popContent.find('.pop_scroll').append(html);
                    };
                    T.popContent.find('.pop_scroll').append('<a href="javascript:void(0)" class="pop_btn_close pop_close"><img src="/LCHS/Image/Btn/btn_pop_close01.gif" alt="닫기"></a>');

                    T.title = T.popWrap.find('.pop_tit');
                    T.cintent = T.popWrap.find('.point_txt');

                    T.popContent.css({ 'margin-top': -(T.popContent.outerHeight() / 2), 'margin-left': -(T.popContent.outerWidth() / 2) });

                    T.messageLayer();

                    break;
                case 'load': // html 팝업 생성
                    T.popWrap.load(T.url, function (response, status) {
                        if (status == 'success') {
                            T.popWrap.find('.pop_wrap_inner').css({'visibility':'hidden', 'margin-left': -(T.popWrap.find('.pop_wrap_inner').outerWidth() / 2) });
                        };

                        T.event();
                    });
                    break;
                case 'confirm': // 메세지 팝업 생성
                    T.popContent.append('<div class="pop_header"><strong class="pop_tit"></strong></div>');
                    T.popContent.append('<div class="pop_body"><div class="pop_scroll"><p class="point_txt"></p></div></div>');
                    if (T.btns) {
                        var html = '<div class="btn_box btn_cbox">';
                        if (T.btnParam1) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_default">취소</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_default">Cancel</a>';
                            };
                        };
                        if (T.btnParam2) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">확인</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">Check</a>';
                            };
                        };
                        html += '</div>';
                        T.popContent.find('.pop_scroll').append(html);
                    };
                    T.popContent.find('.pop_scroll').append('<a href="javascript:void(0)" class="pop_btn_close pop_close"><img src="/LCHS/Image/Btn/btn_pop_close01.gif" alt="닫기"></a>');

                    T.title = T.popWrap.find('.pop_tit');
                    T.cintent = T.popWrap.find('.point_txt');

                    T.popContent.css({ 'margin-top': -(T.popContent.outerHeight() / 2), 'margin-left': -(T.popContent.outerWidth() / 2) });

                    // 2016.05.26 수정
                    if (T.serverMessage != '') {
                        T.popWrap.find('.pop_tit').text(T.serverTitle);
                        T.popWrap.find('.point_txt').html(T.serverMessage);
                        this.event();
                    }
                    else {
                        T.messageLayer();
                    }

                    break;
                case 'server':
                    T.popContent.append('<div class="pop_header"><strong class="pop_tit"></strong></div>');
                    T.popContent.append('<div class="pop_body"><div class="pop_scroll"><p class="point_txt"></p></div></div>');
                    if (T.btns) {
                        var html = '<div class="btn_box btn_cbox">';
                        if (T.btnParam1) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_default">취소</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_default">Cancel</a>';
                            };
                        };
                        if (T.btnParam2) {
                            if (T.lang == 'KR') {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">확인</a>';
                            } else {
                                html += '<a href="javascript:void(0);" class="btnc_confirm">Check</a>';
                            };
                        };
                        html += '</div>';
                        T.popContent.find('.pop_scroll').append(html);
                    };
                    T.popContent.find('.pop_scroll').append('<a href="javascript:void(0)" class="pop_btn_close pop_close"><img src="/LCHS/Image/Btn/btn_pop_close01.gif" alt="닫기"></a>');

                    T.popWrap.find('.pop_tit').text(T.serverTitle);
                    //T.popWrap.find('.point_txt').text(T.serverMessage);
                    T.popWrap.find('.point_txt').html(T.serverMessage);

                    T.popContent.css({ 'margin-top': -(T.popContent.outerHeight() / 2), 'margin-left': -(T.popContent.outerWidth() / 2) });

                    T.event();
                    break;
            };

            $(window).resize(function () { // 팝업 위치 조정
                T.popWrap.css({ 'height': $(window).height() });
            });
        },

        messageLayer: function () { // 메세지 출력
            var codeText = this.messageCodeSelector(this.code, this.lang);
            this.title.html(codeText.Title);
            this.cintent.html(codeText.Message);

            this.event();
        },

        event: function () { // 버튼 이벤트
            var T = this;

            T.popWrap.find('a').first().focus(); // 포커스 이동 이벤트

            T.popWrap.find(T.closed).on('click', function () { // 닫기버튼 이벤트
                //if (T.type == 'confirm') {	
                //	if (T.execution != null) {
                //		T.execution(T.execution_info);
                //	}
                //}
                T.remove();
            });

            if (T.type == 'message') {
                T.popWrap.find(T.confir).on('click', function () { // 확인버튼 이벤트
                    T.remove();
                });
            };

            if (T.type == 'confirm') {

                T.popWrap.find(T.confir).on('click', function () { // 확인버튼 이벤트
                    if (T.execution != null) {
                        T.execution(T.execution_info);
                    }
                    T.remove();
                });

                T.popWrap.find(T.cancel).on('click', function () {
                    if (T.execution2 != null) {
                        T.execution2(T.execution2_info);
                    }
                    T.remove();
                });

            } else if (T.type == 'server') {
                T.popWrap.find(T.confir).on('click', function () { // 확인버튼 이벤트
                    T.remove();
                });
            } else {
                T.popWrap.find(T.cancel).on('click', function () {
                    T.remove();
                });
            };

            if (T.type == 'load') {
                setTimeout(function () {
                    var insSum = 0;
                    var winHeight = $(window).height();
                    var wrapHeight = T.popWrap.find('.pop_wrap_inner').outerHeight();
                    var popHeight = T.popWrap.find('.pop_scroll').height();
                    var reHeight = wrapHeight - popHeight;

                    if (T.popWrap.find('div').hasClass('inner_scroll')) {
                        popHeight = T.popWrap.find('.inner_scroll').height();
                        reHeight = wrapHeight - popHeight;
                    };

                    var insInterval = setInterval(function () {
                        if (insSum > 5) {
                            T.popWrap.find('.pop_wrap_inner').css({ 'visibility': 'visible' });
                        };
                        if (insSum > 20) {
                            clearInterval(insInterval);
                        };

                        if (winHeight < wrapHeight) {
                            T.popWrap.find('.pop_wrap_inner').css({ 'top': 0, 'margin-top': 0, 'height': winHeight });

                            if (T.popWrap.find('div').hasClass('inner_scroll')) {
                                T.popWrap.find('.inner_scroll').css({ 'height': winHeight - reHeight });
                            } else {
                                T.popWrap.find('.pop_scroll').css({ 'height': winHeight - reHeight });
                            };
                        } else {
                            T.popWrap.find('.pop_wrap_inner').css({ 'margin-top': -(wrapHeight / 2) });
                        };
                        insSum++;
                    }, 50);

                }, 500);
            };
        },

        remove: function () {
            // Document scroll 정상화
            //$('html, body').off();
            this.elem.focus();

            // 2016.05.03 장착법
            if (this.executionRemove != null) {
                this.executionRemove();
            }

            this.popWrap.remove();
        },

        messageCodeSelector: function (code, lang) { // 메세지 셀렉터 이벤트
            return $.fn.messageChanger(code, lang);
        },
    };

    $.fn.messageChanger = function (code, lang) {
        var messageInfo = MessageLibrary[code];
        if (messageInfo == undefined) {
            return {
                Title: "에러",
                Message: "메시지에 문제가 있습니다."
            };
        } else if (lang == "KR") {
            return {
                Title: messageInfo.TitleKR,
                Message: messageInfo.MessageKR
            };
        } else if (lang == "EN") {
            return {
                Title: messageInfo.TitleEN,
                Message: messageInfo.MessageEN
            };
        };
    }

    $.fn.getMessageTitle = function (code, lang) {
        return $.fn.messageChanger(code, lang).Title;
    }
});

//영문 변환
//영문 변환해야할 문자열 태그 class명 마지막에 Lang-코드 추가해야함
ConvertLanguage = function () {
    $.each($("[class*='Lang-']"), function (i) {
        var cssName = $(this).attr("class")
        //var arrCssName = cssName.split("lng-")
        var sNo = cssName.indexOf("Lang-")
        var cssName2 = cssName.substring(sNo + 5, cssName.length)
        var eNo = cssName2.indexOf(" ")
        var code

        if (eNo == -1) {
            code = cssName2.substring(0, cssName2.length)
        }
        else {
            code = cssName2.substring(0, eNo)
        }

        var lang = new $.fn.messageChanger(code, Language);
        //영문으로 변환하기
        if (lang.Title != "에러")
            $(this).html(lang.Title);

        if (this.tagName == "INPUT") {
            $(this).val(lang.Title);
        }
    })
}

// 비회원 로그인 접근시 공통 메세지
var nonMemberMessage = "<br>회원 또는 소셜로그인 후 이용해 주십시오.";

var MessageLibrary = { // 메세지 라이브러리
    /*
        공통 메시지: COM0000
            공지형(1????,Validation..), 알림형(00??, 저장, 수정..), 오류형(05??)
        버튼 메시지: BTN0000
            저장, 수정, 취소, 확인
        라벨(다국어): LBL0000
            예매(0???), 그 외(1/2~???)
    */
    // ###### 공통 메시지 시작 ######
    "COM1000": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "최대 2개까지 선택하실 수 있습니다.", MessageEN: "Up to two can be selected." },
    "COM1001": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "최대 2개까지 선택하실 수 있습니다.", MessageEN: "Up to two can be selected." },
    "COM1002": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "상품정보가 없습니다.", MessageEN: "(EN)상품정보가 없습니다." },
    "COM2000": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "인원은 최대 8명까지 선택할 수 있습니다.", MessageEN: "Available number of audiences (people) is maximum 8." },
    "COM2100": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선택하신 좌석이 이미 예매되었습니다.", MessageEN: "Select your seats are already booking." },
    "COM2101": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "인원을 선택해 주십시오.", MessageEN: "Please select the personnel." },
    "COM2102": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "좌석을 선택해 주십시오.", MessageEN: "Please select your seats." },
    "COM2103": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "만 12세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에 관람이 가능합니다.", MessageEN: "Audiences under 12 years old in full age (including baby and kid) have to be accompanied with parents or adult guardians for watching." },
    "COM2104": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "만 15세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 성인 보호자의 동반하에 관람이 가능합니다.", MessageEN: "Audiences under 15 years old in full age (including baby and kid) have to be accompanied with parents or adult." },
    "COM2105": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "만 18세 미만의 고객님(영, 유아 포함)은 반드시 부모님 또는 보호자의 동반하여도 관람이 불가합니다. 만 18세 이상이지만 초/중/고 재학중 고객님은 영화관람이 불가합니다. 영화 관람 시, 신분증을 지참하여 주시기 바랍니다.", MessageEN: "Audiences under 18 years old in full age (including baby and kid) cannot watch even when accompanied by parents or guardians. Audiences who are over 18 years old in full age but attending elementary, middle or high school cannot watch the movie. For entrance, please bring your ID." },
    "COM2106": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "티켓발권을 위해 복지카드를 가지고<br>영화관 인포메이션 데스크를 방문해주세요.<br>(장애1~3등급 : 동반 1인 포함 할인 가능<br>/ 장애4~6등급 : 본인만 할인 가능)", MessageEN: "For ticket printing, please bring your welfare card and visit theater information desk.<br />(1~3 level : discount for one more accompanier / <br />4~6 level : discount for his ticket.)" },
    "COM2107": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "티켓발권을 위해 본인의 신분증(만 65세 이상)을 가지고 영화관 인포메이션 데스크에 방문해주세요.", MessageEN: "For ticket printing, please bring your ID card and visit theater information desk.<br />(65 years later)" },
    "COM2108": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "티켓발권을 위하여 반드시 국가유공자증을 소지하신 후 영화관 인포메이션 데스크로 방문하여 주시기 바랍니다.", MessageEN: "For ticket printing, please bring your ID card and visit theater information desk." },
    // 영화관 - 영화관 상세 - 선호영화관
    "COM1003": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "MY영화관은 최대 3개까지 등록하실 수 있습니다.", MessageEN: "Up to three can be selected." },
    // 로그인 - 회원
    "COM1004": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "아이디를 입력해 주십시오.", MessageEN: "Please enter your ID." },
    "COM1005": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호를 입력해 주십시오.", MessageEN: "Please enter your password." },
    // 로그인 - 비회원
    "COM1006": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "예매 확인/취소 또는 예매를 선택해 주십시오.", MessageEN: "(EN)예매 확인/취소 또는 예매를 선택해 주십시오." },
    "COM1007": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "개인정보 취급에 대한  동의를 해야 비회원 로그인 가능합니다.", MessageEN: "(EN)취급에 대한  동의를 해야 비회원 로그인 가능합니다." },
    "COM1008": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이름을 입력해 주십시오.", MessageEN: "(EN)이름을 입력해 주십시오." },
    "COM1009": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "생년월일을 입력해 주십시오.", MessageEN: "(EN)생년월일을 입력해 주십시오." },
    "COM1010": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "휴대폰 번호를 입력해 주십시오.", MessageEN: "(EN)휴대폰 번호를 입력해 주십시오." },
    "COM1011": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "아이디 또는 비밀번호가 맞지 않습니다.", MessageEN: "(EN)아이디 또는 비밀번호가 맞지 않습니다." },
    "COM1012": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "생년월일은 6자리로 입력해 주십시오.", MessageEN: "(EN)생년월일은 6자리로 입력해 주십시오." },
    "COM1013": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "휴대폰 번호는 4자리로 입력해 주십시오.", MessageEN: "(EN)휴대폰 번호는 4자리로 입력해 주십시오." },
    "COM1014": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호는 4자리로 입력해 주십시오.", MessageEN: "(EN)비밀번호는 4자리로 입력해 주십시오." },
    "COM1015": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이름은 한글, 영문만 입력해 주십시오.", MessageEN: "(EN)이름은 한글, 영문만 입력해 주십시오." },
    "COM1016": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 휴대폰 번호를 입력해 주십시오.", MessageEN: "(EN)올바른 휴대폰 번호를 입력해 주십시오." },
    "COM1017": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 비밀번호를 입력해 주십시오.", MessageEN: "(EN)올바른 비밀번호를 입력해 주십시오." },
    "COM1018": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호가 일치하지 않습니다.", MessageEN: "(EN)비밀번호가 일치하지 않습니다." },
    "COM1019": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "숫자만 입력 가능합니다.", MessageEN: "Only numbers can be entered." },

    //검색
    "COM1021": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "검색어를 입력하세요.", MessageEN: "(EN)검색어를 입력하세요." },
    "COM1022": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "검색할 항목을 선택하세요.", MessageEN: "(EN)검색할 항목을 선택하세요." },

    "COM1023": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "거래번호를 입력하세요.", MessageEN: "(EN)거래번호를 입력하세요." },
    "COM1023_2": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "예매번호를 입력하세요.", MessageEN: "(EN)예매번호를 입력하세요." },
    "COM1024": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "나의 관람영화 등록이 완료되었습니다.", MessageEN: "(EN)나의 관람영화 등록이 완료되었습니다." },
    "COM1025": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "리뷰를 작성해 주십시오.", MessageEN: "(EN)리뷰를 작성해 주십시오." },
    "COM1026": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "평점을 입력해 주십시오.", MessageEN: "(EN)평점을 입력해 주십시오." },
    "COM1027": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "고객님의 평점 및 영화 리뷰 작성이 완료되었습니다.", MessageEN: "(EN)고객님의 평점 및 영화 리뷰 작성이 완료되었습니다." },
    "COM1028": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "고객님의 평점 및 영화 리뷰 수정이 완료되었습니다.", MessageEN: "(EN)고객님의 평점 및 영화 리뷰 수정이 완료되었습니다." },
    "COM1029": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이미 작성된 글이 있습니다.", MessageEN: "(EN)이미 작성된 글이 있습니다." },
    "COM1030": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "고객님의 리뷰 삭제가 완료되었습니다.", MessageEN: "(EN)고객님의 리뷰 삭제가 완료되었습니다." },
    "COM1031": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당 영화 관람내역을 삭제 하시겠습니까?", MessageEN: "(EN)해당 영화 관람내역을 삭제 하시겠습니까?" },
    "COM1032": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람 내역 삭제가 완료되었습니다.", MessageEN: "(EN)관람 내역 삭제가 완료되었습니다." },
    "COM1033": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "추천이 완료되었습니다.", MessageEN: "(EN)추천이 완료되었습니다." },

    "COM1034": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "검색기간을 확인해 주십시오.", MessageEN: "(EN)검색기간을 확인해 주십시오." },
    // 마이시네마 - 관람권/할인권/vip 쿠폰
    "COM1035": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선택된 항목이 없습니다.", MessageEN: "(EN)선택된 항목이 없습니다." },
    "COM1036": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당 관람권 내역을 삭제 하시겠습니까?", MessageEN: "(EN)해당 관람권 내역을 삭제 하시겠습니까?" },
    "COM1037": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람권 내역 삭제가 완료되었습니다.", MessageEN: "(EN)관람권 삭제가 완료되었습니다." },
    "COM1038": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당 할인권 내역을 삭제 하시겠습니까?", MessageEN: "(EN)해당 관람내역을 삭제 하시겠습니까?" },
    "COM1039": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "할인권 내역 삭제가 완료되었습니다.", MessageEN: "(EN)할인권 내역 삭제가 완료되었습니다." },
    "COM1040": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "삭제 처리를 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다.", MessageEN: "(EN)삭제 처리를 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다." },

    "COM1041": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "삭제하신 리뷰는 복구할 수 없습니다.<br/>리뷰를 재 등록시에도 포인트는 다시 지급되지 않습니다.<br/>정말 리뷰를 삭제하시겠습니까?", MessageEN: "(EN)삭제하신 리뷰는 복구할 수 없습니다.<br/>리뷰를 재 등록시에도 포인트는 다시 지급되지 않습니다.<br/>정말 리뷰를 삭제하시겠습니까?" },

    // 마이시네마 - 관람권/할인권/vip 쿠폰 - 관람(할인)권 등록
    "COM1042": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람(할인)권 번호를 입력해 주십시오.", MessageEN: "(EN)관람(할인)권 번호를 입력해 주십시오." },
    "COM1043": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 관람(할인)권 번호를 입력해 주십시오.", MessageEN: "(EN)올바른 관람(할인)권 번호를 입력해 주십시오." },
    "COM1044": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람(할인)권 앞자리는 6자리로 입력해 주십시오.", MessageEN: "(EN)관람(할인)권 앞자리는 6자리로 입력해 주십시오." },
    "COM1045": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람(할인)권 뒷자리는 7자리로 입력해 주십시오.", MessageEN: "(EN)관람(할인)권 뒷자리는 7자리로 입력해 주십시오." },

    "COM1046": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "나의 관람영화 등록을 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다.", MessageEN: "(EN)나의 관람영화 등록을 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다." },
    "COM1047": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람 내역 삭제를 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다.", MessageEN: "(EN)관람 내역 삭제를 실패 하였습니다. 잠시 후 다시 시도해 주시길 바랍니다." },

    // 고객센터 - 단체관람문의 -  등록
    "COM1051": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "개인정보 수집 동의를 해주셔야 등록이 가능합니다.", MessageEN: "(EN)개인정보 수집 동의를 해주셔야 등록이 가능합니다." },
    "COM1052": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "단체명을 입력해 주십시오.", MessageEN: "(EN)단체명을 입력해 주십시오." },
    "COM1053": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "신청자명을 입력해 주십시오.", MessageEN: "(EN)신청자명을 입력해 주십시오." },
    "COM1054": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "연락처를 입력해 주십시오.", MessageEN: "(EN)연락처를 입력해 주십시오." },
    "COM1055": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 연락처 번호를 입력해 주십시오.", MessageEN: "(EN)올바른 연락처 번호를 입력해 주십시오." },
    "COM1056": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일을 입력해 주십시오.", MessageEN: "(EN)이메일을 입력해 주십시오." },
    "COM1057": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일 도메인을 선택해 주십시오.", MessageEN: "(EN)이메일 도메인을 선택해 주십시오." },
    "COM1058": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일 도메인을 직접 입력해 주십시오.", MessageEN: "(EN)이메일 도메인을 직접 입력해 주십시오." },
    "COM1059": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일 형식이 일치하지 않습니다.", MessageEN: "(EN)이메일 형식이 일치하지 않습니다." },
    "COM1060": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분류를 선택해 주십시오.", MessageEN: "(EN)분류를 선택해 주십시오." },
    "COM1061": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "예상 인원은 숫자만 입력 가능합니다.", MessageEN: "Only numbers can be entered." },
    "COM1062": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "희망 시간은 숫자만 입력 가능합니다.", MessageEN: "Only numbers can be entered." },
    "COM1063": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "영화관을 선택해 주십시오.", MessageEN: "(EN)영화관을 선택해 주십시오." },
    "COM1064": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "제목을 입력해 주십시오.", MessageEN: "(EN)제목을 입력해 주십시오." },
    "COM1065": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "특이사항을 입력해 주십시오.", MessageEN: "(EN)특이사항을 입력해 주십시오." },
    "COM1066": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "상태를 변경하시면 입력값이 초기화 됩니다.<br>변경하시겠습니까?.", MessageEN: "(EN)상태를 변경하시면 입력값이 초기화 됩니다.<br>변경하시겠습니까?" },
    "COM1067": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "저장 하시겠습니까?", MessageEN: "(EN)저장 하시겠습니까?" },
    "COM1068": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "취소 하시겠습니까?", MessageEN: "(EN)취소 하시겠습니까?" },
    "COM1069": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "저장 실패", MessageEN: "(EN)저장 실패" },
    "COM1070": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 희망시간을 입력해 주십시오.", MessageEN: "(EN)올바른 희망시간을 입력해 주십시오." },

    // 고객센터 - 1:1문의 등록
    "COM1071": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "등록 가능한 파일이 아닙니다.", MessageEN: "(EN)등록 가능한 파일이 아닙니다." },
    "COM1072": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "2MB 이상의 파일은 업로드 하실수 없습니다.", MessageEN: "(EN)2MB 이상의 파일은 업로드 하실수 없습니다." },
    "COM1073": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "연락처를 선택해 주십시오.", MessageEN: "(EN)연락처를 선택해 주십시오." },
    "COM1074": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "성명을 입력해 주십시오.", MessageEN: "(EN)성명을 입력해 주십시오." },
    "COM1075": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "jpg, jpeg, png, bmp, pdf 파일만 업로드가 가능 합니다.", MessageEN: "(EN)jpg, jpeg, png, bmp, pdf 파일만 업로드가 가능 합니다." },
    "COM1076": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원 문의 시 이메일로 답변받기는 필수입니다.", MessageEN: "(EN)비회원 문의 시 이메일로 답변받기는 필수입니다." },
    "COM1077": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "문의종류를 선택해 주십시오.", MessageEN: "(EN)문의종류를 선택해 주십시오." },

    "COM1078": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "잘못된 휴대폰 번호입니다. 휴대폰 번호를 확인주십시오.", MessageEN: "(EN) 잘못된 휴대폰 번호입니다. 휴대폰 번호를 확인주십시오." },
    "COM1079": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일 아이디를 입력해주십시오.", MessageEN: "(EN) 이메일 아이디를 입력해주십시오." },
    "COM1080": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이메일 도메인을 입력해주십시오.", MessageEN: "(EN) 이메일 도메인을 입력해주십시오." },
    "COM1081": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분류를 선택해주십시오.", MessageEN: "(EN) 분류를 선택해주십시오." },
    "COM1082": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "소분류를 선택해주십시오.", MessageEN: "(EN) 소분류를 선택해주십시오." },
    "COM1083": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "제목을 입력해주십시오.", MessageEN: "(EN) 제목을 입력해주십시오." },
    "COM1084": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "내용을 입력해주십시오.", MessageEN: "(EN) 내용을 입력해주십시오." },
    "COM1085": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "제목은 한글 기준 40자를 넘을 수없습니다.", MessageEN: "(EN) 제목은 한글 기준 40자를 넘을 수없습니다." },
    "COM1086": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "내용은 한글 기준 2000자를 넘을 수없습니다.", MessageEN: "(EN) 내용은 한글 기준 2000자를 넘을 수없습니다." },
    "COM1087": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "내용을 입력해주십시오.", MessageEN: "(EN) 내용을 입력해주십시오." },
    "COM1088": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "입력된 내용을 등록 하겠습니까?", MessageEN: "(EN) 입력된 내용을 등록 하겠습니까?" },
    "COM1089": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "입력을 취소하겠습니까?", MessageEN: "(EN) 입력을 취소하겠습니까?" },

    "COM1090": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이미 작성된 리뷰가 있습니다.", MessageEN: "(EN) 이미 작성된 리뷰가 있습니다." },
    "COM1091": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "추천이 해제되었습니다.", MessageEN: "(EN) 추천이 해제되었습니다." },
    "COM1093": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "시작문자를 공백으로 시작 하실 수 없습니다.", MessageEN: "(EN) 시작문자를 공백으로 시작 하실 수 없습니다." },


    // 시네마몰
    "COM1100": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "카테고리 또는 메뉴 이동 시 당음 상품이 초기화 됩니다. 이동하시겠습니까?", MessageEN: "(EN) 카테고리 또는 메뉴 이동 시 당음 상품이 초기화 됩니다. 이동하시겠습니까?" },
    "COM1101": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "담은 상품이 없습니다.", MessageEN: "(EN) 담은 상품이 없습니다." },
    "COM1102": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "담은 상품은 삭제됩니다.<br/> 구매를 하시겠습니까?", MessageEN: "(EN) 담은 상품은 삭제됩니다.<br/> 구매를 하시겠습니까?" },
    "COM1103": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "휴대폰 중간자리는 3~4 자리수가 필요합니다.", MessageEN: "(EN) 휴대폰 중간자리는 3~4 자리수가 필요합니다." },
    "COM1104": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "휴대폰 마지막자리는 4 자리수가 필요합니다.", MessageEN: "(EN) 휴대폰 마지막자리는 4 자리수가 필요합니다." },
    "COM1105": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "수량은 1개이상 선택하셔야 합니다.", MessageEN: "(EN) 수량은 1개이상 선택하셔야 합니다." },
    "COM1106": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "메세지 내용을 입력하세요.", MessageEN: "(EN) 메세지 내용을 입력하세요." },
    "COM1107": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선물 받으실분을 한분이상 등록하셔야 합니다.", MessageEN: "(EN) 선물 받으실분을 한분이상 등록하셔야 합니다." },
    "COM1108": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선물 보내실 수량은 구매 수량 이하만 가능합니다.", MessageEN: "(EN) 선물 보내실 수량은 구매 수량 이하만 가능합니다." },
    "COM1109": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "정회원만 사용가능 합니다.", MessageEN: "(EN) 정회원만 사용가능 합니다." },
    "COM1110": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "주문번호 생성에 실패했습니다.<br/> 다시 시도해 주십시오", MessageEN: "(EN) 주문번호 생성에 실패했습니다.<br/> 다시 시도해 주십시오" },
    "COM1111": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "담은상품 영역에 상품이 저장되었습니다. 확인하시겠습니까?", MessageEN: "(EN) 담은상품 영역에 상품이 저장되었습니다. 확인하시겠습니까?" },
    "COM1112": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당상품을 구매하시겠습니까?", MessageEN: "(EN) 해당상품을 구매하시겠습니까?" },
    "COM1113": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당상품을 선물하시겠습니까?", MessageEN: "(EN) 해당상품을 선물하시겠습니까?" },
    "COM1114": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선물정보가 초기화 됩니다.취소하시겠습니까?", MessageEN: "(EN) 선물정보가 초기화 됩니다.취소하시겠습니까?" },
    "COM1115": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선택하신 상품 저장이 실패했습니다. 다시 시도해 주십시오.", MessageEN: "(EN) 선택하신 상품 저장이 실패했습니다. 다시 시도해 주십시오." },
    "COM1116": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "옵션을 선택해 주십시오.", MessageEN: "Please select an option." },
    "COM1117": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "바로구매 시 담은상품이 초기화 됩니다. 구매를 진행하시겠습니까?", MessageEN: "(EN) 바로구매 시 담은상품이 초기화 됩니다. 구매를 진행하시겠습니까?" },
    "COM1118": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 상품을 선물할수 없습니다.<br/> 회원 또는 소셜로그인 후 이용해 주십시요.", MessageEN: "(EN) 비회원은 상품을 구매할수 없습니다.<br/> 회원 또는 소셜로그인 후 이용해 주십시요." },
    "COM1119": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 상품을 구매할수 없습니다.<br/> 회원 또는 소셜로그인 후 이용해 주십시요.", MessageEN: "(EN) 비회원은 상품을 구매할수 없습니다.<br/> 회원 또는 소셜로그인 후 이용해 주십시요." },
    "COM1120": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "선물 보내실 수량과 구매 수량이 일치 하지 않습니다.", MessageEN: "(EN) 선물 보내실 수량과 구매 수량이 일치 하지 않습니다." },
    "COM1121": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "1+1 시네티콘은</br>특별 판매상품으로<br/>환불 불가합니다.", MessageEN: "(EN) 1+1 시네티콘은</br>특별 판매상품으로<br/>환불 불가합니다." },//20170109 sunho 시네티콘 문구 추가 

    // 고객센터 - 분실물접수
    "COM1131": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "성명을 입력해 주십시오.", MessageEN: "(EN)성명을 입력해 주십시오." },
    "COM1132": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분실일을 입력해 주십시오.", MessageEN: "(EN)분실일을 입력해 주십시오." },
    "COM1133": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분실시간을 입력해 주십시오.", MessageEN: "(EN)분실시간을 입력해 주십시오." },
    "COM1134": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분실시간은 숫자만 입력 가능합니다.", MessageEN: "Only numbers can be entered." },
    "COM1135": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "올바른 분실시간을 입력해 주십시오.", MessageEN: "(EN)올바른 분실시간을 입력해 주십시오." },
    "COM1136": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분실물 종류를 입력해 주십시오.", MessageEN: "(EN)분실물 종류를 입력해 주십시오." },
    "COM1137": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "분실물 색상을 입력해 주십시오.", MessageEN: "(EN)분실물 색상을 입력해 주십시오." },

    // 마이시네마 - 이벤트 공통
    "COM1151": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "Mobile 전용 이벤트 입니다.", MessageEN: "(EN)Mobile 전용 이벤트 입니다." },
    "COM1152": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "문의 내역을 삭제 하시겠습니까?", MessageEN: "(EN)문의 내역을 삭제 하시겠습니까?" },

    //이벤트 20160330 룰렛이벤트 안내 문구 추가 COM1163 - 박훈철
    "COM1161": { TitleKR: "알림", TitleEN: "Notice", MessageKR: "이미 예매내역이 있습니다.<br/>응모하시겠습니까?", MessageEN: "(EN)이미 예매내역이 있습니다.<br/>응모하시겠습니까?" },
    "COM1162": { TitleKR: "알림", TitleEN: "Notice", MessageKR: "이벤트 기간내 구매내역이 있습니다.<br/>응모하시겠습니까?", MessageEN: "(EN)이벤트 기간내 구매내역이 있습니다.<br/>응모하시겠습니까?" },
    "COM1163": { TitleKR: "알림", TitleEN: "Notice", MessageKR: "마이시네마>나의 쿠폰함에서<br/>당첨된 쿠폰을 확인해주세요.", MessageEN: "(EN)마이시네마>나의 쿠폰함에서<br/>당첨된 쿠폰을 확인해주세요." },
    "COM1164": { TitleKR: "알림", TitleEN: "Notice", MessageKR: "꽝! 내일 다시 도전하세요.", MessageEN: "(EN)꽝! 내일 다시 도전하세요." },

    // 비회원 페이지 접근
    // 영화 > 상세 > 평점 및 영화 리뷰 달기
    "COM1201": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 영화 리뷰를 작성할 수 없습니다." + nonMemberMessage, MessageEN: "(EN)비회원은 영화 리뷰를 작성할 수 없습니다." + nonMemberMessage },
    // 영화관 > 상세 > MY영화관 등록
    // 팝콘몰 > MY영화관
    "COM1202": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 MY 영화관을 설정할 수 없습니다." + nonMemberMessage, MessageEN: "(EN)비회원은 MY 영화관을 설정할 수 없습니다." + nonMemberMessage },
    // 팝콘몰 > 구매하기
    // 시네몰 > 구매하기
    "COM1203": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 상품을 구매할 수 없습니다." + nonMemberMessage, MessageEN: "(EN)비회원은 상품을 구매할 수 없습니다." + nonMemberMessage },
    // 이벤트 > 상세 > 응모하기 또는 예매하기
    // 이벤트 > 상세 > 댓글 입력
    "COM1204": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 이벤트 참여를 할 수 없습니다." + nonMemberMessage, MessageEN: "(EN)비회원은 이벤트 참여를 할 수 없습니다." + nonMemberMessage },
    // 시네몰 > 선물하기
    "COM1205": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비회원은 상품을 선물할 수 없습니다." + nonMemberMessage, MessageEN: "(EN)비회원은 상품을 선물할 수 없습니다." + nonMemberMessage },
    // 영화 상세 > 상영 예정작 > 리뷰 등록
    "COM1206": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람 후, 등록이 가능합니다.", MessageEN: "(EN)관람 후, 등록이 가능합니다." },

	// vip쿠폰 사용불가 영화관
    "COM1211": { TitleKR: "사용불가 영화관", TitleEN: "Notice", MessageKR: "강동 / 성남 / 성남신흥 / 서귀포 / 브로드웨이 / 누리꿈", MessageEN: "강동 / 성남 / 성남신흥 / 서귀포 / 브로드웨이 / 누리꿈" },
    "COM1212": { TitleKR: "사용가능 영화관", TitleEN: "Notice", MessageKR: "경주 / 통영 / 강동 / 용인 / 양산 / 목포 /<br />진주 / 구미 / 군산 / 프리미엄칠곡 / 산본 /<br />충장로 / 마산터미널 / 장안 / 서산 / 강남(씨티) /<br />부천역 / 청주충대 / 해운대 / 오산", MessageEN: "경주 / 통영 / 강동 / 용인 / 양산 / 목포 /<br />진주 / 구미 / 군산 / 프리미엄칠곡 / 산본 /<br />충장로 / 마산터미널 / 장안 / 서산 / 강남(씨티) /<br />부천역 / 청주충대 / 해운대 / 오산" },
    // 20160823 - 5.일부 영화관에서는 사용이 불가합니다. 사용불가 영화관
    "COM1213": { TitleKR: "사용불가 영화관", TitleEN: "Notice", MessageKR: "경주 / 통영 / 강동 / 용인 / 양산 / 목포 /<br />진주 / 구미 / 군산 / 프리미엄칠곡 / 산본 /<br />충장로 / 마산터미널 / 장안 / 서산 / 누리꿈 /<br />부천역 / 청주충대 / 해운대 / 오산 / 브로드웨이 / 향남 /<br />성남 / 성남신흥 / 서귀포 / 남원주", MessageEN: "경주 / 통영 / 강동 / 용인 / 양산 / 목포 /<br />진주 / 구미 / 군산 / 프리미엄칠곡 / 산본 /<br />충장로 / 마산터미널 / 장안 / 서산 / 누리꿈 /<br />부천역 / 청주충대 / 해운대 / 오산 / 브로드웨이 / 향남 /<br />성남 / 성남신흥 / 서귀포 / 남원주" },
    // 20160823 - 6.쿠폰 수령 후 매점에서 해당 상품으로 교환 가능합니다. 사용가능 영화관
    "COM1214": { TitleKR: "사용가능 영화관", TitleEN: "Notice", MessageKR: "경주 / 통영 / 용인 / 양산 / 목포 / 진주 /<br />구미 / 군산 / 프리미엄칠곡 / 산본 / 충장로 /<br />마산터미널 / 장안 / 서산 / 누리꿈 / 부천역 /<br />청주충대 / 해운대 / 오산", MessageEN: "경주 / 통영 / 용인 / 양산 / 목포 / 진주 /<br />구미 / 군산 / 프리미엄칠곡 / 산본 / 충장로 /<br />마산터미널 / 장안 / 서산 / 누리꿈 / 부천역 /<br />청주충대 / 해운대 / 오산" },

    //================================================================================
    // start Error
    "COM0501": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "준비중입니다.(할인및 포인트 코드에 대한 페이지 경로가 없을경우) ", MessageEN: "(EN)준비중입니다." },
    "COM0502": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "점검중입니다.(ajax load error발생할경우)", MessageEN: "(EN)점검중입니다." },
    "COM0503": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "로그인되지 않았습니다.<br/><br/>메인화면으로 이동합니다.", MessageEN: "(EN)로그인되지 않았습니다.<br/><br/>메인화면으로 이동합니다." },
    "COM0504": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "로그인을 하세요.", MessageEN: "(EN)로그인을 하세요." },
    "COM0505": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "<p>오류가 발생하였습니다.</p><p>관리자에게 문의하세요.</p>", MessageEN: "(EN)<p>오류가 발생하였습니다.</p><p>관리자에게 문의하세요.</p>" },
    "COM0601": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람권(할인권)을 선택해 주십시오.", MessageEN: "Please select ticket/discount coupon." },
    "COM0602": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람권(할인권) 번호를 확인해 주세요.", MessageEN: "Please check your ticket number." },
    "COM0603": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람권(할인권) 번호를 입력해 주세요.", MessageEN: "Please enter your ticket number." },
    "COM0604": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호 정보를 확인해 주세요.", MessageEN: "Please check your password information." },
    "COM0605": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호를 입력해 주세요.", MessageEN: "Please enter your password." },
    "COM0606": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "숫자만 입력 가능합니다.", MessageEN: "Only numbers can be entered." },
    "COM0607": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "카드번호를 입력해 주세요.", MessageEN: "Please enter your card number." },
    "COM0608": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "카드 비밀번호를 확인해 주세요.", MessageEN: "se check your card password number." },
    "COM0609": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "사용 가능한 포인트를 입력 후 적용해 주세요.", MessageEN: "Please enter usable point and apply." },
    "COM0610": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "사용 가능한 포인트가 부족합니다.", MessageEN: "Usable point is insufficient." },
    "COM0611": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "포인트 조회 후 사용해 주세요.", MessageEN: "Please use after checking your point." },
    "COM0612": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "생년월일 정보를 확인해 주세요.", MessageEN: "Please enter birth date information." },
    "COM0613": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "유효기간 정보를 확인해 주세요.", MessageEN: "Please enter expiration date information." },
    "COM0614": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "생년월일 정보를 입력해 주세요.", MessageEN: "Please enter birth date information." },
    "COM0615": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "유효기간 정보를 입력해 주세요.", MessageEN: "Please enter expiration date information." },
    "COM0616": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "카드번호 정보를 입력해 주세요.", MessageEN: "Please enter your card number." },
    "COM0617": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "포인트는 100p단위로 사용 가능합니다.", MessageEN: "Point can be used by 100p unit." },
    "COM0618": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "관람권(or 할인권)을 선택해 주세요.", MessageEN: "Please select ticket/discount coupon." },
    "COM0619": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "할인 적용 후 최소 결제금액이 N원 이상이어야 합니다.", MessageEN: "After discount application, minimum payment price should be over KRW N." },
    "COM0620": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "결제금액을 다시 확인해주세요.", MessageEN: "Please re-check your payment price." },
    "COM0621": { TitleKR: "안내", TitleEN: "Notice", TitleEN: "(EN)선택한 할인수단으로 발생한 할인금액이 0원 이하일 때", MessageKR: "결제금액을 다시 확인해 주십시오.", MessageEN: "Please re-check your payment price." },
    "COM0622": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "입력하신 포인트가 결제금액보다 많습니다. 남은 결제금액만큼 자동차감합니다.", MessageEN: "Entered point is more than payment price. Remaining payment price will be deducted automatically." },
    "COM0623": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "현대M포인트, OK캐쉬백, GS포인트, 삼성재적립포인트는 함께 사용하실 수 없습니다.", MessageEN: "Hyundai M point, OK cashbag, GS point, Samsung Reaccumulation point cannot be used together." },
    "COM0624": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "이미 등록된 관람권(할인권)입니다.", MessageEN: "This ticket is already registered." },

    "COM0625": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "KB 포인트리 사용시 사용 가능한 포인트 만큼 자동으로 차감되어지며, 포인트 부족 시 나머지 결제 금액은 KB카드로 자동 결제 됩니다.", MessageEN: "(EN)KB 포인트리 사용시 사용 가능한 포인트 만큼 자동으로 차감되어지며, 포인트 부족 시 나머지 결제 금액은 KB카드로 자동 결제 됩니다." },
    "COM0626": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "씨티포인트 사용시 사용 가능한 포인트 만큼 자동으로 차감되어지며, 포인트 부족 시 나머지 결제 금액은 씨티카드로 자동 결제 됩니다.", MessageEN: "(EN)씨티포인트 사용시 사용 가능한 포인트 만큼 자동으로 차감되어지며, 포인트 부족 시 나머지 결제 금액은 씨티카드로 자동 결제 됩니다." },

    "COM0627": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "사용 매수를 선택해 주십시오.", MessageEN: "(EN)사용 매수를 선택해 주십시오." },
    "COM0628": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "팝업이 차단되어 결제를 진행할 수 없습니다.", MessageEN: "(EN)팝업이 차단되어 결제를 진행할 수 없습니다." },
    "COM0629": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "결제수단을 선택해 주십시오.", MessageEN: "Please select your payment method." },
    "COM0630": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "좌석할당시간 10분이 초과되었습니다.<br/>결제하기 버튼을 눌러 결제과정을 다시 시작해주십시오.", MessageEN: "(EN)좌석할당시간 10분이 초과되었습니다.<br/>결제하기 버튼을 눌러 결제과정을 다시 시작해주십시오." },
    "COM0631": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "좌석 할당시간 10분이 초과되었습니다.<br/>연장하시겠습니까?<br/>(취소버튼 선택 시 선택된 정보가 삭제됩니다.)", MessageEN: "(EN)좌석 할당시간 10분이 초과되었습니다.<br/>연장하시겠습니까?<br/>(취소버튼 선택 시 선택된 정보가 삭제됩니다.)" },
    "COM0632": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "결제가 진행 중입니다.", MessageEN: "(EN)결제가 진행 중입니다." },

    "COM0633": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "휴대폰번호를 입력해 주십시오.", MessageEN: "Please enter your cellphone number." },
    "COM0634": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "사업자등록번호를 입력해 주십시오.", MessageEN: "(EN)사업자등록번호를 입력해 주십시오." },

    "COM0635": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "결제가 취소 되었습니다.", MessageEN: "(EN)결제가 취소 되었습니다." },

    "COM0636": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "아이디를 입력해 주세요.", MessageEN: "Please enter your id." },
    "COM0637": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "비밀번호를 입력해 주세요.", MessageEN: "Please enter your password." },
    // end Error


    "COM0001": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "저장되었습니다.", MessageEN: "(EN)저장되었습니다." },
    "COM0002": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "등록된 게시글을 삭제하시겠습니까?", MessageEN: "(EN)등록된 게시글을 삭제하시겠습니까?" },
    "COM0003": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "영화관을 선택하세요.", MessageEN: "(EN)영화관을 선택하세요." },
    "COM0004": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "해당 영화관이 존재 하지 않습니다.", MessageEN: "(EN)해당 영화관이 존재 하지 않습니다." },
    "COM0005": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "클립보드에 URL이 복사되었습니다.<br/><br/>Ctrl+V (붙여넣기) 단축키를 이용하시면,<br/>URL을 붙여 넣으실 수 있습니다.", MessageEN: "(EN)클립보드에 URL이 복사되었습니다.<br/><br/>Ctrl+V (붙여넣기) 단축키를 이용하시면,<br/>URL을 붙여 넣으실 수 있습니다." },

    // ###### 공통 메시지 끝 ######

    // ###### 버튼 실행후 메시지 시작 ######
    "BTN0001": { TitleKR: "저장", TitleEN: "SAVE", MessageKR: "", MessageEN: "" },
    "BTN0002": { TitleKR: "수정", TitleEN: "MODIFY", MessageKR: "", MessageEN: "" },
    "BTN0003": { TitleKR: "초기화", TitleEN: "RESET", MessageKR: "", MessageEN: "" },
    "BTN0004": { TitleKR: "포인트 카드 신청", TitleEN: "Point card apply", MessageKR: "", MessageEN: "" },
    "BTN0005": { TitleKR: "적립 하기", TitleEN: "To earn", MessageKR: "", MessageEN: "" },
    "BTN0006": { TitleKR: "적립 안함", TitleEN: "Do not earn", MessageKR: "", MessageEN: "" },
    // ###### 버튼 실행후 메시지 끝 ######


      

    // ###### 다국어 시작 ######
    // 전체 공통
    "LBL9001": { TitleKR: "마이시네마", TitleEN: "My Cinema", MessageKR: "", MessageEN: "" },

    "LBL0001": { TitleKR: "영화관", TitleEN: "Theater", MessageKR: "", MessageEN: "" },
    "LBL0002": { TitleKR: "<strong>최대 2개</strong>까지 선택 가능", TitleEN: "up to two can be selected", MessageKR: "", MessageEN: "" },
    "LBL0003": { TitleKR: "MY 영화관", TitleEN: "MY Theater", MessageKR: "", MessageEN: "" },
    "LBL0004": { TitleKR: "로그인 후 확인하실 수 있습니다.", TitleEN: "You can check after logging.", MessageKR: "", MessageEN: "" },
    "LBL0005": { TitleKR: "로그인", TitleEN: "Login", MessageKR: "", MessageEN: "" },
    "LBL0006": { TitleKR: "정회원으로 로그인하시면 MY영화관을 확인하실 수 있습니다.", TitleEN: "Please Regular Member log in to active you can check the MY Theater.", MessageKR: "", MessageEN: "" },
    "LBL0007": { TitleKR: "MY 영화관을 등록해 주십시오.", TitleEN: "Please register for MY Theater.", MessageKR: "", MessageEN: "" },
    "LBL0008": { TitleKR: "설정", TitleEN: "Setting", MessageKR: "", MessageEN: "" },
    "LBL0009": { TitleKR: "전체영화관", TitleEN: "All", MessageKR: "", MessageEN: "" },
    "LBL0010": { TitleKR: "스페셜관", TitleEN: " special theater", MessageKR: "", MessageEN: "" },
    "LBL0011": { TitleKR: "영화", TitleEN: "Movie", MessageKR: "", MessageEN: "" },
    "LBL0012": { TitleKR: "예매순", TitleEN: "reservation order", MessageKR: "", MessageEN: "" },
    "LBL0013": { TitleKR: "개봉일순", TitleEN: "개봉일순", MessageKR: "", MessageEN: "" },
    "LBL0014": { TitleKR: "평점순", TitleEN: "rating order", MessageKR: "", MessageEN: "" },
    "LBL0015": { TitleKR: "상영일", TitleEN: "Date", MessageKR: "", MessageEN: "" },
    //"LBL0016": { TitleKR: "영화관", TitleEN: "Theater", MessageKR: "", MessageEN: "" },
    "LBL0017": { TitleKR: "영화관을 선택하세요. (최대 2개)", TitleEN: "Please select a Theater (Up to 2)", MessageKR: "", MessageEN: "" },
    //"LBL0018": { TitleKR: "영화", TitleEN: "Movie", MessageKR: "", MessageEN: "" },
    "LBL0019": { TitleKR: "영화를 선택하세요.", TitleEN: "Please select a movie", MessageKR: "", MessageEN: "" },
    "LBL0020": { TitleKR: "상영시간", TitleEN: "Showtime", MessageKR: "", MessageEN: "" },
    "LBL0021": { TitleKR: "예고편 상영 등으로 시작이 10여분 정도 차이 날 수 있습니다.", TitleEN: "The show time can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL0022": { TitleKR: "영화관별 조회", TitleEN: "Search by cinema location", MessageKR: "", MessageEN: "" },
    "LBL0023": { TitleKR: "영화별 조회", TitleEN: "Search by movies", MessageKR: "", MessageEN: "" },
    "LBL0024": { TitleKR: "전체", TitleEN: "All", MessageKR: "", MessageEN: "" },
    "LBL0025": { TitleKR: "2D", TitleEN: "2D", MessageKR: "", MessageEN: "" },
    "LBL0026": { TitleKR: "3D", TitleEN: "3D", MessageKR: "", MessageEN: "" },
    "LBL0027": { TitleKR: "상영시간이 조회되지 않았습니다. 영화관 및 영화를 선택해 주십시오.", TitleEN: "Running time cannot be found. Please select cinema location and movie.", MessageKR: "", MessageEN: "" },
    "LBL0028": { TitleKR: "상영시간이 조회되지 않았습니다.", TitleEN: "Running time cannot be found.", MessageKR: "", MessageEN: "" },
    "LBL0029": { TitleKR: "이전단계", TitleEN: "Previous step", MessageKR: "", MessageEN: "" },
    "LBL0030": { TitleKR: "예매정보", TitleEN: "advance ticket sale information", MessageKR: "", MessageEN: "" },
    "LBL0031": { TitleKR: "상영일", TitleEN: "Date", MessageKR: "", MessageEN: "" },
    "LBL0032": { TitleKR: "상영관", TitleEN: "Theater", MessageKR: "", MessageEN: "" },
    "LBL0033": { TitleKR: "좌석", TitleEN: "Seat", MessageKR: "", MessageEN: "" },
    "LBL0034": { TitleKR: "시네몰", TitleEN: "Cinemall", MessageKR: "", MessageEN: "" },
    "LBL0035": { TitleKR: "영화예매", TitleEN: "Ticket", MessageKR: "", MessageEN: "" },
    "LBL0036": { TitleKR: "상품구매", TitleEN: "Product", MessageKR: "", MessageEN: "" },
    "LBL0037": { TitleKR: "주문&#47;결제", TitleEN: "Payment", MessageKR: "", MessageEN: "" },
    "LBL0038": { TitleKR: "인원", TitleEN: "Person", MessageKR: "", MessageEN: "" },
    "LBL0039": { TitleKR: "총 주문금액", TitleEN: "The total order amount", MessageKR: "", MessageEN: "" },
    "LBL0040": { TitleKR: "할인/결제수단 선택", TitleEN: "Discount", MessageKR: "", MessageEN: "" },
    "LBL0041": { TitleKR: "관람권&#47;할인권&#47;쿠폰", TitleEN: "Movie ticket/discount ticket/Coupon", MessageKR: "", MessageEN: "" },
    "LBL0042": { TitleKR: "포인트", TitleEN: "Point", MessageKR: "", MessageEN: "" },
    "LBL0043": { TitleKR: "주문금액", TitleEN: "The purchase goods", MessageKR: "", MessageEN: "" },
    "LBL0044": { TitleKR: "할인금액", TitleEN: "Discount amount", MessageKR: "", MessageEN: "" },
    "LBL0045": { TitleKR: "총 결제 금액", TitleEN: "Total amount", MessageKR: "", MessageEN: "" },
    "LBL0046": { TitleKR: "결제하기", TitleEN: "payment", MessageKR: "", MessageEN: "" },
    "LBL0047": { TitleKR: "결제수단", TitleEN: "Payment", MessageKR: "", MessageEN: "" },
    "LBL0048": { TitleKR: "전체초기화", TitleEN: "Initialization", MessageKR: "", MessageEN: "" },
    "LBL00481": { TitleKR: "할인가이드", TitleEN: "DiscountGuide", MessageKR: "", MessageEN: "" },
    "LBL0049": { TitleKR: "카드선택", TitleEN: "Card selection", MessageKR: "", MessageEN: "" },
    "LBL0050": { TitleKR: "신용카드", TitleEN: "Credit card", MessageKR: "", MessageEN: "" },
    "LBL0051": { TitleKR: "L.PAY 간편결제", TitleEN: "L.PAY", MessageKR: "", MessageEN: "" },
    "LBL0052": { TitleKR: "휴대폰결제", TitleEN: "Mobile", MessageKR: "", MessageEN: "" },
    "LBL0053": { TitleKR: "주문정보", TitleEN: "(EN)주문정보", MessageKR: "", MessageEN: "" },
    "LBL0054": { TitleKR: "합계", TitleEN: "(EN)합계", MessageKR: "", MessageEN: "" },
    "LBL0055": { TitleKR: "날짜", TitleEN: "Date", MessageKR: "", MessageEN: "" },
    "LBL0056": { TitleKR: "결제완료", TitleEN: "Complete payment", MessageKR: "", MessageEN: "" },
    "LBL0057": { TitleKR: "예매번호", TitleEN: "ticketing number", MessageKR: "", MessageEN: "" },
    "LBL0058": { TitleKR: "구매번호", TitleEN: "(EN)구매번호", MessageKR: "", MessageEN: "" },
    "LBL0059": { TitleKR: "회원님, 결제가 성공적으로 완료되었습니다.", TitleEN: "Payment is successfully completed.", MessageKR: "", MessageEN: "" },
    "LBL0060": { TitleKR: "SMS 수신", TitleEN: "SMS receive", MessageKR: "", MessageEN: "" },
    "LBL0061": { TitleKR: "신용카드 영수증", TitleEN: "Credit card receipt", MessageKR: "", MessageEN: "" },
    "LBL0062_01": { TitleKR: "온라인 예매 취소는 상영 20분 전까지 가능하며, 20분 이전부터는 현장 취소만 가능합니다. (단, 무대인사 취소는 영화 시작 24시간 전 까지만 가능합니다.)", TitleEN: "The cancellation for online ticketing is only available 20 minutes before the screening.(In case of stage greetings, the cancellation is available only 24 hours before the screening.)", MessageKR: "", MessageEN: "" },
    "LBL0062": { TitleKR: "적립 예정 L.POINT는 영화 관람 다음 날 적립됩니다.", TitleEN: "L.Point saving due will be saved after a day the movie is watched.", MessageKR: "", MessageEN: "" },
    "LBL0063": { TitleKR: "예고편 상영 등 사정에 의해 본 영화 시작이 10여분 정도 차이 날 수 있습니다.", TitleEN: "The beginning time of the movie can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL0064": { TitleKR: "구매하신 상품의 유효기간 등 결제 상세내역은 마이시네마에서 확인하실 수 있습니다.", TitleEN: "Ticket history can be received by mobile if you allow receiving via SMS.", MessageKR: "", MessageEN: "" },
    "LBL0065": { TitleKR: "SMS 수신을 이용하시면 예매내역을 휴대폰으로 받을 수 있습니다.", TitleEN: "Reserved ticket cannot be found using resident registration number following privacy agreement.", MessageKR: "", MessageEN: "" },
    "LBL0066": { TitleKR: "개인정보 보호 정책에 따라 주민번호로 예매 티켓을 찾을 수 없습니다. 꼭 예매 번호를 확인해주세요.", TitleEN: "Please check ticket number / ticketing number.", MessageKR: "", MessageEN: "" },
    "LBL0067": { TitleKR: "확인", TitleEN: "Confirm", MessageKR: "", MessageEN: "" },
    "LBL0068": { TitleKR: "현금영수증 신청", TitleEN: "Cash receipts with us", MessageKR: "", MessageEN: "" },
    "LBL0069": { TitleKR: "선택사항 중 하나를 선택하시고, 해당란에 입력해 주십시오.", TitleEN: "Select one of the choices, please enter.", MessageKR: "", MessageEN: "" },
    "LBL0070": { TitleKR: "발급종류", TitleEN: "Issued kind", MessageKR: "", MessageEN: "" },
    "LBL0071": { TitleKR: "소득공제", TitleEN: "Deduction", MessageKR: "", MessageEN: "" },
    "LBL0072": { TitleKR: "지출증빙", TitleEN: "Proof of expenditure", MessageKR: "", MessageEN: "" },
    "LBL0073": { TitleKR: "등록유형", TitleEN: "Registration Type", MessageKR: "", MessageEN: "" },
    "LBL0074": { TitleKR: "휴대폰번호", TitleEN: "Cell phone number", MessageKR: "", MessageEN: "" },
    "LBL0075": { TitleKR: "카드번호", TitleEN: "Card number", MessageKR: "", MessageEN: "" },
    "LBL0076": { TitleKR: "번호입력", TitleEN: "Enter Number", MessageKR: "", MessageEN: "" },
    "LBL0077": { TitleKR: "사용안함", TitleEN: "Not used", MessageKR: "", MessageEN: "" },
    "LBL0078": { TitleKR: "사업자등록번호", TitleEN: "Company Registration Number", MessageKR: "", MessageEN: "" },
    "LBL0079": { TitleKR: "바로입장 티켓", TitleEN: "Immediate entrance ticket", MessageKR: "", MessageEN: "" },
    "LBL0080": { TitleKR: "바로교환 티켓", TitleEN: "Immediate exchange ticket", MessageKR: "", MessageEN: "" },
    "LBL0081": { TitleKR: "현금영수증 등록", TitleEN: "Cash register receipts", MessageKR: "", MessageEN: "" },
    "LBL0082": { TitleKR: "발급", TitleEN: "Issued", MessageKR: "", MessageEN: "" },
    "LBL0083": { TitleKR: "관람권 등록", TitleEN: "Regist gift certificate", MessageKR: "", MessageEN: "" },
    "LBL0084": { TitleKR: "관람권 번호", TitleEN: "Gift ticket number", MessageKR: "", MessageEN: "" },
    "LBL0085": { TitleKR: "비밀번호", TitleEN: "Password", MessageKR: "", MessageEN: "" },
    "LBL0086": { TitleKR: "등록", TitleEN: "Registration", MessageKR: "", MessageEN: "" },
    "LBL0087": { TitleKR: "바코드 등록", TitleEN: "(EN)바코드 등록", MessageKR: "", MessageEN: "" },
    "LBL0088": { TitleKR: "사용가능한 관람권 정보", TitleEN: "Information on usable ticket", MessageKR: "", MessageEN: "" },
    "LBL0089": { TitleKR: "보유 관람권", TitleEN: "Gift tickets you have", MessageKR: "", MessageEN: "" },
    "LBL0090": { TitleKR: "사용기간", TitleEN: "Period of use", MessageKR: "", MessageEN: "" },
    "LBL0091": { TitleKR: "구분", TitleEN: "Division", MessageKR: "", MessageEN: "" },
    "LBL0092": { TitleKR: "적용", TitleEN: "Application", MessageKR: "", MessageEN: "" },
    "LBL0093": { TitleKR: "삼성m기프트 관람권 정보를 입력해 주세요.", TitleEN: "Type the samsung gift ticket number you have", MessageKR: "", MessageEN: "" },
    "LBL0094": { TitleKR: "카드 유효기간", TitleEN: "Expiration date", MessageKR: "", MessageEN: "" },
    "LBL0095": { TitleKR: "조회", TitleEN: "Checking", MessageKR: "", MessageEN: "" },
    "LBL0096": { TitleKR: "사용가능한 관람권", TitleEN: "Usable ticket information", MessageKR: "", MessageEN: "" },
    "LBL0097": { TitleKR: "사용매수", TitleEN: "Used number of tickets", MessageKR: "", MessageEN: "" },
    "LBL0098": { TitleKR: "신한 combo 카드정보를 입력해 주세요.", TitleEN: "Type your shinhancard information", MessageKR: "", MessageEN: "" },
    "LBL0099": { TitleKR: "카드 번호는 12~16자리이므로 정확하게 입력해 주세요.", TitleEN: "Card number is 12~16 digits so enter them precisely.", MessageKR: "", MessageEN: "" },
    "LBL00991": { TitleKR: "현재 로그인한 ID 이외의 카드로 적립하실 경우 <br>카드번호를 입력해주세요.", TitleEN: "Please enter the card digits here if you'd like to save <br> L.POINT with other cards, not with your log-in ID.", MessageKR: "", MessageEN: "" },
    "LBL0100": { TitleKR: "할인권 등록", TitleEN: "Regist gift certificate", MessageKR: "", MessageEN: "" },
    "LBL0101": { TitleKR: "할인권 번호", TitleEN: "Discount ticket number", MessageKR: "", MessageEN: "" },
    "LBL0102": { TitleKR: "사용가능한 할인권 정보", TitleEN: "Information about usable discount coupon", MessageKR: "", MessageEN: "" },
    "LBL0103": { TitleKR: "보유 할인권", TitleEN: "Voucher you have", MessageKR: "", MessageEN: "" },
    "LBL0104": { TitleKR: "할인금액", TitleEN: "Discount amount", MessageKR: "", MessageEN: "" },
    "LBL0105": { TitleKR: "사용가능한 쿠폰/할인권/관람권이 없습니다.", TitleEN: "There is no coupon/discount coupon/ticket available on use.", MessageKR: "", MessageEN: "" },
    "LBL0106": { TitleKR: "할인권", TitleEN: "vouche", MessageKR: "", MessageEN: "" },
    "LBL0107": { TitleKR: "원 사용", TitleEN: "Won use", MessageKR: "", MessageEN: "" },
    "LBL0108": { TitleKR: "적용 및 등록", TitleEN: "Application", MessageKR: "", MessageEN: "" },
    "LBL0109": { TitleKR: "카드번호 등록", TitleEN: "Card number registered", MessageKR: "", MessageEN: "" },
    "LBL0110": { TitleKR: "L.POINT 카드 정보를 입력해 주세요.", TitleEN: "Please enter L.POINT card information.", MessageKR: "", MessageEN: "" },
    "LBL0111": { TitleKR: "온라인 비밀번호", TitleEN: "Password", MessageKR: "", MessageEN: "" },
    "LBL0112": { TitleKR: "비밀번호 설정", TitleEN: "Password setting", MessageKR: "", MessageEN: "" },
    "LBL0113": { TitleKR: "사용 가능한 포인트", TitleEN: "Available points", MessageKR: "", MessageEN: "" },
    "LBL0114": { TitleKR: "잔여 포인트", TitleEN: "Remaining point", MessageKR: "", MessageEN: "" },
    "LBL0115": { TitleKR: "적용 포인트", TitleEN: "Apply Point", MessageKR: "", MessageEN: "" },
    "LBL0116": { TitleKR: "사용 포인트", TitleEN: "Used point", MessageKR: "", MessageEN: "" },
    "LBL0117": { TitleKR: "제공상품", TitleEN: "Offered product", MessageKR: "", MessageEN: "" },
    "LBL0118": { TitleKR: "보유 시네마 포인트", TitleEN: "Cinema point balance", MessageKR: "", MessageEN: "" },
    "LBL0119": { TitleKR: "OK캐쉬백 정보를 입력해 주세요.", TitleEN: "Type the cash back information you have", MessageKR: "", MessageEN: "" },
    "LBL0120": { TitleKR: "온라인 비밀번호 변경", TitleEN: "change the on-line passcode", MessageKR: "", MessageEN: "" },
    "LBL0121": { TitleKR: "아이디", TitleEN: "ID", MessageKR: "", MessageEN: "" },
    "LBL0122": { TitleKR: "<strong>최대 2편</strong>까지 선택 가능", TitleEN: "up to two can be selected", MessageKR: "", MessageEN: "" },



    // 결제 관람권 할인권 타이틀
    "LBL0121_01": { TitleKR: "현대M카드 정보를 입력해 주세요.", TitleEN: "Please enteryour Hyundai M point information.", MessageKR: "", MessageEN: "" },
    "LBL0121_02": { TitleKR: "GS&amp;POINT 정보를 입력해 주세요.", TitleEN: "Please enter your GS&POINT information.", MessageKR: "", MessageEN: "" },
    "LBL0121_03": { TitleKR: "S-OIL포인트 정보를 입력해 주세요.", TitleEN: "Please enter your S-OIL point information.", MessageKR: "", MessageEN: "" },
    "LBL0121_04": { TitleKR: "신한 combo 카드정보를 입력해 주세요.", TitleEN: "Please enter your shinhancard information.", MessageKR: "", MessageEN: "" },
    "LBL0121_05": { TitleKR: "삼성 재적립 보너스 클럽 정보를 입력해 주세요.", TitleEN: "Please enter your samsung payback bonus card information.", MessageKR: "", MessageEN: "" },
    "LBL0121_06": { TitleKR: "블루 멤버스 정보를 입력해 주세요.", TitleEN: "Please enter your Blue Members card information.", MessageKR: "", MessageEN: "" },
    "LBL0121_07": { TitleKR: "RED 멤버스(Q 멤버스) 정보를 입력해 주세요.", TitleEN: "Please enter your Red Members card information.", MessageKR: "", MessageEN: "" },
    "LBL0121_08": { TitleKR: "해피머니 회원 정보를 입력해 주세요.", TitleEN: "Please enter your happymoney card information.", MessageKR: "", MessageEN: "" },


    "LBL0124": { TitleKR: "인증 번호", TitleEN: "(EN) 인증 번호", MessageKR: "", MessageEN: "" },
    "LBL0125": { TitleKR: "카드 비밀번호", TitleEN: "Password", MessageKR: "", MessageEN: "" },
    "LBL0126": { TitleKR: "타인의 카드일 경우, 소지자의 생년월일을 입력해 주세요.", TitleEN: "If the card belongs to a different person, please enter card holder’s birth date.", MessageKR: "", MessageEN: "" },
    "LBL0127": { TitleKR: "그외 카드선택", TitleEN: "Others", MessageKR: "", MessageEN: "" },
    "LBL0128": { TitleKR: "좌석 할당시간 10분이 초과되었습니다.\n연장하시겠습니까?\n(취소버튼 선택 시 선택된 정보가 삭제됩니다.)", TitleEN: "10 minutes for seat allotment has passed. Would you like to extend? (when clicking cancel, selected information will be dismissed)", MessageKR: "", MessageEN: "" },
    "LBL0129": { TitleKR: "생년월일", TitleEN: "Date of birth", MessageKR: "", MessageEN: "" },
    "LBL0148": { TitleKR: "매", TitleEN: "ea", MessageKR: "", MessageEN: "" },

    "LBL0151": { TitleKR: "매 사용", TitleEN: "ea Use.", MessageKR: "", MessageEN: "" },
    "LBL0154": { TitleKR: "이용안내 ", TitleEN: "Guide", MessageKR: "", MessageEN: "" },
    "LBL0155": { TitleKR: "결제를 취소하시겠습니까?", TitleEN: "Are you sure you want to cancel your payment?", MessageKR: "", MessageEN: "" },

    "LBL0154": { TitleKR: "이용안내 ", TitleEN: "Guide", MessageKR: "", MessageEN: "" },
    "LBL0156": { TitleKR: "장애 우대 ", TitleEN: "For the Disabled ", MessageKR: "", MessageEN: "" },
    "LBL0157": { TitleKR: "장애인은 인원/좌석 선택 화면에서 장애우대 티켓을 선택하시면 할인된 금액으로 예매하실 수 있으며,<br />장애인 복지카드 1~3등급 소지자는 <strong>동반 1인 할인</strong> 가능합니다.<br />아래 목록에서 동반할인 받으실 분을 선택해 주세요.", TitleEN: "Disabled customers can get discounted price by selecting preference for the disabled ticket on select number of persons/seats screen and customers with disabled welfare card 1~3 level can have discount for one accompanier.<br />Please select an accompanier for discount from the list below.", MessageKR: "", MessageEN: "" },

    "LBL0159": { TitleKR: "할인 혜택", TitleEN: "Discount benefits", MessageKR: "", MessageEN: "" },
    "LBL0160": { TitleKR: "티켓등급내용", TitleEN: "Ticket Rating", MessageKR: "", MessageEN: "" },
    "LBL0161": { TitleKR: "1~3등급 장애인 동반 할인", TitleEN: "1~3 level disabled discount for one accompanier.", MessageKR: "", MessageEN: "" },
    "LBL0162": { TitleKR: "4~6 등급 장애인 본인 할인", TitleEN: "4~6 level disabled discount for self.", MessageKR: "", MessageEN: "" },
    "LBL0163": { TitleKR: "휴대폰 SMS로 예매 내역을 받아볼 수 있습니다.", TitleEN: "Ticket history can be received by mobile if you allow receiving via SMS.", MessageKR: "", MessageEN: "" },
    "LBL0164": { TitleKR: "온라인 스위트샵과 기프트샵에서 구매한 상품은 마이시네마 &gt; 예매/구매 내역에서 확인 및 사용할 수 있습니다.", TitleEN: "Purchased from online product suite shop and gift shop are available in the My Cinema Ticketing and check / purchase.", MessageKR: "", MessageEN: "" },
    "LBL0165": { TitleKR: "비밀번호는 앞의 두자리만 입력해주세요", TitleEN: "The first two digits of the password input.", MessageKR: "", MessageEN: "" },

    // [LBL 화면 코드]
    // - P 결제 화면
    // - P_S 적립 화면
    // - M 마이시네마 화면
    // - M_P 마이시네마 예매/구매내역 화면

    // 결제 포인트 적립
    "LBL_P_S_001": { TitleKR: "포인트 적립", TitleEN: "Earn points", MessageKR: "", MessageEN: "" },
    "LBL_P_S_002": { TitleKR: "회원님, 주문이 성공적으로 완료 되었습니다.", TitleEN: "Customer, your order is completed.", MessageKR: "", MessageEN: "" },
    "LBL_P_S_003": { TitleKR: "포인트 적립을 원하실 경우 아래 항목을 입력하여 주십시오.", TitleEN: "If the word of thank you earn points by selecting the input items below.", MessageKR: "", MessageEN: "" },



    // 마이시네마 예매/구매내역 화면
    "LBL_M_P_001": {
        TitleKR: "적립 예정 L.POINT는 영화 관람 다음 날 적립됩니다.",
        TitleEN: "", MessageKR: "", MessageEN: ""
    },
    "LBL_M_P_001": {
        TitleKR: "예고편과 광고 상영으로 실제 영화 시작 시간이 10분 정도 차이 날 수 있습니다.",
        TitleEN: "", MessageKR: "", MessageEN: ""
    },
    "LBL_M_P_001": {
        TitleKR: "SMS 수신을 이용하시면 예매내역을 휴대폰으로 받을 수 있습니다.",
        TitleEN: "", MessageKR: "", MessageEN: ""
    },
    "LBL_M_P_001": {
        TitleKR: "적립 예정 L.POINT는 영화 관람 다음 날 적립됩니다.",
        TitleEN: "", MessageKR: "", MessageEN: ""
    },





    //결제 - 엘페이
    "LBL0170": { TitleKR: "L.Pay는 결제정보를 미리 등록하여 비밀번호 입력만으로 빠르게 결제할 수 있는 결제 서비스입니다.", TitleEN: "(EN)L.Pay는 결제정보를 미리 등록하여 비밀번호 입력만으로 빠르게 결제할 수 있는 결제 서비스입니다.", MessageKR: "", MessageEN: "" },
    "LBL0171": { TitleKR: "최초 1회 결제 후 결제 비밀번호 입력 없이 바로 결제 가능한 “빠른 결제” 서비스입니다", TitleEN: "It is a “speed payment ”service that enables immediate payment without entering payment password after initial payment.", MessageKR: "", MessageEN: "" },
    "LBL0172": { TitleKR: "L-PAY  결제 서비스를 사용하기 위해서는 L.POINT 통합회원으로 가입하셔야 합니다.", TitleEN: "To use L-PAY payment service, you have to join L.POINT integrated membership.", MessageKR: "", MessageEN: "" },
    "LBL0173": { TitleKR: "L-PAY 결제 서비스를 사용하기 위해서는 L.PAY App. 설치 후 서비스 가입을 하셔야 합니다.", TitleEN: "To use L-PAY payment service, you have to install L.PAY. App and apply for a membership.", MessageKR: "", MessageEN: "" },
    "LBL0174": { TitleKR: "L.PAY 결제 서비스를 사용하기 위해서는 서비스 가입 후 결제 수단(신용카드/직불계좌)를 등록하셔야 합니다.", TitleEN: "In order to use L.PAY payment service, apply for service and register payment option (credit card/debit card).", MessageKR: "", MessageEN: "" },
    "LBL0175": { TitleKR: "이용에 불편을 드려 죄송합니다.(고객센터 1899-6300)", TitleEN: "Sorry for the inconvenient use. (customer center 1899-6300)", MessageKR: "", MessageEN: "" },
    "LBL0176": { TitleKR: "L-PAY  결제 서비스를 사용하기 위해서는 L.POINT 통합회원으로 가입하셔야 합니다.", TitleEN: "To use L-PAY payment service, you have to join L.POINT integrated membership.", MessageKR: "", MessageEN: "" },
    "LBL0177": { TitleKR: "L.PAY 결제 서비스를 사용하기 위해서는 서비스 가입 후 결제 수단(신용카드/직불계좌)를 등록하셔야 합니다.", TitleEN: "In order to use L-PAY payment service, apply for service and register payment option (credit card/debit card).", MessageKR: "", MessageEN: "" },
    "LBL0178": { TitleKR: "L.PAY 결제 수단 등록하기 선택 시 고객님의 휴대폰으로 결제수단 등록 알림 메시지가 발송됩니다.", TitleEN: "When selecting registering for L.PAY payment option, message to notify registration of payment option will be sent to your phone.", MessageKR: "", MessageEN: "" },
    "LBL0179": { TitleKR: "이용에 불편을 드려 죄송합니다.(고객센터 1899-6300)", TitleEN: "Sorry for the inconvenient use. (customer center 1899-6300)", MessageKR: "", MessageEN: "" },
    "LBL0180": { TitleKR: "L.PAY APP 설치하기", TitleEN: "L.PAY APP Install", MessageKR: "", MessageEN: "" },
    "LBL0181": { TitleKR: "L.PAY APP 결제수단 등록하기", TitleEN: "L.PAY APP Registration payment", MessageKR: "", MessageEN: "" },
    "LBL0182": { TitleKR: "L.PAY 다운로드 URL SMS 전송", TitleEN: "(EN) L.PAY 다운로드 URL SMS 전송", MessageKR: "", MessageEN: "" },

    //예매 - 영화상세(모달팝업)
    "LBL0200": { TitleKR: "등급", TitleEN: "Grade", MessageKR: "", MessageEN: "" },
    "LBL0201": { TitleKR: "개봉일", TitleEN: "Date", MessageKR: "", MessageEN: "" },
    "LBL0202": { TitleKR: "기본정보", TitleEN: "Information", MessageKR: "", MessageEN: "" },
    "LBL0203": { TitleKR: "타입", TitleEN: "Type", MessageKR: "", MessageEN: "" },
    "LBL0204": { TitleKR: "시놉시스", TitleEN: "Synopsis", MessageKR: "", MessageEN: "" },
    "LBL0205": { TitleKR: "영화상세 ", TitleEN: "Movie Details", MessageKR: "", MessageEN: "" },

    // 좌석 다국어
    "LBL1001": { TitleKR: "인원/좌석선택", TitleEN: "Person/Seat selection", MessageKR: "", MessageEN: "" },
    "LBL1002": { TitleKR: "영화관 공지", TitleEN: "Theater Notice", MessageKR: "", MessageEN: "" },
    "LBL1003": { TitleKR: "영화관 요금표", TitleEN: "Movie price list", MessageKR: "", MessageEN: "" },
    "LBL1004": { TitleKR: "전체 초기화", TitleEN: "Initialization", MessageKR: "", MessageEN: "" },
    "LBL1005": { TitleKR: "좌석 붙임 설정", TitleEN: "Set as consecutive seats", MessageKR: "", MessageEN: "" },
    "LBL1006": { TitleKR: "좌석을 각각 지정하실 수 있으나, 상영관 특성에 따라 제한된 곳이 있을 수 있습니다.", TitleEN: "you can select seat except special cinema.", MessageKR: "", MessageEN: "" },
    "LBL1007": { TitleKR: "인원은 최대 8명까지 선택할 수 있습니다.", TitleEN: "up to 8 people can be selected", MessageKR: "", MessageEN: "" },
    "LBL1008": { TitleKR: "선택한 좌석을 다시 클릭하면 취소됩니다.", TitleEN: "Selected seat is canceled when clicked again.", MessageKR: "", MessageEN: "" },
    "LBL1009": { TitleKR: "SWEET SPOT은 최적의 화면과 사운드를 즐길 수 있는 좌석입니다.<br />(스크린 가운데에서 상영관 뒤 벽까지 직선 거리의 2/3 지점)", TitleEN: "SWEET SPOT is a seat where you can enjoy the best screen and sound.<br />(Since two-2/3 of the screen to the wall behind the theater)", MessageKR: "", MessageEN: "" },
    "LBL1010": { TitleKR: "출입문", TitleEN: "Entrance gate", MessageKR: "", MessageEN: "" },
    "LBL1011": { TitleKR: "선택좌석", TitleEN: "Selected seat", MessageKR: "", MessageEN: "" },
    "LBL1012": { TitleKR: "선택가능", TitleEN: "Selectable", MessageKR: "", MessageEN: "" },
    "LBL1013": { TitleKR: "예매완료", TitleEN: "Complete", MessageKR: "", MessageEN: "" },
    "LBL1014": { TitleKR: "선택불가", TitleEN: "Cannot be selected", MessageKR: "", MessageEN: "" },
    "LBL1015": { TitleKR: "롯데시네마가 추천하는 최적의 화면과 사운드를 즐길 수 있는 좌석입니다.", TitleEN: "SWEET SPOT is a seat where you can enjoy the best screen and sound.", MessageKR: "", MessageEN: "" },
    "LBL1016": { TitleKR: "중저음 사운드를 진동으로 전환해 깊은 울림을 주는 좌석입니다.", TitleEN: "Super vibe movie is now showing. The cost is depending on seats.", MessageKR: "", MessageEN: "" },
    "LBL1017": { TitleKR: "오직 두 사람만을 위한 독립된 커플용 좌석입니다.", TitleEN: "The cinema has cine couple seats including a table and couple seats. Price can be different according to type of seats.", MessageKR: "", MessageEN: "" },
    "LBL1018": { TitleKR: "소파, 테이블, 별도 음향시스템을 갖춘 4•6인실의 독립된 관람 공간입니다.", TitleEN: "This cinema is equipped with sofas where more than 4 people can seat. Price can be different according to type of seats.", MessageKR: "", MessageEN: "" },
    "LBL1019": { TitleKR: "특별요금", TitleEN: "Special price", MessageKR: "", MessageEN: "" },
    "LBL1020": { TitleKR: "상영관별 특별한 할인 요금으로 이용할 수 있는 좌석입니다.", TitleEN: "Price can be different by seats applied with special charge.", MessageKR: "", MessageEN: "" },
    "LBL1021": { TitleKR: "장애인석", TitleEN: "Disabled seats", MessageKR: "", MessageEN: "" },
    "LBL1022": { TitleKR: "휠체어 이용 고객도 편리하게 영화감상이 가능한 휠체어 전용 좌석입니다.", TitleEN: "There are seats to enjoy movie with wheel chairs. Price can be different by types of seats.", MessageKR: "", MessageEN: "" },
    "LBL1023": { TitleKR: "발받침", TitleEN: "Footrest", MessageKR: "", MessageEN: "" },
    "LBL1024": { TitleKR: "이전단계", TitleEN: "Previous step", MessageKR: "", MessageEN: "" },
    "LBL1025": { TitleKR: "다음단계", TitleEN: "Next step", MessageKR: "", MessageEN: "" },
    "LBL1026": { TitleKR: "영화", TitleEN: "Movie", MessageKR: "", MessageEN: "" },
    "LBL1027": { TitleKR: "예매정보", TitleEN: "Advance ticket sale information", MessageKR: "", MessageEN: "" },
    "LBL1028": { TitleKR: "상영일", TitleEN: "Date", MessageKR: "", MessageEN: "" },
    "LBL1029": { TitleKR: "상영시간", TitleEN: "Showtime", MessageKR: "", MessageEN: "" },
    "LBL1030": { TitleKR: "상영관", TitleEN: "Theater", MessageKR: "", MessageEN: "" },
    "LBL1031": { TitleKR: "좌석", TitleEN: "Seat", MessageKR: "", MessageEN: "" },
    "LBL1032": { TitleKR: "상품정보", TitleEN: "Product information", MessageKR: "", MessageEN: "" },
    "LBL1033": { TitleKR: "상품을 선택해 주십시오.", TitleEN: "Please select product.", MessageKR: "", MessageEN: "" },
    "LBL1034": { TitleKR: "총 결제 금액", TitleEN: "Total payment price", MessageKR: "", MessageEN: "" },
    "LBL1035": { TitleKR: "영화예매", TitleEN: "Ticket", MessageKR: "", MessageEN: "" },
    "LBL1036": { TitleKR: "상품구매", TitleEN: "Product", MessageKR: "", MessageEN: "" },
    "LBL1037": { TitleKR: "원", TitleEN: "KRW", MessageKR: "", MessageEN: "" },

    // 할인정보 다국어
    "LBL2001": { TitleKR: "할인가이드", TitleEN: "Discount Guide", MessageKR: "", MessageEN: "" },
    "LBL2002": { TitleKR: "카드명 검색", TitleEN: "Card Name Search", MessageKR: "", MessageEN: "" },
    "LBL2003": { TitleKR: "카드명을 입력하세요.", TitleEN: "Enter the card name.", MessageKR: "", MessageEN: "" },
    "LBL2004": { TitleKR: "검색", TitleEN: "Search", MessageKR: "", MessageEN: "" },

    // [LBL 화면 코드]
    // - P 결제 화면
    // - P_S 적립 화면
    // - G 글로벌
    // - G_M_R 글로벌 메인 바로입장티켓
    // - M 마이시네마
    // - M_T  마이시네마 예매/구매내역탭

    //결제 포인트 적립
    "LBL_M_T_001": { TitleKR: "예매취소는 상영 20분 전까지 가능합니다.", TitleEN: "Ticket canceling is available until 20 minutes before the show time.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_002": { TitleKR: "모바일 바로입장 티켓 이용 시 캡쳐화면은 입장이 제한됩니다.", TitleEN: "(EN)모바일 바로입장 티켓 이용 시 캡쳐화면은 입장이 제한됩니다.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_003": { TitleKR: "예고편과 광고 상영으로 실제 영화 시작 시간이 10분 정도 차이 날 수 있습니다.", TitleEN: "The beginning time of the movie can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_004": { TitleKR: "시네몰의 영화관람권은 롯데시네마 홈페이지 및 모바일 앱에서 사용할 수 있습니다.(현장 사용 불가)", TitleEN: "(EN)시네몰의 영화관람권은 롯데시네마 홈페이지 및 모바일 앱에서 사용할 수 있습니다.(현장 사용 불가)", MessageKR: "", MessageEN: "" },
    "LBL_M_T_005": { TitleKR: "시네몰 상품은 부분환불 및 현금환불이 불가합니다.<br />(2장의 시네몰 상품을 한 번에 구매하신 경우, 2장 모두 취소만 가능하며 그 중 1장이라도 사용하신 경우 환불되지 않습니다.)", TitleEN: "Cinema mall products cannot be partially refund or cash refund <br />(if 2 items are purchased together, all of them have to be cancelled at once and if one of them is used already, refund is not available). ", MessageKR: "", MessageEN: "" },
    "LBL_M_T_006": { TitleKR: "L.POINT는 영화관람 후 적립됩니다. <br />(단 롯데시네마 성남, 성남신흥은 L.POINT 가맹점이 아닌 관계로 L.POINT 적립 및 사용이 불가합니다.)", TitleEN: "Lotte cinema point, L.POINT is us saved after the movie is watched not after product purchase. <br />(Lotte cinema Seongnam, Seongnam shinhung are not L.POINT affiliates so saving and using L.POINT is not available). ", MessageKR: "", MessageEN: "" },
    "LBL_M_T_007": { TitleKR: "결제가 완료된 시네몰 상품은 마이시네마 &gt; 예매내역에서 조회할 수 있습니다.", TitleEN: "Paid product can be viewed on my cinema &gt; ticket history.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_008": { TitleKR: "모바일 캡쳐 화면 소지 시, 입장 제한을 받을 수 있습니다.", TitleEN: "Entrance can be restricted if mobile screen is captured as a ticket.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_009": { TitleKR: "예고편과 광고 상영으로 실제 영화 시작 시간이 10분 정도 차이 날 수 있습니다.", TitleEN: "The beginning time of the movie can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_010": { TitleKR: "스위트샵 상품의 취소기한은 구매일로부터 30, 기프트샵 상품의 취소기한은 구매일로부터 60일 입니다.", TitleEN: "(EN)스위트샵 상품의 취소기한은 구매일로부터 30, 기프트샵 상품의 취소기한은 구매일로부터 60일 입니다.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_011": { TitleKR: "구매취소는 취소기한 내 마이시네마 > 예매/구매내역에서만 가능합니다.(현장취소 불가)", TitleEN: "(EN)구매취소는 취소기한 내 마이시네마 > 예매/구매내역에서만 가능합니다.(현장취소 불가)", MessageKR: "", MessageEN: "" },
    "LBL_M_T_012": { TitleKR: "구매하신 상품은 부분환불 및 현금환불이 되지 않습니다.", TitleEN: "(EN)구매하신 상품은 부분환불 및 현금환불이 되지 않습니다.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_013": { TitleKR: "여러 상품을 한 번에 사신 경우, 모두 취소만 가능하며 그 중 1장이라도 사용하신 상품이 있을 때는 환불되지 않습니다.", TitleEN: "(EN)여러 상품을 한 번에 사신 경우, 모두 취소만 가능하며 그 중 1장이라도 사용하신 상품이 있을 때는 환불되지 않습니다.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_014": { TitleKR: "적립 예정 L.POINT는 영화 관람 다음 날 적립됩니다.", TitleEN: "L.Point saving due will be saved after a day the movie is watched.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_015": { TitleKR: "SMS 수신을 이용하시면 예매내역을 휴대폰으로 받을 수 있습니다.", TitleEN: "(EN)SMS 수신을 이용하시면 예매내역을 휴대폰으로 받을 수 있습니다.", MessageKR: "", MessageEN: "" },
    "LBL_M_T_016": { TitleKR: "얼리버드 상품은 특별관람권이므로 구매 후 환불되지 않습니다.", TitleEN: "(EN)얼리버드 상품은 특별관람권이므로 구매 후 환불되지 않습니다.", MessageKR: "", MessageEN: "" },




    // 마이시네마 다국어
    "LBL3000": { TitleKR: "선물내역", TitleEN: "Gift details", MessageKR: "", MessageEN: "" },
    "LBL3001": { TitleKR: "예매/구매내역", TitleEN: "Ticketing/purchase history", MessageKR: "", MessageEN: "" },
    "LBL3002": { TitleKR: "취소내역", TitleEN: "Cancellation details", MessageKR: "", MessageEN: "" },
    "LBL3003": { TitleKR: "스마트오더가 가능한 상품에만 스마트오더 아이콘이 표시됩니다. 스마트오더 제조주문은 모바일에서만 가능합니다.", TitleEN: "Smart order icon is shown only on products that are available by smart order. Smart order's make as you order is only available on mobile.", MessageKR: "", MessageEN: "" },
    "LBL3004": { TitleKR: "유의사항", TitleEN: "Notice", MessageKR: "", MessageEN: "" },
    "LBL3005": { TitleKR: "[예매취소 안내]", TitleEN: "[Cancel ticketing information]", MessageKR: "", MessageEN: "" },
    "LBL3006": { TitleKR: "예매취소는 상영 20분 전까지 가능합니다.", TitleEN: "Ticket canceling is available until 20 minutes before the show time. ", MessageKR: "", MessageEN: "" },
    "LBL3007": { TitleKR: "모바일 캡쳐 화면 소지 시, 입장 제한을 받을 수 있습니다.", TitleEN: "Entrance can be restricted if mobile screen is captured as a ticket.", MessageKR: "", MessageEN: "" },
    "LBL3008": { TitleKR: "예고편 상영 등 사정에 의해 본 영화 시작이 10여분 정도 차이 날 수 있습니다.", TitleEN: "The beginning time of the movie can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL3009": { TitleKR: "[상품취소 안내]", TitleEN: "[Cancel ticketing information]", MessageKR: "", MessageEN: "" },
    "LBL3010": { TitleKR: "시네몰은 롯데시네마 홈페이지 및 스마트폰 어플리케이션에서 사용가능합니다.(현장 사용 불가)", TitleEN: "Cinema mall products can be used on Lotte cinema website and smartphone application (cannot be used at the door). ", MessageKR: "", MessageEN: "" },
    "LBL3011": { TitleKR: "시네몰은 부분환불 및 현금으로 환불이 불가합니다.<br />(2장의 시네몰 상품을 한번에 구매하신 경우, 2장 모두 취소만 가능하며 그 중 1장라도 사용하신 쿠폰이 있는 경우  환불이 불가합니다.)", TitleEN: "Cinema mall products cannot be partially refund or cash refund <br />(if 2 items are purchased together, all of them have to be cancelled at once and if one of them is used already, refund is not available). ", MessageKR: "", MessageEN: "" },
    "LBL3012": { TitleKR: "롯데시네마 포인트,L.POINT는 시네몰 상품 구매시 적립되지 않고 영화관람 후 적립됩니다.<br />(롯데시네마 성남,성남신흥은 L.POINT 가맹정이 아닌 관계로  L.POINT 적립 및 사용이 불가합니다.)", TitleEN: "Lotte cinema point, L.POINT is us saved after the movie is watched not after product purchase. <br />(Lotte cinema Seongnam, Seongnam shinhung are not L.POINT affiliates so saving and using L.POINT is not available). ", MessageKR: "", MessageEN: "" },
    "LBL3013": { TitleKR: "결제가 완료된 시네티몰 상품은 마이시네마 &gt; 예매내역에서 조회에서 가능합니다.", TitleEN: "Paid product can be viewed on my cinema &gt; ticket history.", MessageKR: "", MessageEN: "" },
    "LBL3014": { TitleKR: "검색기간", TitleEN: "Search Terms", MessageKR: "", MessageEN: "" },
    "LBL3015": { TitleKR: "예매번호(예매일)", TitleEN: "Ticketing(Date)", MessageKR: "", MessageEN: "" },
    "LBL3016": { TitleKR: "예매/구매내역", TitleEN: "Ticketing", MessageKR: "", MessageEN: "" },
    "LBL3017": { TitleKR: "구매번호(구매일)", TitleEN: "Purchase(Date)", MessageKR: "", MessageEN: "" },
    "LBL3018": { TitleKR: "구매내역", TitleEN: "Purchase", MessageKR: "", MessageEN: "" },
    "LBL3019": { TitleKR: "사용상태", TitleEN: "Service condition", MessageKR: "", MessageEN: "" },
    "LBL3020": { TitleKR: "영화명", TitleEN: "Movie", MessageKR: "", MessageEN: "" },
    "LBL3021": { TitleKR: "관람인원", TitleEN: "People", MessageKR: "", MessageEN: "" },
    "LBL3022": { TitleKR: "주문금액", TitleEN: "Order amount", MessageKR: "", MessageEN: "" },
    "LBL3023": { TitleKR: "결제취소", TitleEN: "Revoke payment", MessageKR: "", MessageEN: "" },
    "LBL3024": { TitleKR: "상세내용", TitleEN: "More information", MessageKR: "", MessageEN: "" },
    "LBL3025": { TitleKR: "취소완료", TitleEN: "Cancelled", MessageKR: "", MessageEN: "" },
    "LBL3026": { TitleKR: "신용카드전표출력", TitleEN: "Credit card statement Print", MessageKR: "", MessageEN: "" },
    "LBL3027": { TitleKR: "상품명", TitleEN: "Product name", MessageKR: "", MessageEN: "" },
    "LBL3028": { TitleKR: "사용기간", TitleEN: "Period of use", MessageKR: "", MessageEN: "" },
    "LBL3029": { TitleKR: "관람권번호", TitleEN: "Admission ticket number", MessageKR: "", MessageEN: "" },
    "LBL3030": { TitleKR: "구매금액", TitleEN: "Order price", MessageKR: "", MessageEN: "" },
    "LBL3031": { TitleKR: "관람일", TitleEN: "DATE", MessageKR: "", MessageEN: "" },
    "LBL3032": { TitleKR: "좌석정보", TitleEN: "Seat", MessageKR: "", MessageEN: "" },
    "LBL3033": { TitleKR: "현장발권이 불필요하니 상영관입장시 제시하여 주십시오.", TitleEN: "Ticket printing at the door is unnecessary so just present the ticket for entrance.", MessageKR: "", MessageEN: "" },
    "LBL3034": { TitleKR: "예매 취소는 상영 20분 전까지 가능합니다.", TitleEN: "Ticket cancelling is only available 20 minutes before the showtime. ", MessageKR: "", MessageEN: "" },
    "LBL3035": { TitleKR: "캡쳐 화면 제시 시 입장이 제한됩니다.", TitleEN: "If captured screen is presented, entrance will be restricted.", MessageKR: "", MessageEN: "" },
    "LBL3036": { TitleKR: "교환권번호", TitleEN: "Gift ticket number", MessageKR: "", MessageEN: "" },
    "LBL3037": { TitleKR: "원", TitleEN: "KRW", MessageKR: "", MessageEN: "" },
    "LBL3038": { TitleKR: "목록", TitleEN: "List", MessageKR: "", MessageEN: "" },
    "LBL3039": { TitleKR: "검색결과가 없습니다.", TitleEN: "No results found.", MessageKR: "", MessageEN: "" },
    "LBL3040": { TitleKR: "&#43; 더보기", TitleEN: "&#43; More", MessageKR: "", MessageEN: "" },
    "LBL3041": { TitleKR: "수량", TitleEN: "Quantity", MessageKR: "", MessageEN: "" },
    "LBL3042": { TitleKR: "수신정보", TitleEN: "(EN)수신정보", MessageKR: "", MessageEN: "" },
    "LBL3043": { TitleKR: "매점상품 주문하기", TitleEN: "Order snack bar product", MessageKR: "", MessageEN: "" },
    "LBL3044": { TitleKR: "상품정보 <span class='p_etc'>더 자세한 정보는 스위트샵 또는 기프트샵에서 확인해 주세요.</span>", TitleEN: "Product information <span class='p_etc'>Please check the detailed information of the product at sweet shop or gift shop.</span>", MessageKR: "", MessageEN: "" },
    "LBL3045": { TitleKR: "구성품", TitleEN: "Components", MessageKR: "", MessageEN: "" },
    "LBL3046": { TitleKR: "구매가능기간", TitleEN: "Date available for purchase", MessageKR: "", MessageEN: "" },
    "LBL3047": { TitleKR: "구매 제한", TitleEN: "Purchase limitation", MessageKR: "", MessageEN: "" },
    "LBL3048": { TitleKR: "사용기간", TitleEN: "Period of use", MessageKR: "", MessageEN: "" },
    "LBL3049": { TitleKR: "설명", TitleEN: "Description", MessageKR: "", MessageEN: "" },

    "LBL3050": { TitleKR: "합계", TitleEN: "Total", MessageKR: "", MessageEN: "" },
    "LBL3051": { TitleKR: "원", TitleEN: "KRW", MessageKR: "", MessageEN: "" },
    "LBL3052": { TitleKR: "상품 담기 후, 다음단계로 가시면 티켓과 함께 결제할 수 있습니다.", TitleEN: "After adding the product, you have to proceed to next step to purchase ticket and item together.", MessageKR: "", MessageEN: "" },
    "LBL3053": { TitleKR: "상품 담기", TitleEN: "Add to basket", MessageKR: "", MessageEN: "" },
    "LBL3054": { TitleKR: "옵션선택", TitleEN: "Select option", MessageKR: "", MessageEN: "" },
    "LBL3055": { TitleKR: "수신정보", TitleEN: "(EN)수신정보", MessageKR: "", MessageEN: "" },

    "LBL3056": { TitleKR: "예매/구매한 내역이 없습니다.", TitleEN: "No results found.", MessageKR: "", MessageEN: "" },
    "LBL3057": { TitleKR: "취소한 내역이 없습니다.", TitleEN: "No results found.", MessageKR: "", MessageEN: "" },
    "LBL3058": { TitleKR: "선물한 내역이 없습니다.", TitleEN: "No results found.", MessageKR: "", MessageEN: "" },
    "LBL3059": { TitleKR: "보유한 쿠폰이 없습니다.", TitleEN: "No results found.", MessageKR: "", MessageEN: "" },

	// 상영시간표 다국어
    "LBL4001": { TitleKR: "영화관별 상영시간표", TitleEN: "Show time by cinema location", MessageKR: "", MessageEN: "" },
    "LBL4002": { TitleKR: "영화별 상영시간표", TitleEN: "Movies by cinema location", MessageKR: "", MessageEN: "" },
    "LBL4003": { TitleKR: "영화관", TitleEN: "Theater", MessageKR: "", MessageEN: "" },
    "LBL4004": { TitleKR: "영화", TitleEN: "Movie", MessageKR: "", MessageEN: "" },
    "LBL4005": { TitleKR: "예매순", TitleEN: "Reservation order", MessageKR: "", MessageEN: "" },
    "LBL4006": { TitleKR: "평점순", TitleEN: "Rating order", MessageKR: "", MessageEN: "" },
    "LBL4007": { TitleKR: "상영시간", TitleEN: "Showtime", MessageKR: "", MessageEN: "" },
    "LBL4008": { TitleKR: "예고편 상영 등으로 시작이 10여분 정도 차이 날 수 있습니다.", TitleEN: "The show time can be different by 10 minutes due to preview running.", MessageKR: "", MessageEN: "" },
    "LBL4009": { TitleKR: "상영시간이 조회되지 않았습니다. 영화관을 선택해 주세요.", TitleEN: "Running time cannot be found", MessageKR: "", MessageEN: "" },
    "LBL4010": { TitleKR: "상영시간이 조회되지 않았습니다. 영화를 선택해 주세요.", TitleEN: "Running time cannot be found.", MessageKR: "", MessageEN: "" },

    // 가이드 다국어
    "LBL5001": { TitleKR: "알림", TitleEN: "Notice", MessageKR: "", MessageEN: "" },
    "LBL5002": { TitleKR: "주차요금 할인 안내", TitleEN: "Information on parking fee discount", MessageKR: "", MessageEN: "" },
    "LBL5003": { TitleKR: "2015년 10월 28일부로 롯데시네마 이용 시 주차 요금이 할인됩니다.", TitleEN: "Parking fee is discounted for using Lotte cinema effective as of Oct 28, 2015", MessageKR: "", MessageEN: "" },
    "LBL5004": { TitleKR: "기존", TitleEN: "Original", MessageKR: "", MessageEN: "" },
    "LBL5005": { TitleKR: "변경", TitleEN: "Change", MessageKR: "", MessageEN: "" },
    "LBL5006": { TitleKR: "유의사항", TitleEN: "Notice", MessageKR: "", MessageEN: "" },
    "LBL5007": { TitleKR: "10시~20시 : 10분당 800원<br />그 외 시간 : 10분당 200원", TitleEN: "10 am ~ 8 pm: KRW 800 per 10 min.<br />Other times: KRW 200 per 10 min.", MessageKR: "", MessageEN: "" },
    "LBL5008": { TitleKR: "변경 관람 당일 최초 4시간까지 4,800원<br />롯데월드몰 주차장에 한함", TitleEN: "Exclusive to Lotteworld mall parking lot,<br />KRW 4,800 for the first 4 hours of movie date", MessageKR: "", MessageEN: "" },
    "LBL5009": { TitleKR: "아이폰 사용 고객은 각층 인포데스크(5,7,10층)에서<br />주차할인권 수령", TitleEN: "iPhone users can pick up parking discount tickets<br />at the information desk (floor 5, 7, 10).", MessageKR: "", MessageEN: "" },
    "LBL5010": { TitleKR: "확인", TitleEN: "Confirm", MessageKR: "", MessageEN: "" },
    "LBL5011": { TitleKR: "고객인증 번호 입력", TitleEN: "Enter customer certification number", MessageKR: "", MessageEN: "" },
    "LBL5012": { TitleKR: "영화관 현장 티켓 발권 목적으로 사용되니 반드시 입력하시기 바랍니다.", TitleEN: "Please enter the information as it is used for the purpose of cinema ticket printing at the door.", MessageKR: "", MessageEN: "" },
    "LBL5013": { TitleKR: "미 입력 시 현장 티켓 발권에서 아래 항목으로 고객의 티켓을 찾을 수&nbsp;없습니다.", TitleEN: "If not entered, your ticket cannot be found with below clauses for ticket printing at the door.", MessageKR: "", MessageEN: "" },
    "LBL5014": { TitleKR: "부정확한 정보로 인한 예매사고 발생시 롯데시네마는 책임지지 않습니다.", TitleEN: "Lotte cinema is not responsible for reservation accident due to unclear information.", MessageKR: "", MessageEN: "" },
    "LBL5015": { TitleKR: "회원정보변경은 고객인증 번호 변경과 별도로 이루어지며 회원정보 변경을 위해서는 마이 시네마 &gt; 부가정보 수정 &gt; 회원정보 변경 메뉴를 이용해주시기 바랍니다.", TitleEN: "Member information change is completed separately from customer verification number change and for changing member information please use My cinema > Optional information modification > Member information change menu", MessageKR: "", MessageEN: "" },
    "LBL5016": { TitleKR: "이름", TitleEN: "Name", MessageKR: "", MessageEN: "" },
    "LBL5017": { TitleKR: "생년월일", TitleEN: "Birthday", MessageKR: "", MessageEN: "" },
    "LBL5018": { TitleKR: "휴대폰번호", TitleEN: "Cell phone number", MessageKR: "", MessageEN: "" },
    "LBL5019": { TitleKR: "사용안함", TitleEN: "Not used", MessageKR: "", MessageEN: "" },
    "LBL5020": { TitleKR: "확인", TitleEN: "Confirm", MessageKR: "", MessageEN: "" },

    // ###### 다국어 끝 ######

    "LBL9999": { TitleKR: "안내", TitleEN: "Notice", MessageKR: "[월드타워 2nd MOVIE NIGHT]<br><br>ㆍ본 회차에 한해 파티 입장 혜택이 제공됩니다.<br>ㆍ영화 상영 직후 파티가 시작됩니다.<br>ㆍ주류가 제공되므로<br>만 19세 미만 청소년은 참석이 불가합니다. <br>ㆍ원활한 행사 진행을 위해 상영시간 24시간 이전부터<br>예매취소 불가합니다.(현장 취소만 가능)", MessageEN: "" },
};