package com.manage.movie.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterDetailEntity;
import com.manage.movie.vo.TheaterEntity;


@Repository
public class GwanYeongDao{
	
	@Autowired
	SqlSessionTemplate sqlSession;

	public List<MovieEntity> movieselectList() throws Exception{
			return sqlSession.selectList("movieDao.movieorderby");
	}
/*	public List<NoticeEntity> noticewhereall() throws Exception{
		return sqlSession.selectList("movieDao.noticewhereall");
	}*/
	
	//���̸� ���
	public List<TheaterEntity> selectDoList() throws Exception{
		return sqlSession.selectList("movieDao.selectDoLocation");
	}
	
	
	//��ȭ����Ʈ ���
	public List<MovieEntity> selectList() throws Exception{
		return sqlSession.selectList("movieDao.selectAllList");
	}
	
	public MovieEntity selectmovieInfo(MovieEntity movie) throws Exception{
		//System.out.println(profile.getName());
		//System.out.println(profile.getEmail());
		return sqlSession.selectOne("movieDao.selectMovie", movie);
	}
	public HashMap detailTheaterInfo(int th_id) throws Exception{
		TheaterDetailEntity detail = new TheaterDetailEntity();
		detail.setTd_id(th_id);
		return sqlSession.selectOne("movieDao.detailTheaterInfo", detail);
	}
	public List<HashMap> screeninginfo(int th_id) throws Exception{
		
		return sqlSession.selectList("movieDao.screeninginfo", th_id );
	}
	public List<HashMap> screeningTitleinfo(int th_id) throws Exception{
		
		return sqlSession.selectList("movieDao.screeningTitleinfo" , th_id);
	}
	
	public List<TheaterEntity> selectListTheaterInDo(String th_do) throws Exception{
		return sqlSession.selectList("movieDao.selectListTheaterInDo", th_do );
	}
}
