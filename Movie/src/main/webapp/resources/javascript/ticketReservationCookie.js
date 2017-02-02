
var cookieJson = '';

//$.cookie('ticketingState','');

if ($.cookie('ticketingState') == '' || $.cookie('ticketingState') == null || $.cookie('ticketingState') == 'undefined'){
    cookieJson = {
        ticketingState: {
            ticketing: {
                playDate: "",
                playWeek: "",
                screentype: [],
                areaCodes: [],
                cinemaCodes: [],
                movieCodes: [],
                playSequenceCode: [],
                screenDivision: "",
                sortMovieCode: "",
                sortFilmCode: ""
            },
            seatSelect: {
                SeatType: [],
                SeatCodes: [],
                seatArray: [],
                transNo: ""
            },
            schedule: {
                tabIdx: "",
                playDateId: "",
                cinemaId: "",
                movieArea: "",
                movieId: "",
                movieSort: "",
                playSequenceId: ""
            },
            payment: "",
            /// eventCode: "",
            goods: "",
            BookingStatus:'',           
        }
    };
} else {
    cookieJson = $.parseJSON($.cookie('ticketingState'));
};


//$(document).ready(function () {

    $.fn.cookieGeneration = function (option) {
        var S = $.extend({ 'action': 'add', 'node': '', 'dataChange': '', 'key': '' }, option);

        this.dataChange = S.dataChange;

        this.action = S.action;
        this.key = S.key;

        this.init();
    };

    $.fn.cookieGeneration.prototype = {
        init: function () {
            switch (this.action) {
                case 'add':
                    this.addCookie();
                    break;
                case 'del':
                    this.delCookie();
                    break;
            };
        },

        addCookie: function () { // 쿠키 추가
            var arr = this.dataChange.split(".");

            if (arr.length == 2) {
                if ($.isPlainObject(this.key)) {
                    cookieJson[arr[0]][arr[1]].push(this.key);
                } else {
                    cookieJson[arr[0]][arr[1]] = this.key;
                }
            } else if (arr.length == 3) {
                if ($.isPlainObject(this.key)) {
                    cookieJson[arr[0]][arr[1]][arr[2]].push(this.key);
                } else {
                    cookieJson[arr[0]][arr[1]][arr[2]] = this.key;
                }
            };
            $.cookie('ticketingState', JSON.stringify(cookieJson), { path: '/' });
        },

        delCookie: function () { // 쿠키 제거
            var arr = this.dataChange.split(".");
            if (arr.length == 2) {
                if (this.key = 'arr') {
                    cookieJson[arr[0]][arr[1]] = [];
                } else {
                    cookieJson[arr[0]][arr[1]] = '';
                }
            } else if (arr.length == 3) {
                if (this.key = 'arr') {
                    cookieJson[arr[0]][arr[1]][arr[2]] = [];
                } else {
                    cookieJson[arr[0]][arr[1]][arr[2]] = '';
                }
            };

            $.cookie('ticketingState', JSON.stringify(cookieJson), { path: '/' });
        },
    };

    $.fn.cookieChanges = function (action, state, key) { // 쿠키 추가,제거 호출
        var cookieChange = new $.fn.cookieGeneration({ 'action': action, 'dataChange': state, 'key': key });
    };

    $.fn.cookieReset = function () { // 쿠키 리셋
        $.cookie('ticketingState', '', { path: '/' });

        cookieJson = {
            ticketingState: {
                ticketing: {
                    playDate: "",
                    playWeek: "",
                    screentype: [],
                    areaCodes: [],
                    cinemaCodes: [],
                    movieCodes: [],
                    playSequenceCode: [],
                    screenDivision: "",
                    sortMovieCode: "",
                    sortFilmCode: ""
                },
                seatSelect: {
                    SeatType: [],
                    SeatCodes: [],
                    seatArray: [],
                    transNo: ""
                },
                schedule: {
                    tabIdx: "",
                    playDateId: "",
                    cinemaId: "",
                    movieArea: "",
                    movieId: "",
                    movieSort: "",
                    playSequenceId: ""
                },
                payment: "",
                /// eventCode: "",
                goods: "",
                BookingStatus: '',
            }
        };
    };
//});