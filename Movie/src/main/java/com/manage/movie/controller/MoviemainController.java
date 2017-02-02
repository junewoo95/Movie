package com.manage.movie.controller;


import java.util.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.manage.movie.service.MovieService;
import com.manage.movie.vo.TheaterEntity;
import com.manage.movie.vo.FaqEntity;
import com.manage.movie.vo.MemberEntity;
import com.manage.movie.vo.NonmemberEntity;
import com.manage.movie.vo.NoticeEntity;
/**
 * Handles requests for the application home page.
 */
@Controller
public class MoviemainController {
	
	@Autowired
	MovieService movieService;
	private static final Logger logger = LoggerFactory.getLogger(MoviemainController.class);
	/**
	 * Simply selects the home view to render by returning its name.
	 * @throws Exception 
	 */
	
	@RequestMapping("/index")
	public String ProfileAllList(Locale locale, Model model,HttpServletRequest request,HttpSession session) throws Exception {
		model.addAttribute("mo1", movieService.movieselectList1());
		model.addAttribute("mo2", movieService.movieselectList2());
		model.addAttribute("no", movieService.noticewhereall());
		String idCheck = "n";
		
		Enumeration sessList = session.getAttributeNames();
		
		boolean idCheckFlag = false;
		
		while(sessList.hasMoreElements()){
			if ( sessList.nextElement().equals("idcheck")) idCheckFlag = true;
		}
		
		if ( !idCheckFlag ) session.setAttribute("idcheck", idCheck);
		
		
		//System.out.println(request.getAttribute("idcheck"));
		//Enumeration params1 = session.getAttributeNames();
		Enumeration params2 = request.getParameterNames();
	
		String mb=null;
		String nmb=null;
		/*while(params1.hasMoreElements()){
			
			String paramName = params1.nextElement().toString();
			if (paramName.equals("idcheck")){
				idCheck = (String)session.getAttribute("idcheck");	
			}
			else if(paramName.equals("mb_name")){
				mb = (String)session.getAttribute("mb_name");
			}
			else if(paramName.equals("nmb_name")){
				nmb = (String)session.getAttribute("nmb_name");
			}
			session.setAttribute("mb_name", mb);
			System.out.println(mb);
			session.setAttribute("nmb_name", nmb);
			session.setAttribute("idcheck", idCheck);
			System.out.println(idCheck);
		}*/
		while(params2.hasMoreElements()){
			String paramName = params2.nextElement().toString();
			if (paramName.equals("idcheck")){
				idCheck = request.getParameter("idcheck");
				
				if(idCheck.equals("membern")){
					session.removeAttribute("mb_name");
					session.setAttribute("idcheck", "n");
				}
				if(idCheck.equals("nonmembern")){
					session.removeAttribute("nmb_name");
					session.setAttribute("idcheck", "n");
				}
				/*if(paramName.equals("mb_name")){
					mb = request.getParameter("mb_name");
				}
				else if(paramName.equals("nmb_name")){
					nmb = request.getParameter("nmb_name");
				}*/
			}
			
		}
		//model.addAttribute("idcheck", idCheck);
		/*model.addAttribute("mb_name", mb);
		model.addAttribute("nmb_name", nmb);*/
		return "index";
	}
	@RequestMapping("/memberlogincheck")
	public String memberlogincheck(Locale locale, Model model,HttpServletRequest request,MemberEntity mem,HttpSession session) throws Exception {
		
		MemberEntity rtnMem=movieService.idcheck(request.getParameter("mb_id"));
		
		if (rtnMem == null){
			model.addAttribute("msg", "아이디와 비밀번호를 확인 후 다시 시도해 주십시오.");
			return "redirect:login";
		}
		String idcheck="memy";
		String mb_name=rtnMem.getMb_name();
		if(rtnMem.getMb_password().equals(mem.getMb_password())){
			session.setAttribute("idcheck", idcheck);
			session.setAttribute("mb_name", mb_name);
			/*model.addAttribute("idcheck", idcheck);
			model.addAttribute("mb_name", mb_name);
			System.out.println(mb_name);*/
			return "redirect:index";
		}
		else{
			model.addAttribute("msg", "아이디와 비밀번호를 확인 후 다시 시도해 주십시오."); 
			return "redirect:login";
		}
			
	}
	@RequestMapping("/nonmemberinsert")
	public String nonmemberlogincheck(Locale locale, Model model,HttpServletRequest request,MemberEntity mem,NonmemberEntity nmb,HttpSession session) throws Exception {
		if(request.getParameter("nmb_name")!=null){
			nmb.setNmb_phone(request.getParameter("userPhone1")+request.getParameter("userPhone2")+request.getParameter("userPhone3"));
			movieService.insertNonmember(nmb);
			NonmemberEntity rtnnmb=movieService.nonmemberselect(nmb.getNmb_phone());
			String idcheck="nonmemy";
			String nmb_name=rtnnmb.getNmb_name();
			session.setAttribute("idcheck", idcheck);
			session.setAttribute("nmb_name", nmb_name);

		}
		
		
		return "redirect:index";
	}
	@RequestMapping("/login")
	public String LoginAllList(Locale locale, Model model,HttpServletRequest request) throws Exception {
		
		Enumeration params = request.getParameterNames();
		String msg = null;
		while(params.hasMoreElements()){
			String paramName = params.nextElement().toString();
			if (paramName.equals("msg")){
				msg = request.getParameter("msg");	
			}
		}
		model.addAttribute("msg", msg);
		return "login";
	}
	
