package com.manage.movie.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.manage.movie.dao.YongsangDao;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;

@Service
public class YongsangService {

	@Autowired
	private YongsangDao movieDao;

	public List<MovieEntity> getAllList() throws Exception{ //�쁽�옱�긽�쁺�옉-�뼐留ㅼ닚

		List<MovieEntity>rtnList = movieDao.selectList();

		return rtnList;
	}
	
	public List<MovieEntity> getAllList2() throws Exception{ //�쁽�옱�긽�쁺�옉-�룊�젏�닚

		List<MovieEntity>rtnList = movieDao.selectList2();

		return rtnList;
	}
	
	public List<MovieEntity> getAllList3() throws Exception{ //�긽�쁺�삁�젙�옉

		List<MovieEntity>rtnList = movieDao.selectList3();

		return rtnList;
	}
}
