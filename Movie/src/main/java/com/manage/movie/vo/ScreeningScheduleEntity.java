package com.manage.movie.vo;

public class ScreeningScheduleEntity {

	int ss_id;
	int sc_id;
	int st_id;
	String ss_starttime;
	String ss_endtime;
	String ss_date;
	String ss_info;
	int ss_attendance;
	public int getSs_attendance() {
		return ss_attendance;
	}
	public void setSs_attendance(int ss_attendance) {
		this.ss_attendance = ss_attendance;
	}
	public int getSs_id() {
		return ss_id;
	}
	public void setSs_id(int ss_id) {
		this.ss_id = ss_id;
	}
	public int getSc_id() {
		return sc_id;
	}
	public void setSc_id(int sc_id) {
		this.sc_id = sc_id;
	}
	public int getSt_id() {
		return st_id;
	}
	public void setSt_id(int st_id) {
		this.st_id = st_id;
	}
	public String getSs_starttime() {
		return ss_starttime;
	}
	public void setSs_starttime(String ss_starttime) {
		this.ss_starttime = ss_starttime;
	}
	public String getSs_endtime() {
		return ss_endtime;
	}
	public void setSs_endtime(String ss_endtime) {
		this.ss_endtime = ss_endtime;
	}
	public String getSs_date() {
		return ss_date;
	}
	public void setSs_date(String ss_date) {
		this.ss_date = ss_date;
	}
	public String getSs_info() {
		return ss_info;
	}
	public void setSs_info(String ss_info) {
		this.ss_info = ss_info;
	}
}
