package com.manage.movie.controller;

import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.manage.movie.service.GwanYeongService;
import com.manage.movie.vo.TheaterDetailEntity;
import com.manage.movie.vo.TheaterEntity;

/**
 * Handles requests for the application home page.
 */
@Controller
public class GwanYeongController {

	@Autowired
	GwanYeongService movieService;
	private static final Logger logger = LoggerFactory.getLogger(GwanYeongController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws Exception 
	 */
/*
	@RequestMapping("/index")
	public String ProfileAllList(Locale locale, Model model) throws Exception {

		//model.addAttribute("mo", movieService.movieselectList());
		//model.addAttribute("no", movieService.noticewhereall());
		return "index";
	}
	@RequestMapping("/login")
	public String LoginAllList(Locale locale, Model model) throws Exception {

		return "login";
	}

	@RequestMapping("/movie-schedule")
	public String sendMovieSchedule(Locale locale, Model model) throws Exception {

		//model.addAttribute("movie", movieService.selectMovie("���ͽ��ڶ�"));

		//model.addAttribute("doList", movieService.selectDoList());
		return "movie-schedule";
	}

	@RequestMapping("/Movie-List")
	public String sendMovieList(Locale locale, Model model) throws Exception {
		movieService.getAllList();

		model.addAttribute("MovieList", movieService.getAllList());
		return "Movie-List";
	}*/

	@RequestMapping("/Cinema-Detail")
	public String sendCinemaDetail(Locale locale, Model model, HttpServletRequest req) throws Exception {

		// 영화관 지역 목록
		List<TheaterEntity> theaterList =  movieService.selectDoList();
		
		for ( int i = 0; i < theaterList.size(); i++){
			String th_do = theaterList.get(i).getTh_do();
			int th_id = theaterList.get(i).getTh_id();
			String url = "Cinema-Detail?th_do=" + th_do;
			theaterList.get(i).setEtc(url);
		}

		model.addAttribute("theaterList", theaterList);
		// 상세조회 
		int p_th_id = 0;
		String p_th_do = "";

		Enumeration list = req.getParameterNames();

		while(list.hasMoreElements()){
			String paramName = list.nextElement().toString();
			if ( "th_do".equals(paramName)) {
				p_th_do = req.getParameter("th_do");
			}

			if ( "th_id".equals(paramName)) {
				p_th_id = Integer.parseInt(req.getParameter("th_id"));
			}
		}

		if (p_th_id == 0) p_th_id = 1;
		if (p_th_do.equals("")) p_th_do = "서울";

			HashMap theaterDetailEntity = movieService.detailTheaterInfo(p_th_id);
			String bus = theaterDetailEntity.get("BUS").toString().replace("\\r\\n", "<br>");
			theaterDetailEntity.put("BUS", bus);
			String subway = theaterDetailEntity.get("SUBWAY").toString().replace("\\r\\n", "<br>");
			theaterDetailEntity.put("SUBWAY", subway);
			String car = theaterDetailEntity.get("CAR").toString().replace("\\r\\n", "<br>");
			theaterDetailEntity.put("CAR", car);
			String pkLot = theaterDetailEntity.get("PKLOT").toString().replace("\\r\\n", "<br>");
			theaterDetailEntity.put("PKLOT", pkLot);
			
			model.addAttribute("info", theaterDetailEntity);

			List<TheaterEntity> inDoTheaterList = movieService.selectListTheaterInDo(p_th_do);
			for ( int i = 0; i < inDoTheaterList.size(); i++){
				String th_do = inDoTheaterList.get(i).getTh_do();
				int th_id = inDoTheaterList.get(i).getTh_id();
				String url = "Cinema-Detail?th_do=" + th_do + "&th_id=" + th_id;
				inDoTheaterList.get(i).setEtc(url);
			}

			System.out.println(inDoTheaterList.get(0).getEtc());
			model.addAttribute("inTheaterList", inDoTheaterList);
			
			// 상영일정 - 시간
			System.out.println("movieService.screeninginfo() bf");
			List<HashMap> screeningInfo = movieService.screeninginfo(p_th_id);
			System.out.println("movieService.screeninginfo() af");
			model.addAttribute("screeningInfoList", screeningInfo);
			System.out.println("movieService.screeningTitleinfo() bf");
			List<HashMap> screeningTitleinfo = movieService.screeningTitleinfo(p_th_id);
			System.out.println("movieService.screeningTitleinfo() af");
			model.addAttribute("titleList", screeningTitleinfo);
		return "Cinema-Detail";
	}



}
