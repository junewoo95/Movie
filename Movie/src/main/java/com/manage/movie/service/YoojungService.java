package com.manage.movie.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.movie.dao.YoojungDao;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;

@Service
public class YoojungService {

	@Autowired
	private YoojungDao movieDao;

	public List<MovieEntity> movieselectList() throws Exception{

		List<MovieEntity> rtnList = movieDao.movieselectList();

		return rtnList;
	}
	
	public List<HashMap> selectTheaterMovieList(String th_name) throws Exception{

		List<HashMap> rtnList = movieDao.selectTheaterMovieList(th_name);

		return rtnList;
	}
	
	public List<HashMap> selectTheaterMovieListTime(String th_name, String ss_date) throws Exception{

		List<HashMap> rtnList = movieDao.selectTheaterMovieListTime(th_name, ss_date);

		return rtnList;
	}
	
	public List<TheaterEntity> selectDoList() throws Exception{

		List<TheaterEntity>rtnList = movieDao.selectDoList();

		return rtnList;
	}
	
	public List<TheaterEntity> selectTheaterList(String th_do) throws Exception{

		List<TheaterEntity>rtnList = movieDao.selectTheaterList(th_do);

		return rtnList;
	}

}
