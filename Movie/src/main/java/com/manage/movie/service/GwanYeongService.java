package com.manage.movie.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.movie.dao.GwanYeongDao;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.TheaterDetailEntity;
//import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;

@Service
public class GwanYeongService {

	@Autowired
	private GwanYeongDao movieDao;

	public List<MovieEntity> movieselectList() throws Exception{

		List<MovieEntity>rtnList = movieDao.movieselectList();

		return rtnList;
	}
/*	public List<NoticeEntity> noticewhereall() throws Exception{

		List<NoticeEntity>rtnList = movieDao.noticewhereall();

		return rtnList;
	}*/
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
	
	public HashMap detailTheaterInfo(int th_id) throws Exception {
		HashMap rtnList = movieDao.detailTheaterInfo(th_id);
		return rtnList;
	}
	
	public List<TheaterEntity> selectListTheaterInDo(String th_do) throws Exception{
		List<TheaterEntity>rtnList = movieDao.selectListTheaterInDo(th_do);

		return rtnList;
	}
	public List<HashMap> screeninginfo(int th_id) throws Exception{
		List<HashMap> rtnList = movieDao.screeninginfo(th_id);
		return rtnList;
	}
	public List<HashMap> screeningTitleinfo(int th_id) throws Exception{
		List<HashMap> rtnList = movieDao.screeningTitleinfo(th_id);
		return rtnList;
	}
}
