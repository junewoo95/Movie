package com.manage.movie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.movie.dao.MovieDao;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;
import com.manage.movie.vo.NonmemberEntity;
import com.manage.movie.vo.MemberEntity;
import com.manage.movie.vo.FaqEntity;
@Service
public class MovieService {

	@Autowired
	private MovieDao movieDao;

	public List<MovieEntity> movieselectList1() throws Exception{

		List<MovieEntity>rtnList = movieDao.movieselectList1();

		return rtnList;
	}
	public List<MovieEntity> movieselectList2() throws Exception{

		List<MovieEntity>rtnList = movieDao.movieselectList2();

		return rtnList;
	}
	public MemberEntity idcheck(String id) throws Exception{

		MemberEntity rtn = movieDao.idcheck(id);

		return rtn;
	}
	public int insertNonmember(NonmemberEntity nmb) throws Exception{	
		int a= movieDao.insertNonmember(nmb);	
		return a;
	}
	public int insertmember(MemberEntity mb) throws Exception{	
		int a= movieDao.insertmember(mb);	
		return a;
	}
	public NonmemberEntity nonmemberselect(String nmb) throws Exception{
		NonmemberEntity rtn = movieDao.nonmemberselect(nmb);
		return rtn;
	}
	public List<NoticeEntity> noticewhereall() throws Exception{

		List<NoticeEntity>rtnList = movieDao.noticewhereall();

		return rtnList;
	}
	public List<NoticeEntity> noticeorderbydate() throws Exception{

		List<NoticeEntity>rtnList = movieDao.noticeorderbydate();

		return rtnList;
	}
	public NoticeEntity noticewherenoid(int no_id) throws Exception{

		NoticeEntity rtn = movieDao.noticewherenoid(no_id);

		return rtn;
	}
	public List<NoticeEntity> noticepaging(int page) throws Exception{
		List<NoticeEntity>rtnList = movieDao.noticepaging(page);
		return rtnList;
	}
	public List<NoticeEntity> noticesearch(String search,String con) throws Exception{
		List<NoticeEntity>rtnList = movieDao.noticesearch(search,con);
		return rtnList;
	}
	public List<FaqEntity> faqorderbyid() throws Exception{

		List<FaqEntity>rtnList = movieDao.faqorderbyid();

		return rtnList;
	}
	public List<FaqEntity> faqsearch(String search) throws Exception{

		List<FaqEntity>rtnList = movieDao.faqsearch(search);

		return rtnList;
	}
	//�� �̸� ���
	public List<TheaterEntity> selectDoList() throws Exception{

		List<TheaterEntity>rtnList = movieDao.selectDoList();

		return rtnList;
	}

	public List<MovieEntity> getAllList() throws Exception{

		List<MovieEntity>rtnList = movieDao.selectList();

		return rtnList;
	}
	public MovieEntity selectMovieInfo(MovieEntity movie) throws Exception{
		return movieDao.selectmovieInfo(movie);
	}
}
