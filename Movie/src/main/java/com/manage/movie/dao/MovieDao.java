package com.manage.movie.dao;

import java.util.HashMap;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.manage.movie.vo.MovieEntity;
import com.manage.movie.vo.NoticeEntity;
import com.manage.movie.vo.TheaterEntity;
import com.manage.movie.vo.NonmemberEntity;
import com.manage.movie.vo.MemberEntity;
import com.manage.movie.vo.FaqEntity;
@Repository
public class MovieDao{
	
	@Autowired
	SqlSessionTemplate sqlSession;

	public List<MovieEntity> movieselectList1() throws Exception{
			return sqlSession.selectList("movieDao.movieorderby1");
	}
	public List<MovieEntity> movieselectList2() throws Exception{
		return sqlSession.selectList("movieDao.movieorderby2");
	}
	public List<MemberEntity> memberalllist() throws Exception{
		return sqlSession.selectList("movieDao.memberalllist");
	}
	public MemberEntity idcheck(String id) throws Exception{
		return sqlSession.selectOne("movieDao.idcheck",id);
	}
	public int insertNonmember(NonmemberEntity nmb) throws Exception{	
		return sqlSession.insert("movieDao.insertNonmember", nmb);
	}
	public int insertmember(MemberEntity mb) throws Exception{	
		return sqlSession.insert("movieDao.insertmember", mb);
	}
	public NonmemberEntity nonmemberselect(String nmb) throws Exception{
		return sqlSession.selectOne("movieDao.nonmemberselect",nmb);
	}
	public List<NoticeEntity> noticewhereall() throws Exception{
		return sqlSession.selectList("movieDao.noticewhereall");
	}
	public NoticeEntity noticewherenoid(int no_id) throws Exception{
		return sqlSession.selectOne("movieDao.noticewherenoid",no_id);
	}
	public List<NoticeEntity> noticepaging(int page) throws Exception{
		return sqlSession.selectList("movieDao.noticepaging",page);
	}
	public List<NoticeEntity> noticeorderbydate() throws Exception{
		return sqlSession.selectList("movieDao.noticeorderbydate");
	}
	public List<NoticeEntity> noticesearch(String search,String con) throws Exception{
		HashMap map= new HashMap();
		map.put("searchKeyword", search);
		map.put("con",con);
		return sqlSession.selectList("movieDao.noticesearch",map);
	}
	public List<FaqEntity> faqorderbyid() throws Exception{
		return sqlSession.selectList("movieDao.faqorderbyid");
	}
	public List<FaqEntity> faqsearch(String search) throws Exception{
		return sqlSession.selectList("movieDao.faqsearch",search);
	}
	
	//���̸� ���
	public List<TheaterEntity> selectDoList() throws Exception{
		return sqlSession.selectList("Dao.selectDoLocation");
	}
	
	
	//��ȭ����Ʈ ���
	public List<MovieEntity> selectList() throws Exception{
		return sqlSession.selectList("MovieDao.selectAllList");
	}
	
	public MovieEntity selectmovieInfo(MovieEntity movie) throws Exception{
		//System.out.println(profile.getName());
		//System.out.println(profile.getEmail());
		return sqlSession.selectOne("MovieDao.selectMovie", movie);
	}

}
