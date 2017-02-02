package com.manage.movie.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;


@Repository
public class YoojungDao{
	
	@Autowired
	SqlSessionTemplate sqlSession;

	public List<MovieEntity> movieselectList() throws Exception{
			return sqlSession.selectList("movieDao.movieorderby1");
	}
	
	public List<MovieEntity> selectMovieGrade() throws Exception{
		return sqlSession.selectList("movieDao.selectMovieGrade");
	}
	
	public List<HashMap> selectTheaterMovieList(String th_name) throws Exception{
		return sqlSession.selectList("movieDao.selectTheaterMovieList", th_name);
	}
	
	public List<HashMap> selectTheaterMovieListTime(String th_name) throws Exception{
		return sqlSession.selectList("movieDao.selectTheaterMovieListTime", th_name);
	}

/*	public List<NoticeEntity> noticewhereall() throws Exception{
		return sqlSession.selectList("movieDao.noticewhereall");
	}*/
	
	public List<TheaterEntity> selectDoList() throws Exception{
		return sqlSession.selectList("movieDao.selectDoLocation");
	}
	public List<TheaterEntity> selectTheaterList(String th_do) throws Exception{
		return sqlSession.selectList("movieDao.selectTheaterLocation", th_do);
	}
	
	public List<MovieEntity> selectList() throws Exception{
		return sqlSession.selectList("MovieDao.selectAllList");
	}
	
	public MovieEntity selectmovieInfo(MovieEntity movie) throws Exception{
		return sqlSession.selectOne("MovieDao.selectMovie", movie);
	}

}
