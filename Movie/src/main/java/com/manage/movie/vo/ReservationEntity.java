package com.manage.movie.vo;

public class ReservationEntity {
	int re_id;
	String re_member;
	String re_phone;
	int ss_id;
	int se_id;
	String re_date;
	String re_cost;
	public int getRe_id() {
		return re_id;
	}
	public void setRe_id(int re_id) {
		this.re_id = re_id;
	}
	public String getRe_member() {
		return re_member;
	}
	public void setRe_member(String re_member) {
		this.re_member = re_member;
	}
	public String getRe_phone() {
		return re_phone;
	}
	public void setRe_phone(String re_phone) {
		this.re_phone = re_phone;
	}
	public int getSs_id() {
		return ss_id;
	}
	public void setSs_id(int ss_id) {
		this.ss_id = ss_id;
	}
	public int getSe_id() {
		return se_id;
	}
	public void setSe_id(int se_id) {
		this.se_id = se_id;
	}
	public String getRe_date() {
		return re_date;
	}
	public void setRe_date(String re_date) {
		this.re_date = re_date;
	}
	public String getRe_cost() {
		return re_cost;
	}
	public void setRe_cost(String re_cost) {
		this.re_cost = re_cost;
	}
}
