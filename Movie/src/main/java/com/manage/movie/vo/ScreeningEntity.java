package com.manage.movie.vo;

public class ScreeningEntity{
	int sc_id;
	int mv_id;
	int th_id;
	String sc_startdate;
	String sc_enddate;
	public int getSc_id() {
		return sc_id;
	}
	public void setSc_id(int sc_id) {
		this.sc_id = sc_id;
	}
	public int getMv_id() {
		return mv_id;
	}
	public void setMv_id(int mv_id) {
		this.mv_id = mv_id;
	}
	public int getTh_id() {
		return th_id;
	}
	public void setTh_id(int th_id) {
		this.th_id = th_id;
	}
	public String getSc_startdate() {
		return sc_startdate;
	}
	public void setSc_startdate(String sc_startdate) {
		this.sc_startdate = sc_startdate;
	}
	public String getSc_enddate() {
		return sc_enddate;
	}
	public void setSc_enddate(String sc_enddate) {
		this.sc_enddate = sc_enddate;
	}
	
}
