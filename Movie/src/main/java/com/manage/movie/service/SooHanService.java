package com.manage.movie.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.movie.dao.SooHanDao;
import com.manage.movie.vo.EventEntity;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;

@Service
public class SooHanService {

	@Autowired
	private SooHanDao movieDao;

	public List<MovieEntity> movieselectList() throws Exception{

		List<MovieEntity>rtnList = movieDao.movieselectList();

		return rtnList;
	}
/*	public List<NoticeEntity> noticewhereall() throws Exception{

		List<NoticeEntity>rtnList = movieDao.noticewhereall();

		return rtnList;
	}*/
	//�뜝�룞�삕 �뜝�떛紐뚯삕 �뜝�룞�삕�뜝占�
	public List<TheaterEntity> selectDoList() throws Exception{

		List<TheaterEntity>rtnList = movieDao.selectDoList();

		return rtnList;
	}
	public List<TheaterEntity> selectTheaterList(String th_do) throws Exception{

		List<TheaterEntity>rtnList = movieDao.selectTheaterList(th_do);

		return rtnList;
	}
	public List<HashMap> selectTheaterMovieList(String th_name) throws Exception{

		List<HashMap>rtnList = movieDao.selectTheaterMovieList(th_name);
/*		System.out.println(rtnList.size());
		System.out.println(rtnList.get(0).toString());
HashMap hm = rtnList.get(0);
System.out.println(hm.values());*/
		return rtnList;
	}
	public List<HashMap> selectTheaterMovieListTime(String th_name,String ss_date) throws Exception{

		List<HashMap> rtnList = movieDao.selectTheaterMovieListTime(th_name,ss_date);

		return rtnList;
	}
	public List<EventEntity> selectEvent() throws Exception{

		List<EventEntity> rtnList = movieDao.selectEvent();

		return rtnList;
	}
	public EventEntity selectEventDetail(String ev_id) throws Exception{

		EventEntity rtnList = movieDao.selectEventDetail(ev_id);

		return rtnList;
	}

}
