//문자열빌더
//배열을 사용해사 문자열을 조합하는데 사용한다.
var StringBuilder = function () {
	this.buffer = new Array();
}

StringBuilder.prototype = {
	//문자열을 배열에 추가한다.
	//params>
	//		strValue: 추가할 문자열 값
	//return>
	Append: function (strValue) {
		this.buffer[this.buffer.length] = strValue;
	},

	//문자열의 형식을 지정해서 추가한다. 
	//AppendFormat(strValue, arg0{,arg1, arg2,..., argn});
	//strValue: 추가할 문자열형식
	//arg0 ~ argn: 문자열 형식에 {0}~{n} 의 첨자와 치환되어야 하는 문자열
	//ex) AppendFormat(".....{0}.....{1}", "aaaa", bbb}
	//return>
	AppendFormat: function () {
		var count = arguments.length;
		if (count < 2) return "";
		var strValue = arguments[0];
		for (var i = 1; i < count; i++)
		{
			var exp = new RegExp("\\{" + (i - 1) + "\\}", "g");
			strValue = strValue.replace(exp, arguments[i]);
		}
		this.buffer[this.buffer.length] = strValue;
	},

	// 해당하는 위치에 문자열을 삽입한다. 
	//params>
	//		idx: index
	//		strValue: 삽입할 문자열
	//return>
	Insert: function (idx, strValue) {
		this.buffer.splice(idx, 0, strValue);
	},

	// 해당 위치에 저장된 문자열을 변경한다.
	//params>
	//		idx: index
	//		strValue: 변경한 문자열
	//return>
	Change: function (idx, strValue) {
		this.buffer.splice(idx, 1, strValue);
	},

	// 해당문자열을 새로운 문자열로 바꾼다. 
	// (배열방 단위로 바꾸므로 배열방 사이에 낀 문자열은 바꾸지 않음)
	//params>
	//		from: 바꿔져야 하는 대상 문자열
	//		to: 바꾸야 하는 대체 문자열
	//return>
	Replace: function (from, to) {
		for (var i = this.buffer.length - 1; i >= 0; i--)
			this.buffer[i] = this.buffer[i].replace(new RegExp(from, "g"), to);
	},

	//등록되어 있는 모든 문자열을 하나의 문자열로 반환한다.
	//params>
	//return>
	ToString: function () {
		return this.buffer.join("");
	},

	// 해당하는 위치의 문자열을 삭제한다.
	//params>
	//idx: index
	//return>
	Remove: function (idx) {
		if (this.buffer.length > idx)
			this.buffer.splice(idx, 1);
	},

	// 모든 문자열을 삭제한다.
	//params>
	//return>
	RemoveAll: function () {
		this.buffer.splice(0, this.buffer.length);
	},

	//문자열 저장 버퍼의 길이를 반환한다.
	//params>
	//return>
	GetLength: function () {
		return this.buffer.length;
	}
}