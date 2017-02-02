package com.manage.movie.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;


@Repository
public class YongsangDao{
	
	@Autowired
	SqlSessionTemplate sqlSession;

	//�뜝�룞�삕�솕�뜝�룞�삕�뜝�룞�삕�듃 �뜝�룞�삕�뜝占�
	public List<MovieEntity> selectList() throws Exception{
		return sqlSession.selectList("movieDao.selectAllList");
	}
	
	public List<MovieEntity> selectList2() throws Exception{
		return sqlSession.selectList("movieDao.selectAllList2");
	}
	
	public List<MovieEntity> selectList3() throws Exception{
		return sqlSession.selectList("movieDao.selectAllList3");
	}
}
