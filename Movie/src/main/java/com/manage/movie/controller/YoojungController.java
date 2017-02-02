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
		model.addAttribute("List1", movieService.selectTheaterList("����"));
		model.addAttribute("List2", movieService.selectTheaterList("���"));
		model.addAttribute("List3", movieService.selectTheaterList("��û/����"));
		model.addAttribute("List4", movieService.selectTheaterList("�λ�/�뱸"));
		model.addAttribute("List5", movieService.selectTheaterList("����/����"));
		
		model.addAttribute("movie", movieService.movieselectList()); // ��������
		
		/*model.addAttribute("movieList11", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList12", movieService.selectTheaterMovieList("��"));
		model.addAttribute("movieList13", movieService.selectTheaterMovieList("���"));
		model.addAttribute("movieList14", movieService.selectTheaterMovieList("���ǵ�"));
		model.addAttribute("movieList15", movieService.selectTheaterMovieList("����"));
		
		model.addAttribute("movieList21", movieService.selectTheaterMovieList("�Ȼ�"));
		model.addAttribute("movieList22", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList23", movieService.selectTheaterMovieList("�Ⱦ�"));
		model.addAttribute("movieList24", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList25", movieService.selectTheaterMovieList("����"));
		
		model.addAttribute("movieList31", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList32", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList33", movieService.selectTheaterMovieList("û��"));
		model.addAttribute("movieList34", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList35", movieService.selectTheaterMovieList("õ��"));
		
		model.addAttribute("movieList41", movieService.selectTheaterMovieList("�ؿ��"));
		model.addAttribute("movieList42", movieService.selectTheaterMovieList("�뱸����"));
		model.addAttribute("movieList43", movieService.selectTheaterMovieList("�뱸��Ÿ���"));
		model.addAttribute("movieList44", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList45", movieService.selectTheaterMovieList("�뱸����"));
		
		model.addAttribute("movieList51", movieService.selectTheaterMovieList("�ͻ�"));
		model.addAttribute("movieList52", movieService.selectTheaterMovieList("����"));
		model.addAttribute("movieList53", movieService.selectTheaterMovieList("������õ"));
		model.addAttribute("movieList54", movieService.selectTheaterMovieList("����ȿ��"));
		model.addAttribute("movieList55", movieService.selectTheaterMovieList("�����͹̳�"));*/

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
	      
	      if ( "".equals(th_name)) th_name = "����";
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
	      
	      if ( "".equals(th_name)) th_name = "����";
	      
	      model.addAttribute("movieList", movieService.selectTheaterMovieList(th_name));
	      
	      return "ticketing_iframe_movieList";
	   }
}
