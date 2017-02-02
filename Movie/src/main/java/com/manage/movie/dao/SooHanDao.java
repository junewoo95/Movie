package com.manage.movie.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.manage.movie.vo.EventEntity;
import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;


@Repository
public class SooHanDao{
	
	@Autowired
	SqlSessionTemplate sqlSession;

	public List<MovieEntity> movieselectList() throws Exception{
			return sqlSession.selectList("movieDao.movieorderby");
	}
/*	public List<NoticeEntity> noticewhereall() throws Exception{
		return sqlSession.selectList("movieDao.noticewhereall");
	}*/
	
	//占쏙옙占싱몌옙 占쏙옙占�
	public List<TheaterEntity> selectDoList() throws Exception{
		return sqlSession.selectList("movieDao.selectDoLocation");
	}
	public List<TheaterEntity> selectTheaterList(String th_do) throws Exception{
		return sqlSession.selectList("movieDao.selectTheaterLocation",th_do);
	}
	public List<HashMap> selectTheaterMovieList(String th_name) throws Exception{
		return sqlSession.selectList("movieDao.selectTheaterMovie",th_name);
	}
	public List<HashMap> selectTheaterMovieListTime(String th_name,String ss_date) throws Exception{
		HashMap map= new HashMap();
		map.put("th_name", th_name);
		map.put("ss_date", ss_date);
		return sqlSession.selectList("movieDao.selectTheaterMovieTime",map);
	}
	public List<EventEntity> selectEvent() throws Exception{
		return sqlSession.selectList("movieDao.selectEvent");
	}
	public EventEntity selectEventDetail(String ev_id) throws Exception{
		return sqlSession.selectOne("movieDao.selectEventDetail",ev_id);
	}
	
	
	//占쏙옙화占쏙옙占쏙옙트 占쏙옙占�
	public List<MovieEntity> selectList() throws Exception{
		return sqlSession.selectList("MovieDao.selectAllList");
	}
	
	public MovieEntity selectmovieInfo(MovieEntity movie) throws Exception{
		//System.out.println(profile.getName());
		//System.out.println(profile.getEmail());
		return sqlSession.selectOne("MovieDao.selectMovie", movie);
	}

}
