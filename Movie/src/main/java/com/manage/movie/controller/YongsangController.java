package com.manage.movie.controller;

import java.util.Enumeration;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.manage.movie.service.YongsangService;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.TheaterEntity;

/**
 * Handles requests for the application home page.
 */
@Controller
public class YongsangController {
	
	@Autowired
	YongsangService movieService;
	private static final Logger logger = LoggerFactory.getLogger(MoviemainController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws Exception 
	 */
	@RequestMapping("/Movie-List")
	public String sendMovieList(Locale locale, Model model, HttpServletRequest req) throws Exception {
		//movieService.getAllList();

		String mode = "";
		String mode2 = "";
		
		Enumeration paramlist = req.getParameterNames();
		
		while(paramlist.hasMoreElements()){
			String paramName = paramlist.nextElement().toString();
			
			if ( "mode".equals(paramName)){
				mode = req.getParameter("mode");
			}
			
			if ( "mode2".equals(paramName)){
				mode2 = req.getParameter("mode2");
			}
		}
		
		if ( mode.equals("")) mode = "a";
		if ( mode2.equals("")) mode2 = "1";

		if ( mode2.equals("1") && mode.equals("a")){
			model.addAttribute("MovieList", movieService.getAllList()); // ������� -> ���ż�(�ϼ�)
		}
		else if ( "b".equals(mode) && mode2.equals("1")){
			model.addAttribute("MovieList", movieService.getAllList2()); // ������� ->������(�ϼ�)
		}
		else if ( mode2.equals("2")){
			model.addAttribute("MovieList", movieService.getAllList3()); // �󿵿�����
			List<MovieEntity> list = movieService.getAllList3();			
		}
		
		model.addAttribute("mode", mode);
		model.addAttribute("mode2",mode2); 
		//model.addAttribute("MovieList", movieService.getAllList());
		return "Movie-List";
	}
}
