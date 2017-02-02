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