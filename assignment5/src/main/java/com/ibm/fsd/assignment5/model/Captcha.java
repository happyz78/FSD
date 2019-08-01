package com.ibm.fsd.assignment5.model;

public class Captcha {
	private String captchaId;
	private String userEnteredCaptchaCode;
	public String getCaptchaId() {
		return captchaId;
	}
	public void setCaptchaId(String captchaId) {
		this.captchaId = captchaId;
	}
	public String getUserEnteredCaptchaCode() {
		return userEnteredCaptchaCode;
	}
	public void setUserEnteredCaptchaCode(String userEnteredCaptchaCode) {
		this.userEnteredCaptchaCode = userEnteredCaptchaCode;
	}
}
