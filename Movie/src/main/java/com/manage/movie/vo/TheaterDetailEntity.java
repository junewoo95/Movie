package com.manage.movie.vo;

public class TheaterDetailEntity {
	int td_id;
	String td_address;
	String td_totalscreening;
	String td_totalseating;
	String img;
	
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	
	public int getTd_id() {
		return td_id;
	}
	public void setTd_id(int td_id) {
		this.td_id = td_id;
	}
	public String getTd_address() {
		return td_address;
	}
	public void setTd_address(String td_address) {
		this.td_address = td_address;
	}
	public String getTd_totalscreening() {
		return td_totalscreening;
	}
	public void setTd_totalscreening(String td_totalscreening) {
		this.td_totalscreening = td_totalscreening;
	}
	public String getTd_totalseating() {
		return td_totalseating;
	}
	public void setTd_totalseating(String td_totalseating) {
		this.td_totalseating = td_totalseating;
	}
	
	
}