	@RequestMapping("/newmember")
	public String newmember(Locale locale, Model model,HttpServletRequest request) throws Exception {
		Enumeration params = request.getParameterNames();
		String msg = null;
		while(params.hasMoreElements()){
			String paramName = params.nextElement().toString();
			if (paramName.equals("msg")){
				msg = request.getParameter("msg");	
			}
		}
		model.addAttribute("msg", msg);
		return "newmember";
	}
	@RequestMapping("/memberinsert")
	public String memberinsert(Locale locale, Model model,HttpServletRequest request,MemberEntity mem,NonmemberEntity nmb) throws Exception {
		MemberEntity rtnMem=movieService.idcheck(request.getParameter("mb_id"));
		if(rtnMem!=null){
			model.addAttribute("msg", "아이디가 이미 존재합니다."); 
			return "redirect:newmember";
		}
		if(rtnMem==null){
			mem.setMb_phone(request.getParameter("userPhone1")+request.getParameter("userPhone2")+request.getParameter("userPhone3"));
			mem.setMb_birth(request.getParameter("year")+"-"+request.getParameter("month")+"-"+request.getParameter("day"));
			mem.setMb_mileage("0");
			mem.setMb_rating("bronze");
			movieService.insertmember(mem);
		}
		
		
		return "redirect:index";
	}
	@RequestMapping("/notice")
	public String notice(Locale locale, Model model,HttpSession session,HttpServletRequest request) throws Exception {
		int page= Integer.parseInt(request.getParameter("page"));
		
		model.addAttribute("faq", movieService.faqorderbyid());
		model.addAttribute("notice", movieService.noticewhereall());	
		model.addAttribute("noticeall",movieService.noticepaging(page));
		model.addAttribute("noticeallsize", movieService.noticeorderbydate().size());
		model.addAttribute("page",page);
		
		return "notice";
	}
	@RequestMapping("/noticelist")
	public String noticelist(Locale locale, Model model,HttpSession session,HttpServletRequest request) throws Exception {
		int page= Integer.parseInt(request.getParameter("page"));
		
		if(!request.getParameter("list").isEmpty()){
			model.addAttribute("noticeview", "yes");
		}
		model.addAttribute("faq", movieService.faqorderbyid());
		model.addAttribute("notice", movieService.noticewhereall());	
		model.addAttribute("noticeall", movieService.noticepaging(page));
		model.addAttribute("noticeallsize", movieService.noticeorderbydate().size());
		model.addAttribute("page",page);
		return "notice";
	}
	@RequestMapping("/search")
	public String searchnotice(Locale locale, Model model,FaqEntity faq,HttpSession session,HttpServletRequest request) throws Exception {
		List<FaqEntity> faqList=movieService.faqsearch(request.getParameter("searchKeyword1"));
		//request.getParameter("selectCodition");
		System.out.println(request.getParameter("searchKeyword1"));
		if(faqList.isEmpty()){//찾을게없으면
			model.addAttribute("divSearchNone", "none");
		}
		if(!request.getParameter("searchKeyword2").isEmpty()){
			model.addAttribute("noticeall",movieService.noticesearch(request.getParameter("searchKeyword2"),request.getParameter("selectCodition")));
			model.addAttribute("noticeallsize",movieService.noticesearch(request.getParameter("searchKeyword2"),request.getParameter("selectCodition")).size());
			model.addAttribute("noticeview", "yes");
		}
		else if(request.getParameter("searchKeyword1")!=""){
			model.addAttribute("faqview", "yes");
			model.addAttribute("noticeall", movieService.noticeorderbydate());
			model.addAttribute("noticeallsize", movieService.noticeorderbydate().size());		
			model.addAttribute("notice", movieService.noticewhereall());
		}
		else if(request.getParameter("searchKeyword2").isEmpty()){
			model.addAttribute("noticeview", "yes");
			model.addAttribute("noticeall", movieService.noticeorderbydate());
			model.addAttribute("noticeallsize", movieService.noticeorderbydate().size());		
			model.addAttribute("notice", movieService.noticewhereall());
		}
		else{
			model.addAttribute("noticeall", movieService.noticeorderbydate());
			model.addAttribute("noticeallsize", movieService.noticeorderbydate().size());		
			model.addAttribute("notice", movieService.noticewhereall());
		}
		model.addAttribute("faq", movieService.faqsearch(request.getParameter("searchKeyword1")));		
		
		return "notice";
	}
	@RequestMapping("/notice_detail")
	public String notice_detail(Locale locale, Model model,NoticeEntity notice,HttpSession session,HttpServletRequest request) throws Exception {
		NoticeEntity not=movieService.noticewherenoid(Integer.parseInt(request.getParameter("no_id")));
		if(not.getNo_context().contains(".jpg")){
			model.addAttribute("noticeimg", "noticeimg");
		}
		String notreplace=not.getNo_context().replace("\\r\\n", "<br>");
		not.setNo_context(notreplace);
		model.addAttribute("notice", not);
		
		
		return "notice_detail";
	}

	
}
