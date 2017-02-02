package com.manage.movie.vo;

public class EventEntity {
	int ev_id;
	String ev_title;
	String ev_photo_mini;
	String ev_photo_full;
	String ev_start_date;
	String ev_end_date;
	String ev_type;
	public String getEv_type() {
		return ev_type;
	}
	public void setEv_type(String ev_type) {
		this.ev_type = ev_type;
	}
	public int getEv_id() {
		return ev_id;
	}
	public void setEv_id(int ev_id) {
		this.ev_id = ev_id;
	}

	public String getEv_title() {
		return ev_title;
	}
	public void setEv_title(String ev_title) {
		this.ev_title = ev_title;
	}
	public String getEv_photo_mini() {
		return ev_photo_mini;
	}
	public void setEv_photo_mini(String ev_photo_mini) {
		this.ev_photo_mini = ev_photo_mini;
	}
	public String getEv_photo_full() {
		return ev_photo_full;
	}
	public void setEv_photo_full(String ev_photo_full) {
		this.ev_photo_full = ev_photo_full;
	}
	public String getEv_start_date() {
		return ev_start_date;
	}
	public void setEv_start_date(String ev_start_date) {
		this.ev_start_date = ev_start_date;
	}
	public String getEv_end_date() {
		return ev_end_date;
	}
	public void setEv_end_date(String ev_end_date) {
		this.ev_end_date = ev_end_date;
	}
}
