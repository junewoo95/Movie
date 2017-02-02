package com.manage.movie.controller;

import java.util.Enumeration;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.manage.movie.service.SooHanService;
import com.manage.movie.vo.TheaterEntity;

/**
 * Handles requests for the application home page.
 */
@Controller
public class SooHanController {
	
	@Autowired
	SooHanService movieService;
	private static final Logger logger = LoggerFactory.getLogger(SooHanController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws Exception 
	 */

	@RequestMapping("/index")
	public String ProfileAllList(Locale locale, Model model) throws Exception {

	//	model.addAttribute("mo", movieService.movieselectList());
		//model.addAttribute("no", movieService.noticewhereall());
		return "index";
	}
	@RequestMapping("/login")
	public String LoginAllList(Locale locale, Model model) throws Exception {

		return "login";
	}
	
	@RequestMapping("/event-summary-list")
	public String EventList(Locale locale, Model model) throws Exception {
		model.addAttribute("eventList", movieService.selectEvent());

		return "event-summary-list";
	}
	@RequestMapping("/event-detail")
	public String EventDetail(Locale locale, Model model, HttpServletRequest req) throws Exception {
		String ev_id;
		ev_id=req.getParameter("ev_id");
		model.addAttribute("eventDetail", movieService.selectEventDetail(ev_id));

		return "event-detail";
	}
	@RequestMapping("/movie-schedule-iframe")
	public String sendMovieScheduleIframe(Locale locale, Model model, HttpServletRequest req) throws Exception {
		
		Enumeration paramList = req.getParameterNames();
		String th_name = "";
		String ss_date = "";
		while(paramList.hasMoreElements()){
			String paramName = paramList.nextElement().toString();
			if("th_name".equals(paramName)){
				th_name = req.getParameter("th_name");
			}
		}
		
		if ( "".equals(th_name)) th_name = "°­³²";
		ss_date = req.getParameter("ss_date");
		
		model.addAttribute("movieList", movieService.selectTheaterMovieList(th_name));
		
		model.addAttribute("movieListTime", movieService.selectTheaterMovieListTime(th_name,ss_date));

		return "movie-schedule-iframe";
	}
	@RequestMapping("/movie-schedule")
	public String sendMovieSchedule(Locale locale, Model model, HttpServletRequest req) throws Exception {
		
		//model.addAttribute("movie", movieService.selectMovie("ï¿½ï¿½ï¿½Í½ï¿½ï¿½Ú¶ï¿½"));
	//	String siname=req.getParameter("siname");
		//System.out.println(siname+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!");
		
		model.addAttribute("doList", movieService.selectDoList());
		model.addAttribute("List1", movieService.selectTheaterList("¼­¿ï"));
		model.addAttribute("List2", movieService.selectTheaterList("°æ±â"));
		model.addAttribute("List3", movieService.selectTheaterList("ÃæÃ»/´ëÀü"));
		model.addAttribute("List4", movieService.selectTheaterList("ºÎ»ê/´ë±¸"));
		model.addAttribute("List5", movieService.selectTheaterList("Àü¶ó/±¤ÁÖ"));
		

		

		return "movie-schedule";
	}
	
	@RequestMapping("/Movie-List")
	public String sendMovieList(Locale locale, Model model) throws Exception {
		//movieService.getAllList();
		
		//model.addAttribute("MovieList", movieService.getAllList());
		return "Movie-List";
	}
	
	
}
