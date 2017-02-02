package com.manage.movie.controller;

import java.util.Locale;

import java.util.Enumeration;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.manage.movie.service.YoojungService;
import com.manage.movie.vo.*;

/**
 * Handles requests for the application home page.
 */
@Controller
public class YoojungController {
	
	@Autowired
	YoojungService movieService;
	private static final Logger logger = LoggerFactory.getLogger(YoojungController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws Exception 
	 */
	
	@RequestMapping("/ticketing")
	public String MovieList(HttpServletRequest request, MovieEntity movie, TheaterEntity theater, Model model) throws Exception {
		model.addAttribute("doList", movieService.selectDoList());
		model.addAttribute("List1", movieService.selectTheaterList("서울"));
		model.addAttribute("List2", movieService.selectTheaterList("경기"));
		model.addAttribute("List3", movieService.selectTheaterList("충청/대전"));
		model.addAttribute("List4", movieService.selectTheaterList("부산/대구"));
		model.addAttribute("List5", movieService.selectTheaterList("전라/광주"));
		
		model.addAttribute("movie", movieService.movieselectList()); // 예매율순
		
		/*model.addAttribute("movieList11", movieService.selectTheaterMovieList("강남"));
		model.addAttribute("movieList12", movieService.selectTheaterMovieList("명동"));
		model.addAttribute("movieList13", movieService.selectTheaterMovieList("상암"));
		model.addAttribute("movieList14", movieService.selectTheaterMovieList("여의도"));
		model.addAttribute("movieList15", movieService.selectTheaterMovieList("구로"));
		
		model.addAttribute("movieList21", movieService.selectTheaterMovieList("안산"));
		model.addAttribute("movieList22", movieService.selectTheaterMovieList("군포"));
		model.addAttribute("movieList23", movieService.selectTheaterMovieList("안양"));
		model.addAttribute("movieList24", movieService.selectTheaterMovieList("용인"));
		model.addAttribute("movieList25", movieService.selectTheaterMovieList("수원"));
		
		model.addAttribute("movieList31", movieService.selectTheaterMovieList("당진"));
		model.addAttribute("movieList32", movieService.selectTheaterMovieList("세종"));
		model.addAttribute("movieList33", movieService.selectTheaterMovieList("청주"));
		model.addAttribute("movieList34", movieService.selectTheaterMovieList("서산"));
		model.addAttribute("movieList35", movieService.selectTheaterMovieList("천안"));
		
		model.addAttribute("movieList41", movieService.selectTheaterMovieList("해운대"));
		model.addAttribute("movieList42", movieService.selectTheaterMovieList("대구한일"));
		model.addAttribute("movieList43", movieService.selectTheaterMovieList("대구스타디움"));
		model.addAttribute("movieList44", movieService.selectTheaterMovieList("서면"));
		model.addAttribute("movieList45", movieService.selectTheaterMovieList("대구수성"));
		
		model.addAttribute("movieList51", movieService.selectTheaterMovieList("익산"));
		model.addAttribute("movieList52", movieService.selectTheaterMovieList("목포"));
		model.addAttribute("movieList53", movieService.selectTheaterMovieList("여수웅천"));
		model.addAttribute("movieList54", movieService.selectTheaterMovieList("전주효자"));
		model.addAttribute("movieList55", movieService.selectTheaterMovieList("광주터미널"));*/

		//model.addAttribute("theater", movieService.selectTheater());
		
		return "ticketing";
	}	
	
	@RequestMapping("/ticketing_iframe")
	   public String sendTicketingIframe(Locale locale, Model model, HttpServletRequest req) throws Exception {
	      
	      Enumeration paramList = req.getParameterNames();
	      String th_name = "";
	      String ss_date = "";
	      
	      while(paramList.hasMoreElements()){
	         String paramName = paramList.nextElement().toString();
	         if("th_name".equals(paramName)){
	            th_name = req.getParameter("th_name");
	         }
	      }
	      
	      if ( "".equals(th_name)) th_name = "강남";
	      ss_date = req.getParameter("ss_date");
	      
	      model.addAttribute("movieList", movieService.selectTheaterMovieList(th_name));
	      model.addAttribute("movieListTime", movieService.selectTheaterMovieListTime(th_name, ss_date));
	      model.addAttribute("theater_name", th_name);

	      return "ticketing_iframe";
	   }
	
	@RequestMapping("/ticketing_iframe_movieList")
	   public String sendTicketingIframeMovie(Locale locale, Model model, HttpServletRequest req) throws Exception {
	      
	      Enumeration paramList = req.getParameterNames();
	      String th_name = "";
	      
	      while(paramList.hasMoreElements()){
	         String paramName = paramList.nextElement().toString();
	         if("th_name".equals(paramName)){
	            th_name = req.getParameter("th_name");
	         }
	      }
	      
	      if ( "".equals(th_name)) th_name = "강남";
	      
	      model.addAttribute("movieList", movieService.selectTheaterMovieList(th_name));
	      
	      return "ticketing_iframe_movieList";
	   }
}
